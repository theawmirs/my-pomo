"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/modules/ui-components/shadcn/ui/dialog";
import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { Input } from "@/modules/ui-components/shadcn/ui/input";
import { Label } from "@/modules/ui-components/shadcn/ui/label";
import { TaskList } from "./task-list";
import { Loader2, PlusIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/modules/ui-components/shadcn/ui/tabs";
import { createTaskAction } from "../../actions/tasks.action";
import { toast } from "sonner";
import { Task } from "@prisma/client";

interface Props {
  userId: string;
  tasks: Task[];
}

export function TasksDialog({ userId, tasks }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"tasks" | "add">("tasks");
  const [priority, setPriority] = useState<string>("");

  const boundAction = (prevState: any, formData: FormData) => {
    return createTaskAction(prevState, formData, userId);
  };

  const [state, formAction, isPending] = useActionState(boundAction, null);

  const handlePriorityChange = (priority: string) => {
    setPriority(priority);
  };

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      setActiveTab("tasks");
    }
    if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold">Tasks</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "tasks" | "add")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="tasks">Task List</TabsTrigger>
            <TabsTrigger value="add">Add New Task</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <TaskList tasks={tasks} />
          </TabsContent>

          <TabsContent value="add">
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input type="text" name="title" id="title" placeholder="Enter task title" />
                {state?.errors?.title && <p className="text-sm text-red-500">{state.errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input type="text" name="description" id="description" placeholder="Enter task description" />
                {state?.errors?.description && <p className="text-sm text-red-500">{state.errors.description}</p>}
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
                  <input type="hidden" name="priority" value={priority} />
                </div>
                {state?.errors?.priority && <p className="text-sm text-red-500">{state.errors.priority}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input type="date" name="dueDate" id="dueDate" />
                {state?.errors?.dueDate && <p className="text-sm text-red-500">{state.errors.dueDate}</p>}
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
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
