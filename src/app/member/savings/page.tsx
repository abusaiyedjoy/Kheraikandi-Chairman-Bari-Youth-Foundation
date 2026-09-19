"use client";

import React, { useState } from "react";
import { MemberLayout } from "@/components/shared/MemberLayout";
import { FinancialStatCard } from "@/components/shared/FinancialStatCard";
import { ChartCard } from "@/components/shared/ChartCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  PiggyBank,
  TrendingUp,
  Wallet,
  ShieldCheck,
  Info,
  ArrowUpRight,
  Sparkles,
  Receipt,
  HelpCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  MEMBER_SAVINGS_SUMMARY,
  MEMBER_SAVINGS_CHART_DATA,
  MEMBER_YEARLY_SAVINGS,
  MEMBER_CONTRIBUTIONS,
} from "@/data/member-portal-data";
import { formatDate } from "@/lib/formatters";

export default function MemberSavingsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"monthly" | "yearly">("monthly");
  const summary = MEMBER_SAVINGS_SUMMARY;

  // Donut chart distribution
  const donutData = [
    { name: "ব্যক্তিগত সঞ্চয় (৯০%)", value: summary.personalSavings, color: "#166534" },
    { name: "উন্নয়ন তহবিল (১০%)", value: summary.developmentAllocation, color: "#d97706" },
  ];

  return (
    <MemberLayout
      breadcrumbs={[
        { label: "ড্যাশবোর্ড", href: "/member/dashboard" },
        { label: "আমার সঞ্চয়" },
      ]}
      memberSavings={summary.currentSavings}
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* ── Page Header ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              আমার সঞ্চয় ও আমানত হিসাব
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              আপনার পরিশোধিত চাঁদা হতে পুঞ্জীভূত সঞ্চয়, অনুপাত বিশ্লেষণ ও ভবিষ্যৎ প্রবৃদ্ধি।
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-500/20">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              ১০০% ফেরতযোগ্য আমানত
            </span>
          </div>
        </div>

        {/* ── Prominent 90% Policy Explanation Banner ─────────── */}
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-50 via-teal-50/60 to-background dark:from-emerald-950/40 dark:via-teal-950/20 dark:to-card p-5 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="h-6 w-6 text-amber-300" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded">
                  সংগঠনের আর্থিক সঞ্চয় নীতি
                </span>
                <span className="text-xs text-muted-foreground font-semibold">ধারা ৪.২</span>
              </div>
              <p className="text-sm font-bold text-foreground leading-relaxed">
                প্রতি মাসিক চাঁদার ৯০% (৳৯০) সরাসরি সদস্যের নিজস্ব ব্যক্তিগত সঞ্চয় হিসেবে সংরক্ষিত থাকে।
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                এই সঞ্চিত অর্থ সদস্যের ব্যক্তিগত আমানত এবং সদস্যপদ ত্যাগ বা অবসরের সময় সম্পূর্ণ অর্থ (১০০%) কোনো কর্তন ছাড়াই ফেরত প্রদান করা হয়। অবশিষ্ট ১০% (৳১০) সংগঠনের স্থায়ী উন্নয়ন ও জনকল্যাণমূলক সামাজিক কাজে ব্যয়িত হয়।
              </p>
            </div>
          </div>
        </div>

        {/* ── 5 Stat Cards Grid ───────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <FinancialStatCard
            title="মোট সংগৃহীত চাঁদা"
            amount={summary.totalContribution}
            variant="default"
            subtitle="৬০ মাসের মোট জমা"
            icon={Wallet}
          />

          <FinancialStatCard
            title="ব্যক্তিগত সঞ্চয় (৯০%)"
            amount={summary.personalSavings}
            variant="emerald"
            subtitle="আপনার পুঞ্জীভূত আমানত"
            icon={PiggyBank}
          />

          <FinancialStatCard
            title="উন্নয়ন তহবিল (১০%)"
            amount={summary.developmentAllocation}
            variant="amber"
            subtitle="সামাজিক কল্যাণ বরাদ্দ"
            icon={TrendingUp}
          />

          <FinancialStatCard
            title="ফেরত গ্রহণ (Refunded)"
            amount={summary.refunded}
            variant="default"
            subtitle="কোনো উত্তোলন নেই"
            icon={ArrowUpRight}
          />

          <FinancialStatCard
            title="বর্তমান মোট সঞ্চয়"
            amount={summary.currentSavings}
            variant="emerald"
            subtitle="উত্তোলনযোগ্য স্থিতি"
            icon={ShieldCheck}
          />
        </div>

        {/* ── Chart & Breakdown Section ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Area Chart: Cumulative Savings Growth */}
          <div className="lg:col-span-2">
            <ChartCard
              title="পুঞ্জীভূত সঞ্চয় প্রবৃদ্ধি চার্ট"
              subtitle="মাসিক ৯০% সঞ্চয় বরাদ্দের ধারাবাহিক বৃদ্ধি (সর্বশেষ ১২ মাস)"
            >
              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={MEMBER_SAVINGS_CHART_DATA}
                    margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#166534" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#166534" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="period"
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(val) => `৳${val}`}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="rounded-xl border border-border bg-card p-3 shadow-lg text-xs space-y-1">
                              <p className="font-bold text-foreground">{label}</p>
                              <p className="text-emerald-700 dark:text-emerald-400 font-semibold">
                                পুঞ্জীভূত সঞ্চয়: ৳{data.cumulativeSavings.toLocaleString("en-BD")}
                              </p>
                              <p className="text-muted-foreground">
                                মাসিক সঞ্চয় জমা: ৳{data.savings}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="cumulativeSavings"
                      stroke="#166534"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#savingsGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          {/* Savings Breakdown Donut & Ratio Card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-base font-bold text-foreground">সঞ্চয় ও তহবিল অনুপাত</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                মাসিক ৳১০০ চাঁদার বিভাজন বিন্যাস
              </p>

              <div className="h-44 w-full my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [
                        `৳${Number(val || 0).toLocaleString("en-BD")}`,
                        "পরিমাণ",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-700 shrink-0" />
                    <span className="font-semibold text-foreground">ব্যক্তিগত সঞ্চয় (৯০%)</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    ৳৫,৪০০
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/20">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-600 shrink-0" />
                    <span className="font-semibold text-foreground">উন্নয়ন অনুদান (১০%)</span>
                  </div>
                  <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
                    ৳৬০০
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-muted/30 border border-border text-[11px] text-muted-foreground">
              💡 <strong>টিপস:</strong> আপনি প্রতি বছর বার্ষিক সাধারণ সভার সময় আপনার সঞ্চয়ের হালনাগাদ নিরীক্ষা সনদপত্র গ্রহণ করতে পারেন।
            </div>
          </div>
        </div>

        {/* ── Yearly Savings Milestones Table ─────────────────── */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground">বছরভিত্তিক সঞ্চয়ের মাইলফলক</h3>
              <p className="text-xs text-muted-foreground">
                ২০২১ সাল হতে ২০২৬ পর্যন্ত বার্ষিক সঞ্চয় ও পুঞ্জীভূত স্থিতির তালিকা
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              সর্বমোট: ৳৫,৪০০
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">অর্থবছর</th>
                  <th className="px-5 py-3 text-center">পরিশোধিত মাস</th>
                  <th className="px-5 py-3 text-right">মোট সংগৃহীত চাঁদা</th>
                  <th className="px-5 py-3 text-right">ব্যক্তিগত সঞ্চয় (৯০%)</th>
                  <th className="px-5 py-3 text-right">উন্নয়ন তহবিল (১০%)</th>
                  <th className="px-5 py-3 text-right">বছরের শেষে পুঞ্জীভূত সঞ্চয়</th>
                  <th className="px-5 py-3 text-center">অবস্থা</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {MEMBER_YEARLY_SAVINGS.map((item) => (
                  <tr key={item.year} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-foreground">
                      {item.year} সাল
                    </td>
                    <td className="px-5 py-3.5 text-center font-mono">
                      {item.months} মাস
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono font-medium text-foreground">
                      ৳{item.contribution.toLocaleString("en-BD")}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      ৳{item.savings.toLocaleString("en-BD")}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-amber-700 dark:text-amber-400">
                      ৳{item.dev.toLocaleString("en-BD")}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono font-extrabold text-foreground">
                      ৳{item.cumulative.toLocaleString("en-BD")}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        সম্পূর্ণ
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
}
