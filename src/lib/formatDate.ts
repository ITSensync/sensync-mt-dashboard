import { format, toZonedTime } from "date-fns-tz";

export function formatCustomDate(dateStr: string, formatDate: string) {
  if (!dateStr) {
    return "-"
  }
  const date = new Date(dateStr);
  const utcDate = toZonedTime(date, "UTC"); // Tetap di UTC
  return format(utcDate, formatDate);
}
