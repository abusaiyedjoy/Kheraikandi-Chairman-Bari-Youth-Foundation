import React from "react";
import { CurrencyDisplay } from "@/components/shared/CurrencyDisplay";
import { Building2, HeartHandshake, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DevelopmentFundCardProps {
  totalCollected: number;
  totalSpent?: number;
  currentBalance: number;
  projectsCount?: number;
  onViewProjectsClick?: () => void;
  className?: string;
}

export function DevelopmentFundCard({
  totalCollected,
  totalSpent = 0,
  currentBalance,
  projectsCount = 0,
  onViewProjectsClick,
  className,
}: DevelopmentFundCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-amber-200 dark:border-amber-800/80 bg-gradient-to-b from-amber-50/50 to-card dark:from-amber-950/20 dark:to-card p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4A72C] text-amber-950 shadow-sm">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <span className="inline-block rounded-full bg-amber-100 dark:bg-amber-900/60 px-2.5 py-0.5 text-[11px] font-semibold text-amber-900 dark:text-amber-300">
              সামাজিক উন্নয়ন তহবিল (১০%)
            </span>
            <h3 className="text-base font-bold text-foreground mt-0.5">
              উন্নয়ন তহবিল স্থিতি
            </h3>
          </div>
        </div>
        {projectsCount > 0 && (
          <span className="text-xs font-medium text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/50 px-2.5 py-1 rounded-full flex items-center gap-1">
            <HeartHandshake className="h-3.5 w-3.5" />
            {projectsCount}টি প্রকল্প
          </span>
        )}
      </div>

      <div className="mt-5">
        <p className="text-xs text-muted-foreground">বর্তমান তহবিল স্থিতি (Current Reserves)</p>
        <div className="mt-1 flex items-baseline gap-2">
          <CurrencyDisplay
            amount={currentBalance}
            size="xl"
            className="text-3xl font-extrabold text-amber-800 dark:text-amber-400"
          />
        </div>
      </div>

      {/* Breakdown: Total collected vs Total spent */}
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs">
        <div>
          <p className="text-muted-foreground">মোট সংগৃহীত (১০%)</p>
          <CurrencyDisplay
            amount={totalCollected}
            size="sm"
            className="font-semibold text-foreground mt-0.5 block"
          />
        </div>
        <div>
          <p className="text-muted-foreground">সমাজকল্যাণে ব্যয়</p>
          <CurrencyDisplay
            amount={totalSpent}
            size="sm"
            className="font-semibold text-red-600 dark:text-red-400 mt-0.5 block"
          />
        </div>
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
        সদস্যদের প্রতি ১০০ টাকার মধ্যে ১০ টাকা এই তহবিলে যুক্ত হয়ে গ্রামের রাস্তাঘাট, চিকিৎসা ও সমাজকল্যাণে ব্যয় হয়।
      </p>

      {onViewProjectsClick && (
        <div className="mt-5 pt-1">
          <Button
            size="sm"
            variant="outline"
            onClick={onViewProjectsClick}
            rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
            className="w-full text-xs border-amber-300 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-950/40"
          >
            উন্নয়ন কার্যক্রম দেখুন
          </Button>
        </div>
      )}
    </div>
  );
}
