"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "@/components/SidebarLayout/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/admin/signin" ||
    pathname === "/admin/login" ||
    pathname?.startsWith("/admin/signin") ||
    pathname?.startsWith("/admin/login");

  if (isAuthPage) {
    return <main className="min-h-screen w-full">{children}</main>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <SidebarTrigger />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

