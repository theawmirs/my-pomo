import { DropdownMenu, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { Moon, Settings, WallpaperIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import DarkmodeToggle from "../navbar/theme-toggle";
import Link from "next/link";

export default function SettingDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 w-9 rounded-full">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 flex flex-col gap-2">
        <DropdownMenuLabel className="text-xs font-medium">Preferences</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span>Theme</span>
          </div>
          <DarkmodeToggle />
        </DropdownMenuItem>

        <Link href="/wallpaper">
          <DropdownMenuItem className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <WallpaperIcon />
              <span>Wallaper</span>
            </div>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
