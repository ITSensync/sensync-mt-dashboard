/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  name: string;
}

export default function SignaturePad({ name }: Props) {
  const sigRef = useRef<SignatureCanvas>(null);
  const { control, getValues } = useFormContext();

  const [saved, setSaved] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => {
        // ⭐ AUTO RESTORE SAAT MOUNT
        useEffect(() => {
          const existing = getValues(name);

          if (existing && sigRef.current) {
            sigRef.current.fromDataURL(existing);
            setSaved(true);
          }
        }, []);

        const clear = () => {
          sigRef.current?.clear();
          field.onChange("");
          setSaved(false);
        };

        const save = () => {
          const dataUrl = sigRef.current?.toDataURL("image/png");

          if (dataUrl) {
            field.onChange(dataUrl);
            setSaved(true);
          }
        };

        return (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-3">
              <div className="border rounded-lg bg-white w-2/3">
                <SignatureCanvas
                  ref={sigRef}
                  canvasProps={{
                    width: 450,
                    height: 300,
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="btn btn-lg btn-error font-bold text-white"
                  onClick={clear}
                >
                  Hapus
                </button>

                <button
                  type="button"
                  className="btn btn-lg btn-info font-bold text-white"
                  onClick={save}
                >
                  Simpan
                </button>
              </div>
            </div>

            {saved && (
              <p className="text-sm font-medium">
                <span className="text-green-500">✓</span> Tanda tangan telah tersimpan
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
