"use client";
import { Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { formatTime } from "@/utils/formatTime";

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
    isPaused,
    setIsPaused,
  } = useStore();

  const startTimeRef = useRef<number | null>(null);

  // Update time left based on each second
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isCountdownActive && !isPaused && timeLeft > 0) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
      }
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTimeRef.current!) / 1000);
        const newTimeLeft = sessionDuration - elapsed;
        setTimeLeft(newTimeLeft > 0 ? newTimeLeft : 0);
      }, 1000);
    } else if (timeLeft === 0) {
      setCountdownStatus(false);
      setIsPaused(false);
      setIsFinished(true);
      setTimeout(() => setIsFinished(false), 1000);
      startTimeRef.current = null;
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCountdownActive, isPaused, timeLeft, sessionDuration]);

  // For changing the timer when changing the time mode from focus to break
  useEffect(() => {
    setTimeLeft(sessionDuration);
  }, [sessionDuration]);

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
