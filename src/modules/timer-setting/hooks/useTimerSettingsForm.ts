"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { pomodoroStore } from "@/modules/pomodoro/store/pomodoro";
import { timerSettingsSchema, TimerSettingsFormValues } from "../schemas/timer-settings.schema";

export function useTimerSettingsForm() {
  const router = useRouter();
  const {
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    setFocusDuration,
    setShortBreakDuration,
    setLongBreakDuration,
  } = pomodoroStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TimerSettingsFormValues>({
    resolver: zodResolver(timerSettingsSchema),
    defaultValues: {
      focus: Number(focusDuration / 60),
      shortBreak: Number(shortBreakDuration / 60),
      longBreak: Number(longBreakDuration / 60),
    },
  });

  // Watch form values to use in buttons
  const formValues = {
    focus: Number(watch("focus") || 0),
    shortBreak: Number(watch("shortBreak") || 0),
    longBreak: Number(watch("longBreak") || 0),
  };

  const handleTimerIncrease = (timerType: "focus" | "shortBreak" | "longBreak") => {
    const newValue = formValues[timerType] + 1;
    setValue(timerType, newValue, { shouldValidate: true });
  };

  const handleTimerDecrease = (timerType: "focus" | "shortBreak" | "longBreak") => {
    if (formValues[timerType] <= 1) return;
    const newValue = formValues[timerType] - 1;
    setValue(timerType, newValue, { shouldValidate: true });
  };

  const onSubmit = (data: TimerSettingsFormValues) => {
    const focusDuration = Number(data.focus) * 60;
    const shortBreakDuration = Number(data.shortBreak) * 60;
    const longBreakDuration = Number(data.longBreak) * 60;

    setFocusDuration(focusDuration);
    setShortBreakDuration(shortBreakDuration);
    setLongBreakDuration(longBreakDuration);

    console.log("Timer settings saved:", data);
    router.back(); // Close the dialog after saving
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    formValues,
    handleTimerIncrease,
    handleTimerDecrease,
    onSubmit,
  };
}
