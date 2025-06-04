import { auth } from "@/lib/auth/auth";
import { getUserById } from "@/lib/db/actions/user/user.actions";
import { EditAccountSettingDialog } from "@/modules/user/components/edit-account-setting";

export default async function AccountSettingModal() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;
  const user = await getUserById(userId);
  if (!user) return null;

  return (
    <div>
      <EditAccountSettingDialog user={user} />
    </div>
  );
}
