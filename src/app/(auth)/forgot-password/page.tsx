"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Send,
  CheckCircle2,
  ArrowLeft,
  KeyRound,
  RotateCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/auth/FormInput";
import { ORG } from "@/lib/constants";

const forgotPasswordSchema = z.object({
  identifier: z
    .string()
    .min(1, "অনুগ্রহ করে নিবন্ধিত ইমেইল বা মোবাইল নম্বর প্রদান করুন"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedTarget, setSubmittedTarget] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { identifier: "" },
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    // Artificial small delay to simulate network request
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmittedTarget(data.identifier);
    setIsSuccess(true);
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20 bg-background">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl shadow-emerald-950/5 space-y-6">
          {/* Header Icon */}
          <div className="text-center space-y-2">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-1 border border-emerald-500/20 shadow-xs">
              <KeyRound className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              পাসওয়ার্ড ভুলে গেছেন?
            </h1>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              আপনার নিবন্ধিত ইমেইল বা মোবাইল নম্বর দিন। আমরা পাসওয়ার্ড রিসেট
              লিংক পাঠিয়ে দেব।
            </p>
          </div>

          {!isSuccess ? (
            /* Reset Request Form */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                label="ইমেইল বা মোবাইল নম্বর"
                placeholder="উদাহরণ: member@example.com"
                icon={Mail}
                error={errors.identifier?.message}
                {...register("identifier")}
              />

              <Button
                type="submit"
                size="lg"
                isLoading={isSubmitting}
                leftIcon={<Send className="h-4 w-4" />}
                className="w-full justify-center text-sm font-bold shadow-md shadow-emerald-800/10"
              >
                রিসেট লিংক পাঠান
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>লগইন পেজে ফিরে যান</span>
                </Link>
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="space-y-5 animate-fade-in text-center">
              <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/60 dark:bg-emerald-950/40 p-5 space-y-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                  রিসেট লিংক পাঠানো হয়েছে!
                </h3>
                <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 leading-relaxed">
                  <strong className="font-semibold text-foreground">
                    {submittedTarget}
                  </strong>{" "}
                  ঠিকানায় একটি পাসওয়ার্ড রিসেট লিংক প্রেরণ করা হয়েছে। ইনবক্স
                  বা মেসেজ চেক করুন।
                </p>
              </div>

              {/* Demo action shortcut */}
              <div className="rounded-xl border border-dashed border-amber-400/40 bg-amber-50/40 dark:bg-amber-950/20 p-3 text-xs space-y-2">
                <p className="font-semibold text-amber-900 dark:text-amber-300">
                  ডেমো মোড টেস্ট করুন:
                </p>
                <Link href="/reset-password">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200"
                  >
                    সরাসরি পাসওয়ার্ড রিসেট পেজে যান
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSuccess(false)}
                  leftIcon={<RotateCw className="h-3.5 w-3.5" />}
                  className="flex-1 text-xs"
                >
                  আবার পাঠান
                </Button>
                <Link href="/login" className="flex-1">
                  <Button size="sm" className="w-full text-xs font-semibold">
                    লগইন করুন
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Footer note */}
          <div className="border-t border-border pt-4 text-center text-[11px] text-muted-foreground">
            জরুরি সহায়তার জন্য যোগাযোগ করুন:{" "}
            <span className="font-semibold text-foreground">{ORG.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
