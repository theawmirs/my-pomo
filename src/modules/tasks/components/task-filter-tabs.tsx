"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Task } from "@prisma/client";

interface TaskFilterTabsProps {
  tasks: Task[];
  filter: "all" | "active" | "completed";
  onValueChange: (value: "all" | "active" | "completed") => void;
}

export function TaskFilterTabs({ tasks, filter, onValueChange }: TaskFilterTabsProps) {
  return (
    <Tabs
      defaultValue="all"
      value={filter}
      onValueChange={(value) => onValueChange(value as "all" | "active" | "completed")}
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All ({tasks.length})</TabsTrigger>
        <TabsTrigger value="active">Active ({tasks.filter((t) => !t.completed).length})</TabsTrigger>
        <TabsTrigger value="completed">Completed ({tasks.filter((t) => t.completed).length})</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-4" />
      <TabsContent value="active" className="mt-4" />
      <TabsContent value="completed" className="mt-4" />
    </Tabs>
  );
}
