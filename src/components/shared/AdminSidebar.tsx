"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Wallet,
  Receipt,
  TrendingUp,
  BarChart3,
  RefreshCw,
  Heart,
  Bell,
  FileText,
  Shield,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { ORG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  currentPath?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

const navSections = [
  {
    title: "সংক্ষিপ্ত বিবরণ",
    items: [
      { href: "/admin", label: "ড্যাশবোর্ড", icon: LayoutDashboard },
      { href: "/admin/reports", label: "আর্থিক প্রতিবেদন", icon: FileText },
    ],
  },
  {
    title: "সদস্য ও চাঁদা",
    items: [
      { href: "/admin/members", label: "সদস্য তালিকা", icon: Users },
      { href: "/admin/contributions", label: "চাঁদা ব্যবস্থাপনা", icon: Wallet, badge: "নতুন" },
      { href: "/admin/refunds", label: "ফেরত আবেদন", icon: RefreshCw },
    ],
  },
  {
    title: "আয় ও ব্যয়",
    items: [
      { href: "/admin/expenses", label: "ব্যয় ভাউচার", icon: Receipt },
      { href: "/admin/income", label: "অন্যান্য আয়", icon: TrendingUp },
      { href: "/admin/investments", label: "বিনিয়োগ", icon: BarChart3 },
    ],
  },
  {
    title: "কল্যাণ ও নোটিশ",
    items: [
      { href: "/admin/activities", label: "সমাজকল্যাণ", icon: Heart },
      { href: "/admin/notices", label: "নোটিশ বোর্ড", icon: Bell },
      { href: "/admin/audit", label: "অডিট লগ", icon: Shield },
    ],
  },
];

export function AdminSidebar({
  currentPath = "/admin",
  isCollapsed: controlledCollapsed,
  onToggleCollapse,
  className,
}: AdminSidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = controlledCollapsed ?? internalCollapsed;

  const toggleCollapse = () => {
    if (onToggleCollapse) onToggleCollapse();
    else setInternalCollapsed(!internalCollapsed);
  };

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-card/95 backdrop-blur-sm transition-all duration-300 select-none",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-xs">
              <Sparkles className="h-4 w-4 text-amber-300" />
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-sm text-foreground truncate block leading-tight">
                অ্যাডমিন প্যানেল
              </span>
              <span className="text-[10px] text-muted-foreground font-medium truncate block">
                {ORG.abbreviation}
              </span>
            </div>
          </Link>
        )}

        {collapsed && (
          <Link href="/admin" className="mx-auto" title="অ্যাডমিন প্যানেল">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-xs">
              <Sparkles className="h-4 w-4 text-amber-300" />
            </div>
          </Link>
        )}

        <button
          type="button"
          onClick={toggleCollapse}
          className={cn(
            "rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
            collapsed && "mx-auto mt-2"
          )}
          aria-label={collapsed ? "সাইডবার বড় করুন" : "সাইডবার ছোট করুন"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!collapsed && (
              <p className="px-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 mb-1.5">
                {section.title}
              </p>
            )}

            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-2.5 py-2 text-xs font-semibold transition-all duration-150",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs font-bold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    collapsed && "justify-center px-0 py-2.5"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-white")} />

                  {!collapsed && (
                    <span className="flex-1 truncate">{item.label}</span>
                  )}

                  {!collapsed && item.badge && (
                    <span className="rounded-full bg-amber-500/20 px-1.5 py-0.2 text-[9px] font-bold text-amber-700 dark:text-amber-300">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer / Transparency badge */}
      {!collapsed && (
        <div className="p-3 border-t border-border">
          <div className="rounded-xl bg-muted/50 p-2.5 text-center">
            <p className="text-[11px] font-bold text-foreground">
              ৯০/১০ সঞ্চয় নিয়ম সক্রিয়
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              স্বচ্ছ আর্থিক ব্যবস্থাপনা
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
