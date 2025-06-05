import { DynamicTitle } from "@/modules/pomodoro/components/dynamic-title";
import AppNavbar from "@/modules/global/components/navbar/app-navbar";
import Wallpaper from "@/modules/global/components/app/wallpaper";

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
      <Wallpaper />
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
