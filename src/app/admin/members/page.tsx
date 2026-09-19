"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  Calendar,
  Eye,
  Edit,
  UserX,
  UserCheck,
  Download,
  FileSpreadsheet,
  FileText,
  KeyRound,
  MessageSquare,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  PiggyBank,
  Check,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { MEMBERS } from "@/data/members";
import { CONTRIBUTIONS } from "@/data/contributions";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Member, MemberStatus } from "@/types/member";

const STATUS_CONFIG: Record<MemberStatus, { label: string; cls: string; border: string }> = {
  active: {
    label: "সক্রিয়",
    cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  inactive: {
    label: "নিষ্ক্রিয়",
    cls: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    border: "border-slate-200 dark:border-slate-700",
  },
  suspended: {
    label: "স্থগিত",
    cls: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400",
    border: "border-rose-200 dark:border-rose-800",
  },
};

const ROLE_LABELS: Record<string, string> = {
  president: "সভাপতি",
  secretary: "সাধারণ সম্পাদক",
  treasurer: "কোষাধ্যক্ষ",
  vice_president: "সহ-সভাপতি",
  joint_secretary: "যুগ্ম সম্পাদক",
  organizer: "সংগঠক",
  member: "সাধারণ সদস্য",
  admin: "অ্যাডমিন",
};

export default function AdminMembersPage() {
  const router = useRouter();
  const [membersList, setMembersList] = useState<Member[]>(MEMBERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | MemberStatus>("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [paidStatusFilter, setPaidStatusFilter] = useState("all");
  
  // UI states
  const [exportOpen, setExportOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dialog states for status changes
  const [deactivateTarget, setDeactivateTarget] = useState<Member | null>(null);
  const [activateTarget, setActivateTarget] = useState<Member | null>(null);

  // Helper function to trigger toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Calculate paid months per member
  const getPaidMonthsCount = (memberId: string, totalContributions = 0) => {
    const fromContribs = CONTRIBUTIONS.filter(
      (c) => c.memberId === memberId && c.status === "paid"
    ).length;
    if (fromContribs > 0) return fromContribs;
    return Math.max(1, Math.min(24, Math.round(totalContributions / 100)));
  };

  // Filtered members
  const filtered = useMemo(() => {
    return membersList.filter((m) => {
      // Search: name, member ID, phone
      const query = search.toLowerCase().trim();
      const matchSearch =
        !query ||
        m.fullNameBn.toLowerCase().includes(query) ||
        m.fullName.toLowerCase().includes(query) ||
        m.memberId.toLowerCase().includes(query) ||
        m.phone.replace(/[^0-9]/g, "").includes(query.replace(/[^0-9]/g, ""));

      // Status Filter
      const matchStatus = statusFilter === "all" || m.status === statusFilter;

      // Joining Date / Year Filter
      let matchYear = true;
      if (yearFilter !== "all") {
        const joinYear = new Date(m.joinDate).getFullYear();
        if (yearFilter === "2024") matchYear = joinYear === 2024;
        else if (yearFilter === "2023") matchYear = joinYear === 2023;
        else if (yearFilter === "2022") matchYear = joinYear === 2022;
        else if (yearFilter === "older") matchYear = joinYear <= 2021;
      }

      // Paid Status Filter
      let matchPaidStatus = true;
      const paidMonths = getPaidMonthsCount(m.id, m.totalContributions);
      if (paidStatusFilter === "regular") {
        matchPaidStatus = paidMonths >= 10;
      } else if (paidStatusFilter === "due") {
        matchPaidStatus = paidMonths > 0 && paidMonths < 10;
      } else if (paidStatusFilter === "irregular") {
        matchPaidStatus = paidMonths < 4 || m.status === "suspended";
      }

      return matchSearch && matchStatus && matchYear && matchPaidStatus;
    });
  }, [membersList, search, statusFilter, yearFilter, paidStatusFilter]);

  // Summary counts
  const stats = {
    total: membersList.length,
    active: membersList.filter((m) => m.status === "active").length,
    inactive: membersList.filter((m) => m.status === "inactive").length,
    suspended: membersList.filter((m) => m.status === "suspended").length,
  };

  // Toggle member status (deactivate / suspend / activate)
  const handleConfirmDeactivate = () => {
    if (!deactivateTarget) return;
    const newStatus: MemberStatus = deactivateTarget.status === "active" ? "suspended" : "inactive";
    setMembersList((prev) =>
      prev.map((m) => (m.id === deactivateTarget.id ? { ...m, status: newStatus } : m))
    );
    showToast(`${deactivateTarget.fullNameBn}-এর সদস্যপদ স্থগিত করা হয়েছে।`);
    setDeactivateTarget(null);
  };

  const handleConfirmActivate = () => {
    if (!activateTarget) return;
    setMembersList((prev) =>
      prev.map((m) => (m.id === activateTarget.id ? { ...m, status: "active" } : m))
    );
    showToast(`${activateTarget.fullNameBn}-এর সদস্যপদ পুনরায় সক্রিয় করা হয়েছে।`);
    setActivateTarget(null);
  };

  // Demo export actions
  const handleExport = (type: "csv" | "excel" | "pdf") => {
    setExportOpen(false);
    const labels = {
      csv: "CSV স্প্রেডশীট",
      excel: "Excel ওয়ার্কবুক",
      pdf: "মুদ্রণযোগ্য PDF",
    };
    showToast(`সকল সদস্যের তথ্য ${labels[type]} ফরম্যাটে প্রস্তুত ও রপ্তানি সম্পন্ন হয়েছে!`);
  };

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "অ্যাডমিন", href: "/admin/dashboard" },
        { label: "সকল সদস্য" },
      ]}
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1400px] w-full mx-auto">
        
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900 shadow-xl dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100 animate-fade-in">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ─── Header ────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2.5">
              <Users className="h-6 w-6 text-primary" />
              সকল সদস্য
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              মোট {stats.total} জন নিবন্ধিত সদস্যের তালিকা ও তাদের সঞ্চয় বিবরণী
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Export Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-semibold"
                leftIcon={<Download className="h-3.5 w-3.5" />}
                rightIcon={<ChevronDown className="h-3.5 w-3.5 opacity-70" />}
                onClick={() => setExportOpen(!exportOpen)}
              >
                Export
              </Button>
              {exportOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setExportOpen(false)} />
                  <div className="absolute right-0 z-30 mt-2 w-48 rounded-xl border border-border bg-card p-1.5 shadow-xl text-xs space-y-1">
                    <button
                      type="button"
                      onClick={() => handleExport("csv")}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left font-medium hover:bg-muted text-foreground transition-colors"
                    >
                      <FileText className="h-4 w-4 text-emerald-600" />
                      <span>Export CSV</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExport("excel")}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left font-medium hover:bg-muted text-foreground transition-colors"
                    >
                      <FileSpreadsheet className="h-4 w-4 text-blue-600" />
                      <span>Export Excel</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExport("pdf")}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left font-medium hover:bg-muted text-foreground transition-colors"
                    >
                      <Download className="h-4 w-4 text-rose-600" />
                      <span>Export PDF</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Add Member Button */}
            <Link href="/admin/members/new">
              <Button size="sm" className="text-xs font-bold shadow-xs" leftIcon={<UserPlus className="h-3.5 w-3.5" />}>
                নতুন সদস্য
              </Button>
            </Link>
          </div>
        </div>

        {/* ─── Stats KPI Row ─────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "মোট সদস্য", count: stats.total, sub: "নিবন্ধিত সর্বমোট", border: "border-border", color: "text-foreground" },
            { label: "সক্রিয় সদস্য", count: stats.active, sub: "নিয়মিত কার্যক্রমে", border: "border-emerald-300 dark:border-emerald-800", color: "text-emerald-700 dark:text-emerald-400" },
            { label: "নিষ্ক্রিয় সদস্য", count: stats.inactive, sub: "সাময়িক বিরত", border: "border-slate-300 dark:border-slate-700", color: "text-slate-600 dark:text-slate-400" },
            { label: "স্থগিত সদস্য", count: stats.suspended, sub: "চাঁদা বকেয়া বা স্থগিত", border: "border-rose-300 dark:border-rose-800", color: "text-rose-600 dark:text-rose-400" },
          ].map((item) => (
            <div key={item.label} className={cn("rounded-2xl border bg-card p-4 shadow-xs", item.border)}>
              <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
              <p className={cn("text-2xl font-extrabold mt-1", item.color)}>{item.count}</p>
              <p className="text-[11px] text-muted-foreground/80 mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* ─── Search & Filters Bar ──────────────────────────── */}
        <div className="flex flex-col md:flex-row gap-3 bg-card p-4 rounded-2xl border border-border shadow-xs">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="নাম, Member ID বা ফোন দিয়ে খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="all">সকল স্ট্যাটাস</option>
              <option value="active">সক্রিয়</option>
              <option value="inactive">নিষ্ক্রিয়</option>
              <option value="suspended">স্থগিত</option>
            </select>

            {/* Joining Date Filter */}
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="all">যোগদানের সময় (সকল)</option>
              <option value="2024">২০২৪ সালে যোগ</option>
              <option value="2023">২০২৩ সালে যোগ</option>
              <option value="2022">২০২২ সালে যোগ</option>
              <option value="older">২০২১ বা পূর্বে</option>
            </select>

            {/* Paid Status Filter */}
            <select
              value={paidStatusFilter}
              onChange={(e) => setPaidStatusFilter(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="all">পরিশোধের অবস্থা (সকল)</option>
              <option value="regular">নিয়মিত (১০+ মাস)</option>
              <option value="due">বকেয়া রয়েছে</option>
              <option value="irregular">অনিয়মিত</option>
            </select>
          </div>
        </div>

        {/* ─── Members Table (Desktop) ───────────────────────── */}
        <div className="hidden md:block rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
                  <th className="px-5 py-3.5">সদস্য ও ছবি</th>
                  <th className="px-4 py-3.5">Member ID</th>
                  <th className="px-4 py-3.5">ফোন নম্বর</th>
                  <th className="px-4 py-3.5">যোগদানের তারিখ</th>
                  <th className="px-4 py-3.5 text-center">পরিশোধিত মাস</th>
                  <th className="px-5 py-3.5 text-right">মোট সঞ্চয়</th>
                  <th className="px-4 py-3.5 text-center">স্ট্যাটাস</th>
                  <th className="px-5 py-3.5 text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((member) => {
                  const paidMonths = getPaidMonthsCount(member.id, member.totalContributions);
                  const statusInfo = STATUS_CONFIG[member.status] || STATUS_CONFIG.active;

                  return (
                    <tr key={member.id} className="hover:bg-muted/30 transition-colors">
                      {/* Avatar & Name */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs border border-primary/20">
                            {member.fullNameBn.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <Link
                              href={`/admin/members/${member.id}`}
                              className="font-bold text-foreground hover:text-primary transition-colors block truncate"
                            >
                              {member.fullNameBn}
                            </Link>
                            <p className="text-[11px] text-muted-foreground truncate">
                              {member.fullName} • {ROLE_LABELS[member.role] || member.role}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Member ID */}
                      <td className="px-4 py-3.5">
                        <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-md bg-muted text-foreground">
                          {member.memberId}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="px-4 py-3.5">
                        <span className="font-medium text-foreground">{member.phone}</span>
                        {member.email && (
                          <span className="block text-[10px] text-muted-foreground truncate max-w-[130px]">
                            {member.email}
                          </span>
                        )}
                      </td>

                      {/* Joining Date */}
                      <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">
                        {formatDate(member.joinDate)}
                      </td>

                      {/* Paid Months */}
                      <td className="px-4 py-3.5 text-center">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold",
                            paidMonths >= 10
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                              : paidMonths >= 5
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
                              : "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300"
                          )}
                        >
                          {paidMonths} মাস
                        </span>
                      </td>

                      {/* Savings */}
                      <td className="px-5 py-3.5 text-right font-extrabold text-foreground tabular-nums">
                        {formatCurrency(member.totalSavings ?? 0)}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5 text-center">
                        <span
                          className={cn(
                            "inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold",
                            statusInfo.cls
                          )}
                        >
                          {statusInfo.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {/* View */}
                          <Link
                            href={`/admin/members/${member.id}`}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            title="বিস্তারিত দেখুন"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>

                          {/* Edit */}
                          <Link
                            href={`/admin/members/${member.id}/edit`}
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            title="সম্পাদনা করুন"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>

                          {/* Deactivate or Activate */}
                          {member.status === "active" ? (
                            <button
                              type="button"
                              onClick={() => setDeactivateTarget(member)}
                              className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                              title="স্থগিত করুন"
                            >
                              <UserX className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setActivateTarget(member)}
                              className="rounded-lg p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                              title="সক্রিয় করুন"
                            >
                              <UserCheck className="h-4 w-4" />
                            </button>
                          )}

                          {/* More Options Dropdown */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setOpenMenuId(openMenuId === member.id ? null : member.id)
                              }
                              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                              title="আরও অপশন"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>

                            {openMenuId === member.id && (
                              <>
                                <div
                                  className="fixed inset-0 z-20"
                                  onClick={() => setOpenMenuId(null)}
                                />
                                <div className="absolute right-0 z-30 mt-1 w-44 rounded-xl border border-border bg-card p-1.5 shadow-xl text-xs space-y-1 text-left">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setOpenMenuId(null);
                                      showToast(`${member.fullNameBn}-কে এসএমএস পাঠানো হয়েছে।`);
                                    }}
                                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-muted text-foreground font-medium"
                                  >
                                    <MessageSquare className="h-3.5 w-3.5 text-blue-500" />
                                    <span>এসএমএস পাঠান</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setOpenMenuId(null);
                                      showToast(`${member.fullNameBn}-এর পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে।`);
                                    }}
                                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-muted text-foreground font-medium"
                                  >
                                    <KeyRound className="h-3.5 w-3.5 text-amber-500" />
                                    <span>পাসওয়ার্ড রিসেট</span>
                                  </button>
                                  <Link
                                    href={`/admin/members/${member.id}`}
                                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-muted text-foreground font-medium"
                                  >
                                    <PiggyBank className="h-3.5 w-3.5 text-emerald-500" />
                                    <span>সঞ্চয় ও লেজার</span>
                                  </Link>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-semibold text-foreground">কোনো সদস্য পাওয়া যায়নি</p>
              <p className="text-xs text-muted-foreground mt-1">অনুসন্ধান বা ফিল্টারের শর্ত পরিবর্তন করে চেষ্টা করুন।</p>
            </div>
          )}
        </div>

        {/* ─── Members Cards (Mobile) ────────────────────────── */}
        <div className="md:hidden space-y-3">
          {filtered.map((member) => {
            const paidMonths = getPaidMonthsCount(member.id, member.totalContributions);
            const statusInfo = STATUS_CONFIG[member.status] || STATUS_CONFIG.active;

            return (
              <div
                key={member.id}
                className="rounded-2xl border border-border bg-card p-4 shadow-xs space-y-3 text-left"
              >
                {/* Top Row: Avatar, Name, Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm border border-primary/20">
                      {member.fullNameBn.charAt(0)}
                    </div>
                    <div>
                      <Link
                        href={`/admin/members/${member.id}`}
                        className="font-bold text-sm text-foreground hover:text-primary block"
                      >
                        {member.fullNameBn}
                      </Link>
                      <span className="font-mono text-[11px] font-bold text-muted-foreground">
                        {member.memberId}
                      </span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-bold shrink-0",
                      statusInfo.cls
                    )}
                  >
                    {statusInfo.label}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-muted/30 p-2.5 rounded-xl border border-border/50">
                  <div>
                    <span className="text-muted-foreground block text-[10px]">ফোন নম্বর</span>
                    <span className="font-semibold text-foreground">{member.phone}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">মোট সঞ্চয়</span>
                    <span className="font-bold text-foreground">
                      {formatCurrency(member.totalSavings ?? 0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">যোগদান</span>
                    <span className="font-medium text-foreground">{formatDate(member.joinDate)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">পরিশোধিত মাস</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                      {paidMonths} মাস
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1 border-t border-border/60">
                  <Link
                    href={`/admin/members/${member.id}`}
                    className="flex-1 text-center py-2 px-3 rounded-xl bg-muted hover:bg-muted/80 text-xs font-semibold text-foreground transition-colors"
                  >
                    বিস্তারিত
                  </Link>
                  <Link
                    href={`/admin/members/${member.id}/edit`}
                    className="flex-1 text-center py-2 px-3 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-foreground transition-colors"
                  >
                    সম্পাদনা
                  </Link>
                  {member.status === "active" ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="px-3 text-xs"
                      onClick={() => setDeactivateTarget(member)}
                    >
                      স্থগিত
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="px-3 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => setActivateTarget(member)}
                    >
                      সক্রিয়
                    </Button>
                  )}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground bg-card rounded-2xl border border-border">
              কোনো সদস্য পাওয়া যায়নি
            </div>
          )}
        </div>

        {/* ─── Confirmation Dialogs ──────────────────────────── */}
        {/* Deactivate Dialog */}
        <ConfirmDialog
          open={Boolean(deactivateTarget)}
          onOpenChange={(open) => !open && setDeactivateTarget(null)}
          title="সদস্যপদ স্থগিত করতে চান?"
          description={`আপনি কি নিশ্চিত যে আপনি ${deactivateTarget?.fullNameBn} (আইডি: ${deactivateTarget?.memberId})-এর সদস্যপদ স্থগিত করতে চান? স্থগিত অবস্থায় সদস্য কার্যক্রম বা ঋণ সুবিধার আওতাভুক্ত থাকবেন না।`}
          confirmLabel="স্থগিত নিশ্চিত করুন"
          variant="destructive"
          onConfirm={handleConfirmDeactivate}
        />

        {/* Activate Dialog */}
        <ConfirmDialog
          open={Boolean(activateTarget)}
          onOpenChange={(open) => !open && setActivateTarget(null)}
          title="সদস্যপদ পুনরায় সক্রিয় করতে চান?"
          description={`আপনি কি নিশ্চিত যে আপনি ${activateTarget?.fullNameBn} (আইডি: ${activateTarget?.memberId})-এর সদস্যপদ পুনরায় সক্রিয় করতে চান? সক্রিয় অবস্থায় সদস্য নিয়মিত চাঁদা জমাদান ও সকল সুবিধা পাবেন।`}
          confirmLabel="সক্রিয় করুন"
          variant="default"
          onConfirm={handleConfirmActivate}
        />

      </div>
    </AdminLayout>
  );
}
