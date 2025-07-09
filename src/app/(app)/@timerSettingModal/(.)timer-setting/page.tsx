"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { pomodoroStore } from "@/modules/pomodoro/store/pomodoro";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function TimerSettingModalPage() {
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
  } = useForm({
    resolver: zodResolver(
      z.object({
        focus: z
          .string()
          .transform((val) => Number(val))
          .pipe(z.number().min(1)),
        shortBreak: z
          .string()
          .transform((val) => Number(val))
          .pipe(z.number().min(1)),
        longBreak: z
          .string()
          .transform((val) => Number(val))
          .pipe(z.number().min(1)),
      })
    ),
    defaultValues: {
      focus: String(focusDuration / 60),
      shortBreak: String(shortBreakDuration / 60),
      longBreak: String(longBreakDuration / 60),
    },
  });

  const router = useRouter();

  // Watch form values to use in buttons
  const formValues = {
    focus: Number(watch("focus") || 0),
    shortBreak: Number(watch("shortBreak") || 0),
    longBreak: Number(watch("longBreak") || 0),
  };

  const handleTimerIncrease = (timerType: "focus" | "shortBreak" | "longBreak") => {
    const newValue = formValues[timerType] + 1;
    setValue(timerType, String(newValue), { shouldValidate: true });
  };

  const handleTimerDecrease = (timerType: "focus" | "shortBreak" | "longBreak") => {
    if (formValues[timerType] <= 1) return;
    const newValue = formValues[timerType] - 1;
    setValue(timerType, String(newValue), { shouldValidate: true });
  };

  const onSubmit = (data: { focus: number; shortBreak: number; longBreak: number }) => {
    const focusDuration = data.focus * 60;
    const shortBreakDuration = data.shortBreak * 60;
    const longBreakDuration = data.longBreak * 60;
    setFocusDuration(focusDuration);
    setShortBreakDuration(shortBreakDuration);
    setLongBreakDuration(longBreakDuration);

    console.log("Timer settings saved:", data);
    router.back(); // Close the dialog after saving
  };

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Timer Settings</DialogTitle>
        </DialogHeader>
        <DialogDescription>Customize your Pomodoro timer as you wish!</DialogDescription>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center mt-4">
            <Label className="text-md">Focus Timer (min): </Label>
            <div className="flex gap-2 w-2/3 mx-auto">
              <Button type="button" onClick={() => handleTimerIncrease("focus")} variant="outline">
                <Plus />
              </Button>
              <Input {...register("focus")} type="number" />
              <Button
                type="button"
                onClick={() => handleTimerDecrease("focus")}
                variant="outline"
                disabled={formValues.focus <= 1}
              >
                <Minus />
              </Button>
            </div>
            {errors.focus && <p className="text-red-500">{errors.focus.message}</p>}
          </div>

          <div className="flex items-center mt-4">
            <Label className="text-md">Short Break (min): </Label>
            <div className="flex gap-2 w-2/3 mx-auto">
              <Button type="button" onClick={() => handleTimerIncrease("shortBreak")} variant="outline">
                <Plus />
              </Button>
              <Input {...register("shortBreak")} type="number" />
              <Button
                type="button"
                onClick={() => handleTimerDecrease("shortBreak")}
                variant="outline"
                disabled={formValues.shortBreak <= 1}
              >
                <Minus />
              </Button>
            </div>
            {errors.shortBreak && <p className="text-red-500">{errors.shortBreak.message}</p>}
          </div>

          <div className="flex items-center mt-4">
            <Label className="text-md">Long Break (min): </Label>
            <div className="flex gap-2 w-2/3 mx-auto">
              <Button type="button" onClick={() => handleTimerIncrease("longBreak")} variant="outline">
                <Plus />
              </Button>
              <Input {...register("longBreak")} type="number" />
              <Button
                type="button"
                onClick={() => handleTimerDecrease("longBreak")}
                variant="outline"
                disabled={formValues.longBreak <= 1}
              >
                <Minus />
              </Button>
            </div>
            {errors.longBreak && <p className="text-red-500">{errors.longBreak.message}</p>}
          </div>
          <Button className="w-full mt-8" type="submit">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
