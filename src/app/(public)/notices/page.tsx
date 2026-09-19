"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Filter } from "lucide-react";
import { NoticeCard } from "@/components/shared/NoticeCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchInput } from "@/components/shared/SearchInput";
import { EmptyState } from "@/components/shared/EmptyState";
import { NOTICES } from "@/data/notices";
import { NOTICE_CATEGORY_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const PRIORITY_FILTERS = [
  { label: "সব", value: "all" },
  { label: "জরুরি", value: "urgent" },
  { label: "উচ্চ", value: "high" },
  { label: "মাঝারি", value: "medium" },
  { label: "সাধারণ", value: "low" },
];

export default function NoticesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const categories = ["all", ...Object.keys(NOTICE_CATEGORY_LABELS)];

  // Pinned first, then by date
  const sorted = [...NOTICES].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  });

  const filtered = sorted.filter((n) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      (n.titleBn ?? "").toLowerCase().includes(q) ||
      n.title.toLowerCase().includes(q) ||
      (n.contentBn ?? "").toLowerCase().includes(q);
    const matchCat = categoryFilter === "all" || n.category === categoryFilter;
    const matchPriority = priorityFilter === "all" || n.priority === priorityFilter;
    return matchSearch && matchCat && matchPriority;
  });

  const pinnedCount = filtered.filter((n) => n.isPinned).length;

  return (
    <>
      <PageHeader
        title="নোটিশ বোর্ড"
        subtitle="সমিতির সকল সরকারি ঘোষণা, সভার নোটিশ ও গুরুত্বপূর্ণ তথ্যাবলী।"
        breadcrumbs={[
          { label: "হোম", href: "/" },
          { label: "নোটিশ" },
        ]}
        badge={`${NOTICES.length} নোটিশ`}
      />

      <section className="py-10 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-8 space-y-4">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="নোটিশ খুঁজুন..."
              className="max-w-md"
            />

            {/* Priority filter */}
            <div className="flex flex-wrap gap-2">
              {PRIORITY_FILTERS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setPriorityFilter(value)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-semibold border transition-colors",
                    priorityFilter === value
                      ? "bg-primary text-white border-primary"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground bg-card"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium border transition-colors",
                    categoryFilter === cat
                      ? "bg-secondary/20 text-primary border-primary/40"
                      : "border-border/50 text-muted-foreground hover:text-foreground bg-transparent"
                  )}
                >
                  {cat === "all"
                    ? "সব বিভাগ"
                    : NOTICE_CATEGORY_LABELS[cat as keyof typeof NOTICE_CATEGORY_LABELS] ?? cat}
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              {filtered.length} টি নোটিশ
              {pinnedCount > 0 && <span className="ml-1">({pinnedCount} টি পিনকৃত)</span>}
            </p>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <EmptyState
              title="কোনো নোটিশ পাওয়া যায়নি"
              description="আপনার অনুসন্ধান বা ফিল্টার পরিবর্তন করুন।"
              icon={Filter}
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  onReadMore={() => router.push(`/notices/${notice.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
