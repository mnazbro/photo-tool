import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  isDarkMode: boolean;
}

const initialState: AppState = {
  isDarkMode: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDarkMode(state, { payload }: PayloadAction<boolean>) {
      state.isDarkMode = payload;
    },
    setAppState(state, { payload }: PayloadAction<AppState>) {
      state = payload;
    },
  },
});

export const { setDarkMode, setAppState } = appSlice.actions;
export const appReducer = appSlice.reducer;
