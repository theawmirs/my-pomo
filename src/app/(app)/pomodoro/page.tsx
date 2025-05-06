"use client";

import RealTimeClock from "@/components/pomodoro/clock";
import PomodoroTimer from "@/components/pomodoro/pomodoro";
import PomodoroTabButtons from "@/components/pomodoro/pomodoro-tab-buttons";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { pomodoroStore } from "@/store/store";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Clock, Maximize, Timer } from "lucide-react";
import { useEffect, useState } from "react";

const AppPage = () => {
  const {
    activeTab,
    setActiveTab,
    activeMode,
    setActiveMode,
    isCountdownActive,
  } = pomodoroStore();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setIsFinished(false);
    if (!isFinished) return;
    if (activeTab === "focus") {
      setActiveTab("shortBreak");
    } else {
      setActiveTab("focus");
    }
  }, [isFinished, activeTab, setActiveTab]);

  return (
    <div className="flex flex-col justify-center h-[90vh] items-center p-4 max-w-sm mx-auto">
      <PomodoroTabButtons />
      <div className={`${activeMode === "clock" ? "hidden" : "block"}`}>
        <PomodoroTimer setIsFinished={setIsFinished} />
      </div>
      <div className={`${activeMode === "clock" ? "block" : "hidden"}`}>
        <RealTimeClock />
      </div>
      <div className="flex justify-center items-center w-full mt-4 gap-2">
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  setActiveMode("clock");
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  setActiveMode("pomodoro");
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
      </div>
    </div>
  );
};

export default AppPage;
