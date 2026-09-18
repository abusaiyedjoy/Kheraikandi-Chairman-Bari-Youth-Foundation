// ============================================================
// Activity Types — খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// ============================================================

export type ActivityType =
  | "cleanup"
  | "health_camp"
  | "education"
  | "tree_plantation"
  | "donation_drive"
  | "sports"
  | "cultural"
  | "emergency_relief"
  | "blood_donation"
  | "meeting"
  | "other";

export type ActivityStatus = "upcoming" | "ongoing" | "completed" | "cancelled";

export interface ActivityParticipant {
  memberId: string;
  memberName: string;
  role: "organizer" | "volunteer" | "participant";
}

export interface SocialActivity {
  id: string;
  title: string;
  titleBn: string; // Bengali title
  type: ActivityType;
  status: ActivityStatus;
  description: string;
  location: string;
  startDate: string; // ISO date string
  endDate?: string;
  organizers: string[]; // member ids
  participants: ActivityParticipant[];
  totalParticipants: number;
  budget?: number;
  actualCost?: number;
  beneficiaries?: number; // number of people benefited
  photos?: string[]; // photo urls
  report?: string; // text report
  tags: string[];
}
