"use client";
import { pomodoroStore } from "@/modules/pomodoro/store/pomodoro";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { timerSettingsSchema } from "../schemas/timer-settings.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FormData {
  focus: number;
  shortBreak: number;
  longBreak: number;
}

export const useTimerSetting = () => {
  const {
    setFocusDuration,
    setShortBreakDuration,
    setLongBreakDuration,
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
  } = pomodoroStore();

  const defaultValues = {
    focus: Number(focusDuration / 60),
    shortBreak: Number(shortBreakDuration / 60),
    longBreak: Number(longBreakDuration / 60),
  };

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(timerSettingsSchema),
    defaultValues,
  });

  const router = useRouter();

  const handleTimerIncrease = (timer: "focus" | "shortBreak" | "longBreak") => {
    setValue(timer, watch(timer) + 1);
  };
  const handleTimerDecrease = (timer: "focus" | "shortBreak" | "longBreak") => {
    setValue(timer, watch(timer) - 1);
  };

  const onSubmit = (data: FormData) => {
    const { focus, shortBreak, longBreak } = data;
    setFocusDuration(Number(focus * 60));
    setShortBreakDuration(Number(shortBreak * 60));
    setLongBreakDuration(Number(longBreak * 60));
    toast.success("Timer settings updated successfully");
    router.back();
  };

  return {
    register,
    setValue,
    watch,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    handleTimerIncrease,
    handleTimerDecrease,
  };
};
