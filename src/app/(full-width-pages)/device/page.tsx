import { Metadata } from "next";
import "swiper/css";
import "swiper/css/navigation";

// import "./styles.css";
import ListCard from "@/components/device/ListCard";

export const metadata: Metadata = {
  title: "Sensync Maintenance Dashboard | Choose Device",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

const listSparing = [
  {
    id: "sparing01",
    site: "Gistex",
    img: "",
  },
  {
    id: "sparing02",
    site: "Indorama",
    img: "",
  },
  {
    id: "sparing03",
    site: "PMT",
    img: "",
  },
  {
    id: "sparing04",
    site: "Innojaya",
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
  {
    id: "spinning",
    site: "Spinning",
    img: "",
  },
];

const listBase = [
  {
    id: "basebdg",
    site: "DLH Kota Bandung",
    img: "",
  },
  {
    id: "basekrwg",
    site: "DLH Kab. Karawang",
    img: "",
  },
]

export default function ChooseDevice() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-3xl font-bold mb-8 text-center">Pilih Site / Alat</p>
      <p className="text-2xl font-semibold mb-6">QUA</p>
      <ListCard list={listSparing} />
      <div className="divider"></div>
      <p className="text-2xl font-semibold mb-6">BASE</p>
      <ListCard list={listBase} />
    </div>
  );
}
