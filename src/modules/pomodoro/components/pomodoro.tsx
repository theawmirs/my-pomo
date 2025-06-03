"use client";
import { Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { formatTime } from "@/utils/formatTime";
import { FocusTask } from "./focus-task";
import { usePomodoro } from "../hooks/usePomodoro";

export function PomodoroTimer({ userId }: { userId: string }) {
  const { timeLeft, isCountdownActive, isPaused, activeMode, handleStart, handlePause, handleResume, handleReset } =
    usePomodoro(userId);

  return (
    <div className={`w-full ${activeMode === "clock" ? "hidden" : "block"}`}>
      <FocusTask />
      <h2 className="text-9xl font-bold text-center leading-42">{formatTime(timeLeft)}</h2>
      <div className="flex gap-2 w-full">
        {!isCountdownActive && !isPaused ? (
          <Button className="text-xl flex-1 py-6" onClick={handleStart}>
            <Play className="mr-2" />
            START
          </Button>
        ) : isPaused ? (
          <Button className="text-xl flex-1 py-6" onClick={handleResume}>
            <StepForward className="mr-2" />
            RESUME
          </Button>
        ) : (
          <Button className="text-xl flex-1 py-6" variant="outline" onClick={handlePause}>
            <Pause className="mr-2" />
            STOP
          </Button>
        )}
        <Button className="py-6 w-12" onClick={handleReset}>
          <RotateCcw />
        </Button>
      </div>
    </div>
  );
}
