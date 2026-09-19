// ============================================================
// Member Portal Mock Data — Abu Saiyed (KCYW-00125)
// খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// ============================================================

export interface MemberProfileData {
  id: string;
  memberId: string;
  name: string;
  nameEn: string;
  avatar: string;
  phone: string;
  email: string;
  address: string;
  permanentAddress: string;
  village: string;
  postOffice: string;
  upazila: string;
  district: string;
  joiningDate: string;
  joiningDateFormatted: string;
  status: "active" | "inactive" | "pending";
  statusBn: string;
  role: string;
  bloodGroup: string;
  dateOfBirth: string;
  nid: string;
  occupation: string;
  fatherName: string;
  motherName: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  security: {
    passwordLastChanged: string;
    twoFactorEnabled: boolean;
    lastLogin: string;
    activeDevice: string;
  };
}

export const MEMBER_PROFILE: MemberProfileData = {
  id: "m025",
  memberId: "KCYW-00125",
  name: "আবু সাইয়েদ জয়",
  nameEn: "Abu Saiyed Joy",
  avatar: "/images/avatars/member-joy.png",
  phone: "01712-345678",
  email: "abu.saiyed.joy@gmail.com",
  address: "চেয়ারম্যান বাড়ি, খিরাইকান্দি, শিবপুর, নরসিংদী",
  permanentAddress: "চেয়ারম্যান বাড়ি, খিরাইকান্দি, শিবপুর, নরসিংদী",
  village: "খিরাইকান্দি",
  postOffice: "খিরাইকান্দি",
  upazila: "শিবপুর",
  district: "নরসিংদী",
  joiningDate: "2021-10-01",
  joiningDateFormatted: "০১ অক্টোবর ২০২১",
  status: "active",
  statusBn: "সক্রিয়",
  role: "স্থায়ী সাধারণ সদস্য",
  bloodGroup: "B+",
  dateOfBirth: "1996-05-14",
  nid: "19961234567890123",
  occupation: "সফটওয়্যার প্রকৌশলী",
  fatherName: "মো. আবদুল খালেক",
  motherName: "মোসা. সুফিয়া বেগম",
  emergencyContact: {
    name: "মো. শামীম আহমেদ",
    relation: "ভাই",
    phone: "01812-345678",
  },
  security: {
    passwordLastChanged: "১০ আগস্ট ২০২৬",
    twoFactorEnabled: false,
    lastLogin: "১৯ সেপ্টেম্বর ২০২৬, সকাল ১০:২৪",
    activeDevice: "Chrome on macOS (বর্তমান সেশন)",
  },
};

// ── 60 Months Contributions Generator ────────────────────────
export interface MemberContributionRecord {
  id: string;
  month: string;
  monthNumber: number;
  year: number;
  paymentDate: string;
  amount: number;
  savingsAmount: number;
  developmentAmount: number;
  paymentMethod: "bKash" | "Nagad" | "Cash" | "Bank Transfer";
  paymentMethodBn: string;
  status: "paid" | "pending" | "overdue";
  receiptNo: string;
  collectedBy: string;
  remarks?: string;
}

const BN_MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
];

const PAYMENT_METHODS: Array<{ method: "bKash" | "Nagad" | "Cash" | "Bank Transfer"; bn: string }> = [
  { method: "bKash", bn: "বিকাশ" },
  { method: "Nagad", bn: "নগদ" },
  { method: "Cash", bn: "নগদ গ্রহণ" },
  { method: "Bank Transfer", bn: "ব্যাংক স্থানান্তর" },
];

function generateContributions(): MemberContributionRecord[] {
  const records: MemberContributionRecord[] = [];
  let counter = 60;

  // From Oct 2021 (month index 9) to Sep 2026 (month index 8) = exactly 60 months
  const startYear = 2021;
  const startMonth = 10; // October
  const endYear = 2026;
  const endMonth = 9; // September

  for (let y = endYear; y >= startYear; y--) {
    const mMax = y === endYear ? endMonth : 12;
    const mMin = y === startYear ? startMonth : 1;

    for (let m = mMax; m >= mMin; m--) {
      const monthStr = String(m).padStart(2, "0");
      const day = ((counter * 7) % 20) + 5;
      const dayStr = String(day).padStart(2, "0");
      const method = PAYMENT_METHODS[counter % PAYMENT_METHODS.length];

      records.push({
        id: `mc-${String(counter).padStart(3, "0")}`,
        month: BN_MONTHS[m - 1],
        monthNumber: m,
        year: y,
        paymentDate: `${y}-${monthStr}-${dayStr}`,
        amount: 100,
        savingsAmount: 90,
        developmentAmount: 10,
        paymentMethod: method.method,
        paymentMethodBn: method.bn,
        status: "paid",
        receiptNo: `REC-${y}${monthStr}-${String(counter).padStart(3, "0")}`,
        collectedBy: "মো. আব্দুর রহমান (কোষাধ্যক্ষ)",
        remarks: "নিয়মিত মাসিক চাঁদা",
      });

      counter--;
    }
  }

  return records;
}

