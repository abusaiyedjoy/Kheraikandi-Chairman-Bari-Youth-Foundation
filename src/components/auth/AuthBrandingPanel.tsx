import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  PiggyBank,
  HeartHandshake,
  CheckCircle2,
  Users,
} from "lucide-react";
import { ORG } from "@/lib/constants";

export function AuthBrandingPanel() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#072410] via-[#0e3b1c] to-[#166534] p-12 text-white">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-[#D4A72C]/15 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top: Brand Logo */}
      <div className="relative z-10">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg group-hover:scale-105 transition-transform">
            <Sparkles className="h-6 w-6 text-[#D4A72C]" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-white">
              {ORG.nameBn}
            </h2>
            <p className="text-xs text-emerald-200/80 font-medium">
              {ORG.abbreviation} • {ORG.tagline}
            </p>
          </div>
        </Link>
      </div>

      {/* Middle: Value Proposition & 90/10 Rule Highlight */}
      <div className="relative z-10 my-auto py-12 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-3.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-[#D4A72C]" />
            <span>১০০% আর্থিক স্বচ্ছতা ও নৈতিক জবাবদিহিতা</span>
          </div>

          <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight">
            স্বচ্ছ সঞ্চয় ও গ্রামীণ উন্নয়নের আধুনিক পোর্টাল
          </h1>

          <p className="text-sm text-emerald-100/80 leading-relaxed max-w-md">
            সদস্যদের জন্য ব্যক্তিগত সঞ্চয় হিসাব, রসিদ ডাউনলোড, কল্যাণ অনুদান
            এবং কেন্দ্রীয় ব্যালেন্স পর্যবেক্ষণের সমন্বিত ডিজিটাল প্ল্যাটফর্ম।
          </p>
        </div>

        {/* 90/10 Card Feature Highlight */}
        <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-5 shadow-xl space-y-4 max-w-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              সঞ্চয় নীতি বৈশিষ্ট্য
            </span>
            <span className="rounded-full bg-[#D4A72C]/20 text-[#D4A72C] border border-[#D4A72C]/30 px-2.5 py-0.5 text-[11px] font-bold">
              ৯০ / ১০ অনুপাত
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl bg-black/20 p-3 border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                <PiggyBank className="h-4 w-4" />
                <span>৯০% আমানত</span>
              </div>
              <p className="text-[11px] text-white/70">
                সদস্যের ব্যক্তিগত ফেরতযোগ্য সঞ্চয় তহবিল
              </p>
            </div>

            <div className="rounded-xl bg-black/20 p-3 border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-[#D4A72C] font-semibold">
                <HeartHandshake className="h-4 w-4" />
                <span>১০% কল্যাণ</span>
              </div>
              <p className="text-[11px] text-white/70">
                গ্রামের রাস্তাঘাট ও জনকল্যাণ তহবিল
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            {[
              "মাসিক চাঁদার ডিজিটাল ভাউচার ও স্বয়ংক্রিয় হিসাব",
              "সকল সদস্যের জন্য উন্মুক্ত কেন্দ্রীয় হিসাব প্রতিবেদন",
              "অনলাইনে তাৎক্ষণিক জরুরি অনুদান ও ঋণ আবেদন",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-xs text-white/90">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Organization Footer info */}
      <div className="relative z-10 border-t border-white/10 pt-6 flex items-center justify-between text-xs text-emerald-200/70">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-[#D4A72C]" />
          <span>২৫+ সক্রিয় সদস্য পরিবার</span>
        </div>
        <span>প্রতিষ্ঠা {ORG.foundedYear} • খিরাইকান্দি, ভৈরব</span>
      </div>
    </div>
  );
}
