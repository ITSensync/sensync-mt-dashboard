import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import MainMenu from "@/components/generate/MainMenu";
import UnderDev from "@/layout/UnderDev";
import { generateSiteName } from "@/lib/generate";
import { Breadcrumbs } from "@mui/material";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "Sensync Maintenance Dashboard | Generate BA",
  description: "This is Next.js Blank Page TailAdmin Dashboard Template",
};

export default async function page() {
  const idSite = (await cookies()).get("id_device")?.value;

  return (
    // <div>Ini halaman Generate BA</div>
    // <UnderDev />
    <div>
      <PageBreadcrumb
        pageTitle={generateSiteName(idSite || "")}
        level1="Jenis Pemeliharaan"
        level2=""
      />
      <MainMenu />
    </div>
  );
}
