import React from "react";
import { TransactionAmount } from "@/components/financial/TransactionAmount";
import { formatDateShort } from "@/lib/formatters";
import type { Transaction } from "@/types/finance";
import { cn } from "@/lib/utils";

interface TransactionCardProps {
  transaction: Transaction;
  className?: string;
}

export function TransactionCard({
  transaction,
  className,
}: TransactionCardProps) {
  const isIncome = transaction.type === "income";

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3.5 shadow-xs transition-colors hover:bg-muted/30",
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-xs",
            isIncome
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
              : "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300"
          )}
        >
          {isIncome ? "আয়" : "ব্যয়"}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-bold text-foreground truncate">
            {transaction.description}
          </p>
          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground">
            <span>{formatDateShort(transaction.date)}</span>
            <span>•</span>
            <span className="capitalize">{transaction.category}</span>
          </div>
        </div>
      </div>

      <div className="text-right shrink-0">
        <TransactionAmount
          amount={transaction.amount}
          type={transaction.type}
          size="md"
        />
        {transaction.balance !== undefined && (
          <span className="block text-[10px] text-muted-foreground font-mono mt-0.5">
            স্থিতি: ৳{transaction.balance.toLocaleString("en-BD")}
          </span>
        )}
      </div>
    </div>
  );
}
