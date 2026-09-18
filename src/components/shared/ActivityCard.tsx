import React from "react";
import { Calendar, MapPin, Users, Heart, ArrowRight } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/formatters";
import type { SocialActivity } from "@/types/activity";
import { cn } from "@/lib/utils";

interface ActivityCardProps {
  activity: SocialActivity;
  onViewDetails?: (activity: SocialActivity) => void;
  className?: string;
}

export function ActivityCard({
  activity,
  onViewDetails,
  className,
}: ActivityCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:shadow-md hover:border-emerald-600/30",
        className
      )}
    >
      <div>
        {/* Top: Status & Date */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <StatusBadge status={activity.status} domain="activity" />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>{formatDate(activity.startDate)}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-foreground leading-snug">
          {activity.titleBn || activity.title}
        </h3>
        {activity.titleBn && activity.title && activity.titleBn !== activity.title && (
          <p className="text-xs text-muted-foreground mt-0.5">{activity.title}</p>
        )}

        {/* Description snippet */}
        <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {activity.description}
        </p>

        {/* Meta badges: Location, Participants, Beneficiaries */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground border-t border-border/60 pt-3">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{activity.location}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{activity.totalParticipants} জন স্বেচ্ছাসেবী</span>
          </div>

          {activity.beneficiaries && (
            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
              <Heart className="h-3.5 w-3.5 shrink-0" />
              <span>{activity.beneficiaries}+ উপকৃত</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer & Action */}
      <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {activity.tags?.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>

        {onViewDetails && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onViewDetails(activity)}
            rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            className="text-xs font-semibold text-primary hover:text-emerald-800"
          >
            বিস্তারিত
          </Button>
        )}
      </div>
    </div>
  );
}
