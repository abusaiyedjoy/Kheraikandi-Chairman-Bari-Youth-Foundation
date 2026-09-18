// ============================================================
// Mock Contributions — 60+ records
// খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// ============================================================

import { Contribution } from "@/types/finance";
import { calculateSavings, calculateDevelopmentAllocation } from "@/lib/utils";
import { FINANCE } from "@/lib/constants";

const AMT = FINANCE.MONTHLY_CONTRIBUTION_AMOUNT; // ৳100

// Helper to build a contribution record
function mkContrib(
  id: string,
  memberId: string,
  memberName: string,
  year: number,
  month: number,
  paymentDate: string,
  status: Contribution["status"] = "paid",
  amount = AMT
): Contribution {
  return {
    id,
    memberId,
    memberName,
    amount,
    savingsAmount: calculateSavings(amount),
    developmentAmount: calculateDevelopmentAllocation(amount),
    month,
    year,
    paymentDate,
    status,
    paymentMethod: "cash",
    collectedBy: "m003",
    remarks: status === "waived" ? "বিশেষ পরিস্থিতিতে মওকুফ" : undefined,
  };
}

export const CONTRIBUTIONS: Contribution[] = [
  // ── m001 (KYK-001) — Rafiqul Islam (joined 2019-03) ──
  mkContrib("c001", "m001", "মোহাম্মদ রফিকুল ইসলাম", 2024, 9, "2024-09-05"),
  mkContrib("c002", "m001", "মোহাম্মদ রফিকুল ইসলাম", 2024, 8, "2024-08-04"),
  mkContrib("c003", "m001", "মোহাম্মদ রফিকুল ইসলাম", 2024, 7, "2024-07-03"),
  mkContrib("c004", "m001", "মোহাম্মদ রফিকুল ইসলাম", 2024, 6, "2024-06-05"),
  mkContrib("c005", "m001", "মোহাম্মদ রফিকুল ইসলাম", 2024, 5, "2024-05-04"),

  // ── m002 (KYK-002) — Jahangir Alam ──
  mkContrib("c006", "m002", "মো. জাহাঙ্গীর আলম", 2024, 9, "2024-09-06"),
  mkContrib("c007", "m002", "মো. জাহাঙ্গীর আলম", 2024, 8, "2024-08-05"),
  mkContrib("c008", "m002", "মো. জাহাঙ্গীর আলম", 2024, 7, "2024-07-04"),
  mkContrib("c009", "m002", "মো. জাহাঙ্গীর আলম", 2024, 6, "2024-06-06"),
  mkContrib("c010", "m002", "মো. জাহাঙ্গীর আলম", 2024, 5, "2024-05-05"),

  // ── m003 (KYK-003) — Abdur Rahman (Treasurer) ──
  mkContrib("c011", "m003", "মো. আব্দুর রহমান", 2024, 9, "2024-09-02"),
  mkContrib("c012", "m003", "মো. আব্দুর রহমান", 2024, 8, "2024-08-02"),
  mkContrib("c013", "m003", "মো. আব্দুর রহমান", 2024, 7, "2024-07-01"),
  mkContrib("c014", "m003", "মো. আব্দুর রহমান", 2024, 6, "2024-06-03"),
  mkContrib("c015", "m003", "মো. আব্দুর রহমান", 2024, 5, "2024-05-02"),

  // ── m004 (KYK-004) — Kamal Hossain ──
  mkContrib("c016", "m004", "মো. কামাল হোসেন", 2024, 9, "2024-09-08"),
  mkContrib("c017", "m004", "মো. কামাল হোসেন", 2024, 8, "2024-08-07"),
  mkContrib("c018", "m004", "মো. কামাল হোসেন", 2024, 7, "2024-07-06"),
  mkContrib("c019", "m004", "মো. কামাল হোসেন", 2024, 6, "2024-06-08", "pending"),

  // ── m005 (KYK-005) — Shariful Islam ──
  mkContrib("c020", "m005", "মো. শরিফুল ইসলাম", 2024, 9, "2024-09-10"),
  mkContrib("c021", "m005", "মো. শরিফুল ইসলাম", 2024, 8, "2024-08-09"),
  mkContrib("c022", "m005", "মো. শরিফুল ইসলাম", 2024, 7, "2024-07-08"),
  mkContrib("c023", "m005", "মো. শরিফুল ইসলাম", 2024, 6, "2024-06-10"),

  // ── m006 (KYK-006) — Belal Hossain ──
  mkContrib("c024", "m006", "মো. বেলাল হোসেন", 2024, 9, "2024-09-12"),
  mkContrib("c025", "m006", "মো. বেলাল হোসেন", 2024, 8, "2024-08-11"),
  mkContrib("c026", "m006", "মো. বেলাল হোসেন", 2024, 7, "2024-07-10"),
  mkContrib("c027", "m006", "মো. বেলাল হোসেন", 2024, 6, "2024-06-12", "overdue"),

  // ── m007 (KYK-007) — Nazmul Haque ──
  mkContrib("c028", "m007", "মো. নাজমুল হক", 2024, 9, "2024-09-07"),
  mkContrib("c029", "m007", "মো. নাজমুল হক", 2024, 8, "2024-08-06"),
  mkContrib("c030", "m007", "মো. নাজমুল হক", 2024, 7, "2024-07-05", "paid", 100),

  // ── m008 (KYK-008) — Rubel Ahmed ──
  mkContrib("c031", "m008", "মো. রুবেল আহমেদ", 2024, 9, "2024-09-09"),
  mkContrib("c032", "m008", "মো. রুবেল আহমেদ", 2024, 8, "2024-08-08"),
  mkContrib("c033", "m008", "মো. রুবেল আহমেদ", 2024, 7, "2024-07-07"),

  // ── m009 (KYK-009) — Shakil Ahmed ──
  mkContrib("c034", "m009", "মো. শাকিল আহমেদ", 2024, 9, "2024-09-11"),
  mkContrib("c035", "m009", "মো. শাকিল আহমেদ", 2024, 8, "2024-08-10"),
  mkContrib("c036", "m009", "মো. শাকিল আহমেদ", 2024, 7, "2024-07-09"),

  // ── m010 (KYK-010) — Riaz Uddin ──
  mkContrib("c037", "m010", "মো. রিয়াজ উদ্দিন", 2024, 9, "2024-09-13"),
  mkContrib("c038", "m010", "মো. রিয়াজ উদ্দিন", 2024, 8, "2024-08-12"),
  mkContrib("c039", "m010", "মো. রিয়াজ উদ্দিন", 2024, 7, "2024-07-11", "pending"),

  // ── m011 (KYK-011) — Faruk Hossain ──
  mkContrib("c040", "m011", "মো. ফারুক হোসেন", 2024, 9, "2024-09-14"),
  mkContrib("c041", "m011", "মো. ফারুক হোসেন", 2024, 8, "2024-08-13"),
  mkContrib("c042", "m011", "মো. ফারুক হোসেন", 2024, 7, "2024-07-12"),

  // ── m012 (KYK-012) — Mamun Rashid ──
  mkContrib("c043", "m012", "মো. মামুন রশীদ", 2024, 9, "2024-09-15"),
  mkContrib("c044", "m012", "মো. মামুন রশীদ", 2024, 8, "2024-08-14"),
  mkContrib("c045", "m012", "মো. মামুন রশীদ", 2024, 7, "2024-07-13"),

  // ── m013 (KYK-013) — Zahirul Islam ──
  mkContrib("c046", "m013", "মো. জহিরুল ইসলাম", 2024, 9, "2024-09-16"),
  mkContrib("c047", "m013", "মো. জহিরুল ইসলাম", 2024, 8, "2024-08-15"),

  // ── m014 (KYK-014) — Sirajul Islam (inactive) ──
  mkContrib("c048", "m014", "মো. সিরাজুল ইসলাম", 2023, 6, "2023-06-20"),
  mkContrib("c049", "m014", "মো. সিরাজুল ইসলাম", 2023, 5, "2023-05-15"),

  // ── m015 (KYK-015) — Alauddin Ahmed ──
  mkContrib("c050", "m015", "মো. আলাউদ্দিন আহমেদ", 2024, 9, "2024-09-17"),
  mkContrib("c051", "m015", "মো. আলাউদ্দিন আহমেদ", 2024, 8, "2024-08-16"),

  // ── m016 (KYK-016) — Arifur Rahman ──
  mkContrib("c052", "m016", "মো. আরিফুর রহমান", 2024, 9, "2024-09-18"),
  mkContrib("c053", "m016", "মো. আরিফুর রহমান", 2024, 8, "2024-08-17"),

  // ── m017 (KYK-017) — Tofazzal Hossain ──
  mkContrib("c054", "m017", "মো. তোফাজ্জল হোসেন", 2024, 9, "2024-09-03"),
  mkContrib("c055", "m017", "মো. তোফাজ্জল হোসেন", 2024, 8, "2024-08-03"),

  // ── m018 (KYK-018) — Habibur Rahman ──
  mkContrib("c056", "m018", "মো. হাবিবুর রহমান", 2024, 9, "2024-09-19"),
  mkContrib("c057", "m018", "মো. হাবিবুর রহমান", 2024, 8, "2024-08-18"),

  // ── m019 (KYK-019) — Monirul Islam ──
  mkContrib("c058", "m019", "মো. মনিরুল ইসলাম", 2024, 9, "2024-09-20"),
  mkContrib("c059", "m019", "মো. মনিরুল ইসলাম", 2024, 8, "2024-08-19", "pending"),

  // ── m020 (KYK-020) — Anisur Rahman (suspended) ──
  mkContrib("c060", "m020", "মো. আনিসুর রহমান", 2023, 3, "2023-03-10"),
  mkContrib("c061", "m020", "মো. আনিসুর রহমান", 2023, 2, "2023-02-08"),

  // ── m021 (KYK-021) — Ashraful Islam ──
  mkContrib("c062", "m021", "মো. আশরাফুল ইসলাম", 2024, 9, "2024-09-21"),
  mkContrib("c063", "m021", "মো. আশরাফুল ইসলাম", 2024, 8, "2024-08-20"),

  // ── m022 (KYK-022) — Nazrul Islam ──
  mkContrib("c064", "m022", "মো. নজরুল ইসলাম", 2024, 9, "2024-09-22"),
  mkContrib("c065", "m022", "মো. নজরুল ইসলাম", 2024, 8, "2024-08-21", "overdue"),

  // ── m023 (KYK-023) — Rafiquel Islam ──
  mkContrib("c066", "m023", "মো. রফিকুল ইসলাম", 2024, 9, "2024-09-23"),
  mkContrib("c067", "m023", "মো. রফিকুল ইসলাম", 2024, 8, "2024-08-22"),

  // ── m024 (KYK-024) — Saiful Islam ──
  mkContrib("c068", "m024", "মো. সাইফুল ইসলাম", 2024, 9, "2024-09-24"),
  mkContrib("c069", "m024", "মো. সাইফুল ইসলাম", 2024, 8, "2024-08-23"),

  // ── m025 (KYK-025) — Imran Hossain (joined 2024-01) ──
  mkContrib("c070", "m025", "মো. ইমরান হোসেন", 2024, 9, "2024-09-25"),
  mkContrib("c071", "m025", "মো. ইমরান হোসেন", 2024, 8, "2024-08-24"),

  // ── Waived record example ──
  mkContrib("c072", "m014", "মো. সিরাজুল ইসলাম", 2021, 4, "2021-04-15", "waived"),
];

export const getContributionsByMember = (memberId: string): Contribution[] =>
  CONTRIBUTIONS.filter((c) => c.memberId === memberId);

export const getPaidContributions = (): Contribution[] =>
  CONTRIBUTIONS.filter((c) => c.status === "paid");

export const getPendingContributions = (): Contribution[] =>
  CONTRIBUTIONS.filter((c) => c.status === "pending");

export const getOverdueContributions = (): Contribution[] =>
  CONTRIBUTIONS.filter((c) => c.status === "overdue");

export const getTotalCollectedAmount = (): number =>
  CONTRIBUTIONS.filter((c) => c.status === "paid").reduce((sum, c) => sum + c.amount, 0);
