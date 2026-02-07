"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import FileInput from "../form/input/react-hook/FileInputHook";
import TextArea from "../form/input/react-hook/TextAreaHook";
import { useRouter } from "next/navigation";

export default function SectionTambahan() {
  const { register } = useFormContext();
  const { trigger } = useFormContext();
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
    <ComponentCard title="Dokumentasi dan Tambahan">
      {/* FILE */}
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

      {/* KETERANGAN */}
      <fieldset className="fieldset w-full">
        <Label htmlFor="keterangan">Keterangan Tambahan</Label>

        <TextArea
          placeholder="Isi keterangan disini..."
          {...register("keterangan")}
        />
      </fieldset>

      {/* CATATAN */}
      <fieldset className="fieldset w-full">
        <Label htmlFor="catatan">Catatan Pemeliharaan Selanjutnya</Label>

        <TextArea
          placeholder="Isi catatan untuk pemeliharaan selanjutnya disini..."
          {...register("catatan")}
        />
      </fieldset>
      <div className="flex gap-2 justify-end mt-3">
        <button
          type="button"
          onClick={handleBackBtn}
          className="btn btn-outline btn-warning font-bold "
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-success font-bold text-white"
          onClick={handleNextButton}
        >
          Next
        </button>
      </div>
    </ComponentCard>
  );
}
