import { isToday, isTomorrow, format } from "date-fns";

export const formatSlotDate = (date: Date) => {
  if (isToday(date)) {
    return "Today";
  } else if (isTomorrow(date)) {
    return "Tomorrow";
  } else {
    return format(date, "EEEE, MMM d");
  }
};

export const formatSlotTime = (date: Date) => {
  return format(date, "h:mm a");
};

/**
 * Formats a Date object to local ISO string format (YYYY-MM-DDThh:mm:ss)
 * without timezone conversion. Useful for APIs that expect local time.
 *
 * @param date - The Date object to format
 * @returns String in format YYYY-MM-DDThh:mm:ss (no Z suffix)
 *
 * @example
 * // If local time is 10:30 AM in GMT-3 (Argentina)
 * toLocalISOString(new Date())
 * // Returns: "2025-10-24T10:30:00" (not "2025-10-24T13:30:00Z")
 */
export const toLocalISOString = (date: Date): string => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
};
