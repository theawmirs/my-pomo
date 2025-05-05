import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pause, Play, RotateCcw, StopCircle } from "lucide-react";

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
          <h2 className="text-8xl font-bold mb-8 text-center">25:00</h2>
          <div className="flex gap-4 justify-center">
            <Button className="text-xl">
              <Play />
              START
            </Button>
            <Button className="text-xl" variant="outline">
              <Pause />
              STOP
            </Button>
            <Button>
              <RotateCcw />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppPage;
