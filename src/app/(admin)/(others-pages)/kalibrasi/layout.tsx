"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function PreventifLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm({
    defaultValues: JSON.parse(
      sessionStorage.getItem("kalibrasi-form") || "{}",
    ),
  });

  const { watch } = methods;

  // auto save
  useEffect(() => {
    const sub = watch((value) => {
      sessionStorage.setItem("kalibrasi-form", JSON.stringify(value));
    });

    return () => sub.unsubscribe();
  }, [watch]);

  return <FormProvider {...methods}>{children}</FormProvider>;
}
