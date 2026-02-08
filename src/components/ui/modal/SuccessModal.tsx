import Link from "next/link";
import React from "react";

export default function SuccessModal({ message }: { message: string }) {
  return (
    <dialog id="success_modal" className={`modal modal-middle`}>
      <div className="modal-box w-fit flex flex-col items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-24 text-blue-600"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clipRule="evenodd"
          />
        </svg>
        <div className="text-center">
          <p className="font-semibold text-title-sm xl:text-title-md">
            {message}
          </p>
        </div>
        <div>
          <Link href={"/generate"} className="text-blue-600 underline">
            Back To Main Menu
          </Link>
          {/* <button
            type="button"
            className="btn btn-md btn-accent font-bold text-white"
          >
            Back To Main Menu
          </button> */}
        </div>
      </div>
    </dialog>
  );
}
