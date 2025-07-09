"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TimerSettingModalPage() {
  const [timerConfig, setTimerConfig] = useState<{ focus: number; shortBreak: number; longBreak: number }>({
    focus: 0,
    shortBreak: 0,
    longBreak: 0,
  });

  const router = useRouter();

  const handleTimerIncrease = (timerType: "focus" | "shortBreak" | "longBreak") => {
    setTimerConfig({ ...timerConfig, [timerType]: timerConfig[timerType] + 1 });
  };
  const handleTimerDecrease = (timerType: "focus" | "shortBreak" | "longBreak") => {
    setTimerConfig({ ...timerConfig, [timerType]: timerConfig[timerType] - 1 });
  };

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Timer Settings</DialogTitle>
        </DialogHeader>
        <DialogDescription>Customize your Pomodoro timer as you wish!</DialogDescription>

        <div className="flex items-center mt-4">
          <Label className="text-md">Focus Timer: </Label>
          <div className="flex gap-2 w-2/3 mx-auto">
            <Button onClick={() => handleTimerIncrease("focus")} variant="outline">
              <Plus />
            </Button>
            <Input defaultValue={timerConfig?.focus} />
            <Button onClick={() => handleTimerDecrease("focus")} variant="outline" disabled={timerConfig?.focus <= 0}>
              <Minus />
            </Button>
          </div>
        </div>

        <div className="flex items-center mt-4">
          <Label className="text-md">Short Break: </Label>
          <div className="flex gap-2 w-2/3 mx-auto">
            <Button onClick={() => handleTimerIncrease("shortBreak")} variant="outline">
              <Plus />
            </Button>
            <Input defaultValue={timerConfig?.shortBreak} />
            <Button
              onClick={() => handleTimerDecrease("shortBreak")}
              variant="outline"
              disabled={timerConfig?.shortBreak <= 0}
            >
              <Minus />
            </Button>
          </div>
        </div>

        <div className="flex items-center mt-4">
          <Label className="text-md">Long Break: </Label>
          <div className="flex gap-2 w-2/3 mx-auto">
            <Button onClick={() => handleTimerIncrease("longBreak")} variant="outline">
              <Plus />
            </Button>
            <Input defaultValue={timerConfig?.longBreak} />
            <Button
              onClick={() => handleTimerDecrease("longBreak")}
              variant="outline"
              disabled={timerConfig?.longBreak <= 0}
            >
              <Minus />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
