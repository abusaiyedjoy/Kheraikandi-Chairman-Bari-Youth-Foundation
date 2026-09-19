"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Wallet,
  PiggyBank,
  Heart,
  TrendingUp,
  Receipt,
  BarChart3,
  RefreshCw,
  ArrowRight,
  Bell,
  Shield,
  CheckCircle2,
  Clock,
  AlertTriangle,
  UserPlus,
  FileText,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DASHBOARD_SUMMARY, MONTHLY_CONTRIBUTION_CHART_DATA, EXPENSE_CATEGORY_CHART_DATA, BALANCE_TREND_DATA } from "@/data/dashboard";
import { MEMBERS } from "@/data/members";
import { CONTRIBUTIONS } from "@/data/contributions";
import { EXPENSES } from "@/data/expenses";
import { TRANSACTIONS } from "@/data/transactions";
import { formatCurrency } from "@/lib/formatters";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

const ROLE_LABELS: Record<string, string> = {
  president: "সভাপতি",
  secretary: "সাধারণ সম্পাদক",
  treasurer: "কোষাধ্যক্ষ",
  vice_president: "সহ-সভাপতি",
  joint_secretary: "যুগ্ম সম্পাদক",
  organizer: "সংগঠক",
  member: "সাধারণ সদস্য",
};

