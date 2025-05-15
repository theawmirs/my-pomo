import Link from "next/link";
import { Button } from "@/modules/ui-components/shadcn/ui/button";

export function CTASection() {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-4">Ready to boost your productivity?</h3>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Start using the My Pomo timer today and experience the difference in your focus and productivity.
      </p>
      <Link href="/pomodoro">
        <Button size="lg" variant="secondary" className="font-medium">
          Get Started Now
        </Button>
      </Link>
    </div>
  );
}
