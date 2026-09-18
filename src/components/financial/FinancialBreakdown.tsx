"use client";

import React from "react";
import { FINANCE } from "@/lib/constants";
import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay";
import { PiggyBank, Building2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinancialBreakdownProps {
  totalAmount?: number;
  className?: string;
  variant?: "card" | "tree" | "compact";
  showProgress?: boolean;
  showDescriptions?: boolean;
}

export function FinancialBreakdown({
  totalAmount = FINANCE.MONTHLY_CONTRIBUTION_AMOUNT,
  className,
  variant = "card",
  showProgress = true,
  showDescriptions = true,
}: FinancialBreakdownProps) {
  const savingsAmount = totalAmount * FINANCE.SAVINGS_PERCENTAGE;
  const developmentAmount = totalAmount * FINANCE.DEVELOPMENT_FUND_PERCENTAGE;

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-3 text-sm", className)}>
        <div className="font-semibold text-foreground">
          <CurrencyDisplay amount={totalAmount} size="sm" />
        </div>
        <span className="text-muted-foreground">→</span>
        <div className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
          <PiggyBank className="h-3.5 w-3.5" />
          <CurrencyDisplay amount={savingsAmount} size="sm" /> (90%)
        </div>
        <span className="text-muted-foreground">+</span>
        <div className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-medium">
          <Building2 className="h-3.5 w-3.5" />
          <CurrencyDisplay amount={developmentAmount} size="sm" /> (10%)
        </div>
      </div>
    );
  }

  const content = (
    <div className="space-y-4">
      {/* Root node: Total Contribution */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/60 border border-border/80">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
            ৳
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              মোট মাসিক চাঁদা / Total Contribution
            </p>
            <p className="text-base font-bold text-foreground">
              প্রতি সদস্যের মাসিক অনুদান
            </p>
          </div>
        </div>
        <div className="text-right">
          <CurrencyDisplay amount={totalAmount} size="lg" className="font-extrabold text-foreground" />
          <span className="block text-[11px] text-muted-foreground">১০০% বরাদ্দ</span>
        </div>
      </div>

      {/* Progress split bar */}
      {showProgress && (
        <div className="space-y-1.5 px-1">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted flex">
            <div
              className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-500"
              style={{ width: `${FINANCE.SAVINGS_PERCENTAGE * 100}%` }}
              title="৯০% ব্যক্তিগত সঞ্চয়"
            />
            <div
              className="h-full bg-[#D4A72C] dark:bg-amber-400 transition-all duration-500"
              style={{ width: `${FINANCE.DEVELOPMENT_FUND_PERCENTAGE * 100}%` }}
              title="১০% উন্নয়ন তহবিল"
            />
          </div>
          <div className="flex justify-between text-[11px] text-muted-foreground font-medium">
            <span className="text-emerald-700 dark:text-emerald-400">৯০% ব্যক্তিগত সঞ্চয়</span>
            <span className="text-amber-700 dark:text-amber-400">১০% উন্নয়ন তহবিল</span>
          </div>
        </div>
      )}

      {/* Tree Visualization with connectors */}
      <div className="relative pl-6 space-y-3 font-mono text-sm">
        {/* Vertical tree trunk line */}
        <div className="absolute left-2.5 top-0 bottom-6 w-0.5 bg-border rounded" />

        {/* Branch 1: Personal Savings (90%) */}
        <div className="relative flex items-start gap-3 p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/80 dark:bg-emerald-950/20 dark:border-emerald-900/50">
          <div className="absolute -left-3.5 top-5 w-3.5 h-0.5 bg-border" />
          <div className="p-2 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 shrink-0">
            <PiggyBank className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-semibold text-emerald-900 dark:text-emerald-200 font-sans">
                ব্যক্তিগত সঞ্চয় (Personal Savings)
              </span>
              <CurrencyDisplay
                amount={savingsAmount}
                size="md"
                className="font-bold text-emerald-700 dark:text-emerald-400"
              />
            </div>
            {showDescriptions && (
              <p className="text-xs text-emerald-800/80 dark:text-emerald-400/80 font-sans mt-0.5 leading-relaxed">
                সদস্যের নিজস্ব অ্যাকাউন্টে জমা থাকে এবং সদস্যপদ ত্যাগকালে বা শর্তসাপেক্ষে ১০০% ফেরতযোগ্য।
              </p>
            )}
            <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-sans font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-900/50 px-2 py-0.5 rounded">
              <span>বরাদ্দ: ৯০%</span>
            </div>
          </div>
        </div>

        {/* Branch 2: Development Fund (10%) */}
        <div className="relative flex items-start gap-3 p-3 rounded-lg bg-amber-50/70 border border-amber-200/80 dark:bg-amber-950/20 dark:border-amber-900/50">
          <div className="absolute -left-3.5 top-5 w-3.5 h-0.5 bg-border" />
          <div className="p-2 rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 shrink-0">
            <Building2 className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-semibold text-amber-900 dark:text-amber-200 font-sans">
                উন্নয়ন তহবিল (Development Fund)
              </span>
              <CurrencyDisplay
                amount={developmentAmount}
                size="md"
                className="font-bold text-amber-700 dark:text-amber-400"
              />
            </div>
            {showDescriptions && (
              <p className="text-xs text-amber-800/80 dark:text-amber-400/80 font-sans mt-0.5 leading-relaxed">
                সামাজিক কল্যাণ, চিকিৎসা সাহায্য, পরিবেশ উন্নয়ন ও যুব প্রকল্পের জন্য সংরক্ষিত থাকে।
              </p>
            )}
            <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-sans font-medium text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-900/50 px-2 py-0.5 rounded">
              <span>বরাদ্দ: ১০%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transparency Note */}
      <div className="flex items-start gap-2 text-xs text-muted-foreground pt-1">
        <Info className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
        <p>
          খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণের সংবিধান অনুযায়ী প্রতি চাঁদার ৯০% সঞ্চয় ও ১০% সাধারণ উন্নয়ন তহবিলে সংরক্ষিত হয়।
        </p>
      </div>
    </div>
  );

  if (variant === "tree") {
    return <div className={className}>{content}</div>;
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm",
        className
      )}
    >
      <div className="mb-4">
        <h3 className="text-base font-bold text-foreground">
          চাঁদা বণ্টন কাঠামো (Financial Breakdown)
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          স্বচ্ছ আর্থিক নিয়মে পরিচালিত ৯০/১০ অনুপাত নীতি
        </p>
      </div>
      {content}
    </div>
  );
}
