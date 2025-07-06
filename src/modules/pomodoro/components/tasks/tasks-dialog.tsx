"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/modules/ui-components/shadcn/ui/dialog";
import { TaskList } from "./task-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/modules/ui-components/shadcn/ui/tabs";
import { Task } from "@prisma/client";
import { useCreateTask } from "../../hooks/useCreateTask";
import { CreateTaskForm } from ".";

interface Props {
  userId: string;
  tasks: Task[];
}

export function TasksDialog({ userId, tasks }: Props) {
  const router = useRouter();
  const { formRef, handleSubmit, isPending, setActiveTab, activeTab, errors, register } = useCreateTask(userId);

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
            <CreateTaskForm
              formRef={formRef}
              handleSubmit={handleSubmit}
              isPending={isPending}
              errors={errors}
              register={register}
              setActiveTab={setActiveTab}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
