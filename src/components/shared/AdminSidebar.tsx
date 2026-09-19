"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserCheck,
  Wallet,
  PiggyBank,
  ArrowLeftRight,
  TrendingUp,
  Receipt,
  BarChart3,
  RefreshCw,
  Heart,
  Bell,
  FileText,
  ClipboardList,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut,
} from "lucide-react";
import { ORG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

interface AdminSidebarProps {
  currentPath?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

const navSections = [
  {
    title: "OVERVIEW",
    items: [
      { href: "/admin/dashboard", label: "ড্যাশবোর্ড", icon: LayoutDashboard },
    ],
  },
  {
    title: "MEMBERS",
    items: [
      { href: "/admin/members", label: "সকল সদস্য", icon: Users },
      { href: "/admin/members/new", label: "সদস্য যোগ করুন", icon: UserPlus },
      { href: "/admin/members/pending", label: "অপেক্ষমান সদস্য", icon: UserCheck, badge: "২" },
    ],
  },
  {
    title: "FINANCE",
    items: [
      { href: "/admin/contributions", label: "চাঁদা সংগ্রহ", icon: Wallet },
      { href: "/admin/savings", label: "সদস্য সঞ্চয়", icon: PiggyBank },
      { href: "/admin/transactions", label: "লেনদেন", icon: ArrowLeftRight },
      { href: "/admin/income", label: "আয়", icon: TrendingUp },
      { href: "/admin/expenses", label: "ব্যয়", icon: Receipt },
      { href: "/admin/investments", label: "বিনিয়োগ", icon: BarChart3 },
      { href: "/admin/refunds", label: "ফেরত", icon: RefreshCw },
    ],
  },
  {
    title: "CONTENT",
    items: [
      { href: "/admin/activities", label: "কার্যক্রম", icon: Heart },
      { href: "/admin/notices", label: "নোটিশ", icon: Bell },
    ],
  },
  {
    title: "REPORTS",
    items: [
      { href: "/admin/reports/financial", label: "আর্থিক প্রতিবেদন", icon: FileText },
      { href: "/admin/reports/members", label: "সদস্য প্রতিবেদন", icon: ClipboardList },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { href: "/admin/audit", label: "অডিট লগ", icon: Shield },
      { href: "/admin/settings", label: "সেটিংস", icon: Settings },
    ],
  },
];

export function AdminSidebar({
  currentPath = "/admin/dashboard",
  isCollapsed: controlledCollapsed,
  onToggleCollapse,
  className,
}: AdminSidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = controlledCollapsed ?? internalCollapsed;
  const router = useRouter();
  const { logout } = useAuth();

  const toggleCollapse = () => {
    if (onToggleCollapse) onToggleCollapse();
    else setInternalCollapsed(!internalCollapsed);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
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
      <div className="flex h-16 items-center justify-between px-4 border-b border-border shrink-0">
        {!collapsed && (
          <Link href="/admin/dashboard" className="flex items-center gap-2.5 min-w-0">
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
          <Link href="/admin/dashboard" className="mx-auto" title="অ্যাডমিন প্যানেল">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-xs">
              <Sparkles className="h-4 w-4 text-amber-300" />
            </div>
          </Link>
        )}

        <button
          type="button"
          onClick={toggleCollapse}
          className={cn(
            "rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0",
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
          <div key={idx} className="space-y-0.5">
            {!collapsed && (
              <p className="px-2.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1 mt-2">
                {section.title}
              </p>
            )}
            {collapsed && idx > 0 && (
              <div className="my-2 border-t border-border/50" />
            )}

            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentPath === item.href ||
                (item.href !== "/admin/dashboard" && currentPath?.startsWith(item.href));

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

                  {!collapsed && "badge" in item && item.badge && (
                    <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-700 dark:text-amber-300">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-3 border-t border-border shrink-0">
        {!collapsed && (
          <div className="rounded-xl bg-muted/50 p-2.5 text-center mb-2">
            <p className="text-[11px] font-bold text-foreground">
              ৯০/১০ সঞ্চয় নিয়ম সক্রিয়
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              স্বচ্ছ আর্থিক ব্যবস্থাপনা
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={handleLogout}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors",
            collapsed && "justify-center px-0 py-2.5"
          )}
          title={collapsed ? "লগআউট" : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>লগআউট</span>}
        </button>
      </div>
    </aside>
  );
}
