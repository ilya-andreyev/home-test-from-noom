import { ILoginFormFields } from "../pages/type";
import { axiosInstance } from "./axios";

class AuthService {
  private baseUrl = "/api";

  async login(loginData: ILoginFormFields): Promise<string> {
    const response = await axiosInstance.post(
      `${this.baseUrl}/login`,
      loginData
    );

    return response.data.token;
  }
}

export const authService = new AuthService();
