"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  UserPlus,
  ArrowLeft,
  Save,
  CheckCircle2,
  Camera,
  Shield,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const addMemberSchema = z.object({
  fullNameBn: z.string().min(2, "বাংলায় নাম কমপক্ষে ২ অক্ষরের হতে হবে"),
  fullName: z.string().min(2, "ইংরেজি নাম আবশ্যক"),
  memberId: z.string().min(3, "সদস্য আইডি আবশ্যক (যেমন: KYK-026)"),
  phone: z
    .string()
    .regex(/^(?:\+?8801|01)[3-9]\d{8}$/, "সঠিক বাংলাদেশী মোবাইল নম্বর লিখুন (যেমন: 01712345678)"),
  email: z.string().email("সঠিক ইমেইল ঠিকানা দিন").optional().or(z.literal("")),
  address: z.string().min(3, "পূর্ণ ঠিকানা লিখুন"),
  village: z.string().min(2, "গ্রামের নাম লিখুন"),
  upazila: z.string().min(2, "উপজেলা লিখুন"),
  district: z.string().min(2, "জেলা লিখুন"),
  joinDate: z.string().min(1, "যোগদানের তারিখ নির্বাচন করুন"),
  status: z.enum(["active", "inactive", "suspended"]),
  role: z.enum(["president", "secretary", "treasurer", "vice_president", "joint_secretary", "organizer", "member"]),
  password: z.string().min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  nid: z.string().optional(),
  occupation: z.string().optional(),
  bloodGroup: z.string().optional(),
  profilePhoto: z.string().optional(),
});

type AddMemberFormValues = z.infer<typeof addMemberSchema>;

