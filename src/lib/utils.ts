// ============================================================
// Utils — খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// Financial calculations + shadcn cn() utility
// ============================================================

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FINANCE } from "./constants";
import type { Contribution } from "@/types/finance";

// ─── shadcn/ui class merge ────────────────────────────────────

/**
 * Merge Tailwind CSS class names with shadcn/ui compatibility.
 * Resolves class conflicts intelligently.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ─── Financial Calculation Utilities ─────────────────────────

/**
 * Calculate the savings portion of a contribution (90%).
 * @param contributionAmount Total contribution amount in BDT
 * @returns Savings amount credited to member's personal account
 */
export function calculateSavings(contributionAmount: number): number {
  return contributionAmount * FINANCE.SAVINGS_PERCENTAGE;
}

/**
 * Calculate the development fund allocation of a contribution (10%).
 * @param contributionAmount Total contribution amount in BDT
 * @returns Development fund allocation amount
 */
export function calculateDevelopmentAllocation(contributionAmount: number): number {
  return contributionAmount * FINANCE.DEVELOPMENT_FUND_PERCENTAGE;
}

/**
 * Calculate the full breakdown of a contribution.
 * @param contributionAmount Total contribution amount in BDT
 * @returns Object with total, savings, and development amounts
 */
export function calculateContributionBreakdown(contributionAmount: number): {
  total: number;
  savings: number;
  development: number;
  savingsPercent: number;
  developmentPercent: number;
} {
  return {
    total: contributionAmount,
    savings: calculateSavings(contributionAmount),
    development: calculateDevelopmentAllocation(contributionAmount),
    savingsPercent: FINANCE.SAVINGS_PERCENTAGE * 100,
    developmentPercent: FINANCE.DEVELOPMENT_FUND_PERCENTAGE * 100,
  };
}

/**
 * Calculate total savings for a member from their contribution records.
 */
export function calculateMemberTotalSavings(contributions: Pick<Contribution, "savingsAmount">[]): number {
  return contributions.reduce((sum, c) => sum + c.savingsAmount, 0);
}

/**
 * Calculate total development fund from contribution records.
 */
export function calculateTotalDevelopmentFund(contributions: Pick<Contribution, "developmentAmount">[]): number {
  return contributions.reduce((sum, c) => sum + c.developmentAmount, 0);
}

/**
 * Calculate the expected monthly contribution for a member based on months joined.
 */
export function calculateExpectedContribution(monthsJoined: number): number {
  return monthsJoined * FINANCE.MONTHLY_CONTRIBUTION_AMOUNT;
}

/**
 * Calculate the payment completion rate for a member.
 */
export function calculatePaymentRate(paid: number, expected: number): number {
  if (expected === 0) return 100;
  return Math.min(100, (paid / expected) * 100);
}

/**
 * Calculate months between two ISO date strings.
 */
export function monthsBetween(startDate: string, endDate: string = new Date().toISOString()): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
}

// ─── General Utilities ────────────────────────────────────────

/**
 * Generate a unique member ID in the format KYK-001.
 */
export function generateMemberId(index: number): string {
  return `KYK-${String(index).padStart(3, "0")}`;
}

/**
 * Clamp a number between a min and max value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Group an array of items by a key.
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const groupKey = String(item[key]);
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(item);
      return groups;
    },
    {} as Record<string, T[]>
  );
}

/**
 * Sort an array of objects by a date string field (descending by default).
 */
export function sortByDate<T>(array: T[], dateKey: keyof T, direction: "asc" | "desc" = "desc"): T[] {
  return [...array].sort((a, b) => {
    const dateA = new Date(String(a[dateKey])).getTime();
    const dateB = new Date(String(b[dateKey])).getTime();
    return direction === "desc" ? dateB - dateA : dateA - dateB;
  });
}

/**
 * Get the current year and month as { year, month }.
 */
export function getCurrentYearMonth(): { year: number; month: number } {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
}

/**
 * Simulate network delay (for mock API).
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Truncate text with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
}
