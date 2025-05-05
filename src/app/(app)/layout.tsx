import AppNavbar from "@/components/navbar/app-navbar";

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <div>
      <header>
        <AppNavbar />
      </header>
      {children}
    </div>
  );
};

export default AppLayout;
