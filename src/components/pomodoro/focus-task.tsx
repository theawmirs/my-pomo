"use client";

import { useState } from "react";
import { Input } from "../ui/input";

const FocusTask = () => {
  const [taskText, setTaskText] = useState("What do you want to focus on?");
  const [isEditing, setIsEditing] = useState(false);

  const handleTaskEdit = (task: string) => {
    setTaskText(task);
  };

  return (
    <div className="flex gap-4 items-center justify-center mt-4 ">
      {isEditing ? (
        <>
          <Input
            placeholder="What do you want to focus on?"
            onBlur={() => setIsEditing(false)}
            onChange={(e) => handleTaskEdit(e.target.value)}
          />
        </>
      ) : (
        <h2
          onClick={() => setIsEditing(true)}
          className="text-2xl font-bold whitespace-nowrap cursor-pointer"
        >
          {taskText}
        </h2>
      )}
    </div>
  );
};

export default FocusTask;
