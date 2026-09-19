"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  UserCheck,
  UserX,
  Clock,
  Search,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Eye,
  Shield,
  Filter,
  Check,
  X,
  ArrowLeft,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface PendingApplicant {
  id: string;
  name: string;
  nameEn: string;
  phone: string;
  email?: string;
  nid: string;
  address: string;
  village: string;
  occupation: string;
  bloodGroup: string;
  appliedDate: string;
  referredBy: string;
  status: "pending" | "approved" | "rejected";
  assignedId?: string;
  rejectionReason?: string;
}

const INITIAL_APPLICANTS: PendingApplicant[] = [
  {
    id: "pm001",
    name: "মো. রাকিবুল হাসান",
    nameEn: "Md. Rakibul Hasan",
    phone: "01712-999001",
    email: "rakibul.hasan@example.com",
    nid: "1994267812903",
    address: "পূর্ব পাড়া, খিরাইকান্দি, ভৈরব",
    village: "খিরাইকান্দি",
    occupation: "ফার্মাসিস্ট",
    bloodGroup: "O+",
    appliedDate: "2024-09-15",
    referredBy: "মো. জাহাঙ্গীর আলম (KYK-002)",
    status: "pending",
  },
  {
    id: "pm002",
    name: "মো. সাইফুল ইসলাম",
    nameEn: "Md. Saiful Islam",
    phone: "01812-999002",
    email: "saiful.islam@example.com",
    nid: "1996289012345",
    address: "চেয়ারম্যান বাড়ি সংলগ্ন, খিরাইকান্দি, ভৈরব",
    village: "খিরাইকান্দি",
    occupation: "শিক্ষক",
    bloodGroup: "A+",
    appliedDate: "2024-09-12",
    referredBy: "মোহাম্মদ রফিকুল ইসলাম (KYK-001)",
    status: "pending",
  },
  {
    id: "pm003",
    name: "মাহমুদুল হাসান তানভীর",
    nameEn: "Mahmudul Hasan Tanvir",
    phone: "01912-334455",
    email: "tanvir.kh@example.com",
    nid: "1998123490812",
    address: "দক্ষিণ পাড়া, খিরাইকান্দি, ভৈরব",
    village: "খিরাইকান্দি",
    occupation: "ফ্রিল্যান্সার ও গ্রাফিক ডিজাইনার",
    bloodGroup: "B+",
    appliedDate: "2024-09-08",
    referredBy: "মোহাম্মদ তারেক (KYK-003)",
    status: "pending",
  },
];

