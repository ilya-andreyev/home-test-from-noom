import { ILastNightSleep } from "../store/lastNightSleep/types";
import { axiosInstance } from "./axios";

class SleepService {
  private baseUrl = "/api";

  async getLastNightSleepData(lastNightDate: string): Promise<ILastNightSleep> {
    const response = await axiosInstance.get(`${this.baseUrl}/sleep-log`, {
      params: { date: lastNightDate }
    });

    return response.data;
  }
}

export const sleepService = new SleepService();
