import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Calendar,
  User,
  Tag,
  Pin,
  ArrowLeft,
  AlertTriangle,
  Bell,
  Info,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PageHeader } from "@/components/shared/PageHeader";
import { NOTICES } from "@/data/notices";
import { NOTICE_CATEGORY_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return NOTICES.map((n) => ({ id: n.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const notice = NOTICES.find((n) => n.id === id);
  if (!notice) return { title: "নোটিশ পাওয়া যায়নি" };
  return {
    title: `${notice.titleBn ?? notice.title} | KCBYW নোটিশ`,
    description: notice.contentBn ?? notice.content,
  };
}

const PRIORITY_CONFIG = {
  urgent: {
    icon: AlertTriangle,
    label: "জরুরি",
    cls: "text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/30 dark:border-red-800",
  },
  high: {
    icon: Bell,
    label: "উচ্চ অগ্রাধিকার",
    cls: "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/30 dark:border-amber-800",
  },
  medium: {
    icon: Info,
    label: "মাঝারি",
    cls: "text-sky-700 bg-sky-50 border-sky-200 dark:text-sky-400 dark:bg-sky-950/30 dark:border-sky-800",
  },
  low: {
    icon: Info,
    label: "সাধারণ",
    cls: "text-muted-foreground bg-muted/50 border-border",
  },
};

export default async function NoticeDetailPage({ params }: Props) {
  const { id } = await params;
  const notice = NOTICES.find((n) => n.id === id);
  if (!notice) notFound();

  const priorityCfg =
    PRIORITY_CONFIG[notice.priority as keyof typeof PRIORITY_CONFIG] ??
    PRIORITY_CONFIG.low;
  const PriorityIcon = priorityCfg.icon;

  return (
    <>
      <PageHeader
        title={notice.titleBn ?? notice.title}
        subtitle={notice.titleBn && notice.title !== notice.titleBn ? notice.title : undefined}
        breadcrumbs={[
          { label: "হোম", href: "/" },
          { label: "নোটিশ", href: "/notices" },
          { label: notice.titleBn ?? notice.title },
        ]}
      />

      <section className="py-12 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/notices">
              <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
                সব নোটিশ
              </Button>
            </Link>
          </div>

          {/* Priority Banner */}
          <div
            className={cn(
              "mb-6 flex items-center gap-3 rounded-xl border px-5 py-4",
              priorityCfg.cls
            )}
          >
            <PriorityIcon className="h-5 w-5 shrink-0" />
            <div>
              <p className="text-xs font-bold">{priorityCfg.label} নোটিশ</p>
              {notice.expiresDate && (
                <p className="text-[11px] mt-0.5 opacity-80 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  মেয়াদ: {formatDate(notice.expiresDate)} পর্যন্ত
                </p>
              )}
            </div>
            {notice.isPinned && (
              <div className="ml-auto flex items-center gap-1 text-xs font-bold opacity-80">
                <Pin className="h-3.5 w-3.5 fill-current" />
                পিনকৃত
              </div>
            )}
          </div>

          {/* Main card */}
          <article className="rounded-2xl border border-border bg-card p-8 shadow-xs space-y-6">
            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={notice.priority} domain="notice" />
              <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground uppercase">
                {NOTICE_CATEGORY_LABELS[notice.category as keyof typeof NOTICE_CATEGORY_LABELS] ?? notice.category}
              </span>
              <span className="rounded-lg bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                {notice.audience === "all" ? "সকলের জন্য" : notice.audience === "member" ? "সদস্যদের জন্য" : notice.audience}
              </span>
            </div>

            {/* Bengali content */}
            {notice.contentBn && (
              <div>
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                  বিজ্ঞপ্তি
                </h2>
                <p className="text-sm text-foreground leading-[1.9] whitespace-pre-line">
                  {notice.contentBn}
                </p>
              </div>
            )}

            {/* English content if different */}
            {notice.content && notice.content !== notice.contentBn && (
              <div className="border-t border-border pt-5">
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                  Notice (English)
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {notice.content}
                </p>
              </div>
            )}

            {/* Tags */}
            {notice.tags && notice.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap border-t border-border pt-5">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                {notice.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[11px] font-mono text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Footer meta */}
            <div className="border-t border-border pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <span>প্রকাশ: {formatDate(notice.publishedDate)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-primary" />
                  <span>{notice.publishedByName}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
