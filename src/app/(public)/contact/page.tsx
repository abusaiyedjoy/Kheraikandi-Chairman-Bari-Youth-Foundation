"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Users,
  Heart,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { ORG } from "@/lib/constants";

const CONTACT_REASONS = [
  "সদস্যপদের আবেদন",
  "তহবিল সংক্রান্ত প্রশ্ন",
  "সামাজিক কার্যক্রমে অংশগ্রহণ",
  "তথ্য ও অভিযোগ",
  "অন্যান্য",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In a real app this would POST to an API
    setSubmitted(true);
  }

  return (
    <>
      <PageHeader
        title="যোগাযোগ করুন"
        subtitle="আমাদের সাথে যোগাযোগ করুন। আমরা সর্বদা সদস্যদের ও সম্প্রদায়ের প্রশ্নের উত্তর দিতে প্রস্তুত।"
        breadcrumbs={[
          { label: "হোম", href: "/" },
          { label: "যোগাযোগ" },
        ]}
      />

      <section className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <SectionHeader
                title="যোগাযোগের তথ্য"
                subtitle="বিভিন্ন মাধ্যমে আমাদের সাথে যোগাযোগ করুন"
              />

              {/* Info cards */}
              {[
                {
                  icon: MapPin,
                  title: "ঠিকানা",
                  lines: [ORG.address],
                  color: "text-emerald-600",
                  bg: "bg-emerald-50 dark:bg-emerald-950/30",
                },
                {
                  icon: Phone,
                  title: "ফোন",
                  lines: [ORG.phone],
                  href: `tel:${ORG.phone}`,
                  color: "text-sky-600",
                  bg: "bg-sky-50 dark:bg-sky-950/30",
                },
                {
                  icon: Mail,
                  title: "ইমেইল",
                  lines: [ORG.email],
                  href: `mailto:${ORG.email}`,
                  color: "text-amber-600",
                  bg: "bg-amber-50 dark:bg-amber-950/30",
                },
                {
                  icon: Clock,
                  title: "অফিস সময়",
                  lines: [
                    "শুক্র–শনিবার: সন্ধ্যা ৬টা – রাত ৮টা",
                    "জরুরি যোগাযোগ: যেকোনো সময়",
                  ],
                  color: "text-rose-600",
                  bg: "bg-rose-50 dark:bg-rose-950/30",
                },
              ].map(({ icon: Icon, title, lines, href, color, bg }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs hover:shadow-md transition-all"
                >
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`}
                  >
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground mb-1">{title}</p>
                    {lines.map((line, i) =>
                      href ? (
                        <a
                          key={i}
                          href={href}
                          className="block text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={i} className="text-xs text-muted-foreground">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </div>
              ))}

              {/* Quick facts */}
              <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 p-5">
                <p className="text-xs font-bold text-foreground mb-3 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-emerald-600" />
                  আমাদের সাথে যুক্ত হওয়া কেন উচিত
                </p>
                <ul className="space-y-1.5">
                  {[
                    "মাত্র ৳১০০/মাস চাঁদায় নিজের সঞ্চয় তৈরি করুন",
                    "৯০% আপনার নিজের নামে জমা থাকে",
                    "গ্রামের উন্নয়নে সক্রিয় ভূমিকা রাখুন",
                    "সামাজিক নেটওয়ার্ক ও সহযোগিতা",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] rounded-3xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 p-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h2 className="text-xl font-extrabold text-foreground mb-2">
                    বার্তা পাঠানো হয়েছে!
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                    আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ
                    করব। ধন্যবাদ।
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        reason: "",
                        message: "",
                      });
                    }}
                  >
                    আরেকটি বার্তা পাঠান
                  </Button>
                </div>
              ) : (
                <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-foreground">বার্তা পাঠান</h2>
                      <p className="text-xs text-muted-foreground">সব তারকা (*) চিহ্নিত তথ্য আবশ্যক</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-semibold text-foreground mb-1.5"
                        >
                          আপনার নাম *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="পূর্ণ নাম লিখুন"
                          className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-semibold text-foreground mb-1.5"
                        >
                          মোবাইল নম্বর *
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="01XXXXXXXXX"
                          className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-foreground mb-1.5"
                      >
                        ইমেইল (ঐচ্ছিক)
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@example.com"
                        className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      />
                    </div>

                    {/* Reason */}
                    <div>
                      <label
                        htmlFor="reason"
                        className="block text-xs font-semibold text-foreground mb-1.5"
                      >
                        যোগাযোগের কারণ *
                      </label>
                      <select
                        id="reason"
                        name="reason"
                        required
                        value={formData.reason}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      >
                        <option value="">কারণ নির্বাচন করুন</option>
                        {CONTACT_REASONS.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-semibold text-foreground mb-1.5"
                      >
                        বিস্তারিত বার্তা *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="আপনার বার্তা বিস্তারিত লিখুন..."
                        className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full font-bold"
                      rightIcon={<Send className="h-4 w-4" />}
                    >
                      বার্তা পাঠান
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="py-8 bg-muted/20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-center gap-4">
            <MapPin className="h-10 w-10 text-primary shrink-0" />
            <div>
              <p className="font-bold text-sm text-foreground">আমাদের অবস্থান</p>
              <p className="text-xs text-muted-foreground">{ORG.address}</p>
            </div>
            <a
              href={`https://maps.google.com/?q=Kheraikandi,Bhairab,Kishoreganj,Bangladesh`}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:ml-auto"
            >
              <Button variant="outline" size="sm" leftIcon={<MapPin className="h-3.5 w-3.5" />}>
                মানচিত্রে দেখুন
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
