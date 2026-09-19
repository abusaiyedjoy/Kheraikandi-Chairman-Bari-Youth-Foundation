"use client";

import React from "react";
import { RefreshCw, CheckCircle2, Clock, XCircle } from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { Button } from "@/components/ui/button";
import { REFUNDS, getPendingRefunds, getTotalRefundsPaid } from "@/data/refunds";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<string, { label: string; cls: string; icon: React.ElementType }> = {
  paid: { label: "পরিশোধিত", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400", icon: CheckCircle2 },
  approved: { label: "অনুমোদিত", cls: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400", icon: CheckCircle2 },
  pending: { label: "অপেক্ষমান", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400", icon: Clock },
  rejected: { label: "প্রত্যাখ্যাত", cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400", icon: XCircle },
};

const TYPE_LABELS: Record<string, string> = {
  full_savings: "সম্পূর্ণ সঞ্চয় ফেরত",
  partial_savings: "আংশিক সঞ্চয় উত্তোলন",
};

export default function AdminRefundsPage() {
  const pending = getPendingRefunds();
  const totalPaid = getTotalRefundsPaid();

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "অ্যাডমিন", href: "/admin/dashboard" },
        { label: "ফেরত আবেদন" },
      ]}
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">

        <div>
          <h1 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            সঞ্চয় ফেরত আবেদন
          </h1>
          <p className="text-sm text-muted-foreground">সদস্যদের সঞ্চয় ফেরত ও উত্তোলনের আবেদন</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 p-4 text-center">
            <p className="text-lg font-extrabold text-amber-700 dark:text-amber-400">{pending.length}</p>
            <p className="text-xs text-amber-600/80 mt-0.5">অপেক্ষমান আবেদন</p>
          </div>
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 text-center">
            <p className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400">{formatCurrency(totalPaid)}</p>
            <p className="text-xs text-emerald-600/80 mt-0.5">মোট ফেরত পরিশোধ</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-lg font-extrabold text-foreground">{REFUNDS.length}</p>
            <p className="text-xs text-muted-foreground mt-0.5">মোট আবেদন</p>
          </div>
        </div>

        <div className="space-y-4">
          {REFUNDS.map((r) => {
            const status = STATUS_CONFIG[r.status] ?? STATUS_CONFIG.pending;
            const StatusIcon = status.icon;
            return (
              <div key={r.id} className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-xs">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs shrink-0">
                      {r.memberName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{r.memberName}</p>
                      <p className="text-xs text-muted-foreground">{TYPE_LABELS[r.refundType] || r.refundType}</p>
                    </div>
                  </div>
                  <span className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold shrink-0", status.cls)}>
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground">{r.reason}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">আবেদনকৃত</p>
                    <p className="font-bold text-foreground">{formatCurrency(r.requestedAmount)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">অনুমোদিত</p>
                    <p className="font-bold text-foreground">{r.approvedAmount ? formatCurrency(r.approvedAmount) : "—"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">আবেদনের তারিখ</p>
                    <p className="font-medium text-foreground">{r.requestDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">পরিশোধ তারিখ</p>
                    <p className="font-medium text-foreground">{r.paymentDate ?? "—"}</p>
                  </div>
                </div>

                {r.remarks && (
                  <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">{r.remarks}</p>
                )}

                {r.status === "pending" && (
                  <div className="flex gap-2 pt-1 border-t border-border">
                    <Button size="sm" className="text-xs flex-1">অনুমোদন করুন</Button>
                    <Button variant="outline" size="sm" className="text-xs flex-1 border-red-200 text-red-600 hover:bg-red-50">
                      প্রত্যাখ্যান করুন
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </AdminLayout>
  );
}
