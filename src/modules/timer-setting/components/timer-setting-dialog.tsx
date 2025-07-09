"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useTimerSettingsForm } from "../hooks/useTimerSettingsForm";
import { TimerSettingForm } from "./timer-setting-form";

export function TimerSettingDialog() {
  const router = useRouter();
  const { handleSubmit, onSubmit } = useTimerSettingsForm();

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Timer Settings</DialogTitle>
        </DialogHeader>
        <DialogDescription>Customize your Pomodoro timer as you wish!</DialogDescription>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TimerSettingForm />
          <Button className="w-full mt-8" type="submit">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
