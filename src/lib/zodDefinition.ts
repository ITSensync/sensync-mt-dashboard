import { z } from "zod";

export const formCreateInitSchema = z.object({
  sensor_name: z.string().trim(),
  type: z.enum(["init", "condition"], {
    message: "Field cannot be empty",
  }),
  operation: z.enum(["random", "round", "change"], {
    message: "Field cannot be empty",
  }),
  condition: z.union([
    z.string(),
    z.literal(null),
    z.literal(NaN),
    z.undefined(),
  ]),
  min: z.union([
    z
      .number()
      .refine((val) => !Number.isNaN(val), { message: "NaN is not allowed" }),
    z.literal(null),
    z.literal(NaN),
    z.undefined(),
  ]),
  max: z.union([
    z
      .number()
      .refine((val) => !Number.isNaN(val), { message: "NaN is not allowed" }),
    z.literal(null),
    z.literal(NaN),
    z.undefined(),
  ]),
  offset: z.union([
    z.string(),
    z
      .number()
      .min(0, { message: "Value cannot be less than 0" })
      .refine((val) => !Number.isNaN(val), { message: "NaN is not allowed" }),
    z.literal(null),
    z.literal(NaN),
    z.undefined(),
  ]),
  factor: z.union([
    z
      .number()
      .refine((val) => !Number.isNaN(val), { message: "NaN is not allowed" }),
    z.literal(null),
    z.literal(NaN),
    z.undefined(),
  ]),
  new_value: z.union([
    z.string(), // Jika string, lolos validasi
    z.number().min(0, { message: "Value cannot be less than 0" }), // Jika number, minimal 0
    z.null(),
    z.undefined(),
  ]),
});

export const formChangenoteSchema = z.object({
  tanggal: z.string().min(1).trim(),
  teknisi: z.string().min(1).trim(),
  catatan: z.string().min(1).trim(),
});

export const formReportSchema = z.object({
  operator_name: z.string().trim(),
  detail: z.string().min(1).trim(),
  next_step: z.string().min(1).trim(),
});

const kalibrasiItem = z.object({
  larutan: z.string().min(1),
  nilai: z.coerce.number(),
  keterangan: z.string().optional(),
});

export const preventifKalibrasiSchema = z.object({
  kalibrasi: z.object({
    cod: z.array(kalibrasiItem),
    ph: z.array(kalibrasiItem),
    tss: z.array(kalibrasiItem),
    nh3n: z.array(kalibrasiItem),
  }),
});
