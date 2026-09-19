"use client";

import React from "react";
import Link from "next/link";
import {
  Wallet,
  PiggyBank,
  HeartHandshake,
  CheckCircle2,
  CalendarCheck,
  ArrowRight,
  TrendingUp,
  Building2,
  ShieldCheck,
  BadgeCheck,
  CalendarDays,
  ReceiptText,
  Banknote,
  Bell,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { MemberLayout } from "@/components/shared/MemberLayout";
import { StatCard } from "@/components/shared/StatCard";
import { FinancialStatCard } from "@/components/shared/FinancialStatCard";
import { ActivityCard } from "@/components/shared/ActivityCard";
import { NoticeCard } from "@/components/shared/NoticeCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay";
import { ChartCard } from "@/components/shared/ChartCard";
import { Button } from "@/components/ui/button";
import { MEMBER_DASHBOARD_DATA } from "@/data/member-dashboard";
import { ACTIVITIES } from "@/data/activities";
import { NOTICES } from "@/data/notices";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

// ── Donut chart colors ─────────────────────────────────────────
const SAVINGS_DONUT_COLORS = {
  personalSavings: "#166534",
  developmentAllocation: "#D4A72C",
  refunded: "#64748b",
};



export default function MemberDashboardPage() {
  const data = MEMBER_DASHBOARD_DATA;

  // Top 3 recent activities (sorted newest first by startDate)
  const recentActivities = [...ACTIVITIES]
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 3);

  // Latest 3 notices
  const latestNotices = [...NOTICES]
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    })
    .slice(0, 3);

  // Donut chart data
  const savingsDonutData: Array<{ name: string; value: number; color: string }> = [
    { name: "ব্যক্তিগত সঞ্চয় (৯০%)", value: data.savingsOverview.personalSavings, color: SAVINGS_DONUT_COLORS.personalSavings },
    { name: "উন্নয়ন বরাদ্দ (১০%)", value: data.savingsOverview.developmentAllocation, color: SAVINGS_DONUT_COLORS.developmentAllocation },
  ];
  if (data.savingsOverview.refunded > 0) {
    savingsDonutData.push({ name: "ফেরত", value: data.savingsOverview.refunded, color: SAVINGS_DONUT_COLORS.refunded });
  }

  const { currentMonth } = data;

  return (
    <MemberLayout
      memberSavings={data.personalSavings}
      unreadNotifications={2}
      breadcrumbs={[
        { label: "সদস্য পোর্টাল", href: "/member/dashboard" },
        { label: "ড্যাশবোর্ড" },
      ]}
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">

        {/* ════════════════════════════════════════════════════════
            WELCOME BANNER
        ════════════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062110] via-[#0a2e16] to-[#103a1e] p-6 sm:p-8 text-white shadow-2xl">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-8 -bottom-8 h-48 w-48 rounded-full bg-amber-400/10 blur-2xl" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-2">
              {/* Member ID + Status pill */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-0.5 text-[11px] font-semibold text-emerald-300 border border-white/10 backdrop-blur-sm">
                  <BadgeCheck className="h-3 w-3 text-amber-300" />
                  সদস্য আইডি: {data.memberId}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-0.5 text-[11px] font-bold text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  সক্রিয়
                </span>
              </div>

              {/* Greeting */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                আসসালামু আলাইকুম, {data.memberName} 👋
              </h1>
              <p className="text-sm text-emerald-100/75 max-w-md">
                আপনার সদস্যপদ ও আর্থিক তথ্য এক নজরে দেখুন।
              </p>
            </div>

            {/* Quick actions */}
            <div className="flex flex-wrap gap-2 shrink-0">
              <Link href="/member/contributions">
                <Button
                  size="sm"
                  className="bg-white/10 border border-white/20 text-white hover:bg-white/20 text-xs backdrop-blur-sm"
                  variant="outline"
                  leftIcon={<CalendarDays className="h-3.5 w-3.5" />}
                >
                  মাসিক জমা
                </Button>
              </Link>
              <Link href="/">
                <Button
                  size="sm"
                  className="bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold"
                >
                  মূল সাইট
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            SUMMARY CARDS (4 cards)
        ════════════════════════════════════════════════════════ */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <FinancialStatCard
              title="মোট জমা"
              amount={data.totalContribution}
              subtitle="৬০ মাসের মোট চাঁদা"
              icon={Wallet}
              variant="default"
              compact
            />
            <FinancialStatCard
              title="আমার সঞ্চয়"
              amount={data.personalSavings}
              subtitle="৯০% — সম্পূর্ণ ফেরতযোগ্য"
              icon={PiggyBank}
              variant="emerald"
              compact
            />
            <FinancialStatCard
              title="উন্নয়ন তহবিলে অবদান"
              amount={data.developmentAllocation}
              subtitle="১০% — সমাজ উন্নয়নে ব্যয়"
              icon={HeartHandshake}
              variant="amber"
              compact
            />
            <StatCard
              title="পরিশোধিত মাস"
              value={`${data.paidMonths} / ${data.totalMonths}`}
              subtitle="সকল মাস পরিশোধিত"
              icon={CheckCircle2}
              variant="success"
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            CURRENT MONTH STATUS + SAVINGS DONUT (side by side)
        ════════════════════════════════════════════════════════ */}
        <section className="grid lg:grid-cols-5 gap-6">
          {/* Current Month Contribution Card */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden h-full">
              {/* Card header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-2">
                  <CalendarCheck className="h-5 w-5 text-primary" />
                  <h2 className="text-sm font-bold text-foreground">চলতি মাসের জমা</h2>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">
                  {currentMonth.month} {currentMonth.year}
                </span>
              </div>

              <div className="p-6 space-y-5">
                {/* Status Banner */}
                <div className={cn(
                  "flex items-center justify-between rounded-xl p-4",
                  currentMonth.status === "paid"
                    ? "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800"
                    : "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800"
                )}>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      currentMonth.status === "paid"
                        ? "bg-emerald-100 dark:bg-emerald-900"
                        : "bg-amber-100 dark:bg-amber-900"
                    )}>
                      <CheckCircle2 className={cn(
                        "h-5 w-5",
                        currentMonth.status === "paid"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-amber-600 dark:text-amber-400"
                      )} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground">অবস্থা</p>
                      <p className={cn(
                        "text-base font-extrabold",
                        currentMonth.status === "paid"
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-amber-700 dark:text-amber-300"
                      )}>
                        {currentMonth.status === "paid" ? "✓ জমা দেওয়া হয়েছে" : "⏳ অপেক্ষমাণ"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">পরিমাণ</p>
                    <CurrencyDisplay
                      amount={currentMonth.amount}
                      size="xl"
                      className="font-black text-foreground"
                    />
                  </div>
                </div>

                {/* Breakdown */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 p-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <PiggyBank className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[11px] font-semibold text-muted-foreground">আমার সঞ্চয়</span>
                    </div>
                    <CurrencyDisplay
                      amount={currentMonth.savingsAmount}
                      size="lg"
                      className="font-black text-emerald-700 dark:text-emerald-300"
                    />
                    <p className="text-[10px] text-muted-foreground mt-0.5">৯০% অংশ</p>
                  </div>
                  <div className="rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 p-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <HeartHandshake className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                      <span className="text-[11px] font-semibold text-muted-foreground">উন্নয়ন তহবিল</span>
                    </div>
                    <CurrencyDisplay
                      amount={currentMonth.developmentAmount}
                      size="lg"
                      className="font-black text-amber-700 dark:text-amber-300"
                    />
                    <p className="text-[10px] text-muted-foreground mt-0.5">১০% অংশ</p>
                  </div>
                </div>

                {/* Payment Date */}
                <div className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-2.5 text-xs text-muted-foreground">
                  <span className="font-medium">জমার তারিখ</span>
                  <span className="font-bold text-foreground">
                    {formatDate(currentMonth.paymentDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Overview Donut */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden h-full">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-border bg-muted/30">
                <PiggyBank className="h-5 w-5 text-primary" />
                <h2 className="text-sm font-bold text-foreground">সঞ্চয়ের বিশ্লেষণ</h2>
              </div>

              <div className="p-5 space-y-4">
                {/* Donut Chart */}
                <div className="flex justify-center">
                  <PieChart width={200} height={180}>
                    <Pie
                      data={savingsDonutData}
                      cx={100}
                      cy={90}
                      innerRadius={55}
                      outerRadius={82}
                      paddingAngle={3}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {savingsDonutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any) => [`৳${Number(value || 0).toLocaleString("en-BD")}`, ""]}
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        fontSize: "11px",
                      }}
                    />
                  </PieChart>
                </div>

                {/* Summary rows */}
                <div className="space-y-2 text-xs">
                  {[
                    { label: "মোট জমা", value: data.savingsOverview.totalContribution, color: "text-foreground", dot: "bg-muted-foreground" },
                    { label: "ব্যক্তিগত সঞ্চয় (৯০%)", value: data.savingsOverview.personalSavings, color: "text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-700" },
                    { label: "উন্নয়নে বরাদ্দ (১০%)", value: data.savingsOverview.developmentAllocation, color: "text-amber-700 dark:text-amber-400", dot: "bg-amber-500" },
                    { label: "ফেরত", value: data.savingsOverview.refunded, color: "text-muted-foreground", dot: "bg-slate-400" },
                    { label: "বর্তমান সঞ্চয়", value: data.savingsOverview.currentSavings, color: "text-emerald-800 dark:text-emerald-300 font-bold", dot: "bg-emerald-600" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-1 border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-2">
                        <span className={cn("h-2 w-2 rounded-full shrink-0", row.dot)} />
                        <span className="text-muted-foreground">{row.label}</span>
                      </div>
                      <span className={cn("font-semibold tabular-nums", row.color)}>
                        ৳{row.value.toLocaleString("en-BD")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            RECENT CONTRIBUTIONS TABLE
        ════════════════════════════════════════════════════════ */}
        <section>
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <ReceiptText className="h-5 w-5 text-primary" />
                <h2 className="text-sm font-bold text-foreground">সাম্প্রতিক জমার বিবরণী</h2>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                  সর্বশেষ ৬ মাস
                </span>
              </div>
              <Link href="/member/transactions">
                <Button
                  size="sm"
                  variant="ghost"
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                  className="text-xs font-semibold text-primary"
                >
                  সব জমার হিসাব দেখুন
                </Button>
              </Link>
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="px-5 py-3 text-left font-semibold text-muted-foreground">মাস</th>
                    <th className="px-5 py-3 text-left font-semibold text-muted-foreground">তারিখ</th>
                    <th className="px-5 py-3 text-right font-semibold text-muted-foreground">পরিমাণ</th>
                    <th className="px-5 py-3 text-right font-semibold text-muted-foreground">সঞ্চয় (৯০%)</th>
                    <th className="px-5 py-3 text-right font-semibold text-muted-foreground">উন্নয়ন (১০%)</th>
                    <th className="px-5 py-3 text-center font-semibold text-muted-foreground">অবস্থা</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {data.recentContributions.map((contrib) => {
                    return (
                      <tr
                        key={contrib.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-5 py-3.5 font-semibold text-foreground">
                          {contrib.month} {contrib.year}
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground">
                          {formatDate(contrib.paymentDate)}
                        </td>
                        <td className="px-5 py-3.5 text-right tabular-nums font-bold text-foreground">
                          ৳{contrib.amount.toLocaleString("en-BD")}
                        </td>
                        <td className="px-5 py-3.5 text-right tabular-nums text-emerald-700 dark:text-emerald-400 font-semibold">
                          ৳{contrib.savingsAmount.toLocaleString("en-BD")}
                        </td>
                        <td className="px-5 py-3.5 text-right tabular-nums text-amber-700 dark:text-amber-400 font-semibold">
                          ৳{contrib.developmentAmount.toLocaleString("en-BD")}
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <StatusBadge status={contrib.status} domain="contribution" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile card view */}
            <div className="sm:hidden divide-y divide-border/60">
              {data.recentContributions.map((contrib) => (
                <div key={contrib.id} className="px-4 py-3.5 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-xs text-foreground">{contrib.month} {contrib.year}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{formatDate(contrib.paymentDate)}</p>
                    <div className="flex gap-2 mt-1 text-[10px]">
                      <span className="text-emerald-700 dark:text-emerald-400">সঞ্চয়: ৳{contrib.savingsAmount}</span>
                      <span className="text-amber-700 dark:text-amber-400">উন্নয়ন: ৳{contrib.developmentAmount}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm text-foreground">৳{contrib.amount}</p>
                    <StatusBadge status={contrib.status} domain="contribution" />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="px-6 py-3 border-t border-border/60 bg-muted/20 text-right">
              <Link href="/member/transactions">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer">
                  সব জমার হিসাব দেখুন
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            ORGANIZATION FINANCIAL OVERVIEW
        ════════════════════════════════════════════════════════ */}
        <section>
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-border bg-muted/30">
              <Building2 className="h-5 w-5 text-primary" />
              <h2 className="text-sm font-bold text-foreground">সংগঠনের আর্থিক সংক্ষিপ্তসার</h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Total Collection */}
                <div className="col-span-2 lg:col-span-1 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 dark:from-emerald-950/40 dark:to-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">মোট সংগ্রহ</span>
                  </div>
                  <CurrencyDisplay
                    amount={data.orgFinancialOverview.totalCollection}
                    size="lg"
                    className="font-black text-emerald-800 dark:text-emerald-300"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">সকল সদস্যের মোট চাঁদা</p>
                </div>

                {/* Member Savings */}
                <div className="rounded-xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800 p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">সদস্য সঞ্চয়</span>
                  </div>
                  <CurrencyDisplay
                    amount={data.orgFinancialOverview.memberSavings}
                    size="lg"
                    className="font-black text-sky-800 dark:text-sky-300"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">৯০% — সদস্যদের আমানত</p>
                </div>

                {/* Development Fund */}
                <div className="rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <HeartHandshake className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">উন্নয়ন তহবিল</span>
                  </div>
                  <CurrencyDisplay
                    amount={data.orgFinancialOverview.developmentFund}
                    size="lg"
                    className="font-black text-amber-800 dark:text-amber-300"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">১০% — সমাজ উন্নয়নে</p>
                </div>

                {/* Expenses */}
                <div className="rounded-xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <ReceiptText className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">ব্যয় সম্পন্ন</span>
                  </div>
                  <CurrencyDisplay
                    amount={data.orgFinancialOverview.developmentExpenses}
                    size="lg"
                    className="font-black text-red-800 dark:text-red-300"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">তহবিল থেকে খরচ</p>
                </div>

                {/* Available Fund */}
                <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Banknote className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">অবশিষ্ট তহবিল</span>
                  </div>
                  <CurrencyDisplay
                    amount={data.orgFinancialOverview.availableDevelopmentFund}
                    size="lg"
                    className="font-black text-primary"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">ব্যবহারযোগ্য উন্নয়ন তহবিল</p>
                </div>
              </div>

              {/* Divider note */}
              <div className="mt-4 flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                  সদস্য সঞ্চয় = সদস্যের নিজস্ব আমানত (ফেরতযোগ্য)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  উন্নয়ন তহবিল = সংগঠনের কল্যাণমূলক কাজে ব্যবহৃত
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            MONTHLY CHART
        ════════════════════════════════════════════════════════ */}
        <section>
          <ChartCard
            title="মাসিক সংগ্রহ ও খরচ"
            subtitle="সর্বশেষ ৬ মাসের চাঁদা সংগ্রহ ও উন্নয়ন ব্যয়"
            periods={[]}
          >
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={[...data.monthlyChartData]}
                margin={{ top: 4, right: 8, left: -8, bottom: 0 }}
                barGap={4}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `৳${v}`}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    fontSize: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                  formatter={(value: any, name: any) => [
                    `৳${Number(value || 0).toLocaleString("en-BD")}`,
                    name === "collection" ? "মাসিক সংগ্রহ" : "উন্নয়ন ব্যয়",
                  ]}
                />
                <Legend
                  formatter={(value) =>
                    value === "collection" ? "মাসিক সংগ্রহ" : "উন্নয়ন ব্যয়"
                  }
                  wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }}
                />
                <Bar
                  dataKey="collection"
                  fill="#166534"
                  radius={[5, 5, 0, 0]}
                  maxBarSize={36}
                />
                <Bar
                  dataKey="expense"
                  fill="#D4A72C"
                  radius={[5, 5, 0, 0]}
                  maxBarSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>

        {/* ════════════════════════════════════════════════════════
            RECENT ACTIVITIES + NOTICES (2-column on desktop)
        ════════════════════════════════════════════════════════ */}
        <section className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HeartHandshake className="h-4.5 w-4.5 text-primary" />
                <h2 className="text-sm font-bold text-foreground">সাম্প্রতিক কার্যক্রম</h2>
              </div>
              <Link href="/member/activities">
                <Button
                  size="sm"
                  variant="ghost"
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                  className="text-xs font-semibold text-primary"
                >
                  সব দেখুন
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onViewDetails={() => {}}
                />
              ))}
            </div>
          </div>

          {/* Latest Notices */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="h-4.5 w-4.5 text-primary" />
                <h2 className="text-sm font-bold text-foreground">সর্বশেষ নোটিশ</h2>
              </div>
              <Link href="/member/notices">
                <Button
                  size="sm"
                  variant="ghost"
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                  className="text-xs font-semibold text-primary"
                >
                  সব দেখুন
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {latestNotices.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  onReadMore={() => {}}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </MemberLayout>
  );
}
