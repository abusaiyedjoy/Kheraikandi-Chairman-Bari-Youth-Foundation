import React from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  title = "একটি সমস্যা দেখা দিয়েছে",
  message = "তথ্য লোড করার সময় অপ্রত্যাশিত ত্রুটি ঘটেছে। দয়া করে পুনরায় চেষ্টা করুন।",
  onRetry,
  retryLabel = "পুনরায় চেষ্টা করুন",
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-red-200 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/20 p-8 text-center",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-300">
        <AlertTriangle className="h-7 w-7" />
      </div>

      <h3 className="mt-4 text-base font-bold text-red-900 dark:text-red-200">
        {title}
      </h3>

      <p className="mt-1.5 max-w-sm text-xs text-red-700/80 dark:text-red-300/80 leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <div className="mt-5">
          <Button
            size="sm"
            variant="destructive"
            onClick={onRetry}
            leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
          >
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
