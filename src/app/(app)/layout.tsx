import DynamicTitle from "@/components/global/dynamic-title";
import AppNavbar from "@/components/navbar/app-navbar";

interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: "Focus - 25:00",
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
