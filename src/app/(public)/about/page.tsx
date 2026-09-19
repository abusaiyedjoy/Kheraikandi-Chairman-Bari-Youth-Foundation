import React from "react";
import type { Metadata } from "next";
import {
  Heart,
  Users,
  Star,
  Shield,
  MapPin,
  Phone,
  Mail,
  CalendarDays,
  Target,
  Eye,
  Handshake,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { MEMBERS } from "@/data/members";
import { DASHBOARD_SUMMARY } from "@/data/dashboard";
import { ORG, FINANCE, ROLE_LABELS } from "@/lib/constants";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে | খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ",
  description:
    "খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ সমিতির ইতিহাস, লক্ষ্য ও কমিটি সম্পর্কে জানুন।",
};

// Leadership committee (top 5 by role priority)
const rolePriority: Record<string, number> = {
  president: 1,
  secretary: 2,
  treasurer: 3,
  member: 10,
};

const committee = [...MEMBERS]
  .sort(
    (a, b) =>
      (rolePriority[a.role] ?? 10) - (rolePriority[b.role] ?? 10)
  )
  .slice(0, 6);

const VALUES = [
  {
    icon: Shield,
    title: "স্বচ্ছতা",
    desc: "প্রতিটি টাকার হিসাব সদস্যদের কাছে সম্পূর্ণ উন্মুক্ত।",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: Handshake,
    title: "ঐক্য",
    desc: "একতাবদ্ধ যুব সমাজ যেকোনো সমস্যা মোকাবেলায় সক্ষম।",
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    icon: Heart,
    title: "সেবা",
    desc: "মানুষের পাশে দাঁড়ানো আমাদের সর্বোচ্চ দায়িত্ব।",
    color: "text-rose-600",
    bg: "bg-rose-50 dark:bg-rose-950/30",
  },
  {
    icon: Star,
    title: "নৈতিকতা",
    desc: "সততা ও নীতির ভিত্তিতে প্রতিটি সিদ্ধান্ত নেওয়া হয়।",
    color: "text-sky-600",
    bg: "bg-sky-50 dark:bg-sky-950/30",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="আমাদের সম্পর্কে"
        subtitle="খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ সমিতির পরিচয়, ইতিহাস এবং আমাদের দলের সদস্যরা।"
        breadcrumbs={[
          { label: "হোম", href: "/" },
          { label: "আমাদের সম্পর্কে" },
        ]}
      />

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-foreground">আমাদের লক্ষ্য</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                খিরাইকান্দি গ্রামের প্রতিটি যুবকের আর্থিক স্বনির্ভরতা নিশ্চিত করা এবং
                একটি সুশৃঙ্খল, স্বচ্ছ ও কার্যকর সঞ্চয়-ভিত্তিক সমাজ গঠন করা।
                আমরা বিশ্বাস করি ছোট ছোট সঞ্চয় থেকেই বড় পরিবর্তন সম্ভব।
              </p>
            </div>
            <div className="rounded-3xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-foreground">আমাদের দৃষ্টিভঙ্গি</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                একটি সমৃদ্ধ, শিক্ষিত ও সচেতন যুব সমাজের নেতৃত্বে খিরাইকান্দি গ্রামকে
                একটি আদর্শ সম্প্রদায় হিসেবে গড়ে তোলা। যেখানে প্রত্যেক পরিবার আর্থিক
                নিরাপত্তায় থাকবে এবং পারস্পরিক সহযোগিতার সংস্কৃতি প্রতিষ্ঠিত হবে।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-12 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              title="সংগঠনের ইতিহাস"
              subtitle="আমাদের যাত্রার গল্প"
              className="text-center mb-10"
            />
            <div className="relative border-l-2 border-primary/30 pl-8 space-y-8">
              {[
                {
                  year: "২০১৯",
                  title: "প্রতিষ্ঠা",
                  desc: "খিরাইকান্দি গ্রামের কয়েকজন উদ্যোগী যুবক মিলে সমিতি প্রতিষ্ঠা করেন। প্রাথমিক সদস্য সংখ্যা ছিল মাত্র ১৫ জন।",
                },
                {
                  year: "২০২০",
                  title: "সম্প্রসারণ",
                  desc: "সদস্য সংখ্যা বৃদ্ধি পেয়ে ২৫ জনে উন্নীত হয়। মাসিক চাঁদা নির্ধারণ ও ৯০/১০ নীতি প্রণয়ন করা হয়।",
                },
                {
                  year: "২০২২",
                  title: "প্রথম বিনিয়োগ",
                  desc: "ব্যাংক এফডিআর ও স্থানীয় ব্যবসায় বিনিয়োগ শুরু। উন্নয়ন তহবিল থেকে প্রথম সামাজিক সেবা প্রদান।",
                },
                {
                  year: "২০২৪",
                  title: "আজকের অবস্থান",
                  desc: `${DASHBOARD_SUMMARY.totalMembers} জন সক্রিয় সদস্য, ${formatCurrency(DASHBOARD_SUMMARY.currentBalance)} বর্তমান ব্যালেন্স এবং একাধিক সফল সামাজিক কর্মসূচি।`,
                },
              ].map(({ year, title, desc }) => (
                <div key={year} className="relative">
                  <div className="absolute -left-[2.6rem] top-1 h-5 w-5 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                        {year}
                      </span>
                      <h3 className="font-bold text-sm text-foreground">{title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="মোট সদস্য"
              value={`${DASHBOARD_SUMMARY.totalMembers} জন`}
              icon={Users}
              variant="default"
            />
            <StatCard
              title="প্রতিষ্ঠার বছর"
              value={ORG.foundedYear}
              icon={CalendarDays}
              variant="default"
            />
            <StatCard
              title="মাসিক চাঁদা"
              value={FINANCE.MONTHLY_CONTRIBUTION_AMOUNT}
              isCurrency
              icon={Shield}
              variant="default"
            />
            <StatCard
              title="সদস্যদের সঞ্চয়"
              value={DASHBOARD_SUMMARY.totalSavings}
              isCurrency
              icon={Heart}
              variant="success"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="আমাদের মূল্যবোধ"
            subtitle="যে নীতির উপর আমরা প্রতিষ্ঠিত"
            className="text-center mb-10"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-6 text-center hover:shadow-md transition-all"
              >
                <div
                  className={cn(
                    "mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl",
                    bg
                  )}
                >
                  <Icon className={cn("h-6 w-6", color)} />
                </div>
                <h3 className="font-bold text-sm text-foreground mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Committee */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="নেতৃত্ব কমিটি"
            subtitle="আমাদের নির্বাচিত প্রতিনিধিবৃন্দ"
            className="text-center mb-10"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {committee.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-extrabold text-lg shrink-0">
                  {member.fullNameBn.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">
                    {member.fullNameBn}
                  </p>
                  <p className="text-xs text-muted-foreground">{member.fullName}</p>
                  <span className="mt-1 inline-block rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                    {ROLE_LABELS[member.role] ?? member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact info strip */}
      <section className="py-10 bg-primary/5 border-y border-primary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{ORG.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <a href={`tel:${ORG.phone}`} className="hover:text-foreground transition-colors">
                {ORG.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <a href={`mailto:${ORG.email}`} className="hover:text-foreground transition-colors">
                {ORG.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
