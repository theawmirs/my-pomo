import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Task } from "@prisma/client";
import EditTaskForm from "./edit-task-form";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  task: Task;
}

export default function EditTaskDialog({ open, setOpen, task }: Props) {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <EditTaskForm task={task} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
