import DynamicTitle from "@/modules/pomodoro/components/dynamic-title";
import AppNavbar from "@/modules/global/components/app-navbar";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: "Focus - 25:00 | MyPomo",
};

const AppLayout = async ({ children }: Props) => {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div>
      <DynamicTitle />
      <header>
        <AppNavbar />
      </header>
      {children}
    </div>
  );
};

export default AppLayout;
