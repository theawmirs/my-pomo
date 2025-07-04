"use client";

import { Edit } from "lucide-react";
import { Button } from "../../ui-components/shadcn/ui/button";
import Link from "next/link";
import { pomodoroStore } from "../store/pomodoro";

export function FocusTask() {
  const { activeTask } = pomodoroStore();
  const defaultTitle = "What do you want to focus on?";

  return (
    <div className="flex gap-4 items-center justify-center mt-4">
      <h2 className="text-2xl font-bold whitespace-nowrap cursor-pointer">
        {activeTask?.title ? activeTask.title : defaultTitle}
      </h2>

      <Link href="/tasks">
        <Button variant="outline" size="icon">
          <Edit />
        </Button>
      </Link>
    </div>
  );
}
