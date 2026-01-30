import { AdjusmentService } from "./AdjusmentService";
import { AdminService } from "./AdminService";
import { AuthService } from "./AuthService";
import { ChangenoteService } from "./ChangenoteService";
import { ReportService } from "./ReportService";
import { SensorDataService } from "./SensorDataService";

export const sensorDataService = new SensorDataService(`${process.env.API_URL}/water-quality`);
export const adjusmentService = new AdjusmentService(`${process.env.API_URL}/adjusment`);
export const authService = new AuthService(`${process.env.MT_API_URL}/auth`)
export const reportService = new ReportService(`${process.env.API_URL}/report`)
export const adminService = new AdminService(`${process.env.API_URL}/admin`)
export const changenoteService = new ChangenoteService(`${process.env.MT_API_URL}/changenote`)
