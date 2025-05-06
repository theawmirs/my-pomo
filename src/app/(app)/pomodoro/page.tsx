"use client";

import RealTimeClock from "@/components/pomodoro/clock";
import PomodoroTimer from "@/components/pomodoro/pomodoro";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useStore } from "@/store/store";
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
  } = useStore();

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
  }, [isFinished]);

  return (
    <div className="flex flex-col justify-center h-[90vh] items-center p-4 max-w-sm mx-auto">
      <div
        className={`flex w-full justify-between gap-4 ${activeMode === "clock" ? "hidden" : "block"}`}
      >
        <Button
          disabled={isCountdownActive}
          onClick={() => {
            setActiveTab("focus");
          }}
          className="rounded-3xl flex-1"
          variant={activeTab === "focus" ? "default" : "outline"}
        >
          Focus
        </Button>
        <Button
          disabled={isCountdownActive}
          onClick={() => {
            setActiveTab("shortBreak");
          }}
          className="rounded-3xl flex-1"
          variant={activeTab === "shortBreak" ? "default" : "outline"}
        >
          Short Break
        </Button>
        <Button
          disabled={isCountdownActive}
          onClick={() => {
            setActiveTab("longBreak");
          }}
          className="rounded-3xl flex-1"
          variant={activeTab === "longBreak" ? "default" : "outline"}
        >
          Long Break
        </Button>
      </div>
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
