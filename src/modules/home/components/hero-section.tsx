import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Timer, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { FadeInMotion, LeftToRightMotion } from "@/components/motion";

export function HeroSection() {
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

      <FadeInMotion duration={1} delay={0.2}>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent drop-shadow-sm">
          MY POMO
        </h1>
      </FadeInMotion>

      <FadeInMotion duration={1} delay={0.4}>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Boost your productivity with our simple and effective Pomodoro timer
        </p>
      </FadeInMotion>

      <Link href="/pomodoro">
        <LeftToRightMotion reverse duration={1} delay={0.2}>
          <Button size="lg" className="text-lg px-8 py-6 group transition-all duration-300 transform hover:scale-105">
            <motion.span
              className="mr-2 transition-transform duration-500 group-hover:rotate-180 inline-block"
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Timer className="size-5" />
            </motion.span>
            Start Focusing
          </Button>
        </LeftToRightMotion>
      </Link>
    </div>
  );
}
