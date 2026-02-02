"use client";

import { FormProvider, useForm } from "react-hook-form";

export default function PreventifLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      nomor_ba: "11/BA/STI/I/2026",
      site: "",
      teknisi: "",
      pengawas_lapangan: "",
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
