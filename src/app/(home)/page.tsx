"use client";
import { LeftToRightMotion, UpToDownMotion } from "@/components/motion";
import { HeroSection, FeaturesSection, BenefitsSection, CTASection } from "@/modules/home/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 right-1/2 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <LeftToRightMotion duration={1} amount={0}>
          <HeroSection />
          <FeaturesSection />
        </LeftToRightMotion>

        <UpToDownMotion duration={1}>
          <BenefitsSection />
          <CTASection />
        </UpToDownMotion>
      </div>
    </div>
  );
}
