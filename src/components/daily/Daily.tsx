/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles
import { CalenderIcon } from "@/icons";
import DailyTable from "../tables/DailyReportTable";
import Label from "../form/Label";

export default function Daily() {
  const [selectedDate, setSelectedDate] = useState<any>(new Date());

  return (
    <fieldset className="fieldset">
      <Label htmlFor="selected_date" className="text-gray-800">Filter by date:</Label>
      <label className="input border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] rounded-lg mb-6">
        <CalenderIcon className="text-gray-800 dark:text-white"/>
        {/* <input type="text" className="grow" placeholder="index.php" /> */}
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          className="text-gray-800 dark:text-white p-3 rounded-lg w-1/2"
          // showIcon // Shows a calendar icon
        />
      </label>
      <DailyTable filterDate={selectedDate}/>
    </fieldset>
  );
}
