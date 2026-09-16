import { formLogSchema } from "@/lib/zodDefinition";
import { logService } from "../service";
import { getAuthToken, getIdDevice } from "@/lib/sessions";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function addLogAction(prevState: any, formData: FormData) {
  const validatedFields = formLogSchema.safeParse({
    teknisi: formData.get("teknisi"),
    tanggal: formData.get("tanggal"),
    keterangan: formData.get("keterangan"),
    opsi: formData.get("opsi"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      apiErrors: null,
      message: "Missing Fields, Failed to add report data",
    };
  }

  const requestBody = {
    id_device: await getIdDevice(),
    teknisi: validatedFields.data.teknisi,
    createdAt: validatedFields.data.tanggal,
    keterangan: validatedFields.data.keterangan,
    opsi: validatedFields.data.opsi,
  };

  const responseData = await logService.add(
    requestBody,
    await getAuthToken()
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
      message: "Failed to add log data",
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

export async function editLogAction(prevState: any, formData: FormData) {
  const validatedFields = formLogSchema.safeParse({
    teknisi: formData.get("teknisi"),
    tanggal: formData.get("tanggal"),
    keterangan: formData.get("keterangan"),
    opsi: formData.get("opsi"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      apiErrors: null,
      message: "Missing Fields, Failed to add report data",
    };
  }

  const requestBody = {
    id_device: await getIdDevice(),
    teknisi: validatedFields.data.teknisi,
    createdAt: validatedFields.data.tanggal,
    keterangan: validatedFields.data.keterangan,
    opsi: validatedFields.data.opsi,
  };

  const editedId = formData.get("id")?.toString();
  const responseData = await logService.edit(
    requestBody,
    editedId,
    await getAuthToken()
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