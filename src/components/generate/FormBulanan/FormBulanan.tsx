"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import SectionPerangkat from "./SectionPerangkat";
import SectionInputBulanan from "./SectionInputBulanan";
import { useRouter } from "next/navigation";

export default function FormBulanan() {
  // const { handleSubmit } = useFormContext();
  const router = useRouter();

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
      <SectionPerangkat />
      <SectionInputBulanan />
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
