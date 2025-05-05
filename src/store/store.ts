import { create } from "zustand";

type StoreState = {
  isCountdownActive: boolean;
  activeTab: "focus" | "shortBreak" | "longBreak";
  timer: number;
  activeMode: "pomodoro" | "clock";
  setCountdownStatus: (status: boolean) => void;
  setActiveTab: (tab: "focus" | "shortBreak" | "longBreak") => void;
  setActiveMode: (mode: "pomodoro" | "clock") => void;
};

export const useStore = create<StoreState>((set) => ({
  isCountdownActive: false,
  activeTab: "focus",
  timer: 25 * 60,
  activeMode: "pomodoro",
  setCountdownStatus: (status: boolean) => set({ isCountdownActive: status }),
  setActiveTab: (tab: "focus" | "shortBreak" | "longBreak") =>
    set({
      activeTab: tab,
      timer:
        tab === "focus" ? 25 * 60 : tab === "shortBreak" ? 5 * 60 : 10 * 60,
    }),
  setActiveMode: (mode: "pomodoro" | "clock") => set({ activeMode: mode }),
}));
