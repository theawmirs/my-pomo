"use client";

import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { TimerSettingForm } from "./timer-setting-form";

export function TimerSettingDialog() {
  const router = useRouter();

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Timer Settings</DialogTitle>
        </DialogHeader>
        <DialogDescription>Customize your Pomodoro timer as you wish!</DialogDescription>

        <TimerSettingForm />
      </DialogContent>
    </Dialog>
  );
}
