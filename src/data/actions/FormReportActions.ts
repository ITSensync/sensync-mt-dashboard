import { formReportSchema } from "@/lib/zodDefinition";
import { reportService } from "../service";
import { getAuthToken } from "@/lib/sessions";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function addReportAction(prevState: any, formData: FormData) {
  const validatedFields = formReportSchema.safeParse({
    operator_name: formData.get("operator_name"),
    detail: formData.get("detail"),
    next_step: formData.get("next_step"),
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
    operator_name: validatedFields.data.operator_name,
    detail: validatedFields.data.detail,
    next_step: validatedFields.data.next_step,
  };

  const responseData = await reportService.addReport(
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

export async function editReportAction(prevState: any, formData: FormData) {
  const validatedFields = formReportSchema.safeParse({
    operator_name: formData.get("operator_name"),
    detail: formData.get("detail"),
    next_step: formData.get("next_step"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      apiErrors: null,
      message: "Missing Fields, Failed to edit report data",
    };
  }

  const requestBody = {
    operator_name: validatedFields.data.operator_name,
    detail: validatedFields.data.detail,
    next_step: validatedFields.data.next_step,
  };

  const id = formData.get("id")?.toString();
  const responseData = await reportService.editReport(
    id ? id : "",
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
    message: "UPDATE REPORT DATA SUCCESSFULL!",
  };
}
