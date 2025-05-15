"use client";

import { pomodoroStore } from "@/modules/pomodoro/store/pomodoro";
import { Badge } from "../../ui-components/shadcn/ui/badge";

const CompletedCycles = () => {
  const completedCycles = pomodoroStore().completedCycles;

  return (
    <div className="flex items-center justify-center mt-2 mb-4">
      <Badge variant="outline" className="py-1 px-2">
        <span className="text-sm">Completed Pomodoros: {completedCycles}</span>
      </Badge>
    </div>
  );
};

export default CompletedCycles;
