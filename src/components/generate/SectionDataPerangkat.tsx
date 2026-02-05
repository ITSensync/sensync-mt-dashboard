/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { generateBANumber, generateSiteName } from "@/lib/generate";
import { getIdDevice } from "@/lib/sessions";

import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/react-hook/InputFieldHook";

export default function SectionDataPerangkat() {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    const fetchIdDevice = async () => {
      const id = await getIdDevice();

      const site = generateSiteName(id || "");

      // ✅ set ke form (bukan defaultValue)
      setValue("site", site);
    };

    const fetchBANumber = async () => {
      const nomorBa = await generateBANumber();
      console.log(nomorBa);
      setValue("nomor_ba", nomorBa);
    };
   
    fetchBANumber();
    fetchIdDevice();
    // setValue("nomor_ba", "11/BA/STI/I/2026");
  }, [setValue]);

  return (
    <ComponentCard title="Data Perangkat">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="col-span-full">
          {/* Nomor BA */}
          <fieldset className="fieldset w-full">
            <Label htmlFor="nomor_ba">
              Nomor BA <span className="text-red-500">*</span>
            </Label>

            <Input disabled {...register("nomor_ba")} />
          </fieldset>

          <div className="grid grid-cols-3 gap-10 mt-4">
            {/* Site */}
            <fieldset className="fieldset w-full">
              <Label htmlFor="site">
                Site <span className="text-red-500">*</span>
              </Label>

              <Input disabled {...register("site")} />
            </fieldset>

            {/* Teknisi */}
            <fieldset className="fieldset w-full">
              <Label htmlFor="teknisi">
                Teknisi <span className="text-red-500">*</span>
              </Label>

              <Input
                placeholder="John Doe"
                {...register("teknisi", { required: true })}
              />
            </fieldset>

            {/* Pengawas */}
            <fieldset className="fieldset w-full">
              <Label htmlFor="pengawas_lapangan">
                Pengawas Lapangan <span className="text-red-500">*</span>
              </Label>

              <Input
                placeholder="John Doe"
                {...register("pengawas_lapangan", { required: true })}
              />
            </fieldset>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
