"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function PreventifLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm({
    defaultValues: {}, // kosong dulu
  });

  const { watch, reset } = methods;

  // load saved data (CLIENT ONLY)
  useEffect(() => {
    const saved = sessionStorage.getItem("kalibrasi-form");
    if (saved) {
      reset(JSON.parse(saved));
    }
  }, [reset]);

  // auto save
  useEffect(() => {
    const sub = watch((value) => {
      sessionStorage.setItem("kalibrasi-form", JSON.stringify(value));
    });

    return () => sub.unsubscribe();
  }, [watch]);

  return <FormProvider {...methods}>{children}</FormProvider>;
}
