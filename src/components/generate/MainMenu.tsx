import Link from "next/link";
import React from "react";

export default function MainMenu() {
  return (
    <div className="grid grid-cols-3 gap-6 p-4 rounded-2xl">
      <Link
        href={"/generate/preventif"}
        className="h-[35vh] border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] rounded-2xl flex flex-col text-center justify-center gap-4 transform 
    transition-all duration-300 hover:cursor-pointer hover:scale-105 hover:shadow-2xl"
      >
        <div className="flex justify-center tems-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-36 text-gray-800 dark:text-white/90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <p className="text-4xl font-bold text-brand-500">Preventif</p>
      </Link>
      <Link
        href={"/generate/korektif"}
        className="h-[35vh] border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] rounded-2xl flex flex-col text-center justify-center gap-4 transform 
    transition-all duration-300 hover:cursor-pointer hover:scale-105 hover:shadow-2xl"
      >
        <div className="flex justify-center tems-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-36 text-gray-800 dark:text-white/90"
          >
            <path
              fillRule="evenodd"
              d="M19 5.5a4.5 4.5 0 0 1-4.791 4.49c-.873-.055-1.808.128-2.368.8l-6.024 7.23a2.724 2.724 0 1 1-3.837-3.837L9.21 8.16c.672-.56.855-1.495.8-2.368a4.5 4.5 0 0 1 5.873-4.575c.324.105.39.51.15.752L13.34 4.66a.455.455 0 0 0-.11.494 3.01 3.01 0 0 0 1.617 1.617c.17.07.363.02.493-.111l2.692-2.692c.241-.241.647-.174.752.15.14.435.216.9.216 1.382ZM4 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-4xl font-bold text-brand-500">Korektif</p>
      </Link>
      <div
        className="h-[35vh] border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] rounded-2xl flex flex-col text-center justify-center gap-4 transform 
    transition-all duration-300 hover:cursor-pointer hover:scale-105 hover:shadow-2xl"
      >
        <div className="flex justify-center tems-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-36 text-gray-800 dark:text-white/90"
          >
            <path
              fillRule="evenodd"
              d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-4xl font-bold text-brand-500">-</p>
      </div>
    </div>
  );
}
