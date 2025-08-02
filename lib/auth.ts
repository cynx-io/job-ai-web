"use client";

import { useState, useEffect, useCallback } from "react";

export interface User {
  id: string;
  auth0_id: string;
  email: string;
  name: string;
  subscription_tier?: string;
  created_at?: string;
  last_login_at?: string;
  is_active?: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

class AuthManager {
  private baseUrl: string;
  private listeners: Array<(state: AuthState) => void> = [];
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: true,
  };

  constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_JANUS_BASE_URL || "https://api.cynxio.com/";
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  private setState(newState: Partial<AuthState>) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  async checkAuth(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}auth0/me`, {
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const user = await response.json();
        this.setState({
          user,
          isAuthenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          user: null,
          isAuthenticated: false,
          loading: false,
        });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      this.setState({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  }

  login(): void {
    window.location.href = `${this.baseUrl}auth0/login`;
  }

  logout(type: "local" | "full" = "full"): void {
    const logoutUrl = `${this.baseUrl}auth0/logout?type=${type}`;
    window.location.href = logoutUrl;
  }

  getState(): AuthState {
    return this.state;
  }
}

const authManager = new AuthManager();

export function useAuth() {
  const [state, setState] = useState<AuthState>(authManager.getState());

  useEffect(() => {
    const unsubscribe = authManager.subscribe(setState);

    // Check authentication status on mount
    if (state.loading) {
      authManager.checkAuth();
    }

    return unsubscribe;
  }, [state.loading]);

  const login = useCallback(() => {
    authManager.login();
  }, []);

  const logout = useCallback((type: "local" | "full" = "full") => {
    authManager.logout(type);
  }, []);

  const refreshAuth = useCallback(() => {
    authManager.checkAuth();
  }, []);

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    login,
    logout,
    refreshAuth,
  };
}

export { authManager };
