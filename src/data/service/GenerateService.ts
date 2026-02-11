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

  generateKorektif = async (
    authToken: any,
    body: any,
    newTab?: Window | null,
  ) => {
    try {
      const res = await this.instance.post("/korektif", body, {
        headers: authToken,
        // responseType: "blob",
      });

      return res.data;

      // buat temporary url dari response
      /* const fileUrl = this.instance.defaults.baseURL + "/korektif-preview-temp";

      // ATAU kalau endpoint GET tersedia, langsung:
      // newTab.location.href = `${baseURL}/korektif?id=123`

      if (newTab) {
        const blob = new Blob([res.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        // trick: pakai iframe supaya ada filename (workaround)
        newTab.location.href = url;
      }

      return { success: true }; */

      // const res = await this.instance.post("/korektif", body, {
      //   headers: authToken,
      //   responseType: "blob",
      // });

      // const disposition =
      //   res.headers["content-disposition"] ||
      //   res.headers["Content-Disposition"];

      // let filename = "ba_korektif.pdf";

      // if (disposition) {
      //   const match = disposition.match(
      //     /filename\*?=(?:UTF-8'')?["']?([^;"']+)/,
      //   );
      //   if (match) filename = decodeURIComponent(match[1]);
      // }

      // /* const blob = new Blob([res.data], { type: "application/pdf" });

      // const downloadUrl = window.URL.createObjectURL(blob);

      // // ⭐ OPEN NEW TAB
      // window.open(downloadUrl, "_blank");

      // setTimeout(() => window.URL.revokeObjectURL(downloadUrl), 10000); */

      // /* const a = document.createElement("a");

      // a.href = downloadUrl;
      // a.download = filename;

      // // buka tab baru (preview pdf)
      // window.open(downloadUrl, "_blank");
      // document.body.appendChild(a);
      // a.click();

      // a.remove();
      // window.URL.revokeObjectURL(downloadUrl); */

      // return { success: true, blob: res.data, filename };
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

  generatePreventif = async (
    authToken: any,
    body: any,
    newTab?: Window | null,
  ) => {
    try {
      const res = await this.instance.post("/preventif", body, {
        headers: authToken,
        // responseType: "blob",
      });

      return res.data;

      /* // buat temporary url dari response
      const fileUrl = this.instance.defaults.baseURL + "/preventif-preview-temp";

      // ATAU kalau endpoint GET tersedia, langsung:
      // newTab.location.href = `${baseURL}/korektif?id=123`

      if (newTab) {
        const blob = new Blob([res.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        // trick: pakai iframe supaya ada filename (workaround)
        newTab.location.href = url;
      }

      return { success: true, }; */

      // const res = await this.instance.post("/korektif", body, {
      //   headers: authToken,
      //   responseType: "blob",
      // });

      // const disposition =
      //   res.headers["content-disposition"] ||
      //   res.headers["Content-Disposition"];

      // let filename = "ba_korektif.pdf";

      // if (disposition) {
      //   const match = disposition.match(
      //     /filename\*?=(?:UTF-8'')?["']?([^;"']+)/,
      //   );
      //   if (match) filename = decodeURIComponent(match[1]);
      // }

      // /* const blob = new Blob([res.data], { type: "application/pdf" });

      // const downloadUrl = window.URL.createObjectURL(blob);

      // // ⭐ OPEN NEW TAB
      // window.open(downloadUrl, "_blank");

      // setTimeout(() => window.URL.revokeObjectURL(downloadUrl), 10000); */

      // /* const a = document.createElement("a");

      // a.href = downloadUrl;
      // a.download = filename;

      // // buka tab baru (preview pdf)
      // window.open(downloadUrl, "_blank");
      // document.body.appendChild(a);
      // a.click();

      // a.remove();
      // window.URL.revokeObjectURL(downloadUrl); */

      // return { success: true, blob: res.data, filename };
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

  generateKalibrasi = async (authToken: any, body: any) => {
    return this.instance
      .post("/kalibrasi", body, {
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

  generateBulanan = async (authToken: any, body: any) => {
    return this.instance
      .post("/bulanan", body, {
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
