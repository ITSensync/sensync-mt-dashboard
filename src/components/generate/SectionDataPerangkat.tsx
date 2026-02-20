/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { generateBANumber, generateSiteData } from "@/lib/generate";
import { getIdDevice } from "@/lib/sessions";

import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/react-hook/InputFieldHook";
import SelectField from "../form/input/react-hook/SelectFieldHook";

const teknisi = [
  {
    nama: "Candra",
  },
  {
    nama: "Candra Dwi Jayana",
  },
  {
    nama: "Nasrul",
  },
  {
    nama: "Nasrul Mudzakir",
  },
  {
    nama: "Fachri",
  },
  {
    nama: "Pasya",
  },
];
export default function SectionDataPerangkat() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const fetchIdDevice = async () => {
      const id = await getIdDevice();

      const siteData = generateSiteData(id || "");

      // ✅ set ke form (bukan defaultValue)
      setValue("site", siteData.site);
      setValue("lokasi", siteData.city);
    };

    /* const fetchBANumber = async () => {
      const nomorBa = await generateBANumber();
      console.log(nomorBa);
      setValue("nomor_ba", nomorBa);
    };

    fetchBANumber(); */
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

            <Input
              {...register("nomor_ba", {
                required: "Nomor BA tidak boleh kosong",
              })}
              placeholder="xx/xx/xx"
            />
            {errors.nomor_ba && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nomor_ba.message as string}
              </p>
            )}
          </fieldset>

          <div className="grid grid-cols-2 gap-10 mt-4">
            <fieldset className="fieldset w-full">
              <Label htmlFor="site">
                Site <span className="text-red-500">*</span>
              </Label>

              <Input
                disabled
                {...register("site", {
                  required: "Site tidak boleh kosong",
                })}
              />
              {errors.site && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.site.message as string}
                </p>
              )}
            </fieldset>
            <fieldset className="fieldset w-full">
              <Label htmlFor="site">
                Lokasi <span className="text-red-500">*</span>
              </Label>

              <Input
                disabled
                {...register("lokasi", {
                  required: "Lokasi tidak boleh kosong",
                })}
              />
              {errors.lokasi && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lokasi.message as string}
                </p>
              )}
            </fieldset>
          </div>

          <div className="grid grid-cols-2 gap-10 mt-4">
            {/* Site */}
            {/* <fieldset className="fieldset w-full">
              <Label htmlFor="site">
                Site <span className="text-red-500">*</span>
              </Label>

              <Input disabled {...register("site")} />
            </fieldset> */}

            {/* Teknisi */}
            <fieldset className="fieldset w-full">
              <Label htmlFor="teknisi">
                Teknisi <span className="text-red-500">*</span>
              </Label>

              <SelectField
                {...register(`teknisi`, {
                  required: "Teknisi wajib diisi",
                })}
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                <option
                  value=""
                  className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                >
                  Pilih Nama
                </option>
                {teknisi.map((item, index) => (
                  <option
                    key={index}
                    value={item.nama}
                    className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                  >
                    {item.nama}
                  </option>
                ))}
              </SelectField>
              {errors.teknisi && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.teknisi.message as string}
                </p>
              )}
            </fieldset>

            {/* Pengawas */}
            <fieldset className="fieldset w-full">
              <Label htmlFor="pengawas_lapangan">
                Pengawas Lapangan <span className="text-red-500">*</span>
              </Label>

              <Input
                placeholder="John Doe"
                {...register("pengawas_lapangan", {
                  required: "Pengawas Lapangan tidak boleh kosong",
                })}
              />
              {errors.pengawas_lapangan && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pengawas_lapangan.message as string}
                </p>
              )}
            </fieldset>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
