"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { FINANCE } from "@/lib/constants";
import { calculateSavings, calculateDevelopmentAllocation } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface FormCurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  showBreakdownHint?: boolean;
}

export const FormCurrencyInput = React.forwardRef<
  HTMLInputElement,
  FormCurrencyInputProps
>(
  (
    {
      className,
      label,
      error,
      helperText,
      required = false,
      isLoading = false,
      isSuccess = false,
      showBreakdownHint = true,
      disabled,
      id,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const hasError = Boolean(error);
    const [currentAmount, setCurrentAmount] = React.useState<number>(() => {
      const num = Number(value ?? defaultValue ?? 0);
      return isNaN(num) ? 0 : num;
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value);
      setCurrentAmount(isNaN(val) ? 0 : val);
      onChange?.(e);
    };

    const savingsHint = calculateSavings(currentAmount);
    const devHint = calculateDevelopmentAllocation(currentAmount);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="flex items-center gap-1 text-sm font-semibold text-foreground"
          >
            <span>{label}</span>
            {required && <span className="text-red-500 font-bold">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {/* Taka symbol prefix */}
          <div className="pointer-events-none absolute left-3 flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-900/60 font-bold text-xs text-emerald-800 dark:text-emerald-300">
            {FINANCE.CURRENCY_SYMBOL}
          </div>

          <input
            id={inputId}
            type="number"
            step="any"
            min="0"
            ref={ref}
            disabled={disabled || isLoading}
            value={value}
            defaultValue={defaultValue}
            onChange={handleInputChange}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            className={cn(
              "flex h-10 w-full rounded-lg border bg-card pl-11 pr-10 py-2 text-sm font-medium tabular-nums text-foreground shadow-xs transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50",
              !hasError && !isSuccess && "border-border hover:border-muted-foreground/40",
              hasError && "border-red-500 focus-visible:ring-red-500 bg-red-50/20 text-red-950 dark:text-red-200",
              isSuccess && !hasError && "border-emerald-500 focus-visible:ring-emerald-500 bg-emerald-50/20",
              className
            )}
            placeholder="0.00"
            {...props}
          />

          <div className="pointer-events-none absolute right-3 flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
            {isSuccess && !isLoading && !hasError && (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            )}
            {hasError && !isLoading && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>

        {/* Live 90/10 split breakdown hint */}
        {showBreakdownHint && currentAmount > 0 && !hasError && (
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md">
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">
              সঞ্চয় (৯০%): ৳{savingsHint.toFixed(2)}
            </span>
            <span>•</span>
            <span className="text-amber-700 dark:text-amber-400 font-medium">
              উন্নয়ন তহবিল (১০%): ৳{devHint.toFixed(2)}
            </span>
          </div>
        )}

        {hasError && (
          <p
            id={`${inputId}-error`}
            className="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400 animate-fade-in"
          >
            <span>{error}</span>
          </p>
        )}

        {helperText && !hasError && (
          <p id={`${inputId}-helper`} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormCurrencyInput.displayName = "FormCurrencyInput";
