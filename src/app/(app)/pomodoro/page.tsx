import TimerSettingButtons from "@/components/global/timer-setting-buttons";
import RealTimeClock from "@/components/pomodoro/clock";
import PomodoroTimer from "@/components/pomodoro/pomodoro";
import PomodoroTabButtons from "@/components/pomodoro/pomodoro-tab-buttons";

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
