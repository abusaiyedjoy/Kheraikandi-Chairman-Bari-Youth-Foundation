"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  PiggyBank,
  Heart,
  TrendingUp,
  Shield,
  Star,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  Bell,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActivityCard } from "@/components/shared/ActivityCard";
import { NoticeCard } from "@/components/shared/NoticeCard";
import { StatCard } from "@/components/shared/StatCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ACTIVITIES } from "@/data/activities";
import { NOTICES } from "@/data/notices";
import { DASHBOARD_SUMMARY } from "@/data/dashboard";
import { ORG, FINANCE } from "@/lib/constants";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// ─── Hero Section ──────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0B1F0D] via-[#0f2b10] to-[#16401a] py-24 sm:py-32">
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute -top-40 -right-32 h-[600px] w-[600px] rounded-full bg-emerald-800/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-[400px] w-[400px] rounded-full bg-emerald-600/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-amber-500/5 blur-2xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-900/40 px-4 py-1.5 text-xs font-semibold text-emerald-300 mb-6 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>প্রতিষ্ঠা {ORG.foundedYear} • স্বচ্ছ আর্থিক ব্যবস্থাপনা</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
              {ORG.nameBn}
            </h1>
            <p className="mt-3 text-lg font-medium text-emerald-300/90 italic">
              &ldquo;{ORG.tagline}&rdquo;
            </p>
            <p className="mt-5 text-sm sm:text-base text-emerald-100/70 leading-relaxed max-w-lg mx-auto lg:mx-0">
              খিরাইকান্দি গ্রামের যুব সমাজের ঐক্য, নৈতিক মূল্যবোধ ও আর্থিক স্বচ্ছতার ভিত্তিতে
              পরিচালিত একটি কল্যাণমূলক সামাজিক প্রতিষ্ঠান। প্রতিটি চাঁদার ৯০% আপনার নিজের সঞ্চয়।
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="/about">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-900/40 font-bold w-full sm:w-auto"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  আমাদের সম্পর্কে জানুন
                </Button>
              </Link>
              <Link href="/financial-transparency">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-500/40 text-emerald-200 hover:bg-emerald-900/40 w-full sm:w-auto"
                  leftIcon={<Shield className="h-4 w-4 text-emerald-400" />}
                >
                  আর্থিক স্বচ্ছতা দেখুন
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: "মোট সদস্য",
                value: `${DASHBOARD_SUMMARY.totalMembers} জন`,
                icon: Users,
                color: "text-emerald-400",
              },
              {
                label: "মোট সঞ্চয়",
                value: formatCurrency(DASHBOARD_SUMMARY.totalSavings),
                icon: PiggyBank,
                color: "text-amber-400",
              },
              {
                label: "উন্নয়ন তহবিল",
                value: formatCurrency(DASHBOARD_SUMMARY.totalDevelopmentFund),
                icon: Heart,
                color: "text-rose-400",
              },
              {
                label: "বর্তমান ব্যালেন্স",
                value: formatCurrency(DASHBOARD_SUMMARY.currentBalance),
                icon: TrendingUp,
                color: "text-sky-400",
              },
            ].map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 hover:bg-white/10 transition-colors"
              >
                <Icon className={cn("h-6 w-6 mb-3", color)} />
                <p className="text-xs text-emerald-300/70 font-medium">{label}</p>
                <p className="mt-1 text-xl font-extrabold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 90/10 Savings Rule Section ─────────────────────────────────
