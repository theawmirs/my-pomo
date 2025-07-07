import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ActiveTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date | null;
  priority: string;
}

type TaskStore = {
  activeTask: ActiveTask | null;
  setActiveTask: (task: ActiveTask | null) => void;
};

export const taskStore = create<TaskStore>()(
  persist(
    (set) => ({
      activeTask: null,
      setActiveTask: (task) => set({ activeTask: task }),
    }),
    {
      name: "task-storage",
    }
  )
);
