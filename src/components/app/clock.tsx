"use client";
import { useEffect, useState } from "react";

const RealTimeClock = () => {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  });

  const [amPm, setAmPm] = useState(() => {
    const now = new Date();
    return now.getHours() >= 12 ? "PM" : "AM";
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
      setAmPm(now.getHours() >= 12 ? "PM" : "AM");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center p-4 max-w-sm mx-auto">
      <span className="text-4xl font-bold m-0">{amPm}</span>
      <h2 className="text-9xl font-bold text-center">{time}</h2>
    </div>
  );
};

export default RealTimeClock;
