"use client";
import { pomodoroStore } from "@/store/store";
import { useEffect, useState } from "react";

const RealTimeClock = () => {
  const { activeMode } = pomodoroStore();

  // Initialize with empty strings
  const [time, setTime] = useState("");
  const [amPm, setAmPm] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    // Set initial time on client only
    updateTime();

    // Then set up the interval
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Function to update all time-related state
  const updateTime = () => {
    const now = new Date();
    setTime(
      now
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
        .replace(/ (AM|PM)$/i, ""),
    );
    setAmPm(now.getHours() >= 12 ? "PM" : "AM");
    setDay(
      now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    );
  };

  return (
    <div
      className={`w-full flex flex-col justify-center items-center p-4 max-w-sm mx-auto ${activeMode === "clock" ? "block" : "hidden"}`}
    >
      <span className="text-4xl font-bold m-0">{amPm}</span>
      <h2 className="text-8xl lg:text-9xl font-bold text-center my-8">{time}</h2>
      <span className="text-4xl font-bold m-0">{day}</span>
    </div>
  );
};

export default RealTimeClock;
