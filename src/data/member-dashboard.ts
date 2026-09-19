// ============================================================
// Member Dashboard Mock Data — Abu Saiyed (KCYW-00125)
// খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// ============================================================

export const MEMBER_DASHBOARD_DATA = {
  // ── Member Identity ────────────────────────────────────────
  memberId: "KCYW-00125",
  memberName: "আবু সাইয়েদ",
  memberNameFull: "আবু সাইয়েদ জয়",
  status: "active" as const,
  joinedDate: "2021-10-01",

  // ── Summary Stats ──────────────────────────────────────────
  totalContribution: 6000,     // 60 months × ৳100
  personalSavings: 5400,       // 90% of total
  developmentAllocation: 600,  // 10% of total
  paidMonths: 60,
  totalMonths: 60,

  // ── Current Month ──────────────────────────────────────────
  currentMonth: {
    month: "সেপ্টেম্বর",
    year: 2026,
    monthNumber: 9,
    status: "paid" as const,
    amount: 100,
    savingsAmount: 90,
    developmentAmount: 10,
    paymentDate: "2026-09-18",
  },

  // ── Savings Overview ──────────────────────────────────────
  savingsOverview: {
    totalContribution: 6000,
    personalSavings: 5400,
    developmentAllocation: 600,
    refunded: 0,
    currentSavings: 5400,
  },

  // ── Recent Contributions (last 6) ─────────────────────────
  recentContributions: [
    {
      id: "mc060",
      month: "সেপ্টেম্বর",
      monthNumber: 9,
      year: 2026,
      paymentDate: "2026-09-18",
      amount: 100,
      savingsAmount: 90,
      developmentAmount: 10,
      status: "paid" as const,
    },
    {
      id: "mc059",
      month: "আগস্ট",
      monthNumber: 8,
      year: 2026,
      paymentDate: "2026-08-12",
      amount: 100,
      savingsAmount: 90,
      developmentAmount: 10,
      status: "paid" as const,
    },
    {
      id: "mc058",
      month: "জুলাই",
      monthNumber: 7,
      year: 2026,
      paymentDate: "2026-07-09",
      amount: 100,
      savingsAmount: 90,
      developmentAmount: 10,
      status: "paid" as const,
    },
    {
      id: "mc057",
      month: "জুন",
      monthNumber: 6,
      year: 2026,
      paymentDate: "2026-06-07",
      amount: 100,
      savingsAmount: 90,
      developmentAmount: 10,
      status: "paid" as const,
    },
    {
      id: "mc056",
      month: "মে",
      monthNumber: 5,
      year: 2026,
      paymentDate: "2026-05-11",
      amount: 100,
      savingsAmount: 90,
      developmentAmount: 10,
      status: "paid" as const,
    },
    {
      id: "mc055",
      month: "এপ্রিল",
      monthNumber: 4,
      year: 2026,
      paymentDate: "2026-04-08",
      amount: 100,
      savingsAmount: 90,
      developmentAmount: 10,
      status: "paid" as const,
    },
  ],

  // ── Organization Financial Overview ───────────────────────
  orgFinancialOverview: {
    totalCollection: 72600,     // 60 months × 25 active members avg × ৳100 approx
    memberSavings: 65340,       // 90% of 72600
    developmentFund: 7260,      // 10% of 72600
    developmentExpenses: 5910,
    availableDevelopmentFund: 1350,
  },

  // ── Monthly Chart (last 6 months) ─────────────────────────
  monthlyChartData: [
    { month: "এপ্রিল", collection: 2500, expense: 1200, year: 2026 },
    { month: "মে", collection: 2500, expense: 850, year: 2026 },
    { month: "জুন", collection: 2400, expense: 2200, year: 2026 },
    { month: "জুলাই", collection: 2500, expense: 0, year: 2026 },
    { month: "আগস্ট", collection: 2500, expense: 650, year: 2026 },
    { month: "সেপ্টেম্বর", collection: 2500, expense: 1010, year: 2026 },
  ],
} as const;

export type MemberDashboardData = typeof MEMBER_DASHBOARD_DATA;
