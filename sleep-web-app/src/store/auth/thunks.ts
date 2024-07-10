import { createAsyncThunk } from "@reduxjs/toolkit";
import { authActions } from "./slice";
import { authService } from "../../services/auth.service";
import { ILoginFormFields } from "../../pages/type";
import { RootState } from "../root";

export const login = createAsyncThunk<
  void,
  ILoginFormFields,
  { state: RootState }
>("auth/login", async (loginData, { dispatch }) => {
  dispatch(authActions.setIsLoading(true));

  try {
    const token = await authService.login(loginData);

    dispatch(authActions.setToken(token));
  } catch (error: any) {
    console.log(error);
  } finally {
    dispatch(authActions.setIsLoading(false));
  }
});
