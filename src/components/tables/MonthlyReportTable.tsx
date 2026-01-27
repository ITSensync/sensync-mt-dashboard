/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { MonthlySensorData } from "../types/SensorData";
import { ApiError } from "../types/ApiError";
import { getAuthToken } from "@/lib/sessions";
import { sensorDataService } from "@/data/service";
import { format, getDaysInMonth } from "date-fns";
import Loading from "../ui/loading/Loading";

interface Stats {
  min: Record<string, number>;
  max: Record<string, number>;
  mean: Record<string, number>;
}

interface GroupedData {
  [hour: string]: { [day: string]: number };
}

export default function MonthlyTable({
  filteredMonth,
  filteredSensor,
}: {
  filteredMonth: string;
  filteredSensor: string;
}) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [groupData, setGroupData] = useState<GroupedData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });
  const [isToastOpen, setIsToastOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, [filteredMonth, filteredSensor]);

  const loadData = async () => {
    setIsLoading(true);
    const auhtToken = await getAuthToken();
    const response = await sensorDataService.getMonthlySensor(
      format(filteredMonth, "yyyy-MM"),
      filteredSensor,
      auhtToken
    );
    if (response.data) {
      const monthlyData: MonthlySensorData[] = response.data;
      computeStats(monthlyData);
      processData(monthlyData);
    } else {
      setErrorData({
        code: response.status,
        message: response.message,
      });
      setIsToastOpen(true);
    }
    setIsLoading(false);
  };

  const processData = (monthlyData: MonthlySensorData[]) => {
    const groupedData: GroupedData = {};

    monthlyData.forEach((item: any) => {
      const date = new Date(item.createdAt);
      const hour = date.getUTCHours().toString().padStart(2, "0"); // Format 2 digit jam (00 - 23)
      const day = date.getUTCDate().toString(); // Ambil tanggal (1 - 29 untuk Februari 2024)

      if (!groupedData[hour]) groupedData[hour] = {};
      groupedData[hour][day] = item[filteredSensor] || 0;
    });

    setGroupData(groupedData);
  };

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const computeStats = (data: MonthlySensorData[]) => {
    const minValues: Record<string, number> = {};
    const maxValues: Record<string, number> = {};
    const sumValues: Record<string, number> = {};
    const meanValues: Record<string, number> = {};

    // Grupkan data berdasarkan hari
    const groupedByDay: Record<string, number[]> = {};

    data.forEach((item) => {
      const date = new Date(item.createdAt);
      const day = date.getUTCDate().toString(); // Ambil hari dalam bentuk string

      if (!groupedByDay[day]) groupedByDay[day] = [];
      groupedByDay[day].push(
        Number(item[filteredSensor as keyof MonthlySensorData])
      );
    });

    // Hitung stats hanya untuk hari yang memiliki data
    Object.keys(groupedByDay).forEach((day) => {
      const validValues = groupedByDay[day].filter((v) => !isNaN(v));

      if (validValues.length > 0) {
        minValues[day] = Math.min(...validValues);
        maxValues[day] = Math.max(...validValues);
        sumValues[day] = validValues.reduce((acc, val) => acc + val, 0);
        meanValues[day] = parseFloat(
          (sumValues[day] / validValues.length).toFixed(2)
        );
      }
    });

    setStats({ min: minValues, max: maxValues, mean: meanValues });
  };

  return (
    <div>
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
      {isLoading ? (
        <div className="w-full flex items-center justify-center mt-4">
          <Loading />
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto xl:max-w-[66vw] 2xl:max-w-[74vw]">
            <div className="min-w-fit">
              <Table className="">
                {/* Table Header */}
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Time
                    </TableCell>
                    {Array.from({ length: getDaysInMonth(filteredMonth) }).map(
                      (_, i) => (
                        <TableCell
                          key={i}
                          className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          isHeader
                        >
                          {i + 1}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {hours.map((hour) => (
                    <TableRow key={hour}>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <p>{hour}:00</p>
                      </TableCell>
                      {Array.from(
                        { length: getDaysInMonth(filteredMonth) },
                        (_, day) => {
                          const sensorValue =
                            groupData[hour]?.[day + 1] !== undefined
                              ? groupData[hour][day + 1]
                              : "-";
                          // Tampilkan "-" jika tidak ada data
                          return (
                            <TableCell
                              key={day}
                              className="px-2 py-2 text-center text-gray-500 text-theme-sm dark:text-gray-400"
                            >
                              {sensorValue}
                            </TableCell>
                          );
                        }
                      )}
                    </TableRow>
                  ))}
                </TableBody>

                {stats &&
                  (["min", "max", "mean"] as const).map((statType) => (
                    <TableBody
                      key={statType}
                      className="divide-y divide-gray-100 dark:divide-white/[0.05]"
                    >
                      <TableRow>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-end font-bold">
                          {statType.toUpperCase()}
                        </TableCell>
                        {Array.from({
                          length: getDaysInMonth(filteredMonth),
                        }).map((_, index) => {
                          const day = index + 1; // Sesuaikan dengan tanggal (1-based)
                          return (
                            <TableCell
                              key={day}
                              className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 font-bold"
                            >
                              {stats[statType][day] ?? "-"}{" "}
                              {/* Gunakan tanggal sebagai key */}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableBody>
                  ))}
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
