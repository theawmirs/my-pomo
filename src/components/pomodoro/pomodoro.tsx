"use client";
import { Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { pomodoroStore } from "@/store/store";
import { formatTime } from "@/utils/formatTime";
import FocusTask from "./focus-task";

const PomodoroTimer = () => {
  const {
    isCountdownActive,
    setCountdownStatus,
    sessionDuration,
    setTimeLeft,
    timeLeft,
    isPaused,
    setIsPaused,
    activeMode,
    setIsTimerFinished,
  } = pomodoroStore();

  // Store the absolute end time of the timer
  const [endTime, setEndTime] = useState<number | null>(null);
  // Audio reference for notification sound
  const notificationSound = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on component mount
  useEffect(() => {
    notificationSound.current = new Audio("/sounds/notification.wav");
  }, []);

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
          setIsTimerFinished(true);

          // Play notification sound when timer finishes
          if (notificationSound.current) {
            notificationSound.current.play().catch((error) => {
              console.error("Failed to play notification sound:", error);
            });
          }

          setTimeout(() => {
            setIsTimerFinished(false);
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
    setIsTimerFinished,
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
};

export default PomodoroTimer;
