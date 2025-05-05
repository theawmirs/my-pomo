import { create } from "zustand";

type StoreState = {
  isCountdownActive: boolean;
  setCountdownStatus: (status: boolean) => void;
};

export const useStore = create<StoreState>((set) => ({
  isCountdownActive: false,
  setCountdownStatus: (status: boolean) => set({ isCountdownActive: status }),
}));
