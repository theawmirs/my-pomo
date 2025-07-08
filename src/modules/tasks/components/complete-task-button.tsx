"use client";
import { Button } from "@/components/ui/button";
import { Task } from "@prisma/client";
import { changeTaskStatusAction } from "../actions/tasks.action";
import { toast } from "sonner";
import { CheckIcon, Loader2, XIcon } from "lucide-react";
import { useTransition } from "react";

interface Props {
  task: Task;
}

export default function CompleteTaskButton({ task }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleChangeTaskStatus = () => {
    startTransition(async () => {
      const result = await changeTaskStatusAction(task.id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button
      variant={task.completed ? "default" : "outline"}
      size="sm"
      className={"h-7 w-7 p-0 hover:text-green-500 "}
      onClick={handleChangeTaskStatus}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="h-3 w-3 animate-spin " />
      ) : task.completed ? (
        <XIcon className="h-3 w-3" />
      ) : (
        <CheckIcon className="h-3 w-3" />
      )}
    </Button>
  );
}
