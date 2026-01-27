/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import MonthlyTable from "../tables/MonthlyReportTable";
import { CalenderIcon } from "@/icons";
import DatePicker from "react-datepicker";
import Label from "../form/Label";

export default function Monthly() {
  const [selectedMonth, setSelectedMonth] = useState<any>(new Date());
  const [selectedSensorName, setSelectedSensorName] = useState<any>("ph");

  return (
    <div>
      <div className="flex flex-row gap-2 mb-6">
        <fieldset className="fieldset">
          <Label htmlFor="selected_month" className="text-gray-800">
            Filter by Month:
          </Label>
          <label className="input border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] rounded-lg">
            <CalenderIcon className="text-gray-800 dark:text-white" />
            <DatePicker
              selected={selectedMonth}
              onChange={(date) => setSelectedMonth(date)}
              dateFormat="yyyy-MM"
              className="text-gray-800 dark:text-white p-3 rounded-lg w-1/2"
              showMonthYearPicker
              // showIcon // Shows a calendar icon
            />
          </label>
        </fieldset>
        <fieldset className="fieldset">
          <Label htmlFor="sensor_name">Sensor Name:</Label>
          <select
            defaultValue={selectedSensorName}
            onChange={(event) => setSelectedSensorName(event.target.value)}
            className="select border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] rounded-lg text-gray-800 dark:text-white"
          >
            <option value={"ph"} className="dark:bg-gray-800">
              PH
            </option>
            <option value={"nh3n"} className="dark:bg-gray-800">
              NH3N
            </option>
            <option value={"cod"} className="dark:bg-gray-800">
              COD
            </option>
            <option value={"tss"} className="dark:bg-gray-800">
              TSS
            </option>
            <option value={"debit"} className="dark:bg-gray-800">
              DEBIT
            </option>
            <option value={"diff_debit"} className="dark:bg-gray-800">
              DIFF DEBIT
            </option>
          </select>
        </fieldset>
      </div>
      <MonthlyTable filteredMonth={selectedMonth} filteredSensor={selectedSensorName}/>
    </div>
  );
}
