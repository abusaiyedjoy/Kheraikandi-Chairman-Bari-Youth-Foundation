"use client";

import React, { useState } from "react";
import { Search, Users, Phone, Droplets } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchInput } from "@/components/shared/SearchInput";
import { MemberCard } from "@/components/shared/MemberCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { MEMBERS } from "@/data/members";
import { ROLE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ROLE_FILTERS = [
  { label: "সব", value: "all" },
  { label: "সভাপতি", value: "president" },
  { label: "সাধারণ সম্পাদক", value: "secretary" },
  { label: "কোষাধ্যক্ষ", value: "treasurer" },
  { label: "সদস্য", value: "member" },
];

const STATUS_FILTERS = [
  { label: "সব", value: "all" },
  { label: "সক্রিয়", value: "active" },
  { label: "নিষ্ক্রিয়", value: "inactive" },
];

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("active");

  const filtered = MEMBERS.filter((m) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      m.fullNameBn.toLowerCase().includes(q) ||
      m.fullName.toLowerCase().includes(q) ||
      m.memberId.toLowerCase().includes(q) ||
      (m.address ?? "").toLowerCase().includes(q);
    const matchRole = roleFilter === "all" || m.role === roleFilter;
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const activeCount = MEMBERS.filter((m) => m.status === "active").length;
  const bloodGroups = [...new Set(MEMBERS.map((m) => m.bloodGroup).filter(Boolean))].sort();

  return (
    <>
      <PageHeader
        title="সদস্য তালিকা"
        subtitle="খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ সমিতির সকল সদস্যবৃন্দ।"
        breadcrumbs={[
          { label: "হোম", href: "/" },
          { label: "সদস্য" },
        ]}
        badge={`${activeCount} সক্রিয় সদস্য`}
      />

      <section className="py-10 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Stats bar */}
          <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "মোট সদস্য", value: MEMBERS.length, icon: Users, color: "text-primary" },
              { label: "সক্রিয়", value: activeCount, icon: Users, color: "text-emerald-600" },
              {
                label: "রক্তদাতা",
                value: MEMBERS.filter((m) => m.bloodGroup).length,
                icon: Droplets,
                color: "text-red-500",
              },
              {
                label: "রক্তের গ্রুপ",
                value: bloodGroups.join(", "),
                icon: Droplets,
                color: "text-rose-500",
                isText: true,
              },
            ].map(({ label, value, icon: Icon, color, isText }) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-card px-4 py-3 flex items-center gap-3"
              >
                <Icon className={cn("h-4 w-4 shrink-0", color)} />
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className={cn("font-bold text-sm", isText ? "text-xs" : "")}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="নাম, আইডি বা ঠিকানা দিয়ে খুঁজুন..."
              className="max-w-md"
            />

            {/* Status filter */}
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

            {/* Role filter */}
            <div className="flex flex-wrap gap-2">
              {ROLE_FILTERS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setRoleFilter(value)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium border transition-colors",
                    roleFilter === value
                      ? "bg-secondary/20 text-primary border-primary/40"
                      : "border-border/50 text-muted-foreground hover:text-foreground bg-transparent"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              {filtered.length} জন সদস্য পাওয়া গেছে
            </p>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <EmptyState
              title="কোনো সদস্য পাওয়া যায়নি"
              description="আপনার অনুসন্ধান পরিবর্তন করুন।"
              icon={Search}
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
