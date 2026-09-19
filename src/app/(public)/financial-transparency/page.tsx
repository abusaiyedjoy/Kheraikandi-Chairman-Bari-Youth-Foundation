import React from "react";
import type { Metadata } from "next";
import {
  Shield,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Building2,
  CheckCircle2,
  Info,
  BarChart3,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PageHeader } from "@/components/shared/PageHeader";
import { TransactionCard } from "@/components/shared/TransactionCard";
import { FinancialSummary } from "@/components/financial/FinancialSummary";
import { FinancialBreakdown } from "@/components/financial/FinancialBreakdown";
import { FundBalanceCard } from "@/components/financial/FundBalanceCard";
import { SavingsCard } from "@/components/financial/SavingsCard";
import { DevelopmentFundCard } from "@/components/financial/DevelopmentFundCard";
import { TRANSACTIONS } from "@/data/transactions";
import { DASHBOARD_SUMMARY, MONTHLY_CONTRIBUTION_CHART_DATA, EXPENSE_CATEGORY_CHART_DATA } from "@/data/dashboard";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "আর্থিক স্বচ্ছতা | খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ",
  description:
    "সমিতির সম্পূর্ণ আর্থিক তথ্য, লেনদেন ইতিহাস ও ব্যয়ের বিবরণ।",
};

const recentTransactions = [...TRANSACTIONS]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 10);

