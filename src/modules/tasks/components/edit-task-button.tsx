"use client";
import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import EditTaskDialog from "./edit-task-dialog";
import { Task } from "@prisma/client";

interface Props {
  task: Task;
}

export default function EditTaskButton({ task }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" size="sm" className="h-7 w-7 p-0 hover:text-yellow-500" onClick={() => setOpen(true)}>
        <EditIcon className="h-3 w-3 " />
      </Button>

      <EditTaskDialog open={open} setOpen={setOpen} task={task} />
    </>
  );
}
