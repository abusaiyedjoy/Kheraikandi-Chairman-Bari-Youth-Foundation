import React from "react";
import { CurrencyDisplay } from "./CurrencyDisplay";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinancialStatCardProps {
  title: string;
  amount: number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label?: string;
  };
  breakdown?: {
    savingsAmount: number;
    developmentAmount: number;
  };
  variant?: "default" | "emerald" | "amber" | "red" | "sky";
  compact?: boolean;
  className?: string;
}

export function FinancialStatCard({
  title,
  amount,
  subtitle,
  icon: Icon,
  trend,
  breakdown,
  variant = "default",
  compact = false,
  className,
}: FinancialStatCardProps) {
  const variantStyles = {
    default: {
      card: "bg-card border-border",
      iconWrapper: "bg-muted text-muted-foreground",
      amount: "text-foreground",
    },
    emerald: {
      card: "bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800",
      iconWrapper: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300",
      amount: "text-emerald-800 dark:text-emerald-300",
    },
    amber: {
      card: "bg-amber-50/70 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800",
      iconWrapper: "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300",
      amount: "text-amber-800 dark:text-amber-300",
    },
    red: {
      card: "bg-red-50/70 border-red-200 dark:bg-red-950/30 dark:border-red-800",
      iconWrapper: "bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300",
      amount: "text-red-800 dark:text-red-300",
    },
    sky: {
      card: "bg-sky-50/70 border-sky-200 dark:bg-sky-950/30 dark:border-sky-800",
      iconWrapper: "bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300",
      amount: "text-sky-800 dark:text-sky-300",
    },
  };

  const style = variantStyles[variant];
  const trendIsPositive = trend && trend.value > 0;
  const trendIsNeutral = trend && trend.value === 0;
  const TrendIcon = trendIsNeutral ? Minus : trendIsPositive ? TrendingUp : TrendingDown;

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 shadow-xs transition-all duration-200 hover:shadow-md",
        style.card,
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground truncate">
            {title}
          </p>
          <div className="mt-2">
            <CurrencyDisplay
              amount={amount}
              size={compact ? "lg" : "xl"}
              className={cn("font-black tracking-tight", style.amount)}
            />
          </div>
          {subtitle && (
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          )}

          {trend && (
            <div
              className={cn(
                "mt-2.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                trendIsNeutral
                  ? "bg-muted text-muted-foreground"
                  : trendIsPositive
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
              )}
            >
              <TrendIcon className="h-3 w-3" />
              <span>
                {trendIsPositive ? "+" : ""}
                {trend.value}%
              </span>
              {trend.label && (
                <span className="text-muted-foreground font-normal">
                  {trend.label}
                </span>
              )}
            </div>
          )}
        </div>

        <div className={cn("rounded-xl p-3 shrink-0 shadow-xs", style.iconWrapper)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {/* Optional 90/10 Breakdown pill underneath */}
      {breakdown && (
        <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="text-emerald-700 dark:text-emerald-400 font-medium">
            ৯০% সঞ্চয়: <CurrencyDisplay amount={breakdown.savingsAmount} size="sm" />
          </span>
          <span className="text-amber-700 dark:text-amber-400 font-medium">
            ১০% উন্নয়ন: <CurrencyDisplay amount={breakdown.developmentAmount} size="sm" />
          </span>
        </div>
      )}
    </div>
  );
}
