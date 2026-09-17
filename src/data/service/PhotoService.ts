/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";

export class PhotoService {
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

  getDokumentasi = async (authToken: any, body: any) => {
    return this.instance
      .post("/", body, {
        headers: authToken,
      })
      .then((res) => res.data)
      .catch(function (error) {
        if (error.response) {
          return {
            status: error.response.data.status || error.response.status,
            message: error.response.data.message,
          };
        }

        return {
          status: error.code,
          message: error.message,
        };
      });
  };
}
