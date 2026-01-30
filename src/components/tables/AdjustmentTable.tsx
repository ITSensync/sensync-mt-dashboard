"use client";
import React, { useEffect, useState } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import DeleteModal from "../ui/modal/DeleteModal";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { adjusmentService } from "@/data/service";
import { CSS } from "@dnd-kit/utilities";
import Loading from "../ui/loading/Loading";
import { ApiError } from "../types/ApiError";
import { getAuthToken, getIdDevice } from "@/lib/sessions";
import { Adjustment } from "../types/Adjustment";

export default function AdjusmentTable({
  handleEditedData,
  handleFormShowing,
}: {
  handleEditedData: (editedData: Adjustment) => void;
  handleFormShowing: (state: boolean) => void;
}) {
  const [initAdjusmentData, setInitAdjusmentData] = useState<Adjustment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });
  const [deletedData, setDeletedData] = useState<Adjustment>();
  const [rows, setRows] = useState(initAdjusmentData);
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setRows(initAdjusmentData);
  }, [initAdjusmentData]);

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
    setIsLoading(true);
    const authToken = await getAuthToken();
    const idDevice = await getIdDevice();
    const response = await adjusmentService.getAllData(authToken, idDevice);
    if (response.data) {
      const adjusmentData: Adjustment[] = response.data;
      setInitAdjusmentData(adjusmentData);
    } else {
      setErrorData({
        code: response.status,
        message: response.message,
      });
      // console.log("NO DATA");
      setIsToastOpen(true);
    }
    setIsLoading(false);
  };

  const handleBtnEdit = (isShow: boolean, editedData: Adjustment) => {
    handleEditedData(editedData);
    handleFormShowing(isShow);
  };

  const handleDeleteBtn = (adjusmentData: Adjustment) => {
    setDeletedData(adjusmentData);
    (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
  };

  const handleStatusChange = async (id: string, stateChecked: boolean) => {
    try {
      // Update the status in the database via service
      const body = {
        status: stateChecked ? "enable" : "disable",
      };

      const authToken = await getAuthToken();
      const response = await adjusmentService.editData(body, id, authToken);

      if (response.status === 200) {
        console.log("success");
        // Update the status in the local state
        setInitAdjusmentData((prevData) =>
          prevData.map((item) =>
            item.id === id
              ? { ...item, status: stateChecked ? "enable" : "disable" }
              : item
          )
        );
      } else {
        throw new Error("failed update status");
      }
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  const removeDataFromState = (id: string) => {
    setInitAdjusmentData((prevData) =>
      prevData.filter((item) => item.id !== id)
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = rows.findIndex((item) => item.id === active.id);
    const newIndex = rows.findIndex((item) => item.id === over.id);

    const newRows = arrayMove(rows, oldIndex, newIndex).map((row, index) => ({
      ...row,
      position: index + 1,
    }));

    setInitAdjusmentData(newRows);

    newRows.forEach(async (data) => {
      try {
        // Update the status in the database via service
        const body = {
          position: data.position,
        };

        const authToken = await getAuthToken();
        const response = await adjusmentService.editData(
          body,
          data.id,
          authToken
        );

        if (response.status === 200) {
          console.log("success");
          // Update the status in the local state
        } else {
          throw new Error("failed update position");
        }
      } catch (error) {
        console.log("Error updating position:", error);
      }
    });
  };

  return (
    <>
      <DeleteModal
        type="Initialize"
        adjusmentData={deletedData!}
        onDelete={removeDataFromState}
      />
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
        <div className="flex w-full justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <div className="min-w-fit">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <Table>
                  {/* Table Header */}
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        {""}
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Sensor
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Condition
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Operation
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Min. Random
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Max. Random
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Variable
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        New Value
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Active
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
                    <SortableContext
                      items={initAdjusmentData.map((data) => data.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {initAdjusmentData.map((data, index) => (
                        <SortableRow
                          key={index}
                          data={data}
                          handleStatusChange={handleStatusChange}
                          handleBtnEdit={handleBtnEdit}
                          handleBtnDelete={handleDeleteBtn}
                        />
                      ))}
                    </SortableContext>
                  </TableBody>
                </Table>
              </DndContext>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SortableRow({
  data,
  handleStatusChange,
  handleBtnEdit,
  handleBtnDelete,
}: {
  data: Adjustment;
  handleStatusChange: (id: string, checked: boolean) => void;
  handleBtnEdit: (isShow: boolean, data: Adjustment) => void;
  handleBtnDelete: (data: Adjustment) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes}>
      <td
        {...listeners}
        className="px-4 py-3 text-start text-gray-800 dark:text-white cursor-grab active:cursor-grabbing"
      >
        <DragIndicatorIcon fontSize="small" />
      </td>
      <TableCell className="px-4 py-3 sm:px-6 text-start">
        <div className="flex items-center gap-3">
          <div>
            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {data.sensor_name}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        {data.condition ? data.condition : "-"}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        <div className="flex -space-x-2">
          <span>
            {(() => {
              if (!data.operation) return "-";
              if (data.operation === "round") return "Linear Reg.";
              return data.operation;
            })()}
          </span>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
        <span>{data.min ? data.min : "-"}</span>
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
        <span>{data.max ? data.max : "-"}</span>
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
        {data.factor !== undefined &&
        data.factor !== null &&
        data.offset !== undefined &&
        data.offset !== null
          ? `${
              data.offset.includes("cod") ||
              data.offset.includes("ph") ||
              data.offset.includes("nh3n") ||
              data.offset.includes("debit") ||
              data.offset.includes("tss")
                ? data.offset
                : `y - ${data.offset}`
            } * ${data.factor}`
          : "-"}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
        {data.new_value ? data.new_value : "-"}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
        <>
          <input
            type="checkbox"
            className="toggle toggle-success bg-zinc-200 text-zinc-400 border-zinc-200 checked:border-green-300 checked:text-green-400 checked:bg-green-200"
            checked={data.status ? data.status === "enable" : false}
            onChange={(e) => handleStatusChange(data.id, e.target.checked)}
          />
        </>
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
        {/* EDIT BUTTON */}
        <button
          className="tooltip tooltip-info mr-2"
          data-tip="Edit"
          onClick={() => handleBtnEdit(true, data)}
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
        {/* DELETE */}
        <button
          className="tooltip tooltip-warning"
          data-tip="Delete"
          onClick={() => handleBtnDelete(data)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 text-warning"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </TableCell>
    </tr>
  );
}
