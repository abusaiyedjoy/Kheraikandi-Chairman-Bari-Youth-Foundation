import React from "react";
import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay";
import { Wallet, PiggyBank, Building2, TrendingDown, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinancialSummaryProps {
  totalContributions: number;
  totalSavings: number;
  totalDevelopmentFund: number;
  totalExpenses: number;
  currentBalance: number;
  className?: string;
}

export function FinancialSummary({
  totalContributions,
  totalSavings,
  totalDevelopmentFund,
  totalExpenses,
  currentBalance,
  className,
}: FinancialSummaryProps) {
  const metrics = [
    {
      title: "মোট চাঁদা সংগ্রহ",
      subtitle: "Total Contributions",
      amount: totalContributions,
      icon: Wallet,
      color: "text-emerald-700 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800",
    },
    {
      title: "সদস্য সঞ্চয় তহবিল (৯০%)",
      subtitle: "Member Personal Savings",
      amount: totalSavings,
      icon: PiggyBank,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900",
      badge: "৯০% সংরক্ষিত",
    },
    {
      title: "উন্নয়ন তহবিল (১০%)",
      subtitle: "Development Fund",
      amount: totalDevelopmentFund,
      icon: Building2,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800",
      badge: "১০% সংরক্ষিত",
    },
    {
      title: "মোট ব্যয়",
      subtitle: "Total Expenses",
      amount: totalExpenses,
      icon: TrendingDown,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800",
    },
    {
      title: "বর্তমান তহবিল ব্যালেন্স",
      subtitle: "Current Net Balance",
      amount: currentBalance,
      icon: ShieldCheck,
      color: "text-primary dark:text-emerald-400 font-bold",
      bg: "bg-primary/5 dark:bg-emerald-950/50 border-primary/20 dark:border-emerald-700",
      highlight: true,
    },
  ];

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4", className)}>
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <div
            key={idx}
            className={cn(
              "rounded-xl border p-4 shadow-sm transition-all hover:shadow-md",
              metric.bg,
              metric.highlight && "ring-1 ring-primary/30"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-muted-foreground truncate">
                {metric.title}
              </span>
              <div className="p-2 rounded-lg bg-card/80 shadow-xs shrink-0">
                <Icon className={cn("h-4 w-4", metric.color)} />
              </div>
            </div>

            <div className="mt-3">
              <CurrencyDisplay
                amount={metric.amount}
                size="lg"
                className={cn("font-bold tracking-tight block", metric.color)}
              />
              <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                {metric.subtitle}
              </p>
            </div>

            {metric.badge && (
              <span className="mt-2.5 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-card border border-border text-foreground">
                {metric.badge}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
