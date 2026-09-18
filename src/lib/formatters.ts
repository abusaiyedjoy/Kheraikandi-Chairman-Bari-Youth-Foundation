// ============================================================
// Formatters — খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ
// ============================================================

import { FINANCE, MONTHS_BN, MONTHS_EN } from "./constants";

/**
 * Format a number as Bangladeshi Taka currency.
 * Always shows the ৳ symbol with 2 decimal places.
 * @example formatCurrency(1500) → "৳১,৫০০.০০" or "৳1,500.00"
 */
export function formatCurrency(
  amount: number,
  options: { compact?: boolean; showSymbol?: boolean } = {}
): string {
  const { compact = false, showSymbol = true } = options;
  const symbol = showSymbol ? FINANCE.CURRENCY_SYMBOL : "";

  if (compact && Math.abs(amount) >= 100_000) {
    const lakh = amount / 100_000;
    return `${symbol}${lakh.toFixed(2)} লক্ষ`;
  }

  if (compact && Math.abs(amount) >= 1000) {
    const thousands = amount / 1000;
    return `${symbol}${thousands.toFixed(1)}K`;
  }

  return `${symbol}${amount.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Format currency without decimal places (for whole numbers).
 */
export function formatCurrencyInt(amount: number): string {
  return `${FINANCE.CURRENCY_SYMBOL}${Math.round(amount).toLocaleString("en-BD")}`;
}

/**
 * Format an ISO date string into a human-readable Bengali date.
 * @example formatDate("2024-01-15") → "১৫ জানুয়ারি ২০২৪"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "অজানা তারিখ";
  const day = date.getDate();
  const monthBn = MONTHS_BN[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${monthBn} ${year}`;
}

/**
 * Format a date in short English format.
 * @example formatDateShort("2024-01-15") → "Jan 15, 2024"
 */
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format a year-month pair into a Bengali month label.
 * @example formatMonthYear(2024, 1) → "জানুয়ারি ২০২৪"
 */
export function formatMonthYear(year: number, month: number): string {
  const monthBn = MONTHS_BN[month - 1];
  return `${monthBn} ${year}`;
}

/**
 * Format an ISO datetime string into a readable timestamp.
 * @example formatDateTime("2024-01-15T10:30:00Z") → "Jan 15, 2024 at 10:30 AM"
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Get the relative time label (e.g., "2 days ago", "just now").
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "এইমাত্র";
  if (diffMinutes < 60) return `${diffMinutes} মিনিট আগে`;
  if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;
  if (diffDays < 7) return `${diffDays} দিন আগে`;
  return formatDate(dateString);
}

/**
 * Format a month index (1-12) to the Bengali month name.
 */
export function formatMonthBn(month: number): string {
  return MONTHS_BN[month - 1] ?? "অজানা";
}

/**
 * Format a month index (1-12) to the English month name.
 */
export function formatMonthEn(month: number): string {
  return MONTHS_EN[month - 1] ?? "Unknown";
}

/**
 * Format a percentage value.
 * @example formatPercent(0.9) → "90%"
 */
export function formatPercent(value: number, decimals = 0): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format a number with locale-aware comma separators.
 */
export function formatNumber(value: number): string {
  return value.toLocaleString("en-BD");
}
