import { DynamicTitle } from "@/modules/pomodoro/components/dynamic-title";
import AppNavbar from "@/modules/global/components/navbar/app-navbar";

interface Props {
  children: React.ReactNode;
  authModal: React.ReactNode;
  accountModal: React.ReactNode;
  wallpaperModal: React.ReactNode;
}

export const metadata = {
  // title: "Focus - 25:00 | MyPomo",
};

export default function AppLayout({ children, authModal, accountModal, wallpaperModal }: Props) {
  return (
    <div>
      {/* <div className="absolute top-0 left-0 z-[-10] w-full h-full bg-red-500" /> */}
      <DynamicTitle />
      <header>
        <AppNavbar />
      </header>
      {children}
      {authModal}
      {accountModal}
      {wallpaperModal}
    </div>
  );
}
