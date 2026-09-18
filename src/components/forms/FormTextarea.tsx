"use client";

import * as React from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
}

export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FormTextareaProps
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
      maxLength,
      showCharCount = false,
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
    const textareaId = id || generatedId;
    const hasError = Boolean(error);
    const [charCount, setCharCount] = React.useState<number>(() => {
      const initial = value ?? defaultValue ?? "";
      return String(initial).length;
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="w-full space-y-1.5 text-left">
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={textareaId}
              className="flex items-center gap-1 text-sm font-semibold text-foreground"
            >
              <span>{label}</span>
              {required && <span className="text-red-500 font-bold">*</span>}
            </label>
          )}
          {showCharCount && maxLength && (
            <span className="text-[11px] text-muted-foreground font-mono">
              {charCount}/{maxLength}
            </span>
          )}
        </div>

        <div className="relative">
          <textarea
            id={textareaId}
            ref={ref}
            disabled={disabled || isLoading}
            maxLength={maxLength}
            onChange={handleChange}
            value={value}
            defaultValue={defaultValue}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${textareaId}-error`
                : helperText
                ? `${textareaId}-helper`
                : undefined
            }
            className={cn(
              "flex min-h-[90px] w-full rounded-lg border bg-card px-3 py-2 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50",
              !hasError && !isSuccess && "border-border hover:border-muted-foreground/40",
              hasError && "border-red-500 focus-visible:ring-red-500 bg-red-50/20 text-red-950 dark:text-red-200",
              isSuccess && !hasError && "border-emerald-500 focus-visible:ring-emerald-500 bg-emerald-50/20",
              className
            )}
            {...props}
          />

          {/* Status corner icon */}
          <div className="absolute right-3 top-3">
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
            id={`${textareaId}-error`}
            className="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400 animate-fade-in"
          >
            <span>{error}</span>
          </p>
        )}

        {helperText && !hasError && (
          <p id={`${textareaId}-helper`} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
