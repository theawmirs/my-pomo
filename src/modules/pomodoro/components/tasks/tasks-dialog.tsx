"use client";

import { useState } from "react";
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
import { PlusIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/modules/ui-components/shadcn/ui/tabs";

export function TasksDialog() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"tasks" | "add">("tasks");

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
            <TaskList />
          </TabsContent>

          <TabsContent value="add">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input id="title" placeholder="Enter task title" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input id="description" placeholder="Enter task description" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <div className="flex gap-2 justify-between">
                  <Button variant="outline" className="flex-1">
                    Low
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Medium
                  </Button>
                  <Button variant="outline" className="flex-1">
                    High
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" />
              </div>

              <DialogFooter className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setActiveTab("tasks")}>
                  Cancel
                </Button>
                <Button type="submit">
                  <PlusIcon className="h-4 w-4 mr-2" />
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
