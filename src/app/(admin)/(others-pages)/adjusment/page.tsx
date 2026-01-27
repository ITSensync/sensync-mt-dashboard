// import Calendar from "@/components/calendar/Calendar";
import Adjusment from "@/components/adjusment/Adjusment";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { unauthorized } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Sparing Admin Dashboard | Adjusment",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};
export default async function page() {
  const existingToken = (await cookies()).get("auth_token")?.value;
  if (!existingToken) {
    unauthorized();
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Adjusment" />
      {/* <Calendar /> */}
      <Adjusment />
      {/* <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6"></div> */}
    </div>
  );
}
