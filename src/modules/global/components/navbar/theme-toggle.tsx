"use client";
import { useTheme } from "next-themes";
import { MoonIcon, Sun } from "lucide-react";
import { Switch } from "@/modules/ui-components/shadcn/ui/switch";

const DarkmodeToggle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4" />
      <Switch
        className="cursor-pointer"
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <MoonIcon className="h-4 w-4" />
    </div>
  );
};

export default DarkmodeToggle;
