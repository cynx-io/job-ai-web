"use client";

import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogIn, LogOut, User } from "lucide-react";

export function AuthButton() {
  const { user, isAuthenticated, loading, login, logout } = useAuth();

  if (loading) {
    return (
      <Button variant="ghost" disabled>
        <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </Button>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarFallback>
            {user.name ? (
              user.name.charAt(0).toUpperCase()
            ) : (
              <User className="w-4 h-4" />
            )}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium hidden sm:inline">
          {user.name || user.email}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => logout("full")}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={login} variant="default" className="gap-2">
      <LogIn className="w-4 h-4" />
      Login
    </Button>
  );
}
