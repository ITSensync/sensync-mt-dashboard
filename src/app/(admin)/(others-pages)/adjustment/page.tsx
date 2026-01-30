// import Calendar from "@/components/calendar/Calendar";
import AdjusmentPage from "@/components/adjustment/Adjustment";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { generateSiteName } from "@/lib/generateSiteName";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "Sensync Maintenance Dashboard | Adjustment",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};
export default async function page() {
  const idSite = (await cookies()).get("id_device")?.value;
  return (
    <div>
      <PageBreadcrumb
        pageTitle={generateSiteName(idSite || "")}
        level1={"Adjustment"}
      />
      {/* <Calendar /> */}
      <AdjusmentPage />
      {/* <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6"></div> */}
    </div>
  );
}
