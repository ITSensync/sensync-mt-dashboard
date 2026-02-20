import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FormDokumentasi from "@/components/generate/FormDokumentasi";
import { generateSiteData } from "@/lib/generate";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "Sensync Maintenance Dashboard | Dokumentasi",
  description: "This is Next.js Blank Page TailAdmin Dashboard Template",
};

export default async function page() {
  const idSite = (await cookies()).get("id_device")?.value;

  return (
    <>
      <PageBreadcrumb
        pageTitle={generateSiteData(idSite || "").site}
        level1="Form Dokumentasi"
        level2=""
      />
      <FormDokumentasi />
    </>
  );
}
