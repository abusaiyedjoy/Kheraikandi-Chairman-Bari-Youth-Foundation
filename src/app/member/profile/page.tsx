"use client";

import React, { useState } from "react";
import { MemberLayout } from "@/components/shared/MemberLayout";
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
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShieldCheck,
  Edit3,
  KeyRound,
  PiggyBank,
  Award,
  CheckCircle2,
  Lock,
  Smartphone,
  Info,
} from "lucide-react";
import { MEMBER_PROFILE } from "@/data/member-portal-data";

export default function MemberProfilePage() {
  const [profile, setProfile] = useState(MEMBER_PROFILE);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Edit profile form state
  const [editForm, setEditForm] = useState({
    name: profile.name,
    phone: profile.phone,
    email: profile.email,
    address: profile.address,
    bloodGroup: profile.bloodGroup,
    occupation: profile.occupation,
  });

  // Change password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      name: editForm.name,
      phone: editForm.phone,
      email: editForm.email,
      address: editForm.address,
      bloodGroup: editForm.bloodGroup,
      occupation: editForm.occupation,
    }));
    setEditModalOpen(false);
    setSaveSuccessMessage("প্রোফাইল তথ্য সফলভাবে আপডেট করা হয়েছে!");
    setTimeout(() => setSaveSuccessMessage(null), 4000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.currentPassword) {
      setPasswordError("বর্তমান পাসওয়ার্ড প্রদান করুন");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("নতুন পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setPasswordError("");
    setPasswordModalOpen(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setSaveSuccessMessage("পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!");
    setTimeout(() => setSaveSuccessMessage(null), 4000);
  };

  return (
    <MemberLayout
      breadcrumbs={[
        { label: "ড্যাশবোর্ড", href: "/member/dashboard" },
        { label: "আমার প্রোফাইল" },
      ]}
      memberSavings={5400}
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
        {/* Success Alert Banner */}
        {saveSuccessMessage && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 p-4 flex items-center gap-3 text-emerald-800 dark:text-emerald-300 text-sm font-medium animate-fade-in shadow-xs">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>{saveSuccessMessage}</span>
          </div>
        )}

        {/* ── Top Header Profile Card ────────────────────────── */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {/* Decorative Cover Header */}
          <div className="h-32 sm:h-40 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm border border-white/20">
                আইডি: {profile.memberId}
              </span>
            </div>
          </div>

          <div className="px-5 sm:px-8 pb-6 pt-0">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-16 mb-4">
              {/* Avatar + Main Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
                <div className="relative group">
                  <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 border-4 border-card text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-3xl shadow-md overflow-hidden">
                    <User className="h-14 w-14 text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-card ring-2 ring-emerald-400/20" title="সক্রিয় সদস্য" />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                      {profile.name}
                    </h1>
                    <StatusBadge status={profile.status} domain="member" />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {profile.role} • সদস্য আইডি: <span className="font-mono font-bold text-foreground">{profile.memberId}</span>
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5 pt-0.5">
                    <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                    যোগদানের তারিখ: <span className="font-semibold text-foreground">{profile.joiningDateFormatted}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center sm:justify-end gap-2.5 pt-2 sm:pt-0">
                <Button
                  onClick={() => {
                    setEditForm({
                      name: profile.name,
                      phone: profile.phone,
                      email: profile.email,
                      address: profile.address,
                      bloodGroup: profile.bloodGroup,
                      occupation: profile.occupation,
                    });
                    setEditModalOpen(true);
                  }}
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-border hover:bg-muted text-xs font-semibold gap-1.5"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  প্রোফাইল সম্পাদনা
                </Button>
                <Button
                  onClick={() => {
                    setPasswordError("");
                    setPasswordModalOpen(true);
                  }}
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-border hover:bg-muted text-xs font-semibold gap-1.5 text-foreground"
                >
                  <KeyRound className="h-3.5 w-3.5 text-amber-600" />
                  পাসওয়ার্ড পরিবর্তন
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3 Main Sections Grid ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Section 1: Personal Information */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                <User className="h-4 w-4" />
              </div>
              <h2 className="text-base font-bold text-foreground">ব্যক্তিগত তথ্য (Personal Information)</h2>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">পূর্ণ নাম</span>
                <p className="font-semibold text-foreground">{profile.name}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">ইংরেজিতে নাম</span>
                <p className="font-semibold text-foreground">{profile.nameEn}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3 text-emerald-600" /> ফোন নম্বর
                </span>
                <p className="font-semibold text-foreground font-mono">{profile.phone}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Mail className="h-3 w-3 text-emerald-600" /> ইমেইল ঠিকানা
                </span>
                <p className="font-semibold text-foreground">{profile.email}</p>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-emerald-600" /> বর্তমান ঠিকানা
                </span>
                <p className="font-semibold text-foreground">{profile.address}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">পেশা</span>
                <p className="font-semibold text-foreground">{profile.occupation}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">রক্তের গ্রুপ</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400">
                  {profile.bloodGroup}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">পিতার নাম</span>
                <p className="font-semibold text-foreground">{profile.fatherName}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">মাতার নাম</span>
                <p className="font-semibold text-foreground">{profile.motherName}</p>
              </div>

              <div className="space-y-1 sm:col-span-2 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">জরুরি যোগাযোগ (Emergency Contact)</span>
                <p className="font-semibold text-foreground">
                  {profile.emergencyContact.name} ({profile.emergencyContact.relation}) —{" "}
                  <span className="font-mono text-emerald-700 dark:text-emerald-400">
                    {profile.emergencyContact.phone}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Membership Information */}
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400">
                <Award className="h-4 w-4" />
              </div>
              <h2 className="text-base font-bold text-foreground">সদস্যপদ তথ্য (Membership)</h2>
            </div>

            <div className="p-6 space-y-4 flex-1">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border">
                <span className="text-xs text-muted-foreground">সদস্য আইডি</span>
                <span className="font-mono font-bold text-sm text-foreground bg-background px-2.5 py-1 rounded-md border border-border">
                  {profile.memberId}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border">
                <span className="text-xs text-muted-foreground">সদস্যপদ অবস্থা</span>
                <StatusBadge status={profile.status} domain="member" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border">
                <span className="text-xs text-muted-foreground">সদস্যপদের ধরন</span>
                <span className="text-xs font-semibold text-foreground">{profile.role}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border">
                <span className="text-xs text-muted-foreground">যোগদানের তারিখ</span>
                <span className="text-xs font-semibold text-foreground">{profile.joiningDateFormatted}</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 text-emerald-800 dark:text-emerald-300 font-semibold">
                    <PiggyBank className="h-3.5 w-3.5 text-emerald-600" />
                    পরিশোধিত কিস্তি (৬০ মাস)
                  </span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">১০০% নিয়মিত</span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-xs text-muted-foreground">ব্যক্তিগত সঞ্চয় (৯০%):</span>
                  <span className="text-base font-extrabold text-emerald-800 dark:text-emerald-300 font-mono">
                    ৳৫,৪০০
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Security & Access Information */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h2 className="text-base font-bold text-foreground">নিরাপত্তা ও লগইন (Security)</h2>
            </div>
            <Button
              onClick={() => {
                setPasswordError("");
                setPasswordModalOpen(true);
              }}
              variant="outline"
              size="sm"
              className="text-xs font-semibold"
            >
              পাসওয়ার্ড পরিবর্তন করুন
            </Button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Lock className="h-4 w-4 text-emerald-600" />
                <span>পাসওয়ার্ড অবস্থা</span>
              </div>
              <p className="text-sm font-bold text-foreground">সুরক্ষিত</p>
              <p className="text-xs text-muted-foreground">
                সর্বশেষ পরিবর্তন: {profile.security.passwordLastChanged}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Smartphone className="h-4 w-4 text-blue-600" />
                <span>টু-ফ্যাক্টর অথেনটিকেশন</span>
              </div>
              <p className="text-sm font-bold text-amber-600 dark:text-amber-400">অক্রিয় (ঐচ্ছিক)</p>
              <p className="text-xs text-muted-foreground">এসএমএস ভেরিফিকেশন চালু করতে পারেন</p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Info className="h-4 w-4 text-teal-600" />
                <span>সক্রিয় সেশন</span>
              </div>
              <p className="text-sm font-bold text-foreground truncate">{profile.security.activeDevice}</p>
              <p className="text-xs text-muted-foreground">লগইন: {profile.security.lastLogin}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Edit Profile Modal ─────────────────────────────── */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent maxWidth="lg" onClose={() => setEditModalOpen(false)}>
          <DialogHeader>
            <DialogTitle>প্রোফাইল তথ্য সম্পাদন করুন</DialogTitle>
            <DialogDescription>
              আপনার ব্যক্তিগত ও যোগাযোগের তথ্য হালনাগাদ করুন। সদস্য আইডি অপরিবর্তনযোগ্য।
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">পূর্ণ নাম (বাংলায়)</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">ফোন নম্বর</label>
                <input
                  type="text"
                  required
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">ইমেইল ঠিকানা</label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">পেশা</label>
                <input
                  type="text"
                  value={editForm.occupation}
                  onChange={(e) => setEditForm({ ...editForm, occupation: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">রক্তের গ্রুপ</label>
                <select
                  value={editForm.bloodGroup}
                  onChange={(e) => setEditForm({ ...editForm, bloodGroup: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-foreground">বর্তমান ঠিকানা</label>
                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditModalOpen(false)}
              >
                বাতিল
              </Button>
              <Button type="submit" className="bg-primary text-white hover:bg-emerald-700">
                পরিবর্তন সংরক্ষণ করুন
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Change Password Modal ──────────────────────────── */}
      <Dialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
        <DialogContent maxWidth="md" onClose={() => setPasswordModalOpen(false)}>
          <DialogHeader>
            <DialogTitle>পাসওয়ার্ড পরিবর্তন</DialogTitle>
            <DialogDescription>
              আপনার অ্যাকাউন্ট সুরক্ষিত রাখতে শক্তিশালী পাসওয়ার্ড ব্যবহার করুন।
            </DialogDescription>
          </DialogHeader>

          {passwordError && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-medium border border-red-200 dark:border-red-900">
              {passwordError}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">বর্তমান পাসওয়ার্ড</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">নতুন পাসওয়ার্ড</label>
              <input
                type="password"
                required
                placeholder="কমপক্ষে ৬ অক্ষর"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">নতুন পাসওয়ার্ড নিশ্চিত করুন</label>
              <input
                type="password"
                required
                placeholder="পুনরায় নতুন পাসওয়ার্ড লিখুন"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setPasswordModalOpen(false)}
              >
                বাতিল
              </Button>
              <Button type="submit" className="bg-primary text-white hover:bg-emerald-700">
                পাসওয়ার্ড আপডেট করুন
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </MemberLayout>
  );
}
