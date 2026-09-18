// ============================================================
// Notice Types — খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// ============================================================

export type NoticeCategory =
  | "meeting"
  | "financial"
  | "general"
  | "urgent"
  | "activity"
  | "election"
  | "holiday"
  | "other";

export type NoticePriority = "low" | "medium" | "high" | "urgent";

export type NoticeAudience = "all" | "admin" | "member" | "treasurer";

export interface Notice {
  id: string;
  title: string;
  titleBn: string; // Bengali title
  content: string;
  contentBn?: string; // Bengali content
  category: NoticeCategory;
  priority: NoticePriority;
  audience: NoticeAudience;
  publishedDate: string; // ISO date string
  expiresDate?: string;
  publishedBy: string; // member id
  publishedByName: string;
  isPinned: boolean;
  attachments?: string[]; // document urls
  tags: string[];
}
