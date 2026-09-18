import React from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
  shortcut?: string;
  variant?: "default" | "emerald" | "gold" | "red";
  className?: string;
}

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  href,
  onClick,
  shortcut,
  variant = "default",
  className,
}: QuickActionCardProps) {
  const variantStyles = {
    default: "hover:border-primary/50 text-foreground",
    emerald: "hover:border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20 text-foreground",
    gold: "hover:border-amber-500 bg-amber-50/30 dark:bg-amber-950/20 text-foreground",
    red: "hover:border-red-500 bg-red-50/30 dark:bg-red-950/20 text-foreground",
  };

  const iconStyles = {
    default: "bg-muted text-primary",
    emerald: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300",
    gold: "bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-300",
    red: "bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300",
  };

  const content = (
    <div
      className={cn(
        "group relative flex items-start justify-between rounded-2xl border border-border bg-card p-4 shadow-xs transition-all duration-200",
        "hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 text-left",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start gap-3.5 min-w-0">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105",
            iconStyles[variant]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h4 className="text-sm font-bold text-foreground leading-snug truncate">
            {title}
          </h4>
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-muted-foreground shrink-0 pl-2">
        {shortcut && (
          <kbd className="hidden sm:inline-flex items-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            {shortcut}
          </kbd>
        )}
        <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100 text-primary" />
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block">{content}</Link>;
  }

  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      {content}
    </button>
  );
}
