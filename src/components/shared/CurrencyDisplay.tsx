import { cn } from "@/lib/utils";
import { FINANCE } from "@/lib/constants";

interface CurrencyDisplayProps {
  amount: number;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showSymbol?: boolean;
  colorized?: boolean; // green for positive, red for negative
  compact?: boolean;
}

const sizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg font-semibold",
  xl: "text-2xl font-bold",
};

export function CurrencyDisplay({
  amount,
  className,
  size = "md",
  showSymbol = true,
  colorized = false,
  compact = false,
}: CurrencyDisplayProps) {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  let formatted: string;
  if (compact && absAmount >= 100_000) {
    formatted = `${(absAmount / 100_000).toFixed(2)} লক্ষ`;
  } else if (compact && absAmount >= 1000) {
    formatted = `${(absAmount / 1000).toFixed(1)}K`;
  } else {
    formatted = absAmount.toLocaleString("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <span
      className={cn(
        "tabular-nums font-medium",
        sizeStyles[size],
        colorized && amount > 0 && "text-emerald-600 dark:text-emerald-400",
        colorized && amount < 0 && "text-red-600 dark:text-red-400",
        colorized && amount === 0 && "text-muted-foreground",
        className
      )}
    >
      {isNegative && "-"}
      {showSymbol && (
        <span className="mr-0.5 font-normal opacity-75">{FINANCE.CURRENCY_SYMBOL}</span>
      )}
      {formatted}
    </span>
  );
}
