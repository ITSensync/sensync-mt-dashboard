/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import CardDevice from "./CardDevice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ADJUSMENT_ALLOWED_DEVICES } from "@/lib/allowedDevice";

const listSparing = [
  {
    id: "sparing01",
    site: "Gistex",
    img: "",
  },
  {
    id: "sparing02",
    site: "Indorama PWK",
    img: "",
  },
  {
    id: "sparing03",
    site: "PMT",
    img: "",
  },
  {
    id: "sparing04",
    site: "Innojaya PDL",
    img: "",
  },
  {
    id: "sparing05",
    site: "Besland",
    img: "",
  },
  {
    id: "sparing06",
    site: "Indotaisei",
    img: "",
  },
  {
    id: "sparing07",
    site: "Daliatex",
    img: "",
  },
  {
    id: "sparing08",
    site: "Papyrus",
    img: "",
  },
  {
    id: "sparing09",
    site: "BCP",
    img: "",
  },
  {
    id: "sparing10",
    site: "Pangjaya",
    img: "",
  },
  {
    id: "sparing11",
    site: "LPA",
    img: "",
  },
  {
    id: "sparing12",
    site: "Kertas PDL",
    img: "",
  },
  {
    id: "sparing13",
    site: "SSM",
    img: "",
  },
];

export default function ListCard() {
  const router = useRouter();

  const handleClickCard = (id: string) => {
    Cookies.set("id_device", id, {
      expires: 1 / 24,
      path: "/",
    });

    if (ADJUSMENT_ALLOWED_DEVICES.includes(id)) {
      router.push("/adjusment");
    } else {
      router.push("/changenote");
    }
  };

  return (
    <div className="grid grid-cols-5 items-center justify-center gap-15">
      {listSparing.map((sparing) => {
        return (
          <CardDevice
            key={sparing.id}
            id={sparing.id}
            name={sparing.site}
            onClick={handleClickCard}
          />
        );
      })}
    </div>
  );
}
