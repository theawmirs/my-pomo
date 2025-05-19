"use client";

import { Clock, Maximize, Timer } from "lucide-react";
import { Button } from "../../ui-components/shadcn/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui-components/shadcn/ui/tooltip";
import { useTimerSettings } from "../hooks/useTimerSettings";

interface Props {
  userId: string | undefined;
}

const TimerSettingButtons = ({ userId }: Props) => {
  const { isFullScreen, activeMode, activeButton, toggleFullScreen, setClockMode, setPomodoroMode } =
    useTimerSettings(userId);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={isFullScreen ? "default" : "outline"} onClick={toggleFullScreen}>
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
            <Button onClick={setClockMode} variant={activeMode === "clock" ? "default" : "outline"}>
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
            <Button onClick={setPomodoroMode} variant={activeMode === "pomodoro" ? "default" : "outline"}>
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
