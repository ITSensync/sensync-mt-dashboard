/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import SectionKalibrasi from "./SectionKalibrasi";
import ComponentCard from "../common/ComponentCard";
import { useFormContext } from "react-hook-form";
import { generateSiteName } from "@/lib/generate";
import { getAuthToken, getIdDevice } from "@/lib/sessions";
import { ApiError } from "../types/ApiError";
import { generateService } from "@/data/service";
import SuccessModal from "../ui/modal/SuccessModal";
import { useRouter } from "next/navigation";

export default function FormKalibrasi() {
  const { handleSubmit, reset } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    /* const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        Array.from(value).forEach((file) => formData.append(key, file));
      } else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value)); // untuk array/object
      } else {
        formData.append(key, String(value)); // untuk string/number
      }
    }); */

    const id = await getIdDevice();
    const siteName = generateSiteName(id || "");
    data["site"] = siteName;
    // formData.append("site", siteName);

    const auhtToken = await getAuthToken();
    const response = await generateService.generateKalibrasi(auhtToken, data);

    console.log(response);
    if (response.status == 200) {
      (
        document.getElementById("success_modal") as HTMLDialogElement
      ).showModal();
      setTimeout(() => {
        reset();
        window.location.reload();
      }, 3000);
    } else {
      setErrorData({
        code: response.status,
        message: response.message,
      });
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 5000);
    }

    /* for (const [key, value] of formData.entries()) {
      console.log(key, value);
    } */

    setLoading(false);
  };

  return (
    <>
      {toast && (
        <div className="toast text-white mb-10">
          <div className="alert alert-error text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-lg">{errorData.message}</span>
          </div>
        </div>
      )}
      <SuccessModal message={"Successfull Generate Kalibrasi File"} />
      <form
        className="grid grid-cols-1 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ComponentCard title="Kalibrasi">
          <SectionKalibrasi />
          <div className="w-full flex justify-end mt-2 gap-4">
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
