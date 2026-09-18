import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  homeHref?: string;
  className?: string;
}

export function Breadcrumb({
  items,
  homeHref = "/",
  className,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-xs text-muted-foreground", className)}
    >
      <ol className="flex items-center space-x-1.5 flex-wrap">
        <li>
          <Link
            href={homeHref}
            className="flex items-center gap-1 hover:text-foreground transition-colors p-1 rounded hover:bg-muted"
            title="হোম"
          >
            <Home className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
            <span className="sr-only">হোম</span>
          </Link>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={idx} className="flex items-center space-x-1.5">
              <ChevronRight className="h-3 w-3 text-muted-foreground/60 shrink-0" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors font-medium hover:underline underline-offset-4"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    "font-semibold",
                    isLast ? "text-foreground" : "text-muted-foreground"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
