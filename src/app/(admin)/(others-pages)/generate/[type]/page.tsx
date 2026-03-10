import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FormBulanan from "@/components/generate/FormBulanan/FormBulanan";
import FormKorektif from "@/components/generate/FormKorektif";
import FormPreventif from "@/components/generate/FormPreventif";
import FormPreventifBase from "@/components/generate/FormPreventifBase";
import FormSerahTerima from "@/components/generate/FormSerahTerima/FormSerahTerima";
import UnderDev from "@/layout/UnderDev";
import { generateSiteData } from "@/lib/generate";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "Sensync Maintenance Dashboard | Form Generate BA",
  description: "This is Next.js Blank Page TailAdmin Dashboard Template",
};

export default async function page({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const idSite = (await cookies()).get("id_device")?.value;
  const { type } = await params;

  return (
    <div>
      <PageBreadcrumb
        pageTitle={generateSiteData(idSite || "").site}
        level1="Jenis Pemeliharaan"
        level2={`Form ${type.replace(/\b\w/g, (c) => c.toUpperCase())}`}
      />
      {type === "preventif" ? (
        idSite?.includes("base") || idSite?.includes("mini") ? (
          <FormPreventifBase />
        ) : (
          <FormPreventif />
        )
      ) : type === "bulanan" ? (
        <FormBulanan />
      ) : type === "korektif" ? (
        <FormKorektif />
      ) : (
        <FormSerahTerima />
      )}
      {/* <UnderDev /> */}
    </div>
  );
}
