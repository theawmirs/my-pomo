"use client";

import { Edit } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { taskStore } from "@/modules/tasks/store/task.store";

export function FocusTask() {
  const { activeTask } = taskStore();
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
