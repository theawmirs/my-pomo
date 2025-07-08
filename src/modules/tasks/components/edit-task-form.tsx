"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Task } from "@prisma/client";
import { useEditTask } from "../hooks/useEditTask";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface Props {
  task: Task;
  setOpen: (open: boolean) => void;
}

export default function EditTaskForm({ task, setOpen }: Props) {
  const [priority, setPriority] = useState<"low" | "medium" | "high">(task.priority as "low" | "medium" | "high");
  const { register, handleSubmit, errors, isPending, formRef } = useEditTask(task.id, setOpen);
  return (
    <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" placeholder="Enter task title" defaultValue={task.title} {...register("title")} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          id="description"
          placeholder="Enter task description"
          defaultValue={task.description}
          {...register("description")}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <div className="flex gap-2 justify-between">
          <Button
            type="button"
            variant={priority === "low" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setPriority("low")}
          >
            Low
          </Button>
          <Button
            type="button"
            variant={priority === "medium" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setPriority("medium")}
          >
            Medium
          </Button>
          <Button
            type="button"
            variant={priority === "high" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setPriority("high")}
          >
            High
          </Button>
          <input type="hidden" value={priority} {...register("priority")} />
        </div>
        {errors?.priority && <p className="text-sm text-red-500">{errors.priority.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          type="date"
          id="dueDate"
          placeholder="Enter task due date"
          defaultValue={task.dueDate?.toISOString().split("T")[0]}
          {...register("dueDate")}
        />
        {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="w-full flex-1" disabled={isPending}>
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
        </Button>
        <Button type="button" variant="destructive" className="w-full flex-1" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