export const MEMBER_CONTRIBUTIONS: MemberContributionRecord[] = generateContributions();

// ── Member Savings Summary & Chart ───────────────────────────
export interface SavingsSummaryData {
  totalContribution: number;
  personalSavings: number;
  developmentAllocation: number;
  refunded: number;
  currentSavings: number;
  savingsRate: number; // 90
  developmentRate: number; // 10
}

export const MEMBER_SAVINGS_SUMMARY: SavingsSummaryData = {
  totalContribution: 6000,
  personalSavings: 5400,
  developmentAllocation: 600,
  refunded: 0,
  currentSavings: 5400,
  savingsRate: 90,
  developmentRate: 10,
};

// 12-month savings growth curve for chart
export const MEMBER_SAVINGS_CHART_DATA = [
  { period: "অক্টোবর ২৫", contribution: 100, savings: 90, cumulativeSavings: 4410, development: 10 },
  { period: "নভেম্বর ২৫", contribution: 100, savings: 90, cumulativeSavings: 4500, development: 10 },
  { period: "ডিসেম্বর ২৫", contribution: 100, savings: 90, cumulativeSavings: 4590, development: 10 },
  { period: "জানুয়ারি ২৬", contribution: 100, savings: 90, cumulativeSavings: 4680, development: 10 },
  { period: "ফেব্রুয়ারি ২৬", contribution: 100, savings: 90, cumulativeSavings: 4770, development: 10 },
  { period: "মার্চ ২৬", contribution: 100, savings: 90, cumulativeSavings: 4860, development: 10 },
  { period: "এপ্রিল ২৬", contribution: 100, savings: 90, cumulativeSavings: 4950, development: 10 },
  { period: "মে ২৬", contribution: 100, savings: 90, cumulativeSavings: 5040, development: 10 },
  { period: "জুন ২৬", contribution: 100, savings: 90, cumulativeSavings: 5130, development: 10 },
  { period: "জুলাই ২৬", contribution: 100, savings: 90, cumulativeSavings: 5220, development: 10 },
  { period: "আগস্ট ২৬", contribution: 100, savings: 90, cumulativeSavings: 5310, development: 10 },
  { period: "সেপ্টেম্বর ২৬", contribution: 100, savings: 90, cumulativeSavings: 5400, development: 10 },
];

// Yearly savings milestone breakdown
export const MEMBER_YEARLY_SAVINGS = [
  { year: 2021, months: 3, contribution: 300, savings: 270, dev: 30, cumulative: 270 },
  { year: 2022, months: 12, contribution: 1200, savings: 1080, dev: 120, cumulative: 1350 },
  { year: 2023, months: 12, contribution: 1200, savings: 1080, dev: 120, cumulative: 2430 },
  { year: 2024, months: 12, contribution: 1200, savings: 1080, dev: 120, cumulative: 3510 },
  { year: 2025, months: 12, contribution: 1200, savings: 1080, dev: 120, cumulative: 4590 },
  { year: 2026, months: 9, contribution: 900, savings: 810, dev: 90, cumulative: 5400 },
];

// ── Member Personal Transaction Ledger ────────────────────────
export type TransactionType =
  | "Contribution"
  | "Savings Allocation"
  | "Development Allocation"
  | "Refund";

export interface MemberTransaction {
  id: string;
  date: string;
  type: TransactionType;
  typeBn: string;
  description: string;
  credit: number;
  debit: number;
  balance: number;
  status: "completed" | "pending" | "cancelled";
  statusBn: string;
  referenceId: string;
}

