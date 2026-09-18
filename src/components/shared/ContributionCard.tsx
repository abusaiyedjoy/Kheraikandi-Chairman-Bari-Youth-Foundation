import React from "react";
import { CurrencyDisplay } from "./CurrencyDisplay";
import { StatusBadge } from "./StatusBadge";
import { formatMonthYear, formatDateShort } from "@/lib/formatters";
import { PiggyBank, Building2, CreditCard } from "lucide-react";
import type { Contribution } from "@/types/finance";
import { cn } from "@/lib/utils";

interface ContributionCardProps {
  contribution: Contribution;
  className?: string;
}

export function ContributionCard({
  contribution,
  className,
}: ContributionCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4 shadow-xs space-y-3 transition-all hover:shadow-md",
        className
      )}
    >
      {/* Top row: Month/Year, Member Name & Status */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-xs font-bold text-foreground">
            {formatMonthYear(contribution.year, contribution.month)}
          </span>
          <p className="text-xs text-muted-foreground mt-0.5">
            {contribution.memberName} ({contribution.memberId})
          </p>
        </div>
        <StatusBadge status={contribution.status} domain="contribution" />
      </div>

      {/* 90/10 Split Box */}
      <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted/40 p-2.5 text-xs">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
            <PiggyBank className="h-3.5 w-3.5" />
            <span>সঞ্চয় (৯০%)</span>
          </div>
          <CurrencyDisplay
            amount={contribution.savingsAmount}
            size="sm"
            className="font-bold text-emerald-800 dark:text-emerald-300"
          />
        </div>

        <div className="space-y-0.5 border-l border-border pl-2.5">
          <div className="flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-400 font-medium">
            <Building2 className="h-3.5 w-3.5" />
            <span>উন্নয়ন (১০%)</span>
          </div>
          <CurrencyDisplay
            amount={contribution.developmentAmount}
            size="sm"
            className="font-bold text-amber-800 dark:text-amber-300"
          />
        </div>
      </div>

      {/* Footer: Payment date & method */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/50 pt-2">
        <div className="flex items-center gap-1">
          <CreditCard className="h-3.5 w-3.5" />
          <span className="capitalize">{contribution.paymentMethod}</span>
        </div>

        <div>
          <span>তারিখ: {formatDateShort(contribution.paymentDate)}</span>
        </div>
      </div>
    </div>
  );
}
