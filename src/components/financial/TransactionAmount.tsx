import React from "react";
import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay";
import { ArrowDownLeft, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionAmountProps {
  amount: number;
  type?: "income" | "expense" | "transfer" | "neutral";
  size?: "sm" | "md" | "lg";
  variant?: "plain" | "badge";
  className?: string;
  showIcon?: boolean;
}

export function TransactionAmount({
  amount,
  type,
  size = "md",
  variant = "plain",
  className,
  showIcon = true,
}: TransactionAmountProps) {
  // Infer type if not specified
  const effectiveType = type ?? (amount > 0 ? "income" : amount < 0 ? "expense" : "neutral");
  const absAmount = Math.abs(amount);

  const isIncome = effectiveType === "income";
  const isExpense = effectiveType === "expense";

  const sizeClasses = {
    sm: "text-xs font-semibold",
    md: "text-sm font-bold",
    lg: "text-base font-extrabold",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4",
  };

  if (variant === "badge") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 tabular-nums transition-colors",
          sizeClasses[size],
          isIncome && "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
          isExpense && "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-800",
          !isIncome && !isExpense && "bg-muted text-muted-foreground border border-border",
          className
        )}
      >
        {showIcon && (
          isIncome ? (
            <ArrowDownLeft className={iconSizes[size]} />
          ) : isExpense ? (
            <ArrowUpRight className={iconSizes[size]} />
          ) : (
            <Minus className={iconSizes[size]} />
          )
        )}
        <span>{isIncome ? "+" : isExpense ? "-" : ""}</span>
        <CurrencyDisplay amount={absAmount} size={size} />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 tabular-nums",
        sizeClasses[size],
        isIncome && "text-emerald-700 dark:text-emerald-400",
        isExpense && "text-red-600 dark:text-red-400",
        !isIncome && !isExpense && "text-muted-foreground",
        className
      )}
    >
      {showIcon && (
        isIncome ? (
          <ArrowDownLeft className={cn(iconSizes[size], "text-emerald-600 dark:text-emerald-400")} />
        ) : isExpense ? (
          <ArrowUpRight className={cn(iconSizes[size], "text-red-500 dark:text-red-400")} />
        ) : null
      )}
      <span>{isIncome ? "+" : isExpense ? "-" : ""}</span>
      <CurrencyDisplay amount={absAmount} size={size} />
    </span>
  );
}
