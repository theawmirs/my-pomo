import DynamicTitle from "@/modules/pomodoro/components/dynamic-title";
import AppNavbar from "@/modules/global/components/app-navbar";

interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: "Focus - 25:00 | MyPomo",
};

const AppLayout = ({ children }: Props) => {
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
