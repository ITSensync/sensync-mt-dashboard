"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import { useFormContext } from "react-hook-form";
import Input from "../form/input/react-hook/InputFieldHook";
import Checkbox from "../form/input/react-hook/CheckboxHook";
import { getIdDevice } from "@/lib/sessions";

const checklist = [
  {
    text: "Pembersihan fisik dan pengecekan kebocoran shelter",
    name: "pembersihan_fisik",
    type: "fixed",
  },
  {
    text: "Pengecekan dan Pembersihan",
    name: "pengecekan_pembersihan",
    type: "all",
  },
  {
    text: "Pengecekan sensor gas dan chamber gas",
    name: "sensor_gas",
    type: "fixed",
  },
  {
    text: "Pengecekan sensor meteorologi",
    name: "sensor_meteorologi",
    type: "all",
  },
  {
    text: "Pengecekan sensor partikulat",
    name: "sensor_partikulat",
    type: "all",
  },
  {
    text: "Pengecekan kondisi kabel dan koneksi (power dan data)",
    name: "kabel_koneksi",
    type: "all",
  },
  {
    text: "Pencatatan / Backup data sensor (raw data)",
    name: "pencatatan_backup_data",
    type: "all",
  },
  {
    text: "Pengecekan catu daya dan sistem back-up (UPS/baterai)",
    name: "catu_daya",
    type: "fixed",
  },
  {
    text: "Pengecekan fungsi komunikasi data (modem/ethernet)",
    name: "komunikasi_data",
    type: "all",
  },
  {
    text: "Penggantian silika gel",
    name: "silika_gel",
    type: "fixed",
  },
  {
    text: "Pengecekan display running text",
    name: "display_running_text",
    type: "fixed",
  },
  {
    text: "Pengecekan pagar pelindung",
    name: "pagar_pelindung",
    type: "fixed",
  },
  {
    text: "Pengecekan CCTV",
    name: "cctv",
    type: "fixed",
  },
];
export default function SectionChecklistBase() {
  const { register } = useFormContext();
  const [idDevice, setIdDevice] = useState<string | null>(null);

  useEffect(() => {
    const fetchIdDevice = async () => {
      const id = await getIdDevice();
      setIdDevice(id?.toLowerCase() ?? "");
    };

    fetchIdDevice();
  }, []);

  const visibleChecklist = checklist.filter(
    (item) => idDevice?.includes("base") || (idDevice?.includes("mini") && item.type === "all"),
  );

  return (
    <ComponentCard title={`Checklist Maintenance`}>
      <div className="grid grid-cols-3 mb-4 text-gray-800 dark:text-white/90">
        <p className="font-semibold text-lg"></p>
        <p className="px-2 text-center">Status</p>
        <p className="px-2 text-center">Keterangan</p>
      </div>
      {visibleChecklist.map((item, index) => (
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
            <Input {...register(`${item.name}.keterangan`)} />
          </div>
        </div>
      ))}
    </ComponentCard>
  );
}
