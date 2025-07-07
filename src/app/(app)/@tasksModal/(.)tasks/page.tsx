import { TasksDialog } from "@/modules/tasks/components";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { getUserTasks } from "@/lib/db/actions/user/user.actions";

export default async function TasksModalPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/login");
  const tasks = await getUserTasks(userId);

  return <TasksDialog userId={userId} tasks={tasks} />;
}
