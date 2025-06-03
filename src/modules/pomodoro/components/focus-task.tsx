"use client";

import { useState } from "react";
import { Input } from "../../ui-components/shadcn/ui/input";

export function FocusTask() {
  const [taskText, setTaskText] = useState("What do you want to focus on?");
  const [isEditing, setIsEditing] = useState(false);

  const handleTaskEdit = (task: string) => {
    setTaskText(task);
  };

  return (
    <div className="flex gap-4 items-center justify-center mt-4">
      {isEditing ? (
        <>
          <Input
            autoFocus
            placeholder="What do you want to focus on?"
            onBlur={() => setIsEditing(false)}
            onChange={(e) => handleTaskEdit(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditing(false);
              }
            }}
          />
        </>
      ) : (
        <h2 onClick={() => setIsEditing(true)} className="text-2xl font-bold whitespace-nowrap cursor-pointer">
          {taskText}
        </h2>
      )}
    </div>
  );
};
