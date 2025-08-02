"use client";

import { useAuth } from "@/lib/auth";
import { LoginPage } from "./LoginPage";
import { ComponentType } from "react";

export interface WithAuthOptions {
  redirectTo?: string;
  loading?: ComponentType;
}

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithAuthOptions = {},
) {
  const AuthenticatedComponent = (props: P) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
      if (options.loading) {
        const LoadingComponent = options.loading;
        return <LoadingComponent />;
      }

      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </div>
      );
    }

    if (!isAuthenticated) {
      return <LoginPage />;
    }

    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  return AuthenticatedComponent;
}

export function useRequireAuth() {
  const { isAuthenticated, loading, login } = useAuth();

  if (loading) {
    return { isAuthenticated: false, loading: true };
  }

  if (!isAuthenticated) {
    login();
    return { isAuthenticated: false, loading: false };
  }

  return { isAuthenticated: true, loading: false };
}
