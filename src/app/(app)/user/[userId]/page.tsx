import { getUserById } from "@/lib/db/actions/user/user.actions";
import { auth } from "@/lib/auth/auth";
import { UserProfile } from "@/modules/user/components";
import UserNotFound from "./not-found";

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
    return <UserNotFound />;
  }

  return <UserProfile user={user} isCurrentUser={isCurrentUser} />;
}
