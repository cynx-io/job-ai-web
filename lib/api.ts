"use client";

import { authManager } from "./auth";

export const callApi = (url: string, body: never): Promise<Response> => {
  const jsonBody = JSON.stringify(body);
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonBody,
    credentials: "include",
  });
};

export interface ApiClientConfig {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
}

export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl =
      config.baseUrl ||
      process.env.NEXT_PUBLIC_JANUS_BASE_URL ||
      "https://api.cynxio.com/";
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...config.defaultHeaders,
    };
  }

  private async makeRequest(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      credentials: "include",
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    // Handle authentication errors
    if (response.status === 401) {
      const authState = authManager.getState();
      if (authState.isAuthenticated) {
        // Session expired, trigger re-authentication
        authManager.checkAuth();
      }
      // For 401 errors, redirect to login after a short delay to allow state update
      setTimeout(() => {
        if (!authManager.getState().isAuthenticated) {
          authManager.login();
        }
      }, 100);
    }

    return response;
  }

  async get(
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<Response> {
    return this.makeRequest(endpoint, {
      method: "GET",
      headers,
    });
  }

  async post(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>,
  ): Promise<Response> {
    return this.makeRequest(endpoint, {
      method: "POST",
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>,
  ): Promise<Response> {
    return this.makeRequest(endpoint, {
      method: "PUT",
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete(
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<Response> {
    return this.makeRequest(endpoint, {
      method: "DELETE",
      headers,
    });
  }

  async patch(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>,
  ): Promise<Response> {
    return this.makeRequest(endpoint, {
      method: "PATCH",
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

// Create a default instance
export const apiClient = new ApiClient();
