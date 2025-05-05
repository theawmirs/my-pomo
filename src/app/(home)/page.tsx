"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Timer,
  Coffee,
  Brain,
  CheckCircle,
  BarChart3,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 right-1/2 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
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
            <Button
              size="lg"
              className="text-lg px-8 py-6 group transition-all duration-300 transform hover:scale-105"
            >
              <span className="mr-2 transition-transform duration-500 group-hover:rotate-180">
                <Timer className="size-5" />
              </span>
              Start Focusing
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="relative bg-card border shadow-sm rounded-xl overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-center p-8">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Timer className="text-primary size-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">
                Focus Timer
              </h3>
              <p className="text-muted-foreground mb-3">
                25-minute focused work sessions to maximize your productivity
              </p>
              <div className="flex justify-center">
                <div className="text-3xl font-mono font-bold text-foreground/70">
                  25:00
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-card border shadow-sm rounded-xl overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-center p-8">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Coffee className="text-primary size-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">
                Short Breaks
              </h3>
              <p className="text-muted-foreground mb-3">
                5-minute breaks to stay fresh between focus sessions
              </p>
              <div className="flex justify-center">
                <div className="text-3xl font-mono font-bold text-foreground/70">
                  05:00
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-card border shadow-sm rounded-xl overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-center p-8">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Brain className="text-primary size-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">
                Long Breaks
              </h3>
              <p className="text-muted-foreground mb-3">
                10-minute breaks to recharge after completing multiple sessions
              </p>
              <div className="flex justify-center">
                <div className="text-3xl font-mono font-bold text-foreground/70">
                  10:00
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-3xl mx-auto px-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Why Use <span className="text-primary">My Pomo</span>?
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-2 mt-1">
                <CheckCircle className="text-primary size-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Improved Focus</h3>
                <p className="text-muted-foreground">
                  Break your work into manageable chunks, helping you stay
                  concentrated during work periods.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-2 mt-1">
                <BarChart3 className="text-primary size-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Enhanced Productivity
                </h3>
                <p className="text-muted-foreground">
                  The structured approach helps you accomplish more in less
                  time, with clearly defined work and break periods.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 rounded-full p-2 mt-1">
                <Sparkles className="text-primary size-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Mental Freshness</h3>
                <p className="text-muted-foreground">
                  Regular breaks prevent burnout and mental fatigue, keeping
                  your mind fresh throughout your work day.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">
            Ready to boost your productivity?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start using the My Pomo timer today and experience the difference in
            your focus and productivity.
          </p>
          <Link href="/pomodoro">
            <Button size="lg" variant="secondary" className="font-medium">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
