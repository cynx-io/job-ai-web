// app/(user)/layout.tsx

import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserPageNavigationBar } from "@/components/app/userpage/userPageNavigationBar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <UserPageNavigationBar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
