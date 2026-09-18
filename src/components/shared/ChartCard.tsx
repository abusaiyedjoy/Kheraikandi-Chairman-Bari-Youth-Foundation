"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  summaryValue?: string;
  summaryLabel?: string;
  periods?: string[];
  defaultPeriod?: string;
  onPeriodChange?: (period: string) => void;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  summaryValue,
  summaryLabel,
  periods = ["মাসিক", "ত্রৈমাসিক", "বাৎসরিক"],
  defaultPeriod,
  onPeriodChange,
  children,
  className,
  actions,
}: ChartCardProps) {
  const [activePeriod, setActivePeriod] = useState(defaultPeriod || periods[0]);

  const handlePeriodClick = (p: string) => {
    setActivePeriod(p);
    onPeriodChange?.(p);
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4",
        className
      )}
    >
      {/* Top bar: Title, periods switcher & optional actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {periods && periods.length > 0 && (
            <div className="flex items-center rounded-lg border border-border bg-muted/40 p-0.5 text-xs font-medium">
              {periods.map((period) => (
                <button
                  key={period}
                  type="button"
                  onClick={() => handlePeriodClick(period)}
                  className={cn(
                    "px-2.5 py-1 rounded-md transition-colors",
                    activePeriod === period
                      ? "bg-card text-foreground font-bold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {period}
                </button>
              ))}
            </div>
          )}
          {actions}
        </div>
      </div>

      {/* Summary Highlight (Optional) */}
      {summaryValue && (
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-2xl font-black tabular-nums text-foreground">
            {summaryValue}
          </span>
          {summaryLabel && (
            <span className="text-xs text-muted-foreground">{summaryLabel}</span>
          )}
        </div>
      )}

      {/* Chart container */}
      <div className="w-full pt-2">{children}</div>
    </div>
  );
}
