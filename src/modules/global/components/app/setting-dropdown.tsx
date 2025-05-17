import { DropdownMenu, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../ui-components/shadcn/ui/dropdown-menu";
import { Moon, Settings } from "lucide-react";
import { Button } from "../../../ui-components/shadcn/ui/button";
import DarkmodeToggle from "../navbar/theme-toggle";

export default function SettingDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 w-9 rounded-full">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs font-medium">Preferences</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span>Theme</span>
          </div>
          <DarkmodeToggle />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
