import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CameraId, RollId } from "../types";

export interface ActiveState {
  cameraId: CameraId | null;
  rollId: RollId | null;
}

const initialState: ActiveState = {
  cameraId: null,
  rollId: null,
};

export const activeSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    setActiveCamera(state, { payload }: PayloadAction<CameraId | null>) {
      state.cameraId = payload;
    },
    setActiveRoll(state, { payload }: PayloadAction<RollId | null>) {
      state.rollId = payload;
    },
    setActiveState(state, { payload }: PayloadAction<ActiveState>) {
      state = payload;
    },
  },
});

export const { setActiveCamera, setActiveRoll, setActiveState } =
  activeSlice.actions;
export const activeReducer = activeSlice.reducer;
