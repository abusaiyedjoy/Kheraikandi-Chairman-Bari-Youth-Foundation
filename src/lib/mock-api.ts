// ============================================================
// Mock API Layer — খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// Typed async service functions with simulated latency.
// Replace the implementation body to swap in a real API later.
// ============================================================

import { delay } from "./utils";
import { MEMBERS } from "@/data/members";
import { CONTRIBUTIONS } from "@/data/contributions";
import { TRANSACTIONS } from "@/data/transactions";
import { EXPENSES } from "@/data/expenses";
import { INCOMES } from "@/data/incomes";
import { INVESTMENTS, INVESTMENT_PROFITS } from "@/data/investments";
import { REFUNDS } from "@/data/refunds";
import { ACTIVITIES } from "@/data/activities";
import { NOTICES } from "@/data/notices";
import { DASHBOARD_SUMMARY, MONTHLY_CONTRIBUTION_CHART_DATA, EXPENSE_CATEGORY_CHART_DATA, INVESTMENT_CHART_DATA, BALANCE_TREND_DATA } from "@/data/dashboard";

import type { Member } from "@/types/member";
import type {
  Contribution,
  Transaction,
  Expense,
  Income,
  Investment,
  InvestmentProfit,
  Refund,
  DashboardSummary,
} from "@/types/finance";
import type { SocialActivity } from "@/types/activity";
import type { Notice } from "@/types/notice";

// ─── Simulated latency (ms) ───────────────────────────────────
const MOCK_DELAY = 80;

// ─── Error wrapper ────────────────────────────────────────────
class ApiError extends Error {
  constructor(message: string, public status: number = 500) {
    super(message);
    this.name = "ApiError";
  }
}

// ─── Members API ──────────────────────────────────────────────

export async function getMembers(): Promise<Member[]> {
  await delay(MOCK_DELAY);
  return [...MEMBERS];
}

export async function getMemberById(id: string): Promise<Member> {
  await delay(MOCK_DELAY);
  const member = MEMBERS.find((m) => m.id === id);
  if (!member) throw new ApiError(`Member with id "${id}" not found.`, 404);
  return { ...member };
}

export async function getMembersByStatus(status: Member["status"]): Promise<Member[]> {
  await delay(MOCK_DELAY);
  return MEMBERS.filter((m) => m.status === status);
}

export async function getMembersByRole(role: Member["role"]): Promise<Member[]> {
  await delay(MOCK_DELAY);
  return MEMBERS.filter((m) => m.role === role);
}

// ─── Contributions API ────────────────────────────────────────

export async function getContributions(): Promise<Contribution[]> {
  await delay(MOCK_DELAY);
  return [...CONTRIBUTIONS].sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime());
}

export async function getContributionsByMember(memberId: string): Promise<Contribution[]> {
  await delay(MOCK_DELAY);
  return CONTRIBUTIONS.filter((c) => c.memberId === memberId)
    .sort((a, b) => b.year - a.year || b.month - a.month);
}

export async function getContributionsByMonth(year: number, month: number): Promise<Contribution[]> {
  await delay(MOCK_DELAY);
  return CONTRIBUTIONS.filter((c) => c.year === year && c.month === month);
}

export async function getContributionSummary() {
  await delay(MOCK_DELAY);
  const paid = CONTRIBUTIONS.filter((c) => c.status === "paid");
  const pending = CONTRIBUTIONS.filter((c) => c.status === "pending");
  const overdue = CONTRIBUTIONS.filter((c) => c.status === "overdue");
  return {
    totalRecords: CONTRIBUTIONS.length,
    totalPaid: paid.length,
    totalPending: pending.length,
    totalOverdue: overdue.length,
    totalCollected: paid.reduce((s, c) => s + c.amount, 0),
    totalSavingsAccrued: paid.reduce((s, c) => s + c.savingsAmount, 0),
    totalDevelopmentAccrued: paid.reduce((s, c) => s + c.developmentAmount, 0),
  };
}

// ─── Transactions API ─────────────────────────────────────────

