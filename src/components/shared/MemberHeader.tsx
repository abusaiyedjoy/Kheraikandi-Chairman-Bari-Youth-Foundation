"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";
import { UserAvatar } from "./UserAvatar";
import { CurrencyDisplay } from "./CurrencyDisplay";
import { Menu, Sun, Moon, Bell, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";

interface MemberHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  onToggleSidebar?: () => void;
  memberName?: string;
  memberSavings?: number;
  unreadNotifications?: number;
  className?: string;
}

export function MemberHeader({
  breadcrumbs = [{ label: "আমার ড্যাশবোর্ড", href: "/member" }],
  onToggleSidebar,
  memberName = "মোহাম্মদ রফিকুল ইসলাম",
  memberSavings = 5400,
  unreadNotifications = 1,
  className,
}: MemberHeaderProps) {
  const { theme, setTheme } = useTheme();

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
            aria-label="মেনু খুলুন"
          >
            <Menu className="h-4 w-4" />
          </button>
        )}

        <div className="hidden sm:block">
          <Breadcrumb items={breadcrumbs} homeHref="/member" />
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Quick balance badge */}
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 px-3 py-1.5 text-xs">
          <PiggyBank className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          <span className="text-muted-foreground">সঞ্চয় স্থিতি:</span>
          <CurrencyDisplay
            amount={memberSavings}
            size="sm"
            className="font-bold text-emerald-800 dark:text-emerald-300"
          />
        </div>

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

        {/* Member Profile Avatar */}
        <div className="flex items-center gap-2">
          <UserAvatar name={memberName} size="sm" status="active" />
          <div className="hidden lg:block text-xs text-left">
            <p className="font-bold text-foreground leading-tight truncate max-w-[120px]">
              {memberName}
            </p>
            <p className="text-[10px] text-muted-foreground">সদস্য</p>
          </div>
        </div>
      </div>
    </header>
  );
}
