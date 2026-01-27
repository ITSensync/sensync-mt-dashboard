"use client";
import React, { useActionState, useEffect, useState } from "react";
import Input from "../input/InputField";
import Label from "../Label";
import TextArea from "../input/TextArea";
import ModalLoading from "@/components/ui/modal/ModalLoading";
import {
  addReportAction,
  editReportAction,
} from "@/data/actions/FormReportActions";
import { ApiError } from "@/components/types/ApiError";
import SuccessModal from "@/components/ui/modal/SuccessModal";
import Alert from "@/components/ui/alert/Alert";
import ZodErrors from "@/components/ui/alert/ZodErrors";
import { Report } from "@/components/types/Report";

const INITIAL_STATE = {
  data: null,
}; // <---  add this

export default function ReportForm({
  editedReportData,
  onCancelEdit,
}: {
  editedReportData?: Report;
  onCancelEdit: () => void; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formAddState, formAddAction] = useActionState(
    addReportAction,
    INITIAL_STATE
  );
  const [formEditState, formEditAction] = useActionState(
    editReportAction,
    INITIAL_STATE
  );
  const [apiErrorData, setApiErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });
  const [formReportState, setFormReportState] = useState<Report>({
    id: editedReportData?.id || "",
    operator_name: editedReportData?.operator_name || "",
    detail: editedReportData?.detail || "",
    next_step: editedReportData?.next_step || "",
    createdAt: editedReportData?.createdAt || "",
  });

  useEffect(() => {
    if (editedReportData) {
      setFormReportState({
        id: editedReportData.id,
        operator_name: editedReportData.operator_name,
        detail: editedReportData.detail,
        next_step: editedReportData.next_step,
        createdAt: editedReportData.createdAt,
      });
      setIsOpen(true);
    }
  }, [editedReportData]);

  useEffect(() => {
    if (!formAddState.isLoading && !formEditState.isLoading) {
      setIsLoading(false);
    }

    if (formAddState.isError || formEditState.isError) {
      setApiErrorData({
        code: formAddState?.apiErros?.code,
        message: formAddState?.apiErrors?.message,
      });
      setIsError(true);
    }

    if (formAddState.isSuccess || formEditState.isSuccess) {
      (
        document.getElementById("success_modal") as HTMLDialogElement
      ).showModal();
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [formAddState, formEditState]);

  const handleSubmit = (event: React.FormEvent) => {
    const formElement = event.currentTarget as HTMLFormElement;

    if (!formElement.checkValidity()) {
      event.preventDefault(); // Cegah submit jika ada kesalahan validasi
      return;
    }

    setIsLoading(true);
    setIsError(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormReportState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancelBtn = () => {
    setIsOpen(false);
    setFormReportState({
      id: "",
      operator_name: "",
      detail: "",
      next_step: "",
      createdAt: "",
    });
    onCancelEdit();
  }

  return (
    <>
      <ModalLoading isOpen={isLoading} />
      <SuccessModal message={formAddState?.message || formEditState?.message} />
      <div className="collapse collapse-plus border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <input
          type="checkbox"
          name="my-accordion-3"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
        <div className="collapse-title font-semibold dark:text-white text-gray-800">
          Form Report Maintenance
        </div>
        <div className="collapse-content ">
          <form
            onSubmit={handleSubmit}
            action={editedReportData ? formEditAction : formAddAction}
          >
            {isError && (
              <Alert
                message={apiErrorData.message}
                variant="error"
                title={"Error Input Report"}
                showLink={false}
              />
            )}
            {editedReportData && (
              <Input
                type="text"
                name="id"
                defaultValue={formReportState.id}
                onChange={handleInputChange}
                className="hidden"
              />
            )}
            <fieldset className="fieldset w-full">
              <Label htmlFor="operator_name">Operator Name</Label>
              <Input
                type="text"
                name="operator_name"
                placeholder="John Boe"
                defaultValue={formReportState.operator_name}
                onChange={handleInputChange}
                required={true}
              />
              <span className="fieldset-label">
                <ZodErrors
                  error={
                    formAddState?.zodErrors?.operator_name ||
                    formEditState?.zodErrors?.operator_name
                  }
                />
              </span>
            </fieldset>
            <fieldset className="fieldset w-full">
              <Label htmlFor="detail">Detail Pekerjaan</Label>
              <TextArea
                name="detail"
                placeholder="Write a report detail ..."
                value={formReportState.detail}
                onChange={handleInputChange}
                className="text-gray-700"
              />
              <span className="fieldset-label">
                <ZodErrors
                  error={
                    formAddState?.zodErrors?.detail ||
                    formEditState?.zodErrors?.detail
                  }
                />
              </span>
            </fieldset>
            <fieldset className="fieldset w-full">
              <Label htmlFor="next_step">Catatan Selanjutnya</Label>
              <TextArea
                name="next_step"
                placeholder="Write a next maintenenace step ..."
                value={formReportState.next_step}
                onChange={handleInputChange}
                className="text-gray-900"
              />
              <span className="fieldset-label">
                <ZodErrors
                  error={
                    formAddState?.zodErrors?.next_step ||
                    formEditState?.zodErrors?.next_step
                  }
                />
              </span>
            </fieldset>
            <div className="w-full flex justify-end mt-2 gap-4">
              {editedReportData && (
                <button
                  type="button"
                  onClick={handleCancelBtn}
                  className="btn btn-outline btn-warning font-bold "
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="btn btn-success font-bold text-white"
              >
                {editedReportData ? "Save" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
