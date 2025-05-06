"use client";
import { useEffect, useState } from "react";

const RealTimeClock = () => {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // Change to 12-hour format
      })
      .replace(/ (AM|PM)$/i, ""); // Remove AM/PM from display
  });

  const [amPm, setAmPm] = useState(() => {
    const now = new Date();
    return now.getHours() >= 12 ? "PM" : "AM";
  });

  const [day, setDay] = useState(() => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now
          .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true, // 12-hour format
          })
          .replace(/ (AM|PM)$/i, "") // Remove AM/PM from display
      );
      setAmPm(now.getHours() >= 12 ? "PM" : "AM");
      setDay(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center p-4 max-w-sm mx-auto">
      <span className="text-4xl font-bold m-0">{amPm}</span>
      <h2 className="text-8xl lg:text-9xl font-bold text-center my-8">
        {time}
      </h2>
      <span className="text-4xl font-bold m-0">{day}</span>
    </div>
  );
};

export default RealTimeClock;
