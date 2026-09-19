"use client";

import React, { useState } from "react";
import { Bell, Plus, Search, Pin, AlertTriangle, Calendar, Edit, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Button } from "@/components/ui/button";
import { NOTICES } from "@/data/notices";
import { cn } from "@/lib/utils";

const PRIORITY_CONFIG: Record<string, { label: string; cls: string }> = {
  urgent: { label: "জরুরি", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" },
  high: { label: "উচ্চ", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" },
  medium: { label: "মাঝারি", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400" },
  low: { label: "সাধারণ", cls: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
};

const CATEGORY_LABELS: Record<string, string> = {
  urgent: "জরুরি",
  meeting: "সভা",
  financial: "আর্থিক",
  event: "অনুষ্ঠান",
  welfare: "কল্যাণ",
  general: "সাধারণ",
};

export default function AdminNoticesPage() {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);

  const filtered = NOTICES.filter((n) => {
    const matchSearch = !search || n.titleBn.includes(search) || (n.contentBn || "").includes(search);
    const matchPriority = priorityFilter === "all" || n.priority === priorityFilter;
    return matchSearch && matchPriority;
  }).sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  });

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "অ্যাডমিন", href: "/admin/dashboard" },
        { label: "নোটিশ বোর্ড" },
      ]}
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              নোটিশ বোর্ড
            </h1>
            <p className="text-sm text-muted-foreground">{NOTICES.length}টি নোটিশ প্রকাশিত</p>
          </div>
          <Button size="sm" className="text-xs" leftIcon={<Plus className="h-3.5 w-3.5" />}
            onClick={() => setShowAddForm(!showAddForm)}>
            নতুন নোটিশ
          </Button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="rounded-2xl border border-primary/20 bg-card p-5 space-y-4 shadow-md">
            <h3 className="text-sm font-bold text-foreground">নতুন নোটিশ প্রকাশ করুন</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-foreground mb-1.5">শিরোনাম</label>
                <input type="text" placeholder="নোটিশের শিরোনাম..."
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">অগ্রাধিকার</label>
                <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="medium">মাঝারি</option>
                  <option value="high">উচ্চ</option>
                  <option value="urgent">জরুরি</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">লক্ষ্য</label>
                <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="all">সকলের জন্য</option>
                  <option value="member">শুধু সদস্য</option>
                  <option value="admin">শুধু অ্যাডমিন</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-foreground mb-1.5">বিষয়বস্তু</label>
                <textarea rows={3} placeholder="নোটিশের বিস্তারিত..."
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" className="text-xs" onClick={() => setShowAddForm(false)}>বাতিল</Button>
              <Button size="sm" className="text-xs">প্রকাশ করুন</Button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="নোটিশ খুঁজুন..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="all">সকল অগ্রাধিকার</option>
            <option value="urgent">জরুরি</option>
            <option value="high">উচ্চ</option>
            <option value="medium">মাঝারি</option>
            <option value="low">সাধারণ</option>
          </select>
        </div>

        {/* Notice List */}
        <div className="space-y-4">
          {filtered.map((notice) => {
            const priority = PRIORITY_CONFIG[notice.priority] ?? PRIORITY_CONFIG.medium;
            return (
              <div key={notice.id} className={cn(
                "rounded-2xl border bg-card p-5 space-y-3 shadow-xs",
                notice.isPinned ? "border-primary/30 bg-primary/5" : "border-border"
              )}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2 min-w-0">
                    {notice.isPinned && <Pin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />}
                    <h3 className="text-sm font-bold text-foreground">{notice.titleBn}</h3>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", priority.cls)}>
                      {priority.label}
                    </span>
                    <button className="rounded-md p-1 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                      <Edit className="h-3.5 w-3.5" />
                    </button>
                    <button className="rounded-md p-1 hover:bg-red-50 dark:hover:bg-red-950/40 text-muted-foreground hover:text-red-600 transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {notice.contentBn}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground border-t border-border pt-2.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {notice.publishedDate}
                  </span>
                  <span>প্রকাশক: {notice.publishedByName}</span>
                  {notice.expiresDate && (
                    <span className="flex items-center gap-1 text-amber-600">
                      <AlertTriangle className="h-3 w-3" />
                      মেয়াদ: {notice.expiresDate}
                    </span>
                  )}
                  <span className="ml-auto rounded-full bg-muted px-2 py-0.5">
                    {CATEGORY_LABELS[notice.category] || notice.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </AdminLayout>
  );
}
