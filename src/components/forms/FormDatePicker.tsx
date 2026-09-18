"use client";

import * as React from "react";
import { AlertCircle, Calendar, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FormDatePickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
}

export const FormDatePicker = React.forwardRef<
  HTMLInputElement,
  FormDatePickerProps
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
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const hasError = Boolean(error);

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
          <div className="pointer-events-none absolute left-3 flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          </div>

          <input
            id={inputId}
            type="date"
            ref={ref}
            disabled={disabled || isLoading}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            className={cn(
              "flex h-10 w-full rounded-lg border bg-card pl-10 pr-10 py-2 text-sm text-foreground shadow-xs transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50",
              !hasError && !isSuccess && "border-border hover:border-muted-foreground/40",
              hasError && "border-red-500 focus-visible:ring-red-500 bg-red-50/20 text-red-950 dark:text-red-200",
              isSuccess && !hasError && "border-emerald-500 focus-visible:ring-emerald-500 bg-emerald-50/20",
              className
            )}
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

FormDatePicker.displayName = "FormDatePicker";
