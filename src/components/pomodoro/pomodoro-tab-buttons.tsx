"use client";
import React from "react";
import { Button } from "../ui/button";
import { pomodoroStore } from "@/store/pomodoro";

const PomodoroTabButtons = () => {
  const { isCountdownActive, setActiveTab, activeTab, activeMode } = pomodoroStore();

  return (
    <div className={`flex w-full justify-between gap-4 ${activeMode === "clock" ? "hidden" : "block"}`}>
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
  );
};

export default PomodoroTabButtons;
