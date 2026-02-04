"use client";
import React from "react";
import ComponentCard from "../common/ComponentCard";
import { useFormContext } from "react-hook-form";
import Input from "../form/input/react-hook/InputFieldHook";
import Checkbox from "../form/input/react-hook/CheckboxHook";

const checklist = [
  {
    text: "Pembersihan fisik dan pengecekan kebocoran shelter",
    name: "pembersihan_fisik",
  },
  {
    text: "Pengecekan dan pembersihan pendingin udara intake / exhaust",
    name: "pendingin_udara",
  },
  {
    text: "Pengecekan sensor gas dan chamber gas",
    name: "sensor_gas",
  },
  {
    text: "Pengecekan sensor partikulat (PM10/PM2.5) dan pembersihan jika perlu",
    name: "sensor_partikulat",
  },
  {
    text: "Pengecekan kondisi kabel dan koneksi (power dan data)",
    name: "kabel_koneksi",
  },
  {
    text: "Pencatatan / Backup data sensor (raw data)",
    name: "pencatatan_backup_data",
  },
  {
    text: "Pengecekan catu daya dan sistem back-up (UPS/baterai)",
    name: "catu_daya",
  },
  {
    text: "Pengecekan fungsi komunikasi data (modem/ethernet)",
    name: "komunikasi_data",
  },
  {
    text: "Pengecekan sensor meteorologi",
    name: "sensor_meteorologi",
  },
  {
    text: "Penggantian silika gel",
    name: "silika_gel",
  },
  {
    text: "Pengeccekan display running text",
    name: "display_running_text",
  },
  {
    text: "Pengecekan pagar pelindung",
    name: "pagar_pelindung",
  },
  {
    text: "Kalibrasi Sensor Gas (Zero dan Span Check/Adjustment)",
    name: "kalibrasi_sensor_gas",
  },
];
export default function SectionChecklistBase() {
  const { register } = useFormContext();
  return (
    <ComponentCard title={`Checklist Maintenance`}>
      <div className="grid grid-cols-3 mb-4 text-gray-800 dark:text-white/90">
        <p className="font-semibold text-lg"></p>
        <p className="px-2 text-center">Status</p>
        <p className="px-2 text-center">Catatan</p>
      </div>
      {checklist.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-3 items-center py-2 gap-5 text-gray-700 dark:text-gray-400"
        >
          <p className="text-sm">{item.text}</p>
          <div className="flex justify-center">
            <Checkbox {...register(`${item.name}.status`)} />
          </div>
          {/* <div className="flex justify-center">
            <select
              className={`h-11 w-1/2 appearance-none rounded-lg border border-gray-300  px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-400`}
              {...register(`${item.name}.status`)}
              defaultValue=""
            >
              <option disabled value={""}>
                Pick Status
              </option>
              <option value={"ok"}>OK</option>
              <option value={"not_ok"}>Not OK</option>
            </select>
          </div> */}
          <div className="flex justify-center">
            <Input {...register(`${item.name}.catatan`)} />
          </div>
        </div>
      ))}
    </ComponentCard>
  );
}
