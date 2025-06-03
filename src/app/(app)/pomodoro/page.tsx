import { auth } from "@/lib/auth/auth";
import {
  BackgroundEffect,
  PomodoroTabButtons,
  PomodoroTimer,
  RealTimeClock,
  TimerSettingButtons,
} from "@/modules/pomodoro/components";

export default async function AppPage() {
  const session = await auth();
  return (
    <div className="flex flex-col justify-center h-[90vh] items-center p-4 max-w-sm mx-auto relative">
      <BackgroundEffect />
      <PomodoroTabButtons />
      <PomodoroTimer />
      <RealTimeClock />
      <div className="flex justify-center items-center w-full mt-4 gap-2">
        <TimerSettingButtons userId={session?.user?.id} />
      </div>
    </div>
  );
}
