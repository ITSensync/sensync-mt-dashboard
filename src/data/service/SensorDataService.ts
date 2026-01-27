/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";

export class SensorDataService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  getDetailSensor = (unixtime: number) => {
    return this.instance
      .get(`/${unixtime}`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if (error.response) {
          const errorResponse = {
            code: error.response.status,
            message: error.response.statusText,
          };
          return errorResponse;
        } else {
          const errorResponse = {
            code: error.code,
            message: error.message,
            name: error.name,
          };
          return errorResponse;
        }
      });
  };

  getDailySensor = (date: string, authToken: any) => {
    return this.instance
      .get(`/get/query?date=${date}`, {
        headers: authToken
      })
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if (error.response) {
          const errorResponse = {
            code: error.response.status,
            message: error.response.statusText,
          };
          return errorResponse;
        } else {
          const errorResponse = {
            code: error.code,
            message: error.message,
            name: error.name,
          };
          return errorResponse;
        }
      });
  };

  getMonthlySensor = (month: string, sensor_name: string, authToken: any) => {
    return this.instance
      .get(`/get/query?month=${month}&sensor=${sensor_name}`, {
        headers: authToken
      })
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if (error.response) {
          const errorResponse = {
            code: error.response.status,
            message: error.response.statusText,
          };
          return errorResponse;
        } else {
          const errorResponse = {
            code: error.code,
            message: error.message,
            name: error.name,
          };
          return errorResponse;
        }
      });
  };

  getChartData = (authToken: any) => {
    return this.instance
      .get(`/get/query?maintenance=true`, {
        headers: authToken
      })
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if (error.response) {
          const errorResponse = {
            code: error.response.status,
            message: error.response.statusText,
          };
          return errorResponse;
        } else {
          const errorResponse = {
            code: error.code,
            message: error.message,
            name: error.name,
          };
          return errorResponse;
        }
      });
  };
}
