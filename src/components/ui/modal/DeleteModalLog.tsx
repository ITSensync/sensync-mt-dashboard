// import { adjusmentService } from "../data/service";
// import { Adjusment } from "../types/Adjusment";
// import React, { useState } from "react";
// import { ApiError } from "../types/ApiError";
// import AlertToast from "./AlertToast";
import ModalLoading from "./ModalLoading";
import { useState } from "react";
import { ApiError } from "@/components/types/ApiError";
import { changenoteService, logService } from "@/data/service";
import AlertToast from "../alert/AlertToast";
import { getAuthToken } from "@/lib/sessions";
import { LogMaintenance } from "@/components/types/Log";

export default function DeleteModalLog({
  logData,
  onDelete,
}: {
  logData: LogMaintenance;
  onDelete: (id: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toastData, setToastData] = useState<ApiError>({
    code: 0,
    message: "",
  });

  const handleDelete = async () => {
    (
      document.getElementById("delete_modal_log") as HTMLDialogElement
    ).close();
    setIsLoading(true);

    const authToken = await getAuthToken();
    const response = await logService.delete(
      logData.id,
      authToken,
    );
    if (response.status !== 200) {
      setToastData({
        message: response.message,
        code: response.status,
      });
      setIsToastOpen(true);
    } else {
      setToastData({
        message: response.message,
        code: response.status,
      });
      setIsSuccess(true);
      onDelete(String(logData.id));
      setIsToastOpen(true);
    }
    setIsLoading(false);
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <div>
      <AlertToast
        content={toastData}
        isOpen={isToastOpen}
        onClose={handleCloseToast}
        classname={isSuccess ? "alert-success" : "alert-error"}
      />
      <ModalLoading isOpen={isLoading} />
      <dialog id="delete_modal_log" className="modal">
        <div className="modal-box w-fit p-10 bg-white">
          <h1 className="mb-4 text-center text-3xl font-bold text-black">
            Delete Log Maintenance
          </h1>
          <p className="mb-4 text-center text-black/70">
            Are you sure to delete this log maintenance?
          </p>
          <div className="card-actions justify-center">
            <form method="dialog">
              <button className="btn btn-outline btn-warning">Cancel</button>
            </form>
            <button
              onClick={() => handleDelete()}
              className="btn btn-error text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
