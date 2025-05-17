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
        <div className="absolute top-[15%] right-[20%] w-[35vw] h-[35vw] bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute top-[10%] left-[10%] w-[20vw] h-[20vw] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-[45%] left-[20%] w-[28vw] h-[28vw] bg-primary/12 rounded-full blur-3xl" />
        <div className="absolute bottom-[15%] right-[15%] w-[25vw] h-[25vw] bg-primary/18 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] left-[30%] w-[22vw] h-[22vw] bg-red-400/8 rounded-full blur-3xl" />
      </div>

      {/* Short Break effect - Green/Blue tones */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-1500",
          showEffect && activeTab === "shortBreak" ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-[5%] left-[15%] w-[30vw] h-[30vw] bg-cyan-500/12 rounded-full blur-3xl" />
        <div className="absolute top-[25%] right-[10%] w-[28vw] h-[28vw] bg-teal-400/10 rounded-full blur-3xl" />
        <div className="absolute top-[60%] left-[25%] w-[22vw] h-[22vw] bg-emerald-400/8 rounded-full blur-3xl" />
        <div className="absolute bottom-[8%] right-[20%] w-[26vw] h-[26vw] bg-cyan-300/12 rounded-full blur-3xl" />
        <div className="absolute bottom-[15%] left-[8%] w-[18vw] h-[18vw] bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Long Break effect - Purple/Blue tones */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-1500",
          showEffect && activeTab === "longBreak" ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-[8%] left-[12%] w-[32vw] h-[32vw] bg-indigo-500/12 rounded-full blur-3xl" />
        <div className="absolute top-[20%] right-[15%] w-[26vw] h-[26vw] bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute top-[55%] left-[30%] w-[24vw] h-[24vw] bg-violet-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] w-[28vw] h-[28vw] bg-indigo-400/12 rounded-full blur-3xl" />
        <div className="absolute bottom-[18%] left-[5%] w-[20vw] h-[20vw] bg-violet-400/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default BackgroundEffect;
