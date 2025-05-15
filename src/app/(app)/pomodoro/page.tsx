import { PomodoroTabButtons, PomodoroTimer, RealTimeClock, TimerSettingButtons } from "@/modules/pomodoro/components";

const AppPage = () => {
  return (
    <div className="flex flex-col justify-center h-[90vh] items-center p-4 max-w-sm mx-auto">
      <PomodoroTabButtons />
      <PomodoroTimer />
      <RealTimeClock />
      <div className="flex justify-center items-center w-full mt-4 gap-2">
        <TimerSettingButtons />
      </div>
    </div>
  );
};

export default AppPage;
