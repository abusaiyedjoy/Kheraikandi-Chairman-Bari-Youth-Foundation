"use client";

import React from "react";
import { Shield, User, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoCredentialsBoxProps {
  onSelectDemo: (email: string, password: string, role: "admin" | "member") => void;
  isLoading?: boolean;
  className?: string;
}

export function DemoCredentialsBox({
  onSelectDemo,
  isLoading = false,
  className,
}: DemoCredentialsBoxProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 space-y-3",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
          <Sparkles className="h-3.5 w-3.5 text-[#D4A72C]" />
          <span>ডেমো অ্যাকাউন্ট দিয়ে পরখ করুন</span>
        </div>
        <span className="text-[10px] font-medium text-muted-foreground">
          এক ক্লিকে লগইন
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Admin Demo Card */}
        <button
          type="button"
          disabled={isLoading}
          onClick={() => onSelectDemo("admin@example.com", "admin123", "admin")}
          className="group flex flex-col justify-between rounded-xl border border-emerald-200/80 dark:border-emerald-800/80 bg-card p-3 text-left shadow-2xs hover:border-emerald-500 hover:shadow-xs transition-all disabled:opacity-50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
                <Shield className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">অ্যাডমিন ডেমো</p>
                <p className="text-[10px] text-muted-foreground">Admin Demo</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/60 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800 dark:text-emerald-300">
              অ্যাডমিন
            </span>
          </div>

          <div className="mt-2.5 flex items-center justify-between border-t border-border/50 pt-2 text-[11px]">
            <span className="font-mono text-muted-foreground">admin@example.com</span>
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
              প্রবেশ <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </button>

        {/* Member Demo Card */}
        <button
          type="button"
          disabled={isLoading}
          onClick={() => onSelectDemo("member@example.com", "member123", "member")}
          className="group flex flex-col justify-between rounded-xl border border-emerald-200/80 dark:border-emerald-800/80 bg-card p-3 text-left shadow-2xs hover:border-emerald-500 hover:shadow-xs transition-all disabled:opacity-50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#D4A72C] text-amber-950 shadow-xs">
                <User className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">সদস্য ডেমো</p>
                <p className="text-[10px] text-muted-foreground">Member Demo</p>
              </div>
            </div>
            <span className="rounded-full bg-amber-100 dark:bg-amber-900/60 px-1.5 py-0.5 text-[9px] font-bold text-amber-900 dark:text-amber-300">
              সদস্য
            </span>
          </div>

          <div className="mt-2.5 flex items-center justify-between border-t border-border/50 pt-2 text-[11px]">
            <span className="font-mono text-muted-foreground">member@example.com</span>
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#D4A72C] dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">
              প্রবেশ <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
