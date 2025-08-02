"use client";

import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LoginPage() {
  const { isAuthenticated, loading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to JobAI</CardTitle>
          <CardDescription>
            Sign in to access your AI-powered job search
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={login} className="w-full gap-2" size="lg">
            <LogIn className="w-5 h-5" />
            Sign in with Auth0
          </Button>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
