import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "active" | "inactive" | "suspended";
  role?: string;
  className?: string;
}

export function UserAvatar({
  name,
  src,
  size = "md",
  status,
  role,
  className,
}: UserAvatarProps) {
  // Extract initials (supports Bengali & English)
  const getInitials = (n: string) => {
    const parts = n.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2);
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-xl",
  };

  const statusDotSizes = {
    sm: "h-2 w-2 ring-1",
    md: "h-2.5 w-2.5 ring-2",
    lg: "h-3 w-3 ring-2",
    xl: "h-4 w-4 ring-2",
  };

  const isOnline = status === "online" || status === "active";

  return (
    <div className={cn("relative inline-block shrink-0", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-full overflow-hidden font-bold select-none",
          "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800",
          sizeClasses[size]
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={name}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {/* Status indicator dot */}
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-background",
            statusDotSizes[size],
            isOnline ? "bg-emerald-500" : "bg-stone-400"
          )}
          title={isOnline ? "সক্রিয়" : "নিষ্ক্রিয়"}
        />
      )}
    </div>
  );
}
