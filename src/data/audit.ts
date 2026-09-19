// ============================================================
// Mock Audit Log Data — খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// ============================================================

import { AuditLog, AuditAction, AuditEntityType } from "@/types/audit";

export const ACTION_LABELS: Record<AuditAction, { label: string; color: string }> = {
  member_created: { label: "সদস্য নিবন্ধন", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  member_updated: { label: "সদস্য তথ্য আপডেট", color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
  member_deleted: { label: "সদস্য বাতিল", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300" },
  member_suspended: { label: "সদস্যপদ স্থগিত", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
  member_activated: { label: "সদস্যপদ সক্রিয়", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  contribution_recorded: { label: "চাঁদা এন্ট্রি", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  contribution_updated: { label: "চাঁদা সংশোধন", color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
  expense_created: { label: "ব্যয় আবেদন", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300" },
  expense_approved: { label: "ব্যয় অনুমোদন", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  income_recorded: { label: "আয় রেকর্ড", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  investment_created: { label: "বিনিয়োগ তৈরি", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300" },
  investment_updated: { label: "বিনিয়োগ হালনাগাদ", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  refund_requested: { label: "সঞ্চয় ফেরত আবেদন", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
  refund_approved: { label: "সঞ্চয় ফেরত অনুমোদন", color: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300" },
  refund_paid: { label: "সঞ্চয় পরিশোধ", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  notice_published: { label: "নোটিশ প্রকাশ", color: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300" },
  notice_deleted: { label: "নোটিশ অপসারণ", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300" },
  activity_created: { label: "কার্যক্রম যোগ", color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
  activity_updated: { label: "কার্যক্রম আপডেট", color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
  login: { label: "লগইন", color: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" },
  logout: { label: "লগআউট", color: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" },
  settings_changed: { label: "সেটিংস পরিবর্তন", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300" },
  report_generated: { label: "প্রতিবেদন ডাউনলোড", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
};

export const ENTITY_LABELS: Record<AuditEntityType, string> = {
  member: "সদস্য",
  contribution: "চাঁদা",
  expense: "ব্যয়",
  income: "আয়",
  investment: "বিনিয়োগ",
  refund: "ফেরত",
  notice: "নোটিশ",
  activity: "কার্যক্রম",
  system: "সিস্টেম",
};

export const AUDIT_LOGS: AuditLog[] = [
  {
    id: "audit-001",
    action: "contribution_recorded",
    entityType: "contribution",
    entityId: "cnt-sep-001",
    entityLabel: "মাসিক চাঁদা — আবু সাইয়েদ (সেপ্টেম্বর ২০২৪)",
    performedBy: "KCYW-00003",
    performedByName: "মোহাম্মদ তারেক (কোষাধ্যক্ষ)",
    timestamp: "2024-09-08T14:32:00Z",
    ipAddress: "103.145.78.22",
    changes: {
      amount: { before: null, after: 500 },
      savingsAmount: { before: null, after: 450 },
      developmentAmount: { before: null, after: 50 },
      status: { before: "pending", after: "paid" },
    },
    metadata: { method: "bkash", trxId: "BK99281044" },
  },
  {
    id: "audit-002",
    action: "expense_approved",
    entityType: "expense",
    entityId: "exp-001",
    entityLabel: "বার্ষিক ক্রীড়া প্রতিযোগিতা ব্যানার ও মেডেল",
    performedBy: "KCYW-00001",
    performedByName: "মাওলানা আব্দুর রহমান (সভাপতি)",
    timestamp: "2024-09-07T11:20:00Z",
    ipAddress: "103.145.78.15",
    changes: {
      status: { before: "pending", after: "approved" },
      approvedAmount: { before: 0, after: 8500 },
    },
    metadata: { category: "অনুষ্ঠান", invoiceNo: "INV-2024-041" },
  },
  {
    id: "audit-003",
    action: "notice_published",
    entityType: "notice",
    entityId: "not-001",
    entityLabel: "মাসিক সাধারণ সভা ও সেপ্টেম্বর মাসের চাঁদা জমাদান প্রসঙ্গে",
    performedBy: "KCYW-00002",
    performedByName: "ইঞ্জি. মো. শফিকুল ইসলাম (সাধারণ সম্পাদক)",
    timestamp: "2024-09-05T09:15:00Z",
    ipAddress: "103.145.79.04",
    changes: {
      isPinned: { before: false, after: true },
      status: { before: "draft", after: "published" },
    },
    metadata: { targetAudience: "সকল সদস্য" },
  },
  {
    id: "audit-004",
    action: "member_activated",
    entityType: "member",
    entityId: "KCYW-00125",
    entityLabel: "আবু সাইয়েদ (সদস্য অনুমোদন)",
    performedBy: "KCYW-00001",
    performedByName: "মাওলানা আব্দুর রহমান (সভাপতি)",
    timestamp: "2024-09-04T16:45:00Z",
    ipAddress: "103.145.78.15",
    changes: {
      status: { before: "pending", after: "active" },
    },
    metadata: { joiningFee: 500, verifiedPhone: "+880 1711-223344" },
  },
  {
    id: "audit-005",
    action: "investment_updated",
    entityType: "investment",
    entityId: "inv-002",
    entityLabel: "মৌসুমি শস্য গুদামজাতকরণ বিনিয়োগ লাভ বণ্টন",
    performedBy: "KCYW-00003",
    performedByName: "মোহাম্মদ তারেক (কোষাধ্যক্ষ)",
    timestamp: "2024-09-02T10:00:00Z",
    ipAddress: "103.145.78.22",
    changes: {
      currentValue: { before: 60000, after: 68500 },
      profitRealized: { before: 0, after: 8500 },
    },
    metadata: { returnRate: "14.16%", creditedTo: "General Fund" },
  },
  {
    id: "audit-006",
    action: "refund_approved",
    entityType: "refund",
    entityId: "ref-002",
    entityLabel: "সঞ্চয় ফেরত আবেদন — মো. রফিকুল হাসান",
    performedBy: "KCYW-00001",
    performedByName: "মাওলানা আব্দুর রহমান (সভাপতি)",
    timestamp: "2024-08-30T15:30:00Z",
    ipAddress: "103.145.78.15",
    changes: {
      status: { before: "pending", after: "approved" },
      deductionAmount: { before: 0, after: 0 },
      approvedAmount: { before: 0, after: 4000 },
    },
    metadata: { reason: "জরুরি পারিবারিক প্রয়োজন", refundMode: "bank" },
  },
  {
    id: "audit-007",
    action: "income_recorded",
    entityType: "income",
    entityId: "inc-003",
    entityLabel: "প্রবাসীদের অনুদান — হাজী কফিল উদ্দিন",
    performedBy: "KCYW-00003",
    performedByName: "মোহাম্মদ তারেক (কোষাধ্যক্ষ)",
    timestamp: "2024-08-25T17:10:00Z",
    ipAddress: "103.145.78.22",
    changes: {
      amount: { before: null, after: 20000 },
      category: { before: null, after: "donation" },
    },
    metadata: { donorLocation: "দুবাই, সংযুক্ত আরব আমিরাত" },
  },
  {
    id: "audit-008",
    action: "activity_created",
    entityType: "activity",
    entityId: "act-004",
    entityLabel: "বিনামূল্যে রক্তদান ও স্বাস্থ্য পরীক্ষা ক্যাম্পেইন",
    performedBy: "KCYW-00002",
    performedByName: "ইঞ্জি. মো. শফিকুল ইসলাম (সাধারণ সম্পাদক)",
    timestamp: "2024-08-20T12:00:00Z",
    ipAddress: "103.145.79.04",
    changes: {
      status: { before: null, after: "upcoming" },
      budget: { before: null, after: 15000 },
    },
    metadata: { location: "খিরাইকান্দি সরকারি প্রাথমিক বিদ্যালয় মাঠ" },
  },
  {
    id: "audit-009",
    action: "settings_changed",
    entityType: "system",
    entityLabel: "আর্থিক সঞ্চয় নীতি ও ব্যাকআপ কনফিগারেশন",
    performedBy: "KCYW-00001",
    performedByName: "মাওলানা আব্দুর রহমান (সভাপতি)",
    timestamp: "2024-08-15T18:40:00Z",
    ipAddress: "103.145.78.15",
    changes: {
      autoBackup: { before: "weekly", after: "daily" },
      smsNotification: { before: false, after: true },
    },
    metadata: { module: "system_settings" },
  },
  {
    id: "audit-010",
    action: "report_generated",
    entityType: "system",
    entityLabel: "২০২৪ অর্থবছরের অর্ধবার্ষিক অডিট প্রতিবেদন তৈরি",
    performedBy: "KCYW-00003",
    performedByName: "মোহাম্মদ তারেক (কোষাধ্যক্ষ)",
    timestamp: "2024-08-10T11:05:00Z",
    ipAddress: "103.145.78.22",
    changes: {},
    metadata: { reportFormat: "PDF", range: "2024-01-01 to 2024-06-30" },
  },
  {
    id: "audit-011",
    action: "member_suspended",
    entityType: "member",
    entityId: "KCYW-00042",
    entityLabel: "মো. নাজমুল হুদা (পরপর ৪ মাস চাঁদা বকেয়া)",
    performedBy: "KCYW-00001",
    performedByName: "মাওলানা আব্দুর রহমান (সভাপতি)",
    timestamp: "2024-08-05T14:15:00Z",
    ipAddress: "103.145.78.15",
    changes: {
      status: { before: "active", after: "suspended" },
    },
    metadata: { warningNoticeCount: 2 },
  },
  {
    id: "audit-012",
    action: "login",
    entityType: "system",
    entityLabel: "অ্যাডমিন প্যানেলে সফল লগইন",
    performedBy: "KCYW-00003",
    performedByName: "মোহাম্মদ তারেক (কোষাধ্যক্ষ)",
    timestamp: "2024-08-01T08:30:00Z",
    ipAddress: "103.145.78.22",
    changes: {},
    metadata: { browser: "Chrome 128 on macOS", authMethod: "password" },
  },
];

export function getAuditLogs(): AuditLog[] {
  return AUDIT_LOGS;
}

export function getAuditLogsByEntity(entityType: AuditEntityType): AuditLog[] {
  return AUDIT_LOGS.filter((log) => log.entityType === entityType);
}

export function getRecentAuditLogs(limit: number = 5): AuditLog[] {
  return [...AUDIT_LOGS]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}
