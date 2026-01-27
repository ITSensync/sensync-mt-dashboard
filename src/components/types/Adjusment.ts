export type Adjusment = {
  id: string;
  type: string;
  condition: string;
  operation: string;
  sensor_name: string;
  min: number;
  max: number;
  offset: string;
  factor: number;
  new_value: string;
  status?: string;
  position?: number;
}