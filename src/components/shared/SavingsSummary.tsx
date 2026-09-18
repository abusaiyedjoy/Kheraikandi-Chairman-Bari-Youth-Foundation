import React from "react";
import { CurrencyDisplay } from "./CurrencyDisplay";
import { PiggyBank, Target, CalendarCheck, ShieldCheck } from "lucide-react";
import { FINANCE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SavingsSummaryProps {
  totalSavings: number;
  monthlySavingsTarget?: number;
  lastContributionDate?: string;
  refundEligible?: boolean;
  className?: string;
}

export function SavingsSummary({
  totalSavings,
  monthlySavingsTarget = FINANCE.MONTHLY_CONTRIBUTION_AMOUNT * FINANCE.SAVINGS_PERCENTAGE,
  lastContributionDate,
  refundEligible = true,
  className,
}: SavingsSummaryProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-card p-5 shadow-xs space-y-4",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
          <PiggyBank className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground">
            ব্যক্তিগত সঞ্চয় সারাংশ
          </h4>
          <p className="text-xs text-muted-foreground">
            নিয়মিত ৯০% সঞ্চয় সংরক্ষণ হিসেব
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 p-4 border border-emerald-100 dark:border-emerald-900">
        <p className="text-xs text-muted-foreground">মোট পুঞ্জীভূত সঞ্চয়</p>
        <div className="mt-1">
          <CurrencyDisplay
            amount={totalSavings}
            size="xl"
            className="text-3xl font-black text-emerald-800 dark:text-emerald-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-start gap-2 text-muted-foreground">
          <Target className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span>মাসিক লক্ষ্যমাত্রা:</span>
            <p className="font-semibold text-foreground">৳{monthlySavingsTarget}/মাস</p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span>ফেরত সুরক্ষা:</span>
            <p className="font-semibold text-emerald-600 dark:text-emerald-400">
              {refundEligible ? "১০০% সুরক্ষিত" : "শর্তসাপেক্ষ"}
            </p>
          </div>
        </div>
      </div>

      {lastContributionDate && (
        <div className="flex items-center gap-2 pt-2 border-t border-border text-[11px] text-muted-foreground">
          <CalendarCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>সর্বশেষ জমাদান: {lastContributionDate}</span>
        </div>
      )}
    </div>
  );
}
