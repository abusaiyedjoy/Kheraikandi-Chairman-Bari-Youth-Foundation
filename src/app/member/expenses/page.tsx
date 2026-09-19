"use client";

import React, { useState, useMemo } from "react";
import { MemberLayout } from "@/components/shared/MemberLayout";
import { FinancialStatCard } from "@/components/shared/FinancialStatCard";
import { StatCard } from "@/components/shared/StatCard";
import { SearchInput } from "@/components/shared/SearchInput";
import { Button } from "@/components/ui/button";
import {
  Receipt,
  Filter,
  Calendar,
  Layers,
  ArrowUpDown,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { EXPENSES } from "@/data/expenses";
import { formatDate } from "@/lib/formatters";

// Bengali labels for expense categories
const CATEGORY_MAP: Record<string, { label: string; badgeClass: string }> = {
  welfare: {
    label: "জনকল্যাণ ও সহায়তা",
    badgeClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  },
  event: {
    label: "সামাজিক কর্মসূচি ও সভা",
    badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  },
  administrative: {
    label: "প্রশাসনিক ব্যয়",
    badgeClass: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
  },
  maintenance: {
    label: "রক্ষণাবেক্ষণ ও সেবা",
    badgeClass: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  },
  office: {
    label: "দাপ্তরিক সরবরাহ",
    badgeClass: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
  },
  emergency: {
    label: "জরুরি ত্রাণ",
    badgeClass: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  },
};

export default function MemberExpensesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [amountRange, setAmountRange] = useState<string>("all");

  const filteredExpenses = useMemo(() => {
    return EXPENSES.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // Year/Date filter
      if (selectedYear !== "all") {
        const itemYear = new Date(item.date).getFullYear().toString();
        if (itemYear !== selectedYear) return false;
      }
      // Amount filter
      if (amountRange !== "all") {
        if (amountRange === "under1000" && item.amount >= 1000) return false;
        if (amountRange === "1000to5000" && (item.amount < 1000 || item.amount > 5000)) return false;
        if (amountRange === "above5000" && item.amount <= 5000) return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesRemarks = item.remarks?.toLowerCase().includes(q) || false;
        const matchesCat = (CATEGORY_MAP[item.category]?.label || "").toLowerCase().includes(q);
        if (!matchesTitle && !matchesRemarks && !matchesCat) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedYear, amountRange]);

  const totalExpenseAmount = useMemo(() => {
    return filteredExpenses.reduce((sum, item) => sum + item.amount, 0);
  }, [filteredExpenses]);

  return (
    <MemberLayout
      breadcrumbs={[
        { label: "ড্যাশবোর্ড", href: "/member/dashboard" },
        { label: "খরচের হিসাব" },
      ]}
      memberSavings={5400}
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* ── Page Header ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              উন্নয়ন ও কল্যাণমূলক ব্যয়ের হিসাব
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              উন্নয়ন তহবিল (১০%) ও সাধারণ তহবিল হতে অনুমোদিত সকল খরচের স্বচ্ছ ও উন্মুক্ত বিবরণী।
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-500/20">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              কমিটি কর্তৃক অনুমোদিত
            </span>
          </div>
        </div>

        {/* ── Summary Stats ──────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FinancialStatCard
            title="মোট প্রদর্শিত ব্যয়"
            amount={totalExpenseAmount}
            variant="amber"
            subtitle={`${filteredExpenses.length} টি অনুমোদিত ভাউচার`}
            icon={Receipt}
          />

          <StatCard
            title="মোট অনুমোদিত ভাউচার"
            value={`${filteredExpenses.length} টি`}
            variant="default"
            subtitle="যথাযথ নিরীক্ষা ও প্রমাণপত্রসহ"
            icon={FileText}
          />

          <FinancialStatCard
            title="গড় ভাউচার পরিমাণ"
            amount={filteredExpenses.length ? Math.round(totalExpenseAmount / filteredExpenses.length) : 0}
            variant="default"
            subtitle="প্রতি প্রকল্পে গড় ব্যয়"
            icon={Layers}
          />
        </div>

        {/* ── Filters Toolbar ────────────────────────────────── */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search */}
            <div className="w-full lg:w-80">
              <SearchInput
                placeholder="খরচের খাত বা উদ্দেশ্য খুঁজুন..."
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
                className="w-full"
              />
            </div>

            {/* Dropdowns */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Category Filter */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <Filter className="h-3.5 w-3.5" />
                <span>ক্যাটাগরি:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="all">সকল ক্যাটাগরি</option>
                  <option value="welfare">জনকল্যাণ ও সহায়তা</option>
                  <option value="event">সামাজিক কর্মসূচি</option>
                  <option value="emergency">জরুরি ত্রাণ</option>
                  <option value="administrative">প্রশাসনিক ব্যয়</option>
                  <option value="maintenance">রক্ষণাবেক্ষণ</option>
                  <option value="office">দাপ্তরিক সরবরাহ</option>
                </select>
              </div>

              {/* Year Filter */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <span>বছর:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="all">সকল বছর</option>
                  <option value="2024">২০২৪</option>
                  <option value="2023">২০২৩</option>
                </select>
              </div>

              {/* Amount Range */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <span>পরিমাণ:</span>
                <select
                  value={amountRange}
                  onChange={(e) => setAmountRange(e.target.value)}
                  className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="all">যেকোনো পরিমাণ</option>
                  <option value="under1000">৳১,০০০ এর নিচে</option>
                  <option value="1000to5000">৳১,০০০ – ৳৫,০০০</option>
                  <option value="above5000">৳৫,০০০ এর উপরে</option>
                </select>
              </div>

              {(selectedCategory !== "all" || selectedYear !== "all" || amountRange !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedYear("all");
                    setAmountRange("all");
                    setSearchQuery("");
                  }}
                  className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-semibold ml-1"
                >
                  রিসেট
                </button>
              )}
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            মোট <span className="font-bold text-foreground">{filteredExpenses.length}</span> টি ব্যয়ের রেকর্ড প্রদর্শিত হচ্ছে
          </div>
        </div>

        {/* ── Expenses Table (Desktop) ───────────────────────── */}
        <div className="hidden md:block rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
                <tr>
                  <th className="px-5 py-3.5">তারিখ</th>
                  <th className="px-5 py-3.5">উদ্দেশ্য ও খাতের বিবরণ</th>
                  <th className="px-5 py-3.5">ক্যাটাগরি</th>
                  <th className="px-5 py-3.5">পেমেন্ট মাধ্যম</th>
                  <th className="px-5 py-3.5 text-right">পরিমাণ (Amount)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense) => {
                    const catInfo = CATEGORY_MAP[expense.category] || {
                      label: expense.category,
                      badgeClass: "bg-muted text-foreground",
                    };
                    return (
                      <tr key={expense.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-3.5 font-mono text-muted-foreground whitespace-nowrap">
                          {formatDate(expense.date)}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="font-bold text-foreground">{expense.title}</div>
                          {expense.remarks && (
                            <div className="text-[11px] text-muted-foreground mt-0.5">{expense.remarks}</div>
                          )}
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${catInfo.badgeClass}`}>
                            {catInfo.label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground capitalize">
                          {expense.paymentMethod}
                        </td>
                        <td className="px-5 py-3.5 text-right font-extrabold text-amber-700 dark:text-amber-400 font-mono text-sm whitespace-nowrap">
                          ৳{expense.amount.toLocaleString("en-BD")}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                      কোনো ব্যয়ের রেকর্ড পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Expenses Cards (Mobile) ────────────────────────── */}
        <div className="md:hidden space-y-3">
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense) => {
              const catInfo = CATEGORY_MAP[expense.category] || {
                label: expense.category,
                badgeClass: "bg-muted text-foreground",
              };
              return (
                <div
                  key={expense.id}
                  className="p-4 rounded-2xl border border-border bg-card shadow-xs space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${catInfo.badgeClass}`}>
                      {catInfo.label}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {formatDate(expense.date)}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-foreground">{expense.title}</h4>
                    {expense.remarks && (
                      <p className="text-xs text-muted-foreground mt-0.5">{expense.remarks}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
                    <span className="text-muted-foreground">পেমেন্ট: {expense.paymentMethod}</span>
                    <span className="font-extrabold text-sm text-amber-700 dark:text-amber-400 font-mono">
                      ৳{expense.amount.toLocaleString("en-BD")}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-muted-foreground border border-border rounded-2xl bg-card">
              কোনো ব্যয়ের রেকর্ড পাওয়া যায়নি।
            </div>
          )}
        </div>
      </div>
    </MemberLayout>
  );
}
