import { TasksDialog } from "@/modules/pomodoro/components/tasks";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function TasksModalPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/login");
  }

  return <TasksDialog userId={userId} />;
}
