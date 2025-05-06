"use client";
import { Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { pomodoroStore } from "@/store/store";
import { formatTime } from "@/utils/formatTime";
import FocusTask from "./focus-task";

interface Props {
  setIsFinished: (status: boolean) => void;
}

const PomodoroTimer = ({ setIsFinished }: Props) => {
  const {
    isCountdownActive,
    setCountdownStatus,
    sessionDuration,
    setTimeLeft,
    timeLeft,
    isPaused,
    setIsPaused,
  } = pomodoroStore();

  // Store the absolute end time of the timer
  const [endTime, setEndTime] = useState<number | null>(null);

  // Initial timer setup effect
  useEffect(() => {
    setTimeLeft(sessionDuration);
  }, [sessionDuration, setTimeLeft]);

  // Main timer logic
  useEffect(() => {
    let timerId: number | undefined;

    // If timer is active and not paused
    if (isCountdownActive && !isPaused) {
      // Set the end time when starting/resuming the timer
      if (endTime === null) {
        setEndTime(Date.now() + timeLeft * 1000);
      }

      // Update timer every 100ms to ensure smooth updates
      timerId = window.setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((endTime! - now) / 1000));

        // Update the time left
        setTimeLeft(remaining);

        // Handle timer completion
        if (remaining <= 0) {
          clearInterval(timerId);
          setEndTime(null);
          setCountdownStatus(false);
          setIsPaused(false);
          setIsFinished(true);
          setTimeout(() => {
            setIsFinished(false);
          }, 1000);
        }
      }, 100);
    }

    // Cleanup function
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [
    isCountdownActive,
    isPaused,
    endTime,
    timeLeft,
    setTimeLeft,
    setCountdownStatus,
    setIsPaused,
    setIsFinished,
  ]);

  const handleStart = () => {
    setEndTime(Date.now() + timeLeft * 1000);
    setCountdownStatus(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    // When pausing, remove end time and store remaining time
    setEndTime(null);
    setIsPaused(true);
  };

  const handleResume = () => {
    // Calculate new end time from current remaining time
    setEndTime(Date.now() + timeLeft * 1000);
    setIsPaused(false);
  };

  const handleReset = () => {
    setEndTime(null);
    setTimeLeft(sessionDuration);
    setCountdownStatus(false);
    setIsPaused(false);
  };

  return (
    <div className="w-full">
      <FocusTask />
      <h2 className="text-9xl font-bold text-center leading-42">
        {formatTime(timeLeft)}
      </h2>
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
          <Button
            className="text-xl flex-1 py-6"
            variant="outline"
            onClick={handlePause}
          >
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
};

export default PomodoroTimer;
