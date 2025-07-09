"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useTimerSetting } from "../hooks/useTimerSetting";

interface TimerSettingFormProps {
  onCancel: () => void;
}

export function TimerSettingForm({ onCancel }: TimerSettingFormProps) {
  const { errors, handleSubmit, handleTimerDecrease, handleTimerIncrease, register, watch } = useTimerSetting();

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <div className="space-y-1.5">
        <Label htmlFor="focus" className="text-base font-medium">
          Focus Timer
        </Label>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={() => handleTimerDecrease("focus")}
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={watch("focus") === 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input id="focus" {...register("focus")} type="number" value={watch("focus")} className="text-center" />
          <Button
            type="button"
            onClick={() => handleTimerIncrease("focus")}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground ml-1">minutes</span>
        </div>
        {errors.focus && <p className="text-destructive text-sm">{errors.focus.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="shortBreak" className="text-base font-medium">
          Short Break
        </Label>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={() => handleTimerDecrease("shortBreak")}
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={watch("shortBreak") === 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            id="shortBreak"
            {...register("shortBreak")}
            type="number"
            value={watch("shortBreak")}
            className="text-center"
          />
          <Button
            type="button"
            onClick={() => handleTimerIncrease("shortBreak")}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground ml-1">minutes</span>
        </div>
        {errors.shortBreak && <p className="text-destructive text-sm">{errors.shortBreak.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="longBreak" className="text-base font-medium">
          Long Break
        </Label>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={() => handleTimerDecrease("longBreak")}
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={watch("longBreak") === 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            id="longBreak"
            {...register("longBreak")}
            type="number"
            value={watch("longBreak")}
            className="text-center"
          />
          <Button
            type="button"
            onClick={() => handleTimerIncrease("longBreak")}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground ml-1">minutes</span>
        </div>
        {errors.longBreak && <p className="text-destructive text-sm">{errors.longBreak.message}</p>}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Save Changes
        </Button>
      </div>
    </form>
  );
}
