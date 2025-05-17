import UserDetails from "./user-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/modules/ui-components/shadcn/ui/tabs";
import UserStatistics from "./user-statistics";
import ContributionGraph from "./contribution-graph";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/modules/ui-components/shadcn/ui/card";

interface UserProfileProps {
  user: any;
  isCurrentUser: boolean;
}

const UserProfile = ({ user, isCurrentUser }: UserProfileProps) => {
  // Mock pomodoro data for visualization
  const mockPomodoroData = {
    today: 4,
    thisWeek: 23,
    thisMonth: 87,
    total: 325,
    streak: 5,
    focusTime: "12h 30m",
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <UserDetails user={user} isCurrentUser={isCurrentUser} />

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
                <UserStatistics data={mockPomodoroData} />
              </TabsContent>

              <TabsContent value="history">
                <ContributionGraph />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
