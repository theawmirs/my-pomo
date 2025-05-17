import { getUserById } from "@/lib/db/actions/user/user.actions";
import { auth } from "@/lib/auth/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/modules/ui-components/shadcn/ui/avatar";
import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/modules/ui-components/shadcn/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/modules/ui-components/shadcn/ui/tabs";
import { Badge } from "@/modules/ui-components/shadcn/ui/badge";
import { User, Mail, Calendar, PenSquare } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{
    userId: string;
  }>;
}

interface ActivityDay {
  date: Date;
  level: number;
}

interface ContributionData {
  weeks: ActivityDay[][];
  monthLabels: { label: string; index: number }[];
}

const UserProfilePage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const userId = resolvedParams.userId;
  const user = await getUserById(userId);
  const session = await auth();
  const isCurrentUser = session?.user?.id === userId;

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>User not found</CardTitle>
            <CardDescription>The user you're looking for doesn't exist</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Mock pomodoro data for visualization
  const mockPomodoroData = {
    today: 4,
    thisWeek: 23,
    thisMonth: 87,
    total: 325,
    streak: 5,
    focusTime: "12h 30m",
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
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

  const { weeks, monthLabels } = generateContributionData();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate the total width for proper container sizing
  const CELL_SIZE = 11;
  const CELL_GAP = 2;
  const WEEK_WIDTH = CELL_SIZE + CELL_GAP;
  const totalWidth = weeks.length * WEEK_WIDTH + 50; // 50px for day labels

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Profile</CardTitle>
              {isCurrentUser && (
                <Link href={`/settings`}>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <PenSquare className="h-4 w-4" />
                    <span>Edit</span>
                  </Button>
                </Link>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.image || ""} alt={user.name} />
                <AvatarFallback className="bg-primary/10 text-2xl">{user.name[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <Badge variant="outline" className="mt-2">
                {user.role}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{user.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {formatDate(user.createdAt)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pomodoro Stats */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Pomodoro Statistics</CardTitle>
            <CardDescription>Track your productivity journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="summary">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-primary/5 rounded-lg p-4 text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">Today</h3>
                    <p className="text-3xl font-bold">{mockPomodoroData.today}</p>
                    <p className="text-xs text-muted-foreground">pomodoros</p>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4 text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">This Week</h3>
                    <p className="text-3xl font-bold">{mockPomodoroData.thisWeek}</p>
                    <p className="text-xs text-muted-foreground">pomodoros</p>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4 text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">This Month</h3>
                    <p className="text-3xl font-bold">{mockPomodoroData.thisMonth}</p>
                    <p className="text-xs text-muted-foreground">pomodoros</p>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4 text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">Total</h3>
                    <p className="text-3xl font-bold">{mockPomodoroData.total}</p>
                    <p className="text-xs text-muted-foreground">pomodoros</p>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4 text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">Current Streak</h3>
                    <p className="text-3xl font-bold">{mockPomodoroData.streak}</p>
                    <p className="text-xs text-muted-foreground">days</p>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4 text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">Focus Time</h3>
                    <p className="text-3xl font-bold">{mockPomodoroData.focusTime}</p>
                    <p className="text-xs text-muted-foreground">hours</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <div>
                  {/* GitHub-style contribution graph - REAL horizontal layout */}
                  <div className="space-y-4 overflow-x-auto pb-6">
                    {/* Container with fixed width to ensure proper month label spacing */}
                    <div style={{ width: `${totalWidth}px`, position: "relative" }}>
                      {/* Month labels */}
                      <div className="flex text-xs text-muted-foreground h-5 pl-10 relative">
                        {monthLabels.map((month, i) => (
                          <div key={i} className="absolute" style={{ left: `${month.index * WEEK_WIDTH + 15}px` }}>
                            {month.label}
                          </div>
                        ))}
                      </div>

                      {/* Grid with day labels */}
                      <div className="flex">
                        {/* Day of week labels */}
                        <div className="flex flex-col mr-2 mt-1">
                          {[1, 3, 5].map((dayIndex) => (
                            <div
                              key={dayIndex}
                              className="h-[13px] text-xs text-muted-foreground text-right pr-1 mb-[2px]"
                              style={{ height: `${CELL_SIZE}px`, marginBottom: `${CELL_GAP}px` }}
                            >
                              {weekdays[dayIndex].substring(0, 3)}
                            </div>
                          ))}
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
                      <div className="flex items-center justify-end gap-2 mt-2 text-xs text-muted-foreground">
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
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfilePage;
