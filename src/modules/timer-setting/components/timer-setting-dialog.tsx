"use client";

import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { TimerSettingForm } from "./timer-setting-form";

export function TimerSettingDialog() {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Timer Settings</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Customize your Pomodoro timer to match your productivity rhythm
          </DialogDescription>
        </DialogHeader>

        <TimerSettingForm onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}
