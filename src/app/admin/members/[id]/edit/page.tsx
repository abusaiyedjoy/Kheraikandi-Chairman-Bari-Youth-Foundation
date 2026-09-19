"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  User,
  ArrowLeft,
  Save,
  CheckCircle2,
  Camera,
  Phone,
  Mail,
  MapPin,
  Lock,
  Shield,
  AlertTriangle,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Button } from "@/components/ui/button";
import { MEMBERS } from "@/data/members";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Member } from "@/types/member";

const editMemberSchema = z.object({
  fullNameBn: z.string().min(2, "বাংলায় নাম কমপক্ষে ২ অক্ষরের হতে হবে"),
  fullName: z.string().min(2, "ইংরেজি নাম আবশ্যক"),
  phone: z
    .string()
    .regex(/^(?:\+?8801|01)[3-9]\d{8}$/, "সঠিক বাংলাদেশী মোবাইল নম্বর লিখুন (যেমন: 01712345678)"),
  email: z.string().email("সঠিক ইমেইল ঠিকানা দিন").optional().or(z.literal("")),
  address: z.string().min(3, "পূর্ণ ঠিকানা আবশ্যক"),
  village: z.string().min(2, "গ্রামের নাম লিখুন"),
  upazila: z.string().min(2, "উপজেলা লিখুন"),
  district: z.string().min(2, "জেলা লিখুন"),
  status: z.enum(["active", "inactive", "suspended"]),
  role: z.enum([
    "president",
    "secretary",
    "treasurer",
    "vice_president",
    "joint_secretary",
    "organizer",
    "member",
    "admin",
  ]),
  occupation: z.string().optional(),
  bloodGroup: z.string().optional(),
  profilePhoto: z.string().optional(),
});

type EditMemberFormValues = z.infer<typeof editMemberSchema>;

interface EditMemberPageProps {
  params: Promise<{ id: string }>;
}

