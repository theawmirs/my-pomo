"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, ListFilterIcon } from "lucide-react";

interface TaskSortDropdownProps {
  sortLabel: string;
  onSortChange: (value: string, label: string) => void;
}

export function TaskSortDropdown({ sortLabel, onSortChange }: TaskSortDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-36">
          <ListFilterIcon className="h-4 w-4 mr-2" />
          <span>{sortLabel}</span>
          <ChevronDownIcon className="h-4 w-4 ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onSortChange("dueDate", "Due Date")}>Due Date</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSortChange("priority", "Priority")}>Priority</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSortChange("title", "Title")}>Title</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
