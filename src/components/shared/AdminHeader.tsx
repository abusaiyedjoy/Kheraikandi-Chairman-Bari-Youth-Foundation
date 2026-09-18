"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";
import { UserAvatar } from "./UserAvatar";
import {
  Menu,
  Sun,
  Moon,
  Bell,
  Search,
  LogOut,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  onToggleSidebar?: () => void;
  adminName?: string;
  unreadNotifications?: number;
  className?: string;
}

export function AdminHeader({
  breadcrumbs = [{ label: "অ্যাডমিন", href: "/admin" }],
  onToggleSidebar,
  adminName = "কোষাধ্যক্ষ / অ্যাডমিন",
  unreadNotifications = 3,
  className,
}: AdminHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card/90 px-4 sm:px-6 backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted/40 text-muted-foreground hover:text-foreground md:hidden"
            aria-label="সাইডবার টগল করুন"
          >
            <Menu className="h-4 w-4" />
          </button>
        )}

        <div className="hidden sm:block">
          <Breadcrumb items={breadcrumbs} homeHref="/admin" />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search Button */}
        <button
          type="button"
          className="hidden md:flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Search className="h-3.5 w-3.5" />
          <span>অনুসন্ধান করুন...</span>
          <kbd className="rounded border border-border bg-card px-1 font-mono text-[10px]">
            ⌘K
          </kbd>
        </button>

        {/* Theme Switcher */}
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="থিম পরিবর্তন"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-sky-400" />
        </button>

        {/* Notifications Bell */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="বিজ্ঞপ্তি দেখুন"
        >
          <Bell className="h-4 w-4" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
              {unreadNotifications}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-lg p-1 hover:bg-muted transition-colors text-left"
          >
            <UserAvatar name={adminName} size="sm" status="online" />
            <div className="hidden lg:block text-xs">
              <p className="font-bold text-foreground leading-tight">{adminName}</p>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>অ্যাডমিন এক্সেস</span>
              </p>
            </div>
          </button>

          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-border bg-card p-1.5 shadow-xl space-y-1 text-xs animate-fade-in">
                <div className="px-2.5 py-1.5 border-b border-border text-left">
                  <p className="font-bold text-foreground">{adminName}</p>
                  <p className="text-[10px] text-muted-foreground">admin@kcbyw.org</p>
                </div>

                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Settings className="h-3.5 w-3.5" />
                  <span>সেটিংস</span>
                </Link>

                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>লগআউট</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
