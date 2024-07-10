import type { PreloadedState } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import lastNightSleepReducer from "./lastNightSleep/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  lastNightSleep: lastNightSleepReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        immutableCheck: true,
        actionCreatorCheck: true,
        serializableCheck: false
      })
  });
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
