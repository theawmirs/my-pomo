"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useTimerSetting } from "../hooks/useTimerSetting";

export function TimerSettingForm() {
  const { errors, handleSubmit, handleTimerDecrease, handleTimerIncrease, register, watch } = useTimerSetting();

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center mt-4">
        <Label className="text-md">Focus Timer (min): </Label>
        <div className="flex gap-2 w-2/3 mx-auto">
          <Button type="button" onClick={() => handleTimerIncrease("focus")} variant="outline">
            <Plus />
          </Button>
          <Input {...register("focus")} type="number" value={watch("focus")} />
          <Button
            type="button"
            onClick={() => handleTimerDecrease("focus")}
            variant="outline"
            disabled={watch("focus") === 1}
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
          <Input {...register("shortBreak")} type="number" value={watch("shortBreak")} />
          <Button
            type="button"
            onClick={() => handleTimerDecrease("shortBreak")}
            variant="outline"
            disabled={watch("shortBreak") === 1}
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
          <Input {...register("longBreak")} type="number" value={watch("longBreak")} />
          <Button
            type="button"
            onClick={() => handleTimerDecrease("longBreak")}
            variant="outline"
            disabled={watch("longBreak") === 1}
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
  );
}
