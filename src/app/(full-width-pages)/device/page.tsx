import { Metadata } from "next";
import "swiper/css";
import "swiper/css/navigation";

// import "./styles.css";
import ListCard from "@/components/device/ListCard";

export const metadata: Metadata = {
  title: "Sensync Maintenance Dashboard | Choose Device",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

export default function ChooseDevice() {
  return (
    <div className="flex flex-col gap-15 items-center justify-center">
      <p className="text-3xl font-bold">Pilih Site / Alat</p>
      <ListCard />
    </div>
  );
}
