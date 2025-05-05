"use client";

import RealTimeClock from "@/components/app/clock";
import PomodoroTimer from "@/components/app/pomodoro";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { Clock, Maximize, Timer } from "lucide-react";

const AppPage = () => {
  const {
    activeTab,
    setActiveTab,
    activeMode,
    setActiveMode,
    isCountdownActive,
  } = useStore();

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
      <div className="flex justify-start w-full mt-4 gap-2">
        <Button
          variant="outline"
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
          }}
        >
          <Maximize />
        </Button>
        <Button
          onClick={() => {
            setActiveMode("clock");
          }}
          variant={activeMode === "clock" ? "default" : "outline"}
        >
          <Clock />
        </Button>
        <Button
          onClick={() => {
            setActiveMode("pomodoro");
          }}
          variant={activeMode === "pomodoro" ? "default" : "outline"}
        >
          <Timer />
        </Button>
      </div>
    </div>
  );
};

export default AppPage;
