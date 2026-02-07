/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import { useFormContext } from "react-hook-form";
import SignaturePad from "./SignaturePad";
import { usePathname, useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/sessions";
import { generateService } from "@/data/service";

export default function SectionTTD() {
  const { handleSubmit } = useFormContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname()?.toLowerCase() || "";

  const onSubmit = async (data: any) => {
    try {
      setLoading(true); // start loading
      const formData = new FormData();

      console.log(pathname);
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof FileList) {
          Array.from(value).forEach((file) => formData.append(key, file));
        } else if (typeof value === "object") {
          formData.append(key, JSON.stringify(value)); // untuk array/object
        } else {
          formData.append(key, String(value)); // untuk string/number
        }
      });

      // panggil service
      let result;
      if (pathname.includes("preventif")) {
        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }
      } else {
        const newTab = window.open("", "_blank");
        const idToken = await getAuthToken();

        result = await generateService.generateKorektif(
          idToken,
          formData,
          newTab,
        );

        if (result.success) {
          setTimeout(() => {
            router.push("/generate");
          }, 2000);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan!");
    } finally {
      setLoading(false);
    }
  };

  const handleBackBtn = () => {
    router.back();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ComponentCard title="Tanda Tangan">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 w-full">
            <p>Teknisi</p>
            <SignaturePad name="ttd_teknisi" />
          </div>
          <div className="flex flex-col gap-4 w-full mb-4">
            <p>Pengawas Lapangan</p>
            <SignaturePad name="ttd_pengawas_lapangan" />
          </div>
        </div>

        {loading && (
          <div className="w-full text-center py-4">
            <span className="loading loading-spinner loading-lg"></span>
            <p>Generating file, please wait...</p>
          </div>
        )}

        <div className="divider"></div>
        <div className="w-full flex justify-end mt-2 gap-4">
          <button
            type="button"
            onClick={handleBackBtn}
            className="btn btn-lg btn-outline btn-warning font-bold"
            disabled={loading}
          >
            Back
          </button>
          <button
            type="submit"
            className="btn btn-lg btn-success font-bold text-white"
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </ComponentCard>
    </form>
  );
}
