import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Calendar,
  MapPin,
  Users,
  Heart,
  Tag,
  ArrowLeft,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PageHeader } from "@/components/shared/PageHeader";
import { ACTIVITIES } from "@/data/activities";
import { ACTIVITY_TYPE_LABELS } from "@/lib/constants";
import { formatDate, formatCurrency } from "@/lib/formatters";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ACTIVITIES.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const activity = ACTIVITIES.find((a) => a.id === id);
  if (!activity) return { title: "কার্যক্রম পাওয়া যায়নি" };
  return {
    title: `${activity.titleBn ?? activity.title} | KCBYW কার্যক্রম`,
    description: activity.description,
  };
}

export default async function ActivityDetailPage({ params }: Props) {
  const { id } = await params;
  const activity = ACTIVITIES.find((a) => a.id === id);
  if (!activity) notFound();

  const budget = activity.budget ?? 0;
  const cost = activity.actualCost ?? 0;
  const savings = budget - cost;

  return (
    <>
      <PageHeader
        title={activity.titleBn ?? activity.title}
        subtitle={activity.titleBn && activity.title !== activity.titleBn ? activity.title : undefined}
        breadcrumbs={[
          { label: "হোম", href: "/" },
          { label: "কার্যক্রম", href: "/activities" },
          { label: activity.titleBn ?? activity.title },
        ]}
      />

      <section className="py-12 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/activities">
              <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
                সব কার্যক্রম
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status & Type */}
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={activity.status} domain="activity" />
                <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                  {ACTIVITY_TYPE_LABELS[activity.type as keyof typeof ACTIVITY_TYPE_LABELS] ?? activity.type}
                </span>
              </div>

              {/* Description */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                <h2 className="text-sm font-bold text-foreground mb-3">বিবরণ</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </div>

              {/* Participants */}
              {activity.participants && activity.participants.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                  <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    অংশগ্রহণকারী ({activity.participants.length} জন)
                  </h2>
                  <div className="space-y-2">
                    {activity.participants.map((p) => (
                      <div
                        key={p.memberId}
                        className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-2.5 text-xs"
                      >
                        <span className="font-semibold text-foreground">{p.memberName}</span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-bold ${
                            p.role === "organizer"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {p.role === "organizer" ? "আয়োজক" : "স্বেচ্ছাসেবী"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {activity.tags && activity.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {activity.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-mono text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Key details */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-foreground border-b border-border pb-3">
                  মূল তথ্য
                </h3>

                <div className="flex items-start gap-3 text-xs">
                  <Calendar className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-muted-foreground font-medium">তারিখ</p>
                    <p className="font-semibold text-foreground">
                      {formatDate(activity.startDate)}
                      {activity.endDate && activity.endDate !== activity.startDate && (
                        <> — {formatDate(activity.endDate)}</>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-muted-foreground font-medium">স্থান</p>
                    <p className="font-semibold text-foreground">{activity.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <Users className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-muted-foreground font-medium">মোট অংশগ্রহণকারী</p>
                    <p className="font-semibold text-foreground">{activity.totalParticipants} জন</p>
                  </div>
                </div>

                {activity.beneficiaries && (
                  <div className="flex items-start gap-3 text-xs">
                    <Heart className="h-4 w-4 text-rose-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-muted-foreground font-medium">উপকৃত মানুষ</p>
                      <p className="font-semibold text-foreground">{activity.beneficiaries}+ জন</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Budget card */}
              {budget > 0 && (
                <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-5 space-y-3">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-primary" />
                    বাজেট বিবরণ
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">বরাদ্দ বাজেট</span>
                      <span className="font-bold text-foreground">{formatCurrency(budget)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">প্রকৃত ব্যয়</span>
                      <span className="font-bold text-foreground">{formatCurrency(cost)}</span>
                    </div>
                    {savings >= 0 && (
                      <div className="flex justify-between border-t border-emerald-200 dark:border-emerald-800 pt-2">
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400">সাশ্রয়</span>
                        <span className="font-extrabold text-emerald-700 dark:text-emerald-400">
                          {formatCurrency(savings)}
                        </span>
                      </div>
                    )}
                  </div>
                  {savings >= 0 && (
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      বাজেটের মধ্যে সম্পন্ন
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
