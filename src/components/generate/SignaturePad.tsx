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
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { control, getValues } = useFormContext();

  const [saved, setSaved] = useState(false);
  const [width, setWidth] = useState(400);

  // ⭐ AUTO RESIZE mengikuti parent
  useEffect(() => {
    const resize = () => {
      if (wrapperRef.current) {
        setWidth(wrapperRef.current.clientWidth);
      }
    };

    resize(); // first render

    const observer = new ResizeObserver(resize);
    if (wrapperRef.current) observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => {
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
            <div className="flex flex-col sm:flex-row gap-3">
              {/* ⭐ wrapper responsive */}
              <div
                ref={wrapperRef}
                className="border rounded-lg bg-white/90 dark:bg-white w-full sm:w-2/3"
              >
                <SignatureCanvas
                  ref={sigRef}
                  canvasProps={{
                    width,
                    height: 300,
                    className: "w-full",
                  }}
                />
              </div>

              <div className="flex flex-row w-full sm:w-1/3 sm:flex-col gap-2">
                <button
                  type="button"
                  className="btn btn-lg btn-error w-1/2 sm:w-full font-bold text-white"
                  onClick={clear}
                >
                  Hapus
                </button>

                <button
                  type="button"
                  className="btn btn-lg btn-info w-1/2 sm:w-full font-bold text-white"
                  onClick={save}
                >
                  Simpan
                </button>
              </div>
            </div>

            {saved && (
              <p className="text-sm font-medium text-gray-400 dark:text-white/90">
                <span className="text-green-500">✓</span> Tanda tangan telah
                tersimpan
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
