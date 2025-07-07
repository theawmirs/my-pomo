"use client";

import { Card, CardDescription } from "@/modules/ui-components/shadcn/ui/card";
import { CardTitle } from "@/modules/ui-components/shadcn/ui/card";
import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { Badge } from "@/modules/ui-components/shadcn/ui/badge";
import { CheckIcon, EditIcon, TrashIcon, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Task } from "@prisma/client";
import { pomodoroStore } from "../../pomodoro/store/pomodoro";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";

interface Props {
  task: Task;
}

export function SingleTask({ task }: Props) {
  const { setActiveTask, activeTask } = pomodoroStore();
  const router = useRouter();

  const priorityColor =
    task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-yellow-500" : "bg-green-500";

  const handleTaskClick = () => {
    if (task && !task.completed) {
      setActiveTask({
        id: task.id,
        title: task.title,
        description: task.description || "",
        completed: task.completed,
        dueDate: task.dueDate || null,
        priority: task.priority,
      });
      toast.success(`Task set as active task: ${task.title}`);
      router.back();
    }
  };

  return (
    <Card
      className={`
    
        border-l-4 transition-all hover:shadow-md p-3 rounded-sm
        ${task.completed ? "border-l-green-500 opacity-70" : `border-l-${priorityColor}`}
        ${activeTask?.id === task.id ? "bg-green-900/40" : ""}
      `}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <CardTitle className={cn("text-sm", task.completed ? "line-through text-muted-foreground" : "")}>
              {task.title}
            </CardTitle>
            <Badge
              variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"}
              className="text-xs"
            >
              {task.priority}
            </Badge>
          </div>
          {task.description && (
            <CardDescription className="text-xs mt-1 line-clamp-2">{task.description}</CardDescription>
          )}
          {task.dueDate && (
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <CalendarIcon size={10} />
              <span>{format(task.dueDate, "MMM d, yyyy")}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col ">
          <div className="flex gap-1 justify-end">
            <Button
              variant={task.completed ? "default" : "outline"}
              size="sm"
              className={cn("h-7 w-7 p-0", task.completed ? "bg-green-500 hover:bg-green-600" : "")}
            >
              <CheckIcon className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" className="h-7 w-7 p-0">
              <EditIcon className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" className="h-7 w-7 p-0 hover:bg-red-100 hover:text-red-600">
              <TrashIcon className="h-3 w-3" />
            </Button>
          </div>

          <div className="mt-2">
            <Button
              onClick={handleTaskClick}
              variant={activeTask?.id === task.id ? "default" : "outline"}
              size="sm"
              className="h-7"
            >
              {activeTask?.id === task.id ? "Active Task" : "Set as Active Task"}
            </Button>
          </div>
        </div>
        <div className="flex gap-1 flex-shrink-0"></div>
      </div>
    </Card>
  );
}
