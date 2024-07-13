import { format } from "date-fns";
import { ISleepData } from "../store/sleep/types";
import { axiosInstance } from "./axios";

class SleepService {
  private baseUrl = "/api";

  async getLastNightSleepData(): Promise<ISleepData | null> {
    const response = await axiosInstance.get(`${this.baseUrl}/sleep-log`, {
      params: { date: format(new Date(), "yyyy-MM-dd") }
    });

    return response.data;
  }

  async saveSleepData({
    bedTimeStart,
    bedTimeEnd,
    feeling
  }: ISleepData): Promise<void> {
    await axiosInstance.post(`${this.baseUrl}/sleep-log`, {
      bedTimeStart,
      bedTimeEnd,
      feeling
    });
  }
}

export const sleepService = new SleepService();
