import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";

import { ThemeProvider } from "@/context/ThemeContext";
// import Image from "next/image";
// import Link from "next/link";
import React from "react";

export default function DeviceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="flex flex-row w-full justify-center  dark:bg-gray-900 sm:p-0">
          <div className="w-full h-fit bg-brand-950 dark:bg-white/5 grid items-center">
            <div className="items-center justify-center  flex z-1 p-25">
              {/* <!-- ===== Common Grid Shape Start ===== --> */}
              {/* <GridShape /> */}
              {children}
            </div>
          </div>
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
