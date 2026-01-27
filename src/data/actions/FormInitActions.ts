/* eslint-disable @typescript-eslint/no-explicit-any */
import { formCreateInitSchema } from "@/lib/zodDefinition";
import { adjusmentService } from "../service/index";
import { getAuthToken, getIdDevice } from "@/lib/sessions";

const parseNumberIfNumeric = (value: FormDataEntryValue | null) => {
  if (
    typeof value === "string" &&
    !isNaN(Number(value)) &&
    value.trim() !== ""
  ) {
    return Number(value); // Ubah ke number jika hanya angka
  }
  return value; // Jika ada huruf atau bukan angka, tetap string/null
};

export async function createInitAction(prevState: any, formData: FormData) {
  const validatedFields = formCreateInitSchema.safeParse({
    sensor_name: formData.get("sensor_name"),
    operation: formData.get("operation"),
    type: formData.get("type"),
    condition: formData.get("condition"),
    min: Number(formData.get("min")),
    max: Number(formData.get("max")),
    factor: Number(formData.get("factor")),
    offset: parseNumberIfNumeric(formData.get("offset")),
    new_value: parseNumberIfNumeric(formData.get("new_value")),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      apiErrors: null,
      message: "Missing Fields, Failed to add adjusment data",
    };
  }

  let requestBody;

  if (validatedFields.data.operation == "change") {
    requestBody = {
      type: validatedFields.data.type,
      condition: validatedFields.data.condition,
      sensor_name: validatedFields.data.sensor_name,
      operation: validatedFields.data.operation,
      new_value: validatedFields.data.new_value,
    };
  } else if (validatedFields.data.operation == "random") {
    requestBody = {
      type: validatedFields.data.type,
      condition: validatedFields.data.condition,
      sensor_name: validatedFields.data.sensor_name,
      operation: validatedFields.data.operation,
      min: validatedFields.data.min,
      max: validatedFields.data.max,
    };
  } else {
    requestBody = {
      type: validatedFields.data.type,
      condition: validatedFields.data.condition,
      sensor_name: validatedFields.data.sensor_name,
      operation: validatedFields.data.operation,
      factor: validatedFields.data.factor,
      offset: validatedFields.data.offset,
    };
  }

  const authToken = await getAuthToken();
  const idDevice = await getIdDevice();
  const responseData = await adjusmentService.addData(requestBody, authToken, idDevice);

  if (!responseData) {
    return {
      ...prevState,
      isLoading: false,
      apiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.status != 201) {
    return {
      ...prevState,
      isLoading: false,
      isError: true,
      apiErrors: {
        code: responseData.code,
        message: responseData.message,
      },
      zodErrors: null,
      message: "Failed to add adjusment data",
    };
  }

  return {
    isLoading: false,
    isSuccess: true,
    apiErrors: null,
    zodErrors: null,
    message: responseData.message,
  };
}

export async function editInitAction(prevState: any, formData: FormData) {
  const validatedFields = formCreateInitSchema.safeParse({
    sensor_name: formData.get("sensor_name"),
    operation: formData.get("operation"),
    type: formData.get("type"),
    condition: formData.get("condition"),
    min: Number(formData.get("min")),
    max: Number(formData.get("max")),
    factor: Number(formData.get("factor")),
    offset: parseNumberIfNumeric(formData.get("offset")),
    new_value: parseNumberIfNumeric(formData.get("new_value")),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      apiErrors: null,
      message: "Missing Fields, Failed to add adjusment data",
    };
  }

  const requestBody = {
    type: validatedFields.data.type,
    sensor_name: validatedFields.data.sensor_name,
    condition: validatedFields.data.condition,
    operation: validatedFields.data.operation,
    min: formData.get("min") ? validatedFields.data.min : null,
    max: formData.get("max") ? validatedFields.data.max : null,
    new_value: formData.get("new_value")
      ? validatedFields.data.new_value
      : null,
    factor: formData.get("factor") ? validatedFields.data.factor : null,
    offset: formData.get("offset") ? validatedFields.data.offset : null,
  };

  const editedId = formData.get("id")?.toString();
  const authToken = await getAuthToken();
  const responseData = await adjusmentService.editData(
    requestBody,
    editedId ? editedId : "",
    authToken
  );

  if (!responseData) {
    return {
      ...prevState,
      isLoading: false,
      apiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.status != 200) {
    return {
      ...prevState,
      isLoading: false,
      isError: true,
      apiErrors: {
        code: responseData.code,
        message: responseData.message,
      },
      zodErrors: null,
      message: "Failed to edit adjusment data",
    };
  }

  return {
    isLoading: false,
    isSuccess: true,
    apiErrors: null,
    zodErrors: null,
    message: responseData.message,
  };
}
