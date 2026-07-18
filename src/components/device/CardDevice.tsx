import Image from "next/image";
import React from "react";

export default function CardDevice({
  id,
  name,
  img = "/images/sensync/sensync-logo.png",
  onClick,
}: {
  id: string;
  name: string;
  img?: string;
  onClick: (id: string) => void;
}) {
  return (
    <div
      onClick={() => onClick(id)}
      className="group w-full xl:w-[10vw] h-full 2xl:h-[25vh] flex md:flex-col gap-4 md:gap-1 items-center md:justify-center
        bg-white p-4 md:p-8 rounded-xl
        border border-transparent
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
        hover:ring-4 hover:ring-brand-500
        cursor-pointer"
    >
      <Image src={img} alt="Device Icon" width={50} height={25} className="w-7 md:w-14"/>
      <div className="flex flex-col">
        <div className="text-brand-950 text-xl md:text-lg lg:text-2xl xl:text-xl text-bold md:text-center">
          {name}
        </div>
        <div className="text-brand-950 text-sm lg:text-lg md:text-center">{id}</div>
      </div>
    </div>
  );
}
