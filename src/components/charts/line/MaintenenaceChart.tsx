/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";

import { ApexOptions } from "apexcharts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import dynamic from "next/dynamic";
import { getAuthToken } from "@/lib/sessions";
import { sensorDataService } from "@/data/service";
import { ChartSensorData } from "@/components/types/SensorData";
import { ApiError } from "@/components/types/ApiError";
import { formatCustomDate } from "@/lib/formatDate";
// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MaintenanceChart() {
  const [chartData, setChartData] = useState<ChartSensorData>();
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });
  const [isToastOpen, setIsToastOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const authToken = await getAuthToken();
    const response = await sensorDataService.getChartData(authToken);
    if (response.data) {
      const chartSensor: ChartSensorData = response.data;
      setChartData(chartSensor);
    } else {
      setErrorData({
        code: response.status,
        message: response.message,
      });
      setIsToastOpen(true);
    }
  };

  const beforeMaintenance = chartData?.beforeMaintenance || [];
  const afterMaintenance = chartData?.afterMaintenance || [];

  // **Menyusun data untuk chart**
  const generateSeries = (data: any[]) => [
    { name: "pH", data: data.map((d) => d.ph) },
    { name: "COD", data: data.map((d) => d.cod) },
    { name: "TSS", data: data.map((d) => d.tss) },
    { name: "NH3N / 10", data: data.map((d) => d.nh3n / 10) },
    { name: "Debit / 100", data: data.map((d) => d.debit / 100) },
  ];

  const optionsBefore: ApexOptions = {
    legend: { show: true, position: "top" },
    colors: ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFC733"],
    chart: { height: 350, type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: 2 },
    markers: {
      size: 5, // Ukuran dot normal
      hover: { size: 7 }, // Ukuran dot saat hover
    },
    dataLabels: {
      enabled: false, // Menghilangkan angka pada titik data
    },
    xaxis: {
      type: "category",
      categories: beforeMaintenance.map((d) =>
        formatCustomDate(d.createdAt, "yyyy/MM/dd - HH:mm:ss")
      ),
      labels: { rotate: -45 },
    },
    yaxis: {
      labels: {
        style: { fontSize: "12px", colors: ["#6B7280"] },
        formatter: function (value) {
          return value.toFixed(2); // Membatasi angka di sumbu Y menjadi 2 desimal
        },
      },
      title: { text: "Sensor Values", style: { fontSize: "14px" } },
    },
    tooltip: {
      enabled: true,
      x: { format: "dd MMM yyyy HH:mm" },
      y: {
        formatter: function (value) {
          return value.toFixed(2); // Membatasi angka di sumbu Y menjadi 2 desimal
        },
      },
    },
  };

  const optionsAfter: ApexOptions = {
    legend: { show: true, position: "top" },
    colors: ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFC733"],
    chart: { height: 350, type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: 2 },
    markers: {
      size: 5, // Ukuran dot normal
      hover: { size: 7 }, // Ukuran dot saat hover
    },
    dataLabels: {
      enabled: false, // Menghilangkan angka pada titik data
    },
    xaxis: {
      type: "category",
      categories: afterMaintenance.map((d) =>
        formatCustomDate(d.createdAt, "yyyy/MM/dd - HH:mm:ss")
      ),
      labels: { rotate: -45 },
    },
    yaxis: {
      labels: {
        style: { fontSize: "12px", colors: ["#6B7280"] },
        formatter: function (value) {
          return value.toFixed(2); // Membatasi angka di sumbu Y menjadi 2 desimal
        },
      },
      title: { text: "Sensor Values", style: { fontSize: "14px" } },
    },
    tooltip: {
      enabled: true,
      x: { format: "dd MMM yyyy HH:mm" },
      y: {
        formatter: function (value) {
          return value.toFixed(2); // Membatasi angka di sumbu Y menjadi 2 desimal
        },
      },
    },
  };

  return (
    <>
      {isToastOpen && (
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
      <Swiper
        loop={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper max-w-full xl:max-w-[70vw] 2xl:max-w-[75vw]"
      >
        <SwiperSlide className="overflow-hidden max-w-full">
          <p className="text-zinc-900 dark:text-white text-center mb-4 text-title-sm font-bold">
            Sebelum Maintenance
          </p>
          <p className="text-center text-gray-600  dark:text-white mb-4">
            (
            {chartData
              ? formatCustomDate(chartData.beforeDate, "yyyy/MM/dd")
              : "-"}{" "}
            -{" "}
            {chartData
              ? formatCustomDate(chartData.maintenanceDate, "yyyy/MM/dd")
              : "-"}
            )
          </p>
          <div id="chartEight" className="max-w-full">
            <ReactApexChart
              options={optionsBefore}
              series={generateSeries(beforeMaintenance)}
              type="area"
              height={400}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="overflow-hidden max-w-full">
          <p className="text-zinc-900 dark:text-white text-center mb-4 text-title-sm font-bold">
            Sesudah Maintenance
          </p>
          <p className="text-center text-gray-600  dark:text-white mb-4">
            (
            {chartData
              ? formatCustomDate(chartData.maintenanceDate, "yyyy/MM/dd")
              : "-"}{" "}
            -{" "}
            {chartData
              ? formatCustomDate(chartData.afterDate, "yyyy/MM/dd")
              : "-"}
            )
          </p>
          <div id="chartEight" className="max-w-full">
            <ReactApexChart
              options={optionsAfter}
              series={generateSeries(afterMaintenance)}
              type="area"
              height={400}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
