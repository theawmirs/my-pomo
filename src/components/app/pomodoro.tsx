"use client";
import { Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";

interface Props {
  setIsFinished: (status: boolean) => void;
}

const PomodoroTimer = ({ setIsFinished }: Props) => {
  const {
    isCountdownActive,
    setCountdownStatus,
    sessionDuration,
    setTimeLeft,
    timeLeft,
  } = useStore();
  const [isPaused, setIsPaused] = useState(false);

  // Update time left based on each second
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isCountdownActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setCountdownStatus(false);
      setIsPaused(false);
      // Chaning the active tab based on the finished status
      setIsFinished(true);
      setTimeout(() => {
        setIsFinished(false);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCountdownActive, isPaused, timeLeft]);

  // For changing the timer when changing the time mode from focus to break
  useEffect(() => {
    setTimeLeft(sessionDuration);
  }, [sessionDuration]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setCountdownStatus(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    setTimeLeft(sessionDuration);
    setCountdownStatus(false);
    setIsPaused(false);
  };

  return (
    <div className="w-full">
      <h2 className="text-9xl font-bold my-8 text-center">
        {formatTime(timeLeft)}
      </h2>
      <div className="flex gap-2 w-full">
        {!isCountdownActive && !isPaused ? (
          <Button className="text-xl flex-1 py-6" onClick={handleStart}>
            <Play className="mr-2" />
            START
          </Button>
        ) : isPaused ? (
          <Button className="text-xl flex-1 py-6" onClick={handleResume}>
            <StepForward className="mr-2" />
            RESUME
          </Button>
        ) : (
          <Button
            className="text-xl flex-1 py-6"
            variant="outline"
            onClick={handlePause}
          >
            <Pause className="mr-2" />
            STOP
          </Button>
        )}
        <Button className="py-6 w-12" onClick={handleReset}>
          <RotateCcw />
        </Button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
