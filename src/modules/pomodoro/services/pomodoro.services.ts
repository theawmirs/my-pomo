"use server";
import { prisma } from "@/lib/prisma";

export const createPomodoro = async (userId: string | undefined, duration: number, type: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const pomodoro = await prisma.pomodoro.create({
    data: { userId, duration, type },
  });
  return pomodoro;
};
