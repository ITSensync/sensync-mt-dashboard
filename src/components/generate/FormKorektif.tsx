/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from "react";
import SectionDataPerangkat from "./SectionDataPerangkat";
import SectionInputKorektif from "./SectionInputKorektif";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function FormKorektif() {
  const { handleSubmit } = useFormContext();
    const router = useRouter();
  
    const onSubmit = async (data: any) => {
      const formData = new FormData();
  
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof FileList) {
          Array.from(value).forEach((file) => formData.append(key, file));
        } else if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });
  
      const debugObj: any = {};
  
      for (const [key, value] of formData.entries()) {
        debugObj[key] = value;
      }
  
      console.log(debugObj);
  
      // await fetch("/api/maintenance", {
      //   method: "POST",
      //   body: formData,
      // });
    };
  
    const handleBackBtn = () => {
      // Logic to handle back action
      router.back();
    };

  return (
    <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)}>
      <SectionDataPerangkat />
      <SectionInputKorektif title="Korektif Item" />
      <div className="w-full flex justify-end mt-2 gap-4">
        <button
          type="button"
          onClick={handleBackBtn}
          className="btn btn-lg btn-outline btn-warning font-bold "
        >
          Back
        </button>
        <button
          type="submit"
          className="btn btn-lg btn-success font-bold text-white"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
