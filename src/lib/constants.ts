// ============================================================
// Constants — খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// Central configuration. Import from here — never hardcode.
// ============================================================

// ─── Organization Metadata ────────────────────────────────────
export const ORG = {
  nameBn: "খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ",
  nameEn: "Kheraikandi Chairman Bari Youth Welfare",
  abbreviation: "KCBYW",
  foundedYear: 2019,
  address: "খিরাইকান্দি, ভৈরব, কিশোরগঞ্জ, বাংলাদেশ",
  phone: "+880 1700-000000",
  email: "kcbyw@example.com",
  tagline: "একতায় শক্তি, সেবায় মুক্তি",
  taglineEn: "Strength in Unity, Freedom in Service",
} as const;

// ─── Financial Rules ──────────────────────────────────────────
export const FINANCE = {
  /** Default monthly contribution per member (BDT) */
  MONTHLY_CONTRIBUTION_AMOUNT: 100,
  /** Percentage of contribution credited to member's personal savings */
  SAVINGS_PERCENTAGE: 0.90,
  /** Percentage of contribution allocated to the development fund */
  DEVELOPMENT_FUND_PERCENTAGE: 0.10,
  /** Currency symbol */
  CURRENCY_SYMBOL: "৳",
  /** Currency code */
  CURRENCY_CODE: "BDT",
  /** Locale for Intl formatting */
  LOCALE: "bn-BD",
} as const;

// ─── Brand Colors ─────────────────────────────────────────────
export const BRAND_COLORS = {
  primary: "#166534",
  secondary: "#22C55E",
  background: "#F8FAF7",
  text: "#172018",
  accent: "#D4A72C",
} as const;

// ─── Role Labels ──────────────────────────────────────────────
export const ROLE_LABELS: Record<string, string> = {
  admin: "প্রশাসক",
  president: "সভাপতি",
  secretary: "সাধারণ সম্পাদক",
  treasurer: "কোষাধ্যক্ষ",
  member: "সাধারণ সদস্য",
} as const;

export const ROLE_LABELS_EN: Record<string, string> = {
  admin: "Admin",
  president: "President",
  secretary: "Secretary",
  treasurer: "Treasurer",
  member: "Member",
} as const;

// ─── Status Labels ────────────────────────────────────────────
export const MEMBER_STATUS_LABELS: Record<string, string> = {
  active: "সক্রিয়",
  inactive: "নিষ্ক্রিয়",
  suspended: "স্থগিত",
} as const;

export const CONTRIBUTION_STATUS_LABELS: Record<string, string> = {
  paid: "পরিশোধিত",
  pending: "অপেক্ষমাণ",
  overdue: "বকেয়া",
  waived: "মওকুফ",
} as const;

export const EXPENSE_CATEGORY_LABELS: Record<string, string> = {
  office: "অফিস",
  event: "অনুষ্ঠান",
  maintenance: "রক্ষণাবেক্ষণ",
  welfare: "কল্যাণ",
  administrative: "প্রশাসনিক",
  emergency: "জরুরি",
  other: "অন্যান্য",
} as const;

export const INCOME_CATEGORY_LABELS: Record<string, string> = {
  membership_fee: "সদস্যপদ ফি",
  donation: "দান",
  investment_return: "বিনিয়োগ রিটার্ন",
  fine: "জরিমানা",
  other: "অন্যান্য",
} as const;

export const ACTIVITY_TYPE_LABELS: Record<string, string> = {
  cleanup: "পরিষ্কার অভিযান",
  health_camp: "স্বাস্থ্য শিবির",
  education: "শিক্ষা কার্যক্রম",
  tree_plantation: "বৃক্ষরোপণ",
  donation_drive: "দান সংগ্রহ",
  sports: "ক্রীড়া",
  cultural: "সাংস্কৃতিক",
  emergency_relief: "জরুরি সহায়তা",
  blood_donation: "রক্তদান",
  meeting: "সভা",
  other: "অন্যান্য",
} as const;

export const NOTICE_CATEGORY_LABELS: Record<string, string> = {
  meeting: "সভা",
  financial: "আর্থিক",
  general: "সাধারণ",
  urgent: "জরুরি",
  activity: "কার্যক্রম",
  election: "নির্বাচন",
  holiday: "ছুটি",
  other: "অন্যান্য",
} as const;

export const INVESTMENT_TYPE_LABELS: Record<string, string> = {
  land: "জমি",
  fdr: "এফডিআর",
  business: "ব্যবসা",
  loan: "ঋণ",
  other: "অন্যান্য",
} as const;

// ─── Pagination ───────────────────────────────────────────────
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

// ─── Month Names (Bengali) ────────────────────────────────────
export const MONTHS_BN = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
] as const;

export const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

// ─── Navigation ───────────────────────────────────────────────
export const NAV_ITEMS = {
  admin: [
    { href: "/admin", label: "ড্যাশবোর্ড", labelEn: "Dashboard", icon: "LayoutDashboard" },
    { href: "/admin/members", label: "সদস্য তালিকা", labelEn: "Members", icon: "Users" },
    { href: "/admin/contributions", label: "চাঁদা ব্যবস্থাপনা", labelEn: "Contributions", icon: "Wallet" },
    { href: "/admin/expenses", label: "ব্যয়", labelEn: "Expenses", icon: "Receipt" },
    { href: "/admin/income", label: "আয়", labelEn: "Income", icon: "TrendingUp" },
    { href: "/admin/investments", label: "বিনিয়োগ", labelEn: "Investments", icon: "BarChart3" },
    { href: "/admin/refunds", label: "ফেরত", labelEn: "Refunds", icon: "RefreshCw" },
    { href: "/admin/activities", label: "সামাজিক কার্যক্রম", labelEn: "Activities", icon: "Heart" },
    { href: "/admin/notices", label: "নোটিশ", labelEn: "Notices", icon: "Bell" },
    { href: "/admin/reports", label: "আর্থিক প্রতিবেদন", labelEn: "Reports", icon: "FileText" },
    { href: "/admin/audit", label: "অডিট লগ", labelEn: "Audit Logs", icon: "Shield" },
  ],
  member: [
    { href: "/member", label: "আমার ড্যাশবোর্ড", labelEn: "My Dashboard", icon: "LayoutDashboard" },
    { href: "/member/savings", label: "আমার সঞ্চয়", labelEn: "My Savings", icon: "PiggyBank" },
    { href: "/member/contributions", label: "আমার চাঁদা", labelEn: "My Contributions", icon: "Wallet" },
    { href: "/member/activities", label: "কার্যক্রম", labelEn: "Activities", icon: "Heart" },
    { href: "/member/notices", label: "নোটিশ", labelEn: "Notices", icon: "Bell" },
  ],
} as const;
