"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  isLoading?: boolean;
  className?: string;
  showShortcut?: boolean;
}

export function SearchInput({
  value: controlledValue,
  defaultValue = "",
  onChange,
  onSearch,
  placeholder = "অনুসন্ধান করুন (Search)...",
  debounceMs = 300,
  isLoading = false,
  className,
  showShortcut = false,
}: SearchInputProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  // Debounce notification when value changes
  useEffect(() => {
    if (!isControlled) {
      const timer = setTimeout(() => {
        onChange?.(uncontrolledValue);
      }, debounceMs);
      return () => clearTimeout(timer);
    }
  }, [uncontrolledValue, isControlled, debounceMs, onChange]);

  const handleClear = () => {
    if (!isControlled) {
      setUncontrolledValue("");
    }
    onChange?.("");
    onSearch?.("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(value);
    }
    if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <div className={cn("relative flex items-center w-full", className)}>
      <div className="pointer-events-none absolute left-3 flex items-center text-muted-foreground">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
        ) : (
          <Search className="h-4 w-4" />
        )}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          if (!isControlled) {
            setUncontrolledValue(e.target.value);
          } else {
            onChange?.(e.target.value);
          }
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "h-10 w-full rounded-lg border border-border bg-card pl-9 pr-14 py-2 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent",
          "hover:border-muted-foreground/30"
        )}
      />

      <div className="absolute right-2.5 flex items-center gap-1.5">
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="মুছুন"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {showShortcut && !value && (
          <kbd className="hidden sm:inline-flex items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            /
          </kbd>
        )}
      </div>
    </div>
  );
}
