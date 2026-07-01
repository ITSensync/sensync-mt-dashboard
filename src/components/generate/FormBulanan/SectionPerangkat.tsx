import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/react-hook/InputFieldHook";
import SelectField from "@/components/form/input/react-hook/SelectFieldHook";
import Label from "@/components/form/Label";
import { generateSiteData } from "@/lib/generate";
import { getIdDevice } from "@/lib/sessions";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

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
    nama: "Syamil",
  },
  {
    nama: "Kenza",
  },
];

export default function SectionPerangkat() {
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
    <ComponentCard title="Perangkat">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="col-span-full">
          {/* Nomor BA */}
          <fieldset className="fieldset w-full">
            <Label htmlFor="nomor_ba">
              Nomor BA <span className="text-red-500">*</span>
            </Label>

            <Input
              {...register("nomor_ba", {
                required: "Nomor BA tidak boleh kosong!",
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
                  required: "Site tidak boleh kosong!",
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

              <Input
                placeholder="John Doe"
                {...register("teknisi", {
                  required: "Teknisi tidak boleh kosong!",
                })}
              />
              {errors.teknisi && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.teknisi.message as string}
                </p>
              )}

              {/* <SelectField
                {...register(`teknisi`)}
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
              </SelectField> */}
            </fieldset>

            {/* Pengawas */}
            <fieldset className="fieldset w-full">
              <Label htmlFor="jabatan1">
                Jabatan <span className="text-red-500">*</span>
              </Label>

              <Input
                placeholder="Field Engineer"
                {...register("jabatan1", {
                  required: "Jabatan tidak boleh kosong!",
                })}
              />
              {errors.jabatan1 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.jabatan1.message as string}
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
                Pengawas Lapangan <span className="text-red-500">*</span>
              </Label>

              <Input
                placeholder="John Doe"
                {...register("pengawas_lapangan", {
                  required: "Pengawas Lapangan tidak boleh kosong!",
                })}
              />
              {errors.pengawas_lapangan && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pengawas_lapangan.message as string}
                </p>
              )}

              {/* <SelectField
                {...register(`teknisi`)}
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
              </SelectField> */}
            </fieldset>

            {/* Pengawas */}
            <fieldset className="fieldset w-full">
              <Label htmlFor="jabatan2">
                Jabatan <span className="text-red-500">*</span>
              </Label>

              <Input
                placeholder="PIC"
                {...register("jabatan2", {
                  required: "Jabatan tidak boleh kosong!",
                })}
              />
              {errors.jabatan2 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.jabatan2.message as string}
                </p>
              )}
            </fieldset>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
