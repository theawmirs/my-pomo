"use client";

import { Clock, Maximize, Timer } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useEffect, useState } from "react";
import { pomodoroStore } from "@/store/store";

const TimerSettingButtons = () => {
  const {
    isTimerFinished,
    setIsTimerFinished,
    activeTab,
    setActiveTab,
    activeMode,
    setActiveMode,
    incrementCompletedCycles,
    completedCycles,
    resetCompletedCycles,
  } = pomodoroStore();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeButton, setActiveButton] = useState<"clock" | "pomodoro">(activeMode);

  useEffect(() => {
    setIsTimerFinished(false);
    if (!isTimerFinished) return;
    if (activeTab === "focus") {
      if (completedCycles === 3) {
        setActiveTab("longBreak");
        resetCompletedCycles();
      } else {
        setActiveTab("shortBreak");
        incrementCompletedCycles();
      }
    } else {
      setActiveTab("focus");
    }
  }, [isTimerFinished, activeTab, setActiveTab]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isFullScreen ? "default" : "outline"}
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen();
                  setIsFullScreen(true);
                } else {
                  document.exitFullscreen();
                  setIsFullScreen(false);
                }
              }}
            >
              <Maximize />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Full Screen</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip open={activeButton === "clock"}>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                setActiveMode("clock");
                setActiveButton("clock");
              }}
              variant={activeMode === "clock" ? "default" : "outline"}
            >
              <Clock />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Real Time Clock</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip open={activeButton === "pomodoro"}>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                setActiveMode("pomodoro");
                setActiveButton("pomodoro");
              }}
              variant={activeMode === "pomodoro" ? "default" : "outline"}
            >
              <Timer />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Pomodoro Timer</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default TimerSettingButtons;
