"use client";

import React, { useEffect, useRef } from "react";

export default function GenerateLoadingModal({
  open,
  message = "Generating file, please wait...",
}: {
  open: boolean;
  message?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;

    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  return (
    <dialog ref={dialogRef} className="modal modal-middle">
      <div className="modal-box w-fit flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg"></span>

        <p className="font-semibold text-title-sm xl:text-title-md text-center">
          {message}
        </p>
      </div>
    </dialog>
  );
}
