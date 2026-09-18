import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function LoadingSkeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/80 dark:bg-muted/40",
        className
      )}
      {...props}
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <LoadingSkeleton className="h-3.5 w-24" />
        <LoadingSkeleton className="h-9 w-9 rounded-xl" />
      </div>
      <LoadingSkeleton className="h-7 w-32" />
      <LoadingSkeleton className="h-3 w-40" />
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="border-b border-border/60">
      {Array.from({ length: columns }).map((_, idx) => (
        <td key={idx} className="p-4">
          <LoadingSkeleton className="h-4 w-full max-w-[120px]" />
        </td>
      ))}
    </tr>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
      <div className="flex items-center gap-3">
        <LoadingSkeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1.5 flex-1">
          <LoadingSkeleton className="h-4 w-1/3" />
          <LoadingSkeleton className="h-3 w-1/4" />
        </div>
      </div>
      <LoadingSkeleton className="h-16 w-full rounded-lg" />
      <div className="flex gap-2 pt-2">
        <LoadingSkeleton className="h-8 w-24 rounded-lg" />
        <LoadingSkeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}
