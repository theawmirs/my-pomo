import { create } from "zustand";

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

export const taskStore = create<TaskStore>((set) => ({
  activeTask: null,
  setActiveTask: (task) => set({ activeTask: task }),
}));
