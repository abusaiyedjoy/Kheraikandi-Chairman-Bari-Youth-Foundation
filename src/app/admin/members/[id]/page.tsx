"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  ArrowLeft,
  Edit,
  PlusCircle,
  RefreshCw,
  Wallet,
  PiggyBank,
  TrendingUp,
  Receipt,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  X,
  CreditCard,
  Building,
  HeartHandshake,
  Check,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { MEMBERS, getMemberById } from "@/data/members";
import { CONTRIBUTIONS } from "@/data/contributions";
import { REFUNDS } from "@/data/refunds";
import { TRANSACTIONS } from "@/data/transactions";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Member, MemberStatus } from "@/types/member";
import type { Contribution, Refund } from "@/types/finance";

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

const STATUS_CONFIG: Record<MemberStatus, { label: string; cls: string }> = {
  active: {
    label: "সক্রিয় সদস্য",
    cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800",
  },
  inactive: {
    label: "নিষ্ক্রিয়",
    cls: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700",
  },
  suspended: {
    label: "স্থগিত",
    cls: "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-300 dark:border-rose-800",
  },
};

interface MemberDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function MemberDetailsPage({ params }: MemberDetailsPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const rawId = resolvedParams.id;

  // Find member by id or memberId
  const initialMember =
    MEMBERS.find(
      (m) =>
        m.id.toLowerCase() === rawId.toLowerCase() ||
        m.memberId.toLowerCase() === rawId.toLowerCase()
    ) || MEMBERS[0];

  const [member, setMember] = useState<Member>(initialMember);
  const [activeTab, setActiveTab] = useState<"contributions" | "savings" | "transactions" | "refunds">("contributions");
  
  // Modals state
  const [addContribOpen, setAddContribOpen] = useState(false);
  const [refundOpen, setRefundOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Add contribution form state
  const [contribAmount, setContribAmount] = useState<number>(500);
  const [contribMonth, setContribMonth] = useState<string>("অক্টোবর ২০২৪");
  const [contribMethod, setContribMethod] = useState<string>("bkash");
  const [contribTrx, setContribTrx] = useState<string>("");

  // Process refund form state
  const [refundAmount, setRefundAmount] = useState<number>(1000);
  const [refundType, setRefundType] = useState<"partial_savings" | "full_savings">("partial_savings");
  const [refundReason, setRefundReason] = useState<string>("");
  const [refundError, setRefundError] = useState<string | null>(null);

  // Dynamic lists
  const [memberContribs, setMemberContribs] = useState<Contribution[]>(() => {
    const list = CONTRIBUTIONS.filter(
      (c) => c.memberId === member.id || c.memberName === member.fullNameBn
    );
    if (list.length > 0) return list;
    // fallback sample contribution for demo
    return [
      {
        id: "c-demo-1",
        memberId: member.id,
        memberName: member.fullNameBn,
        amount: 500,
        savingsAmount: 450,
        developmentAmount: 50,
        month: 9,
        year: 2024,
        paymentDate: "2024-09-05",
        status: "paid",
        paymentMethod: "bkash",
        collectedBy: "m003",
      },
      {
        id: "c-demo-2",
        memberId: member.id,
        memberName: member.fullNameBn,
        amount: 500,
        savingsAmount: 450,
        developmentAmount: 50,
        month: 8,
        year: 2024,
        paymentDate: "2024-08-04",
        status: "paid",
        paymentMethod: "cash",
        collectedBy: "m003",
      },
    ];
  });

  const [memberRefunds, setMemberRefunds] = useState<Refund[]>(() => {
    return REFUNDS.filter((r) => r.memberId === member.id || r.memberName === member.fullNameBn);
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Submit Add Contribution
  const handleSaveContribution = () => {
    const savings = Math.round(contribAmount * 0.9);
    const dev = Math.round(contribAmount * 0.1);

    const newC: Contribution = {
      id: `c-new-${Date.now()}`,
      memberId: member.id,
      memberName: member.fullNameBn,
      amount: contribAmount,
      savingsAmount: savings,
      developmentAmount: dev,
      month: 10,
      year: 2024,
      paymentDate: new Date().toISOString().split("T")[0],
      status: "paid",
      paymentMethod: contribMethod as Contribution["paymentMethod"],
      collectedBy: "m003",
      remarks: contribTrx ? `TrxID: ${contribTrx}` : undefined,
    };

    setMemberContribs([newC, ...memberContribs]);
    setMember((prev) => ({
      ...prev,
      totalContributions: (prev.totalContributions ?? 0) + contribAmount,
      totalSavings: (prev.totalSavings ?? 0) + savings,
      totalDevelopmentFund: (prev.totalDevelopmentFund ?? 0) + dev,
    }));

    setAddContribOpen(false);
    showToast(`৳${contribAmount.toLocaleString("en-BD")} চাঁদা সফলভাবে এন্ট্রি হয়েছে (সঞ্চয়: ৳${savings.toLocaleString("en-BD")}, উন্নয়ন: ৳${dev.toLocaleString("en-BD")})`);
  };

  // Submit Process Refund
  const handleProcessRefund = () => {
    const maxSavings = member.totalSavings ?? 0;
    if (refundAmount <= 0) {
      setRefundError("সঠিক টাকার পরিমাণ উল্লেখ করুন");
      return;
    }
    if (refundAmount > maxSavings) {
      setRefundError(`উত্তোলনের পরিমাণ মোট সঞ্চয় ৳${maxSavings.toLocaleString("en-BD")}-এর বেশি হতে পারবে না`);
      return;
    }

    const newR: Refund = {
      id: `r-new-${Date.now()}`,
      memberId: member.id,
      memberName: member.fullNameBn,
      refundType,
      requestedAmount: refundAmount,
      approvedAmount: refundAmount,
      requestDate: new Date().toISOString().split("T")[0],
      approvalDate: new Date().toISOString().split("T")[0],
      approvedBy: "m001",
      status: "approved",
      paymentMethod: "bank_transfer",
      reason: refundReason || "জরুরি পারিবারিক প্রয়োজন",
    };

    setMemberRefunds([newR, ...memberRefunds]);
    setMember((prev) => ({
      ...prev,
      totalSavings: Math.max(0, (prev.totalSavings ?? 0) - refundAmount),
    }));

    setRefundOpen(false);
    setRefundError(null);
    showToast(`৳${refundAmount.toLocaleString("en-BD")} সঞ্চয় ফেরত অনুমোদন ও প্রক্রিয়া সম্পন্ন হয়েছে`);
  };

  const statusBadge = STATUS_CONFIG[member.status] || STATUS_CONFIG.active;

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "অ্যাডমিন", href: "/admin/dashboard" },
        { label: "সকল সদস্য", href: "/admin/members" },
        { label: member.fullNameBn },
      ]}
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1400px] w-full mx-auto">
        
        {/* Floating Toast */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-900 shadow-2xl dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100 animate-fade-in">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ─── Top Navigation & Actions Bar ─────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/members"
              className="rounded-xl p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-extrabold text-foreground">
                  {member.fullNameBn}
                </h1>
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold", statusBadge.cls)}>
                  {statusBadge.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 font-mono font-medium">
                {member.memberId} • {ROLE_LABELS[member.role] || member.role}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              className="text-xs font-bold shadow-xs bg-emerald-600 hover:bg-emerald-700 text-white"
              leftIcon={<PlusCircle className="h-3.5 w-3.5" />}
              onClick={() => setAddContribOpen(true)}
            >
              চাঁদা জমা (Add Contribution)
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="text-xs font-semibold"
              leftIcon={<RefreshCw className="h-3.5 w-3.5 text-amber-600" />}
              onClick={() => {
                setRefundAmount(Math.min(2000, member.totalSavings ?? 0));
                setRefundOpen(true);
              }}
            >
              সঞ্চয় উত্তোলন (Process Refund)
            </Button>

            <Link href={`/admin/members/${member.id}/edit`}>
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-semibold"
                leftIcon={<Edit className="h-3.5 w-3.5" />}
              >
                সদস্য তথ্য সম্পাদনা (Edit Member)
              </Button>
            </Link>
          </div>
        </div>

        {/* ─── Profile Overview Card ─────────────────────────── */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-border/70">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary font-extrabold text-2xl border-2 border-primary/20 shadow-xs">
                {member.fullNameBn.charAt(0)}
              </div>
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-bold text-foreground">
                  {member.fullNameBn}
                </h2>
                <p className="text-xs text-muted-foreground">{member.fullName}</p>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    {member.phone}
                  </span>
                  {member.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5 text-primary" />
                      {member.email}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {member.village}, {member.upazila}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2 bg-muted/40 p-4 rounded-xl border border-border/60">
              <div className="text-left md:text-right">
                <span className="text-[10px] text-muted-foreground block uppercase tracking-wider font-semibold">
                  যোগদানের তারিখ
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  {formatDate(member.joinDate)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-muted-foreground block uppercase tracking-wider font-semibold">
                  সদস্যপদ স্থায়িত্ব
                </span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  সক্রিয় সদস্য
                </span>
              </div>
            </div>
          </div>

          {/* Extended Member Information Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6 text-xs text-left">
            <div>
              <span className="text-muted-foreground block text-[11px]">পিতার নাম</span>
              <span className="font-semibold text-foreground">{member.fatherName || "—"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">মাতার নাম</span>
              <span className="font-semibold text-foreground">{member.motherName || "—"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">জাতীয় পরিচয়পত্র (NID)</span>
              <span className="font-semibold font-mono text-foreground">{member.nid || "—"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">রক্তের গ্রুপ</span>
              <span className="font-bold text-rose-600 dark:text-rose-400">{member.bloodGroup || "B+"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">পেশা</span>
              <span className="font-semibold text-foreground">{member.occupation || "ব্যবসায়ী"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">পূর্ণ ঠিকানা</span>
              <span className="font-semibold text-foreground truncate block" title={member.address}>
                {member.address}
              </span>
            </div>
          </div>
        </div>

        {/* ─── Financial Summary Cards ───────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Contributions */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">মোট পরিশোধিত চাঁদা</span>
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Wallet className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-foreground mt-2 tabular-nums">
              {formatCurrency(member.totalContributions ?? 6000)}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              মাসিক সঞ্চয় ও উন্নয়ন ফান্ডের সামগ্রিক সমষ্টি
            </p>
          </div>

          {/* Personal Savings (90%) */}
          <div className="rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 p-5 shadow-xs text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                ব্যক্তিগত সঞ্চয় (৯০%)
              </span>
              <div className="h-9 w-9 rounded-xl bg-emerald-200 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                <PiggyBank className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-emerald-900 dark:text-emerald-100 mt-2 tabular-nums">
              {formatCurrency(member.totalSavings ?? 5400)}
            </p>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 font-medium">
              সদস্যের নিজস্ব আমানত (সম্পূর্ণ ফেরতযোগ্য)
            </p>
          </div>

          {/* Development Fund (10%) */}
          <div className="rounded-2xl border border-blue-300 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-950/20 p-5 shadow-xs text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-800 dark:text-blue-300">
                উন্নয়ন তহবিল (১০%)
              </span>
              <div className="h-9 w-9 rounded-xl bg-blue-200 dark:bg-blue-900/60 flex items-center justify-center text-blue-700 dark:text-blue-300">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-blue-900 dark:text-blue-100 mt-2 tabular-nums">
              {formatCurrency(member.totalDevelopmentFund ?? 600)}
            </p>
            <p className="text-[11px] text-blue-700 dark:text-blue-400 mt-1 font-medium">
              সংগঠনের সাধারণ তহবিল (অফেরতযোগ্য)
            </p>
          </div>

          {/* Due / Compliance Status */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">বকেয়া ও কমপ্লায়েন্স</span>
              <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-foreground">
                <Shield className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
              ৳০ (পরিশোধিত)
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              সেপ্টেম্বর ২০২৪ পর্যন্ত কোনো বকেয়া নেই
            </p>
          </div>
        </div>

        {/* ─── Navigation Tabs ───────────────────────────────── */}
        <div className="border-b border-border">
          <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto">
            {[
              { id: "contributions", label: "চাঁদা আদায়ের ইতিহাস", icon: Receipt, count: memberContribs.length },
              { id: "savings", label: "সঞ্চয় বিবরণী (৯০/১০ নীতি)", icon: PiggyBank },
              { id: "transactions", label: "লেনদেন লেজার", icon: Wallet },
              { id: "refunds", label: "সঞ্চয় উত্তোলন ও ফেরত", icon: RefreshCw, count: memberRefunds.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    "flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap",
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="rounded-full bg-muted px-1.5 py-0.2 text-[10px] font-mono">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ─── Tab Content 1: Contributions ──────────────────── */}
        {activeTab === "contributions" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
              <div className="p-4 bg-muted/30 border-b border-border flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-primary" />
                  সদস্যের মাসিক চাঁদা জমাদানের তালিকা
                </h3>
                <span className="text-xs text-muted-foreground">
                  মোট {memberContribs.length}টি রেকর্ড
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-border bg-muted/20 text-muted-foreground font-semibold">
                      <th className="px-4 py-3">মাস ও বছর</th>
                      <th className="px-4 py-3">পরিশোধের তারিখ</th>
                      <th className="px-4 py-3 text-right">জমাকৃত চাঁদা</th>
                      <th className="px-4 py-3 text-right">সঞ্চয় (৯০%)</th>
                      <th className="px-4 py-3 text-right">উন্নয়ন ফান্ড (১০%)</th>
                      <th className="px-4 py-3">মাধ্যম</th>
                      <th className="px-4 py-3 text-center">স্ট্যাটাস</th>
                      <th className="px-4 py-3 text-center">রশিদ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {memberContribs.map((c) => (
                      <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-bold text-foreground">
                          {c.month}/{c.year}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {formatDate(c.paymentDate)}
                        </td>
                        <td className="px-4 py-3 text-right font-extrabold text-foreground tabular-nums">
                          {formatCurrency(c.amount)}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-emerald-700 dark:text-emerald-400 tabular-nums">
                          {formatCurrency(c.savingsAmount)}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-blue-700 dark:text-blue-400 tabular-nums">
                          {formatCurrency(c.developmentAmount)}
                        </td>
                        <td className="px-4 py-3 capitalize text-muted-foreground">
                          {c.paymentMethod === "bkash" ? "বিকাশ" : c.paymentMethod === "nagad" ? "নগদ" : "ক্যাশ"}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 text-[10px] font-bold">
                            পরিশোধিত
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-[11px] text-primary hover:bg-primary/10"
                            onClick={() => showToast(`রশিদ #${c.id} ডাউনলোড প্রস্তুত`)}
                          >
                            <Download className="h-3.5 w-3.5 mr-1" />
                            রশিদ
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── Tab Content 2: Savings Policy Breakdown ───────── */}
        {activeTab === "savings" && (
          <div className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Savings Policy Explanation */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-emerald-600" />
                  ৯০/১০ আর্থিক নীতি এবং বণ্টন বিধান
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ ফাউন্ডেশনের সংবিধান অনুযায়ী, প্রতিটি সাধারণ সদস্যের নিয়মিত মাসিক চাঁদার ৯০% অর্থ তার নিজস্ব নামে সংরক্ষিত থাকে এবং ১০% অর্থ সংগঠনের সাধারণ উন্নয়ন তহবিলে জমা হয়।
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex justify-between items-center text-xs font-bold text-emerald-900 dark:text-emerald-200">
                      <span>ব্যক্তিগত সঞ্চয় অনুপাত</span>
                      <span>৯০%</span>
                    </div>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1">
                      জরুরি প্রয়োজনে বা সদস্যপদ স্বেচ্ছায় ত্যাগকালে নির্দিষ্ট নিয়মাবলী মেনে এই সঞ্চিত আমানত ফেরতযোগ্য।
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                    <div className="flex justify-between items-center text-xs font-bold text-blue-900 dark:text-blue-200">
                      <span>উন্নয়ন তহবিল অনুপাত</span>
                      <span>১০%</span>
                    </div>
                    <p className="text-[11px] text-blue-700 dark:text-blue-400 mt-1">
                      সংগঠনের সামাজিক উন্নয়ন, অফিস খরচ, বৃক্ষরোপণ, চিকিৎসা ক্যাম্পেইন ও জরুরি সেবায় ব্যয়িত হয়।
                    </p>
                  </div>
                </div>
              </div>

              {/* Accumulated Balances Card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  সদস্যের সামগ্রিক সঞ্চয় স্থিতি
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2.5 border-b border-border text-xs">
                    <span className="text-muted-foreground">সর্বমোট জমাকৃত কিস্তি</span>
                    <span className="font-bold text-foreground">{memberContribs.length} টি মাস</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-border text-xs">
                    <span className="text-muted-foreground">বর্তমান উত্তোলনযোগ্য সঞ্চয়</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                      {formatCurrency(member.totalSavings ?? 5400)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-border text-xs">
                    <span className="text-muted-foreground">উন্নয়ন তহবিলে অবদান</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(member.totalDevelopmentFund ?? 600)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 text-xs">
                    <span className="text-muted-foreground">অনুমোদিত পূর্ববর্তী রিফান্ড</span>
                    <span className="font-bold text-slate-600 dark:text-slate-400">
                      {formatCurrency(memberRefunds.reduce((s, r) => s + (r.approvedAmount ?? 0), 0))}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs font-semibold"
                    leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
                    onClick={() => {
                      setRefundAmount(Math.min(2000, member.totalSavings ?? 0));
                      setRefundOpen(true);
                    }}
                  >
                    সঞ্চয় উত্তোলন আবেদন প্রক্রিয়া করুন
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── Tab Content 3: Transactions ───────────────────── */}
        {activeTab === "transactions" && (
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
            <div className="p-4 bg-muted/30 border-b border-border">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Wallet className="h-4 w-4 text-primary" />
                সদস্যের সকল লেনদেন রেজিস্ট্রি
              </h3>
            </div>
            <div className="divide-y divide-border/60 text-xs">
              {memberContribs.map((c) => (
                <div key={c.id} className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
                      <ArrowDownLeft className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">মাসিক চাঁদা জমা — {c.month}/{c.year}</p>
                      <p className="text-[10px] text-muted-foreground">
                        তারিখ: {formatDate(c.paymentDate)} • মাধ্যম: {c.paymentMethod}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-emerald-600 dark:text-emerald-400">
                      +{formatCurrency(c.amount)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">জমা সম্পন্ন</p>
                  </div>
                </div>
              ))}

              {memberRefunds.map((r) => (
                <div key={r.id} className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 flex items-center justify-center">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">সঞ্চয় উত্তোলন — {r.reason}</p>
                      <p className="text-[10px] text-muted-foreground">
                        অনুমোদন তারিখ: {formatDate(r.approvalDate || r.requestDate)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-rose-600 dark:text-rose-400">
                      -{formatCurrency(r.approvedAmount ?? r.requestedAmount)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">উত্তোলন</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Tab Content 4: Refunds ────────────────────────── */}
        {activeTab === "refunds" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
              <div className="p-4 bg-muted/30 border-b border-border flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-primary" />
                  সঞ্চয় ফেরত ও উত্তোলন ইতিহাস
                </h3>
                <Button
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    setRefundAmount(Math.min(2000, member.totalSavings ?? 0));
                    setRefundOpen(true);
                  }}
                >
                  নতুন উত্তোলন
                </Button>
              </div>

              {memberRefunds.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-border bg-muted/20 text-muted-foreground font-semibold">
                        <th className="px-4 py-3">আবেদনের তারিখ</th>
                        <th className="px-4 py-3">উত্তোলনের ধরন</th>
                        <th className="px-4 py-3">কারণ</th>
                        <th className="px-4 py-3 text-right">আবেদনের পরিমাণ</th>
                        <th className="px-4 py-3 text-right">অনুমোদিত পরিমাণ</th>
                        <th className="px-4 py-3 text-center">স্ট্যাটাস</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {memberRefunds.map((r) => (
                        <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 text-foreground font-medium">
                            {formatDate(r.requestDate)}
                          </td>
                          <td className="px-4 py-3 text-foreground font-semibold">
                            {r.refundType === "full_savings" ? "সম্পূর্ণ সঞ্চয় ফেরত" : "আংশিক উত্তোলন"}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">
                            {r.reason}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-foreground">
                            {formatCurrency(r.requestedAmount)}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(r.approvedAmount ?? r.requestedAmount)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 text-[10px] font-bold">
                              অনুমোদিত
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-muted-foreground">
                  এই সদস্যের কোনো সঞ্চয় উত্তোলন বা রিফান্ড রেকর্ড নেই।
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── Modal 1: Add Contribution ─────────────────────── */}
        <Dialog open={addContribOpen} onOpenChange={setAddContribOpen}>
          <DialogContent onClose={() => setAddContribOpen(false)} maxWidth="md">
            <DialogTitle className="text-base font-bold text-foreground flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              চাঁদা জমা করুন — {member.fullNameBn}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              সদস্যের মাসিক চাঁদা গ্রহণ করুন। ৯০% টাকা সদস্যের সঞ্চয়ে এবং ১০% টাকা উন্নয়ন তহবিলে স্বয়ংক্রিয়ভাবে ভাগ হবে।
            </DialogDescription>

            <div className="space-y-4 pt-4 text-left">
              {/* Month & Amount */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">মাস ও বছর</label>
                  <input
                    type="text"
                    value={contribMonth}
                    onChange={(e) => setContribMonth(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">চাঁদার পরিমাণ (৳)</label>
                  <input
                    type="number"
                    value={contribAmount}
                    onChange={(e) => setContribAmount(Number(e.target.value))}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              {/* Breakdown Preview */}
              <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-1.5 text-xs">
                <p className="font-semibold text-foreground text-[11px]">স্বয়ংক্রিয় ৯০/১০ বণ্টন:</p>
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                  <span>সদস্য সঞ্চয় (৯০%):</span>
                  <span className="font-bold">৳{Math.round(contribAmount * 0.9).toLocaleString("en-BD")}</span>
                </div>
                <div className="flex justify-between text-blue-700 dark:text-blue-400">
                  <span>উন্নয়ন তহবিল (১০%):</span>
                  <span className="font-bold">৳{Math.round(contribAmount * 0.1).toLocaleString("en-BD")}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">পরিশোধের মাধ্যম</label>
                <select
                  value={contribMethod}
                  onChange={(e) => setContribMethod(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="bkash">বিকাশ (bKash)</option>
                  <option value="nagad">নগদ (Nagad)</option>
                  <option value="cash">নগদ ক্যাশ (Cash)</option>
                  <option value="bank_transfer">ব্যাংক অ্যাকাউন্ট</option>
                </select>
              </div>

              {/* Trx ID */}
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">লেনদেন ট্রানজ্যাকশন আইডি (ঐচ্ছিক)</label>
                <input
                  type="text"
                  placeholder="যেমন: BK92810334"
                  value={contribTrx}
                  onChange={(e) => setContribTrx(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono"
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" size="sm" onClick={() => setAddContribOpen(false)}>
                বাতিল
              </Button>
              <Button size="sm" className="font-bold bg-primary text-white" onClick={handleSaveContribution}>
                চাঁদা নিশ্চিত ও সংরক্ষণ করুন
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ─── Modal 2: Process Refund ───────────────────────── */}
        <Dialog open={refundOpen} onOpenChange={setRefundOpen}>
          <DialogContent onClose={() => setRefundOpen(false)} maxWidth="md">
            <DialogTitle className="text-base font-bold text-foreground flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-amber-600" />
              সঞ্চয় উত্তোলন / রিফান্ড প্রক্রিয়া
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              সদস্যের সঞ্চয় হিসাব থেকে অর্থ উত্তোলন প্রক্রিয়া করুন।
            </DialogDescription>

            <div className="space-y-4 pt-4 text-left">
              {/* Max Available Savings Alert */}
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-emerald-800 dark:text-emerald-200 font-semibold">
                    বর্তমান মোট ব্যক্তিগত সঞ্চয়:
                  </span>
                  <span className="font-extrabold text-emerald-900 dark:text-emerald-100">
                    {formatCurrency(member.totalSavings ?? 5400)}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  * সংগঠনের ১০% উন্নয়ন তহবিল অফেরতযোগ্য বিধায় উত্তোলনের আওতাভুক্ত নয়।
                </p>
              </div>

              {/* Refund Type */}
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">উত্তোলনের ধরন</label>
                <select
                  value={refundType}
                  onChange={(e) => setRefundType(e.target.value as typeof refundType)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="partial_savings">আংশিক সঞ্চয় উত্তোলন (Partial Savings Withdrawal)</option>
                  <option value="full_savings">সম্পূর্ণ সঞ্চয় ফেরত (Full Refund - পদত্যাগজনিত)</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">টাকার পরিমাণ (৳)</label>
                <input
                  type="number"
                  value={refundAmount}
                  onChange={(e) => {
                    setRefundAmount(Number(e.target.value));
                    setRefundError(null);
                  }}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {refundError && (
                  <p className="text-[11px] text-rose-500 font-semibold mt-1">{refundError}</p>
                )}
              </div>

              {/* Reason */}
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">উত্তোলনের কারণ</label>
                <input
                  type="text"
                  placeholder="যেমন: চিকিৎসা ব্যয় / পারিবারিক জরুরি প্রয়োজন"
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" size="sm" onClick={() => setRefundOpen(false)}>
                বাতিল
              </Button>
              <Button size="sm" className="font-bold bg-amber-600 hover:bg-amber-700 text-white" onClick={handleProcessRefund}>
                অনুমোদন ও পরিশোধ সম্পন্ন করুন
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </AdminLayout>
  );
}
