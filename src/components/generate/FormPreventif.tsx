"use client";
import React from "react";
// import { Input } from "@mui/material";
import SectionDataPerangkat from "./SectionDataPerangkat";
import SectionChecklist from "./SectionChecklist";
import ComponentCard from "../common/ComponentCard";
import SectionKalibrasi from "./SectionKalibrasi";
import { useForm, FormProvider } from "react-hook-form";
import SectionTambahan from "./SectionTambahan";

export default function FormPreventif() {
  return (
    <form className="grid grid-cols-1 gap-4">
      <SectionDataPerangkat />
      <SectionChecklist />
      {/* KALIBRASI */}
      {/* <ComponentCard title="Kalibrasi">
        <SectionKalibrasi />
      </ComponentCard> */}
      {/* DOKUMENTASI */}
      <SectionTambahan />
    </form>
  );
}
