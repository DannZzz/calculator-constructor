import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import computeReducer from "../features/compute/computeSlice";

export const store = configureStore({
  reducer: {
    compute: computeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
