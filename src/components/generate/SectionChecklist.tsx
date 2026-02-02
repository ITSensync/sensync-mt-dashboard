import React from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import ModulUtama from "./ModulForm";
import ModulForm from "./ModulForm";

const modulUtama = [
  {
    text: "Tampilan data logger dalam keadaan normal",
    name: "tampilan",
  },
  {
    text: "Koneksi internet tersedia",
    name: "koneksi_internet",
  },
  {
    text: "Koneksi antara modul dan mini pc baik",
    name: "koneksi_modul_mini_pc",
  },
  {
    text: "Pembacaan sensor dalam kondisi baik",
    name: "pembacaan_sensor",
  },
];

const modulSensor = [
  {
    text: "Sensor dalam keadaan bersih dan baik",
    name: "sensor_bersih",
  },
  {
    text: "Chamber sensor dalam keadaan bersih dan tidak terdapat kebocoran",
    name: "chamber_sensor",
  },
  {
    text: "Pembacaan sensor dalam kondisi normal",
    name: "pembacaan_sensor",
  },
  {
    text: "Kalibrasi telah selesai dilakukan",
    name: "kalibrasi_selesai",
  },
];

const modulPendukung = [
  {
    text: "CB connector dan kabel dalam kondisi baik dan tersambung",
    name: "cb_connector_kabel"
  },
  {
    text: "Flowmeter berjalan dengan baik",
    name: "flowmeter_berjalan"
  },
  {
    text: "Pompa berjalan dengan baik",
    name: "pompa"
  },
]

const sensor = [
  {
    text: "pH",
    name: "pembacaan_ph",
  },
  {
    text: "COD",
    name: "pembacaan_cod",
  },
  {
    text: "TSS",
    name: "pembacaan_tss",
  },
  {
    text: "NH3N",
    name: "pembacaan_nh3n",
  },
];

const pengirimanData = [
  {
    text: "Data terkirim ke server",
    name: "data_terkirim",
  }
]

export default function SectionChecklist() {
  return (
    <ComponentCard title={`Cheklist Maintenance`}>
      <ModulForm title="Modul Utama" dataText={modulUtama} />
      <ModulForm title="Modul Sensor" dataText={modulSensor} />
      {/* PEMBACAAN SENSOR FORM */}
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-full">
          <div className="grid grid-cols-3 mb-4 text-gray-800 dark:text-white/90">
            <p className="font-semibold text-lg">Pembacaan Sensor</p>
          </div>
          {sensor.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 items-center py-2 gap-5 text-gray-700 dark:text-gray-400"
            >
              <p className="text-sm">{item.text}</p>
              <div className="flex justify-center">
                <Input
                  type="text"
                  name={`sebelum_${item.name}`}
                  defaultValue={""}
                  className="w-1/2"
                  /* defaultValue={formatCustomDate(
                  formInitState.createdAt,
                  "yyyy-MM-dd",
                )}
                onChange={handleInputChange} */
                  required={true}
                />
              </div>
              <div className="flex justify-center">
                <Input
                  type="text"
                  name={`sesudah_${item.name}`}
                  defaultValue={""}
                  className="w-1/2"
                  /* defaultValue={formatCustomDate(
                  formInitState.createdAt,
                  "yyyy-MM-dd",
                )}
                onChange={handleInputChange} */
                  required={true}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <ModulForm title="Modul Pendukung" dataText={modulPendukung} />
      <ModulForm title="Pengiriman Data" dataText={pengirimanData} />
    </ComponentCard>
  );
}
