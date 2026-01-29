import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Daily from "@/components/daily/Daily";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { unauthorized } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Sensync Maintenance Dashboard | Laporan Harian",
  description: "This is Next.js Blank Page TailAdmin Dashboard Template",
};

export default async function BlankPage() {
  const existingToken = (await cookies()).get("auth_token")?.value;
  if (!existingToken) {
    unauthorized();
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Laporan Harian" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <Daily />
      </div>
    </div>
  );
}
