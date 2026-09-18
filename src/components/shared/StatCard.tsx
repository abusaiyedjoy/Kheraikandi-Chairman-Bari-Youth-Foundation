import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number; // percentage change
    label?: string;
  };
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  isCurrency?: boolean;
  className?: string;
}

const variantStyles = {
  default: {
    card: "bg-card border border-border",
    iconWrapper: "bg-muted text-muted-foreground",
    value: "text-foreground",
  },
  primary: {
    card: "bg-primary/5 border border-primary/20",
    iconWrapper: "bg-primary/10 text-primary",
    value: "text-primary",
  },
  success: {
    card: "bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800",
    iconWrapper: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-400",
    value: "text-emerald-700 dark:text-emerald-400",
  },
  warning: {
    card: "bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-800",
    iconWrapper: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-400",
    value: "text-amber-700 dark:text-amber-400",
  },
  danger: {
    card: "bg-red-50 border border-red-200 dark:bg-red-950/30 dark:border-red-800",
    iconWrapper: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-400",
    value: "text-red-700 dark:text-red-400",
  },
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  isCurrency = false,
  className,
}: StatCardProps) {
  const styles = variantStyles[variant];

  const displayValue =
    typeof value === "number" && isCurrency
      ? formatCurrency(value)
      : typeof value === "number"
        ? value.toLocaleString("en-BD")
        : value;

  const trendIsPositive = trend && trend.value > 0;
  const trendIsNeutral = trend && trend.value === 0;
  const TrendIcon = trendIsNeutral ? Minus : trendIsPositive ? TrendingUp : TrendingDown;

  return (
    <div
      className={cn(
        "rounded-xl p-5 shadow-sm transition-all hover:shadow-md",
        styles.card,
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground truncate">{title}</p>
          <p className={cn("mt-1.5 text-2xl font-bold tabular-nums truncate", styles.value)}>
            {displayValue}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div
              className={cn(
                "mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                trendIsNeutral
                  ? "bg-muted text-muted-foreground"
                  : trendIsPositive
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400"
              )}
            >
              <TrendIcon className="h-3 w-3" />
              <span>
                {trendIsPositive ? "+" : ""}
                {trend.value}%
              </span>
              {trend.label && <span className="text-muted-foreground">{trend.label}</span>}
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex-shrink-0 rounded-lg p-2.5",
            styles.iconWrapper
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
