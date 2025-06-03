interface UserStatisticsProps {
  data: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    total: number;
    streak: number;
    focusTime: string;
  };
}

export function UserStatistics({ data }: UserStatisticsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-primary/5 rounded-lg p-4 text-center">
        <h3 className="text-sm font-medium text-muted-foreground">Today</h3>
        <p className="text-3xl font-bold">{data.today}</p>
        <p className="text-xs text-muted-foreground">pomodoros</p>
      </div>

      <div className="bg-primary/5 rounded-lg p-4 text-center">
        <h3 className="text-sm font-medium text-muted-foreground">This Week</h3>
        <p className="text-3xl font-bold">{data.thisWeek}</p>
        <p className="text-xs text-muted-foreground">pomodoros</p>
      </div>

      <div className="bg-primary/5 rounded-lg p-4 text-center">
        <h3 className="text-sm font-medium text-muted-foreground">This Month</h3>
        <p className="text-3xl font-bold">{data.thisMonth}</p>
        <p className="text-xs text-muted-foreground">pomodoros</p>
      </div>

      <div className="bg-primary/5 rounded-lg p-4 text-center">
        <h3 className="text-sm font-medium text-muted-foreground">Total</h3>
        <p className="text-3xl font-bold">{data.total}</p>
        <p className="text-xs text-muted-foreground">pomodoros</p>
      </div>

      <div className="bg-primary/5 rounded-lg p-4 text-center">
        <h3 className="text-sm font-medium text-muted-foreground">Current Streak</h3>
        <p className="text-3xl font-bold">{data.streak}</p>
        <p className="text-xs text-muted-foreground">days</p>
      </div>

      <div className="bg-primary/5 rounded-lg p-4 text-center">
        <h3 className="text-sm font-medium text-muted-foreground">Focus Time</h3>
        <p className="text-3xl font-bold">{data.focusTime}</p>
        <p className="text-xs text-muted-foreground">hours</p>
      </div>
    </div>
  );
}
