import { DynamicTitle } from "@/modules/pomodoro/components/dynamic-title";
import AppNavbar from "@/modules/global/components/navbar/app-navbar";

interface Props {
  children: React.ReactNode;
  authModal: React.ReactNode;
  accountModal: React.ReactNode;
}

export const metadata = {
  // title: "Focus - 25:00 | MyPomo",
};

export default function AppLayout({ children, authModal, accountModal }: Props) {
  return (
    <div>
      <DynamicTitle />
      <header>
        <AppNavbar />
      </header>
      {children}
      {authModal}
      {accountModal}
    </div>
  );
}
