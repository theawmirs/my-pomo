import { LeftToRightMotion } from "@/components/motion";
import { CheckCircle, BarChart3, Sparkles } from "lucide-react";

export function BenefitsSection() {
  return (
    <div className="max-w-3xl mx-auto px-4 mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
        Why Use <span className="text-primary">My Pomo</span>?
      </h2>

      <div className="space-y-6">
        <LeftToRightMotion delay={0.2}>
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 rounded-full p-2 mt-1">
              <CheckCircle className="text-primary size-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Improved Focus</h3>
              <p className="text-muted-foreground">
                Break your work into manageable chunks, helping you stay concentrated during work periods.
              </p>
            </div>
          </div>
        </LeftToRightMotion>

        <LeftToRightMotion delay={0.4}>
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 rounded-full p-2 mt-1">
              <BarChart3 className="text-primary size-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Enhanced Productivity</h3>
              <p className="text-muted-foreground">
                The structured approach helps you accomplish more in less time, with clearly defined work and break
                periods.
              </p>
            </div>
          </div>
        </LeftToRightMotion>

        <LeftToRightMotion delay={0.6}>
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 rounded-full p-2 mt-1">
              <Sparkles className="text-primary size-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Mental Freshness</h3>
              <p className="text-muted-foreground">
                Regular breaks prevent burnout and mental fatigue, keeping your mind fresh throughout your work day.
              </p>
            </div>
          </div>
        </LeftToRightMotion>
      </div>
    </div>
  );
}
