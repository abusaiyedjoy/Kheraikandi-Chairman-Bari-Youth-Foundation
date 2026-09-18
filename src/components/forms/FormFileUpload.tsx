"use client";

import * as React from "react";
import { AlertCircle, FileUp, Loader2, X, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FormFileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value"> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  onFileSelect?: (file: File | null) => void;
}

export const FormFileUpload = React.forwardRef<
  HTMLInputElement,
  FormFileUploadProps
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
      onFileSelect,
      disabled,
      accept,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const internalRef = React.useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [isDragOver, setIsDragOver] = React.useState(false);
    const hasError = Boolean(error);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setSelectedFile(file);
      onFileSelect?.(file);
      onChange?.(e);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedFile(null);
      if (internalRef.current) {
        internalRef.current.value = "";
      }
      onFileSelect?.(null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled || isLoading) return;
      const file = e.dataTransfer.files?.[0] || null;
      if (file) {
        setSelectedFile(file);
        onFileSelect?.(file);
      }
    };

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

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => internalRef.current?.click()}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center cursor-pointer transition-all duration-150",
            "bg-card hover:bg-muted/40",
            isDragOver && "border-emerald-600 bg-emerald-50/30",
            !hasError && !isSuccess && !isDragOver && "border-border hover:border-muted-foreground/50",
            hasError && "border-red-500 bg-red-50/10",
            isSuccess && !hasError && "border-emerald-500 bg-emerald-50/10",
            (disabled || isLoading) && "pointer-events-none opacity-50 bg-muted/30",
            className
          )}
        >
          <input
            id={inputId}
            type="file"
            ref={(node) => {
              internalRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            disabled={disabled || isLoading}
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            {...props}
          />

          {isLoading ? (
            <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
              <span>ফাইল প্রসেসিং হচ্ছে...</span>
            </div>
          ) : selectedFile ? (
            <div className="flex w-full items-center justify-between rounded-lg bg-muted/60 p-2.5 text-left">
              <div className="flex items-center gap-2 min-w-0">
                <FileCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClear}
                className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="ফাইল মুছুন"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="py-2 space-y-1">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                <FileUp className="h-5 w-5" />
              </div>
              <p className="text-xs font-medium text-foreground">
                ফাইল ড্রপ করুন অথবা <span className="text-emerald-600 font-semibold underline">ব্রাউজ করুন</span>
              </p>
              <p className="text-[11px] text-muted-foreground">
                {accept ? `সমর্থিত ফরম্যাট: ${accept}` : "PDF, JPG, PNG সর্বোচ্চ ৫ মেগাবাইট"}
              </p>
            </div>
          )}
        </div>

        {hasError && (
          <p
            id={`${inputId}-error`}
            className="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400 animate-fade-in"
          >
            <AlertCircle className="h-3.5 w-3.5" />
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

FormFileUpload.displayName = "FormFileUpload";
