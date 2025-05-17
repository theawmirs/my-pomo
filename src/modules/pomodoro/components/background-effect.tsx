"use client";
import { useEffect, useState } from "react";
import { pomodoroStore } from "@/modules/pomodoro/store/pomodoro";
import { cn } from "@/lib/utils";

const BackgroundEffect = () => {
  const { activeTab } = pomodoroStore();
  const [showEffect, setShowEffect] = useState(false);

  useEffect(() => {
    // Always trigger effect when tab changes or component mounts
    setShowEffect(true);

    const timer = setTimeout(() => {
      setShowEffect(false);
    }, 1500); // Show effect for 1.5 seconds

    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none z-[-1]">
      {/* Focus tab effect - Warm/Red tones */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-1500",
          showEffect && activeTab === "focus" ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[70vw] h-[70vh] bg-primary/15 rounded-full blur-3xl" />
      </div>

      {/* Short Break effect - Green/Blue tones */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-1500",
          showEffect && activeTab === "shortBreak" ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-0 left-0 w-[80vw] h-[80vh] bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[75vw] h-[75vh] bg-emerald-400/10 rounded-full blur-3xl" />
      </div>

      {/* Long Break effect - Purple/Blue tones */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-1500",
          showEffect && activeTab === "longBreak" ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-0 left-0 w-[80vw] h-[80vh] bg-indigo-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[75vw] h-[75vh] bg-violet-400/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default BackgroundEffect;
