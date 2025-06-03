import Link from "next/link";
import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { Clock, Timer, Sparkles } from "lucide-react";

export  function HeroSection() {
  return (
    <div className="text-center mb-24">
      <div className="inline-block animate-float">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Clock size={56} className="text-primary animate-pulse" />
            <div className="absolute -right-2 -top-2 bg-primary rounded-full p-1">
              <Sparkles size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent drop-shadow-sm">
        MY POMO
      </h1>

      <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
        Boost your productivity with our simple and effective Pomodoro timer
      </p>

      <Link href="/pomodoro">
        <Button size="lg" className="text-lg px-8 py-6 group transition-all duration-300 transform hover:scale-105">
          <span className="mr-2 transition-transform duration-500 group-hover:rotate-180">
            <Timer className="size-5" />
          </span>
          Start Focusing
        </Button>
      </Link>
    </div>
  );
}