function generateTransactions(): MemberTransaction[] {
  const txns: MemberTransaction[] = [];
  let runningSavings = 5400;

  // Generate 36 rich transaction events for the recent periods
  MEMBER_CONTRIBUTIONS.slice(0, 12).forEach((c, idx) => {
    // 1. Monthly contribution paid
    txns.push({
      id: `TXN-${c.year}${String(c.monthNumber).padStart(2, "0")}-01`,
      date: c.paymentDate,
      type: "Contribution",
      typeBn: "মাসিক চাঁদা",
      description: `${c.month} ${c.year} মাসের চাঁদা পরিশোধ (${c.paymentMethodBn})`,
      credit: 100,
      debit: 0,
      balance: runningSavings,
      status: "completed",
      statusBn: "সফল",
      referenceId: c.receiptNo,
    });

    // 2. Savings allocation (90%)
    txns.push({
      id: `TXN-${c.year}${String(c.monthNumber).padStart(2, "0")}-02`,
      date: c.paymentDate,
      type: "Savings Allocation",
      typeBn: "সঞ্চয় জমা (৯০%)",
      description: `${c.month} ${c.year} ব্যক্তিগত সঞ্চয়ে ৯০% স্থানান্তর`,
      credit: 90,
      debit: 0,
      balance: runningSavings,
      status: "completed",
      statusBn: "সফল",
      referenceId: `SAV-${c.year}${String(c.monthNumber).padStart(2, "0")}`,
    });

    // 3. Development allocation (10%)
    txns.push({
      id: `TXN-${c.year}${String(c.monthNumber).padStart(2, "0")}-03`,
      date: c.paymentDate,
      type: "Development Allocation",
      typeBn: "উন্নয়ন তহবিল (১০%)",
      description: `${c.month} ${c.year} জনকল্যাণ ও উন্নয়ন তহবিলে ১০% বরাদ্দ`,
      credit: 10,
      debit: 0,
      balance: runningSavings,
      status: "completed",
      statusBn: "সফল",
      referenceId: `DEV-${c.year}${String(c.monthNumber).padStart(2, "0")}`,
    });

    runningSavings -= 90;
  });

  return txns;
}

export const MEMBER_TRANSACTIONS: MemberTransaction[] = generateTransactions();

// ── Organization-level Financial Transparency ─────────────────
export const ORG_FUND_OVERVIEW = {
  totalCollection: 72600,
  memberSavings: 65340,
  developmentFund: 7260,
  developmentExpenses: 5910,
  availableDevelopmentFund: 1350,
  activeMembersCount: 25,
  totalApprovedProjects: 11,
  beneficiariesCount: 1250,

  // 12-month org trend data
  monthlyTrend: [
    { month: "অক্টোবর ২৫", collection: 2500, savings: 2250, devFund: 250, expense: 350, balance: 1400 },
    { month: "নভেম্বর ২৫", collection: 2500, savings: 2250, devFund: 250, expense: 200, balance: 1450 },
    { month: "ডিসেম্বর ২৫", collection: 2500, savings: 2250, devFund: 250, expense: 450, balance: 1250 },
    { month: "জানুয়ারি ২৬", collection: 2500, savings: 2250, devFund: 250, expense: 300, balance: 1200 },
    { month: "ফেব্রুয়ারি ২৬", collection: 2500, savings: 2250, devFund: 250, expense: 600, balance: 850 },
    { month: "মার্চ ২৬", collection: 2500, savings: 2250, devFund: 250, expense: 450, balance: 650 },
    { month: "এপ্রিল ২৬", collection: 2500, savings: 2250, devFund: 250, expense: 1200, balance: -300 },
    { month: "মে ২৬", collection: 2500, savings: 2250, devFund: 250, expense: 850, balance: -900 },
    { month: "জুন ২৬", collection: 2400, savings: 2160, devFund: 240, expense: 2200, balance: 400 },
    { month: "জুলাই ২৬", collection: 2500, savings: 2250, devFund: 250, expense: 0, balance: 650 },
    { month: "আগস্ট ২৬", collection: 2500, savings: 2250, devFund: 250, expense: 650, balance: 850 },
    { month: "সেপ্টেম্বর ২৬", collection: 2500, savings: 2250, devFund: 250, expense: 1010, balance: 1350 },
  ],

  // Fund allocation distribution for donut
  fundDistribution: [
    { name: "সদস্যদের সঞ্চয় (৯০%)", value: 65340, color: "#166534" },
    { name: "উন্নয়ন ব্যয়িত অর্থ", value: 5910, color: "#d97706" },
    { name: "অবশিষ্ট উন্নয়ন তহবিল", value: 1350, color: "#2563eb" },
  ],
};
