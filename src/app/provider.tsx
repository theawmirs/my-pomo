import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
interface Props {
  children: React.ReactNode;
}
const Provier = ({ children }: Props) => {
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Toaster />
        {children}
      </ThemeProvider>
    </div>
  );
};

export default Provier;
