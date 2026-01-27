export type DailySensorData = {
  id: string;
  createdAt: string;
  ph: number;
  cod: number;
  tss: number;
  nh3n: number;
  debit: number;
  diff_debit: number;
};

export type MonthlySensorData = {
  createdAt: string;
  ph: number;
};

export type ChartSensorData = {
  maintenanceDate: string;
  beforeDate: string;
  afterDate: string;
  beforeMaintenance: DailySensorData[];
  afterMaintenance: DailySensorData[];
}
