import Changenote from "@/components/changenote/Changenote";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import LogMTPage from "@/components/LogMaintenance/LogMaintenance";
import UnderDev from "@/layout/UnderDev";
import { generateSiteData } from "@/lib/generate";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "Sensync Maintenance Dashboard | Log Maintenance",
  description: "This is Next.js Blank Page TailAdmin Dashboard Template",
};

export default async function page() {
  const idSite = (await cookies()).get("id_device")?.value;

  return (
    // <UnderDev />
    <div>
      <PageBreadcrumb
        pageTitle={generateSiteData(idSite || "").site}
        level1="Log Maintenance"
        level2=""
      />
      {/* <Changenote /> */}
      <LogMTPage />
    </div>
  );
}