function SavingsRuleSection() {
  return (
    <section id="savings-rule" className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="সঞ্চয় নীতি (৯০/১০)"
          subtitle="প্রতিটি ১০০ টাকার স্বচ্ছ বিভাজন"
          className="text-center mb-12"
        />

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Visual breakdown */}
          <div className="md:col-span-1 flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="relative h-36 w-36">
              {/* Donut-style visual */}
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#DDE5DC"
                  strokeWidth="16"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#166534"
                  strokeWidth="16"
                  strokeDasharray={`${0.9 * 251.2} ${0.1 * 251.2}`}
                  strokeLinecap="round"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#D4A72C"
                  strokeWidth="16"
                  strokeDasharray={`${0.1 * 251.2} ${0.9 * 251.2}`}
                  strokeDashoffset={`-${0.9 * 251.2}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-foreground">৳100</span>
                <span className="text-xs text-muted-foreground">চাঁদা</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-center text-muted-foreground">
              মাসিক চাঁদা: <span className="font-bold text-foreground">{FINANCE.CURRENCY_SYMBOL}{FINANCE.MONTHLY_CONTRIBUTION_AMOUNT}</span>
            </p>
          </div>

          {/* Breakdown cards */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-primary" />
                  <span className="font-bold text-foreground text-sm">ব্যক্তিগত সঞ্চয় আমানত</span>
                </div>
                <span className="text-2xl font-extrabold text-primary">৯০%</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                প্রতিটি চাঁদার ৯০ টাকা আপনার নিজের নামে সঞ্চয় হিসেবে সংরক্ষিত থাকে।
                প্রয়োজনে উত্তোলনযোগ্য।
              </p>
              <div className="mt-3 h-2 rounded-full bg-emerald-100 dark:bg-emerald-900/50 overflow-hidden">
                <div className="h-full w-[90%] rounded-full bg-primary transition-all" />
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-accent" />
                  <span className="font-bold text-foreground text-sm">গ্রামীণ উন্নয়ন তহবিল</span>
                </div>
                <span className="text-2xl font-extrabold text-accent">১০%</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                প্রতিটি চাঁদার ১০ টাকা সামাজিক সেবা ও গ্রামীণ উন্নয়নে ব্যবহৃত হয়।
                স্বাস্থ্য, শিক্ষা, দুর্যোগ ত্রাণে।
              </p>
              <div className="mt-3 h-2 rounded-full bg-amber-100 dark:bg-amber-900/50 overflow-hidden">
                <div className="h-full w-[10%] rounded-full bg-accent transition-all" />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 px-5 py-3 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">আর্থিক স্বচ্ছতার অঙ্গীকার:</span>{" "}
                প্রতিটি লেনদেন রেকর্ড করা হয় এবং সদস্যরা যেকোনো সময় তাদের হিসাব দেখতে পারবেন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Bar ─────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { label: "সক্রিয় সদস্য", value: DASHBOARD_SUMMARY.activeMembers, suffix: "জন", icon: Users },
    { label: "মোট সঞ্চয়", value: DASHBOARD_SUMMARY.totalSavings, prefix: "৳", suffix: "", icon: PiggyBank, isAmount: true },
    { label: "সামাজিক বিনিয়োগ", value: DASHBOARD_SUMMARY.totalDevelopmentFund, prefix: "৳", suffix: "", icon: Heart, isAmount: true },
    { label: "বিনিয়োগ তহবিল", value: DASHBOARD_SUMMARY.totalInvestments, prefix: "৳", suffix: "", icon: TrendingUp, isAmount: true },
  ];

  return (
    <section className="bg-primary/5 border-y border-primary/10 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ label, value, prefix, suffix, icon: Icon, isAmount }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-2">
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-foreground">
                {prefix}
                {isAmount
                  ? Number(value).toLocaleString("bn-BD")
                  : value}
                {suffix}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Activities Section ─────────────────────────────────────────
function ActivitiesSection() {
  const router = useRouter();
  const featured = ACTIVITIES.filter((a) => a.status === "completed").slice(0, 3);

  return (
    <section id="activities" className="py-16 sm:py-24 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionHeader
            title="সামাজিক সেবা কার্যক্রম"
            subtitle="আমাদের সম্প্রদায়ের জন্য আমাদের কার্যক্রম"
          />
          <Link href="/activities">
            <Button
              variant="outline"
              size="sm"
              rightIcon={<ChevronRight className="h-4 w-4" />}
              className="shrink-0"
            >
              সব কার্যক্রম
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onViewDetails={() => router.push(`/activities/${activity.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Notices Section ────────────────────────────────────────────
function NoticesSection() {
  const router = useRouter();
  const recent = [...NOTICES]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 3);

  return (
    <section id="notices" className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionHeader
            title="সাম্প্রতিক নোটিশ"
            subtitle="গুরুত্বপূর্ণ ঘোষণা ও তথ্যাবলী"
          />
          <Link href="/notices">
            <Button
              variant="outline"
              size="sm"
              rightIcon={<ChevronRight className="h-4 w-4" />}
              className="shrink-0"
            >
              সব নোটিশ
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              onReadMore={() => router.push(`/notices/${notice.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Join Section ───────────────────────────────────────────
function WhyJoinSection() {
  const reasons = [
    {
      icon: Shield,
      title: "সম্পূর্ণ স্বচ্ছতা",
      desc: "প্রতিটি লেনদেন রেকর্ড করা হয়। সদস্যরা যেকোনো সময় নিজের হিসাব পরীক্ষা করতে পারেন।",
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      icon: PiggyBank,
      title: "নিরাপদ সঞ্চয়",
      desc: "চাঁদার ৯০% আপনার নামে সংরক্ষিত। প্রয়োজনে উত্তোলন করা যায়।",
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      icon: Heart,
      title: "সামাজিক দায়বদ্ধতা",
      desc: "প্রতিটি চাঁদার ১০% গ্রামের মানুষের কল্যাণে ব্যয় হয়। একতায় শক্তি।",
      color: "text-rose-600",
      bg: "bg-rose-50 dark:bg-rose-950/30",
    },
    {
      icon: Star,
      title: "সম্প্রদায়ের অন্তর্ভুক্তি",
      desc: "স্বাস্থ্য শিবির, বৃক্ষরোপণ, রক্তদান — একসাথে কাজ করার আনন্দ।",
      color: "text-sky-600",
      bg: "bg-sky-50 dark:bg-sky-950/30",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-muted/10 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="কেন আমাদের সাথে যুক্ত হবেন?"
          subtitle="আমাদের প্রতিশ্রুতি ও বিশেষত্ব"
          className="text-center mb-12"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map(({ icon: Icon, title, desc, color, bg }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 hover:shadow-md transition-all hover:-translate-y-1 duration-200"
            >
              <div className={cn("mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl", bg)}>
                <Icon className={cn("h-5 w-5", color)} />
              </div>
              <h3 className="font-bold text-sm text-foreground mb-2">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact CTA Section ────────────────────────────────────────
function ContactCTA() {
  return (
    <section className="py-16 sm:py-24 bg-primary text-white relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold text-emerald-200 mb-5">
          <MapPin className="h-3.5 w-3.5" /> {ORG.address}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
          আমাদের সাথে যোগ দিন
        </h2>
        <p className="text-emerald-100/80 text-sm leading-relaxed max-w-2xl mx-auto mb-8">
          খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ সমিতির সদস্য হয়ে আপনার সঞ্চয় নিশ্চিত করুন
          এবং গ্রামের উন্নয়নে অবদান রাখুন।
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-emerald-50 font-bold shadow-lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              যোগাযোগ করুন
            </Button>
          </Link>
          <a href={`tel:${ORG.phone}`}>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10"
              leftIcon={<Phone className="h-4 w-4" />}
            >
              {ORG.phone}
            </Button>
          </a>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-emerald-200/70">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>{ORG.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>{ORG.email}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page Entry ────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <SavingsRuleSection />
      <ActivitiesSection />
      <NoticesSection />
      <WhyJoinSection />
      <ContactCTA />
    </>
  );
}
