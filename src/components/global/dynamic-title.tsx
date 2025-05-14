"use client";
import { pomodoroStore } from "@/store/pomodoro";
import { formatTime } from "@/utils/formatTime";
import { useEffect, useState } from "react";

export default function DynamicTitle() {
  const { activeTab, timeLeft, isPaused, isCountdownActive } = pomodoroStore();
  const [startTime, setStartTime] = useState<number | null>(null);
  const [initialTime, setInitialTime] = useState<number>(0);

  // Set up title updater effect
  useEffect(() => {
    // Create tab label based on current state
    const getTabLabel = () => {
      if (activeTab === "focus") return isPaused ? "(Paused) Focus" : "Focus";
      if (activeTab === "shortBreak") return isPaused ? "(Paused) Short Break" : "Short Break";
      return isPaused ? "(Paused) Long Break" : "Long Break";
    };

    // Update the document title
    const updateTitle = () => {
      // If timer is active and not paused, calculate time from start time
      let displayTime = timeLeft;

      // When the document is hidden, calculate time based on elapsed time since start
      if (document.hidden && isCountdownActive && !isPaused && startTime !== null) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        displayTime = Math.max(0, initialTime - elapsed);
      }

      document.title = `${getTabLabel()} - ${formatTime(displayTime)} | MyPomo`;
    };

    // Track start time when timer becomes active (or when dependencies change)
    if (isCountdownActive && !isPaused) {
      if (startTime === null) {
        setStartTime(Date.now());
        setInitialTime(timeLeft);
      }
    } else {
      // Reset tracking when timer is paused or inactive
      setStartTime(null);
    }

    // Update title immediately
    updateTitle();

    // Set up interval to update title when page is hidden
    const intervalId = setInterval(() => {
      if (document.hidden && isCountdownActive && !isPaused) {
        updateTitle();
      }
    }, 1000);

    // Handle tab visibility changes
    const handleVisibilityChange = () => {
      if (!document.hidden && isCountdownActive && !isPaused) {
        // When becoming visible, restart the time tracking with the current timeLeft
        setStartTime(Date.now());
        setInitialTime(timeLeft);
      }
      updateTitle();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activeTab, timeLeft, isPaused, isCountdownActive, startTime, initialTime]);

  return null;
}
