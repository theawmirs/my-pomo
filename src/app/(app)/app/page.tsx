import PomodoroTimer from "@/components/app/pomodoro";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AppPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>
            <h2 className="text-center text-3xl text-gray-600">Pomodoro</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PomodoroTimer />
        </CardContent>
      </Card>
    </div>
  );
};

export default AppPage;
