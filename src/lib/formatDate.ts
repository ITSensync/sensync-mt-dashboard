import { format, formatInTimeZone, toZonedTime } from "date-fns-tz";

export function formatCustomDate(dateStr: string, formatDate: string) {
  if (!dateStr) {
    return "-"
  }
  const date = new Date(dateStr);
  const utcDate = toZonedTime(date, "UTC"); // Tetap di UTC
  return format(utcDate, formatDate);
}

export function formatCreatedAtWib(dateStr: string) {
  if (!dateStr) {
    return "-";
  }

  const normalizedDate = dateStr.includes("T")
    ? dateStr
    : dateStr.replace(" ", "T");
  const utcDate = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalizedDate)
    ? new Date(normalizedDate)
    : new Date(`${normalizedDate}Z`);

  if (Number.isNaN(utcDate.getTime())) {
    return "-";
  }

  return formatInTimeZone(utcDate, "Asia/Jakarta", "dd/MM/yyyy HH:mm");
}
