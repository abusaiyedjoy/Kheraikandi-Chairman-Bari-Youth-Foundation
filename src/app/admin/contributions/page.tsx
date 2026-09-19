"use client";

import React, { useState, useMemo } from "react";
import {
  Wallet,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Plus,
  Filter,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Button } from "@/components/ui/button";
import { CONTRIBUTIONS } from "@/data/contributions";
import { MEMBERS } from "@/data/members";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const MONTH_NAMES = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
];

const STATUS_CONFIG = {
  paid: { label: "পরিশোধিত", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400", icon: CheckCircle2 },
  pending: { label: "বকেয়া", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400", icon: Clock },
  overdue: { label: "অতিরিক্ত বকেয়া", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400", icon: AlertTriangle },
  waived: { label: "মওকুফ", cls: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400", icon: CheckCircle2 },
};

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cash: "নগদ",
  bkash: "বিকাশ",
  nagad: "নগদ মোবাইল",
  bank_transfer: "ব্যাংক ট্রান্সফার",
};

export default function AdminContributionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("2024");

  const filtered = useMemo(() => {
    return CONTRIBUTIONS.filter((c) => {
      const matchSearch = !search || c.memberName.toLowerCase().includes(search.toLowerCase()) || c.memberId.includes(search);
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      const matchMonth = monthFilter === "all" || c.month === parseInt(monthFilter);
      const matchYear = yearFilter === "all" || c.year === parseInt(yearFilter);
      return matchSearch && matchStatus && matchMonth && matchYear;
    }).sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime());
  }, [search, statusFilter, monthFilter, yearFilter]);

  const totalPaid = CONTRIBUTIONS.filter(c => c.status === "paid").reduce((s, c) => s + c.amount, 0);
  const totalSavings = CONTRIBUTIONS.filter(c => c.status === "paid").reduce((s, c) => s + c.savingsAmount, 0);
  const totalDev = CONTRIBUTIONS.filter(c => c.status === "paid").reduce((s, c) => s + c.developmentAmount, 0);
  const pendingCount = CONTRIBUTIONS.filter(c => c.status === "pending" || c.status === "overdue").length;

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "অ্যাডমিন", href: "/admin/dashboard" },
        { label: "চাঁদা সংগ্রহ" },
      ]}
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1400px] w-full mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              চাঁদা সংগ্রহ
            </h1>
            <p className="text-sm text-muted-foreground">{filtered.length}টি রেকর্ড</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs" leftIcon={<Download className="h-3.5 w-3.5" />}>
              রপ্তানি
            </Button>
            <Button size="sm" className="text-xs" leftIcon={<Plus className="h-3.5 w-3.5" />}>
              চাঁদা এন্ট্রি
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "মোট সংগ্রহ", value: formatCurrency(totalPaid), cls: "border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400" },
            { label: "সঞ্চয় (৯০%)", value: formatCurrency(totalSavings), cls: "border-sky-200 dark:border-sky-800 bg-sky-50/50 dark:bg-sky-950/20 text-sky-700 dark:text-sky-400" },
            { label: "উন্নয়ন (১০%)", value: formatCurrency(totalDev), cls: "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400" },
            { label: "বকেয়া", value: `${pendingCount}টি`, cls: "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400" },
          ].map((s) => (
            <div key={s.label} className={cn("rounded-xl border p-4", s.cls)}>
              <p className="text-lg font-extrabold">{s.value}</p>
              <p className="text-xs opacity-70 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="সদস্যের নাম বা আইডি..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="all">সকল মাস</option>
            {MONTH_NAMES.map((m, i) => <option key={i + 1} value={i + 1}>{m}</option>)}
          </select>
          <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30">
            {["2024", "2023", "2022"].map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="all">সকল স্ট্যাটাস</option>
            <option value="paid">পরিশোধিত</option>
            <option value="pending">বকেয়া</option>
            <option value="overdue">অতিরিক্ত বকেয়া</option>
            <option value="waived">মওকুফ</option>
          </select>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">সদস্য</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">মাস / বছর</th>
                  <th className="px-4 py-3 text-right font-semibold text-muted-foreground">পরিমাণ</th>
                  <th className="px-4 py-3 text-right font-semibold text-muted-foreground">সঞ্চয় (৯০%)</th>
                  <th className="px-4 py-3 text-right font-semibold text-muted-foreground">উন্নয়ন (১০%)</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">তারিখ</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">পদ্ধতি</th>
                  <th className="px-4 py-3 text-center font-semibold text-muted-foreground">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => {
                  const status = STATUS_CONFIG[c.status];
                  return (
                    <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-foreground">{c.memberName}</p>
                        <p className="text-[10px] text-muted-foreground">{c.memberId}</p>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {MONTH_NAMES[c.month - 1]} {c.year}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-foreground">
                        {formatCurrency(c.amount)}
                      </td>
                      <td className="px-4 py-3 text-right text-emerald-700 dark:text-emerald-400 font-semibold">
                        {formatCurrency(c.savingsAmount)}
                      </td>
                      <td className="px-4 py-3 text-right text-amber-700 dark:text-amber-400 font-semibold">
                        {formatCurrency(c.developmentAmount)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{c.paymentDate}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {PAYMENT_METHOD_LABELS[c.paymentMethod] || c.paymentMethod}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", status.cls)}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center text-sm text-muted-foreground">কোনো রেকর্ড পাওয়া যায়নি</div>
            )}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
