import { RootState } from "../root";

export const selectLoginLoading = (state: RootState): boolean =>
  state.auth.isLoading;
