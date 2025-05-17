"use client";

import { useEffect, useState } from "react";

interface ActivityDay {
  date: Date;
  level: number;
}

interface ContributionData {
  weeks: ActivityDay[][];
  monthLabels: { label: string; index: number }[];
}

const ContributionGraph = () => {
  const [contributionData, setContributionData] = useState<ContributionData | null>(null);

  useEffect(() => {
    setContributionData(generateContributionData());
  }, []);

  if (!contributionData) {
    return <div>Loading...</div>;
  }

  const { weeks, monthLabels } = contributionData;
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate the total width for proper container sizing
  const CELL_SIZE = 11;
  const CELL_GAP = 2;
  const WEEK_WIDTH = CELL_SIZE + CELL_GAP;
  const totalWidth = weeks.length * WEEK_WIDTH + 50; // 50px for day labels

  return (
    <div className="w-full h-full">
      {/* GitHub-style contribution graph - REAL horizontal layout */}
      <div className="space-y-4 overflow-x-auto pb-6 w-full">
        {/* Container with fixed width to ensure proper month label spacing */}
        <div style={{ width: `${totalWidth}px`, position: "relative", minHeight: "100%" }}>
          {/* Month labels */}
          <div className="flex text-xs text-muted-foreground h-5 pl-10 relative">
            {monthLabels.map((month, i) => (
              <div key={i} className="absolute" style={{ left: `${month.index * WEEK_WIDTH + 15}px` }}>
                {month.label}
              </div>
            ))}
          </div>

          {/* Grid with day labels */}
          <div className="flex mt-2">
            {/* Day of week labels */}
            <div className="flex flex-col mr-2 mt-1 space-y-[2px]">
              {weekdays.map((day, dayIndex) =>
                // Only show Monday, Wednesday, and Friday labels
                dayIndex === 1 || dayIndex === 3 || dayIndex === 5 ? (
                  <div
                    key={dayIndex}
                    className="text-xs text-muted-foreground text-right pr-1"
                    style={{
                      height: `${CELL_SIZE}px`,
                      lineHeight: `${CELL_SIZE}px`,
                      marginBottom: `${CELL_GAP}px`,
                    }}
                  >
                    {day.substring(0, 3)}
                  </div>
                ) : (
                  // Empty div for other days to maintain spacing
                  <div
                    key={dayIndex}
                    style={{
                      height: `${CELL_SIZE}px`,
                      marginBottom: `${CELL_GAP}px`,
                    }}
                  ></div>
                ),
              )}
            </div>

            {/* Contribution cells grid */}
            <div className="grid grid-flow-col gap-[2px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-flow-row gap-[2px]">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-[11px] h-[11px] rounded-sm ${
                        day.level === 0
                          ? "bg-gray-100 dark:bg-gray-800"
                          : day.level === 1
                            ? "bg-primary/20"
                            : day.level === 2
                              ? "bg-primary/40"
                              : day.level === 3
                                ? "bg-primary/70"
                                : "bg-primary"
                      }`}
                      title={`${day.date.toDateString()}: ${day.level} pomodoros`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/20"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/40"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/70"></div>
            <div className="w-3 h-3 rounded-sm bg-primary"></div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
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

export default ContributionGraph;
