import React from "react";
import { cn } from "@/lib/utils";

export interface MobileDataField {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}

interface MobileDataCardProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  avatar?: React.ReactNode;
  fields: MobileDataField[];
  actions?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function MobileDataCard({
  title,
  subtitle,
  badge,
  avatar,
  fields,
  actions,
  onClick,
  className,
}: MobileDataCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl border border-border bg-card p-4 shadow-xs transition-all",
        onClick && "cursor-pointer hover:border-primary/40 hover:shadow-sm active:scale-[0.99]",
        className
      )}
    >
      {/* Top Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {avatar}
          <div className="min-w-0">
            <div className="font-bold text-sm text-foreground truncate">
              {title}
            </div>
            {subtitle && (
              <div className="text-xs text-muted-foreground truncate mt-0.5">
                {subtitle}
              </div>
            )}
          </div>
        </div>
        {badge && <div className="shrink-0">{badge}</div>}
      </div>

      {/* Field grid */}
      <div className="mt-3.5 grid grid-cols-2 gap-2.5 rounded-lg bg-muted/40 p-2.5 text-xs">
        {fields.map((field, idx) => (
          <div key={idx} className="space-y-0.5 min-w-0">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1 truncate">
              {field.icon}
              {field.label}
            </span>
            <div className="font-semibold text-foreground truncate">
              {field.value}
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      {actions && (
        <div className="mt-3 flex items-center justify-end gap-2 border-t border-border/60 pt-2.5">
          {actions}
        </div>
      )}
    </div>
  );
}
