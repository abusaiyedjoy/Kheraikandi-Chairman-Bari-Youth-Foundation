"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  SiteNavbar,
  SiteFooter,
  MobileNavigation,
  AdminSidebar,
  AdminHeader,
  MemberSidebar,
  MemberHeader,
  PageHeader,
  SectionHeader,
  StatCard,
  FinancialStatCard,
  StatusBadge,
  CurrencyDisplay,
  EmptyState,
  ErrorState,
  LoadingSkeleton,
  SearchInput,
  FilterBar,
  DataTable,
  MobileDataCard,
  Pagination,
  ConfirmDialog,
  FormModal,
  DateRangePicker,
  UserAvatar,
  Breadcrumb,
  ChartCard,
  ActivityCard,
  NoticeCard,
  TransactionCard,
  ContributionCard,
  ExpenseCard,
  MemberCard,
  SavingsSummary,
  FinancialBreakdown,
  QuickActionCard,
} from "@/components/shared";
import {
  FinancialSummary,
  FundBalanceCard,
  SavingsCard,
  DevelopmentFundCard,
  TransactionAmount,
} from "@/components/financial";
import {
  FormInput,
  FormSelect,
  FormTextarea,
  FormDatePicker,
  FormFileUpload,
  FormCurrencyInput,
  FormCheckbox,
} from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ORG, FINANCE } from "@/lib/constants";
import { MEMBERS } from "@/data/members";
import { CONTRIBUTIONS } from "@/data/contributions";
import { ACTIVITIES } from "@/data/activities";
import { NOTICES } from "@/data/notices";
import type { Contribution } from "@/types/finance";
import {
  Sparkles,
  Layers,
  CheckCircle2,
  Users,
  Wallet,
  Building2,
  PiggyBank,
  Heart,
  PlusCircle,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  Send,
  Eye,
  Settings,
} from "lucide-react";

// ─── Zod Schema for Live Form System Demo ───────────────────────
const contributionFormSchema = z.object({
  memberName: z
    .string()
    .min(3, "সদস্যের নাম কমপক্ষে ৩ অক্ষরের হতে হবে"),
  memberRole: z.string().min(1, "সদস্যের পদবী নির্বাচন করুন"),
  amount: z
    .number()
    .min(100, "চাঁদার পরিমাণ কমপক্ষে ৳১০০ হতে হবে")
    .max(50000, "সর্বোচ্চ চাঁদা ৳৫০,০০০ পর্যন্ত"),
  paymentDate: z.string().min(1, "পরিশোধের তারিখ আবশ্যক"),
  remarks: z.string().optional(),
  agreePolicy: z.boolean().refine((val) => val === true, {
    message: "৯০% সঞ্চয় ও ১০% উন্নয়ন তহবিল নীতি মেনে নেওয়া আবশ্যক",
  }),
});

type ContributionFormValues = z.infer<typeof contributionFormSchema>;

