"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  Wallet,
  PiggyBank,
  Heart,
  TrendingUp,
  Shield,
  ArrowRight,
  LogOut,
  Bell,
  Sparkles,
} from "lucide-react";
import { AdminSidebar } from "@/components/shared/AdminSidebar";
import { AdminHeader } from "@/components/shared/AdminHeader";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { DASHBOARD_SUMMARY } from "@/data/dashboard";
import { formatCurrency } from "@/lib/formatters";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Admin Sidebar */}
      <AdminSidebar
        currentPath="/admin"
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Header */}
        <AdminHeader
          adminName={user?.name || "মুহাম্মদ আবু সাঈদ"}
          breadcrumbs={[
            { label: "অ্যাডমিন", href: "/admin/dashboard" },
            { label: "ড্যাশবোর্ড" },
          ]}
        />

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#166534] via-[#14532d] to-[#0d3b1f] p-6 sm:p-8 text-white shadow-xl">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-emerald-400/20 blur-2xl" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-0.5 text-xs font-semibold text-emerald-200 backdrop-blur-sm border border-white/10">
                  <Shield className="h-3 w-3 text-[#D4A72C]" />
                  <span>অ্যাডমিনিস্ট্রেটর পোর্টাল</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  স্বাগতম, {user?.name || "মুহাম্মদ আবু সাঈদ"}!
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100/80">
                  খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ — কেন্দ্রীয় প্রশাসনিক ড্যাশবোর্ড
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

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="মোট সদস্য"
              value={`${DASHBOARD_SUMMARY.totalMembers} জন`}
              subtitle={`${DASHBOARD_SUMMARY.activeMembers} জন সক্রিয়`}
              icon={Users}
              variant="default"
            />
            <StatCard
              title="কেন্দ্রীয় ব্যালেন্স"
              value={DASHBOARD_SUMMARY.currentBalance}
              isCurrency
              icon={TrendingUp}
              variant="success"
            />
            <StatCard
              title="সদস্যদের পুঞ্জীভূত সঞ্চয়"
              value={DASHBOARD_SUMMARY.totalSavings}
              isCurrency
              icon={PiggyBank}
              variant="primary"
            />
            <StatCard
              title="সমাজকল্যাণ তহবিল"
              value={DASHBOARD_SUMMARY.totalDevelopmentFund}
              isCurrency
              icon={Heart}
              variant="warning"
            />
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">চাঁদা সংগ্রহ</h3>
                  <p className="text-xs text-muted-foreground">চলতি মাসের চাঁদা এন্ট্রি</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                সদস্যদের জমা করা ৫০০ টাকার রশিদ অনুমোদন করুন এবং স্বয়ংক্রিয়ভাবে ৯০/১০ অনুপাতে ভাগ করুন।
              </p>
              <Link href="/financial-transparency" className="block pt-1">
                <Button size="sm" variant="outline" className="w-full text-xs" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                  আর্থিক বিবরণ দেখুন
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950 text-[#D4A72C]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">সদস্য তালিকা</h3>
                  <p className="text-xs text-muted-foreground">২৫ জন নিবন্ধিত সদস্য</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                সকল সদস্যের মোবাইল নম্বর, রক্তের গ্রুপ, পদবী এবং ব্যক্তিগত আমানত নিরীক্ষণ করুন।
              </p>
              <Link href="/members" className="block pt-1">
                <Button size="sm" variant="outline" className="w-full text-xs" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                  সদস্য ডিরেক্টরি
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">জরুরি নোটিশ</h3>
                  <p className="text-xs text-muted-foreground">নোটিশ বোর্ড আপডেট</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                সাধারণ সভা, মাসিক চাঁদার তারিখ ও উন্নয়ন প্রকল্পের নোটিশ প্রকাশ করুন।
              </p>
              <Link href="/notices" className="block pt-1">
                <Button size="sm" variant="outline" className="w-full text-xs" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                  সকল নোটিশ দেখুন
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
