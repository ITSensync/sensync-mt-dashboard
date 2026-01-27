/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import ReportForm from "../form/example-form/FormReport";
import ReportTable from "../tables/ReportTable";
import { Report } from "../types/Report";

export default function Maintenance() {
  const [editedReport, setEditedReport] = useState<any>(null);

  const getEditedData = (editedData: Report) => {
    setEditedReport(editedData)
  };

  const onCancelEdit = () => {
    setEditedReport(null);
  }

  return (
    <div>
      <ReportForm editedReportData={editedReport} onCancelEdit={onCancelEdit}/>
      <div className="w-full overflow-x-auto mt-10 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <p className="text-2xl text-center mb-6 dark:text-white text-gray-800">
          Maintenance Report Data
        </p>
        <ReportTable getEditedData={getEditedData}/>
      </div>
    </div>
  );
}
