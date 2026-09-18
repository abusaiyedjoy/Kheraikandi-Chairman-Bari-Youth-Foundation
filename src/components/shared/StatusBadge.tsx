import React from "react";
import { Badge, type BadgeProps } from "@/components/ui/badge";

export type StatusDomain =
  | "member"
  | "contribution"
  | "activity"
  | "refund"
  | "notice"
  | "role"
  | "general";

interface StatusBadgeProps {
  status: string;
  domain?: StatusDomain;
  lang?: "bn" | "en";
  className?: string;
  showDot?: boolean;
}

const statusConfigs: Record<
  string,
  {
    variant: BadgeProps["variant"];
    labelBn: string;
    labelEn: string;
    dotColor?: string;
  }
> = {
  // Member status
  active: {
    variant: "success",
    labelBn: "সক্রিয়",
    labelEn: "Active",
    dotColor: "bg-emerald-600",
  },
  inactive: {
    variant: "secondary",
    labelBn: "নিষ্ক্রিয়",
    labelEn: "Inactive",
    dotColor: "bg-stone-400",
  },
  suspended: {
    variant: "danger",
    labelBn: "স্থগিত",
    labelEn: "Suspended",
    dotColor: "bg-red-500",
  },

  // Contribution status
  paid: {
    variant: "success",
    labelBn: "পরিশোধিত",
    labelEn: "Paid",
    dotColor: "bg-emerald-600",
  },
  pending: {
    variant: "warning",
    labelBn: "অপেক্ষমাণ",
    labelEn: "Pending",
    dotColor: "bg-amber-500",
  },
  overdue: {
    variant: "danger",
    labelBn: "বকেয়া",
    labelEn: "Overdue",
    dotColor: "bg-red-600",
  },
  waived: {
    variant: "secondary",
    labelBn: "মওকুফ",
    labelEn: "Waived",
    dotColor: "bg-muted-foreground",
  },

  // Activity status
  upcoming: {
    variant: "info",
    labelBn: "আসন্ন",
    labelEn: "Upcoming",
    dotColor: "bg-sky-500",
  },
  ongoing: {
    variant: "warning",
    labelBn: "চলমান",
    labelEn: "Ongoing",
    dotColor: "bg-amber-500",
  },
  completed: {
    variant: "success",
    labelBn: "সম্পন্ন",
    labelEn: "Completed",
    dotColor: "bg-emerald-600",
  },
  cancelled: {
    variant: "danger",
    labelBn: "বাতিল",
    labelEn: "Cancelled",
    dotColor: "bg-red-500",
  },

  // Refund status
  approved: {
    variant: "info",
    labelBn: "অনুমোদিত",
    labelEn: "Approved",
    dotColor: "bg-sky-600",
  },
  rejected: {
    variant: "danger",
    labelBn: "প্রত্যাখ্যাত",
    labelEn: "Rejected",
    dotColor: "bg-red-600",
  },

  // Notice Priority
  urgent: {
    variant: "danger",
    labelBn: "জরুরি",
    labelEn: "Urgent",
    dotColor: "bg-red-600",
  },
  high: {
    variant: "warning",
    labelBn: "উচ্চ অগ্রাধিকার",
    labelEn: "High",
    dotColor: "bg-amber-600",
  },
  medium: {
    variant: "info",
    labelBn: "সাধারণ",
    labelEn: "Medium",
    dotColor: "bg-sky-500",
  },
  low: {
    variant: "secondary",
    labelBn: "স্বাভাবিক",
    labelEn: "Low",
    dotColor: "bg-slate-400",
  },

  // Roles
  admin: {
    variant: "gold",
    labelBn: "প্রশাসক",
    labelEn: "Admin",
    dotColor: "bg-amber-600",
  },
  president: {
    variant: "gold",
    labelBn: "সভাপতি",
    labelEn: "President",
    dotColor: "bg-amber-600",
  },
  secretary: {
    variant: "default",
    labelBn: "সাধারণ সম্পাদক",
    labelEn: "Secretary",
    dotColor: "bg-emerald-600",
  },
  treasurer: {
    variant: "default",
    labelBn: "কোষাধ্যক্ষ",
    labelEn: "Treasurer",
    dotColor: "bg-emerald-600",
  },
  member: {
    variant: "secondary",
    labelBn: "সাধারণ সদস্য",
    labelEn: "Member",
    dotColor: "bg-emerald-700",
  },
};

export function StatusBadge({
  status,
  domain: _domain,
  lang = "bn",
  className,
  showDot = true,
}: StatusBadgeProps) {
  const normalizedKey = status.toLowerCase();
  const config = statusConfigs[normalizedKey] ?? {
    variant: "secondary",
    labelBn: status,
    labelEn: status,
    dotColor: "bg-muted-foreground",
  };

  const displayText = lang === "bn" ? config.labelBn : config.labelEn;

  return (
    <Badge
      variant={config.variant}
      dot={showDot}
      dotColor={config.dotColor}
      className={className}
    >
      {displayText}
    </Badge>
  );
}
