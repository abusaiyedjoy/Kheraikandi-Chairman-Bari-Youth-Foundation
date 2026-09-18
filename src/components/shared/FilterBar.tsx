"use client";

import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  children: React.ReactNode;
  activeCount?: number;
  onReset?: () => void;
  className?: string;
}

export function FilterBar({
  children,
  activeCount = 0,
  onReset,
  className,
}: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 shadow-xs",
        className
      )}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground pr-2 border-r border-border">
          <Filter className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
          <span>ফিল্টার</span>
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold">
              {activeCount}
            </span>
          )}
        </div>
        {children}
      </div>

      {activeCount > 0 && onReset && (
        <Button
          size="sm"
          variant="ghost"
          onClick={onReset}
          leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          রিসেট
        </Button>
      )}
    </div>
  );
}
