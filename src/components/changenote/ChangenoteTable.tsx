"use client";
import React, { useEffect, useState } from "react";
import Loading from "../ui/loading/Loading";
import { Table, TableBody, TableRow } from "@mui/material";
import { TableCell, TableHeader } from "../ui/table";
import { Changenote } from "../types/Changenote";
import { getAuthToken, getIdDevice } from "@/lib/sessions";
import { ApiError } from "../types/ApiError";
import { changenoteService } from "@/data/service";
import { formatCustomDate } from "@/lib/formatDate";

export default function ChangenoteTable() {
  const [changenotes, setChangenotes] = useState<Changenote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);

    const authToken = await getAuthToken();
    const idDevice = await getIdDevice();
    const response = await changenoteService.getAll(idDevice, authToken);
    if (response.data) {
      const changenotesData: Changenote[] = response.data;
      setChangenotes(changenotesData);
    } else {
      setIsToastOpen(true);
      setErrorData({
        code: response.status || 500,
        message: response.message || "An error occurred while fetching data.",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full">
      {/* <DeleteModalReport
        reportData={deletedData!}
        onDelete={removeDataFromState}
      /> */}
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
        <div className="flex items-center justify-center w-full mt-4">
          <Loading />
        </div>
      ) : (
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
                      No
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Tanggal
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Teknisi
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Catatan Perubahan
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {changenotes.map((changenote, i) => (
                    <TableRow key={changenote.id}>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <p>{i + 1}</p>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <p>
                          {formatCustomDate(changenote.createdAt, "yyyy/MM/dd")}
                        </p>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <p>{changenote.teknisi}</p>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <p>{changenote.catatan}</p>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <button
                          className="tooltip tooltip-info mr-2"
                          data-tip="Edit"
                          // onClick={() => handleEditBtn(report)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-5 text-blue-600"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                          </svg>
                        </button>

                        <button
                          className="tooltip tooltip-error"
                          data-tip="Delete"
                          // onClick={() => handleDeleteBtn(report)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-5 text-error"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
