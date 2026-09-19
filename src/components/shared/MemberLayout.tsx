"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MemberSidebar } from "@/components/shared/MemberSidebar";
import { MemberHeader } from "@/components/shared/MemberHeader";
import { MobileNavigation, memberMobileNavItems } from "@/components/shared/MobileNavigation";
import { useAuth } from "@/providers/AuthProvider";
import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/components/shared/Breadcrumb";

interface MemberLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  memberSavings?: number;
  unreadNotifications?: number;
}

export function MemberLayout({
  children,
  breadcrumbs,
  memberSavings = 5400,
  unreadNotifications = 2,
}: MemberLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const memberName = user?.name || "আবু সাইয়েদ";
  const memberId = user?.memberId || "KCYW-00125";

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* ── Desktop Sidebar ────────────────────────────────────── */}
      <MemberSidebar
        currentPath={pathname}
        memberName={memberName}
        memberId={memberId}
        memberSavings={memberSavings}
        onLogout={handleLogout}
        className="hidden md:flex sticky top-0 h-screen overflow-y-auto"
      />

      {/* ── Mobile Sidebar Overlay ─────────────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 h-full w-72 animate-fade-in">
            <MemberSidebar
              currentPath={pathname}
              memberName={memberName}
              memberId={memberId}
              memberSavings={memberSavings}
              onLogout={handleLogout}
              className="h-full"
            />
          </div>
        </div>
      )}

      {/* ── Main Content Area ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        <MemberHeader
          memberName={memberName}
          memberSavings={memberSavings}
          unreadNotifications={unreadNotifications}
          breadcrumbs={breadcrumbs}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className={cn(
          "flex-1 overflow-x-hidden",
          "pb-20 md:pb-0" // bottom padding for mobile nav
        )}>
          {children}
        </main>
      </div>

      {/* ── Mobile Bottom Navigation ───────────────────────────── */}
      <MobileNavigation
        currentPath={pathname}
        items={memberMobileNavItems}
      />
    </div>
  );
}
