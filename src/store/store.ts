import { create } from "zustand";

type StoreState = {
  isCountdownActive: boolean;
  activeTab: "focus" | "shortBreak" | "longBreak";
  sessionDuration: number;
  timeLeft: number;
  activeMode: "pomodoro" | "clock";
  setCountdownStatus: (status: boolean) => void;
  setActiveTab: (tab: "focus" | "shortBreak" | "longBreak") => void;
  setActiveMode: (mode: "pomodoro" | "clock") => void;
  setTimeLeft: (time: number) => void;
};

export const useStore = create<StoreState>((set) => ({
  isCountdownActive: false,
  activeTab: "focus",
  sessionDuration: 25 * 60,
  timeLeft: 0,
  activeMode: "pomodoro",
  setCountdownStatus: (status: boolean) => set({ isCountdownActive: status }),
  setActiveTab: (tab: "focus" | "shortBreak" | "longBreak") =>
    set({
      activeTab: tab,
      sessionDuration:
        tab === "focus" ? 25 * 60 : tab === "shortBreak" ? 5 * 60 : 10 * 60,
    }),
  setActiveMode: (mode: "pomodoro" | "clock") => set({ activeMode: mode }),
  setTimeLeft: (time: number) => set({ timeLeft: time }),
}));
