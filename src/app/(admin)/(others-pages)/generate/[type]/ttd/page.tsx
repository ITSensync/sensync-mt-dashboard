import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SectionTTD from "@/components/generate/SectionTTD";
import UnderDev from "@/layout/UnderDev";
import { generateSiteName } from "@/lib/generate";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "Sensync Maintenance Dashboard | Form TTD",
  description: "This is Next.js Blank Page TailAdmin Dashboard Template",
};

export default async function page() {
  const idSite = (await cookies()).get("id_device")?.value;

  return (
    <div>
      <PageBreadcrumb
        pageTitle={generateSiteName(idSite || "")}
        level1="Jenis Pemeliharaan"
        level2={`TTD`}
      />
      {/* <UnderDev /> */}
      <SectionTTD/>
    </div>
  );
}
