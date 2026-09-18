"use client";

import * as React from "react";
import { AlertCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FormCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
}

export const FormCheckbox = React.forwardRef<
  HTMLInputElement,
  FormCheckboxProps
>(
  (
    {
      className,
      label,
      description,
      error,
      required = false,
      disabled,
      id,
      checked,
      defaultChecked,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;
    const hasError = Boolean(error);
    const [isChecked, setIsChecked] = React.useState<boolean>(
      Boolean(checked ?? defaultChecked ?? false)
    );

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(Boolean(checked));
      }
    }, [checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked);
      onChange?.(e);
    };

    return (
      <div className="w-full space-y-1 text-left">
        <label
          htmlFor={checkboxId}
          className={cn(
            "relative flex items-start gap-2.5 cursor-pointer select-none",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
        >
          <div className="relative flex items-center pt-0.5">
            <input
              id={checkboxId}
              type="checkbox"
              ref={ref}
              disabled={disabled}
              checked={checked}
              defaultChecked={defaultChecked}
              onChange={handleChange}
              aria-invalid={hasError}
              className="peer sr-only"
              {...props}
            />
            <div
              className={cn(
                "h-4 w-4 rounded border transition-colors flex items-center justify-center",
                "border-border bg-card peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
                isChecked && "bg-primary border-primary text-primary-foreground",
                hasError && "border-red-500 bg-red-50/30"
              )}
            >
              {isChecked && <Check className="h-3 w-3 text-white stroke-[3]" />}
            </div>
          </div>

          <div className="flex-1 text-xs">
            <div className="font-semibold text-foreground leading-normal flex items-center gap-1">
              <span>{label}</span>
              {required && <span className="text-red-500 font-bold">*</span>}
            </div>
            {description && (
              <p className="text-muted-foreground mt-0.5 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </label>

        {hasError && (
          <p className="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400 pl-6.5 animate-fade-in">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";
