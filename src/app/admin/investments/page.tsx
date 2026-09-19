"use client";

import React from "react";
import { BarChart3, Plus, TrendingUp } from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Button } from "@/components/ui/button";
import { INVESTMENTS, getActiveInvestments, getTotalProfits } from "@/data/investments";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const TYPE_LABELS: Record<string, string> = {
  fdr: "এফডিআর / সঞ্চয়পত্র",
  land: "জমি বিনিয়োগ",
  business: "ব্যবসায়িক অংশীদারিত্ব",
  loan: "সুদমুক্ত ঋণ",
  other: "অন্যান্য",
};

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  active: { label: "সক্রিয়", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" },
  matured: { label: "মেয়াদ শেষ", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400" },
  cancelled: { label: "বাতিল", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
};

export default function AdminInvestmentsPage() {
  const active = getActiveInvestments();
  const totalInvested = active.reduce((s, i) => s + i.investedAmount, 0);
  const totalCurrentValue = active.reduce((s, i) => s + (i.currentValue ?? i.investedAmount), 0);
  const totalProfit = getTotalProfits();

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "অ্যাডমিন", href: "/admin/dashboard" },
        { label: "বিনিয়োগ" },
      ]}
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1400px] w-full mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              বিনিয়োগ পোর্টফোলিও
            </h1>
            <p className="text-sm text-muted-foreground">সংগঠনের সকল বিনিয়োগের বিবরণ</p>
          </div>
          <Button size="sm" className="text-xs" leftIcon={<Plus className="h-3.5 w-3.5" />}>
            নতুন বিনিয়োগ
          </Button>
        </div>

        {/* Summary */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-sky-200 dark:border-sky-800 bg-sky-50/50 dark:bg-sky-950/20 p-5">
            <p className="text-xs font-semibold text-sky-700 dark:text-sky-400">মোট বিনিয়োগ</p>
            <p className="text-xl font-extrabold text-sky-700 dark:text-sky-400 mt-1">{formatCurrency(totalInvested)}</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-5">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">বর্তমান মূল্য</p>
            <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-1">{formatCurrency(totalCurrentValue)}</p>
          </div>
          <div className="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 p-5">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="h-3.5 w-3.5 text-amber-600" />
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">মোট মুনাফা</p>
            </div>
            <p className="text-xl font-extrabold text-amber-700 dark:text-amber-400">{formatCurrency(totalProfit)}</p>
          </div>
        </div>

        {/* Investment Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {INVESTMENTS.map((inv) => {
            const profit = (inv.currentValue ?? inv.investedAmount) - inv.investedAmount;
            const profitPct = ((profit / inv.investedAmount) * 100).toFixed(1);
            const status = STATUS_CONFIG[inv.status] ?? STATUS_CONFIG.active;
            return (
              <div key={inv.id} className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{inv.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{TYPE_LABELS[inv.type] || inv.type}</p>
                  </div>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold shrink-0", status.cls)}>
                    {status.label}
                  </span>
                </div>

                {inv.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">{inv.description}</p>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground">বিনিয়োগকৃত</p>
                    <p className="text-sm font-bold text-foreground">{formatCurrency(inv.investedAmount)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">বর্তমান মূল্য</p>
                    <p className="text-sm font-bold text-foreground">{formatCurrency(inv.currentValue ?? inv.investedAmount)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">মুনাফা</p>
                    <p className={cn("text-sm font-bold", profit >= 0 ? "text-emerald-700 dark:text-emerald-400" : "text-red-600")}>
                      {profit >= 0 ? "+" : ""}{formatCurrency(profit)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">রিটার্ন</p>
                    <p className={cn("text-sm font-bold", profit >= 0 ? "text-emerald-700 dark:text-emerald-400" : "text-red-600")}>
                      {profit >= 0 ? "+" : ""}{profitPct}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t border-border pt-3">
                  <span>বিনিয়োগ তারিখ: {inv.investmentDate}</span>
                  {inv.maturityDate && <span>মেয়াদ: {inv.maturityDate}</span>}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </AdminLayout>
  );
}
