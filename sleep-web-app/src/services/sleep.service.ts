import { format } from "date-fns";
import { ILastNightSleep } from "../store/lastNightSleep/types";
import { axiosInstance } from "./axios";

class SleepService {
  private baseUrl = "/api";

  async getLastNightSleepData(): Promise<ILastNightSleep | null> {
    const response = await axiosInstance.get(`${this.baseUrl}/sleep-log`, {
      params: { date: format(new Date(), "yyyy-MM-dd") }
    });

    return response.data;
  }
}

export const sleepService = new SleepService();
