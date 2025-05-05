"use client";

import LongBreak from "@/components/app/long-break";
import PomodoroTimer from "@/components/app/pomodoro";
import ShortBreak from "@/components/app/short-break";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/store/store";

const AppPage = () => {
  const { isCountdownActive } = useStore();
  return (
    <div className="flex flex-col justify-center h-[90vh] items-center bg-gradient-to-b from-background to-muted/30 p-4">
      <Card className="max-w-md md:max-w-md lg:max-w-lg border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary">
            Start focusing on your tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs defaultValue="focus" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                disabled={isCountdownActive}
                value="focus"
                className="font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-3xl"
              >
                Focus
              </TabsTrigger>
              <TabsTrigger
                disabled={isCountdownActive}
                value="short-break"
                className="font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-3xl"
              >
                Short Break
              </TabsTrigger>
              <TabsTrigger
                disabled={isCountdownActive}
                value="long-break"
                className="font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-3xl"
              >
                Long Break
              </TabsTrigger>
            </TabsList>
            <div className="rounded-lg overflow-hidden p-4 bg-card/50">
              <TabsContent value="focus" className="mt-0">
                <PomodoroTimer />
              </TabsContent>
              <TabsContent value="short-break" className="mt-0">
                <ShortBreak />
              </TabsContent>
              <TabsContent value="long-break" className="mt-0">
                <LongBreak />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppPage;
