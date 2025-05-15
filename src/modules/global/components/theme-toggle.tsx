"use client";
import { useTheme } from "next-themes";
import { Button } from "../../ui-components/shadcn/ui/button";
import { MoonIcon, Sun } from "lucide-react";

const DarkmodeToggle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div>
      <Button variant="outline" className="dark:hidden" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        <MoonIcon />
        Light Mode
      </Button>
      <Button
        variant="outline"
        className="hidden dark:flex"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun />
        Dark Mode
      </Button>
    </div>
  );
};

export default DarkmodeToggle;
