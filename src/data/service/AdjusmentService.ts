/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";

export class AdjusmentService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  addData = (newAdjusmentData: any, authToken: any, id_device: any) => {
    return this.instance
      .post(`/?id_device=${id_device}`, newAdjusmentData, {
        headers: authToken,
      })
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if (error.response) {
          const errorResponse = {
            status: error.response.status,
            message: error.response.statusText,
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

  editData = (editedAdjusmentData: any, id: string, authToken: any) => {
    return this.instance
      .patch(`/${id}`, editedAdjusmentData, {
        headers: authToken,
      })
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if (error.response) {
          const errorResponse = {
            status: error.response.status,
            message: error.response.statusText,
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

  deleteData = (id: string, authToken: any) => {
    return this.instance
      .delete(`/${id}`, {
        headers: authToken,
      })
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if (error.response) {
          const errorResponse = {
            status: error.response.status,
            message: error.response.statusText,
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

  getAllData = (authToken: any, id_device: any) => {
    return this.instance
      .get(`/?id_device=${id_device}`, {
        headers: authToken,
      })
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if (error.response) {
          const errorResponse = {
            status: error.response.status,
            message: error.response.statusText,
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
