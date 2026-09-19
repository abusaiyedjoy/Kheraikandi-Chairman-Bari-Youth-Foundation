"use client";

import React, { useState, useMemo } from "react";
import { Receipt, Plus, Search, Download } from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Button } from "@/components/ui/button";
import { EXPENSES, getTotalExpenses } from "@/data/expenses";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const CATEGORY_CONFIG: Record<string, { label: string; cls: string }> = {
  welfare: { label: "কল্যাণ", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" },
  event: { label: "অনুষ্ঠান", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400" },
  emergency: { label: "জরুরি", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  office: { label: "অফিস", cls: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
  maintenance: { label: "রক্ষণাবেক্ষণ", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  administrative: { label: "প্রশাসনিক", cls: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400" },
};

const PAYMENT_LABELS: Record<string, string> = {
  cash: "নগদ",
  bkash: "বিকাশ",
  nagad: "নগদ মোবাইল",
  bank_transfer: "ব্যাংক ট্রান্সফার",
};

export default function AdminExpensesPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = useMemo(() => {
    return EXPENSES.filter((e) => {
      const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === "all" || e.category === categoryFilter;
      return matchSearch && matchCat;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [search, categoryFilter]);

  const total = getTotalExpenses();

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "অ্যাডমিন", href: "/admin/dashboard" },
        { label: "ব্যয়" },
      ]}
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1400px] w-full mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary" />
              ব্যয় ভাউচার
            </h1>
            <p className="text-sm text-muted-foreground">মোট ব্যয়: {formatCurrency(total)}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs" leftIcon={<Download className="h-3.5 w-3.5" />}>
              রপ্তানি
            </Button>
            <Button size="sm" className="text-xs" leftIcon={<Plus className="h-3.5 w-3.5" />}>
              নতুন ব্যয়
            </Button>
          </div>
        </div>

        {/* Category Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => {
            const items = EXPENSES.filter((e) => e.category === key);
            const catTotal = items.reduce((s, e) => s + e.amount, 0);
            return (
              <div key={key} className="rounded-xl border border-border bg-card p-3 text-center">
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", cfg.cls)}>
                  {cfg.label}
                </span>
                <p className="text-sm font-extrabold text-foreground mt-2">{formatCurrency(catTotal)}</p>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="শিরোনাম দিয়ে খুঁজুন..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="all">সকল বিভাগ</option>
            {Object.entries(CATEGORY_CONFIG).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">শিরোনাম</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">বিভাগ</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">তারিখ</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">পদ্ধতি</th>
                  <th className="px-4 py-3 text-right font-semibold text-muted-foreground">পরিমাণ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((expense) => {
                  const cfg = CATEGORY_CONFIG[expense.category] ?? { label: expense.category, cls: "bg-slate-100 text-slate-600" };
                  return (
                    <tr key={expense.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-foreground">{expense.title}</p>
                        {expense.remarks && <p className="text-[10px] text-muted-foreground mt-0.5">{expense.remarks}</p>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", cfg.cls)}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{expense.date}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {PAYMENT_LABELS[expense.paymentMethod] || expense.paymentMethod}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-red-700 dark:text-red-400">
                        {formatCurrency(expense.amount)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
