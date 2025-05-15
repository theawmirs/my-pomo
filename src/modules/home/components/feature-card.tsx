import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  time: string;
}

export function FeatureCard({ icon: Icon, title, description, time }: FeatureCardProps) {
  return (
    <div className="relative bg-card border shadow-sm rounded-xl overflow-hidden group hover:shadow-md transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="text-center p-8">
        <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="text-primary size-7" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-primary">{title}</h3>
        <p className="text-muted-foreground mb-3">{description}</p>
        <div className="flex justify-center">
          <div className="text-3xl font-mono font-bold text-foreground/70">{time}</div>
        </div>
      </div>
    </div>
  );
}
