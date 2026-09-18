"use client";

import React, { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface DateRange {
  startDate: string;
  endDate: string;
  label?: string;
}

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  className?: string;
}

const presets = [
  {
    id: "this_month",
    label: "চলতি মাস",
    getRange: () => {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];
      return { startDate: firstDay, endDate: lastDay, label: "চলতি মাস" };
    },
  },
  {
    id: "last_month",
    label: "গত মাস",
    getRange: () => {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split("T")[0];
      const lastDay = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split("T")[0];
      return { startDate: firstDay, endDate: lastDay, label: "গত মাস" };
    },
  },
  {
    id: "this_year",
    label: "চলতি বছর",
    getRange: () => {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), 0, 1).toISOString().split("T")[0];
      const lastDay = new Date(now.getFullYear(), 11, 31).toISOString().split("T")[0];
      return { startDate: firstDay, endDate: lastDay, label: "চলতি বছর" };
    },
  },
  {
    id: "all_time",
    label: "সব সময়",
    getRange: () => ({
      startDate: "2019-01-01",
      endDate: new Date().toISOString().split("T")[0],
      label: "সব সময়",
    }),
  },
];

export function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>("this_month");
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(value?.startDate ?? presets[0].getRange().startDate);
  const [endDate, setEndDate] = useState(value?.endDate ?? presets[0].getRange().endDate);

  const handleSelectPreset = (presetId: string) => {
    const p = presets.find((item) => item.id === presetId);
    if (p) {
      const range = p.getRange();
      setSelectedPreset(presetId);
      setStartDate(range.startDate);
      setEndDate(range.endDate);
      onChange?.(range);
      setIsOpen(false);
    }
  };

  const handleCustomApply = () => {
    setSelectedPreset("custom");
    onChange?.({ startDate, endDate, label: "কাস্টম রেঞ্জ" });
    setIsOpen(false);
  };

  return (
    <div className={cn("relative inline-block text-left", className)}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        leftIcon={<Calendar className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />}
        rightIcon={<ChevronDown className="h-3.5 w-3.5 opacity-60" />}
        className="text-xs font-normal"
      >
        <span>
          {value?.label ?? presets.find((p) => p.id === selectedPreset)?.label ?? "তারিখ সীমা"}
        </span>
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 sm:left-0 z-50 mt-2 w-72 rounded-xl border border-border bg-card p-3 shadow-xl space-y-3 animate-fade-in text-xs">
            {/* Presets buttons */}
            <div className="grid grid-cols-2 gap-1.5 border-b border-border pb-2.5">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset.id)}
                  className={cn(
                    "rounded-lg px-2.5 py-1.5 text-left font-medium transition-colors",
                    selectedPreset === preset.id
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Custom inputs */}
            <div className="space-y-2">
              <span className="font-semibold text-muted-foreground block text-[11px]">
                নির্দিষ্ট তারিখ নির্বাচন করুন:
              </span>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-muted-foreground w-12">হতে:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex-1 rounded border border-border bg-card px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <label className="text-muted-foreground w-12">পর্যন্ত:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex-1 rounded border border-border bg-card px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            <Button
              size="sm"
              className="w-full text-xs"
              onClick={handleCustomApply}
            >
              প্রয়োগ করুন
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
