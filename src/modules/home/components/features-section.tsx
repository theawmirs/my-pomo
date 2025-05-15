import { Timer, Coffee, Brain } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function FeaturesSection() {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
      <FeatureCard
        icon={Timer}
        title="Focus Timer"
        description="25-minute focused work sessions to maximize your productivity"
        time="25:00"
      />
      <FeatureCard
        icon={Coffee}
        title="Short Breaks"
        description="5-minute breaks to stay fresh between focus sessions"
        time="05:00"
      />
      <FeatureCard
        icon={Brain}
        title="Long Breaks"
        description="10-minute breaks to recharge after completing multiple sessions"
        time="10:00"
      />
    </div>
  );
}
