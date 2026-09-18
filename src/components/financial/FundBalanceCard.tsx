import React from "react";
import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay";
import { ArrowUpRight, ArrowDownRight, Landmark, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FundBalanceCardProps {
  balance: number;
  monthlyInflow?: number;
  monthlyOutflow?: number;
  accountNumber?: string;
  onDepositClick?: () => void;
  onStatementClick?: () => void;
  className?: string;
}

export function FundBalanceCard({
  balance,
  monthlyInflow = 0,
  monthlyOutflow = 0,
  accountNumber = "KCBYW-TREASURY-01",
  onDepositClick,
  onStatementClick,
  className,
}: FundBalanceCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 text-white shadow-xl transition-all duration-300",
        "bg-gradient-to-br from-[#166534] via-[#14532d] to-[#0d3b1f]",
        "border border-emerald-600/30",
        className
      )}
    >
      {/* Decorative background glow circles */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-emerald-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -left-12 -bottom-12 h-56 w-56 rounded-full bg-[#D4A72C]/15 blur-2xl" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
            <Landmark className="h-5 w-5 text-emerald-200" />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-emerald-100 uppercase">
              কেন্দ্রীয় তহবিল ব্যালেন্স
            </h3>
            <p className="text-xs text-emerald-200/80 font-mono">
              {accountNumber}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-emerald-900/60 px-3 py-1 text-xs font-medium text-emerald-200 border border-emerald-500/30">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>সুরক্ষিত ও অডিটকৃত</span>
        </div>
      </div>

      {/* Balance Display */}
      <div className="relative z-10 my-6">
        <p className="text-xs font-medium text-emerald-200/90">
          বর্তমান মোট স্থিতি (Current Net Reserves)
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <CurrencyDisplay
            amount={balance}
            size="xl"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          />
        </div>
      </div>

      {/* Monthly Inflow & Outflow stats */}
      <div className="relative z-10 grid grid-cols-2 gap-4 rounded-xl bg-black/20 p-3.5 backdrop-blur-sm border border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
            <ArrowDownRight className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] text-emerald-200/80">চলতি মাসে জমা</p>
            <CurrencyDisplay
              amount={monthlyInflow}
              size="sm"
              className="text-sm font-bold text-emerald-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5 border-l border-white/10 pl-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-400/20 text-red-300">
            <ArrowUpRight className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] text-red-200/80">চলতি মাসে ব্যয়</p>
            <CurrencyDisplay
              amount={monthlyOutflow}
              size="sm"
              className="text-sm font-bold text-red-200"
            />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="relative z-10 mt-5 flex flex-wrap items-center gap-2.5">
        {onDepositClick && (
          <Button
            size="sm"
            onClick={onDepositClick}
            className="bg-white text-emerald-900 hover:bg-emerald-50 font-semibold shadow"
          >
            চাঁদা জমা দিন
          </Button>
        )}
        {onStatementClick && (
          <Button
            size="sm"
            variant="outline"
            onClick={onStatementClick}
            className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            আয়-ব্যয় প্রতিবেদন
          </Button>
        )}
      </div>
    </div>
  );
}
