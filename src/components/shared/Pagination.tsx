"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAGINATION } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
  pageSizeOptions?: readonly number[];
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  className,
  pageSizeOptions = PAGINATION.PAGE_SIZE_OPTIONS,
}: PaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 py-3 text-xs text-muted-foreground",
        className
      )}
    >
      {/* Items count summary */}
      <div className="flex items-center gap-3">
        <span>
          সর্বমোট <strong className="text-foreground">{totalItems}</strong> টির মধ্যে{" "}
          <strong className="text-foreground">{startItem}–{endItem}</strong> প্রদর্শিত
        </span>

        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 ml-2">
            <span>প্রতি পৃষ্ঠায়:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-7 rounded border border-border bg-card px-2 py-0.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-1">
        <Button
          size="icon-sm"
          variant="outline"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(1)}
          aria-label="প্রথম পৃষ্ঠা"
        >
          <ChevronsLeft className="h-3.5 w-3.5" />
        </Button>

        <Button
          size="icon-sm"
          variant="outline"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="পূর্ববর্তী পৃষ্ঠা"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>

        <div className="hidden sm:flex items-center gap-1">
          {getPageNumbers().map((p, idx) =>
            typeof p === "number" ? (
              <button
                key={idx}
                type="button"
                onClick={() => onPageChange(p)}
                className={cn(
                  "h-8 min-w-[32px] px-2 rounded-md font-medium transition-colors text-xs",
                  p === currentPage
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "border border-border hover:bg-muted text-foreground"
                )}
              >
                {p}
              </button>
            ) : (
              <span key={idx} className="px-1 text-muted-foreground">
                {p}
              </span>
            )
          )}
        </div>

        <span className="sm:hidden px-2 font-medium text-foreground">
          {currentPage} / {totalPages || 1}
        </span>

        <Button
          size="icon-sm"
          variant="outline"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="পরবর্তী পৃষ্ঠা"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>

        <Button
          size="icon-sm"
          variant="outline"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(totalPages)}
          aria-label="শেষ পৃষ্ঠা"
        >
          <ChevronsRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
