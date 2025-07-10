"use client";

import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { TimerSettingForm } from "./timer-setting-form";
import { Clock } from "lucide-react";

export function TimerSettingDialog() {
  const router = useRouter();

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="max-w-md p-6 rounded-xl">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold">Timer Settings</DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground">
            Customize your Pomodoro timer to match your productivity rhythm
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <TimerSettingForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
