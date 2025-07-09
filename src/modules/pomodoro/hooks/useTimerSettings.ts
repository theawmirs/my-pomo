import { useEffect, useState } from "react";
import { pomodoroStore } from "../store/pomodoro";
import { toast } from "sonner";
import { createPomodoro } from "../services/pomodoro.services";
import { setUserOnline } from "@/lib/db/actions/user/user.actions";

export const useTimerSettings = (userId: string) => {
  const {
    isTimerFinished,
    setIsTimerFinished,
    activeTab,
    setActiveTab,
    activeMode,
    setActiveMode,
    incrementCompletedCycles,
    completedCycles,
    focusDuration,
  } = pomodoroStore();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeButton, setActiveButton] = useState<"clock" | "pomodoro">(activeMode);

  const handleTimerCompletion = () => {
    if (activeTab === "focus") {
      if ((completedCycles + 1) % 4 === 0) {
        setActiveTab("longBreak");
      } else {
        setActiveTab("shortBreak");
      }
      incrementCompletedCycles();

      if (userId) {
        createPomodoro(userId, focusDuration / 60, "focus");
        toast.success("Pomodoro completed");
      } else {
        toast.success("Pomodoro completed");
      }
    } else {
      setActiveTab("focus");
    }

    setIsTimerFinished(false);

    // Set user offline after 1 minute
    setTimeout(() => {
      setUserOnline(userId, false);
    }, 1 * 60 * 1000);
  };

  useEffect(() => {
    if (isTimerFinished) {
      handleTimerCompletion();
    }
  }, [isTimerFinished]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const setClockMode = () => {
    setActiveMode("clock");
    setActiveButton("clock");
  };

  const setPomodoroMode = () => {
    setActiveMode("pomodoro");
    setActiveButton("pomodoro");
  };

  return {
    isFullScreen,
    activeMode,
    activeButton,
    toggleFullScreen,
    setClockMode,
    setPomodoroMode,
  };
};
