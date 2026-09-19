"use client";

import React from "react";
import { PiggyBank, AlertTriangle } from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { MEMBERS } from "@/data/members";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export default function AdminSavingsPage() {
  const totalSavings = MEMBERS.reduce((s, m) => s + (m.totalSavings ?? 0), 0);
  const totalDev = MEMBERS.reduce((s, m) => s + (m.totalDevelopmentFund ?? 0), 0);

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "অ্যাডমিন", href: "/admin/dashboard" },
        { label: "সদস্য সঞ্চয়" },
      ]}
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1400px] w-full mx-auto">

        <div>
          <h1 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-primary" />
            সদস্য সঞ্চয়
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            প্রতিটি সদস্যের ব্যক্তিগত সঞ্চয় ও উন্নয়ন তহবিল
          </p>
        </div>

        {/* Important Notice */}
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-4">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold text-amber-700 dark:text-amber-400">গুরুত্বপূর্ণ নীতি</p>
            <p className="text-amber-600/80 dark:text-amber-400/80 mt-0.5">
              সদস্যদের ব্যক্তিগত সঞ্চয় সংগঠনের ব্যয়যোগ্য তহবিল নয়। এটি প্রতিটি সদস্যের নিজস্ব আমানত এবং
              শুধুমাত্র সদস্যের অনুরোধ বা মেয়াদ পূর্তিতে ফেরতযোগ্য।
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-sky-200 dark:border-sky-800 bg-sky-50/50 dark:bg-sky-950/20 p-5">
            <p className="text-xs text-sky-700 dark:text-sky-400 font-semibold">সম্মিলিত সঞ্চয় (৯০%)</p>
            <p className="text-xl font-extrabold text-sky-700 dark:text-sky-400 mt-1">{formatCurrency(totalSavings)}</p>
            <p className="text-[10px] text-sky-600/60 mt-0.5">সদস্যদের ব্যক্তিগত আমানত</p>
          </div>
          <div className="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 p-5">
            <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold">উন্নয়ন তহবিল (১০%)</p>
            <p className="text-xl font-extrabold text-amber-700 dark:text-amber-400 mt-1">{formatCurrency(totalDev)}</p>
            <p className="text-[10px] text-amber-600/60 mt-0.5">সামাজিক কার্যক্রমের তহবিল</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-5">
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">সর্বমোট</p>
            <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-1">{formatCurrency(totalSavings + totalDev)}</p>
            <p className="text-[10px] text-emerald-600/60 mt-0.5">মোট চাঁদা সংগ্রহ</p>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">সদস্য</th>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">আইডি</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">মোট চাঁদা</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">সঞ্চয় (৯০%)</th>
                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">উন্নয়ন (১০%)</th>
                <th className="px-4 py-3 text-center font-semibold text-muted-foreground">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MEMBERS.map((m) => (
                <tr key={m.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-[10px] shrink-0">
                        {m.fullNameBn.charAt(0)}
                      </div>
                      <span className="font-semibold text-foreground">{m.fullNameBn}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-foreground">{m.memberId}</td>
                  <td className="px-4 py-3 text-right font-semibold text-foreground">
                    {formatCurrency(m.totalContributions ?? 0)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-sky-700 dark:text-sky-400">
                    {formatCurrency(m.totalSavings ?? 0)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-amber-700 dark:text-amber-400">
                    {formatCurrency(m.totalDevelopmentFund ?? 0)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold",
                      m.status === "active"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                        : "bg-slate-100 text-slate-600"
                    )}>
                      {m.status === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
}
