"use server";

import { prisma } from "@/lib/prisma";

export const createTask = async (
  userId: string,
  title: string,
  description: string,
  priority: string,
  dueDate: Date
) => {
  const task = await prisma.task.create({
    data: {
      userId,
      title,
      description,
      priority,
      dueDate,
    },
  });
  return task;
};

export const changeTaskStatus = async (taskId: string) => {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!task) return;

  if (task.completed) {
    await prisma.task.update({
      where: { id: taskId },
      data: { completed: false },
    });
  } else {
    await prisma.task.update({
      where: { id: taskId },
      data: { completed: true },
    });
  }
};

export const deleteTask = async (taskId: string) => {
  await prisma.task.delete({
    where: { id: taskId },
  });
};
