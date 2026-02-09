/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useFormContext } from "react-hook-form";

export default function ModulForm({
  title,
  dataText,
}: {
  title: string;
  dataText: any[];
}) {
  const { register } = useFormContext();
  
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="col-span-full">
        <div className="grid grid-cols-3 mb-4 text-gray-800 dark:text-white/90">
          <p className="font-semibold text-lg">{title}</p>
          <p className="px-2 text-center">Sebelum</p>
          <p className="px-2 text-center">Sesudah</p>
        </div>
        {dataText.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-3 items-center py-2 gap-5 text-gray-700 dark:text-gray-400"
          >
            <p className="text-sm">{item.text}</p>
            <div className="flex justify-center">
              <select
                className={`h-11 w-1/2 appearance-none rounded-lg border border-gray-300  px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-600`}
                {...register(`${item.name}.sebelum`)}
                defaultValue=""
              >
                <option disabled value={""}>
                  Pilih Status
                </option>
                <option value={"ok"}>OK</option>
                <option value={"not_ok"}>Not OK</option>
              </select>
            </div>
            <div className="flex justify-center">
              <select
                className={`h-11 w-1/2 appearance-none rounded-lg border border-gray-300  px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-600`}
                {...register(`${item.name}.sesudah`)}
                defaultValue=""
              >
                <option disabled value={""}>
                  Pilih Status
                </option>
                <option value={"ok"}>OK</option>
                <option value={"not_ok"}>Not OK</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