export async function getTransactions(): Promise<Transaction[]> {
  await delay(MOCK_DELAY);
  return [...TRANSACTIONS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getTransactionsByType(type: "income" | "expense"): Promise<Transaction[]> {
  await delay(MOCK_DELAY);
  return TRANSACTIONS.filter((t) => t.type === type)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getRecentTransactions(limit = 10): Promise<Transaction[]> {
  await delay(MOCK_DELAY);
  return [...TRANSACTIONS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

// ─── Expenses API ─────────────────────────────────────────────

export async function getExpenses(): Promise<Expense[]> {
  await delay(MOCK_DELAY);
  return [...EXPENSES].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getExpensesByCategory(category: Expense["category"]): Promise<Expense[]> {
  await delay(MOCK_DELAY);
  return EXPENSES.filter((e) => e.category === category);
}

// ─── Incomes API ──────────────────────────────────────────────

export async function getIncomes(): Promise<Income[]> {
  await delay(MOCK_DELAY);
  return [...INCOMES].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ─── Investments API ──────────────────────────────────────────

export async function getInvestments(): Promise<Investment[]> {
  await delay(MOCK_DELAY);
  return [...INVESTMENTS];
}

export async function getInvestmentById(id: string): Promise<Investment> {
  await delay(MOCK_DELAY);
  const investment = INVESTMENTS.find((i) => i.id === id);
  if (!investment) throw new ApiError(`Investment with id "${id}" not found.`, 404);
  return { ...investment };
}

export async function getInvestmentProfits(): Promise<InvestmentProfit[]> {
  await delay(MOCK_DELAY);
  return [...INVESTMENT_PROFITS].sort((a, b) => new Date(b.profitDate).getTime() - new Date(a.profitDate).getTime());
}

// ─── Refunds API ──────────────────────────────────────────────

export async function getRefunds(): Promise<Refund[]> {
  await delay(MOCK_DELAY);
  return [...REFUNDS].sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
}

export async function getRefundsByMember(memberId: string): Promise<Refund[]> {
  await delay(MOCK_DELAY);
  return REFUNDS.filter((r) => r.memberId === memberId);
}

export async function getPendingRefunds(): Promise<Refund[]> {
  await delay(MOCK_DELAY);
  return REFUNDS.filter((r) => r.status === "pending");
}

// ─── Activities API ───────────────────────────────────────────

export async function getActivities(): Promise<SocialActivity[]> {
  await delay(MOCK_DELAY);
  return [...ACTIVITIES].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}

export async function getActivityById(id: string): Promise<SocialActivity> {
  await delay(MOCK_DELAY);
  const activity = ACTIVITIES.find((a) => a.id === id);
  if (!activity) throw new ApiError(`Activity with id "${id}" not found.`, 404);
  return { ...activity };
}

export async function getUpcomingActivities(): Promise<SocialActivity[]> {
  await delay(MOCK_DELAY);
  return ACTIVITIES.filter((a) => a.status === "upcoming");
}

// ─── Notices API ──────────────────────────────────────────────

export async function getNotices(): Promise<Notice[]> {
  await delay(MOCK_DELAY);
  return [...NOTICES].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  });
}

export async function getNoticeById(id: string): Promise<Notice> {
  await delay(MOCK_DELAY);
  const notice = NOTICES.find((n) => n.id === id);
  if (!notice) throw new ApiError(`Notice with id "${id}" not found.`, 404);
  return { ...notice };
}

export async function getActiveNotices(): Promise<Notice[]> {
  await delay(MOCK_DELAY);
  const today = new Date().toISOString().split("T")[0];
  return NOTICES.filter((n) => !n.expiresDate || n.expiresDate >= today)
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    });
}

export async function getNoticesByCategory(category: Notice["category"]): Promise<Notice[]> {
  await delay(MOCK_DELAY);
  return NOTICES.filter((n) => n.category === category);
}

// ─── Dashboard API ────────────────────────────────────────────

export async function getDashboardSummary(): Promise<DashboardSummary> {
  await delay(MOCK_DELAY);
  return { ...DASHBOARD_SUMMARY };
}

export async function getMonthlyContributionChartData() {
  await delay(MOCK_DELAY);
  return [...MONTHLY_CONTRIBUTION_CHART_DATA];
}

export async function getExpenseCategoryChartData() {
  await delay(MOCK_DELAY);
  return [...EXPENSE_CATEGORY_CHART_DATA];
}

export async function getInvestmentChartData() {
  await delay(MOCK_DELAY);
  return [...INVESTMENT_CHART_DATA];
}

export async function getBalanceTrendData() {
  await delay(MOCK_DELAY);
  return [...BALANCE_TREND_DATA];
}
