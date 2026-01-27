import type { Metadata } from "next";
import React from "react";
import { SummaryCard } from "@/components/landing/SummaryCard";
import { unauthorized } from "next/navigation";
import { cookies } from "next/headers";
import MaintenanceChart from "@/components/charts/line/MaintenenaceChart";

export const metadata: Metadata = {
  title: "Sparing Admin Dashboard",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function Ecommerce() {
  const existingToken = (await cookies()).get('auth_token')?.value;
  if (!existingToken) {
    unauthorized();
  }

  return (
    <div className="w-full">
      <div className="gap-4 space-y-6">
        <SummaryCard />
        <div className=" xl:col-span-7"></div>
      </div>
      <div className="divider divider-info opacity-40"></div>
      <div className="my-12">
        <MaintenanceChart />
      </div>
    </div>
  );
}
