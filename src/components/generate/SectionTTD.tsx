/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import { useFormContext } from "react-hook-form";
import SignaturePad from "./SignaturePad";
import { usePathname, useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/sessions";
import { generateService } from "@/data/service";
import SuccessModal from "../ui/modal/SuccessModal";
import GenerateLoadingModal from "../ui/modal/GenerateLoadingModal";

export default function SectionTTD() {
  const { handleSubmit } = useFormContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname()?.toLowerCase() || "";

  const onSubmit = async (data: any) => {
    let previewTab: Window | null = null;

    try {
      setLoading(true); // start loading
      const formData = new FormData();

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
      previewTab = window.open("", "_blank");
      if (previewTab) {
        previewTab.document.write(`
        <html>
          <head>
            <title>Generating File...</title>
            <style>
              body {
                font-family: system-ui;
                display:flex;
                height:100vh;
                justify-content:center;
                align-items:center;
                flex-direction:column;
                gap:16px;
              }
              .spinner {
                width:50px;
                height:50px;
                border:5px solid #ddd;
                border-top:5px solid #2563eb;
                border-radius:50%;
                animation:spin 1s linear infinite;
              }
              @keyframes spin {
                100% { transform: rotate(360deg); }
              }
            </style>
          </head>
          <body>
            <div class="spinner"></div>
            <h3>Generating file, please wait...</h3>
          </body>
        </html>
      `);
        previewTab.document.close();
      }

      const idToken = await getAuthToken();
      let result;
      if (pathname.includes("preventif")) {
        /* for (const [key, value] of formData.entries()) {
          console.log(key, value);
        } */
        result = await generateService.generatePreventif(idToken, formData);
      } else {
        result = await generateService.generateKorektif(idToken, formData);
      }

      if (result.success && previewTab) {
        previewTab.location.href = `${process.env.MT_API_URL}/generate/${result.url}`;

        setLoading(false);
        (
          document.getElementById("success_modal") as HTMLDialogElement
        ).showModal();
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan!");
      previewTab?.close();
    } finally {
      setLoading(false);
    }
  };

  const handleBackBtn = () => {
    router.back();
  };

  return (
    <>
      {/* <GenerateLoadingModal open={loading} /> */}
      <SuccessModal message={"Successfull Generate File"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ComponentCard title="Tanda Tangan">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4 w-full">
              <p className="text-gray-800 dark:text-white/90">Teknisi</p>
              <SignaturePad name="ttd_teknisi" />
            </div>
            <div className="flex flex-col gap-4 w-full mb-4">
              <p className="text-gray-800 dark:text-white/90">
                Pengawas Lapangan
              </p>
              <SignaturePad name="ttd_pengawas_lapangan" />
            </div>
          </div>

          {/* {loading && (
            <div className="w-full text-center py-4">
              <span className="loading loading-spinner loading-lg"></span>
              <p>Generating file, please wait...</p>
            </div>
          )} */}

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
    </>
  );
}
