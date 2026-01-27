"use client";
import React, { useEffect, useState } from "react";
import { CalenderIcon, FileIcon, PencilIcon, TaskIcon } from "@/icons";
import Link from "next/link";
import { getAuthToken } from "@/lib/sessions";
import { adminService } from "@/data/service";
import { Summary } from "../types/Summary";
import { ApiError } from "../types/ApiError";
import { formatCustomDate } from "@/lib/formatDate";

export const SummaryCard = () => {
  const [summaryData, setSummaryData] = useState<Summary>();
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });
  const [isToastOpen, setIsToastOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (isToastOpen) {
      timeoutId = setTimeout(() => {
        setIsToastOpen(false);
      }, 2500); // 10 / 5 detik
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId); // Membersihkan timeout jika komponen di-unmount sebelum timeout tercapai
      }
    };
  }, [isToastOpen]);

  const loadData = async () => {
    const authToken = await getAuthToken();
    const response = await adminService.summaryData(authToken);
    if (response.data) {
      const summary: Summary = response.data;
      setSummaryData(summary);
    } else {
      setErrorData({
        code: response.status,
        message: response.message,
      });
      setIsToastOpen(true);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
      {isToastOpen && (
        <div className="toast text-white mb-10 z-4">
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
      {/* <!-- Metric Item Start --> */}
      <Link
        href={"/harian"}
        className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transform 
    transition-all duration-300 hover:cursor-pointer hover:scale-105 hover:shadow-2xl"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <TaskIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <h4 className="text-3xl text-zinc-800 dark:text-gray-400">
              Laporan Harian
            </h4>
            {/* <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              3,782
            </h4> */}
          </div>
          <div className="flex flex-col items-end w-1/2">
            <span className="text-title-md text-brand-500 dark:text-white font-bold">
              {summaryData ? summaryData.laporanHarian.total : "-"}
            </span>
            <p className="text-zinc-800 dark:text-white text-sm">
              update:{" "}
              <b>
                {summaryData
                  ? formatCustomDate(summaryData.laporanHarian.update, "HH:mm")
                  : "-"} WIB
              </b>
            </p>
          </div>
        </div>
      </Link>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <Link
        href={"/bulanan"}
        className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transform 
    transition-all duration-300 hover:cursor-pointer hover:scale-105 hover:shadow-2xl"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <CalenderIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <h4 className="text-3xl text-zinc-800 dark:text-gray-400">
              Laporan Bulanan
            </h4>
            {/* <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              3,782
            </h4> */}
          </div>
          <div className="flex flex-col items-end w-1/2">
            <span className="text-title-md text-brand-500 dark:text-white font-bold">
              {summaryData ? summaryData.laporanBulanan.total : "-"}
            </span>
            <p className="text-zinc-800 dark:text-white text-sm">
              update:{" "}
              <b>
                {summaryData
                  ? formatCustomDate(
                      summaryData.laporanBulanan.update,
                      "MM/yyyy"
                    )
                  : "-"}
              </b>
            </p>
          </div>
        </div>
      </Link>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <Link
        href={"/adjusment"}
        className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transform 
    transition-all duration-300 hover:cursor-pointer hover:scale-105 hover:shadow-2xl"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <PencilIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <h4 className="text-3xl text-zinc-800 dark:text-gray-400">
              Total Konfigurasi
            </h4>
            {/* <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              3,782
            </h4> */}
          </div>
          <div className="flex flex-col items-end w-1/2">
            <span className="text-title-lg text-brand-500 font-bold dark:text-white">
              {summaryData ? summaryData.totalKonfigurasi : "-"}
            </span>
            {/* <p className="text-zinc-800 text-sm">update: <b>10:00</b></p> */}
          </div>
        </div>
      </Link>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <Link
        href={"/maintenance-report"}
        className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transform 
    transition-all duration-300 hover:cursor-pointer hover:scale-105 hover:shadow-2xl"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FileIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div className="">
            <h4 className="text-title-sm text-zinc-800 dark:text-gray-400">
              Total Mainte nance
            </h4>
            {/* <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              3,782
            </h4> */}
          </div>
          <div className="flex flex-col items-end w-1/2">
            <span className="text-title-md text-brand-500 dark:text-white font-bold">
              {summaryData ? summaryData.totalMaintenance.total : "-"}
            </span>
            <p className="text-zinc-800  dark:text-white text-sm">
              last:{" "}
              <b>
                {summaryData
                  ? formatCustomDate(summaryData.totalMaintenance.last, "dd/MM/yyyy")
                  : "-"}
              </b>
            </p>
          </div>
        </div>
      </Link>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
