"use client";
import { useStore } from "@/store/store";
import { formatTime } from "@/utils/formatTime";
import { useEffect } from "react";

export default function DynamicTitle() {
  const { activeTab, timeLeft, isPaused } = useStore();
  useEffect(() => {
    let tabLabel = "";
    if (activeTab === "focus") tabLabel = isPaused ? "(Paused) Focus" : "Focus";
    else if (activeTab === "shortBreak")
      tabLabel = isPaused ? "(Paused) Short Break" : "Short Break";
    else if (activeTab === "longBreak")
      tabLabel = isPaused ? "(Paused) Long Break" : "Long Break";
    document.title = `${tabLabel} - ${formatTime(timeLeft)} | MyPomo`;
  }, [activeTab, timeLeft, isPaused]);
  return null;
}