export default function EditMemberPage({ params }: EditMemberPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const rawId = resolvedParams.id;

  const member: Member =
    MEMBERS.find(
      (m) =>
        m.id.toLowerCase() === rawId.toLowerCase() ||
        m.memberId.toLowerCase() === rawId.toLowerCase()
    ) || MEMBERS[0];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(member.profilePhoto || null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditMemberFormValues>({
    resolver: zodResolver(editMemberSchema) as any,
    defaultValues: {
      fullNameBn: member.fullNameBn,
      fullName: member.fullName,
      phone: member.phone,
      email: member.email || "",
      address: member.address,
      village: member.village || "খিরাইকান্দি",
      upazila: member.upazila || "ভৈরব",
      district: member.district || "কিশোরগঞ্জ",
      status: member.status,
      role: member.role,
      occupation: member.occupation || "ব্যবসায়ী",
      bloodGroup: member.bloodGroup || "B+",
      profilePhoto: member.profilePhoto || "",
    },
  });

  const onSubmit = async (data: EditMemberFormValues) => {
    setIsSubmitting(true);
    // Simulate updating
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsSubmitting(false);
    setSuccessToast(true);

    setTimeout(() => {
      router.push(`/admin/members/${member.id}`);
    }, 1200);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedPhoto(url);
      setValue("profilePhoto", url);
    }
  };

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "অ্যাডমিন", href: "/admin/dashboard" },
        { label: "সকল সদস্য", href: "/admin/members" },
        { label: member.fullNameBn, href: `/admin/members/${member.id}` },
        { label: "সম্পাদনা" },
      ]}
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1000px] w-full mx-auto">
        
        {/* Success Toast */}
        {successToast && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-900 shadow-2xl dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100 animate-fade-in">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
            <div>
              <p>সদস্য তথ্য সফলভাবে হালনাগাদ করা হয়েছে!</p>
              <p className="text-xs font-normal text-emerald-700 dark:text-emerald-300">
                সদস্য প্রোফাইলে রিডাইরেক্ট করা হচ্ছে...
              </p>
            </div>
          </div>
        )}

        {/* ─── Header ────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/admin/members/${member.id}`}
              className="rounded-xl p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-foreground">
                সদস্য তথ্য সম্পাদনা (Edit Member)
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                সদস্য আইডি: <span className="font-mono font-bold text-foreground">{member.memberId}</span> • {member.fullNameBn}
              </p>
            </div>
          </div>

          <Link href={`/admin/members/${member.id}`}>
            <Button variant="outline" size="sm" className="text-xs">
              বাতিল
            </Button>
          </Link>
        </div>

        {/* ─── PROTECTED FINANCIAL BALANCES (READ-ONLY) ──────── */}
        <div className="rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 p-5 shadow-xs text-left">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-200 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
              <Lock className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                সংরক্ষিত আর্থিক স্থিতি (Financial Balances Protected)
              </h3>
              <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-0.5 leading-relaxed">
                ভুলবশত আর্থিক গরমিল রোধে ব্যালেন্স সরাসরি এডিটযোগ্য নয়। সঞ্চয় বা তহবিলের টাকা শুধুমাত্র অনুমোদিত চাঁদা আদায় এবং রিফান্ড লেনদেনের মাধ্যমেই পরিবর্তন করা সম্ভব।
              </p>

              {/* Read-Only Balance Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <div className="rounded-xl bg-card border border-border p-3">
                  <span className="text-[10px] text-muted-foreground block font-medium">মোট পরিশোধিত চাঁদা</span>
                  <span className="text-sm font-extrabold text-foreground">
                    {formatCurrency(member.totalContributions ?? 6000)}
                  </span>
                </div>
                <div className="rounded-xl bg-card border border-border p-3">
                  <span className="text-[10px] text-muted-foreground block font-medium">ব্যক্তিগত সঞ্চয় (৯০%)</span>
                  <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400">
                    {formatCurrency(member.totalSavings ?? 5400)}
                  </span>
                </div>
                <div className="rounded-xl bg-card border border-border p-3">
                  <span className="text-[10px] text-muted-foreground block font-medium">উন্নয়ন তহবিল (১০%)</span>
                  <span className="text-sm font-extrabold text-blue-700 dark:text-blue-400">
                    {formatCurrency(member.totalDevelopmentFund ?? 600)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Edit Form ─────────────────────────────────────── */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
          
          {/* Profile Photo Upload */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <Camera className="h-4 w-4 text-primary" />
              প্রোফাইল ছবি পরিবর্তন
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-muted border-2 border-dashed border-border overflow-hidden text-muted-foreground shadow-xs">
                  {selectedPhoto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selectedPhoto}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-primary">
                      {member.fullNameBn.charAt(0)}
                    </span>
                  )}
                </div>
                <label
                  htmlFor="avatar-edit"
                  className="absolute -bottom-2 -right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-md hover:bg-primary/90 transition-colors"
                  title="ছবি পরিবর্তন"
                >
                  <Camera className="h-4 w-4" />
                </label>
                <input
                  id="avatar-edit"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>

              <div className="space-y-1 text-center sm:text-left">
                <p className="text-xs font-semibold text-foreground">
                  সদস্যের ছবি পরিবর্তন করতে ক্যামেরা আইকনে ক্লিক করুন
                </p>
                <p className="text-[11px] text-muted-foreground">
                  ছবি অপসারণ করতে চাইলে ফাঁকা রাখুন।
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Basic Information */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <div className="border-b border-border/70 pb-3">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                মৌলিক তথ্য (Basic Information)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name Bengali */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  বাংলায় নাম <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("fullNameBn")}
                  className={cn(
                    "w-full rounded-xl border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30",
                    errors.fullNameBn ? "border-rose-500 ring-1 ring-rose-500" : "border-border"
                  )}
                />
                {errors.fullNameBn && (
                  <p className="text-[11px] text-rose-500 font-medium">{errors.fullNameBn.message}</p>
                )}
              </div>

              {/* Full Name English */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  ইংরেজি নাম (Full Name) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("fullName")}
                  className={cn(
                    "w-full rounded-xl border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30",
                    errors.fullName ? "border-rose-500 ring-1 ring-rose-500" : "border-border"
                  )}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-500 font-medium">{errors.fullName.message}</p>
                )}
              </div>

              {/* Occupation */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">পেশা</label>
                <input
                  type="text"
                  {...register("occupation")}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Blood Group */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">রক্তের গ্রুপ</label>
                <select
                  {...register("bloodGroup")}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="A+">A+ (এ পজিটিভ)</option>
                  <option value="A-">A- (এ নেগেটিভ)</option>
                  <option value="B+">B+ (বি পজিটিভ)</option>
                  <option value="B-">B- (বি নেগেটিভ)</option>
                  <option value="O+">O+ (ও পজিটিভ)</option>
                  <option value="O-">O- (ও নেগেটিভ)</option>
                  <option value="AB+">AB+ (এবি পজিটিভ)</option>
                  <option value="AB-">AB- (এবি নেগেটিভ)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Address */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <div className="border-b border-border/70 pb-3">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                যোগাযোগ ও ঠিকানা (Contact & Address)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  মোবাইল নম্বর <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className={cn(
                    "w-full rounded-xl border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30",
                    errors.phone ? "border-rose-500 ring-1 ring-rose-500" : "border-border"
                  )}
                />
                {errors.phone && (
                  <p className="text-[11px] text-rose-500 font-medium">{errors.phone.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">ইমেইল (Email)</label>
                <input
                  type="email"
                  {...register("email")}
                  className={cn(
                    "w-full rounded-xl border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30",
                    errors.email ? "border-rose-500 ring-1 ring-rose-500" : "border-border"
                  )}
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-500 font-medium">{errors.email.message}</p>
                )}
              </div>

              {/* Village */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">গ্রাম</label>
                <input
                  type="text"
                  {...register("village")}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Upazila */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">উপজেলা</label>
                <input
                  type="text"
                  {...register("upazila")}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Full Address */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  পূর্ণ ঠিকানা <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("address")}
                  className={cn(
                    "w-full rounded-xl border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30",
                    errors.address ? "border-rose-500 ring-1 ring-rose-500" : "border-border"
                  )}
                />
                {errors.address && (
                  <p className="text-[11px] text-rose-500 font-medium">{errors.address.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Status & Role */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <div className="border-b border-border/70 pb-3">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                সদস্যপদ স্ট্যাটাস ও পদবী (Status & Role)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  সদস্যপদ অবস্থা (Status) <span className="text-rose-500">*</span>
                </label>
                <select
                  {...register("status")}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="active">সক্রিয় (Active)</option>
                  <option value="inactive">নিষ্ক্রিয় (Inactive)</option>
                  <option value="suspended">স্থগিত (Suspended)</option>
                </select>
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  সংগঠনে পদবী (Role) <span className="text-rose-500">*</span>
                </label>
                <select
                  {...register("role")}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="member">সাধারণ সদস্য</option>
                  <option value="organizer">সংগঠক</option>
                  <option value="joint_secretary">যুগ্ম সম্পাদক</option>
                  <option value="treasurer">কোষাধ্যক্ষ</option>
                  <option value="secretary">সাধারণ সম্পাদক</option>
                  <option value="vice_president">সহ-সভাপতি</option>
                  <option value="president">সভাপতি</option>
                </select>
              </div>
            </div>
          </div>

          {/* ─── Submit Actions ────────────────────────────────── */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link href={`/admin/members/${member.id}`}>
              <Button type="button" variant="outline" size="sm">
                বাতিল
              </Button>
            </Link>
            <Button
              type="submit"
              size="sm"
              isLoading={isSubmitting}
              leftIcon={<Save className="h-4 w-4" />}
              className="font-bold px-6"
            >
              পরিবর্তন সংরক্ষণ করুন
            </Button>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
}
