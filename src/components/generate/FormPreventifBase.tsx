/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import SectionDataPerangkat from "./SectionDataPerangkat";
import SectionChecklistBase from "./SectionChecklistBase";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import FileInput from "../form/input/react-hook/FileInputHook";

export default function FormPreventifBase() {
  const { register } = useFormContext();
  const router = useRouter();

  /* const onSubmit = async (data: any) => {
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
  }; */

  const handleNextButton = async () => {
    /* const valid = await trigger(); // validasi zod dulu
        if (!valid) return; */

    router.push("/generate/preventif/ttd");
  };

  const handleBackBtn = () => {
    // Logic to handle back action
    router.back();
  };

  return (
    <form className="grid grid-cols-1 gap-4">
      <SectionDataPerangkat />
      <SectionChecklistBase />
      <ComponentCard title="Dokumentasi">
        <fieldset className="fieldset w-full">
          <Label htmlFor="dokumentasi">
            Foto-Foto Pemeliharaan <span className="text-red-500">*</span>
          </Label>

          <FileInput
            multiple
            accept=".jpg,.jpeg,.png,.gif,image/jpeg,image/png,image/gif"
            {...register("dokumentasi")}
          />
        </fieldset>
      </ComponentCard>
      <div className="w-full flex justify-end mt-2 gap-4">
        <button
          type="button"
          onClick={handleBackBtn}
          className="btn btn-lg btn-outline btn-warning font-bold "
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-lg btn-success font-bold text-white"
          onClick={handleNextButton}
        >
          Next
        </button>
      </div>
    </form>
  );
}
