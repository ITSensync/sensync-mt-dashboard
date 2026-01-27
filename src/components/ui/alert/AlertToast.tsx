import { ApiError } from "@/components/types/ApiError";
import React, { useEffect } from "react";

export default function AlertToast({
  content,
  isOpen,
  classname,
  onClose,
}: {
  content: ApiError;
  isOpen: boolean;
  classname?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (isOpen) {
      timeoutId = setTimeout(() => {
        onClose();
      }, 10000); // 10 detik
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId); // Membersihkan timeout jika komponen di-unmount sebelum timeout tercapai
      }
    };
  }, [isOpen, onClose]);

  if (!content.message) return null;
  return (
    <>
      {isOpen && (
        <div className="toast mt-10">
          <div className={`alert ${classname ? classname : "alert-error"}`}>
            {content.code == 200 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
            )}
            <span className="text-white font-lexend_deca font-bold">{`${content.message}`}</span>
          </div>
        </div>
      )}
    </>
  );
}
