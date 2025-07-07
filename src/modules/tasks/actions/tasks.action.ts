"use server";

import { revalidatePath } from "next/cache";
import { taskSchema } from "../schema/task.schema";
import { changeTaskStatus, createTask, deleteTask } from "@/lib/db/actions/tasks/tasks.actions";

//Create a new task
export const createTaskAction = async (prevState: any, formData: FormData, userId: string) => {
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    priority: formData.get("priority"),
    dueDate: formData.get("dueDate"),
  };

  const validatedFields = taskSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Fix the errors in the form",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, description, priority, dueDate } = validatedFields.data;

  try {
    await createTask(userId, title, description, priority, dueDate);
    revalidatePath("/pomodoro");
    return { success: true, message: "Task created successfully" };
  } catch (error) {
    return { success: false, message: "Failed to create task" };
  }
};

//Change the status of a task (completed or not)
export const changeTaskStatusAction = async (taskId: string) => {
  if (!taskId) return { success: false, message: "Task ID is required" };

  try {
    await changeTaskStatus(taskId);
    revalidatePath("/pomodoro");
    return { success: true, message: "Task completed successfully" };
  } catch (error) {
    return { success: false, message: "Failed to complete task" };
  }
};

//Delete a task
export const deleteTaskAction = async (taskId: string) => {
  if (!taskId) return { success: false, message: "Task ID is required" };

  try {
    await deleteTask(taskId);
    revalidatePath("/pomodoro");
    return { success: true, message: "Task deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to delete task" };
  }
};
