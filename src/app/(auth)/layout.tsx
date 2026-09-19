"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { ORG } from "@/lib/constants";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* Floating minimal top-bar */}
      <header className="absolute top-0 inset-x-0 z-50 flex items-center justify-between p-4 sm:p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur-md hover:border-foreground/20 hover:text-foreground transition-all shadow-2xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>মূল পাতা</span>
        </Link>

        {/* Mobile mini branding */}
        <div className="flex lg:hidden items-center gap-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#D4A72C]" />
          </div>
          <span className="text-xs font-bold text-foreground">
            {ORG.nameBn}
          </span>
        </div>

        {/* Theme switcher */}
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground backdrop-blur-md hover:bg-muted hover:text-foreground transition-colors shadow-2xs"
          aria-label="থিম পরিবর্তন করুন"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-sky-400" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
