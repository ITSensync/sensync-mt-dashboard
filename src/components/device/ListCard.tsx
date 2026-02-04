/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import CardDevice from "./CardDevice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ADJUSMENT_ALLOWED_DEVICES } from "@/lib/allowedDevice";

export default function ListCard({ list} : {list: any[]}) {
  const router = useRouter();

  const handleClickCard = (id: string) => {
    Cookies.set("id_device", id, {
      expires: 12 / 24,
      path: "/",
    });

    if (ADJUSMENT_ALLOWED_DEVICES.includes(id)) {
      router.push("/adjustment");
    } else {
      router.push("/changenote");
    }
  };

  return (
    <div className="grid grid-cols-5 items-center justify-center gap-15">
      {list.map((item) => {
        return (
          <CardDevice
            key={item.id}
            id={item.id}
            name={item.site}
            onClick={handleClickCard}
          />
        );
      })}
    </div>
  );
}
