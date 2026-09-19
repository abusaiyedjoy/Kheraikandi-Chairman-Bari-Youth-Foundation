"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, LogIn, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/auth/FormInput";
import { AuthBrandingPanel } from "@/components/auth/AuthBrandingPanel";
import { DemoCredentialsBox } from "@/components/auth/DemoCredentialsBox";
import { useAuth } from "@/providers/AuthProvider";
import { ORG } from "@/lib/constants";

const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "অনুগ্রহ করে আপনার নিবন্ধিত ইমেইল বা মোবাইল নম্বর প্রদান করুন"),
  password: z.string().min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setAuthError(null);
    try {
      const res = await login(data.identifier, data.password, data.rememberMe);
      if (res.success && res.user) {
        if (res.user.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/member/dashboard");
        }
      } else {
        setAuthError(
          res.error || "লগইন ব্যর্থ হয়েছে। তথ্য যাচাই করে পুনরায় চেষ্টা করুন।"
        );
      }
    } catch {
      setAuthError("একটি সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।");
    }
  };

  const handleDemoSelect = async (
    email: string,
    pass: string,
    role: "admin" | "member"
  ) => {
    setValue("identifier", email, { shouldValidate: true });
    setValue("password", pass, { shouldValidate: true });
    setAuthError(null);

    const res = await login(email, pass, true);
    if (res.success) {
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/member/dashboard");
      }
    }
  };

  return (
    <div className="flex-1 grid lg:grid-cols-2 min-h-screen">
      {/* Left side: Organization Branding */}
      <AuthBrandingPanel />

      {/* Right side: Login Form Container */}
      <div className="flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16 py-20 bg-background">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile brand header */}
          <div className="lg:hidden text-center space-y-1">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md mb-2">
              <Sparkles className="h-6 w-6 text-[#D4A72C]" />
            </div>
            <h2 className="text-xl font-bold text-foreground">{ORG.nameBn}</h2>
            <p className="text-xs text-muted-foreground">{ORG.tagline}</p>
          </div>

          {/* Heading */}
          <div className="space-y-1.5 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              স্বাগতম
            </h1>
            <p className="text-sm text-muted-foreground">
              আপনার অ্যাকাউন্টে লগইন করুন
            </p>
          </div>

          {/* Alert error if any */}
          {authError && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 p-3.5 text-xs text-red-700 dark:text-red-400 animate-fade-in">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
              <div className="flex-1 font-medium">{authError}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="ইমেইল বা মোবাইল নম্বর"
              placeholder="admin@example.com অথবা 01700000000"
              icon={Mail}
              error={errors.identifier?.message}
              {...register("identifier")}
            />

            <FormInput
              label="পাসওয়ার্ড"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              error={errors.password?.message}
              {...register("password")}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-muted-foreground hover:text-foreground">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-emerald-600 focus:ring-emerald-500/20"
                  {...register("rememberMe")}
                />
                <span>আমাকে মনে রাখুন</span>
              </label>

              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              isLoading={isSubmitting}
              leftIcon={<LogIn className="h-4 w-4" />}
              className="w-full justify-center text-sm font-bold shadow-md shadow-emerald-800/10"
            >
              লগইন করুন
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
              <span className="bg-background px-3 text-muted-foreground font-medium">
                অথবা তাৎক্ষণিক ডেমো
              </span>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <DemoCredentialsBox
            isLoading={isSubmitting}
            onSelectDemo={handleDemoSelect}
          />

          {/* Public links */}
          <div className="pt-2 text-center text-xs text-muted-foreground">
            সমিতির সদস্য নন?{" "}
            <Link
              href="/contact"
              className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              সদস্য হতে আবেদন করুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
