import React from "react";
import Link from "next/link";
import { ORG } from "@/lib/constants";
import { Sparkles, MapPin, Phone, Mail, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface SiteFooterProps {
  className?: string;
}

export function SiteFooter({ className }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-border bg-card/60 text-muted-foreground text-xs transition-colors",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
                <Sparkles className="h-4 w-4 text-amber-300" />
              </div>
              <span className="font-extrabold text-base text-foreground tracking-tight">
                {ORG.nameBn}
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-md">
              {ORG.tagline} — খিরাইকান্দি গ্রামের যুব সমাজের ঐক্য, নৈতিক মূল্যবোধ ও আর্থিক স্বচ্ছতার ভিত্তিতে পরিচালিত কল্যাণমূলক সমাজসেবামূলক প্রতিষ্ঠান।
            </p>

            {/* 90/10 Transparency pledge */}
            <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 p-3 max-w-md">
              <p className="font-semibold text-emerald-900 dark:text-emerald-300">
                স্বচ্ছ আর্থিক অঙ্গীকার:
              </p>
              <p className="mt-0.5 text-[11px] text-emerald-800/80 dark:text-emerald-400/80">
                সংগৃহীত প্রতিটি ১০০ টাকার মধ্যে ৯০ টাকা সদস্যের ব্যক্তিগত সঞ্চয় আমানত এবং ১০ টাকা গ্রামীণ সামাজিক উন্নয়ন তহবিলে সংরক্ষিত থাকে।
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-foreground">দ্রুত লিংক</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  মূল পাতা
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-foreground transition-colors">
                  সামাজিক কার্যক্রম
                </Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-foreground transition-colors">
                  নোটিশ বোর্ড
                </Link>
              </li>
              <li>
                <Link href="/financial-transparency" className="hover:text-foreground transition-colors">
                  আর্থিক স্বচ্ছতা
                </Link>
              </li>
              <li>
                <Link href="/members" className="hover:text-foreground transition-colors">
                  সদস্য তালিকা
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  যোগাযোগ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-foreground">যোগাযোগ</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{ORG.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{ORG.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{ORG.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>© {currentYear} {ORG.nameBn}। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1">
            <span>গ্রামীণ যুবকল্যাণে নিবেদিত</span>
            <Heart className="h-3 w-3 text-red-500 fill-current" />
          </p>
        </div>
      </div>
    </footer>
  );
}
