"use client";

import React, { useState, useMemo } from "react";
import { MemberLayout } from "@/components/shared/MemberLayout";
import { SearchInput } from "@/components/shared/SearchInput";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Filter,
  Download,
  Calendar,
  ShieldAlert,
  PiggyBank,
  TrendingUp,
  Receipt,
} from "lucide-react";
import {
  MEMBER_TRANSACTIONS,
  MemberTransaction,
  TransactionType,
} from "@/data/member-portal-data";
import { formatDate } from "@/lib/formatters";

export default function MemberTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const types: Array<{ value: string; label: string }> = [
    { value: "all", label: "সকল লেনদেন" },
    { value: "Contribution", label: "মাসিক চাঁদা (Contribution)" },
    { value: "Savings Allocation", label: "ব্যক্তিগত সঞ্চয় (Savings 90%)" },
    { value: "Development Allocation", label: "উন্নয়ন তহবিল (Dev 10%)" },
    { value: "Refund", label: "সঞ্চয় ফেরত (Refund)" },
  ];

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return MEMBER_TRANSACTIONS.filter((txn) => {
      if (selectedType !== "all" && txn.type !== selectedType) {
        return false;
      }
      if (selectedStatus !== "all" && txn.status !== selectedStatus) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = txn.id.toLowerCase().includes(q);
        const matchesDesc = txn.description.toLowerCase().includes(q);
        const matchesRef = txn.referenceId.toLowerCase().includes(q);
        if (!matchesId && !matchesDesc && !matchesRef) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedType, selectedStatus]);

  // Transaction type badge styling
  const getTypeBadge = (type: TransactionType) => {
    switch (type) {
      case "Contribution":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            <Receipt className="h-3 w-3" />
            মাসিক চাঁদা
          </span>
        );
      case "Savings Allocation":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <PiggyBank className="h-3 w-3" />
            সঞ্চয় জমা (৯০%)
          </span>
        );
      case "Development Allocation":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            <TrendingUp className="h-3 w-3" />
            উন্নয়ন তহবিল (১০%)
          </span>
        );
      case "Refund":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
            <ArrowUpRight className="h-3 w-3" />
            ফেরত
          </span>
        );
    }
  };

  return (
    <MemberLayout
      breadcrumbs={[
        { label: "ড্যাশবোর্ড", href: "/member/dashboard" },
        { label: "ব্যক্তিগত লেনদেন লেজার" },
      ]}
      memberSavings={5400}
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* ── Page Header ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              ব্যক্তিগত লেনদেন লেজার
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              আপনার পরিশোধিত চাঁদা, সঞ্চয় বরাদ্দ এবং তহবিলের সার্বিক স্বয়ংক্রিয় ক্রেডিট/ডেবিট খতিয়ান।
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-[11px] text-muted-foreground block">বর্তমান সঞ্চয় স্থিতি</span>
              <span className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
                ৳৫,৪০০
              </span>
            </div>
          </div>
        </div>

        {/* ── Privacy Guarantee Notice ───────────────────────── */}
        <div className="rounded-xl border border-border bg-muted/30 p-3.5 flex items-center gap-3 text-xs text-muted-foreground">
          <ShieldAlert className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>
            <strong>গোপনীয়তা নিশ্চয়তা:</strong> এই লেজারে কেবলমাত্র আপনার নিজস্ব চাঁদা ও সঞ্চয়ের তথ্য সংরক্ষিত। সংগঠনের বিধিমালা অনুযায়ী সদস্যদের ব্যক্তিগত লেনদেন অন্য কোনো সদস্য দেখতে পারেন না।
          </span>
        </div>

        {/* ── Filter Toolbar ─────────────────────────────────── */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search */}
            <div className="w-full lg:w-80">
              <SearchInput
                placeholder="লেনদেন আইডি বা বিবরণ খুঁজুন..."
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
                className="w-full"
              />
            </div>

            {/* Type & Status Filter */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <Filter className="h-3.5 w-3.5" />
                <span>ধরন:</span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {types.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <span>অবস্থা:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="all">সকল অবস্থা</option>
                  <option value="completed">সফল (Completed)</option>
                  <option value="pending">প্রক্রিয়াধীন (Pending)</option>
                </select>
              </div>

              {(selectedType !== "all" || selectedStatus !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedType("all");
                    setSelectedStatus("all");
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
            মোট <span className="font-bold text-foreground">{filteredTransactions.length}</span> টি লেনদেন এন্ট্রি
          </div>
        </div>

        {/* ── Desktop Ledger Table ───────────────────────────── */}
        <div className="hidden md:block rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
                <tr>
                  <th className="px-5 py-3.5">তারিখ</th>
                  <th className="px-5 py-3.5">লেনদেন আইডি</th>
                  <th className="px-5 py-3.5">ধরন (Type)</th>
                  <th className="px-5 py-3.5">বিবরণ (Description)</th>
                  <th className="px-5 py-3.5 text-right">জমা (Credit)</th>
                  <th className="px-5 py-3.5 text-right">খরচ/উত্তোলন (Debit)</th>
                  <th className="px-5 py-3.5 text-right">স্থিতি (Balance)</th>
                  <th className="px-5 py-3.5 text-center">অবস্থা</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-muted-foreground">
                        {formatDate(item.date)}
                      </td>
                      <td className="px-5 py-3.5 font-mono font-bold text-foreground">
                        {item.id}
                      </td>
                      <td className="px-5 py-3.5">
                        {getTypeBadge(item.type)}
                      </td>
                      <td className="px-5 py-3.5 text-foreground max-w-xs truncate">
                        {item.description}
                      </td>
                      <td className="px-5 py-3.5 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        {item.credit > 0 ? `+৳${item.credit}` : "—"}
                      </td>
                      <td className="px-5 py-3.5 text-right font-mono font-bold text-red-600 dark:text-red-400">
                        {item.debit > 0 ? `-৳${item.debit}` : "—"}
                      </td>
                      <td className="px-5 py-3.5 text-right font-mono font-extrabold text-foreground">
                        ৳{item.balance.toLocaleString("en-BD")}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {item.statusBn}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-5 py-10 text-center text-muted-foreground">
                      কোনো লেনদেন পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Mobile Ledger Cards ────────────────────────────── */}
        <div className="md:hidden space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-border bg-card shadow-xs space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-foreground">{item.id}</span>
                  <span className="text-[11px] font-mono text-muted-foreground">{formatDate(item.date)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>{getTypeBadge(item.type)}</div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {item.statusBn}
                  </span>
                </div>

                <p className="text-xs text-foreground font-medium">{item.description}</p>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/60 text-center">
                  <div>
                    <span className="text-[10px] text-muted-foreground block">জমা (Credit)</span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                      {item.credit > 0 ? `+৳${item.credit}` : "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block">উত্তোলন (Debit)</span>
                    <span className="text-xs font-bold text-red-600 font-mono">
                      {item.debit > 0 ? `-৳${item.debit}` : "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block">মোট স্থিতি</span>
                    <span className="text-xs font-extrabold text-foreground font-mono">
                      ৳{item.balance}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground border border-border rounded-2xl bg-card">
              কোনো লেনদেন পাওয়া যায়নি।
            </div>
          )}
        </div>
      </div>
    </MemberLayout>
  );
}
