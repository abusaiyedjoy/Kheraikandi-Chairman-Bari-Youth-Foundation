"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  PiggyBank,
  Wallet,
  Heart,
  Bell,
  LogOut,
  Sparkles,
  User,
  CalendarDays,
  Receipt,
  Building2,
  Settings,
} from "lucide-react";
import { ORG } from "@/lib/constants";
import { CurrencyDisplay } from "./CurrencyDisplay";
import { cn } from "@/lib/utils";

interface MemberSidebarProps {
  currentPath?: string;
  memberSavings?: number;
  memberName?: string;
  memberId?: string;
  className?: string;
  onLogout?: () => void;
}

const memberNavItems = [
  { href: "/member/dashboard", label: "ড্যাশবোর্ড", icon: LayoutDashboard },
  { href: "/member/profile", label: "আমার প্রোফাইল", icon: User },
  { href: "/member/contributions", label: "মাসিক জমা", icon: CalendarDays },
  { href: "/member/savings", label: "আমার সঞ্চয়", icon: PiggyBank },
  { href: "/member/transactions", label: "লেনদেন", icon: Wallet },
  { href: "/member/fund-overview", label: "সংগঠনের তহবিল", icon: Building2 },
  { href: "/member/expenses", label: "খরচের হিসাব", icon: Receipt },
  { href: "/member/activities", label: "কার্যক্রম", icon: Heart },
  { href: "/member/notices", label: "নোটিশ", icon: Bell },
  { href: "/member/settings", label: "সেটিংস", icon: Settings },
];

export function MemberSidebar({
  currentPath = "/member/dashboard",
  memberSavings = 5400,
  memberName = "আবু সাইয়েদ",
  memberId = "KCYW-00125",
  className,
  onLogout,
}: MemberSidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col w-64 border-r border-border bg-card/95 backdrop-blur-sm select-none",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center px-5 border-b border-border">
        <Link href="/member/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-xs">
            <Sparkles className="h-4 w-4 text-amber-300" />
          </div>
          <div className="min-w-0">
            <span className="font-extrabold text-sm text-foreground truncate block leading-tight">
              সদস্য পোর্টাল
            </span>
            <span className="text-[10px] text-muted-foreground font-medium truncate block">
              {ORG.abbreviation}
            </span>
          </div>
        </Link>
      </div>

      {/* Member Savings Glance Widget */}
      <div className="p-4 border-b border-border bg-emerald-50/40 dark:bg-emerald-950/20">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
          <span>আমার সঞ্চয় (৯০%)</span>
          <span className="font-mono text-emerald-700 dark:text-emerald-400">{memberId}</span>
        </div>
        <CurrencyDisplay
          amount={memberSavings}
          size="lg"
          className="font-extrabold text-emerald-800 dark:text-emerald-300 block"
        />
        <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>প্রতি মাসে জমা: ৳৯০</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">১০০% ফেরতযোগ্য</span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {memberNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href ||
            (item.href !== "/member/dashboard" && currentPath.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all",
                isActive
                  ? "bg-primary text-primary-foreground font-bold shadow-xs"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-white")} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Profile snippet */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-muted/60 transition-colors">
          <div className="min-w-0">
            <p className="font-bold text-xs text-foreground truncate">{memberName}</p>
            <p className="text-[10px] text-muted-foreground font-mono">{memberId}</p>
          </div>
          {onLogout ? (
            <button
              type="button"
              onClick={onLogout}
              className="p-1.5 rounded text-muted-foreground hover:text-red-500 transition-colors"
              title="লগআউট"
            >
              <LogOut className="h-4 w-4" />
            </button>
          ) : (
            <Link
              href="/"
              className="p-1.5 rounded text-muted-foreground hover:text-red-500 transition-colors"
              title="লগআউট"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
