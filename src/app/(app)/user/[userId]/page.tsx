import { getUserById } from "@/lib/db/actions/user/user.actions";

interface Props {
  params: {
    userId: string;
  };
}

const UserProfilePage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const userId = resolvedParams.userId;
  const user = await getUserById(userId);

  if (!user) {
    return <div>User not found</div>;
  }

  return <div>{user.name}</div>;
};

export default UserProfilePage;
