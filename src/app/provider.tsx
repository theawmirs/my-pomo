import { ThemeProvider } from "@/modules/global/components/theme-provider";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}
const Provier = ({ children }: Props) => {
  return (
    <div>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Toaster />
          {children}
        </ThemeProvider>
      </SessionProvider>
    </div>
  );
};

export default Provier;
