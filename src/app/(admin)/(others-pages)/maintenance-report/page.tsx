import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Maintenance from "@/components/maintenance/Maintenance";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { unauthorized } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Sparing Admin Dashboard | Report",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default async function Profile() {
  const existingToken = (await cookies()).get("auth_token")?.value;
  if (!existingToken) {
    unauthorized();
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Report" />
      <Maintenance />
    </div>
  );
}
