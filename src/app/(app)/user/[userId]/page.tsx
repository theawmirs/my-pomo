import { getUserById } from "@/lib/db/actions/user/user.actions";
import { auth } from "@/lib/auth/auth";
import { UserProfile } from "@/modules/user/components";
import { Card, CardHeader, CardTitle, CardDescription } from "@/modules/ui-components/shadcn/ui/card";

interface Props {
  params: Promise<{
    userId: string;
  }>;
}

export default async function UserProfilePage({ params }: Props) {
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

  return <UserProfile user={user} isCurrentUser={isCurrentUser} />;
}
