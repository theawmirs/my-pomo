"use client";
import { useClock } from "../hooks/useClock";

const RealTimeClock = () => {
  const { time, amPm, day, activeMode } = useClock();

  return (
    <div
      className={`w-full flex flex-col justify-center items-center p-4 max-w-sm mx-auto ${
        activeMode === "clock" ? "block" : "hidden"
      }`}
    >
      <span className="text-4xl font-bold m-0">{amPm}</span>
      <h2 className="text-8xl lg:text-9xl font-bold text-center my-8">{time}</h2>
      <span className="text-4xl font-bold m-0">{day}</span>
    </div>
  );
};

export default RealTimeClock;
