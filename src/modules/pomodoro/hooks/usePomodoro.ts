import { useEffect, useRef, useState } from "react";
import { pomodoroStore } from "../store/pomodoro";
import { setUserOnline } from "@/lib/db/actions/user/user.actions";

export const usePomodoro = (userId: string) => {
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

    // Set user online when timer starts
    if (userId) {
      setUserOnline(userId, true);
    }
  };

  const handlePause = () => {
    // When pausing, remove end time and store remaining time
    setEndTime(null);
    setIsPaused(true);

    if (userId) {
      setTimeout(() => {
        setUserOnline(userId, false);
      }, 1 * 60 * 1000);
    }
  };

  const handleResume = () => {
    // Calculate new end time from current remaining time
    setEndTime(Date.now() + timeLeft * 1000);
    setIsPaused(false);

    if (userId) {
      setUserOnline(userId, true);
    }
  };

  const handleReset = () => {
    setEndTime(null);
    setTimeLeft(sessionDuration);
    setCountdownStatus(false);
    setIsPaused(false);

    if (userId) {
      setTimeout(() => {
        setUserOnline(userId, false);
      }, 1 * 60 * 1000);
    }
  };

  return {
    timeLeft,
    isCountdownActive,
    isPaused,
    activeMode,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  };
};
