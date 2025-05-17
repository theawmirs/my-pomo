"use server";
import { prisma } from "@/lib/prisma";

export const createPomodoro = async (userId: string, duration: number, type: string) => {
  const pomodoro = await prisma.pomodoro.create({
    data: { userId, duration, type },
  });
  return pomodoro;
};
