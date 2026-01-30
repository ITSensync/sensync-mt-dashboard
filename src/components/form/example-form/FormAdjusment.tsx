"use client";
import React, { useActionState, useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Input from "../input/InputField";
import Alert from "@/components/ui/alert/Alert";
import {
  createInitAction,
  editInitAction,
} from "@/data/actions/FormInitActions";
import { ApiError } from "@/components/types/ApiError";
import ZodErrors from "@/components/ui/alert/ZodErrors";
import Label from "../Label";
import ModalLoading from "@/components/ui/modal/ModalLoading";
import SuccessModal from "@/components/ui/modal/SuccessModal";
import { Adjustment } from "@/components/types/Adjustment";

const INITIAL_STATE = {
  data: null,
}; // <---  add this

export default function FormAdjusment({
  initialSensorName,
  initAdjusmentData,
  getIsFormInitShowingState,
  onClose,
}: {
  initialSensorName: string;
  initAdjusmentData?: Adjustment;
  getIsFormInitShowingState: (state: boolean) => void;
  onClose?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formAddState, formAddAction] = useActionState(
    createInitAction,
    INITIAL_STATE
  );
  const [formEditState, formEditAction] = useActionState(
    editInitAction,
    INITIAL_STATE
  );
  const [apiErrorData, setApiErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });
  const [formInitState, setFormInitState] = useState<Adjustment>({
    id: initAdjusmentData?.id || "",
    type: initAdjusmentData?.type || "",
    condition: initAdjusmentData?.condition || "",
    operation: initAdjusmentData?.operation || "",
    sensor_name: initAdjusmentData?.sensor_name || "",
    min: initAdjusmentData?.min || -999,
    max: initAdjusmentData?.max || -999,
    factor: initAdjusmentData?.factor || -999,
    offset: initAdjusmentData?.offset || "",
    new_value: initAdjusmentData?.new_value || "",
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

    if (initAdjusmentData) {
      setFormInitState({
        id: initAdjusmentData.id,
        condition: initAdjusmentData.condition || "",
        type: initAdjusmentData.type,
        sensor_name: initAdjusmentData.sensor_name,
        operation: initAdjusmentData.operation,
        min: initAdjusmentData.min || -999,
        max: initAdjusmentData.max || -999,
        factor: initAdjusmentData.factor || -999,
        offset: initAdjusmentData.offset || "",
        new_value: initAdjusmentData.new_value || "",
      });
    }
  }, [initAdjusmentData, initialSensorName]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormInitState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBackButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    isShow: boolean
  ) => {
    event.preventDefault();
    const confirmBack = confirm(
      "Apakah Anda yakin ingin kembali? Perubahan data tidak akan tersimpan."
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
    <ComponentCard
      title={`${initAdjusmentData ? "Edit" : "Add"} Configuration`}
    >
      <ModalLoading isOpen={isLoading} />
      <SuccessModal message={formAddState?.message || formEditState?.message} />
      <form
        action={initAdjusmentData ? formEditAction : formAddAction}
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
            {initAdjusmentData && (
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
              <Label htmlFor="sensor_name">Sensor Name</Label>
              <select
                className={`h-11 w-full appearance-none rounded-lg border border-gray-300  px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
                  formInitState.sensor_name
                    ? "text-gray-800 dark:text-white/90"
                    : "text-gray-400 dark:text-gray-400"
                }`}
                name="sensor_name"
                value={formInitState.sensor_name}
                onChange={handleInputChange}
              >
                <option disabled value={""}>
                  Pick Sensor Name
                </option>
                <option value={"ph"}>PH</option>
                <option value={"cod"}>COD</option>
                <option value={"tss"}>TSS</option>
                <option value={"nh3n"}>NH3N</option>
                <option value={"debit"}>Debit</option>
              </select>
              <span className="fieldset-label">
                <ZodErrors
                  error={
                    formAddState?.zodErrors?.sensor_name ||
                    formEditState?.zodErrors?.sensor_name
                  }
                />
              </span>
            </fieldset>
            <fieldset className="fieldset w-full">
              <Label htmlFor="type">Type</Label>
              <select
                className={`h-11 w-full appearance-none rounded-lg border border-gray-300  px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
                  formInitState.type
                    ? "text-gray-800 dark:text-white/90"
                    : "text-gray-400 dark:text-gray-400"
                }`}
                name="type"
                value={formInitState.type}
                onChange={handleInputChange}
              >
                <option disabled value={""}>
                  Pick Adjustment Type
                </option>
                <option value={"init"}>Initialization</option>
                <option value={"condition"}>Conditional</option>
              </select>
              <span className="fieldset-label">
                <div className="flex flex-col gap-3">
                  <div>
                    <span className="text-red-500">*</span>Initialization:
                    digunakan untuk melakukan penyesuaian nilai tidak bergantung
                    pada kondisi apapun
                    <br />
                    <span className="text-red-500">*</span>Conditional:
                    digunakan jika nilai ingin di sesuaikan ketika mencapai
                    kondisi tertentu
                  </div>
                  <ZodErrors
                    error={
                      formAddState?.zodErrors?.type ||
                      formEditState?.zodErrors?.type
                    }
                  />
                </div>
              </span>
            </fieldset>
            {/* CONDITIONAL BASE ON TYPE */}
            {formInitState.type === "condition" && (
              <fieldset className="fieldset w-full">
                <Label htmlFor="condition">Conditional Value</Label>
                <Input
                  type="text"
                  name="condition"
                  placeholder="<=100"
                  defaultValue={formInitState.condition}
                  onChange={handleInputChange}
                  required={true}
                />
                <span className="fieldset-label text-gray-800 dark:text-white/90">
                  <div className="flex flex-col gap-3">
                    <div>
                      <span className="text-red-500">*</span>Daftar operator
                      yang dapat digunakan: <b> &lt; (lebih kecil)</b>,{" "}
                      <b>&gt; (lebih besar)</b>,{" "}
                      <b>&lt;= (lebih kecil sama dengan)</b>,{" "}
                      <b>&gt;= (lebih besar sama dengan)</b>,{" "}
                      <b>!=(tidak sama dengan)</b>, <b>== (sama dengan)</b>
                    </div>
                    <ZodErrors
                      error={
                        formAddState?.zodErrors?.condition ||
                        formEditState?.zodErrors?.condition
                      }
                    />
                  </div>
                </span>
              </fieldset>
            )}
            <fieldset className="fieldset w-full">
              <Label htmlFor="operation">Operation</Label>
              <select
                className={`h-11 w-full appearance-none rounded-lg border border-gray-300  px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
                  formInitState.operation
                    ? "text-gray-800 dark:text-white/90"
                    : "text-gray-400 dark:text-gray-400"
                }`}
                name="operation"
                value={formInitState.operation}
                onChange={handleInputChange}
              >
                <option disabled value={""}>
                  Pick Adjustment Operation
                </option>
                <option value={"round"}>Linear Reg.</option>
                <option value={"random"}>Random</option>
                <option value={"change"}>Change</option>
              </select>
              <span className="fieldset-label">
                <ZodErrors
                  error={
                    formAddState?.zodErrors?.operation ||
                    formEditState?.zodErrors?.operation
                  }
                />
              </span>
            </fieldset>
            <div className="grid grid-cols-2 gap-6">
              {/* Conditional Rendering Based on Operation */}
              {formInitState.operation === "random" && (
                <>
                  <fieldset className="fieldset w-full">
                    <Label htmlFor="min">Min</Label>
                    <Input
                      type="number"
                      name="min"
                      placeholder="0"
                      defaultValue={
                        formInitState.min < 0 ? "" : formInitState.min
                      }
                      onChange={handleInputChange}
                      step={0.01}
                      required={true}
                    />
                    <span className="fieldset-label">
                      <ZodErrors
                        error={
                          formAddState?.zodErrors?.min ||
                          formEditState?.zodErrors?.min
                        }
                      />
                    </span>
                  </fieldset>
                  <fieldset className="fieldset w-full">
                    <Label htmlFor="max">Max</Label>
                    <Input
                      type="number"
                      name="max"
                      placeholder="0.1"
                      defaultValue={
                        formInitState.max < 0 ? "" : formInitState.max
                      }
                      onChange={handleInputChange}
                      step={0.01}
                      required={true}
                    />
                    <span className="fieldset-label">
                      <ZodErrors
                        error={
                          formAddState?.zodErrors?.max ||
                          formEditState?.zodErrors?.max
                        }
                      />
                    </span>
                  </fieldset>
                </>
              )}
              {formInitState.operation === "round" && (
                <>
                  <fieldset className="fieldset w-full">
                    <Label htmlFor="factor">Factor</Label>
                    <Input
                      type="number"
                      name="factor"
                      placeholder="12.2"
                      defaultValue={
                        formInitState.factor < 0 ? "" : formInitState.factor
                      }
                      onChange={handleInputChange}
                      step={0.01}
                      min="0"
                      required={true}
                    />
                    <span className="fieldset-label text-gray-800 dark:text-white/90">
                      <div className="flex flex-col gap-3">
                        <div>
                          <span className="text-red-500">*</span>Minimum nilai:{" "}
                          <b>0.01</b>
                        </div>
                        <ZodErrors
                          error={
                            formAddState?.zodErrors?.factor ||
                            formEditState?.zodErrors?.factor
                          }
                        />
                      </div>
                    </span>
                  </fieldset>
                  <fieldset className="fieldset w-full">
                    <Label htmlFor="offset">Offset</Label>
                    <Input
                      type="text"
                      name="offset"
                      placeholder="11.2"
                      defaultValue={formInitState.offset || ""}
                      onChange={handleInputChange}
                      required={true}
                    />
                    <span className="fieldset-label text-gray-800 dark:text-white/90">
                      <div className="flex flex-col gap-3">
                        <div>
                          <span className="text-red-500">*</span>Minimum nilai:{" "}
                          <b>0</b>
                          <br></br>
                          <span className="text-red-500">*</span>Dapat memasukan
                          nilai custom dari parameter sensor lain, ex:{" "}
                          <i>
                            <b>debit/cod/tss/nh3n/ph - 0,234</b>
                          </i>{" "}
                          (parameter harus ditulis dalam huruf kecil)
                        </div>
                        <ZodErrors
                          error={
                            formAddState?.zodErrors?.factor ||
                            formEditState?.zodErrors?.factor
                          }
                        />
                      </div>
                    </span>
                  </fieldset>
                </>
              )}
            </div>
            {formInitState.operation === "change" && (
              <fieldset className="fieldset w-full">
                <Label htmlFor="new_value">New Value</Label>
                <Input
                  type="text"
                  name="new_value"
                  placeholder="15 / debit * 4"
                  defaultValue={formInitState.new_value}
                  onChange={handleInputChange}
                  required={true}
                />
                <span className="fieldset-label text-gray-800 dark:text-white/90">
                  <div className="flex flex-col gap-3">
                    <div>
                      <span className="text-red-500">*</span>Dapat memasukan
                      nilai custom dari parameter sensor lain, ex:{" "}
                      <i>
                        <b>debit/cod/tss/nh3n/ph * 3</b>
                      </i>{" "}
                      (parameter harus ditulis dalam huruf kecil)
                    </div>
                    <ZodErrors
                      error={
                        formAddState?.zodErrors?.new_value ||
                        formEditState?.zodErrors?.new_value
                      }
                    />
                  </div>
                </span>
              </fieldset>
            )}
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
            {initAdjusmentData ? "Save" : "Submit"}
          </button>
        </div>
      </form>
    </ComponentCard>
  );
}
