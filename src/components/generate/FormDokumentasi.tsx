/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import SectionKalibrasi from "./SectionKalibrasi";
import ComponentCard from "../common/ComponentCard";
import { useFormContext } from "react-hook-form";
import {
  generateSiteDomisili,
  generateSiteName,
  generateSiteType,
} from "@/lib/generate";
import { getAuthToken, getIdDevice } from "@/lib/sessions";
import { ApiError } from "../types/ApiError";
import { generateService } from "@/data/service";
import SuccessModal from "../ui/modal/SuccessModal";
import Label from "../form/Label";
import FileInput from "../form/input/FileInput";

export default function FormDokumentasi() {
  const { register, handleSubmit, reset } = useFormContext();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const dokumentasiRegister = register("dokumentasi");

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);

    // rebuild FileList di input
    const dt = new DataTransfer();
    updated.forEach((file) => dt.items.add(file));

    const input = document.getElementById("dokumentasi") as HTMLInputElement;
    if (input) input.files = dt.files;
  };

  const onSubmit = async (data: any) => {
    setLoading(true);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        Array.from(value).forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, String(value));
      }
    });

    const id = await getIdDevice();
    const siteName = generateSiteName(id || "");
    const siteType = generateSiteType(id || "");
    const siteDomisili = generateSiteDomisili(id || "");

    formData.append("site", siteName);
    formData.append("type", siteType);
    formData.append("domisili", siteDomisili);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const auhtToken = await getAuthToken();
    const response = await generateService.uploadDokumentasi(
      auhtToken,
      formData,
    );

    if (response.status == 200) {
      (
        document.getElementById("success_modal") as HTMLDialogElement
      ).showModal();
      setTimeout(() => {
        reset();
        window.location.reload();
      }, 3000);
    } else {
      setErrorData({
        code: response.status,
        message: response.message,
      });
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 5000);
    }

    setLoading(false);
  };

  return (
    <>
      {toast && (
        <div className="toast text-white mb-10">
          <div className="alert alert-error text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-lg">{errorData.message}</span>
          </div>
        </div>
      )}
      <SuccessModal message={"Berhasil Upload Dokumentasi"} />
      <form
        className="grid grid-cols-1 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ComponentCard title="Kalibrasi">
          <fieldset className="fieldset w-full">
            <Label htmlFor="dokumentasi">
              Foto-Foto Pemeliharaan <span className="text-red-500">*</span>
            </Label>

            <input
              id="dokumentasi"
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.gif,image/jpeg,image/png,image/gif"
              {...register("dokumentasi", {
                required: true,
              })}
              onChange={(e) => {
                register("dokumentasi").onChange(e); // wajib untuk RHF
                handleFiles(e); // untuk list nama
              }}
              className="focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400"
            />
            <p className="text-gray-700 dark:text-white/90">Maximal ukuran per file 50MB</p>

            {selectedFiles.length > 0 && (
              <ul className="mt-3 space-y-2">
                {selectedFiles.map((file, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-gray-200 dark:bg-gray-900 px-3 py-2 rounded"
                  >
                    <span className="text-sm text-gray-700 dark:text-white/90">{file.name}</span>

                    <button
                      type="button"
                      className="btn btn-xs btn-error text-white"
                      onClick={() => removeFile(i)}
                    >
                      Hapus
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </fieldset>
          <div className="w-full flex justify-end mt-2 gap-4">
            <button
              type="submit"
              className="btn btn-lg btn-success font-bold text-white"
              disabled={loading}
            >
              Submit
            </button>
          </div>
        </ComponentCard>
      </form>
    </>
  );
}
