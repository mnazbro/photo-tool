import { configureStore, createSelector } from "@reduxjs/toolkit";
import { ActiveState, activeReducer } from "./activeSlice";
import { AppState, appReducer } from "./appSlice";
import { CameraState, cameraReducer } from "./cameraSlice";
import { Preferences } from "@capacitor/preferences";

export type StateV1 = { version: 1; state: RootState };

export type VersionedState = StateV1;

export type RootState = {
  app: AppState;
  active: ActiveState;
  camera: CameraState;
};

const getInitialState = async (): Promise<RootState | undefined> => {
  const { value } = await Preferences.get({
    key: "appState",
  });
  console.log("Loaded", value);
  if (value == null) {
    return;
  }
  const versionedState = JSON.parse(value);
  if (!isVersionedState(versionedState)) {
    return;
  }
  if (versionedState.version === 1) {
    return versionedState.state;
  }
};

function isVersionedState(input: any): input is VersionedState {
  return (
    "version" in input &&
    typeof input.version === "number" &&
    "state" in input &&
    typeof input.state === "object"
  );
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    active: activeReducer,
    camera: cameraReducer,
  },
  preloadedState: await getInitialState(),
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

export const createAppSelector = createSelector.withTypes<RootState>();
