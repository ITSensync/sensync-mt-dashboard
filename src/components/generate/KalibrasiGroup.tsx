"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import SelectField from "../form/input/react-hook/SelectFieldHook";
import Input from "../form/input/react-hook/InputFieldHook";

const larutanPh = [
  { value: "aquadest", label: "Aquadest" },
  { value: "buffer4", label: "Buffer 4" },
  { value: "buffer7", label: "Buffer 7" },
  { value: "buffer10", label: "Buffer 10" },
];
const larutanCod = [
  { value: "aquadest", label: "Aquadest" },
  { value: "buffer25", label: "Buffer 25" },
  { value: "buffer50", label: "Buffer 50" },
  { value: "buffer75", label: "Buffer 75" },
  { value: "buffer100", label: "Buffer 100" },
];
const larutanTss = [
  { value: "aquadest", label: "Aquadest" },
  { value: "buffer30", label: "Buffer 30" },
];
const larutanNh3n = [
  { value: "aquadest", label: "Aquadest" },
  { value: "buffer1", label: "Buffer 1" },
  { value: "buffer2", label: "Buffer 2" },
  { value: "buffer3", label: "Buffer 3" },
];

export default function KalibrasiGroup({
  name,
  title,
}: {
  name: "cod" | "ph" | "tss" | "nh3n";
  title: string;
}) {
  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `kalibrasi.${name}`,
  });

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-700 dark:text-gray-400">
        {title}
      </h3>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-[1fr_120px_1fr_auto] gap-4"
        >
          {/* Larutan */}
          <SelectField
            {...register(`kalibrasi.${index}.larutan`)}
            className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
          >
            <option
              value=""
              className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
            >
              Pilih larutan
            </option>
            {name === "cod" &&
              larutanCod.map((larutan) => (
                <option
                  key={larutan.value}
                  value={larutan.value}
                  className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                >
                  {larutan.label}
                </option>
              ))}
            {name === "ph" &&
              larutanPh.map((larutan) => (
                <option
                  key={larutan.value}
                  value={larutan.value}
                  className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                >
                  {larutan.label}
                </option>
              ))}
            {name === "tss" &&
              larutanTss.map((larutan) => (
                <option
                  key={larutan.value}
                  value={larutan.value}
                  className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                >
                  {larutan.label}
                </option>
              ))}
            {name === "nh3n" &&
              larutanNh3n.map((larutan) => (
                <option
                  key={larutan.value}
                  value={larutan.value}
                  className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                >
                  {larutan.label}
                </option>
              ))}
          </SelectField>

          {/* Nilai */}
          <Input
            type="number"
            {...register(`kalibrasi.${name}.${index}.nilai`)}
            placeholder="Nilai"
          />

          {/* Keterangan */}
          <Input
            {...register(`kalibrasi.${name}.${index}.keterangan`)}
            placeholder="Keterangan"
          />

          {/* Remove */}
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}

      {/* Add button */}
      <button
        type="button"
        onClick={() => append({ larutan: "", nilai: "", keterangan: "" })}
        className="text-blue-500"
      >
        + tambah input
      </button>
    </div>
  );
}
