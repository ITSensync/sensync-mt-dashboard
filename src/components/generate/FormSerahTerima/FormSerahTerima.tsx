'use client'
import React from "react";
import SectionPerangkat from "../FormBulanan/SectionPerangkat";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import SectionInputAlat from "./SectionInputAlat";

export default function FormSerahTerima() {
  const { trigger } = useFormContext();
  const router = useRouter();

  const handleNextButton = async () => {
    /* const valid = await trigger(); // validasi zod dulu
          if (!valid) return; */

    const valid = await trigger([
      "nomor_ba",
      "site",
      "lokasi",
      "teknisi",
      "jabatan1",
      "pengawas_lapangan",
      "jabatan2",
    ]);

    if (!valid) {
      alert("Terdapat Kesalahan, Cek Kembali Input Form");
      return;
    }

    router.push("/generate/serah-terima/ttd");
  };

  const handleBackBtn = () => {
    // Logic to handle back action
    router.back();
  };

  return (
    <form className="grid grid-cols-1 gap-4">
      <SectionPerangkat />
      <SectionInputAlat />
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
