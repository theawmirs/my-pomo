import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserDetails, UserPrivateProfile, UserStatistics } from ".";
import { User } from "@prisma/client";
import { getUserStatistics } from "../services/user-statistics.services";

interface UserProfileProps {
  user: User;
  isCurrentUser: boolean;
}

export async function UserProfile({ user, isCurrentUser }: UserProfileProps) {
  const statistics = await getUserStatistics(user.id);

  if (!user.isProfilePublic && !isCurrentUser) {
    return <UserPrivateProfile />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <UserDetails user={user} isCurrentUser={isCurrentUser} />

        <Card className="md:col-span-2 relative overflow-hidden">
          {/* Pomodoro Stats */}
          <CardHeader>
            <CardTitle>Pomodoro Statistics</CardTitle>
            <CardDescription>Track your productivity journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid mb-6">
                <TabsTrigger className="w-full" value="summary">
                  Summary
                </TabsTrigger>
                {/* <TabsTrigger value="history">History</TabsTrigger> */}
              </TabsList>

              <TabsContent value="summary">
                <UserStatistics data={statistics} />
              </TabsContent>

              {/* <TabsContent value="history">
                <ContributionGraph />
              </TabsContent> */}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
