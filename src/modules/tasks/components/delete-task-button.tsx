import { Button } from "@/components/ui/button";
import { Loader2, TrashIcon } from "lucide-react";
import { deleteTaskAction } from "../actions/tasks.action";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  taskId: string;
}

export default function DeleteTaskButton({ taskId }: Props) {
  const [isPending, startTransition] = useTransition();
  const handleDeleteTask = () => {
    startTransition(async () => {
      const result = await deleteTaskAction(taskId);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-7 w-7 p-0 hover:bg-red-100 hover:text-red-600"
      onClick={handleDeleteTask}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <TrashIcon className="h-3 w-3" />}
    </Button>
  );
}
