export type Summary = {
  laporanHarian: {
    total: number;
    update: string;
  };
  laporanBulanan: {
    total: number;
    update: string;
  };
  totalKonfigurasi: number;
  totalMaintenance: {
    total: number;
    last: string;
  };
};
