// ============================================================
// Audit Log Types — খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// ============================================================

export type AuditAction =
  | "member_created"
  | "member_updated"
  | "member_deleted"
  | "member_suspended"
  | "member_activated"
  | "contribution_recorded"
  | "contribution_updated"
  | "expense_created"
  | "expense_approved"
  | "income_recorded"
  | "investment_created"
  | "investment_updated"
  | "refund_requested"
  | "refund_approved"
  | "refund_paid"
  | "notice_published"
  | "notice_deleted"
  | "activity_created"
  | "activity_updated"
  | "login"
  | "logout"
  | "settings_changed"
  | "report_generated";

export type AuditEntityType =
  | "member"
  | "contribution"
  | "expense"
  | "income"
  | "investment"
  | "refund"
  | "notice"
  | "activity"
  | "system";

export interface AuditLog {
  id: string;
  action: AuditAction;
  entityType: AuditEntityType;
  entityId?: string;
  entityLabel?: string; // human-readable label for the entity
  performedBy: string; // member id
  performedByName: string;
  timestamp: string; // ISO datetime string
  ipAddress?: string;
  changes?: Record<string, { before: unknown; after: unknown }>;
  metadata?: Record<string, unknown>;
}
