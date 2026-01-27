import React from "react";

export default function ModalLoading({ isOpen }: { isOpen: boolean }) {
  return (
    <dialog
      id="loading_modal"
      className={`modal modal-middle ${isOpen ? "modal-open" : ""} dark:bg-gray-800 bg-white`}
    >
      <div className="modal-box w-fit dark:bg-gray-800 bg-white">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
      </div>
    </dialog>
  );
}
