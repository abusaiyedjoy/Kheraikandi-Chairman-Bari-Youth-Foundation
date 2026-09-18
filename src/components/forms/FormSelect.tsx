"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FormSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: FormSelectOption[];
  placeholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      className,
      label,
      options,
      placeholder,
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
    const selectId = id || generatedId;
    const hasError = Boolean(error);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="flex items-center gap-1 text-sm font-semibold text-foreground"
          >
            <span>{label}</span>
            {required && <span className="text-red-500 font-bold">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            disabled={disabled || isLoading}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${selectId}-error`
                : helperText
                ? `${selectId}-helper`
                : undefined
            }
            className={cn(
              "flex h-10 w-full appearance-none rounded-lg border bg-card px-3 py-2 pr-10 text-sm text-foreground shadow-xs transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50",
              !hasError && !isSuccess && "border-border hover:border-muted-foreground/40",
              hasError && "border-red-500 focus-visible:ring-red-500 bg-red-50/20 text-red-950 dark:text-red-200",
              isSuccess && !hasError && "border-emerald-500 focus-visible:ring-emerald-500 bg-emerald-50/20",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Right indicator icons */}
          <div className="pointer-events-none absolute right-3 flex items-center gap-1 text-muted-foreground">
            {isLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
            {isSuccess && !isLoading && !hasError && (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            )}
            {hasError && !isLoading && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
            {!isLoading && !isSuccess && !hasError && (
              <ChevronDown className="h-4 w-4 opacity-70" />
            )}
          </div>
        </div>

        {hasError && (
          <p
            id={`${selectId}-error`}
            className="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400 animate-fade-in"
          >
            <span>{error}</span>
          </p>
        )}

        {helperText && !hasError && (
          <p id={`${selectId}-helper`} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
