"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PiggyBank,
  HeartHandshake,
  Calendar,
  ShieldCheck,
  ArrowRight,
  LogOut,
  FileText,
  User,
  Sparkles,
} from "lucide-react";
import { MemberSidebar } from "@/components/shared/MemberSidebar";
import { MemberHeader } from "@/components/shared/MemberHeader";
import { SavingsCard } from "@/components/financial/SavingsCard";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";

export default function MemberDashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Member Sidebar */}
      <MemberSidebar
        currentPath="/member"
        memberName={user?.name}
        memberId={user?.memberId}
        memberSavings={5400}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Member Header */}
        <MemberHeader
          memberName={user?.name || "মাহমুদুল হাসান রনি"}
          memberSavings={5400}
          breadcrumbs={[
            { label: "সদস্য পোর্টাল", href: "/member/dashboard" },
            { label: "আমার ড্যাশবোর্ড" },
          ]}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1F0D] via-[#0f2b10] to-[#16401a] p-6 sm:p-8 text-white shadow-xl">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-emerald-500/20 blur-2xl" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-0.5 text-xs font-semibold text-emerald-300 backdrop-blur-sm border border-white/10">
                  <User className="h-3 w-3 text-[#D4A72C]" />
                  <span>সদস্য পরিচিতি নম্বর: {user?.memberId || "KCBYW-002"}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  স্বাগতম, {user?.name || "মাহমুদুল হাসান রনি"}!
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100/80">
                  আপনার সঞ্চয় হিসাব, চাঁদার রশিদ ও কল্যাণ তহবিলের ব্যক্তিগত বিবরণী
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  leftIcon={<LogOut className="h-3.5 w-3.5" />}
                  className="border-white/20 bg-white/10 text-white hover:bg-white/20 text-xs"
                >
                  লগআউট
                </Button>
                <Link href="/">
                  <Button
                    size="sm"
                    className="bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-semibold"
                  >
                    মূল ওয়েবসাইটে যান
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Savings and Fund Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SavingsCard
                savingsAmount={5400}
                monthsContributed={12}
                lastPaymentDate="১৫ সেপ্টেম্বর, ২০২৪"
                memberId={user?.memberId || "KCBYW-002"}
              />
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4 text-[#D4A72C]" />
                  <span>সঞ্চয় নীতি ও অধিকার</span>
                </div>
                <h3 className="text-base font-bold text-foreground">
                  আপনার ৯০% আমানত ১০০% সুরক্ষিত
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  সমিতির সংবিধান অনুযায়ী, আপনি যখনই চান আপনার সঞ্চিত সম্পূর্ণ
                  টাকা (৯০% অংশ) কোনো শর্ত ছাড়াই ফেরত পেতে পারেন।
                </p>
              </div>

              <div className="space-y-2 border-t border-border pt-4 text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>উন্নয়ন তহবিলে অনুদান (১০%):</span>
                  <strong className="text-foreground">৳৬০০</strong>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>ফেরতযোগ্য ব্যক্তিগত সঞ্চয়:</span>
                  <strong className="text-emerald-700 dark:text-emerald-400 font-bold">
                    ৳৫,৪০০
                  </strong>
                </div>
              </div>

              <Link href="/financial-transparency" className="block pt-1">
                <Button size="sm" variant="outline" className="w-full text-xs">
                  তহবিল স্বচ্ছতা দেখুন
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Links for Member */}
          <div className="grid sm:grid-cols-3 gap-4">
            <Link
              href="/activities"
              className="rounded-2xl border border-border bg-card p-5 hover:border-emerald-500/50 hover:shadow-sm transition-all group"
            >
              <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                চলমান কার্যক্রম
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                গ্রামের রাস্তা মেরামত ও সেবামূলক প্রজেক্টসমূহ দেখুন।
              </p>
            </Link>

            <Link
              href="/notices"
              className="rounded-2xl border border-border bg-card p-5 hover:border-emerald-500/50 hover:shadow-sm transition-all group"
            >
              <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                নোটিশ বোর্ড
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                আসন্ন সাধারণ সভা ও বার্ষিক অডিটের বিজ্ঞপ্তি।
              </p>
            </Link>

            <Link
              href="/members"
              className="rounded-2xl border border-border bg-card p-5 hover:border-emerald-500/50 hover:shadow-sm transition-all group"
            >
              <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                সদস্য ডিরেক্টরি
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                সকল সদস্যদের যোগাযোগ তথ্য ও রক্তের গ্রুপ তালিকা।
              </p>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
