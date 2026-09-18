import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ | KCBYW",
  description: "একতায় শক্তি, সেবায় মুক্তি — খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ সমিতি। স্বচ্ছ আর্থিক ব্যবস্থাপনা ও সামাজিক উন্নয়ন।",
  keywords: [
    "খিরাইকান্দি চেয়ারম্যান বাড়ি যুব কল্যাণ",
    "KCBYW",
    "যুব কল্যাণ",
    "ভৈরব",
    "কিশোরগঞ্জ",
    "সঞ্চয়",
    "সমাজকল্যাণ",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-emerald-600 selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
