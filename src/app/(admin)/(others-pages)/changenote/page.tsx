import Changenote from "@/components/changenote/Changenote";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UnderDev from "@/layout/UnderDev";
import { generateSiteName } from "@/lib/generate";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "Sensync Maintenance Dashboard | Change Note",
  description: "This is Next.js Blank Page TailAdmin Dashboard Template",
};

export default async function page() {
  const idSite = (await cookies()).get("id_device")?.value;

  return (
    // <UnderDev />
    <div>
      <PageBreadcrumb
        pageTitle={generateSiteName(idSite || "")}
        level1="Change Note"
        level2=""
      />
      <Changenote />
    </div>
  );
}
