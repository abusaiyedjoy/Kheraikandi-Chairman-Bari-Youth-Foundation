import React from "react";
import { UserAvatar } from "./UserAvatar";
import { StatusBadge } from "./StatusBadge";
import { CurrencyDisplay } from "./CurrencyDisplay";
import { Phone, Calendar, PiggyBank, ArrowRight } from "lucide-react";
import { formatDateShort } from "@/lib/formatters";
import type { Member } from "@/types/member";
import { cn } from "@/lib/utils";

interface MemberCardProps {
  member: Member;
  onViewProfile?: (member: Member) => void;
  className?: string;
}

export function MemberCard({
  member,
  onViewProfile,
  className,
}: MemberCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:shadow-md hover:border-emerald-600/30 flex flex-col justify-between",
        className
      )}
    >
      <div>
        {/* Top: Avatar, Names, Member ID, Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <UserAvatar
              name={member.fullNameBn || member.fullName}
              src={member.profilePhoto}
              size="lg"
              status={member.status}
            />
            <div className="min-w-0">
              <h4 className="font-bold text-sm text-foreground truncate">
                {member.fullNameBn || member.fullName}
              </h4>
              {member.fullNameBn && member.fullName && member.fullNameBn !== member.fullName && (
                <p className="text-xs text-muted-foreground truncate">{member.fullName}</p>
              )}
              <span className="inline-block font-mono text-[11px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded mt-0.5">
                {member.memberId}
              </span>
            </div>
          </div>

          <StatusBadge status={member.status} domain="member" />
        </div>

        {/* Role badge & info */}
        <div className="mt-3.5 flex items-center gap-2">
          <StatusBadge status={member.role} domain="role" showDot={false} />
          <span className="text-xs text-muted-foreground truncate">
            {member.occupation}
          </span>
        </div>

        {/* Financial glance: Savings */}
        <div className="mt-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
              <PiggyBank className="h-4 w-4" />
              <span>মোট সঞ্চয় আমানত</span>
            </span>
            <CurrencyDisplay
              amount={member.totalSavings ?? 0}
              size="md"
              className="font-bold text-emerald-800 dark:text-emerald-300"
            />
          </div>
        </div>

        {/* Contact & Join Date */}
        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-emerald-600" />
            <span>{member.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-emerald-600" />
            <span>যোগদান: {formatDateShort(member.joinDate)}</span>
          </div>
        </div>
      </div>

      {onViewProfile && (
        <div className="mt-4 pt-3 border-t border-border/60">
          <button
            type="button"
            onClick={() => onViewProfile(member)}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold text-primary hover:bg-muted transition-colors"
          >
            <span>সম্পূর্ণ প্রোফাইল</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
