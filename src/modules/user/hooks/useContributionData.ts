import { useState, useEffect } from "react";

export interface ActivityDay {
  date: Date;
  level: number;
}

export interface ContributionData {
  weeks: ActivityDay[][];
  monthLabels: { label: string; index: number }[];
}

export const useContributionData = () => {
  const [contributionData, setContributionData] = useState<ContributionData | null>(null);

  useEffect(() => {
    setContributionData(generateContributionData());
  }, []);

  return contributionData;
};

// Generate GitHub-style contribution data for the past year
const generateContributionData = (): ContributionData => {
  const weeks: ActivityDay[][] = [];
  const monthLabels: { label: string; index: number }[] = [];

  // Start date (1 year ago from today)
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  // Find the start of the week (Sunday)
  const dayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOfWeek);

  // Track month changes
  let currentMonth = -1;

  // Generate 53 weeks (GitHub shows max 53 weeks)
  for (let weekIndex = 0; weekIndex < 53; weekIndex++) {
    const week: ActivityDay[] = [];

    // For each day of the week (0 = Sunday, 6 = Saturday)
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + weekIndex * 7 + dayIndex);

      // Check if month changed
      if (currentDate.getMonth() !== currentMonth) {
        currentMonth = currentDate.getMonth();

        // Only add label if this is the first day of the month or close to it
        // This prevents crowding of month labels
        if (currentDate.getDate() <= 7) {
          monthLabels.push({
            label: currentDate.toLocaleString("default", { month: "short" }),
            index: weekIndex,
          });
        }
      }

      // Generate random activity level (0-4)
      const randomChance = Math.random();
      let level = 0;

      // Higher chance for lower values
      if (randomChance > 0.7) level = 1;
      if (randomChance > 0.85) level = 2;
      if (randomChance > 0.93) level = 3;
      if (randomChance > 0.97) level = 4;

      // For dates closer to today, increase chances for activity
      const today = new Date();
      const daysFromToday = Math.round((today.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysFromToday < 90 && Math.random() > 0.5) {
        level = Math.min(4, level + 1);
      }

      week.push({
        date: currentDate,
        level,
      });
    }

    weeks.push(week);
  }

  return { weeks, monthLabels };
};
