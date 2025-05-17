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
      {/* Focus tab effect - Red tones */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-1500",
          showEffect && activeTab === "focus" ? "opacity-100" : "opacity-0",
        )}
      >
        {/* Mobile-optimized positioning */}
        <div className="absolute top-[5%] right-[5%] md:top-[15%] md:right-[20%] w-[50vw] md:w-[35vw] h-[50vw] md:h-[35vw] bg-red-500/15 rounded-full blur-3xl" />
        <div className="absolute top-[10%] left-[5%] md:top-[10%] md:left-[10%] w-[35vw] md:w-[20vw] h-[35vw] md:h-[20vw] bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute top-[40%] left-[10%] md:top-[45%] md:left-[20%] w-[40vw] md:w-[28vw] h-[40vw] md:h-[28vw] bg-red-400/12 rounded-full blur-3xl" />
        <div className="absolute bottom-[25%] right-[5%] md:bottom-[15%] md:right-[15%] w-[45vw] md:w-[25vw] h-[45vw] md:h-[25vw] bg-red-500/18 rounded-full blur-3xl" />
        <div className="absolute bottom-[5%] left-[15%] md:bottom-[10%] md:left-[30%] w-[38vw] md:w-[22vw] h-[38vw] md:h-[22vw] bg-red-400/8 rounded-full blur-3xl" />
      </div>

      {/* Short Break effect - Green/Blue tones */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-1500",
          showEffect && activeTab === "shortBreak" ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-[2%] left-[5%] md:top-[5%] md:left-[15%] w-[45vw] md:w-[30vw] h-[45vw] md:h-[30vw] bg-cyan-500/12 rounded-full blur-3xl" />
        <div className="absolute top-[20%] right-[3%] md:top-[25%] md:right-[10%] w-[42vw] md:w-[28vw] h-[42vw] md:h-[28vw] bg-teal-400/10 rounded-full blur-3xl" />
        <div className="absolute top-[55%] left-[10%] md:top-[60%] md:left-[25%] w-[36vw] md:w-[22vw] h-[36vw] md:h-[22vw] bg-emerald-400/8 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] right-[5%] md:bottom-[8%] md:right-[20%] w-[40vw] md:w-[26vw] h-[40vw] md:h-[26vw] bg-cyan-300/12 rounded-full blur-3xl" />
        <div className="absolute bottom-[5%] left-[3%] md:bottom-[15%] md:left-[8%] w-[32vw] md:w-[18vw] h-[32vw] md:h-[18vw] bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Long Break effect - Purple/Blue tones */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-1500",
          showEffect && activeTab === "longBreak" ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-[3%] left-[5%] md:top-[8%] md:left-[12%] w-[48vw] md:w-[32vw] h-[48vw] md:h-[32vw] bg-indigo-500/12 rounded-full blur-3xl" />
        <div className="absolute top-[18%] right-[3%] md:top-[20%] md:right-[15%] w-[40vw] md:w-[26vw] h-[40vw] md:h-[26vw] bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute top-[50%] left-[12%] md:top-[55%] md:left-[30%] w-[38vw] md:w-[24vw] h-[38vw] md:h-[24vw] bg-violet-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-[15%] right-[2%] md:bottom-[10%] md:right-[10%] w-[42vw] md:w-[28vw] h-[42vw] md:h-[28vw] bg-indigo-400/12 rounded-full blur-3xl" />
        <div className="absolute bottom-[5%] left-[10%] md:bottom-[18%] md:left-[5%] w-[35vw] md:w-[20vw] h-[35vw] md:h-[20vw] bg-violet-400/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default BackgroundEffect;
