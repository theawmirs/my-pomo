"use client";

import { useState } from "react";
import { SingleTask } from "./single-task";
import { Input } from "@/components/ui/input";
import { SearchIcon, ListFilterIcon } from "lucide-react";
import { Task } from "@prisma/client";
import { TaskFilterTabs } from "./task-filter-tabs";
import { TaskSortDropdown } from "./task-sort-dropdown";

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
        <TaskSortDropdown sortLabel={sortLabel} onSortChange={handleSortChange} />
      </div>

      <TaskFilterTabs tasks={tasks} filter={filter} onValueChange={setFilter} />
      {renderTaskList(sortedTasks)}
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
