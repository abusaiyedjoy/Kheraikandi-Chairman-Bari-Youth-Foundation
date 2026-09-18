import React from "react";
import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay";
import { PiggyBank, Calendar, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SavingsCardProps {
  savingsAmount: number;
  monthsContributed: number;
  lastPaymentDate?: string;
  memberId?: string;
  onViewHistoryClick?: () => void;
  onRequestRefundClick?: () => void;
  className?: string;
}

export function SavingsCard({
  savingsAmount,
  monthsContributed,
  lastPaymentDate,
  memberId,
  onViewHistoryClick,
  onRequestRefundClick,
  className,
}: SavingsCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-gradient-to-b from-emerald-50/50 to-card dark:from-emerald-950/20 dark:to-card p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <PiggyBank className="h-6 w-6" />
          </div>
          <div>
            <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
              ব্যক্তিগত আমানত (৯০% সঞ্চয়)
            </span>
            <h3 className="text-base font-bold text-foreground mt-0.5">
              আমার সঞ্চয় ব্যালেন্স
            </h3>
          </div>
        </div>
        {memberId && (
          <span className="text-xs font-mono font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
            {memberId}
          </span>
        )}
      </div>

      <div className="mt-5">
        <p className="text-xs text-muted-foreground">মোট পুঞ্জীভূত সঞ্চয়</p>
        <div className="mt-1 flex items-baseline gap-2">
          <CurrencyDisplay
            amount={savingsAmount}
            size="xl"
            className="text-3xl font-extrabold text-emerald-800 dark:text-emerald-400"
          />
        </div>
      </div>

      {/* Meta attributes */}
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4 text-emerald-600" />
          <span>পরিশোধিত মাস: <strong className="text-foreground">{monthsContributed} মাস</strong></span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Shield className="h-4 w-4 text-emerald-600" />
          <span>ফেরতযোগ্যতা: <strong className="text-emerald-600 dark:text-emerald-400">১০০%</strong></span>
        </div>
      </div>

      {lastPaymentDate && (
        <p className="mt-2 text-[11px] text-muted-foreground">
          সর্বশেষ চাঁদা জমা: <span className="font-medium text-foreground">{lastPaymentDate}</span>
        </p>
      )}

      <div className="mt-5 flex items-center gap-2 pt-1">
        {onViewHistoryClick && (
          <Button
            size="sm"
            variant="outline"
            onClick={onViewHistoryClick}
            rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            className="flex-1 text-xs"
          >
            সঞ্চয় বিবরণী
          </Button>
        )}
        {onRequestRefundClick && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onRequestRefundClick}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            ফেরত আবেদন
          </Button>
        )}
      </div>
    </div>
  );
}
