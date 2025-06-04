"use server";

import { prisma } from "@/lib/prisma";
import { Pomodoro } from "@prisma/client";
import { startOfDay, startOfWeek, startOfMonth, subDays, format } from "date-fns";

interface UserStatistics {
  today: number;
  thisWeek: number;
  thisMonth: number;
  total: number;
  streak: number;
  focusTime: string;
}

export async function getUserStatistics(userId: string): Promise<UserStatistics> {
  // Get all user's pomodoros
  const pomodoros = await prisma.pomodoro.findMany({
    where: {
      userId,
    },
    orderBy: {
      completedAt: "asc",
    },
  });

  const now = new Date();

  // Calculate today's pomodoros
  const todayStart = startOfDay(now);
  const todayPomodoros = pomodoros.filter((p) => {
    const completedDate = new Date(p.completedAt);
    return completedDate >= todayStart;
  }).length;

  // Calculate this week's pomodoros
  const weekStart = startOfWeek(now, { weekStartsOn: 0 }); // 0 = Sunday
  const thisWeekPomodoros = pomodoros.filter((p) => {
    const completedDate = new Date(p.completedAt);
    return completedDate >= weekStart;
  }).length;

  // Calculate this month's pomodoros
  const monthStart = startOfMonth(now);
  const thisMonthPomodoros = pomodoros.filter((p) => {
    const completedDate = new Date(p.completedAt);
    return completedDate >= monthStart;
  }).length;

  // Calculate total pomodoros
  const totalPomodoros = pomodoros.length;

  // Calculate streak
  const streak = calculateStreak(pomodoros);

  // Calculate total focus time in minutes
  const totalMinutes = pomodoros.reduce((acc, p) => acc + p.duration, 0);
  const focusTimeFormatted = formatFocusTime(totalMinutes);

  return {
    today: todayPomodoros,
    thisWeek: thisWeekPomodoros,
    thisMonth: thisMonthPomodoros,
    total: totalPomodoros,
    streak,
    focusTime: focusTimeFormatted,
  };
}

function calculateStreak(pomodoros: Array<Pomodoro>): number {
  if (pomodoros.length === 0) return 0;

  // Group pomodoros by day
  const pomodorosByDay = new Map<string, boolean>();

  pomodoros.forEach((p) => {
    const date = new Date(p.completedAt);
    const dateKey = format(date, "yyyy-MM-dd");
    pomodorosByDay.set(dateKey, true);
  });

  // Check if there's a pomodoro today
  const today = new Date();
  const todayKey = format(today, "yyyy-MM-dd");
  const hasTodayPomodoro = pomodorosByDay.has(todayKey);

  // If no pomodoro today, streak might have ended yesterday
  if (!hasTodayPomodoro) {
    const yesterday = subDays(today, 1);
    const yesterdayKey = format(yesterday, "yyyy-MM-dd");
    if (!pomodorosByDay.has(yesterdayKey)) {
      return 0; // Streak broken
    }
  }

  // Calculate streak by checking consecutive days
  let currentStreak = hasTodayPomodoro ? 1 : 0;
  let currentDate = new Date();

  if (!hasTodayPomodoro && currentStreak === 0) {
    currentDate = subDays(today, 1); // Start from yesterday
    currentStreak = 1; // Count yesterday as 1
  }

  while (true) {
    currentDate = subDays(currentDate, 1);
    const dateKey = format(currentDate, "yyyy-MM-dd");

    if (pomodorosByDay.has(dateKey)) {
      currentStreak++;
    } else {
      break;
    }
  }

  return currentStreak;
}

function formatFocusTime(totalMinutes: number): string {
  // Using date-fns to format the duration
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
}
