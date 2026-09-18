import React from "react";
import { CurrencyDisplay } from "./CurrencyDisplay";
import { Receipt, Calendar, UserCheck } from "lucide-react";
import { formatDateShort } from "@/lib/formatters";
import type { Expense } from "@/types/finance";
import { cn } from "@/lib/utils";

interface ExpenseCardProps {
  expense: Expense;
  onReceiptClick?: (receiptUrl: string) => void;
  className?: string;
}

export function ExpenseCard({
  expense,
  onReceiptClick,
  className,
}: ExpenseCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4 shadow-xs space-y-3 transition-all hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground uppercase">
            {expense.category}
          </span>
          <h4 className="text-sm font-bold text-foreground mt-1.5 truncate">
            {expense.title}
          </h4>
        </div>
        <div className="text-right shrink-0">
          <CurrencyDisplay
            amount={expense.amount}
            size="md"
            className="font-black text-red-600 dark:text-red-400"
          />
        </div>
      </div>

      {expense.remarks && (
        <p className="text-xs text-muted-foreground line-clamp-2">
          {expense.remarks}
        </p>
      )}

      {/* Meta row: Date, Approver, Receipt */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/60 pt-2.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDateShort(expense.date)}</span>
          </div>

          <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
            <UserCheck className="h-3 w-3" />
            <span>অনুমোদিত ({expense.approvedBy})</span>
          </div>
        </div>

        {expense.receipt && (
          <button
            type="button"
            onClick={() => onReceiptClick?.(expense.receipt!)}
            className="flex items-center gap-1 text-primary hover:underline font-medium"
          >
            <Receipt className="h-3 w-3" />
            <span>ভাউচার</span>
          </button>
        )}
      </div>
    </div>
  );
}
