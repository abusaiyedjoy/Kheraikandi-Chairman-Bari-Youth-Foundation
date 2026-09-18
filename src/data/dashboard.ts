// ============================================================
// Dashboard Summary Data
// খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// ============================================================

import { DashboardSummary } from "@/types/finance";
import { MEMBERS } from "./members";
import { CONTRIBUTIONS, getPaidContributions, getPendingContributions, getOverdueContributions } from "./contributions";
import { EXPENSES, getTotalExpenses } from "./expenses";
import { INCOMES, getTotalIncome } from "./incomes";
import { INVESTMENTS, INVESTMENT_PROFITS, getActiveInvestments, getTotalProfits } from "./investments";

// ─── Monthly contribution data for charts (last 9 months) ─────
export const MONTHLY_CONTRIBUTION_CHART_DATA = [
  { month: "জানুয়ারি", collected: 2200, expected: 2500, year: 2024 },
  { month: "ফেব্রুয়ারি", collected: 2500, expected: 2500, year: 2024 },
  { month: "মার্চ", collected: 2400, expected: 2500, year: 2024 },
  { month: "এপ্রিল", collected: 2500, expected: 2500, year: 2024 },
  { month: "মে", collected: 2300, expected: 2500, year: 2024 },
  { month: "জুন", collected: 2500, expected: 2500, year: 2024 },
  { month: "জুলাই", collected: 2200, expected: 2500, year: 2024 },
  { month: "আগস্ট", collected: 2400, expected: 2500, year: 2024 },
  { month: "সেপ্টেম্বর", collected: 2500, expected: 2500, year: 2024 },
];

// ─── Expense breakdown for pie chart ─────────────────────────
export const EXPENSE_CATEGORY_CHART_DATA = [
  { category: "কল্যাণ", amount: 25000, fill: "#166534" },
  { category: "অনুষ্ঠান", amount: 21300, fill: "#22C55E" },
  { category: "জরুরি", amount: 19500, fill: "#D4A72C" },
  { category: "অফিস", amount: 1200, fill: "#64748b" },
  { category: "রক্ষণাবেক্ষণ", amount: 2950, fill: "#0891b2" },
  { category: "প্রশাসনিক", amount: 3450, fill: "#7c3aed" },
];

// ─── Investment portfolio for bar chart ──────────────────────
export const INVESTMENT_CHART_DATA = INVESTMENTS.map((inv) => ({
  name: inv.title.length > 12 ? inv.title.substring(0, 12) + "…" : inv.title,
  fullName: inv.title,
  invested: inv.investedAmount,
  currentValue: inv.currentValue ?? inv.investedAmount,
}));

// ─── Balance trend (last 6 months) ───────────────────────────
export const BALANCE_TREND_DATA = [
  { month: "এপ্রিল", balance: 113560 },
  { month: "মে", balance: 110760 },
  { month: "জুন", balance: 162960 },
  { month: "জুলাই", balance: 315410 },
  { month: "আগস্ট", balance: 196260 },
  { month: "সেপ্টেম্বর", balance: 176560 },
];

// ─── Compute dashboard summary ────────────────────────────────
export function computeDashboardSummary(): DashboardSummary {
  const activeMembers = MEMBERS.filter((m) => m.status === "active").length;
  const totalSavings = MEMBERS.reduce((s, m) => s + (m.totalSavings ?? 0), 0);
  const totalDevelopmentFund = MEMBERS.reduce((s, m) => s + (m.totalDevelopmentFund ?? 0), 0);
  const totalInvestedAmount = getActiveInvestments().reduce((s, i) => s + i.investedAmount, 0);

  return {
    totalMembers: MEMBERS.length,
    activeMembers,
    totalSavings,
    totalDevelopmentFund,
    totalInvestments: totalInvestedAmount,
    totalIncome: getTotalIncome(),
    totalExpenses: getTotalExpenses(),
    currentBalance: 176560, // latest balance from transactions
    thisMonthContributions: getPaidContributions().filter(
      (c) => c.year === 2024 && c.month === 9
    ).length,
    pendingContributions: getPendingContributions().length,
    overdueContributions: getOverdueContributions().length,
    investmentProfits: getTotalProfits(),
    lastUpdated: new Date().toISOString(),
  };
}

export const DASHBOARD_SUMMARY = computeDashboardSummary();
