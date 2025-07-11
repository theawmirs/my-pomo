import { useEffect, useState } from "react";
import { pomodoroStore } from "../store/pomodoro";

export const useClock = () => {
  const { activeMode } = pomodoroStore();

  const [time, setTime] = useState("");
  const [amPm, setAmPm] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    updateTime();

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
        .replace(/ (AM|PM)$/i, "")
    );
    setAmPm(now.getHours() >= 12 ? "PM" : "AM");
    setDay(
      now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    );
  };

  return {
    time,
    amPm,
    day,
    activeMode,
  };
};
