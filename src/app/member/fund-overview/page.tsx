"use client";

import React from "react";
import { MemberLayout } from "@/components/shared/MemberLayout";
import { FinancialStatCard } from "@/components/shared/FinancialStatCard";
import { ChartCard } from "@/components/shared/ChartCard";
import {
  Building2,
  PiggyBank,
  TrendingUp,
  Receipt,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Users,
  Target,
  FileCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ORG_FUND_OVERVIEW } from "@/data/member-portal-data";
import { formatCurrency } from "@/lib/formatters";

export default function MemberFundOverviewPage() {
  const fund = ORG_FUND_OVERVIEW;

  return (
    <MemberLayout
      breadcrumbs={[
        { label: "ড্যাশবোর্ড", href: "/member/dashboard" },
        { label: "সংগঠনের সার্বিক তহবিল" },
      ]}
      memberSavings={5400}
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              সংগঠনের সার্বিক তহবিল বিবরণী
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              সংগঠনের আর্থিক স্বচ্ছতা নীতি ও সাধারণ সদস্যদের জ্ঞাতার্থে অনুমোদিত আর্থিক হিসাব।
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-500/20">
              <FileCheck className="h-4 w-4 text-emerald-600" />
              বার্ষিক অডিট সম্পন্ন
            </span>
          </div>
        </div>

        {/* ── 5 Cards as specified in requirements ────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <FinancialStatCard
            title="মোট তহবিল সংগ্রহ (Total Collection)"
            amount={fund.totalCollection}
            variant="default"
            subtitle="সদস্য চাঁদা ও অন্যান্য আয়"
            icon={Wallet}
          />

          <FinancialStatCard
            title="সদস্যদের মোট সঞ্চয় (Member Savings)"
            amount={fund.memberSavings}
            variant="emerald"
            subtitle="সদস্যদের সংরক্ষিত আমানত (৯০%)"
            icon={PiggyBank}
          />

          <FinancialStatCard
            title="মোট উন্নয়ন তহবিল (Development Fund)"
            amount={fund.developmentFund}
            variant="amber"
            subtitle="১০% বরাদ্দের পুঞ্জীভূত তহবিল"
            icon={TrendingUp}
          />

          <FinancialStatCard
            title="উন্নয়ন ব্যয় (Development Expenses)"
            amount={fund.developmentExpenses}
            variant="amber"
            subtitle="সামাজিক ও জনকল্যাণমূলক খরচ"
            icon={Receipt}
          />

          <FinancialStatCard
            title="অবশিষ্ট উন্নয়ন তহবিল (Available Fund)"
            amount={fund.availableDevelopmentFund}
            variant="emerald"
            subtitle="পরবর্তী ব্যয়ের জন্য মজুদ তহবিল"
            icon={Building2}
          />
        </div>

        {/* ── Monthly Chart (Collection vs Development Expenses) ─ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartCard
              title="মাসিক তহবিল সংগ্রহ বনাম উন্নয়ন ব্যয়"
              subtitle="সর্বশেষ ১২ মাসের সার্বিক আর্থিক প্রবাহ (সংগ্রহ ও কল্যাণমূলক ব্যয়)"
            >
              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={fund.monthlyTrend}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(val) => `৳${val}`}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-xl border border-border bg-card p-3 shadow-lg text-xs space-y-1">
                              <p className="font-bold text-foreground">{label}</p>
                              {payload.map((entry, index) => (
                                <p key={`item-${index}`} style={{ color: entry.color }} className="font-semibold">
                                  {entry.name}: ৳{Number(entry.value).toLocaleString("en-BD")}
                                </p>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: 11, paddingTop: 10 }}
                      formatter={(value) => <span className="text-foreground text-xs">{value}</span>}
                    />
                    <Bar
                      dataKey="collection"
                      name="মাসিক মোট সংগ্রহ"
                      fill="#166534"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="expense"
                      name="উন্নয়ন ব্যয়"
                      fill="#d97706"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          {/* Fund Distribution Breakdown Donut */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-base font-bold text-foreground">তহবিল বিভাজন ও সুরক্ষা</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                সংগঠনের মোট সংগ্রহের বণ্টন চিত্র
              </p>

              <div className="h-44 w-full my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={fund.fundDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {fund.fundDistribution.map((entry, index) => (
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

              <div className="space-y-2 text-xs">
                {fund.fundDistribution.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/40 border border-border">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-semibold text-foreground text-[11px]">{item.name}</span>
                    </div>
                    <span className="font-mono font-bold text-foreground">
                      ৳{item.value.toLocaleString("en-BD")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 text-[11px] text-muted-foreground">
              🛡️ <strong>আমানত সুরক্ষা গ্যারান্টি:</strong> সদস্যদের ব্যক্তিগত সঞ্চয় কোনো অবস্থাতেই সংগঠনের প্রশাসনিক বা পরিচালন ব্যয় খাতে খরচ করা হয় না।
            </div>
          </div>
        </div>

        {/* ── Key Impact Indicators ──────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-border bg-card shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">সক্রিয় নিয়মিত সদস্য</span>
              <p className="text-xl font-extrabold text-foreground font-mono">২৫ জন</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">সম্পন্ন সামাজিক প্রকল্প</span>
              <p className="text-xl font-extrabold text-foreground font-mono">১১ টি</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">উপকারভোগী সাধারণ মানুষ</span>
              <p className="text-xl font-extrabold text-foreground font-mono">১,২৫০+ জন</p>
            </div>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
}
