"use client";
import React, { useActionState, useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import { ApiError } from "../types/ApiError";
import { Changenote } from "../types/Changenote";
import ModalLoading from "../ui/modal/ModalLoading";
import SuccessModal from "../ui/modal/SuccessModal";
import Alert from "../ui/alert/Alert";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import ZodErrors from "../ui/alert/ZodErrors";
import TextArea from "../form/input/TextArea";
import { addChangenoteAction, editChangenoteAction } from "@/data/actions/FormChangenoteActions";
import { format } from "path";
import { formatCustomDate } from "@/lib/formatDate";

const INITIAL_STATE = {
  data: null,
};

export default function FormChangenote({
  initChangenoteData,
  getIsFormInitShowingState,
  onClose,
}: {
  initChangenoteData?: Changenote;
  getIsFormInitShowingState: (state: boolean) => void;
  onClose?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formAddState, formAddAction] = useActionState(
    addChangenoteAction,
    INITIAL_STATE,
  );
  const [formEditState, formEditAction] = useActionState(
    editChangenoteAction,
    INITIAL_STATE,
  );
  const [apiErrorData, setApiErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });
  const [formInitState, setFormInitState] = useState<Changenote>({
    id: initChangenoteData?.id || 0,
    id_device: initChangenoteData?.id_device || "",
    createdAt: initChangenoteData?.createdAt || "",
    teknisi: initChangenoteData?.teknisi || "",
    catatan: initChangenoteData?.catatan || "",
  });

  useEffect(() => {
    if (!formAddState.isLoading && !formEditState.isLoading) {
      setIsLoading(false);
    }

    if (formAddState.isError || formEditState.isError) {
      setApiErrorData({
        code: formAddState?.apiErrors?.code || formEditState?.apiErrors?.code,
        message:
          formAddState?.apiErrors?.message || formEditState?.apiErrors?.message,
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

  useEffect(() => {
    // setSensorName(initialSensorName);

    if (initChangenoteData) {
      console.log(initChangenoteData)
      setFormInitState({
        id: initChangenoteData.id,
        id_device: initChangenoteData.id_device || "",
        createdAt: initChangenoteData.createdAt || "",
        teknisi: initChangenoteData.teknisi || "",
        catatan: initChangenoteData.catatan || "",
      });
    }
  }, [initChangenoteData]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormInitState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBackButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    isShow: boolean,
  ) => {
    event.preventDefault();
    const confirmBack = confirm(
      "Apakah Anda yakin ingin kembali? Perubahan data tidak akan tersimpan.",
    );

    if (confirmBack) {
      getIsFormInitShowingState(isShow);
      if (onClose) {
        onClose();
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formElement = event.currentTarget as HTMLFormElement;

    if (!formElement.checkValidity()) {
      event.preventDefault(); // Cegah submit jika ada kesalahan validasi
      return;
    }

    setIsLoading(true);
    setIsError(false);

    // event.preventDefault();
    // console.log("Form submitted:");
  };

  return (
    <ComponentCard title={`${initChangenoteData ? "Edit" : "New"} Record`}>
      <ModalLoading isOpen={isLoading} />
      <SuccessModal message={formAddState?.message || formEditState?.message} />
      <form
        action={initChangenoteData ? formEditAction : formAddAction}
        onSubmit={handleSubmit}
      >
        {isError && (
          <div className="mb-4">
            <Alert
              variant="error"
              title={`Error ${apiErrorData.code}`}
              message={apiErrorData.message}
              showLink={false}
            />
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="col-span-full">
            {initChangenoteData && (
              <Input
                type="text"
                placeholder="Type here"
                name="id"
                className="hidden"
                defaultValue={formInitState.id}
                onChange={handleInputChange}
              />
            )}
            <fieldset className="fieldset w-full">
              <Label htmlFor="tanggal">
                Tanggal <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                name="tanggal"
                placeholder="John Doe"
                defaultValue={formatCustomDate(formInitState.createdAt, "yyyy-MM-dd")}
                onChange={handleInputChange}
                required={true}
              />
              <span className="fieldset-label text-gray-800 dark:text-white/90">
                <div className="flex flex-col gap-3">
                  <ZodErrors
                    error={
                      formAddState?.zodErrors?.tanggal ||
                      formEditState?.zodErrors?.tanggal
                    }
                  />
                </div>
              </span>
            </fieldset>
            <fieldset className="fieldset w-full">
              <Label htmlFor="teknisi">
                Teknisi <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="teknisi"
                placeholder="John Doe"
                defaultValue={formInitState.teknisi}
                onChange={handleInputChange}
                required={true}
              />
              <span className="fieldset-label text-gray-800 dark:text-white/90">
                <div className="flex flex-col gap-3">
                  <ZodErrors
                    error={
                      formAddState?.zodErrors?.teknisi ||
                      formEditState?.zodErrors?.teknisi
                    }
                  />
                </div>
              </span>
            </fieldset>
            <fieldset className="fieldset w-full">
              <Label htmlFor="catatan">
                Catatan Perubahan <span className="text-red-500">*</span>
              </Label>
              <TextArea
                name="catatan"
                placeholder="Isi catatan perubahan disini..."
                value={formInitState.catatan}
                onChange={handleInputChange}
                required={true}
              />
              <span className="fieldset-label text-gray-800 dark:text-white/90">
                <div className="flex flex-col gap-3">
                  <ZodErrors
                    error={
                      formAddState?.zodErrors?.catatan ||
                      formEditState?.zodErrors?.catatan
                    }
                  />
                </div>
              </span>
            </fieldset>
          </div>
        </div>
        <div className="flex gap-2 justify-end mt-3">
          <button
            onClick={(event) => handleBackButton(event, false)}
            className="btn btn-outline btn-warning"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-success font-bold text-white"
          >
            {initChangenoteData ? "Save" : "Submit"}
          </button>
        </div>
      </form>
    </ComponentCard>
  );
}
