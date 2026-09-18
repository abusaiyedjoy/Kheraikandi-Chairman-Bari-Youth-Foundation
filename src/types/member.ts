// ============================================================
// Member Types — খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// ============================================================

export type MemberRole = "admin" | "president" | "secretary" | "treasurer" | "member";
export type MemberStatus = "active" | "inactive" | "suspended";

export interface Member {
  id: string;
  memberId: string; // e.g. "KYK-001"
  fullName: string;
  fullNameBn: string; // Bengali name
  fatherName: string;
  motherName: string;
  nid: string;
  phone: string;
  email?: string;
  address: string;
  village: string;
  upazila: string;
  district: string;
  role: MemberRole;
  status: MemberStatus;
  joinDate: string; // ISO date string
  profilePhoto?: string;
  occupation: string;
  dateOfBirth: string; // ISO date string
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  // computed aggregates (may be populated by mock-api)
  totalContributions?: number;
  totalSavings?: number;
  totalDevelopmentFund?: number;
}

export interface MemberSavingsSnapshot {
  memberId: string;
  totalContributed: number;
  totalSavings: number; // 90% of total contributed
  totalDevelopmentFund: number; // 10% of total contributed
  lastContributionDate: string;
  contributionMonths: number; // number of months contributed
}

export type MemberSummary = Pick<
  Member,
  "id" | "memberId" | "fullName" | "fullNameBn" | "phone" | "role" | "status" | "joinDate"
>;
