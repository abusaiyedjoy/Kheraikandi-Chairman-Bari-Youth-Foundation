"use client";

import React, { useState, useMemo } from "react";
import { ArrowLeftRight, TrendingUp, TrendingDown, Search } from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { TRANSACTIONS } from "@/data/transactions";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const TYPE_CONFIG = {
  income: { label: "আয়", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" },
  expense: { label: "ব্যয়", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
};

const CATEGORY_LABELS: Record<string, string> = {
  contribution: "চাঁদা",
  donation: "দান",
  investment_return: "বিনিয়োগ মুনাফা",
  fine: "জরিমানা",
  membership_fee: "ভর্তি ফি",
  other: "অন্যান্য",
  welfare: "কল্যাণ",
  event: "অনুষ্ঠান",
  emergency: "জরুরি",
  office: "অফিস",
  maintenance: "রক্ষণাবেক্ষণ",
  administrative: "প্রশাসনিক",
};

export default function AdminTransactionsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = useMemo(() => {
    return TRANSACTIONS.filter((t) => {
      const matchSearch = !search || t.description.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "all" || t.type === typeFilter;
      return matchSearch && matchType;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [search, typeFilter]);

  const totalIncome = TRANSACTIONS.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = TRANSACTIONS.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "অ্যাডমিন", href: "/admin/dashboard" },
        { label: "লেনদেন" },
      ]}
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1400px] w-full mx-auto">

        <div>
          <h1 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5 text-primary" />
            লেনদেন
          </h1>
          <p className="text-sm text-muted-foreground">সকল আয় ও ব্যয়ের সাধারণ খাতা</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">মোট আয়</p>
            </div>
            <p className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <p className="text-xs font-semibold text-red-700 dark:text-red-400">মোট ব্যয়</p>
            </div>
            <p className="text-lg font-extrabold text-red-700 dark:text-red-400">{formatCurrency(totalExpense)}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2">বর্তমান ব্যালেন্স</p>
            <p className="text-lg font-extrabold text-foreground">{formatCurrency(176560)}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="বিবরণ দিয়ে খুঁজুন..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="all">আয় ও ব্যয়</option>
            <option value="income">শুধু আয়</option>
            <option value="expense">শুধু ব্যয়</option>
          </select>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">তারিখ</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">বিবরণ</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">বিভাগ</th>
                  <th className="px-4 py-3 text-center font-semibold text-muted-foreground">ধরন</th>
                  <th className="px-4 py-3 text-right font-semibold text-muted-foreground">পরিমাণ</th>
                  <th className="px-4 py-3 text-right font-semibold text-muted-foreground">ব্যালেন্স</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((t) => {
                  const cfg = TYPE_CONFIG[t.type];
                  return (
                    <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{t.date}</td>
                      <td className="px-4 py-3 text-foreground max-w-xs">
                        <p className="font-medium truncate">{t.description}</p>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {CATEGORY_LABELS[t.category] || t.category}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", cfg.cls)}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className={cn(
                        "px-4 py-3 text-right font-bold",
                        t.type === "income" ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"
                      )}>
                        {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-foreground">
                        {formatCurrency(t.balance)}
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
