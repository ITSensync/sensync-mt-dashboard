/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";

export class DocumentService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  getLatestNumber = (authBody: any) => {
    return this.instance
      .get("/get/latest", {
        headers: authBody,
      })
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if (error.response) {
          const errorResponse = {
            status: error.response.data.status,
            message: error.response.data.message,
          };
          return errorResponse;
        } else {
          const errorResponse = {
            status: error.code,
            message: error.message,
            name: error.name,
          };
          return errorResponse;
        }
      });
  };
}
