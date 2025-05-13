import { create } from "zustand";

type StoreState = {
  isCountdownActive: boolean;
  activeTab: "focus" | "shortBreak" | "longBreak";
  sessionDuration: number;
  timeLeft: number;
  activeMode: "pomodoro" | "clock";
  isPaused: boolean;
  isTimerFinished: boolean;
  setCountdownStatus: (status: boolean) => void;
  setActiveTab: (tab: "focus" | "shortBreak" | "longBreak") => void;
  setActiveMode: (mode: "pomodoro" | "clock") => void;
  setTimeLeft: (time: number) => void;
  setIsPaused: (status: boolean) => void;
  setIsTimerFinished: (status: boolean) => void;
};

export const pomodoroStore = create<StoreState>((set) => ({
  isCountdownActive: false,
  activeTab: "focus",
  sessionDuration: 25 * 60,
  timeLeft: 25 * 60,
  activeMode: "pomodoro",
  isPaused: false,
  isTimerFinished: false,
  setCountdownStatus: (status: boolean) => set({ isCountdownActive: status }),
  setActiveTab: (tab: "focus" | "shortBreak" | "longBreak") =>
    set({
      activeTab: tab,
      sessionDuration: tab === "focus" ? 25 * 60 : tab === "shortBreak" ? 5 * 60 : 10 * 60,
      timeLeft: tab === "focus" ? 25 * 60 : tab === "shortBreak" ? 5 * 60 : 10 * 60,
    }),
  setActiveMode: (mode: "pomodoro" | "clock") => set({ activeMode: mode }),
  setTimeLeft: (time: number) => set({ timeLeft: time }),
  setIsPaused: (status: boolean) => set({ isPaused: status }),
  setIsTimerFinished: (status: boolean) => set({ isTimerFinished: status }),
}));
