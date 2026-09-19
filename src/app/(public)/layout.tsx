import React from "react";
import { SiteNavbar } from "@/components/shared/SiteNavbar";
import { SiteFooter } from "@/components/shared/SiteFooter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNavbar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
