"use client";
import { useStore } from "@/store/store";
import { useEffect } from "react";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function DynamicTitle() {
  const { activeTab, timeLeft } = useStore();
  useEffect(() => {
    let tabLabel = "";
    if (activeTab === "focus") tabLabel = "Focus";
    else if (activeTab === "shortBreak") tabLabel = "Short Break";
    else if (activeTab === "longBreak") tabLabel = "Long Break";
    document.title = `${tabLabel} - ${formatTime(timeLeft)}`;
  }, [activeTab, timeLeft]);
  return null;
}