export default function DesignSystemShowcasePage() {
  // ─── Financial Breakdown Interactive State ────────────────────
  const [demoAmount, setDemoAmount] = useState<number>(100);

  // ─── Dialogs and Modals Demo State ───────────────────────────
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [modalSuccessMsg, setModalSuccessMsg] = useState("");

  // ─── Live Form State (React Hook Form + Zod) ──────────────────
  const [formSubmittedData, setFormSubmittedData] =
    useState<ContributionFormValues | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContributionFormValues>({
    resolver: zodResolver(contributionFormSchema),
    defaultValues: {
      memberName: "মো. নাজমুল হক",
      memberRole: "member",
      amount: 100,
      paymentDate: new Date().toISOString().split("T")[0],
      remarks: "নিয়মিত মাসিক চাঁদা",
      agreePolicy: true,
    },
  });

  const onFormSubmit = async (data: ContributionFormValues) => {
    setIsSubmittingForm(true);
    // Simulate network API request
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmittingForm(false);
    setFormSubmittedData(data);
  };

  // ─── Mock Table Data Setup ────────────────────────────────────
  const sampleContributions = CONTRIBUTIONS.slice(0, 15);
  const sampleMember = MEMBERS[0];
  const sampleActivity = ACTIVITIES[0];
  const sampleNotice = NOTICES[0];

  const tableColumns = [
    {
      header: "সদস্যের নাম ও আইডি",
      accessorKey: "memberName" as const,
      sortable: true,
      cell: (row: Contribution) => (
        <div>
          <span className="font-bold text-foreground">{row.memberName}</span>
          <span className="block text-[11px] text-muted-foreground font-mono">
            {row.memberId}
          </span>
        </div>
      ),
    },
    {
      header: "মাস ও সাল",
      accessorKey: "month" as const,
      sortable: true,
      cell: (row: Contribution) => (
        <span className="font-medium text-foreground">
          {row.month}/{row.year}
        </span>
      ),
    },
    {
      header: "মোট চাঁদা",
      accessorKey: "amount" as const,
      sortable: true,
      cell: (row: Contribution) => (
        <CurrencyDisplay amount={row.amount} size="sm" className="font-bold" />
      ),
    },
    {
      header: "৯০% সঞ্চয়",
      accessorKey: "savingsAmount" as const,
      cell: (row: Contribution) => (
        <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
          <CurrencyDisplay amount={row.savingsAmount} size="sm" />
        </span>
      ),
    },
    {
      header: "১০% উন্নয়ন",
      accessorKey: "developmentAmount" as const,
      cell: (row: Contribution) => (
        <span className="text-amber-700 dark:text-amber-400 font-semibold">
          <CurrencyDisplay amount={row.developmentAmount} size="sm" />
        </span>
      ),
    },
    {
      header: "অবস্থা (Status)",
      accessorKey: "status" as const,
      cell: (row: Contribution) => (
        <StatusBadge status={row.status} domain="contribution" />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-emerald-600 selection:text-white pb-20 md:pb-0">
      {/* ─── 1. SiteNavbar ─────────────────────────────────────── */}
      <SiteNavbar currentPath="/" />

      {/* ─── Hero Brand Header ─────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border/80 bg-gradient-to-b from-emerald-50/60 via-background to-background dark:from-emerald-950/20 dark:via-background dark:to-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 dark:border-emerald-800 bg-emerald-100/80 dark:bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-900 dark:text-emerald-300">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>কম্পোনেন্ট লাইব্রেরি ও ডিজাইন সিস্টেম</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
                {ORG.nameBn}
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                আধুনিক, স্বচ্ছ ও সম্প্রদায়-কেন্দ্রিক আর্থিক ব্যবস্থাপনা প্ল্যাটফর্ম।
                নিয়মিত চাঁদা, ৯০/১০ সঞ্চয় নিয়ম, সমাজকল্যাণ এবং অডিট নিরাপত্তা সমন্বিত একক পূর্ণাঙ্গ সিস্টেম।
              </p>

              {/* Brand Color Swatches */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs shadow-xs">
                  <span className="h-3.5 w-3.5 rounded-full bg-[#166534] shadow-xs" />
                  <span className="font-semibold">Primary: #166534</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs shadow-xs">
                  <span className="h-3.5 w-3.5 rounded-full bg-[#22C55E] shadow-xs" />
                  <span className="font-semibold">Secondary: #22C55E</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs shadow-xs">
                  <span className="h-3.5 w-3.5 rounded-full bg-[#D4A72C] shadow-xs" />
                  <span className="font-semibold">Accent: #D4A72C</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs shadow-xs">
                  <span className="h-3.5 w-3.5 rounded-full bg-[#F8FAF7] border border-border" />
                  <span className="font-semibold">Background: #F8FAF7</span>
                </div>
              </div>
            </div>

            {/* Quick Organization Summary Card */}
            <div className="w-full lg:w-96 rounded-2xl border border-emerald-300/80 dark:border-emerald-800 bg-card p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  সংগঠন রূপরেখা
                </span>
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  প্রতিষ্ঠা: ২০১৯
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">মূল নীতি:</span>
                  <strong className="text-foreground">{ORG.tagline}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">অবস্থান:</span>
                  <span className="text-foreground text-right">{ORG.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">মাসিক সাধারণ চাঁদা:</span>
                  <strong className="text-emerald-700 dark:text-emerald-400">৳১০০.০০</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">বণ্টন পদ্ধতি:</span>
                  <strong className="text-foreground">৯০% সঞ্চয় + ১০% উন্নয়ন</strong>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <Button
                  size="sm"
                  onClick={() => setConfirmOpen(true)}
                  className="flex-1 text-xs"
                >
                  কনফার্ম ডায়ালগ টেস্ট
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setFormModalOpen(true)}
                  className="flex-1 text-xs"
                >
                  মডেল ফর্ম টেস্ট
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Showcase Body */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* ─── SECTION 1: Financial Architecture & Components ────────── */}
        <section id="savings-rule" className="space-y-6">
          <SectionHeader
            categoryPill="আর্থিক মডিউল"
            title="আর্থিক উপাদান ও ৯০/১০ সঞ্চয় কাঠামো"
            subtitle="সংগঠনের সংবিধান অনুযায়ী প্রতি সদস্যের মাসিক চাঁদার ৯০% ব্যক্তিগত অ্যাকাউন্টে জমা থাকে এবং ১০% গ্রামীণ সামাজিক উন্নয়ন তহবিলে ব্যয় হয়।"
          />

          {/* High-Level Organization Financial Summary */}
          <FinancialSummary
            totalContributions={264000}
            totalSavings={237600}
            totalDevelopmentFund={26400}
            totalExpenses={14500}
            currentBalance={249500}
          />

          {/* Three Key Financial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <FundBalanceCard
              balance={249500}
              monthlyInflow={25000}
              monthlyOutflow={3200}
              onDepositClick={() => setFormModalOpen(true)}
            />

            <SavingsCard
              savingsAmount={5940}
              monthsContributed={66}
              lastPaymentDate="০৫ সেপ্টেম্বর ২০২৪"
              memberId="KYK-001"
            />

            <DevelopmentFundCard
              totalCollected={26400}
              totalSpent={14500}
              currentBalance={11900}
              projectsCount={6}
            />
          </div>

          {/* Special Visual Tree: FinancialBreakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-4">
            <div className="lg:col-span-8">
              <FinancialBreakdown
                totalAmount={demoAmount}
                variant="card"
                showProgress={true}
              />
            </div>

            {/* Interactive Amount Tester */}
            <div className="lg:col-span-4 rounded-2xl border border-border bg-card p-5 space-y-4">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <PiggyBank className="h-4 w-4 text-emerald-600" />
                <span>বণ্টন ক্যালকুলেটর টেস্ট</span>
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                যেকোনো চাঁদার পরিমাণ লিখে দেখুন স্বয়ংক্রিয়ভাবে ৯০% ও ১০% ভাগ কেমন দেখায়:
              </p>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">
                  চাঁদার পরিমাণ (BDT):
                </label>
                <div className="flex gap-2">
                  {[100, 200, 500, 1000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setDemoAmount(preset)}
                      className={`flex-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                        demoAmount === preset
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      ৳{preset}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="10"
                  step="10"
                  value={demoAmount}
                  onChange={(e) => setDemoAmount(Number(e.target.value) || 0)}
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm font-bold tabular-nums text-foreground mt-2"
                />
              </div>

              <div className="rounded-xl bg-muted/40 p-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ব্যক্তিগত সঞ্চয় (৯০%):</span>
                  <strong className="text-emerald-700 dark:text-emerald-400">
                    ৳{(demoAmount * 0.9).toFixed(2)}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">উন্নয়ন তহবিল (১০%):</span>
                  <strong className="text-amber-700 dark:text-amber-400">
                    ৳{(demoAmount * 0.1).toFixed(2)}
                  </strong>
                </div>
              </div>

              <div className="pt-1 flex flex-wrap gap-2">
                <span className="text-xs text-muted-foreground">ট্রানজ্যাকশন ব্যাজ:</span>
                <TransactionAmount amount={demoAmount * 0.9} type="income" variant="badge" size="sm" />
                <TransactionAmount amount={demoAmount * 0.1} type="income" variant="badge" size="sm" />
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Reusable Table System ──────────────────────── */}
        <section id="transparency" className="space-y-6">
          <SectionHeader
            categoryPill="টেবিল সিস্টেম"
            title="রেসপন্সিভ ডেটাটেবিল (DataTable & MobileDataCard)"
            subtitle="সার্চ, শর্টিং, পেজিনেশন এবং মোবাইল স্ক্রিনে (৩৯০px) স্বয়ংক্রিয়ভাবে কার্ড-ভিউতে রূপান্তর সুবিধা।"
          />

          <DataTable
            data={sampleContributions}
            columns={tableColumns}
            searchKey="memberName"
            searchPlaceholder="সদস্যের নাম দিয়ে খুঁজুন..."
            title="মাসিক চাঁদা আদায় রেজিস্টার"
            subtitle="খিরাইকান্দি গ্রামের সকল নিয়মিত সদস্যের চাঁদা সংগ্রহের হালনাগাদ রেকর্ড"
            pageSize={5}
            filterSlot={
              <DateRangePicker />
            }
            actionsSlot={
              <Button
                size="sm"
                onClick={() => setFormModalOpen(true)}
                leftIcon={<PlusCircle className="h-3.5 w-3.5" />}
              >
                নতুন চাঁদা যোগ
              </Button>
            }
          />
        </section>

        {/* ─── SECTION 3: Reusable Form System (React Hook Form + Zod) ── */}
        <section className="space-y-6">
          <SectionHeader
            categoryPill="ফর্ম সিস্টেম"
            title="রিয়্যাক্ট হুক ফর্ম ও জড ভ্যালিডেশন সিস্টেম"
            subtitle="ক্লিন ভ্যালিডেশন এরর, রিকয়ার্ড ফিল্ডস (*), লোডিং স্টেট ও লাইভ ৯/১ অনুপাত রূপরেখা সহ সম্পূর্ণ পুনঃব্যবহারযোগ্য ফর্ম।"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Live Form */}
            <form
              onSubmit={handleSubmit(onFormSubmit)}
              className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4"
            >
              <h3 className="text-base font-bold text-foreground">
                চাঁদা জমা রেজিস্ট্রেশন ফর্ম
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="সদস্যের নাম"
                  required
                  placeholder="যেমন: মো. রফিকুল ইসলাম"
                  error={errors.memberName?.message}
                  {...register("memberName")}
                />

                <Controller
                  name="memberRole"
                  control={control}
                  render={({ field }) => (
                    <FormSelect
                      label="সদস্য পদবী"
                      required
                      options={[
                        { value: "member", label: "সাধারণ সদস্য (Member)" },
                        { value: "president", label: "সভাপতি (President)" },
                        { value: "secretary", label: "সাধারণ সম্পাদক (Secretary)" },
                        { value: "treasurer", label: "কোষাধ্যক্ষ (Treasurer)" },
                      ]}
                      error={errors.memberRole?.message}
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <FormCurrencyInput
                      label="চাঁদার পরিমাণ (BDT)"
                      required
                      showBreakdownHint={true}
                      error={errors.amount?.message}
                      {...field}
                    />
                  )}
                />

                <FormDatePicker
                  label="পরিশোধের তারিখ"
                  required
                  error={errors.paymentDate?.message}
                  {...register("paymentDate")}
                />
              </div>

              <FormFileUpload
                label="রসিদ বা ভাউচার সংযুক্তি (ঐচ্ছিক)"
                helperText="ব্যাংক বা বিকাশ স্ক্রিনশট (সর্বোচ্চ ৫ মেগাবাইট)"
                accept=".jpg,.png,.pdf"
              />

              <FormTextarea
                label="মন্তব্য / বিবরণ"
                placeholder="প্রযোজ্য ক্ষেত্রে কোনো বিশেষ মন্তব্য থাকলে লিখুন..."
                showCharCount
                maxLength={200}
                {...register("remarks")}
              />

              <Controller
                name="agreePolicy"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FormCheckbox
                    label="আমি ৯০% সঞ্চয় ও ১০% উন্নয়ন তহবিল নীতি স্বীকার করছি"
                    description="আমার জমার ৯০% আমার নিজস্ব অ্যাকাউন্টে জমা থাকবে এবং ১০% সমাজকল্যাণে ব্যয় হবে।"
                    checked={Boolean(value)}
                    onChange={(e) => onChange(e.target.checked)}
                    error={errors.agreePolicy?.message}
                    required
                  />
                )}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  size="md"
                  isLoading={isSubmittingForm}
                  leftIcon={<Send className="h-4 w-4" />}
                  className="w-full sm:w-auto"
                >
                  চাঁদা নিশ্চিত করুন
                </Button>
              </div>
            </form>

            {/* Submission Response / Realtime Inspector */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>ফর্ম স্টেট ও ভ্যালিডেশন স্ট্যাটাস</span>
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Zod স্কিমা স্বয়ংক্রিয়ভাবে ইনপুট যাচাই করে এবং ভুল তথ্যে তাত্ক্ষণিক সতর্কবার্তা প্রদর্শন করে।
                </p>

                {formSubmittedData ? (
                  <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 p-4 space-y-2 animate-fade-in">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>সফলভাবে গৃহীত হয়েছে!</span>
                    </div>
                    <div className="text-xs space-y-1 text-muted-foreground pt-1">
                      <p>সদস্য: <strong className="text-foreground">{formSubmittedData.memberName}</strong></p>
                      <p>পরিমাণ: <strong className="text-emerald-700 dark:text-emerald-400">৳{formSubmittedData.amount}</strong></p>
                      <p>সঞ্চয় জমা: ৳{(formSubmittedData.amount * 0.9).toFixed(2)} (৯০%)</p>
                      <p>উন্নয়ন তহবিল: ৳{(formSubmittedData.amount * 0.1).toFixed(2)} (১০%)</p>
                      <p>তারিখ: {formSubmittedData.paymentDate}</p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                    ফর্ম সাবমিট করলে এখানে রিয়েলটাইম ফলাফল প্রদর্শিত হবে।
                  </div>
                )}
              </div>

              {/* Status Badges Matrix Showcase */}
              <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  স্ট্যাটাস ব্যাজ ডোমেইন (StatusBadges)
                </h4>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status="active" domain="member" />
                  <StatusBadge status="inactive" domain="member" />
                  <StatusBadge status="suspended" domain="member" />
                  <StatusBadge status="paid" domain="contribution" />
                  <StatusBadge status="pending" domain="contribution" />
                  <StatusBadge status="overdue" domain="contribution" />
                  <StatusBadge status="urgent" domain="notice" />
                  <StatusBadge status="completed" domain="activity" />
                  <StatusBadge status="admin" domain="role" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Component Gallery Showcase ─────────────────── */}
        <section id="activities" className="space-y-6">
          <SectionHeader
            categoryPill="কম্পোনেন্ট গ্যালারি"
            title="শেয়ার্ড কার্ডস ও ড্যাশবোর্ড উইজেট"
            subtitle="সদস্য ও অ্যাডমিন ড্যাশবোর্ডে ব্যবহারের উপযোগী কার্ড ও ইন্টারেক্টিভ উপাদানসমূহ।"
          />

          {/* Stat Cards & KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="মোট নিবন্ধিত সদস্য"
              value={25}
              subtitle="২৫ জন সক্রিয় যুব সদস্য"
              icon={Users}
              variant="primary"
            />
            <FinancialStatCard
              title="মোট সংগৃহীত চাঁদা"
              amount={264000}
              subtitle="প্রতিষ্ঠাকালীন থেকে সর্বমোট"
              icon={Wallet}
              variant="emerald"
              trend={{ value: 12, label: "গত মাস থেকে" }}
              breakdown={{ savingsAmount: 237600, developmentAmount: 26400 }}
            />
            <FinancialStatCard
              title="মোট সমাজকল্যাণ ব্যয়"
              amount={14500}
              subtitle="চিকিৎসা, ত্রাণ ও উন্নয়ন প্রকল্পে"
              icon={Building2}
              variant="amber"
              trend={{ value: -5, label: "নিয়ন্ত্রিত ব্যয়" }}
            />
            <SavingsSummary
              totalSavings={5940}
              monthlySavingsTarget={90}
              lastContributionDate="০৫ সেপ্টেম্বর ২০২৪"
            />
          </div>

          {/* Quick Action Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <QuickActionCard
              title="নতুন চাঁদা রেকর্ড"
              description="সদস্যের মাসিক চাঁদা গ্রহণ করুন"
              icon={Wallet}
              variant="emerald"
              shortcut="⌘N"
              onClick={() => setFormModalOpen(true)}
            />
            <QuickActionCard
              title="নতুন সদস্য নিবন্ধন"
              description="সমিতিতে নতুন সদস্য অন্তর্ভুক্ত করুন"
              icon={Users}
              shortcut="⌘M"
              onClick={() => setFormModalOpen(true)}
            />
            <QuickActionCard
              title="জরুরি নোটিশ জারি"
              description="সাধারণ সভার বিজ্ঞপ্তি পোস্ট করুন"
              icon={Sparkles}
              variant="gold"
              onClick={() => setFormModalOpen(true)}
            />
            <QuickActionCard
              title="আর্থিক অডিট রিপোর্ট"
              description="স্বচ্ছ হিসেব ও অডিট বিবরণী"
              icon={ShieldCheck}
              onClick={() => setConfirmOpen(true)}
            />
          </div>

          {/* Domain Cards Grid: MemberCard, ActivityCard, NoticeCard */}
          <div id="notices" className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <MemberCard member={sampleMember} />
            <ActivityCard activity={sampleActivity} />
            <NoticeCard notice={sampleNotice} />
          </div>
        </section>

        {/* ─── SECTION 5: Navigation & Header Previews ───────────────── */}
        <section className="space-y-6">
          <SectionHeader
            categoryPill="লেআউট ফ্রেমওয়ার্ক"
            title="পোর্টাল হেডার ও সাইডবার প্রিভিউ"
            subtitle="অ্যাডমিন ও সদস্য প্যানেলে সরাসরি ব্যবহারের জন্য প্রস্তুত উপাদান।"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Admin Header Demo Box */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="p-3 border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground flex justify-between">
                <span>অ্যাডমিন হেডার কম্পোনেন্ট (AdminHeader)</span>
                <Badge variant="gold" size="sm">Admin Role</Badge>
              </div>
              <AdminHeader
                adminName="কোষাধ্যক্ষ (Admin)"
                unreadNotifications={3}
                breadcrumbs={[
                  { label: "ড্যাশবোর্ড", href: "/admin" },
                  { label: "চাঁদা ব্যবস্থাপনা" },
                ]}
              />
            </div>

            {/* Member Header Demo Box */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="p-3 border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground flex justify-between">
                <span>সদস্য হেডার কম্পোনেন্ট (MemberHeader)</span>
                <Badge variant="success" size="sm">Member Portal</Badge>
              </div>
              <MemberHeader
                memberName="মো. রফিকুল ইসলাম"
                memberSavings={5940}
                unreadNotifications={1}
                breadcrumbs={[
                  { label: "পোর্টাল", href: "/member" },
                  { label: "আমার সঞ্চয়" },
                ]}
              />
            </div>
          </div>
        </section>
      </main>

      {/* ─── Confirm Dialog Instance ─────────────────────────────── */}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="আপনি কি নিশ্চিতভাবে এই রেকর্ড মুছতে চান?"
        description="এই কার্যক্রমটি পূর্বাবস্থায় ফিরিয়ে আনা যাবে না। অডিট সুরক্ষার জন্য মুছে ফেলার তথ্য অডিট লগে সংরক্ষিত থাকবে।"
        onConfirm={() => {
          setModalSuccessMsg("অ্যাকশনটি সফলভাবে সম্পন্ন হয়েছে!");
        }}
      />

      {/* ─── Form Modal Instance ─────────────────────────────────── */}
      <FormModal
        open={formModalOpen}
        onOpenChange={setFormModalOpen}
        title="নতুন চাঁদা জমা রেকর্ড"
        subtitle="খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ সমিতি"
        submitLabel="সংরক্ষণ করুন"
        onSubmit={() => {
          setFormModalOpen(false);
          setModalSuccessMsg("চাঁদা সফলভাবে সংরক্ষিত হয়েছে!");
        }}
      >
        <div className="space-y-3 text-left">
          <FormInput
            label="সদস্যের নাম"
            required
            defaultValue="মোহাম্মদ রফিকুল ইসলাম"
          />
          <FormCurrencyInput
            label="চাঁদার পরিমাণ (BDT)"
            required
            defaultValue="100"
            showBreakdownHint={true}
          />
          <FormDatePicker
            label="তারিখ"
            required
            defaultValue={new Date().toISOString().split("T")[0]}
          />
        </div>
      </FormModal>

      {/* ─── SiteFooter ─────────────────────────────────────────── */}
      <SiteFooter />

      {/* ─── MobileNavigation (Fixed bottom bar on small viewports) ─── */}
      <MobileNavigation currentPath="/" />
    </div>
  );
}
