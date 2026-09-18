import React from "react";
import { Pin, Calendar, Paperclip, ArrowRight } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/formatters";
import type { Notice } from "@/types/notice";
import { cn } from "@/lib/utils";

interface NoticeCardProps {
  notice: Notice;
  onReadMore?: (notice: Notice) => void;
  className?: string;
}

export function NoticeCard({
  notice,
  onReadMore,
  className,
}: NoticeCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-5 shadow-xs transition-all hover:shadow-md",
        notice.isPinned
          ? "border-amber-300 dark:border-amber-800 bg-amber-50/20 dark:bg-amber-950/10"
          : "border-border",
        className
      )}
    >
      {/* Top badges bar */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          {notice.isPinned && (
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 text-[10px] font-bold text-amber-900 dark:text-amber-200">
              <Pin className="h-3 w-3 fill-current" />
              পিনকৃত নোটিশ
            </span>
          )}
          <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground uppercase">
            {notice.category}
          </span>
        </div>

        <StatusBadge status={notice.priority} domain="notice" />
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-foreground line-clamp-2 leading-snug">
        {notice.titleBn || notice.title}
      </h3>

      {/* Content excerpt */}
      <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
        {notice.contentBn || notice.content}
      </p>

      {/* Meta info & Action */}
      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>{formatDate(notice.publishedDate)}</span>
          </div>

          {notice.attachments && notice.attachments.length > 0 && (
            <div className="flex items-center gap-1 text-primary">
              <Paperclip className="h-3.5 w-3.5" />
              <span>{notice.attachments.length} ফাইল</span>
            </div>
          )}
        </div>

        {onReadMore && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onReadMore(notice)}
            rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            className="text-xs font-semibold text-primary"
          >
            পড়ুন
          </Button>
        )}
      </div>
    </div>
  );
}
