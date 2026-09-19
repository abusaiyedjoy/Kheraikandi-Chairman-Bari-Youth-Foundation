"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/shared/AdminSidebar";
import { AdminHeader } from "@/components/shared/AdminHeader";
import { useAuth } from "@/providers/AuthProvider";
import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/components/shared/Breadcrumb";

interface AdminLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  unreadNotifications?: number;
}

export function AdminLayout({
  children,
  breadcrumbs,
  unreadNotifications = 3,
}: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const adminName = user?.name || "কোষাধ্যক্ষ / অ্যাডমিন";

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* ── Desktop Sidebar ────────────────────────────────────── */}
      <AdminSidebar
        currentPath={pathname}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="hidden md:flex sticky top-0 h-screen overflow-y-auto"
      />

      {/* ── Mobile Sidebar Overlay ─────────────────────────────── */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 h-full w-72 animate-fade-in">
            <AdminSidebar
              currentPath={pathname}
              className="h-full"
            />
          </div>
        </div>
      )}

      {/* ── Main Content Area ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          adminName={adminName}
          breadcrumbs={breadcrumbs}
          unreadNotifications={unreadNotifications}
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        <main className={cn("flex-1 overflow-x-hidden")}>
          {children}
        </main>
      </div>
    </div>
  );
}
