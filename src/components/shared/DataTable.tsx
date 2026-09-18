"use client";

import React, { useState, useMemo } from "react";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  LayoutGrid,
  Table as TableIcon,
} from "lucide-react";
import { SearchInput } from "./SearchInput";
import { Pagination } from "./Pagination";
import { TableRowSkeleton } from "./LoadingSkeleton";
import { EmptyState } from "./EmptyState";
import { cn } from "@/lib/utils";

export interface ColumnDef<TData> {
  id?: string;
  header: React.ReactNode;
  accessorKey?: keyof TData;
  accessorFn?: (row: TData) => unknown;
  sortable?: boolean;
  cell?: (row: TData, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  searchKey?: keyof TData | ((row: TData) => string);
  searchPlaceholder?: string;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  pageSize?: number;
  mobileCardRender?: (row: TData, index: number) => React.ReactNode;
  filterSlot?: React.ReactNode;
  actionsSlot?: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function DataTable<TData extends Record<string, unknown>>({
  data,
  columns,
  searchKey,
  searchPlaceholder = "অনুসন্ধান করুন...",
  isLoading = false,
  emptyTitle = "কোন তথ্য পাওয়া যায়নি",
  emptyDescription = "আপনার অনুসন্ধানের সাথে মিলে এমন কোনো রেকর্ড পাওয়া যায়নি।",
  pageSize: initialPageSize = 10,
  mobileCardRender,
  filterSlot,
  actionsSlot,
  className,
  title,
  subtitle,
}: DataTableProps<TData>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [viewMode, setViewMode] = useState<"auto" | "table" | "card">("auto");

  // Filter by search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase().trim();

    return data.filter((row) => {
      if (typeof searchKey === "function") {
        return searchKey(row).toLowerCase().includes(q);
      }
      if (searchKey && typeof searchKey === "string") {
        const val = row[searchKey];
        return String(val ?? "").toLowerCase().includes(q);
      }
      // If no searchKey specified, search all string/number fields of row
      return Object.values(row).some((val) =>
        String(val ?? "").toLowerCase().includes(q)
      );
    });
  }, [data, searchQuery, searchKey]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    const column = columns.find((c) => (c.id || String(c.accessorKey)) === sortColumn);
    if (!column) return filteredData;

    return [...filteredData].sort((a, b) => {
      let aVal = column.accessorFn ? column.accessorFn(a) : column.accessorKey ? a[column.accessorKey] : "";
      let bVal = column.accessorFn ? column.accessorFn(b) : column.accessorKey ? b[column.accessorKey] : "";

      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection, columns]);

  // Pagination
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (colId: string) => {
    if (sortColumn === colId) {
      if (sortDirection === "asc") setSortDirection("desc");
      else {
        setSortColumn(null);
        setSortDirection("asc");
      }
    } else {
      setSortColumn(colId);
      setSortDirection("asc");
    }
  };

  return (
    <div className={cn("space-y-3.5", className)}>
      {/* Top Header: Title & Actions */}
      {(title || actionsSlot) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            {title && (
              <h3 className="text-base font-bold text-foreground">{title}</h3>
            )}
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
            )}
          </div>
          {actionsSlot && <div className="flex items-center gap-2">{actionsSlot}</div>}
        </div>
      )}

      {/* Toolbar: Search & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="flex-1 max-w-sm">
          <SearchInput
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex items-center gap-2 justify-between sm:justify-end">
          {filterSlot}

          {/* Mobile view switcher for testing / preferences */}
          <div className="hidden lg:flex items-center rounded-lg border border-border bg-muted/40 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={cn(
                "p-1.5 rounded text-xs transition-colors",
                viewMode === "table" || viewMode === "auto"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="টেবিল ভিউ"
            >
              <TableIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("card")}
              className={cn(
                "p-1.5 rounded text-xs transition-colors",
                viewMode === "card"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="কার্ড ভিউ"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-left text-sm">
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRowSkeleton key={i} columns={columns.length} />
              ))}
            </tbody>
          </table>
        </div>
      ) : paginatedData.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <>
          {/* Desktop Table View (visible on md+ or when viewMode is table) */}
          <div
            className={cn(
              "rounded-xl border border-border bg-card shadow-xs overflow-hidden",
              viewMode === "card" ? "hidden" : viewMode === "table" ? "block" : "hidden md:block"
            )}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-muted/50 text-xs font-semibold text-muted-foreground">
                  <tr>
                    {columns.map((col, idx) => {
                      const colId = col.id || String(col.accessorKey) || `col-${idx}`;
                      const isSorted = sortColumn === colId;

                      return (
                        <th
                          key={colId}
                          className={cn(
                            "px-4 py-3 select-none text-foreground/80",
                            col.sortable && "cursor-pointer hover:bg-muted/80 transition-colors",
                            col.headerClassName
                          )}
                          onClick={() => col.sortable && handleSort(colId)}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>{col.header}</span>
                            {col.sortable && (
                              <span className="text-muted-foreground">
                                {isSorted ? (
                                  sortDirection === "asc" ? (
                                    <ArrowUp className="h-3.5 w-3.5 text-primary" />
                                  ) : (
                                    <ArrowDown className="h-3.5 w-3.5 text-primary" />
                                  )
                                ) : (
                                  <ArrowUpDown className="h-3 w-3 opacity-40" />
                                )}
                              </span>
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {paginatedData.map((row, rowIdx) => (
                    <tr
                      key={row.id ?? rowIdx}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      {columns.map((col, colIdx) => {
                        const colId = col.id || String(col.accessorKey) || `cell-${colIdx}`;
                        return (
                          <td key={colId} className={cn("px-4 py-3.5", col.className)}>
                            {col.cell
                              ? col.cell(row, rowIdx)
                              : col.accessorKey
                              ? String(row[col.accessorKey] ?? "")
                              : null}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card-based Layout (automatically used on mobile < md) */}
          <div
            className={cn(
              "space-y-3",
              viewMode === "table" ? "hidden" : viewMode === "card" ? "block" : "block md:hidden"
            )}
          >
            {paginatedData.map((row, idx) => {
              if (mobileCardRender) {
                return <div key={row.id ?? idx}>{mobileCardRender(row, idx)}</div>;
              }

              // Automatic fallback card if mobileCardRender is not provided
              return (
                <div
                  key={row.id ?? idx}
                  className="rounded-xl border border-border bg-card p-4 shadow-xs space-y-2 text-xs"
                >
                  {columns.map((col, cIdx) => (
                    <div key={cIdx} className="flex items-center justify-between gap-2 border-b border-border/40 pb-1.5 last:border-0 last:pb-0">
                      <span className="text-muted-foreground font-medium">{col.header}:</span>
                      <div className="text-foreground font-semibold text-right">
                        {col.cell ? col.cell(row, idx) : col.accessorKey ? String(row[col.accessorKey] ?? "") : null}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setCurrentPage(1);
            }}
          />
        </>
      )}
    </div>
  );
}
