/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";

export class DokumentasiService {
  protected readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 0,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  uploadDokumentasi = async (authToken: any, body: any) => {
    return this.instance
      .post("/dokumentasi", body, {
        headers: authToken,
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
