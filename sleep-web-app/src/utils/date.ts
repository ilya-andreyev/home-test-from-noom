import { format } from "date-fns";

export const formatDate = (date: Date, dateFormat: string) =>
  format(date, dateFormat);
