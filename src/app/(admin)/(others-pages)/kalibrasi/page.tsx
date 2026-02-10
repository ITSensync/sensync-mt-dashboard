import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FormKalibrasi from "@/components/generate/FormKalibrasi";
import UnderDev from "@/layout/UnderDev";
import { generateSiteName } from "@/lib/generate";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "Sensync Maintenance Dashboard | Generate Kalibrasi",
  description: "This is Next.js Blank Page TailAdmin Dashboard Template",
};

export default async function page() {
  const idSite = (await cookies()).get("id_device")?.value;

  return (
    <>
      <PageBreadcrumb
        pageTitle={generateSiteName(idSite || "")}
        level1="Form Kalibrasi"
        level2=""
      />
      <FormKalibrasi />
    </>
  );
}
