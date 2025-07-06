"use client";

import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { DialogFooter } from "@/modules/ui-components/shadcn/ui/dialog";
import { Input } from "@/modules/ui-components/shadcn/ui/input";
import { Label } from "@/modules/ui-components/shadcn/ui/label";
import { useState } from "react";
import { Loader2, PlusIcon } from "lucide-react";

interface Props {
  formRef: React.RefObject<HTMLFormElement | null>;
  handleSubmit: () => void;
  isPending: boolean;
  errors: any;
  register: any;
  setActiveTab: (tab: "tasks" | "add") => void;
}
export function CreateTaskForm({ formRef, handleSubmit, isPending, errors, register, setActiveTab }: Props) {
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

  const handlePriorityChange = (priority: "low" | "medium" | "high") => {
    setPriority(priority);
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" placeholder="Enter task title" {...register("title")} />
        {errors?.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input type="text" id="description" placeholder="Enter task description" {...register("description")} />
        {errors?.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <div className="flex gap-2 justify-between">
          <Button
            type="button"
            variant={priority === "low" ? "default" : "outline"}
            className="flex-1"
            onClick={() => handlePriorityChange("low")}
          >
            Low
          </Button>
          <Button
            type="button"
            variant={priority === "medium" ? "default" : "outline"}
            className="flex-1"
            onClick={() => handlePriorityChange("medium")}
          >
            Medium
          </Button>
          <Button
            type="button"
            variant={priority === "high" ? "default" : "outline"}
            className="flex-1"
            onClick={() => handlePriorityChange("high")}
          >
            High
          </Button>
          <input type="hidden" value={priority} {...register("priority")} />
        </div>
        {errors?.priority && <p className="text-sm text-red-500">{errors.priority.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dueDate">Due Date</Label>
        <Input type="date" id="dueDate" {...register("dueDate")} />
        {errors?.dueDate && <p className="text-sm text-red-500">{errors.dueDate.message}</p>}
      </div>

      <DialogFooter className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={() => setActiveTab("tasks")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusIcon className="h-4 w-4 mr-2" />}
          Add Task
        </Button>
      </DialogFooter>
    </form>
  );
}
