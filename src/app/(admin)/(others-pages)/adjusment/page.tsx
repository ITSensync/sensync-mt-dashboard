// import Calendar from "@/components/calendar/Calendar";
import Adjusment from "@/components/adjusment/Adjusment";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sensync Maintenance Dashboard | Adjusment",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};
export default function page() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Adjusment" />
      {/* <Calendar /> */}
      <Adjusment />
      {/* <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6"></div> */}
    </div>
  );
}
