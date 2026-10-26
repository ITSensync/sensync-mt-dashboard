/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Controller, useFormContext } from "react-hook-form";
import Image from "next/image";

interface Props {
  name: string;
}

export default function SignaturePad({ name }: Props) {
  const sigRef = useRef<SignatureCanvas>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { control, getValues } = useFormContext();

  const [saved, setSaved] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [width, setWidth] = useState(400);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          setUploadedImage("");
          setUploadError("");
          if (fileInputRef.current) fileInputRef.current.value = "";
          field.onChange("");
          setSaved(false);
        };

        const save = () => {
          if (uploadedImage) {
            field.onChange(uploadedImage);
            setSaved(true);
            return;
          }

          const dataUrl = sigRef.current?.toDataURL("image/png");
          if (dataUrl) {
            field.onChange(dataUrl);
            setSaved(true);
          }
        };

        const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0];
          if (!file) return;

          if (file.type !== "image/jpeg" && file.type !== "image/png") {
            setUploadError("Pilih file gambar JPG atau PNG.");
            event.target.value = "";
            return;
          }

          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result !== "string") {
              setUploadError("File tanda tangan tidak dapat dibaca.");
              return;
            }

            setUploadedImage(reader.result);
            setUploadError("");
            field.onChange(reader.result);
            setSaved(true);
          };
          reader.onerror = () => {
            setUploadError("File tanda tangan tidak dapat dibaca.");
          };
          reader.readAsDataURL(file);
        };

        return (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <div
                ref={wrapperRef}
                className="border rounded-lg bg-white/90 dark:bg-white w-full sm:w-2/3"
              >
                {uploadedImage ? (
                  <Image
                    width={100}
                    height={100}
                    src={uploadedImage}
                    alt="Tanda tangan yang diunggah"
                    className="block h-[300px] w-full object-contain"
                  />
                ) : (
                  <SignatureCanvas
                    ref={sigRef}
                    canvasProps={{
                      width,
                      height: 300,
                      className: "w-full",
                    }}
                  />
                )}
              </div>

              <div className="flex flex-col w-full sm:w-1/3 gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                  onChange={upload}
                  aria-label="Upload tanda tangan JPG atau PNG"
                  className="file-input file-input-bordered w-full"
                />

                <button
                  type="button"
                  className="btn btn-lg btn-error w-full font-bold text-white"
                  onClick={clear}
                >
                  Hapus
                </button>

                <button
                  type="button"
                  className="btn btn-lg btn-info w-full font-bold text-white"
                  onClick={save}
                >
                  Simpan
                </button>
              </div>
            </div>

            {uploadError && (
              <p role="alert" className="text-sm text-error">
                {uploadError}
              </p>
            )}

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
