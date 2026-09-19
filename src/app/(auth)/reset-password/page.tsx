"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, CheckCircle2, ArrowRight, ShieldCheck, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/auth/FormInput";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),
    confirmPassword: z
      .string()
      .min(1, "পাসওয়ার্ড নিশ্চিতকরণ আবশ্যক"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "উভয় পাসওয়ার্ড হুবহু মিলতে হবে",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

function getPasswordStrength(pass: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!pass) return { score: 0, label: "খালি", color: "bg-muted" };
  let score = 0;
  if (pass.length >= 6) score++;
  if (pass.length >= 8) score++;
  if (/[A-Z]/.test(pass) || /[0-9]/.test(pass)) score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;

  if (score <= 1) return { score: 1, label: "দুর্বল", color: "bg-red-500" };
  if (score === 2) return { score: 2, label: "মোটামুটি", color: "bg-amber-500" };
  if (score === 3) return { score: 3, label: "ভাল", color: "bg-emerald-500" };
  return { score: 4, label: "অত্যন্ত শক্তিশালী", color: "bg-emerald-600" };
}

export default function ResetPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const currentPassword = watch("newPassword");
  const strength = getPasswordStrength(currentPassword);

  const onSubmit = async (_data: ResetPasswordValues) => {
    // Artificial small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSuccess(true);
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20 bg-background">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl shadow-emerald-950/5 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-1 border border-emerald-500/20 shadow-xs">
              <Key className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              নতুন পাসওয়ার্ড তৈরি করুন
            </h1>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              আপনার অ্যাকাউন্টের জন্য একটি নতুন ও শক্তিশালী পাসওয়ার্ড নির্ধারণ
              করুন।
            </p>
          </div>

          {!isSuccess ? (
            /* Reset Form */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                label="নতুন পাসওয়ার্ড"
                type="password"
                placeholder="কমপক্ষে ৬ অক্ষর"
                icon={Lock}
                error={errors.newPassword?.message}
                {...register("newPassword")}
              />

              {/* Password strength bar */}
              {currentPassword && (
                <div className="space-y-1.5 pt-0.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">পাসওয়ার্ডের মান:</span>
                    <span className="font-semibold text-foreground">
                      {strength.label}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden flex gap-1">
                    {[1, 2, 3, 4].map((index) => (
                      <div
                        key={index}
                        className={`h-full flex-1 rounded-full transition-all duration-300 ${
                          index <= strength.score ? strength.color : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <FormInput
                label="পাসওয়ার্ড নিশ্চিত করুন"
                type="password"
                placeholder="নতুন পাসওয়ার্ডটি পুনরায় লিখুন"
                icon={ShieldCheck}
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <Button
                type="submit"
                size="lg"
                isLoading={isSubmitting}
                className="w-full justify-center text-sm font-bold shadow-md shadow-emerald-800/10 mt-2"
              >
                পাসওয়ার্ড সংরক্ষণ করুন
              </Button>
            </form>
          ) : (
            /* Success State */
            <div className="space-y-5 animate-fade-in text-center">
              <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40 p-5 space-y-2.5">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                  পাসওয়ার্ড পরিবর্তন সফল হয়েছে!
                </h3>
                <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 leading-relaxed">
                  আপনার নতুন পাসওয়ার্ড সফলভাবে সংরক্ষিত হয়েছে। আপনি এখন নতুন
                  পাসওয়ার্ড দিয়ে অ্যাকাউন্টে প্রবেশ করতে পারেন।
                </p>
              </div>

              <Link href="/login">
                <Button
                  size="lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="w-full justify-center text-sm font-bold shadow-md shadow-emerald-800/10"
                >
                  এখনই লগইন করুন
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
