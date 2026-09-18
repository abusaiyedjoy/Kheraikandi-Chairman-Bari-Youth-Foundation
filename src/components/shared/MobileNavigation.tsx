"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  PiggyBank,
  Wallet,
  Heart,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
}

interface MobileNavigationProps {
  currentPath?: string;
  items?: MobileNavItem[];
  className?: string;
}

const defaultItems: MobileNavItem[] = [
  { label: "হোম", href: "/", icon: LayoutDashboard },
  { label: "সঞ্চয়", href: "/member/savings", icon: PiggyBank },
  { label: "চাঁদা", href: "/member/contributions", icon: Wallet },
  { label: "কার্যক্রম", href: "/member/activities", icon: Heart },
  { label: "নোটিশ", href: "/member/notices", icon: Bell },
];

export function MobileNavigation({
  currentPath = "/",
  items = defaultItems,
  className,
}: MobileNavigationProps) {
  return (
    <nav
      aria-label="Mobile Navigation"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 block md:hidden",
        "border-t border-border bg-background/95 backdrop-blur-md pb-safe shadow-lg",
        className
      )}
    >
      <div className="flex h-16 items-center justify-around px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-1 flex-col items-center justify-center py-1 text-center transition-colors",
                isActive
                  ? "text-primary font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform",
                    isActive && "scale-110 text-primary"
                  )}
                />
                {item.badge && (
                  <span className="absolute -right-2 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-extrabold text-white">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className="mt-1 text-[11px] leading-none tracking-tight">
                {item.label}
              </span>

              {isActive && (
                <span className="absolute bottom-1 h-1 w-6 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
