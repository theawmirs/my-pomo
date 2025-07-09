import { create } from "zustand";

type StoreState = {
  isCountdownActive: boolean;
  activeTab: "focus" | "shortBreak" | "longBreak";
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  timeLeft: number;
  activeMode: "pomodoro" | "clock";
  isPaused: boolean;
  isTimerFinished: boolean;
  completedCycles: number;
  setCountdownStatus: (status: boolean) => void;
  setActiveTab: (tab: "focus" | "shortBreak" | "longBreak") => void;
  setActiveMode: (mode: "pomodoro" | "clock") => void;
  setTimeLeft: (time: number) => void;
  setIsPaused: (status: boolean) => void;
  setIsTimerFinished: (status: boolean) => void;
  incrementCompletedCycles: () => void;
  setFocusDuration: (duration: number) => void;
  setShortBreakDuration: (duration: number) => void;
  setLongBreakDuration: (duration: number) => void;
};

export const pomodoroStore = create<StoreState>((set) => ({
  isCountdownActive: false,
  activeTab: "focus",
  focusDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  longBreakDuration: 10 * 60,
  timeLeft: 25 * 60,
  activeMode: "pomodoro",
  isPaused: false,
  isTimerFinished: false,
  completedCycles: 0,
  setCountdownStatus: (status: boolean) => set({ isCountdownActive: status }),
  setActiveTab: (tab: "focus" | "shortBreak" | "longBreak") =>
    set((state) => ({
      activeTab: tab,
      timeLeft:
        tab === "focus"
          ? state.focusDuration
          : tab === "shortBreak"
          ? state.shortBreakDuration
          : state.longBreakDuration,
    })),
  setActiveMode: (mode: "pomodoro" | "clock") => set({ activeMode: mode }),
  setTimeLeft: (time: number) => set({ timeLeft: time }),
  setIsPaused: (status: boolean) => set({ isPaused: status }),
  setIsTimerFinished: (status: boolean) => set({ isTimerFinished: status }),
  incrementCompletedCycles: () => set((state) => ({ completedCycles: state.completedCycles + 1 })),
  setFocusDuration: (duration: number) =>
    set((state) => ({
      focusDuration: duration,
      timeLeft: state.activeTab === "focus" ? duration : state.timeLeft,
    })),
  setShortBreakDuration: (duration: number) =>
    set((state) => ({
      shortBreakDuration: duration,
      timeLeft: state.activeTab === "shortBreak" ? duration : state.timeLeft,
    })),
  setLongBreakDuration: (duration: number) =>
    set((state) => ({
      longBreakDuration: duration,
      timeLeft: state.activeTab === "longBreak" ? duration : state.timeLeft,
    })),
}));
