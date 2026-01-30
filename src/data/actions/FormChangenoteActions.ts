import { formChangenoteSchema } from "@/lib/zodDefinition";
import { changenoteService } from "../service";
import { getAuthToken, getIdDevice } from "@/lib/sessions";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function addChangenoteAction(prevState: any, formData: FormData) {
  const validatedFields = formChangenoteSchema.safeParse({
    teknisi: formData.get("teknisi"),
    tanggal: formData.get("tanggal"),
    catatan: formData.get("catatan"),
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
    catatan: validatedFields.data.catatan,
  };

  const responseData = await changenoteService.add(
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

export async function editChangenoteAction(prevState: any, formData: FormData) {
  const validatedFields = formChangenoteSchema.safeParse({
    teknisi: formData.get("teknisi"),
    tanggal: formData.get("tanggal"),
    catatan: formData.get("catatan"),
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
    catatan: validatedFields.data.catatan,
  };

  const editedId = formData.get("id")?.toString();
  const responseData = await changenoteService.edit(
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