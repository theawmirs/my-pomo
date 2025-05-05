"use client";

import RealTimeClock from "@/components/app/clock";
import PomodoroTimer from "@/components/app/pomodoro";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { Clock, Maximize, Timer } from "lucide-react";
import { useState } from "react";

const AppPage = () => {
  const {
    activeTab,
    setActiveTab,
    activeMode,
    setActiveMode,
    isCountdownActive,
  } = useStore();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mouseHover, setMouseHover] = useState<
    "fullScreen" | "clock" | "pomodoro" | null
  >(null);
  return (
    <div className="flex flex-col justify-center h-[90vh] items-center p-4 max-w-sm mx-auto">
      {activeMode === "pomodoro" && (
        <>
          <div className="flex w-full justify-between gap-4">
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
          <PomodoroTimer />
        </>
      )}
      {activeMode === "clock" && <RealTimeClock />}
      <div className="flex justify-center items-center w-full mt-4 gap-2">
        <Button
          onMouseEnter={() => {
            setMouseHover("fullScreen");
          }}
          onMouseLeave={() => {
            setMouseHover(null);
          }}
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
          {/* <span>Full Screen</span> */}
        </Button>
        <Button
          onMouseEnter={() => {
            setMouseHover("clock");
          }}
          onMouseLeave={() => {
            setMouseHover(null);
          }}
          onClick={() => {
            setActiveMode("clock");
          }}
          variant={activeMode === "clock" ? "default" : "outline"}
        >
          <Clock />
          {/* <span>Real Time Clock</span> */}
        </Button>
        <Button
          onMouseEnter={() => {
            setMouseHover("pomodoro");
          }}
          onMouseLeave={() => {
            setMouseHover(null);
          }}
          onClick={() => {
            setActiveMode("pomodoro");
          }}
          variant={activeMode === "pomodoro" ? "default" : "outline"}
        >
          <Timer />
          {/* <span
          // className="ml-2 transition-all duration-300 ease-in-out overflow-hidden"
          // style={{
          //   maxWidth: mouseHover === "pomodoro" ? "130px" : "0",
          //   opacity: mouseHover === "pomodoro" ? 1 : 0,
          //   whiteSpace: "nowrap",
          // }}
          >
            Pomodoro Timer
          </span> */}
        </Button>
      </div>
    </div>
  );
};

export default AppPage;
