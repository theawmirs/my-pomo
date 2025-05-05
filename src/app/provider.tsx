import { ThemeProvider } from "@/components/theme-provider";

interface Props {
  children: React.ReactNode;
}
const Provier = ({ children }: Props) => {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </div>
  );
};

export default Provier;
