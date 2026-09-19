"use client";

import React, { useState } from "react";
import { MemberLayout } from "@/components/shared/MemberLayout";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  User,
  Lock,
  Sun,
  Moon,
  Laptop,
  Bell,
  CheckCircle2,
  KeyRound,
  Globe,
  Smartphone,
  Mail,
  Shield,
  Save,
} from "lucide-react";
import { MEMBER_PROFILE } from "@/data/member-portal-data";

export default function MemberSettingsPage() {
  const { theme, setTheme } = useTheme();

  // Notification toggle states
  const [smsReceipts, setSmsReceipts] = useState(true);
  const [emailSummary, setEmailSummary] = useState(true);
  const [noticeAlerts, setNoticeAlerts] = useState(true);
  const [activityInvites, setActivityInvites] = useState(true);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Save settings feedback
  const [settingsSavedMessage, setSettingsSavedMessage] = useState<string | null>(null);

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setPasswordError("বর্তমান পাসওয়ার্ড প্রদান করুন");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("নতুন পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setPasswordError(null);
    setPasswordSuccess("পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSuccess(null), 4000);
  };

  const handleSaveNotifications = () => {
    setSettingsSavedMessage("নোটিফিকেশন পছন্দসমূহ সফলভাবে সংরক্ষিত হয়েছে!");
    setTimeout(() => setSettingsSavedMessage(null), 4000);
  };

  return (
    <MemberLayout
      breadcrumbs={[
        { label: "ড্যাশবোর্ড", href: "/member/dashboard" },
        { label: "সেটিংস ও পছন্দসমূহ" },
      ]}
      memberSavings={5400}
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        {/* ── Page Header ─────────────────────────────────────── */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            অ্যাকাউন্ট সেটিংস ও পছন্দসমূহ
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            আপনার সদস্য প্রোফাইল, নিরাপত্তা পাসওয়ার্ড, থিম ও নোটিফিকেশন নিয়ন্ত্রণ করুন।
          </p>
        </div>

        {settingsSavedMessage && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 p-4 flex items-center gap-3 text-emerald-800 dark:text-emerald-300 text-sm font-medium animate-fade-in">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>{settingsSavedMessage}</span>
          </div>
        )}

        {/* ── Section 1: Account ──────────────────────────────── */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              <User className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">অ্যাকাউন্ট তথ্য (Account)</h2>
              <p className="text-xs text-muted-foreground">আপনার নিবন্ধিত সদস্য বিবরণ ও যোগাযোগ পছন্দ</p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-xl border border-border bg-muted/20 space-y-1">
                <span className="text-xs text-muted-foreground">সদস্যের নাম</span>
                <p className="font-bold text-foreground">{MEMBER_PROFILE.name}</p>
              </div>

              <div className="p-3 rounded-xl border border-border bg-muted/20 space-y-1">
                <span className="text-xs text-muted-foreground">সদস্য আইডি (অপরিবর্তনযোগ্য)</span>
                <p className="font-bold text-foreground font-mono">{MEMBER_PROFILE.memberId}</p>
              </div>

              <div className="p-3 rounded-xl border border-border bg-muted/20 space-y-1">
                <span className="text-xs text-muted-foreground">নিবন্ধিত ফোন নম্বর</span>
                <p className="font-bold text-foreground font-mono">{MEMBER_PROFILE.phone}</p>
              </div>

              <div className="p-3 rounded-xl border border-border bg-muted/20 space-y-1">
                <span className="text-xs text-muted-foreground">নিবন্ধিত ইমেইল</span>
                <p className="font-bold text-foreground">{MEMBER_PROFILE.email}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>যোগাযোগ তথ্য পরিবর্তন করতে চাইলে প্রোফাইল পাতা থেকে সম্পাদনা করুন।</span>
              <a href="/member/profile" className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline">
                প্রোফাইলে যান →
              </a>
            </div>
          </div>
        </div>

        {/* ── Section 2: Password & Security ─────────────────── */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">নিরাপত্তা ও পাসওয়ার্ড (Password)</h2>
              <p className="text-xs text-muted-foreground">আপনার অ্যাকাউন্ট সুরক্ষিত রাখতে নতুন পাসওয়ার্ড নির্ধারণ করুন</p>
            </div>
          </div>

          <div className="p-6">
            {passwordSuccess && (
              <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 p-3.5 flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            {passwordError && (
              <div className="mb-4 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 p-3.5 text-red-700 dark:text-red-300 text-xs font-semibold">
                {passwordError}
              </div>
            )}

            <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">বর্তমান পাসওয়ার্ড</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">নতুন পাসওয়ার্ড</label>
                <input
                  type="password"
                  required
                  placeholder="কমপক্ষে ৬ অক্ষর"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">নতুন পাসওয়ার্ড নিশ্চিত করুন</label>
                <input
                  type="password"
                  required
                  placeholder="পুনরায় নতুন পাসওয়ার্ড লিখুন"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button type="submit" size="sm" className="bg-primary text-white hover:bg-emerald-700 text-xs font-semibold gap-1.5">
                <KeyRound className="h-3.5 w-3.5" />
                পাসওয়ার্ড পরিবর্তন করুন
              </Button>
            </form>
          </div>
        </div>

        {/* ── Section 3: Theme (Light / Dark Mode) ─────────────── */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
              <Sun className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">থিম ও ডিসপ্লে (Theme & Appearance)</h2>
              <p className="text-xs text-muted-foreground">আপনার পছন্দের আলো ও ডার্ক মোড নির্বাচন করুন</p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Light Mode */}
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  theme === "light"
                    ? "border-primary ring-2 ring-primary/20 bg-emerald-50/40 dark:bg-emerald-950/20"
                    : "border-border hover:border-border/80 bg-muted/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                    <Sun className="h-5 w-5" />
                  </div>
                  {theme === "light" && (
                    <span className="text-xs font-bold text-primary flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> সক্রিয়
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-sm text-foreground">লাইট মোড (Light)</h3>
                <p className="text-xs text-muted-foreground mt-0.5">উজ্জ্বল ও পরিষ্কার দিনকালীন ভিউ</p>
              </button>

              {/* Dark Mode */}
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  theme === "dark"
                    ? "border-primary ring-2 ring-primary/20 bg-emerald-50/40 dark:bg-emerald-950/20"
                    : "border-border hover:border-border/80 bg-muted/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-indigo-900 text-indigo-200">
                    <Moon className="h-5 w-5" />
                  </div>
                  {theme === "dark" && (
                    <span className="text-xs font-bold text-primary flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> সক্রিয়
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-sm text-foreground">ডার্ক মোড (Dark)</h3>
                <p className="text-xs text-muted-foreground mt-0.5">চোখের আরামদায়ক অন্ধকার ব্যাকগ্রাউন্ড</p>
              </button>

              {/* System Theme */}
              <button
                type="button"
                onClick={() => setTheme("system")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  theme === "system"
                    ? "border-primary ring-2 ring-primary/20 bg-emerald-50/40 dark:bg-emerald-950/20"
                    : "border-border hover:border-border/80 bg-muted/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-muted text-foreground">
                    <Laptop className="h-5 w-5" />
                  </div>
                  {theme === "system" && (
                    <span className="text-xs font-bold text-primary flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> সক্রিয়
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-sm text-foreground">সিস্টেম ডিফল্ট (System)</h3>
                <p className="text-xs text-muted-foreground mt-0.5">ডিভাইসের সেটিং অনুযায়ী স্বয়ংক্রিয় থিম</p>
              </button>
            </div>
          </div>
        </div>

        {/* ── Section 4: Notifications ────────────────────────── */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">নোটিফিকেশন পছন্দসমূহ (Notifications)</h2>
              <p className="text-xs text-muted-foreground">আপনার জরুরি বার্তা ও সতর্কবার্তা কনফিগার করুন</p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-3">
              {/* Toggle 1: SMS */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-border hover:bg-muted/20 transition-colors">
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-emerald-600" />
                    চাঁদা জমাদানের এসএমএস সতর্কতা
                  </span>
                  <p className="text-xs text-muted-foreground">
                    মাসিক চাঁদা আদায় হলে তাৎক্ষণিক এসএমএস রসিদ পাঠানো হবে।
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsReceipts}
                    onChange={(e) => setSmsReceipts(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Toggle 2: Email */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-border hover:bg-muted/20 transition-colors">
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    মাসিক আর্থিক বিবরণী ইমেইল
                  </span>
                  <p className="text-xs text-muted-foreground">
                    প্রতি মাসের শুরুতে গত মাসের সার্বিক সঞ্চয় ও খতিয়ান ইমেইলে পাঠানো হবে।
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailSummary}
                    onChange={(e) => setEmailSummary(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Toggle 3: Notice Alert */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-border hover:bg-muted/20 transition-colors">
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Bell className="h-4 w-4 text-amber-600" />
                    নতুন নোটিশ ও জরুরি বিজ্ঞপ্তি
                  </span>
                  <p className="text-xs text-muted-foreground">
                    সংগঠনের সাধারণ সভা ও জরুরি নোটিশ প্রকাশিত হলে নোটিফিকেশন পাবেন।
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noticeAlerts}
                    onChange={(e) => setNoticeAlerts(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Toggle 4: Activity Invites */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-border hover:bg-muted/20 transition-colors">
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Globe className="h-4 w-4 text-teal-600" />
                    সামাজিক কর্মসূচি ও অনুষ্ঠানে আমন্ত্রণ
                  </span>
                  <p className="text-xs text-muted-foreground">
                    নতুন সমাজকল্যাণমূলক কর্মসূচি আয়োজিত হলে অংশগ্রহণের বিজ্ঞপ্তি পাবেন।
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activityInvites}
                    onChange={(e) => setActivityInvites(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <Button
                onClick={handleSaveNotifications}
                size="sm"
                className="bg-primary text-white hover:bg-emerald-700 text-xs font-semibold gap-1.5"
              >
                <Save className="h-3.5 w-3.5" />
                পছন্দসমূহ সংরক্ষণ করুন
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
}
