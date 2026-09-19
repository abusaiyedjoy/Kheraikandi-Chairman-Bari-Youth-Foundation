"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter } from "lucide-react";
import { ActivityCard } from "@/components/shared/ActivityCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchInput } from "@/components/shared/SearchInput";
import { EmptyState } from "@/components/shared/EmptyState";
import { ACTIVITIES } from "@/data/activities";
import { ACTIVITY_TYPE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { SocialActivity } from "@/types/activity";

const ALL_TYPES = ["সব", ...Object.keys(ACTIVITY_TYPE_LABELS)];
const STATUS_FILTERS = [
  { label: "সব", value: "all" },
  { label: "সম্পন্ন", value: "completed" },
  { label: "চলমান", value: "ongoing" },
  { label: "পরিকল্পিত", value: "planned" },
];

export default function ActivitiesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("সব");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = ACTIVITIES.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      (a.titleBn ?? "").toLowerCase().includes(q) ||
      a.title.toLowerCase().includes(q) ||
      (a.description ?? "").toLowerCase().includes(q);
    const matchType =
      typeFilter === "সব" || a.type === typeFilter;
    const matchStatus =
      statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <>
      <PageHeader
        title="সামাজিক সেবা কার্যক্রম"
        subtitle="আমাদের সম্প্রদায়ের উন্নয়নে পরিচালিত সকল কার্যক্রম ও উদ্যোগ।"
        breadcrumbs={[
          { label: "হোম", href: "/" },
          { label: "কার্যক্রম" },
        ]}
        badge={`${ACTIVITIES.length} কার্যক্রম`}
      />

      <section className="py-10 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-8 space-y-4">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="কার্যক্রম খুঁজুন..."
              className="max-w-md"
            />

            {/* Status filter pills */}
            <div className="flex flex-wrap gap-2">
              {STATUS_FILTERS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setStatusFilter(value)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-semibold border transition-colors",
                    statusFilter === value
                      ? "bg-primary text-white border-primary"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground bg-card"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Type filter pills */}
            <div className="flex flex-wrap gap-2">
              {ALL_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium border transition-colors",
                    typeFilter === type
                      ? "bg-secondary/20 text-primary border-primary/40"
                      : "border-border/50 text-muted-foreground hover:text-foreground bg-transparent"
                  )}
                >
                  {type === "সব"
                    ? "সব ধরণ"
                    : ACTIVITY_TYPE_LABELS[type as keyof typeof ACTIVITY_TYPE_LABELS] ?? type}
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              {filtered.length} টি কার্যক্রম পাওয়া গেছে
            </p>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <EmptyState
              title="কোনো কার্যক্রম পাওয়া যায়নি"
              description="আপনার অনুসন্ধান বা ফিল্টার পরিবর্তন করুন।"
              icon={Filter}
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onViewDetails={() => router.push(`/activities/${activity.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
