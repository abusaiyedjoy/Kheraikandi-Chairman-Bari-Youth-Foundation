"use client";

import React, { useState, useMemo } from "react";
import { MemberLayout } from "@/components/shared/MemberLayout";
import { SearchInput } from "@/components/shared/SearchInput";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Bell,
  Pin,
  Calendar,
  User,
  Filter,
  AlertCircle,
  FileText,
  Printer,
  ChevronRight,
  Share2,
} from "lucide-react";
import { NOTICES } from "@/data/notices";
import { Notice } from "@/types/notice";
import { formatDate } from "@/lib/formatters";

export default function MemberNoticesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const filteredNotices = useMemo(() => {
    return NOTICES.filter((n) => {
      if (selectedPriority !== "all" && n.priority !== selectedPriority) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = n.titleBn?.toLowerCase().includes(q) || n.title.toLowerCase().includes(q);
        const matchesContent = n.contentBn?.toLowerCase().includes(q) || false;
        if (!matchesTitle && !matchesContent) return false;
      }
      return true;
    });
  }, [searchQuery, selectedPriority]);

  const getPriorityBadge = (priority: Notice["priority"]) => {
    switch (priority) {
      case "urgent":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 animate-pulse">
            <AlertCircle className="h-3 w-3" />
            জরুরি (Urgent)
          </span>
        );
      case "high":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            উচ্চ অগ্রাধিকার
          </span>
        );
      case "medium":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            সাধারণ নোটিশ
          </span>
        );
    }
  };

  return (
    <MemberLayout
      breadcrumbs={[
        { label: "ড্যাশবোর্ড", href: "/member/dashboard" },
        { label: "নোটিশ বোর্ড" },
      ]}
      memberSavings={5400}
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
        {/* ── Page Header ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              অফিসিয়াল নোটিশ বোর্ড
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              সংগঠনের সাধারণ সভা, আর্থিক সিদ্ধান্ত ও জরুরি নির্দেশনাবলীর নোটিশ।
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-500/20">
              <Bell className="h-4 w-4 text-emerald-600" />
              হালনাগাদ বিজ্ঞপ্তি
            </span>
          </div>
        </div>

        {/* ── Filter & Search Toolbar ────────────────────────── */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="w-full sm:w-80">
              <SearchInput
                placeholder="নোটিশের শিরোনাম বা বিষয়বস্তু খুঁজুন..."
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" /> অগ্রাধিকার:
              </span>
              <div className="flex gap-1.5">
                {[
                  { value: "all", label: "সকল" },
                  { value: "urgent", label: "জরুরি" },
                  { value: "high", label: "গুরুত্বপূর্ণ" },
                  { value: "medium", label: "সাধারণ" },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setSelectedPriority(tab.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedPriority === tab.value
                        ? "bg-primary text-white shadow-xs"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Notice List ─────────────────────────────────────── */}
        <div className="space-y-4">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className={`rounded-2xl border bg-card p-5 sm:p-6 shadow-sm hover:shadow-md transition-all ${
                  notice.isPinned
                    ? "border-emerald-500/50 bg-emerald-50/10 dark:bg-emerald-950/10 ring-1 ring-emerald-500/20"
                    : "border-border"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {notice.isPinned && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                        <Pin className="h-3 w-3 fill-amber-600 text-amber-600" />
                        পিন করা নোটিশ
                      </span>
                    )}
                    {getPriorityBadge(notice.priority)}
                    <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                      <Calendar className="h-3 w-3 text-emerald-600" />
                      {formatDate(notice.publishedDate)}
                    </span>
                  </div>

                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <User className="h-3 w-3" />
                    প্রকাশক: <strong className="text-foreground">{notice.publishedByName}</strong>
                  </span>
                </div>

                <div className="space-y-2 mt-2">
                  <h3 className="text-lg font-bold text-foreground hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedNotice(notice)}>
                    {notice.titleBn}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {notice.contentBn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {notice.tags?.map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedNotice(notice)}
                    className="text-xs font-semibold text-primary hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border-primary/30 gap-1.5"
                  >
                    সম্পূর্ণ নোটিশ পড়ুন
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-muted-foreground border border-border rounded-2xl bg-card">
              কোনো নোটিশ খুঁজে পাওয়া যায়নি।
            </div>
          )}
        </div>
      </div>

      {/* ── Notice Details Modal ───────────────────────────── */}
      <Dialog open={!!selectedNotice} onOpenChange={(open) => !open && setSelectedNotice(null)}>
        {selectedNotice && (
          <DialogContent maxWidth="xl" onClose={() => setSelectedNotice(null)}>
            <div className="space-y-4">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {selectedNotice.isPinned && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                      <Pin className="h-3 w-3 fill-amber-600 text-amber-600" />
                      পিন করা
                    </span>
                  )}
                  {getPriorityBadge(selectedNotice.priority)}
                  <span className="text-xs text-muted-foreground font-mono">
                    প্রকাশের তারিখ: {formatDate(selectedNotice.publishedDate)}
                  </span>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-extrabold text-foreground leading-snug">
                  {selectedNotice.titleBn}
                </DialogTitle>
                <p className="text-xs text-muted-foreground font-medium">
                  {selectedNotice.title}
                </p>
              </DialogHeader>

              {/* Full Notice Content */}
              <div className="rounded-xl border border-border bg-muted/20 p-5 text-sm text-foreground leading-relaxed whitespace-pre-line">
                {selectedNotice.contentBn}
              </div>

              {/* English Version if available */}
              {selectedNotice.content && (
                <div className="rounded-xl border border-border bg-card p-4 text-xs text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground block mb-1">English Summary:</span>
                  {selectedNotice.content}
                </div>
              )}

              {/* Notice Metadata */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                <span>প্রকাশক: <strong className="text-foreground">{selectedNotice.publishedByName}</strong></span>
                <span>প্রাপক: সকল সাধারণ সদস্য</span>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedNotice(null)}
                >
                  বন্ধ করুন
                </Button>
                <Button
                  size="sm"
                  onClick={() => window.print()}
                  className="bg-primary text-white hover:bg-emerald-700 gap-1.5"
                >
                  <Printer className="h-3.5 w-3.5" />
                  প্রিন্ট করুন
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </MemberLayout>
  );
}
