"use client";

import React from "react";
import { TrendingUp, Plus } from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Button } from "@/components/ui/button";
import { INCOMES, getTotalIncome } from "@/data/incomes";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const CATEGORY_CONFIG: Record<string, { label: string; cls: string }> = {
  membership_fee: { label: "ভর্তি ফি", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400" },
  donation: { label: "দান / অনুদান", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" },
  investment_return: { label: "বিনিয়োগ মুনাফা", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  fine: { label: "জরিমানা", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  other: { label: "অন্যান্য", cls: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
};

const PAYMENT_LABELS: Record<string, string> = {
  cash: "নগদ",
  bkash: "বিকাশ",
  nagad: "নগদ মোবাইল",
  bank_transfer: "ব্যাংক ট্রান্সফার",
};

export default function AdminIncomePage() {
  const total = getTotalIncome();

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "অ্যাডমিন", href: "/admin/dashboard" },
        { label: "আয়" },
      ]}
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1400px] w-full mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              আয় (অন্যান্য)
            </h1>
            <p className="text-sm text-muted-foreground">দান, ভর্তি ফি, বিনিয়োগ মুনাফা ও অন্যান্য আয়</p>
          </div>
          <Button size="sm" className="text-xs" leftIcon={<Plus className="h-3.5 w-3.5" />}>
            নতুন আয় যোগ করুন
          </Button>
        </div>

        {/* Category Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => {
            const items = INCOMES.filter((i) => i.category === key);
            const total = items.reduce((s, i) => s + i.amount, 0);
            return (
              <div key={key} className="rounded-xl border border-border bg-card p-3 text-center">
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", cfg.cls)}>
                  {cfg.label}
                </span>
                <p className="text-sm font-extrabold text-foreground mt-2">{formatCurrency(total)}</p>
                <p className="text-[10px] text-muted-foreground">{items.length}টি লেনদেন</p>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">সর্বমোট আয়</p>
          <p className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400">{formatCurrency(total)}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">শিরোনাম</th>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">বিভাগ</th>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">তারিখ</th>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">দাতা / বিস্তারিত</th>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">পদ্ধতি</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">পরিমাণ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {INCOMES.map((income) => {
                const cfg = CATEGORY_CONFIG[income.category] ?? { label: income.category, cls: "bg-slate-100 text-slate-600" };
                return (
                  <tr key={income.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-foreground">{income.title}</p>
                      {income.remarks && <p className="text-[10px] text-muted-foreground mt-0.5">{income.remarks}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", cfg.cls)}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{income.date}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {income.donorName ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {PAYMENT_LABELS[income.paymentMethod] || income.paymentMethod}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-700 dark:text-emerald-400">
                      {formatCurrency(income.amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
}
