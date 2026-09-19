"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, LogIn, LayoutDashboard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { ORG } from "@/lib/constants";

export default function UnauthorizedPage() {
  const { user, role } = useAuth();

  const dashboardHref =
    role === "admin"
      ? "/admin/dashboard"
      : role === "member"
      ? "/member/dashboard"
      : "/login";

  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20 bg-background">
      <div className="w-full max-w-lg text-center space-y-8">
        {/* Animated ambient shield container */}
        <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-rose-500/15 blur-2xl animate-pulse" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-rose-500/30 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 shadow-xl">
            <ShieldAlert className="h-12 w-12" />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-3 max-w-md mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-100/60 dark:bg-rose-950/60 px-3 py-1 text-xs font-bold text-rose-700 dark:text-rose-400">
            <span>৪০৩ • অ্যাক্সেস সীমাবদ্ধ</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            এই পেজটি দেখার অনুমতি আপনার নেই।
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed">
            আপনি যে পেজটিতে প্রবেশের চেষ্টা করছেন সেটির জন্য প্রয়োজনীয় অ্যাডমিন
            বা নির্দিষ্ট অনুমতি আপনার অ্যাকাউন্টে নেই।
          </p>

          {user && (
            <div className="mt-4 rounded-xl border border-border bg-card p-3 text-xs inline-flex items-center gap-2 text-muted-foreground">
              <span>বর্তমান অ্যাকাউন্ট:</span>
              <strong className="text-foreground font-semibold">
                {user.name} ({user.role === "admin" ? "অ্যাডমিন" : "সদস্য"})
              </strong>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-sm mx-auto">
          <Link href={dashboardHref} className="w-full sm:w-auto flex-1">
            <Button
              size="lg"
              leftIcon={<LayoutDashboard className="h-4 w-4" />}
              className="w-full justify-center text-sm font-bold shadow-md shadow-emerald-800/10"
            >
              ড্যাশবোর্ডে ফিরে যান
            </Button>
          </Link>

          <Link href="/login" className="w-full sm:w-auto flex-1">
            <Button
              size="lg"
              variant="outline"
              leftIcon={<LogIn className="h-4 w-4" />}
              className="w-full justify-center text-sm font-semibold"
            >
              অন্য অ্যাকাউন্টে লগইন
            </Button>
          </Link>
        </div>

        {/* Helpful links */}
        <div className="pt-4 border-t border-border max-w-xs mx-auto text-xs text-muted-foreground space-y-1">
          <p>প্রয়োজনে সমিতি কর্তৃপক্ষের সাথে যোগাযোগ করুন:</p>
          <p className="font-semibold text-foreground">{ORG.phone}</p>
        </div>
      </div>
    </div>
  );
}