export default function AddMemberPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddMemberFormValues>({
    resolver: zodResolver(addMemberSchema) as any,
    defaultValues: {
      fullNameBn: "",
      fullName: "",
      memberId: "KYK-026",
      phone: "",
      email: "",
      address: "খিরাইকান্দি, ভৈরব",
      village: "খিরাইকান্দি",
      upazila: "ভৈরব",
      district: "কিশোরগঞ্জ",
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
      role: "member",
      password: "",
      fatherName: "",
      motherName: "",
      nid: "",
      occupation: "ব্যবসায়ী",
      bloodGroup: "B+",
      profilePhoto: "",
    },
  });

  const onSubmit = async (data: AddMemberFormValues) => {
    setIsSubmitting(true);
    // Simulate server saving
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setSuccessToast(true);

    setTimeout(() => {
      router.push("/admin/members");
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
        { label: "নতুন সদস্য" },
      ]}
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1000px] w-full mx-auto">
        
        {/* Floating Success Notification */}
        {successToast && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-900 shadow-2xl dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100 animate-fade-in">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
            <div>
              <p>নতুন সদস্য সফলভাবে নিবন্ধিত হয়েছে!</p>
              <p className="text-xs font-normal text-emerald-700 dark:text-emerald-300">
                সদস্য তালিকায় রিডাইরেক্ট করা হচ্ছে...
              </p>
            </div>
          </div>
        )}

        {/* ─── Header ────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/members"
              className="rounded-xl p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2">
                <UserPlus className="h-6 w-6 text-primary" />
                নতুন সদস্য নিবন্ধন
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ ফাউন্ডেশনের নতুন সদস্য ফরম পূরণ করুন
              </p>
            </div>
          </div>

          <Link href="/admin/members">
            <Button variant="outline" size="sm" className="text-xs">
              বাতিল
            </Button>
          </Link>
        </div>

        {/* ─── Form Container ────────────────────────────────── */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
          
          {/* Profile Photo & Quick Avatar Section */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <Camera className="h-4 w-4 text-primary" />
              প্রোফাইল ছবি (Profile Photo)
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
                    <User className="h-10 w-10 text-muted-foreground/50" />
                  )}
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-2 -right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-md hover:bg-primary/90 transition-colors"
                  title="ছবি আপলোড করুন"
                >
                  <Camera className="h-4 w-4" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>

              <div className="space-y-1 text-center sm:text-left">
                <p className="text-xs font-semibold text-foreground">
                  সদস্যের পাসপোর্ট সাইজের ছবি নির্বাচন করুন
                </p>
                <p className="text-[11px] text-muted-foreground">
                  JPG, PNG বা WEBP ফরম্যাট (সর্বোচ্চ ২ মেগাবাইট)। ছবি না দিলে নাম আদ্যক্ষর ব্যবহার হবে।
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Personal Information */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <div className="border-b border-border/70 pb-3">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                ব্যক্তিগত তথ্য (Personal Information)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name Bengali */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  বাংলায় পূর্ণ নাম <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="যেমন: মোহাম্মদ রফিকুল ইসলাম"
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
                  placeholder="e.g. Mohammad Rafiqul Islam"
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

              {/* Father Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">পিতার নাম</label>
                <input
                  type="text"
                  placeholder="পিতার নাম লিখুন"
                  {...register("fatherName")}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Mother Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">মাতার নাম</label>
                <input
                  type="text"
                  placeholder="মাতার নাম লিখুন"
                  {...register("motherName")}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* NID */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">জাতীয় পরিচয়পত্র / জন্ম নিবন্ধন (NID)</label>
                <input
                  type="text"
                  placeholder="১০/১৩/১৭ ডিজিটের নম্বর"
                  {...register("nid")}
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

              {/* Occupation */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">পেশা</label>
                <input
                  type="text"
                  placeholder="যেমন: ব্যবসায়ী, শিক্ষক, চাকরিজীবী"
                  {...register("occupation")}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
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
                  মোবাইল নম্বর (Phone) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="01712-345678"
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
                <label className="text-xs font-semibold text-foreground">ইমেইল (ঐচ্ছিক)</label>
                <input
                  type="email"
                  placeholder="example@mail.com"
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
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  গ্রাম <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="খিরাইকান্দি"
                  {...register("village")}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Upazila */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  উপজেলা <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="ভৈরব"
                  {...register("upazila")}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* District */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  জেলা <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="কিশোরগঞ্জ"
                  {...register("district")}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Full Address */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  পূর্ণ ঠিকানা (Address) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="চেয়ারম্যান বাড়ি, খিরাইকান্দি, ভৈরব, কিশোরগঞ্জ"
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

          {/* Section 3: Membership Details */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <div className="border-b border-border/70 pb-3">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                সদস্যপদ সংক্রান্ত তথ্য (Membership Details)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Member ID */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  সদস্য আইডি (Member ID) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="KYK-026"
                  {...register("memberId")}
                  className={cn(
                    "w-full rounded-xl border bg-background px-3.5 py-2.5 text-xs font-mono font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30",
                    errors.memberId ? "border-rose-500 ring-1 ring-rose-500" : "border-border"
                  )}
                />
                {errors.memberId && (
                  <p className="text-[11px] text-rose-500 font-medium">{errors.memberId.message}</p>
                )}
              </div>

              {/* Joining Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  যোগদানের তারিখ (Joining Date) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  {...register("joinDate")}
                  className={cn(
                    "w-full rounded-xl border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30",
                    errors.joinDate ? "border-rose-500 ring-1 ring-rose-500" : "border-border"
                  )}
                />
                {errors.joinDate && (
                  <p className="text-[11px] text-rose-500 font-medium">{errors.joinDate.message}</p>
                )}
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  পদবী (Role) <span className="text-rose-500">*</span>
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

              {/* Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  সদস্যপদ স্ট্যাটাস (Status) <span className="text-rose-500">*</span>
                </label>
                <select
                  {...register("status")}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="active">সক্রিয় (Active)</option>
                  <option value="inactive">নিষ্ক্রিয় (Inactive)</option>
                  <option value="suspended">স্থগিত (Suspended)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Login & Password */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
            <div className="border-b border-border/70 pb-3">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                নিরাপত্তা ও পাসওয়ার্ড (Security & Password)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  লগইন পাসওয়ার্ড (Password) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিন"
                    {...register("password")}
                    className={cn(
                      "w-full rounded-xl border bg-background pl-3.5 pr-10 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30",
                      errors.password ? "border-rose-500 ring-1 ring-rose-500" : "border-border"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] text-rose-500 font-medium">{errors.password.message}</p>
                )}
              </div>

              {/* Note */}
              <div className="flex items-center p-3 rounded-xl bg-muted/40 border border-border/60 text-[11px] text-muted-foreground">
                <p>
                  সদস্য এই পাসওয়ার্ড এবং তাদের মোবাইল নম্বর অথবা সদস্য আইডি দিয়ে মেম্বার পোর্টালে লগইন করতে পারবেন।
                </p>
              </div>
            </div>
          </div>

          {/* ─── Submit Buttons ────────────────────────────────── */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link href="/admin/members">
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
              সদস্য সংরক্ষণ করুন
            </Button>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
}
