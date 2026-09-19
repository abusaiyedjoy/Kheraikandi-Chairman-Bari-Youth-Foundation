"use client";

import React, { useState, useMemo } from "react";
import { MemberLayout } from "@/components/shared/MemberLayout";
import { StatCard } from "@/components/shared/StatCard";
import { FinancialStatCard } from "@/components/shared/FinancialStatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { SearchInput } from "@/components/shared/SearchInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  PiggyBank,
  TrendingUp,
  Receipt,
  Download,
  Printer,
  FileSpreadsheet,
  Filter,
  Check,
} from "lucide-react";
import {
  MEMBER_CONTRIBUTIONS,
  MEMBER_PROFILE,
  MemberContributionRecord,
} from "@/data/member-portal-data";
import { formatDate } from "@/lib/formatters";

export default function MemberContributionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedReceipt, setSelectedReceipt] = useState<MemberContributionRecord | null>(null);

  // Available filter options
  const years = ["all", "2026", "2025", "2024", "2023", "2022", "2021"];
  const months = [
    { value: "all", label: "সকল মাস" },
    { value: "1", label: "জানুয়ারি" },
    { value: "2", label: "ফেব্রুয়ারি" },
    { value: "3", label: "মার্চ" },
    { value: "4", label: "এপ্রিল" },
    { value: "5", label: "মে" },
    { value: "6", label: "জুন" },
    { value: "7", label: "জুলাই" },
    { value: "8", label: "আগস্ট" },
    { value: "9", label: "সেপ্টেম্বর" },
    { value: "10", label: "অক্টোবর" },
    { value: "11", label: "নভেম্বর" },
    { value: "12", label: "ডিসেম্বর" },
  ];

  // Filtered contributions list
  const filteredRecords = useMemo(() => {
    return MEMBER_CONTRIBUTIONS.filter((item) => {
      // Year filter
      if (selectedYear !== "all" && item.year.toString() !== selectedYear) {
        return false;
      }
      // Month filter
      if (selectedMonth !== "all" && item.monthNumber.toString() !== selectedMonth) {
        return false;
      }
      // Status filter
      if (selectedStatus !== "all" && item.status !== selectedStatus) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesMonth = item.month.toLowerCase().includes(query);
        const matchesYear = item.year.toString().includes(query);
        const matchesReceipt = item.receiptNo.toLowerCase().includes(query);
        const matchesMethod = item.paymentMethodBn.toLowerCase().includes(query);
        if (!matchesMonth && !matchesYear && !matchesReceipt && !matchesMethod) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedYear, selectedMonth, selectedStatus]);

  // Aggregate stats
  const totalContributionsAmount = 6000;
  const paidMonthsCount = 60;
  const pendingMonthsCount = 0;
  const totalSavingsAmount = 5400;
  const totalDevAmount = 600;

  return (
    <MemberLayout
      breadcrumbs={[
        { label: "ড্যাশবোর্ড", href: "/member/dashboard" },
        { label: "মাসিক জমা" },
      ]}
      memberSavings={totalSavingsAmount}
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* ── Page Header ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              মাসিক জমা ও চাঁদার ইতিহাস
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              আপনার মাসিক চাঁদা প্রদান, সঞ্চয় জমা (৯০%) ও উন্নয়ন তহবিলের (১০%) সম্পূর্ণ বিবরণ।
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="rounded-xl border-border hover:bg-muted text-xs font-semibold gap-1.5"
            >
              <Printer className="h-3.5 w-3.5" />
              প্রিন্ট বিবরণী
            </Button>
          </div>
        </div>

        {/* ── Top 5 Summary Cards ────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <FinancialStatCard
            title="মোট চাঁদা জমা"
            amount={totalContributionsAmount}
            variant="emerald"
            subtitle={`${paidMonthsCount} মাস সম্পূর্ণ পরিশোধিত`}
            icon={CalendarDays}
          />

          <StatCard
            title="পরিশোধিত মাস"
            value={`${paidMonthsCount} মাস`}
            variant="success"
            subtitle="১০০% নিয়মিত সদস্য"
            icon={CheckCircle2}
          />

          <StatCard
            title="বকেয়া মাস"
            value={`${pendingMonthsCount} মাস`}
            variant="default"
            subtitle="কোনো বকেয়া নেই"
            icon={Clock}
          />

          <FinancialStatCard
            title="মোট ব্যক্তিগত সঞ্চয় (৯০%)"
            amount={totalSavingsAmount}
            variant="emerald"
            subtitle="সম্পূর্ণ ফেরতযোগ্য আমানত"
            icon={PiggyBank}
          />

          <FinancialStatCard
            title="উন্নয়ন অনুদান (১০%)"
            amount={totalDevAmount}
            variant="amber"
            subtitle="জনকল্যাণ ও উন্নয়ন তহবিল"
            icon={TrendingUp}
          />
        </div>

        {/* ── Filters and Search Toolbar ─────────────────────── */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="w-full lg:w-72">
              <SearchInput
                placeholder="রশিদ নম্বর, মাস বা বছর খুঁজুন..."
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
                className="w-full"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Year Filter */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <Filter className="h-3.5 w-3.5" />
                <span>বছর:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="all">সব বছর</option>
                  {years.filter(y => y !== "all").map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              {/* Month Filter */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <span>মাস:</span>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <span>অবস্থা:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="all">সকল অবস্থা</option>
                  <option value="paid">পরিশোধিত (Paid)</option>
                  <option value="pending">বকেয়া (Pending)</option>
                </select>
              </div>

              {(selectedYear !== "all" || selectedMonth !== "all" || selectedStatus !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedYear("all");
                    setSelectedMonth("all");
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
            মোট <span className="font-bold text-foreground">{filteredRecords.length}</span> টি রেকর্ডের ফলাফল প্রদর্শিত হচ্ছে
          </div>
        </div>

        {/* ── Desktop Table ──────────────────────────────────── */}
        <div className="hidden md:block rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
                <tr>
                  <th className="px-5 py-3.5">মাস ও বছর</th>
                  <th className="px-5 py-3.5">পরিশোধের তারিখ</th>
                  <th className="px-5 py-3.5 text-right">মোট পরিমাণ</th>
                  <th className="px-5 py-3.5 text-right">ব্যক্তিগত সঞ্চয় (৯০%)</th>
                  <th className="px-5 py-3.5 text-right">উন্নয়ন তহবিল (১০%)</th>
                  <th className="px-5 py-3.5">পেমেন্ট মাধ্যম</th>
                  <th className="px-5 py-3.5 text-center">অবস্থা</th>
                  <th className="px-5 py-3.5 text-center">রশিদ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-5 py-3.5 font-bold text-foreground">
                        {record.month} {record.year}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground font-mono">
                        {formatDate(record.paymentDate)}
                      </td>
                      <td className="px-5 py-3.5 text-right font-extrabold text-foreground font-mono">
                        ৳{record.amount.toLocaleString("en-BD")}
                      </td>
                      <td className="px-5 py-3.5 text-right font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                        ৳{record.savingsAmount.toLocaleString("en-BD")}
                      </td>
                      <td className="px-5 py-3.5 text-right font-bold text-amber-700 dark:text-amber-400 font-mono">
                        ৳{record.developmentAmount.toLocaleString("en-BD")}
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-muted border border-border">
                          {record.paymentMethodBn}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <StatusBadge status={record.status} domain="contribution" />
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedReceipt(record)}
                          className="h-7 px-2 text-xs text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 gap-1"
                        >
                          <Receipt className="h-3.5 w-3.5" />
                          রশিদ
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-muted-foreground">
                      কোনো চাঁদার রেকর্ড খুঁজে পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Mobile Cards ───────────────────────────────────── */}
        <div className="md:hidden space-y-3">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <div
                key={record.id}
                className="p-4 rounded-2xl border border-border bg-card shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-foreground">
                      {record.month} {record.year}
                    </h3>
                    <p className="text-[11px] text-muted-foreground font-mono">
                      {formatDate(record.paymentDate)}
                    </p>
                  </div>
                  <StatusBadge status={record.status} domain="contribution" />
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 border-y border-border/60 text-center">
                  <div>
                    <span className="text-[10px] text-muted-foreground block">মোট চাঁদা</span>
                    <span className="text-xs font-bold text-foreground font-mono">৳{record.amount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block">সঞ্চয় (৯০%)</span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                      ৳{record.savingsAmount}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground block">উন্নয়ন (১০%)</span>
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400 font-mono">
                      ৳{record.developmentAmount}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-muted-foreground text-[11px]">
                    মাধ্যম: <strong className="text-foreground">{record.paymentMethodBn}</strong>
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedReceipt(record)}
                    className="h-7 px-2 text-xs border-border gap-1"
                  >
                    <Receipt className="h-3.5 w-3.5 text-emerald-600" />
                    রশিদ দেখুন
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground border border-border rounded-2xl bg-card">
              কোনো চাঁদার রেকর্ড পাওয়া যায়নি।
            </div>
          )}
        </div>
      </div>

      {/* ── Official Receipt Modal ─────────────────────────── */}
      <Dialog open={!!selectedReceipt} onOpenChange={(open) => !open && setSelectedReceipt(null)}>
        {selectedReceipt && (
          <DialogContent maxWidth="md" onClose={() => setSelectedReceipt(null)}>
            <div className="p-2 space-y-4">
              {/* Receipt Header */}
              <div className="text-center border-b border-border pb-4 space-y-1">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold mb-1">
                  <Receipt className="h-5 w-5" />
                </div>
                <h3 className="font-extrabold text-base text-foreground">
                  খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
                </h3>
                <p className="text-xs text-muted-foreground">
                  অফিসিয়াল মাসিক চাঁদা ও সঞ্চয় জমা রশিদ
                </p>
                <div className="pt-2 flex items-center justify-center gap-2">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-muted font-bold text-foreground">
                    {selectedReceipt.receiptNo}
                  </span>
                  <StatusBadge status={selectedReceipt.status} domain="contribution" />
                </div>
              </div>

              {/* Receipt Member Info */}
              <div className="grid grid-cols-2 gap-2 text-xs py-2 border-b border-border">
                <div>
                  <span className="text-muted-foreground block text-[11px]">সদস্যের নাম:</span>
                  <strong className="text-foreground">{MEMBER_PROFILE.name}</strong>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground block text-[11px]">সদস্য আইডি:</span>
                  <strong className="text-foreground font-mono">{MEMBER_PROFILE.memberId}</strong>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">মাস ও বছর:</span>
                  <strong className="text-foreground">{selectedReceipt.month} {selectedReceipt.year}</strong>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground block text-[11px]">পরিশোধের তারিখ:</span>
                  <strong className="text-foreground font-mono">{formatDate(selectedReceipt.paymentDate)}</strong>
                </div>
              </div>

              {/* Receipt Breakdown Table */}
              <div className="rounded-xl border border-border bg-muted/20 p-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ব্যক্তিগত সঞ্চয় জমা (৯০%):</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    ৳{selectedReceipt.savingsAmount.toLocaleString("en-BD")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">উন্নয়ন তহবিল অনুদান (১০%):</span>
                  <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
                    ৳{selectedReceipt.developmentAmount.toLocaleString("en-BD")}
                  </span>
                </div>
                <div className="pt-2 border-t border-border flex justify-between font-extrabold text-sm text-foreground">
                  <span>মোট পরিশোধিত:</span>
                  <span className="font-mono">৳{selectedReceipt.amount.toLocaleString("en-BD")}</span>
                </div>
              </div>

              {/* Receipt Sign-off */}
              <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2">
                <span>পেমেন্ট মাধ্যম: {selectedReceipt.paymentMethodBn}</span>
                <span>আদায়কারী: {selectedReceipt.collectedBy}</span>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedReceipt(null)}
                >
                  বন্ধ করুন
                </Button>
                <Button
                  size="sm"
                  onClick={() => window.print()}
                  className="bg-primary text-white hover:bg-emerald-700 gap-1.5"
                >
                  <Printer className="h-3.5 w-3.5" />
                  রশিদ প্রিন্ট করুন
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </MemberLayout>
  );
}
