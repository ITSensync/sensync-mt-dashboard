/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import Input from "../form/input/react-hook/InputFieldHook";

export default function SectionPembacaanSensor({
  dataText,
}: {
  dataText: any[];
}) {
  const { register } = useFormContext();

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="col-span-full">
        <div className="grid grid-cols-3 mb-4 text-gray-800 dark:text-white/90">
          <p className="font-semibold text-lg">Pembacaan Sensor</p>
        </div>
        {dataText.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-3 items-center py-2 gap-5 text-gray-700 dark:text-gray-400"
          >
            <p className="text-sm">{item.text}</p>
            <div className="flex justify-center">
              <Input
                type="number"
                {...register(`${item.name}.sebelum`, {
                  required: true,
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
                className="w-1/2"
                placeholder="0"
                /* defaultValue={formatCustomDate(
                  formInitState.createdAt,
                  "yyyy-MM-dd",
                )}
                onChange={handleInputChange} */
              />
            </div>
            <div className="flex justify-center">
              <Input
                type="number"
                {...register(`${item.name}.sesudah`, {
                  required: true,
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
                className="w-1/2"
                placeholder="0"
                /* defaultValue={formatCustomDate(
                  formInitState.createdAt,
                  "yyyy-MM-dd",
                )}
                onChange={handleInputChange} */
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
