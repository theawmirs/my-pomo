import LongBreak from "@/components/app/long-break";
import PomodoroTimer from "@/components/app/pomodoro";
import ShortBreak from "@/components/app/short-break";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <Tabs defaultValue="pomodoro">
            <TabsList>
              <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
              <TabsTrigger value="short-break">Short break</TabsTrigger>
              <TabsTrigger value="long-break">Long break</TabsTrigger>
            </TabsList>
            <TabsContent value="pomodoro">
              <PomodoroTimer />
            </TabsContent>
            <TabsContent value="short-break">
              <ShortBreak />
            </TabsContent>
            <TabsContent value="long-break">
              <LongBreak />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppPage;
