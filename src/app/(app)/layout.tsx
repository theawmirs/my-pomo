import DynamicTitle from "@/components/global/dynamic-title";
import AppNavbar from "@/components/navbar/app-navbar";
import AuthWrapper from "@/components/auth/auth-wrapper";

interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: "Focus - 25:00 | MyPomo",
};

const AppLayout = async ({ children }: Props) => {
  return (
    <AuthWrapper>
      <div>
        <DynamicTitle />
        <header>
          <AppNavbar />
        </header>
        {children}
      </div>
    </AuthWrapper>
  );
};

export default AppLayout;
