"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ORG } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Moon,
  Menu,
  X,
  Shield,
  Users,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SiteNavbarProps {
  currentPath?: string;
  className?: string;
}

export function SiteNavbar({ currentPath = "/", className }: SiteNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { label: "হোম", href: "/" },
    { label: "আমাদের সম্পর্কে", href: "/about" },
    { label: "কার্যক্রম", href: "/activities" },
    { label: "আর্থিক স্বচ্ছতা", href: "/financial-transparency" },
    { label: "সদস্য", href: "/members" },
    { label: "নোটিশ", href: "/notices" },
    { label: "যোগাযোগ", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-colors",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand logo & title */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#166534] to-[#22c55e] text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5 text-amber-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors">
              {ORG.nameBn}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium tracking-wide">
              {ORG.abbreviation} • {ORG.tagline}
            </span>
          </div>
        </Link>

        {/* Desktop navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-muted-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:text-foreground transition-colors py-1",
                currentPath === link.href && "text-primary font-bold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions & theme toggle */}
        <div className="flex items-center gap-2.5">
          {/* Theme switcher */}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="থিম পরিবর্তন করুন"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-sky-400" />
          </button>

          {/* Member Login CTA */}
          <div className="hidden sm:flex items-center gap-2">
            <Link href="/member">
              <Button
                size="sm"
                leftIcon={<Users className="h-3.5 w-3.5" />}
                className="text-xs shadow-xs font-semibold"
              >
                সদস্য লগইন
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="মেনু খুলুন"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card px-4 py-4 space-y-3 animate-fade-in shadow-xl">
          <nav className="flex flex-col space-y-2 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2 pt-3 border-t border-border">
            <Link href="/member" onClick={() => setMobileMenuOpen(false)}>
              <Button
                size="sm"
                leftIcon={<Users className="h-4 w-4" />}
                className="w-full justify-center"
              >
                সদস্য লগইন
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
