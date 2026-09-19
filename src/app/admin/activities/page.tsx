"use client";

import React, { useState } from "react";
import { Heart, Plus, Search, MapPin, Users, Calendar, DollarSign } from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Button } from "@/components/ui/button";
import { ACTIVITIES } from "@/data/activities";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  completed: { label: "সম্পন্ন", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400" },
  ongoing: { label: "চলমান", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400" },
  planned: { label: "পরিকল্পিত", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  cancelled: { label: "বাতিল", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
};

const TYPE_LABELS: Record<string, string> = {
  health_camp: "স্বাস্থ্য শিবির",
  tree_plantation: "বৃক্ষরোপণ",
  blood_donation: "রক্তদান",
  education: "শিক্ষা",
  relief: "ত্রাণ / সহায়তা",
  sports: "ক্রীড়া",
  cultural: "সাংস্কৃতিক",
  other: "অন্যান্য",
};

export default function AdminActivitiesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = ACTIVITIES.filter((a) => {
    const matchSearch = !search || a.titleBn.includes(search) || a.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const completedCount = ACTIVITIES.filter((a) => a.status === "completed").length;
  const totalBeneficiaries = ACTIVITIES.reduce((s, a) => s + (a.beneficiaries ?? 0), 0);
  const totalSpent = ACTIVITIES.reduce((s, a) => s + (a.actualCost ?? 0), 0);

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "অ্যাডমিন", href: "/admin/dashboard" },
        { label: "কার্যক্রম" },
      ]}
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1400px] w-full mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              সামাজিক কার্যক্রম
            </h1>
            <p className="text-sm text-muted-foreground">সংগঠনের কল্যাণমূলক কার্যক্রম ব্যবস্থাপনা</p>
          </div>
          <Button size="sm" className="text-xs" leftIcon={<Plus className="h-3.5 w-3.5" />}>
            নতুন কার্যক্রম
          </Button>
        </div>

        {/* Summary */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/40 shrink-0">
              <Heart className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400">{completedCount}টি</p>
              <p className="text-xs text-emerald-600/70">সম্পন্ন কার্যক্রম</p>
            </div>
          </div>
          <div className="rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50/50 dark:bg-sky-950/20 p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-900/40 shrink-0">
              <Users className="h-5 w-5 text-sky-600" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-sky-700 dark:text-sky-400">{totalBeneficiaries}+</p>
              <p className="text-xs text-sky-600/70">উপকারভোগী</p>
            </div>
          </div>
          <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/40 shrink-0">
              <DollarSign className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-amber-700 dark:text-amber-400">{formatCurrency(totalSpent)}</p>
              <p className="text-xs text-amber-600/70">মোট ব্যয়</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="কার্যক্রম খুঁজুন..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="all">সকল স্ট্যাটাস</option>
            <option value="completed">সম্পন্ন</option>
            <option value="ongoing">চলমান</option>
            <option value="planned">পরিকল্পিত</option>
          </select>
        </div>

        {/* Activity Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((activity) => {
            const status = STATUS_CONFIG[activity.status] ?? STATUS_CONFIG.completed;
            return (
              <div key={activity.id} className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-foreground truncate">{activity.titleBn}</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {TYPE_LABELS[activity.type] || activity.type}
                    </p>
                  </div>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold shrink-0", status.cls)}>
                    {status.label}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {activity.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    <span>{activity.startDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="h-3.5 w-3.5 shrink-0" />
                    <span>{activity.totalParticipants || activity.participants?.length || 0} জন</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <DollarSign className="h-3.5 w-3.5 shrink-0" />
                    <span>{formatCurrency(activity.actualCost ?? activity.budget ?? 0)}</span>
                  </div>
                </div>

                {activity.tags && activity.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {activity.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[9px] font-medium text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 pt-2 border-t border-border">
                  <Button variant="outline" size="sm" className="text-xs flex-1">বিস্তারিত</Button>
                  <Button variant="outline" size="sm" className="text-xs flex-1">সম্পাদনা</Button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </AdminLayout>
  );
}
