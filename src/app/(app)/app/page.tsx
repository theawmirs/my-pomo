import LongBreak from "@/components/app/long-break";
import PomodoroTimer from "@/components/app/pomodoro";
import ShortBreak from "@/components/app/short-break";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AppPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-dvh bg-gradient-to-b from-background to-muted/30 p-4">
      <Card className="w-full max-w-md md:max-w-md lg:max-w-lg border-2 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-center text-primary">
            My Pomodoro Timer
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs defaultValue="pomodoro" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger
                value="pomodoro"
                className="font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Pomodoro
              </TabsTrigger>
              <TabsTrigger
                value="short-break"
                className="font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Short Break
              </TabsTrigger>
              <TabsTrigger
                value="long-break"
                className="font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Long Break
              </TabsTrigger>
            </TabsList>
            <div className="rounded-lg overflow-hidden p-4 bg-card/50">
              <TabsContent value="pomodoro" className="mt-0">
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
