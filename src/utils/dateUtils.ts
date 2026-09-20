/**
 * Utility for formatting Vietnam real-time timestamps (Asia/Ho_Chi_Minh - UTC+7)
 */

/**
 * Returns formatted date-time string in Vietnam time zone (UTC+7)
 * Output format: "HH:mm DD/MM/YYYY" e.g., "15:08 20/09/2026"
 */
export function formatVietnamDateTime(dateInput?: Date | string | number): string {
  const d = dateInput ? new Date(dateInput) : new Date();
  if (isNaN(d.getTime())) {
    return new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  }

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat('vi-VN', options);
  const parts = formatter.formatToParts(d);
  const map: Record<string, string> = {};
  for (const p of parts) {
    map[p.type] = p.value;
  }

  return `${map.hour}:${map.minute} ${map.day}/${map.month}/${map.year}`;
}

/**
 * Returns ISO-like string normalized to Vietnam local time (UTC+7)
 */
export function getVietnamISOString(dateInput?: Date | string | number): string {
  return formatVietnamDateTime(dateInput);
}
