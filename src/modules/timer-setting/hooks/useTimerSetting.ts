"use client";
import { pomodoroStore } from "@/modules/pomodoro/store/pomodoro";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function useTimerSetting() {
  const router = useRouter();

  const {
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    setFocusDuration,
    setShortBreakDuration,
    setLongBreakDuration,
  } = pomodoroStore();

  // Initialize with default values
  const [timerConfig, setTimerConfig] = useState({
    focus: 25,
    shortBreak: 5,
    longBreak: 10,
  });

  // Update state after component mounts to ensure client-side only
  useEffect(() => {
    setTimerConfig({
      focus: focusDuration / 60,
      shortBreak: shortBreakDuration / 60,
      longBreak: longBreakDuration / 60,
    });
  }, [focusDuration, shortBreakDuration, longBreakDuration]);

  const handleIncreaseTimer = (timerType: "focus" | "shortBreak" | "longBreak") => {
    setTimerConfig({ ...timerConfig, [timerType]: timerConfig[timerType] + 5 });
  };

  const handleDecreaseTimer = (timerType: "focus" | "shortBreak" | "longBreak") => {
    if (timerConfig[timerType] <= 5) return;
    setTimerConfig({ ...timerConfig, [timerType]: timerConfig[timerType] - 5 });
  };

  const handleSubmit = () => {
    setFocusDuration(timerConfig.focus * 60);
    setShortBreakDuration(timerConfig.shortBreak * 60);
    setLongBreakDuration(timerConfig.longBreak * 60);
    toast.success("Timer settings updated successfully");
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return {
    timerConfig,
    handleIncreaseTimer,
    handleDecreaseTimer,
    handleSubmit,
    handleCancel,
  };
}