export default function FinancialTransparencyPage() {
  const totalIncome = DASHBOARD_SUMMARY.totalIncome;
  const totalExpenses = DASHBOARD_SUMMARY.totalExpenses;

  return (
    <>
      <PageHeader
        title="আর্থিক স্বচ্ছতা"
        subtitle="আমাদের সম্পূর্ণ আর্থিক তথ্য, লেনদেন ইতিহাস এবং ব্যয়ের সম্পূর্ণ বিবরণ — সকলের জন্য উন্মুক্ত।"
        breadcrumbs={[
          { label: "হোম", href: "/" },
          { label: "আর্থিক স্বচ্ছতা" },
        ]}
      />

      {/* Transparency pledge */}
      <section className="py-6 bg-emerald-50 dark:bg-emerald-950/20 border-b border-emerald-200 dark:border-emerald-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-foreground">আর্থিক স্বচ্ছতার অঙ্গীকার</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                আমরা বিশ্বাস করি স্বচ্ছতা বিশ্বাস তৈরি করে। প্রতিটি লেনদেন এখানে প্রকাশ করা হয়।
                সদস্যরা যেকোনো সময় তাদের হিসাব যাচাই করতে পারবেন।
              </p>
            </div>
            <div className="sm:ml-auto flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
              <CheckCircle2 className="h-4 w-4" />
              সর্বশেষ হালনাগাদ: সেপ্টেম্বর ২০২৪
            </div>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="আর্থিক সারসংক্ষেপ"
            subtitle="সমিতির সম্পূর্ণ আর্থিক অবস্থা"
            className="mb-8"
          />
          <FinancialSummary
            totalContributions={totalIncome}
            totalSavings={DASHBOARD_SUMMARY.totalSavings}
            totalDevelopmentFund={DASHBOARD_SUMMARY.totalDevelopmentFund}
            totalExpenses={totalExpenses}
            currentBalance={DASHBOARD_SUMMARY.currentBalance}
          />
        </div>
      </section>

      {/* Fund breakdown cards */}
      <section className="py-12 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="তহবিল বিভাজন"
            subtitle="৯০/১০ নীতি অনুযায়ী সংরক্ষিত তহবিল"
            className="mb-8"
          />
          <div className="grid md:grid-cols-3 gap-6">
            <FundBalanceCard
              balance={DASHBOARD_SUMMARY.currentBalance}
              monthlyInflow={DASHBOARD_SUMMARY.thisMonthContributions * 500}
              monthlyOutflow={totalExpenses}
            />
            <SavingsCard
              savingsAmount={DASHBOARD_SUMMARY.totalSavings}
              monthsContributed={12}
            />
            <DevelopmentFundCard
              totalCollected={DASHBOARD_SUMMARY.totalDevelopmentFund}
              totalSpent={totalExpenses}
              currentBalance={DASHBOARD_SUMMARY.totalDevelopmentFund - totalExpenses}
              projectsCount={6}
            />
          </div>
        </div>
      </section>

      {/* 90/10 breakdown explainer */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <SectionHeader
                title="সঞ্চয় নীতির বিস্তারিত"
                subtitle="প্রতিটি ১০০ টাকার হিসাব"
                className="mb-6"
              />
              <FinancialBreakdown
                totalAmount={100}
                variant="tree"
                showProgress
                showDescriptions
              />
            </div>

            <div>
              <SectionHeader
                title="ব্যয়ের খাত"
                subtitle="উন্নয়ন তহবিলের ব্যবহার"
                className="mb-6"
              />
              <div className="space-y-3">
                {EXPENSE_CATEGORY_CHART_DATA.map(({ category, amount, fill }) => {
                  const total = EXPENSE_CATEGORY_CHART_DATA.reduce(
                    (s, e) => s + e.amount,
                    0
                  );
                  const pct = Math.round((amount / total) * 100);
                  return (
                    <div key={category}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full shrink-0"
                            style={{ background: fill }}
                          />
                          <span className="font-medium text-foreground">{category}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground">{formatCurrency(amount)}</span>
                          <span className="font-bold text-foreground w-8 text-right">{pct}%</span>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: fill }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly contributions chart */}
      <section className="py-12 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="মাসিক চাঁদা সংগ্রহ"
            subtitle="২০২৪ সালের মাসিক চাঁদা সংগ্রহের বিবরণ"
            className="mb-8"
          />
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div className="flex items-end gap-2 h-40 overflow-x-auto pb-2">
              {MONTHLY_CONTRIBUTION_CHART_DATA.map(({ month, collected, expected }) => {
                const maxVal = Math.max(...MONTHLY_CONTRIBUTION_CHART_DATA.map((d) => d.expected));
                const collectedH = Math.round((collected / maxVal) * 100);
                const expectedH = Math.round((expected / maxVal) * 100);
                return (
                  <div key={month} className="flex flex-col items-center gap-1 min-w-[52px] flex-1">
                    <div className="w-full flex items-end gap-1 justify-center" style={{ height: "120px" }}>
                      <div
                        className="w-5 rounded-t bg-primary/30"
                        style={{ height: `${expectedH}%` }}
                        title={`প্রত্যাশিত: ${formatCurrency(expected)}`}
                      />
                      <div
                        className={cn(
                          "w-5 rounded-t",
                          collected >= expected ? "bg-primary" : "bg-amber-500"
                        )}
                        style={{ height: `${collectedH}%` }}
                        title={`সংগৃহীত: ${formatCurrency(collected)}`}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground text-center leading-tight">
                      {month}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-sm bg-primary/30" />
                <span>প্রত্যাশিত</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-sm bg-primary" />
                <span>সংগৃহীত (লক্ষ্যমাত্রা পূরণ)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-sm bg-amber-500" />
                <span>আংশিক সংগ্রহ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <SectionHeader
              title="সাম্প্রতিক লেনদেন"
              subtitle="সর্বশেষ ১০টি আর্থিক লেনদেন"
            />
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Info className="h-3.5 w-3.5" />
              <span>সম্পূর্ণ হিসাব সদস্য পোর্টালে</span>
            </div>
          </div>

          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <TransactionCard key={tx.id} transaction={tx} />
            ))}
          </div>

          {/* Income vs Expense summary */}
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">মোট আয়</p>
                <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400">
                  {formatCurrency(totalIncome)}
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">মোট ব্যয়</p>
                <p className="text-xl font-extrabold text-red-600 dark:text-red-400">
                  {formatCurrency(totalExpenses)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
