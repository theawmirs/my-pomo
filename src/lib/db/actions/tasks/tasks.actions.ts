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
