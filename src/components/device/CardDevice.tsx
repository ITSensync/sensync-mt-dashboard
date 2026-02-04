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
      className="group w-[10vw] h-[25vh] flex flex-col gap-1 items-center justify-center
        bg-white p-8 rounded-xl
        border border-transparent
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
        hover:ring-4 hover:ring-brand-500
        cursor-pointer"
    >
      <Image
        src={img}
        alt="Device Icon"
        width={50}
        height={25}
      />
      <div className="text-brand-950 text-xl text-bold text-center">{name}</div>
      <div className="text-brand-950">{id}</div>
    </div>
  );
}
