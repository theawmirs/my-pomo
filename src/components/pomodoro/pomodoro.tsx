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

  const lastTickRef = useRef<number | null>(null);

  // Update time left based on each second
  useEffect(() => {
    let requestId: number | null = null;

    const updateTimer = (timestamp: number) => {
      if (!lastTickRef.current) {
        lastTickRef.current = timestamp;
      }

      // Calculate elapsed time in milliseconds
      const elapsed = timestamp - lastTickRef.current;

      // Update timer every second (1000ms)
      if (elapsed >= 1000) {
        // Calculate how many seconds have passed (could be multiple if tab was inactive)
        const secondsPassed = Math.floor(elapsed / 1000);

        // Update the time left
        const newTimeLeft = Math.max(0, timeLeft - secondsPassed);
        setTimeLeft(newTimeLeft);

        // Reset the last tick time
        lastTickRef.current = timestamp;
      }

      // Continue animation loop if active
      if (isCountdownActive && !isPaused && timeLeft > 0) {
        requestId = requestAnimationFrame(updateTimer);
      }
    };

    if (isCountdownActive && !isPaused && timeLeft > 0) {
      requestId = requestAnimationFrame(updateTimer);
    } else if (timeLeft === 0) {
      setCountdownStatus(false);
      setIsPaused(false);
      // Changing the active tab based on the finished status
      setIsFinished(true);
      setTimeout(() => {
        setIsFinished(false); 
      }, 1000);
    }

    return () => {
      if (requestId) cancelAnimationFrame(requestId);
    };
  }, [
    isCountdownActive,
    isPaused,
    timeLeft,
    setTimeLeft,
    setCountdownStatus,
    setIsPaused,
    setIsFinished,
  ]);

  // For changing the timer when changing the time mode from focus to break
  useEffect(() => {
    setTimeLeft(sessionDuration);
  }, [sessionDuration, setTimeLeft]);

  const handleStart = () => {
    lastTickRef.current = null; // Reset reference when starting
    setCountdownStatus(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    lastTickRef.current = null; // Reset reference when resuming
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
