import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Camera, CameraId, Roll } from "../types";

export interface CameraState {
  cameras: Camera[];
}

const initialState: CameraState = {
  cameras: [],
};

export const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    addCamera(
      state,
      { payload: { camera } }: PayloadAction<{ camera: Camera }>,
    ) {
      state.cameras.push(camera);
    },
    addRoll(
      state,
      {
        payload: { cameraId, roll },
      }: PayloadAction<{ cameraId: CameraId; roll: Roll }>,
    ) {
      const camera = state.cameras.find((camera) => camera.id === cameraId);
      camera?.rolls.push(roll);
    },
    setCameraState(state, { payload }: PayloadAction<CameraState>) {
      state = payload;
    },
  },
});

export const { addCamera, addRoll, setCameraState } = cameraSlice.actions;
export const cameraReducer = cameraSlice.reducer;
