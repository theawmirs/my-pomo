"use client";

import { useState } from "react";
import { SingleTask } from "./single-task";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/modules/ui-components/shadcn/ui/tabs";
import { Input } from "@/modules/ui-components/shadcn/ui/input";
import { Button } from "@/modules/ui-components/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/modules/ui-components/shadcn/ui/dropdown-menu";
import { ChevronDownIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { Task } from "@prisma/client";

interface Props {
  tasks: Task[];
}

export function TaskList({ tasks }: Props) {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [sortLabel, setSortLabel] = useState("Due Date");

  // Filter tasks based on active tab and search query
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        false
    );

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "priority":
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return (
          priorityOrder[a.priority as keyof typeof priorityOrder] -
          priorityOrder[b.priority as keyof typeof priorityOrder]
        );
      case "dueDate":
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.getTime() - b.dueDate.getTime();
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleSortChange = (value: string, label: string) => {
    setSortBy(value);
    setSortLabel(label);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-36">
              <ListFilterIcon className="h-4 w-4 mr-2" />
              <span>{sortLabel}</span>
              <ChevronDownIcon className="h-4 w-4 ml-auto" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleSortChange("dueDate", "Due Date")}>Due Date</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange("priority", "Priority")}>Priority</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange("title", "Title")}>Title</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="all" value={filter} onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All ({tasks.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({tasks.filter((t) => !t.completed).length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({tasks.filter((t) => t.completed).length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          {renderTaskList(sortedTasks)}
        </TabsContent>
        <TabsContent value="active" className="mt-4">
          {renderTaskList(sortedTasks)}
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          {renderTaskList(sortedTasks)}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function renderTaskList(tasks: any[]) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="rounded-full bg-muted p-3">
          <ListFilterIcon className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">No tasks found</h3>
        <p className="text-sm text-muted-foreground mt-1">Create a new task or try a different filter</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <SingleTask key={task.id} task={task} />
      ))}
    </div>
  );
}
