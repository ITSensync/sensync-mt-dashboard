import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DailySensorData } from "../types/SensorData";
import { sensorDataService } from "@/data/service";
import { getAuthToken } from "@/lib/sessions";
import { ApiError } from "../types/ApiError";
import Loading from "../ui/loading/Loading";
import { format } from "date-fns";
import { formatCustomDate } from "@/lib/formatDate";

interface Stats {
  min: Record<string, number>;
  max: Record<string, number>;
  mean: Record<string, number>;
}

// Define the table data using the interface
export default function DailyTable({
  filterDate,
} : {
 filterDate: string,
}) {
  const [dailyData, setDailyData] = useState<DailySensorData[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });
  const [isToastOpen, setIsToastOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, [filterDate]);

  const loadData = async () => {
    setIsLoading(true);
    const auhtToken = await getAuthToken();
    const response = await sensorDataService.getDailySensor(
      format(new Date(filterDate), 'yyyy-MM-dd'),
      auhtToken
    );
    if (response.data) {
      const dailyData: DailySensorData[] = response.data;
      setDailyData(dailyData);
      computeStats(dailyData)
    } else {
      setErrorData({
        code: response.status,
        message: response.message,
      });
      setIsToastOpen(true);
    }
    setIsLoading(false);
  };

  const computeStats = (data: DailySensorData[]) => {
    const keys = ["ph", "cod", "tss", "nh3n", "debit", "diff_debit"];
    const minValues: Record<string, number> = {};
    const maxValues: Record<string, number> = {};
    const sumValues: Record<string, number> = {};
    const meanValues: Record<string, number> = {};

    keys.forEach((key) => {
      // Pastikan semua nilai dikonversi ke number
      const values = data.map((d) => Number(d[key as keyof DailySensorData]));
    
      // Filter nilai NaN agar tidak menyebabkan error
      const validValues = values.filter((v) => !isNaN(v));
    
      // Cek apakah ada data yang valid sebelum menghitung min, max, sum, mean
      if (validValues.length > 0) {
        minValues[key] = Math.min(...validValues);
        maxValues[key] = Math.max(...validValues);
        sumValues[key] = validValues.reduce((acc, val) => acc + val, 0);
        meanValues[key] = parseFloat((sumValues[key] / validValues.length).toFixed(2));
      } else {
        // Jika tidak ada data valid, beri nilai default (misalnya 0)
        minValues[key] = 0;
        maxValues[key] = 0;
        sumValues[key] = 0;
        meanValues[key] = 0;
      }
    });

    setStats({ min: minValues, max: maxValues, mean: meanValues });
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
      {isLoading ? (
        <div className="mt-4 w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="w-full">
          <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <div className="min-w-fit">
                <Table>
                  {/* Table Header */}
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Date - Time
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        PH
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        COD
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        TSS
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        NH3N
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        DEBIT
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        DIFF DEBIT
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  {/* Table Body */}
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {dailyData.map((daily, index) => (
                      <TableRow key={index}>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <p>{formatCustomDate(daily.createdAt, 'yyyy/MM/dd - HH:mm:ss')}</p>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <p>{daily.ph}</p>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <p>{daily.cod}</p>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <p>{daily.tss}</p>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <p>{daily.nh3n}</p>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <p>{daily.debit}</p>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <p>{daily.diff_debit}</p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                  {/* Render MIN, MAX, MEAN dynamically */}
                  {stats &&
                    (["min", "max", "mean"] as const).map((statType) => (
                      <TableBody key={statType} className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        <TableRow>
                          <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-end font-bold">
                            {statType.toUpperCase()}
                          </TableCell>
                          {[
                            "ph",
                            "cod",
                            "tss",
                            "nh3n",
                            "debit",
                            "diff_debit",
                          ].map((key) => (
                            <TableCell key={key} className="px-4 py-3 font-bold text-gray-500 text-theme-sm dark:text-gray-400">
                              {stats[statType][key]}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    ))}
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