const STATUS_CONFIG = {
  active: { label: "সক্রিয়", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" },
  inactive: { label: "নিষ্ক্রিয়", color: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
  suspended: { label: "স্থগিত", color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
};

const CATEGORY_LABELS: Record<string, string> = {
  welfare: "কল্যাণ",
  event: "অনুষ্ঠান",
  emergency: "জরুরি",
  office: "অফিস",
  maintenance: "রক্ষণাবেক্ষণ",
  administrative: "প্রশাসনিক",
};

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"contributions" | "expenses" | "members">("contributions");

  const recentContributions = [...CONTRIBUTIONS]
    .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())
    .slice(0, 5);

  const recentExpenses = [...EXPENSES]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const recentMembers = [...MEMBERS]
    .sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
    .slice(0, 5);

  const totalExpenses = EXPENSES.reduce((s, e) => s + e.amount, 0);
  const activeMembers = MEMBERS.filter((m) => m.status === "active").length;

  // Chart color
  const PIE_COLORS = ["#166534", "#22C55E", "#D4A72C", "#64748b", "#0891b2", "#7c3aed"];

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "অ্যাডমিন", href: "/admin/dashboard" },
        { label: "ড্যাশবোর্ড" },
      ]}
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1400px] w-full mx-auto">

        {/* ── Welcome Banner ─────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#166534] via-[#14532d] to-[#0d3b1f] p-6 sm:p-8 text-white shadow-xl">
          <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-5 -bottom-8 h-40 w-40 rounded-full bg-amber-400/10 blur-2xl" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-0.5 text-xs font-semibold text-emerald-200 backdrop-blur-sm border border-white/10">
                <Shield className="h-3 w-3 text-[#D4A72C]" />
                <span>অ্যাডমিনিস্ট্রেটর পোর্টাল</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                শুভেচ্ছা, Admin 👋
              </h1>
              <p className="text-sm text-emerald-100/80 max-w-md">
                সংগঠনের বর্তমান কার্যক্রম ও আর্থিক অবস্থা এক নজরে দেখুন।
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link href="/admin/members/add">
                <Button
                  size="sm"
                  className="bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-semibold"
                  leftIcon={<UserPlus className="h-3.5 w-3.5" />}
                >
                  সদস্য যোগ করুন
                </Button>
              </Link>
              <Link href="/admin/reports/financial">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 bg-white/10 text-white hover:bg-white/20 text-xs"
                  leftIcon={<FileText className="h-3.5 w-3.5" />}
                >
                  প্রতিবেদন
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Info Pills */}
          <div className="relative z-10 mt-5 flex flex-wrap gap-3">
            {[
              { label: "মোট সদস্য", value: `${DASHBOARD_SUMMARY.totalMembers} জন` },
              { label: "সক্রিয়", value: `${activeMembers} জন` },
              { label: "চলতি ব্যালেন্স", value: formatCurrency(DASHBOARD_SUMMARY.currentBalance) },
              { label: "মাসিক আদায়", value: `${DASHBOARD_SUMMARY.thisMonthContributions}টি` },
            ].map((pill) => (
              <div key={pill.label} className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/10">
                <p className="text-[10px] text-emerald-200">{pill.label}</p>
                <p className="text-sm font-bold text-white">{pill.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Statistics Cards ─────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="মোট সদস্য"
            value={`${DASHBOARD_SUMMARY.totalMembers} জন`}
            subtitle={`${activeMembers} জন সক্রিয়`}
            icon={Users}
            variant="default"
            trend={{ value: 8, label: "গত মাসের তুলনায়" }}
          />
          <StatCard
            title="কেন্দ্রীয় ব্যালেন্স"
            value={DASHBOARD_SUMMARY.currentBalance}
            isCurrency
            icon={TrendingUp}
            variant="success"
            trend={{ value: -5.2, label: "গত মাসের তুলনায়" }}
          />
          <StatCard
            title="সদস্যদের সঞ্চয়"
            value={DASHBOARD_SUMMARY.totalSavings}
            isCurrency
            icon={PiggyBank}
            variant="primary"
            trend={{ value: 3.1, label: "গত মাসের তুলনায়" }}
          />
          <StatCard
            title="সমাজকল্যাণ তহবিল"
            value={DASHBOARD_SUMMARY.totalDevelopmentFund}
            isCurrency
            icon={Heart}
            variant="warning"
            trend={{ value: 3.1, label: "গত মাসের তুলনায়" }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="মোট চাঁদা আদায়"
            value={DASHBOARD_SUMMARY.totalSavings + DASHBOARD_SUMMARY.totalDevelopmentFund}
            isCurrency
            icon={Wallet}
            variant="default"
          />
          <StatCard
            title="মোট ব্যয়"
            value={totalExpenses}
            isCurrency
            icon={Receipt}
            variant="danger"
          />
          <StatCard
            title="মোট বিনিয়োগ"
            value={DASHBOARD_SUMMARY.totalInvestments}
            isCurrency
            icon={BarChart3}
            variant="default"
          />
          <StatCard
            title="বকেয়া চাঁদা"
            value={`${DASHBOARD_SUMMARY.pendingContributions}টি`}
            subtitle="সংগ্রহ প্রয়োজন"
            icon={AlertTriangle}
            variant="warning"
          />
        </div>

        {/* ── Charts Row ───────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Balance Trend */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-foreground">ব্যালেন্স প্রবণতা</h3>
                <p className="text-xs text-muted-foreground">গত ৬ মাসের তহবিল পরিবর্তন</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={BALANCE_TREND_DATA} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#166534" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#166534" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(v: unknown) => [formatCurrency(Number(v)), "ব্যালেন্স"]}
                  contentStyle={{ fontSize: 11, borderRadius: 8 }}
                />
                <Area type="monotone" dataKey="balance" stroke="#166534" strokeWidth={2} fill="url(#balGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Breakdown */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-foreground">ব্যয়ের বিশ্লেষণ</h3>
              <p className="text-xs text-muted-foreground">বিভাগ অনুযায়ী</p>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={EXPENSE_CATEGORY_CHART_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  dataKey="amount"
                  nameKey="category"
                >
                  {EXPENSE_CATEGORY_CHART_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: unknown) => [formatCurrency(Number(v))]}
                  contentStyle={{ fontSize: 11, borderRadius: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1">
              {EXPENSE_CATEGORY_CHART_DATA.slice(0, 4).map((item, i) => (
                <div key={item.category} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                    <span className="text-muted-foreground">{item.category}</span>
                  </div>
                  <span className="font-semibold text-foreground">{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Monthly Contribution Chart ────────────────────────── */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-foreground">মাসিক চাঁদা সংগ্রহ</h3>
              <p className="text-xs text-muted-foreground">লক্ষ্যমাত্রার বিপরীতে সংগ্রহ</p>
            </div>
            <Link href="/admin/contributions">
              <Button variant="outline" size="sm" className="text-xs">
                সকল দেখুন
              </Button>
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MONTHLY_CONTRIBUTION_CHART_DATA} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `৳${v}`} />
              <Tooltip
                formatter={(v: unknown) => [formatCurrency(Number(v))]}
                contentStyle={{ fontSize: 11, borderRadius: 8 }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="expected" name="লক্ষ্যমাত্রা" fill="#e2e8f0" radius={[3, 3, 0, 0]} />
              <Bar dataKey="collected" name="সংগৃহীত" fill="#166534" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Quick Action Cards ───────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              href: "/admin/contributions",
              icon: Wallet,
              iconBg: "bg-emerald-100 dark:bg-emerald-950",
              iconColor: "text-emerald-700 dark:text-emerald-400",
              title: "চাঁদা সংগ্রহ",
              desc: "চলতি মাসের চাঁদা এন্ট্রি ও অনুমোদন",
            },
            {
              href: "/admin/members",
              icon: Users,
              iconBg: "bg-amber-100 dark:bg-amber-950",
              iconColor: "text-amber-700 dark:text-amber-400",
              title: "সদস্য তালিকা",
              desc: "২৫ জন নিবন্ধিত সদস্যের পরিচালনা",
            },
            {
              href: "/admin/expenses",
              icon: Receipt,
              iconBg: "bg-red-100 dark:bg-red-950",
              iconColor: "text-red-700 dark:text-red-400",
              title: "ব্যয় অনুমোদন",
              desc: "ব্যয় ভাউচার যাচাই ও অনুমোদন",
            },
            {
              href: "/admin/notices",
              icon: Bell,
              iconBg: "bg-sky-100 dark:bg-sky-950",
              iconColor: "text-sky-600 dark:text-sky-400",
              title: "নোটিশ প্রকাশ",
              desc: "সদস্যদের জন্য নোটিশ আপডেট করুন",
            },
          ].map((card) => (
            <Link key={card.href} href={card.href}>
              <div className="group rounded-2xl border border-border bg-card p-4 space-y-3 shadow-xs hover:shadow-md hover:border-primary/20 transition-all cursor-pointer">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", card.iconBg, card.iconColor)}>
                  <card.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{card.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{card.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>পরিচালনা করুন</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Recent Activity Tabs ─────────────────────────────── */}
        <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
          {/* Tab Header */}
          <div className="flex border-b border-border">
            {[
              { key: "contributions", label: "সাম্প্রতিক চাঁদা" },
              { key: "expenses", label: "সাম্প্রতিক ব্যয়" },
              { key: "members", label: "নতুন সদস্য" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={cn(
                  "flex-1 px-4 py-3 text-xs font-semibold border-b-2 transition-colors",
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === "contributions" && (
              <div className="space-y-2">
                {recentContributions.map((c) => (
                  <div key={c.id} className="flex items-center justify-between rounded-lg p-2.5 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{c.memberName}</p>
                        <p className="text-[10px] text-muted-foreground">{c.year}/{c.month < 10 ? `0${c.month}` : c.month} — {c.paymentDate}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{formatCurrency(c.amount)}</p>
                      <span className={cn(
                        "text-[9px] font-bold rounded-full px-1.5 py-0.5",
                        c.status === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      )}>
                        {c.status === "paid" ? "পরিশোধিত" : "বকেয়া"}
                      </span>
                    </div>
                  </div>
                ))}
                <Link href="/admin/contributions" className="block pt-1">
                  <Button variant="outline" size="sm" className="w-full text-xs" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                    সকল চাঁদার হিসাব দেখুন
                  </Button>
                </Link>
              </div>
            )}

            {activeTab === "expenses" && (
              <div className="space-y-2">
                {recentExpenses.map((e) => (
                  <div key={e.id} className="flex items-center justify-between rounded-lg p-2.5 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40 shrink-0">
                        <Receipt className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{e.title}</p>
                        <p className="text-[10px] text-muted-foreground">{e.date} — {CATEGORY_LABELS[e.category] || e.category}</p>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-red-600 dark:text-red-400 shrink-0">{formatCurrency(e.amount)}</p>
                  </div>
                ))}
                <Link href="/admin/expenses" className="block pt-1">
                  <Button variant="outline" size="sm" className="w-full text-xs" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                    সকল ব্যয়ের হিসাব দেখুন
                  </Button>
                </Link>
              </div>
            )}

            {activeTab === "members" && (
              <div className="space-y-2">
                {recentMembers.map((m) => (
                  <div key={m.id} className="flex items-center justify-between rounded-lg p-2.5 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs shrink-0">
                        {m.fullNameBn.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{m.fullNameBn}</p>
                        <p className="text-[10px] text-muted-foreground">{m.memberId} — {ROLE_LABELS[m.role] || m.role}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "text-[9px] font-bold rounded-full px-1.5 py-0.5 shrink-0",
                      STATUS_CONFIG[m.status]?.color
                    )}>
                      {STATUS_CONFIG[m.status]?.label}
                    </span>
                  </div>
                ))}
                <Link href="/admin/members" className="block pt-1">
                  <Button variant="outline" size="sm" className="w-full text-xs" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                    সকল সদস্য দেখুন
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ── Financial Summary Cards ──────────────────────────── */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/10 p-5 border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400">মোট আয়</h4>
            </div>
            <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">
              {formatCurrency(DASHBOARD_SUMMARY.totalIncome)}
            </p>
            <p className="text-[10px] text-emerald-600/70 mt-1">চাঁদা + দান + বিনিয়োগ মুনাফা</p>
          </div>

          <div className="rounded-2xl border border-border bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/10 p-5 border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 mb-3">
              <Receipt className="h-4 w-4 text-red-700 dark:text-red-400" />
              <h4 className="text-xs font-bold text-red-700 dark:text-red-400">মোট ব্যয়</h4>
            </div>
            <p className="text-xl font-extrabold text-red-700 dark:text-red-400">
              {formatCurrency(totalExpenses)}
            </p>
            <p className="text-[10px] text-red-600/70 mt-1">কল্যাণ + অনুষ্ঠান + জরুরি + অফিস</p>
          </div>

          <div className="rounded-2xl border border-border bg-gradient-to-br from-sky-50 to-sky-100/50 dark:from-sky-950/30 dark:to-sky-900/10 p-5 border-sky-200 dark:border-sky-800">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-4 w-4 text-sky-700 dark:text-sky-400" />
              <h4 className="text-xs font-bold text-sky-700 dark:text-sky-400">বিনিয়োগ মুনাফা</h4>
            </div>
            <p className="text-xl font-extrabold text-sky-700 dark:text-sky-400">
              {formatCurrency(DASHBOARD_SUMMARY.investmentProfits)}
            </p>
            <p className="text-[10px] text-sky-600/70 mt-1">এফডিআর + জমির ভাড়া + অংশীদারিত্ব</p>
          </div>
        </div>

        {/* ── Contribution Status Overview ─────────────────────── */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: CheckCircle2,
              iconColor: "text-emerald-600",
              bg: "bg-emerald-100 dark:bg-emerald-900/40",
              label: "পরিশোধিত চাঁদা",
              value: CONTRIBUTIONS.filter((c) => c.status === "paid").length,
              unit: "টি",
              color: "text-emerald-700 dark:text-emerald-400",
            },
            {
              icon: Clock,
              iconColor: "text-amber-600",
              bg: "bg-amber-100 dark:bg-amber-900/40",
              label: "বকেয়া চাঁদা",
              value: DASHBOARD_SUMMARY.pendingContributions,
              unit: "টি",
              color: "text-amber-700 dark:text-amber-400",
            },
            {
              icon: AlertTriangle,
              iconColor: "text-red-600",
              bg: "bg-red-100 dark:bg-red-900/40",
              label: "অতিরিক্ত বকেয়া",
              value: DASHBOARD_SUMMARY.overdueContributions,
              unit: "টি",
              color: "text-red-700 dark:text-red-400",
            },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-xs">
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl shrink-0", item.bg)}>
                <item.icon className={cn("h-6 w-6", item.iconColor)} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className={cn("text-2xl font-extrabold tabular-nums", item.color)}>
                  {item.value}
                  <span className="text-sm font-medium ml-0.5">{item.unit}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
}
