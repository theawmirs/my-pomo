import { getUserById } from "@/lib/db/actions/user/user.actions";
import { EditUserProfileModal } from "@/modules/user/edit-user-profile/components/edit-user-profile-modal";

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function UserEditModal({ params }: Props) {
  const { userId } = await params;
  const user = await getUserById(userId);
  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div>
      <EditUserProfileModal user={user} />
    </div>
  );
}