export default function PendingMembersPage() {
  const [applicants, setApplicants] = useState<PendingApplicant[]>(INITIAL_APPLICANTS);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dialog actions
  const [approveTarget, setApproveTarget] = useState<PendingApplicant | null>(null);
  const [rejectTarget, setRejectTarget] = useState<PendingApplicant | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [inspectTarget, setInspectTarget] = useState<PendingApplicant | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleConfirmApprove = () => {
    if (!approveTarget) return;
    const assignedId = `KYK-02${applicants.filter((a) => a.status === "approved").length + 6}`;
    setApplicants((prev) =>
      prev.map((a) =>
        a.id === approveTarget.id ? { ...a, status: "approved", assignedId } : a
      )
    );
    showToast(`${approveTarget.name}-এর সদস্যপদ অনুমোদিত হয়েছে (আইডি: ${assignedId})`);
    setApproveTarget(null);
  };

  const handleConfirmReject = () => {
    if (!rejectTarget) return;
    setApplicants((prev) =>
      prev.map((a) =>
        a.id === rejectTarget.id
          ? { ...a, status: "rejected", rejectionReason: rejectionReason || "নিয়মাবলী পূরণ না হওয়ায় বাতিল" }
          : a
      )
    );
    showToast(`${rejectTarget.name}-এর আবেদন প্রত্যাখ্যান করা হয়েছে`);
    setRejectTarget(null);
    setRejectionReason("");
  };

  const filtered = applicants.filter((a) => {
    const matchesTab = a.status === activeTab;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.nameEn.toLowerCase().includes(q) ||
      a.phone.includes(q);
    return matchesTab && matchesSearch;
  });

  const pendingCount = applicants.filter((a) => a.status === "pending").length;
  const approvedCount = applicants.filter((a) => a.status === "approved").length;
  const rejectedCount = applicants.filter((a) => a.status === "rejected").length;

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "অ্যাডমিন", href: "/admin/dashboard" },
        { label: "সকল সদস্য", href: "/admin/members" },
        { label: "অপেক্ষমান সদস্য" },
      ]}
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1200px] w-full mx-auto">
        
        {/* Floating Toast */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-900 shadow-2xl dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100 animate-fade-in">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ─── Header ────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/members"
              className="rounded-xl p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-primary" />
                অপেক্ষমান সদস্য আবেদন
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                সংগঠনে যোগদানের জন্য জমাকৃত নতুন আবেদনসমূহ পর্যালোচনা ও সিদ্ধান্ত গ্রহণ
              </p>
            </div>
          </div>

          <Link href="/admin/members/new">
            <Button size="sm" className="text-xs font-bold shadow-xs">
              সরাসরি সদস্য যোগ করুন
            </Button>
          </Link>
        </div>

        {/* ─── Filter Tabs & Search ──────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card p-3 rounded-2xl border border-border">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("pending")}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors",
                activeTab === "pending"
                  ? "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Clock className="h-3.5 w-3.5 text-amber-600" />
              <span>অপেক্ষমান</span>
              <span className="rounded-full bg-amber-200/60 dark:bg-amber-900 px-1.5 py-0.2 text-[10px] font-mono">
                {pendingCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("approved")}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors",
                activeTab === "approved"
                  ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>অনুমোদিত</span>
              <span className="rounded-full bg-emerald-200/60 dark:bg-emerald-900 px-1.5 py-0.2 text-[10px] font-mono">
                {approvedCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("rejected")}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors",
                activeTab === "rejected"
                  ? "bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <UserX className="h-3.5 w-3.5 text-rose-600" />
              <span>প্রত্যাখ্যাত</span>
              <span className="rounded-full bg-rose-200/60 dark:bg-rose-900 px-1.5 py-0.2 text-[10px] font-mono">
                {rejectedCount}
              </span>
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="আবেদনকারী খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-60 rounded-xl border border-border bg-background pl-8 pr-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* ─── Applicants List ───────────────────────────────── */}
        <div className="space-y-4">
          {filtered.map((applicant) => (
            <div
              key={applicant.id}
              className="rounded-2xl border border-border bg-card p-5 shadow-xs text-left hover:border-primary/40 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-extrabold text-base border border-amber-300/40">
                    {applicant.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-foreground">
                        {applicant.name}
                      </h3>
                      {applicant.status === "pending" && (
                        <span className="rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2.5 py-0.5 text-[10px] font-bold flex items-center gap-1">
                          <Clock className="h-3 w-3" /> অপেক্ষমান
                        </span>
                      )}
                      {applicant.status === "approved" && (
                        <span className="rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2.5 py-0.5 text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> অনুমোদিত ({applicant.assignedId})
                        </span>
                      )}
                      {applicant.status === "rejected" && (
                        <span className="rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 px-2.5 py-0.5 text-[10px] font-bold flex items-center gap-1">
                          <X className="h-3 w-3" /> বাতিল
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{applicant.nameEn}</p>
                  </div>
                </div>

                {/* Top Right Application Date */}
                <div className="text-left sm:text-right text-xs text-muted-foreground">
                  <span>আবেদনের তারিখ: </span>
                  <span className="font-semibold text-foreground">{formatDate(applicant.appliedDate)}</span>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs bg-muted/30 p-3.5 rounded-xl border border-border/60">
                <div>
                  <span className="text-muted-foreground block text-[10px]">ফোন নম্বর</span>
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <Phone className="h-3 w-3 text-primary" /> {applicant.phone}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">এনআইডি / জন্ম নিবন্ধন</span>
                  <span className="font-semibold font-mono text-foreground">{applicant.nid}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">পেশা ও রক্তের গ্রুপ</span>
                  <span className="font-semibold text-foreground">
                    {applicant.occupation} • <span className="text-rose-600 font-bold">{applicant.bloodGroup}</span>
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">রেফারেন্সকারী</span>
                  <span className="font-semibold text-foreground truncate block">{applicant.referredBy}</span>
                </div>
              </div>

              {/* Action Buttons (Only if pending) */}
              {applicant.status === "pending" && (
                <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-border/70">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    leftIcon={<Eye className="h-3.5 w-3.5" />}
                    onClick={() => setInspectTarget(applicant)}
                  >
                    আবেদন যাচাই করুন
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-rose-300 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    leftIcon={<UserX className="h-3.5 w-3.5" />}
                    onClick={() => {
                      setRejectTarget(applicant);
                      setRejectionReason("");
                    }}
                  >
                    প্রত্যাখ্যান (Reject)
                  </Button>

                  <Button
                    size="sm"
                    className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                    leftIcon={<UserCheck className="h-3.5 w-3.5" />}
                    onClick={() => setApproveTarget(applicant)}
                  >
                    অনুমোদন করুন (Approve)
                  </Button>
                </div>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-16 text-center bg-card rounded-2xl border border-border">
              <UserCheck className="mx-auto h-12 w-12 text-muted-foreground/40 mb-2" />
              <p className="text-sm font-semibold text-foreground">কোনো আবেদন পাওয়া যায়নি</p>
              <p className="text-xs text-muted-foreground mt-1">এই ক্যাটাগরিতে বর্তমানে কোনো সদস্য আবেদন অবশিষ্ট নেই।</p>
            </div>
          )}
        </div>

        {/* ─── Modal 1: Inspect Application ──────────────────── */}
        <Dialog open={Boolean(inspectTarget)} onOpenChange={(open) => !open && setInspectTarget(null)}>
          <DialogContent onClose={() => setInspectTarget(null)} maxWidth="md">
            <DialogTitle className="text-base font-bold text-foreground flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              আবেদনপত্র বিস্তারিত — {inspectTarget?.name}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ ফাউন্ডেশনের সদস্য পদের আবেদনপত্র
            </DialogDescription>

            {inspectTarget && (
              <div className="space-y-3 pt-3 text-xs text-left">
                <div className="p-3 bg-muted/40 rounded-xl space-y-2 border border-border/60">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">বাংলা নাম:</span>
                    <span className="font-bold text-foreground">{inspectTarget.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ইংরেজি নাম:</span>
                    <span className="font-semibold text-foreground">{inspectTarget.nameEn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">মোবাইল:</span>
                    <span className="font-semibold text-foreground">{inspectTarget.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ইমেইল:</span>
                    <span className="font-semibold text-foreground">{inspectTarget.email || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">এনআইডি:</span>
                    <span className="font-mono font-bold text-foreground">{inspectTarget.nid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ঠিকানা:</span>
                    <span className="font-medium text-foreground">{inspectTarget.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">সুপারিশকারী:</span>
                    <span className="font-bold text-primary">{inspectTarget.referredBy}</span>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="mt-5">
              <Button variant="outline" size="sm" onClick={() => setInspectTarget(null)}>
                বন্ধ করুন
              </Button>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                onClick={() => {
                  const t = inspectTarget;
                  setInspectTarget(null);
                  if (t) setApproveTarget(t);
                }}
              >
                অনুমোদন করুন
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ─── Confirmation Dialog: Approve ──────────────────── */}
        <ConfirmDialog
          open={Boolean(approveTarget)}
          onOpenChange={(open) => !open && setApproveTarget(null)}
          title="সদস্যপদ অনুমোদন নিশ্চিত করুন"
          description={`আপনি কি নিশ্চিত যে আপনি ${approveTarget?.name}-এর আবেদন অনুমোদন করতে চান? অনুমোদনের পর তাকে সক্রিয় সদস্য হিসেবে অন্তর্ভুক্ত করা হবে এবং একটি ইউনিক সদস্য আইডি প্রদান করা হবে।`}
          confirmLabel="অনুমোদন সম্পন্ন করুন"
          variant="default"
          onConfirm={handleConfirmApprove}
        />

        {/* ─── Confirmation Dialog: Reject ───────────────────── */}
        <Dialog open={Boolean(rejectTarget)} onOpenChange={(open) => !open && setRejectTarget(null)}>
          <DialogContent onClose={() => setRejectTarget(null)} maxWidth="sm">
            <DialogTitle className="text-base font-bold text-rose-600 flex items-center gap-2">
              <UserX className="h-5 w-5" />
              আবেদন প্রত্যাখ্যান নিশ্চিত করুন
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              {rejectTarget?.name}-এর সদস্য আবেদন বাতিল করার কারণ উল্লেখ করুন।
            </DialogDescription>

            <div className="pt-3 text-left">
              <label className="text-xs font-semibold text-foreground block mb-1">
                বাতিলের কারণ (ঐচ্ছিক)
              </label>
              <textarea
                rows={3}
                placeholder="যেমন: তথ্যের অসামঞ্জস্যতা / সদস্যপদ শর্তাবলী পূরণ না হওয়া"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full rounded-xl border border-border bg-background p-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500/30"
              />
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" size="sm" onClick={() => setRejectTarget(null)}>
                ফিরে যান
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="font-bold"
                onClick={handleConfirmReject}
              >
                প্রত্যাখ্যান করুন
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </AdminLayout>
  );
}
