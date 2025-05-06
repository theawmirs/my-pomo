"use client";
import { useStore } from "@/store/store";
import { formatTime } from "@/utils/formatTime";
import { useEffect, useRef } from "react";

export default function DynamicTitle() {
  const { activeTab, timeLeft, isPaused, isCountdownActive } = useStore();
  const lastUpdateTimeRef = useRef<number | null>(null);
  const currentTimeLeftRef = useRef(timeLeft);
  const lastVisibleTimeRef = useRef(timeLeft);

  // Update local reference when props change
  useEffect(() => {
    currentTimeLeftRef.current = timeLeft;
    if (!document.hidden) {
      // Only update last update time when document is visible
      lastUpdateTimeRef.current = Date.now();
      lastVisibleTimeRef.current = timeLeft;
    }
  }, [timeLeft]);

  // Handle visibility changes
  useEffect(() => {
    const updateTitle = () => {
      let tabLabel = "";
      if (activeTab === "focus")
        tabLabel = isPaused ? "(Paused) Focus" : "Focus";
      else if (activeTab === "shortBreak")
        tabLabel = isPaused ? "(Paused) Short Break" : "Short Break";
      else if (activeTab === "longBreak")
        tabLabel = isPaused ? "(Paused) Long Break" : "Long Break";

      // Calculate current time if tab is hidden but timer is running
      let displayTime = currentTimeLeftRef.current;
      if (
        document.hidden &&
        isCountdownActive &&
        !isPaused &&
        lastUpdateTimeRef.current
      ) {
        const elapsedMs = Date.now() - lastUpdateTimeRef.current;
        const elapsedSeconds = Math.floor(elapsedMs / 1000);
        displayTime = Math.max(0, lastVisibleTimeRef.current - elapsedSeconds);
      }

      document.title = `${tabLabel} - ${formatTime(displayTime)} | MyPomo`;
    };

    // Update title immediately
    updateTitle();

    // Set up interval for when page is hidden
    const intervalId = setInterval(() => {
      if (document.hidden && isCountdownActive && !isPaused) {
        updateTitle();
      }
    }, 1000);

    // Listen for visibility changes
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // When tab becomes visible again, sync the last update time
        lastUpdateTimeRef.current = Date.now();
        lastVisibleTimeRef.current = currentTimeLeftRef.current;
      }
      updateTitle();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activeTab, timeLeft, isPaused, isCountdownActive]);

  return null;
}
