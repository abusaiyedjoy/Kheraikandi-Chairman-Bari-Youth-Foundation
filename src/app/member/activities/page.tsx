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
  Heart,
  Calendar,
  MapPin,
  Users,
  Wallet,
  Tag,
  CheckCircle2,
  Clock,
  ChevronRight,
  Filter,
} from "lucide-react";
import { ACTIVITIES } from "@/data/activities";
import { SocialActivity } from "@/types/activity";
import { formatDate } from "@/lib/formatters";

export default function MemberActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedActivity, setSelectedActivity] = useState<SocialActivity | null>(null);

  const filteredActivities = useMemo(() => {
    return ACTIVITIES.filter((act) => {
      if (selectedStatus !== "all" && act.status !== selectedStatus) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = act.title.toLowerCase().includes(q) || act.titleBn.toLowerCase().includes(q);
        const matchesDesc = act.description.toLowerCase().includes(q);
        const matchesLoc = act.location.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesLoc) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedStatus]);

  return (
    <MemberLayout
      breadcrumbs={[
        { label: "ড্যাশবোর্ড", href: "/member/dashboard" },
        { label: "সামাজিক কার্যক্রম" },
      ]}
      memberSavings={5400}
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* ── Page Header ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              সামাজিক কার্যক্রম ও প্রকল্পসমূহ
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ সমিতি কর্তৃক পরিচালিত সমাজসেবা ও উন্নয়নমূলক কর্মসূচি।
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-500/20">
              <Users className="h-4 w-4 text-emerald-600" />
              সদস্যদের প্রত্যক্ষ অংশগ্রহণ
            </span>
          </div>
        </div>

        {/* ── Toolbar & Filters ──────────────────────────────── */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="w-full sm:w-80">
              <SearchInput
                placeholder="কার্যক্রম বা স্থান খুঁজুন..."
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" /> অবস্থা:
              </span>
              <div className="flex gap-1.5">
                {[
                  { value: "all", label: "সব" },
                  { value: "completed", label: "সম্পন্ন" },
                  { value: "ongoing", label: "চলমান" },
                  { value: "upcoming", label: "আসন্ন" },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setSelectedStatus(tab.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedStatus === tab.value
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

        {/* ── Activities Grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((act) => (
              <div
                key={act.id}
                className="group rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <StatusBadge status={act.status} domain="activity" />
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {formatDate(act.startDate)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {act.titleBn}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                      {act.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-muted-foreground pt-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{act.location}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/60">
                      <span className="flex items-center gap-1.5 text-foreground font-semibold">
                        <Users className="h-3.5 w-3.5 text-blue-600" />
                        উপকারভোগী: {act.beneficiaries || act.totalParticipants || "—"} জন
                      </span>
                      {act.actualCost && (
                        <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
                          ৳{act.actualCost.toLocaleString("en-BD")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-border bg-muted/20 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {act.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedActivity(act)}
                    className="h-7 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 gap-1"
                  >
                    বিস্তারিত দেখুন
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-12 text-center text-muted-foreground border border-border rounded-2xl bg-card">
              কোনো সামাজিক কার্যক্রম খুঁজে পাওয়া যায়নি।
            </div>
          )}
        </div>
      </div>

      {/* ── Activity Details Modal ─────────────────────────── */}
      <Dialog open={!!selectedActivity} onOpenChange={(open) => !open && setSelectedActivity(null)}>
        {selectedActivity && (
          <DialogContent maxWidth="xl" onClose={() => setSelectedActivity(null)}>
            <div className="space-y-4">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1.5">
                  <StatusBadge status={selectedActivity.status} domain="activity" />
                  <span className="text-xs text-muted-foreground font-mono">
                    তারিখ: {formatDate(selectedActivity.startDate)}
                  </span>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-extrabold text-foreground">
                  {selectedActivity.titleBn}
                </DialogTitle>
                <p className="text-xs text-muted-foreground font-medium">
                  {selectedActivity.title}
                </p>
              </DialogHeader>

              {/* Description */}
              <div className="rounded-xl border border-border bg-muted/20 p-4 text-sm text-foreground leading-relaxed">
                {selectedActivity.description}
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-border bg-card space-y-1">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600" /> অনুষ্ঠানস্থল / অবস্থান
                  </span>
                  <p className="font-bold text-foreground text-sm">{selectedActivity.location}</p>
                </div>

                <div className="p-3 rounded-xl border border-border bg-card space-y-1">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-blue-600" /> উপকারভোগী ও অংশগ্রহণকারী
                  </span>
                  <p className="font-bold text-foreground text-sm">
                    {selectedActivity.beneficiaries ? `${selectedActivity.beneficiaries} জন সেবাগ্রহীতা` : "উন্মুক্ত"}
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-border bg-card space-y-1">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Wallet className="h-3.5 w-3.5 text-amber-600" /> বরাদ্দ ও প্রকৃত ব্যয়
                  </span>
                  <p className="font-bold text-foreground text-sm font-mono">
                    বাজেট: ৳{selectedActivity.budget ? selectedActivity.budget.toLocaleString("en-BD") : "—"} • খরচ: ৳{selectedActivity.actualCost?.toLocaleString("en-BD") || "—"}
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-border bg-card space-y-1">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5 text-purple-600" /> সংশ্লিষ্ট ট্যাগ
                  </span>
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {selectedActivity.tags.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-[11px] font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setSelectedActivity(null)}
                >
                  বন্ধ করুন
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </MemberLayout>
  );
}
