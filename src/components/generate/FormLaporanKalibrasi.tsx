/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import { useFormContext } from "react-hook-form";
import { getAuthToken, getIdDevice } from "@/lib/sessions";
import { ApiError } from "../types/ApiError";
import SuccessModal from "../ui/modal/SuccessModal";
import Label from "../form/Label";
import { generateSiteData } from "@/lib/generate";
import Input from "../form/input/react-hook/InputFieldHook";
import { generateService } from "@/data/service";

export default function FormLaporanKalibrasi() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const fetchIdDevice = async () => {
      const id = await getIdDevice();

      const siteData = generateSiteData(id || "");

      // ✅ set ke form (bukan defaultValue)
      setValue("site", siteData.site);
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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    const input = document.getElementById("fileKalibrasi") as HTMLInputElement;
    if (input) input.value = "";
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

    // const id = await getIdDevice();
    // const siteData = generateSiteData(id || "");

    // formData.append("site", siteData.site);
    // formData.append("type", siteData.type);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const auhtToken = await getAuthToken();
    const response = await generateService.generateLaporanKalibrasi(
      auhtToken,
      formData,
    );

    // console.log(response.status);
    if (response) {
      // let previewTab: Window | null = null;
      // previewTab = window.open("", "_blank");
      // if (previewTab) {
      //   previewTab.document.write(`
      //   <html>
      //     <head>
      //       <title>Generating File...</title>
      //       <style>
      //         body {
      //           font-family: system-ui;
      //           display:flex;
      //           height:100vh;
      //           justify-content:center;
      //           align-items:center;
      //           flex-direction:column;
      //           gap:16px;
      //         }
      //         .spinner {
      //           width:50px;
      //           height:50px;
      //           border:5px solid #ddd;
      //           border-top:5px solid #2563eb;
      //           border-radius:50%;
      //           animation:spin 1s linear infinite;
      //         }
      //         @keyframes spin {
      //           100% { transform: rotate(360deg); }
      //         }
      //       </style>
      //     </head>
      //     <body>
      //       <div class="spinner"></div>
      //       <h3>Generating file, please wait...</h3>
      //     </body>
      //   </html>
      // `);
      //   previewTab.document.close();
      // }

      if (response?.status) {
        setErrorData({ code: response.status, message: response.message });
        setToast(true);
        setTimeout(() => setToast(false), 5000);
        return;
      }

      (
        document.getElementById("success_modal") as HTMLDialogElement
      ).showModal();

      setLoading(false);

      setTimeout(() => {
        reset();
        window.location.reload();
      }, 5000);

      // if (previewTab) {
      //   previewTab.location.href = `${process.env.MT_API_URL}/generate/${response.url}`;
      // }
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
      <SuccessModal message={"Berhasil Generate Laporan Kalibrasi"} />
      <form
        className="grid grid-cols-1 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ComponentCard title="Kalibrasi">
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
              Tanggal Kalibrasi <span className="text-red-500">*</span>
            </Label>

            <Input
              type="date"
              {...register(`tanggal`, {
                required: "Tanggal tidak boleh kosong",
              })}
              placeholder="Tanggal"
            />
            {errors.tanggal && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tanggal.message as string}
              </p>
            )}
          </fieldset>

          {/* catatan */}
          <fieldset className="fieldset w-full">
            <Label htmlFor="File Kalibrasi">
              File Kalibrasi <span className="text-red-500">*</span>
            </Label>

            <input
              id="fileKalibrasi"
              type="file"
              required
              accept=".xlsx,.xls,"
              {...register("fileKalibrasi", {
                required: true,
              })}
              onChange={(e) => {
                register("fileKalibrasi").onChange(e); // wajib untuk RHF
                handleFiles(e); // untuk list nama
              }}
              className="focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400"
            />
            <p className="text-gray-700 dark:text-white/90">
              Maximal ukuran per file 50MB
            </p>

            {/* {selectedFile && (
              <ul className="mt-3 space-y-2">
                <li className="flex justify-between items-center bg-gray-200 dark:bg-gray-900 px-3 py-2 rounded">
                  <span className="text-sm text-gray-700 dark:text-white/90">
                    {selectedFile.name}
                  </span>
                  <button
                    type="button"
                    className="btn btn-xs btn-error text-white"
                    onClick={removeFile}
                  >
                    Hapus
                  </button>
                </li>
              </ul>
            )} */}
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
