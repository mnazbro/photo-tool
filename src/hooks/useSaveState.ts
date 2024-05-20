import { Preferences } from "@capacitor/preferences";
import { useAppStore } from "./useAppStore";
import { useCallback } from "react";
import { VersionedState } from "../store/store";

export function useSaveState() {
  const store = useAppStore();
  const saveState = useCallback(async () => {
    const state = store.getState();
    await Preferences.set({
      key: "appState",
      value: JSON.stringify({
        version: 1,
        state,
      } satisfies VersionedState),
    });
  }, [store]);
  return saveState;
}
