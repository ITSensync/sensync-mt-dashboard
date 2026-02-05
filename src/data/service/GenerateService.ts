/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";

export class Generatervice {
  protected readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  generateKorektif = async (authToken: any, body: any) => {
    try {
      const res = await this.instance.post("/korektif", body, {
        headers: authToken,
        responseType: "blob",
      });

      const disposition =
        res.headers["content-disposition"] ||
        res.headers["Content-Disposition"];

      let filename = "ba_korektif.pdf";

      if (disposition) {
        const match = disposition.match(
          /filename\*?=(?:UTF-8'')?["']?([^;"']+)/,
        );
        if (match) filename = decodeURIComponent(match[1]);
      }

      const blob = new Blob([res.data], { type: "application/pdf" });

      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      return { success: true, filename };
    } catch (error: any) {
      if (error.response) {
        return {
          status: error.response.status,
          message: error.response.data,
        };
      }

      return {
        status: error.code,
        message: error.message,
      };
    }
  };
}
