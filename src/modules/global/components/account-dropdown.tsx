import { auth } from "@/lib/auth/auth";
import { Button } from "@/modules/ui-components/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/ui-components/shadcn/ui/dropdown-menu";
import { LogIn, User, UserCog, Moon, LogOut } from "lucide-react";
import DarkmodeToggle from "./theme-toggle";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/modules/ui-components/shadcn/ui/avatar";
import { signOut } from "@/lib/auth/auth";
import { Badge } from "@/modules/ui-components/shadcn/ui/badge";
const AccountDropdown = async () => {
  const session = await auth();
  return (
    <div>
      {session ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={session.user?.image || ""} alt="Profile" />
                  <AvatarFallback className="bg-primary/10">
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.user?.image || ""} alt="Profile" />
                  <AvatarFallback className="bg-primary/10">
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium whitespace-nowrap">
                    {session.user?.name || "User"}
                    {/* <Badge className="bg-red-500 p-1">Pro</Badge> */}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{session.user?.email || ""}</p>
                </div>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuLabel className="text-xs font-medium">Account</DropdownMenuLabel>
              <Link href="/profile">
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/settings">
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  <UserCog className="h-4 w-4" />
                  <span>Account settings</span>
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />

              <DropdownMenuLabel className="text-xs font-medium">Preferences</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  <span>Theme</span>
                </div>
                <DarkmodeToggle />
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={async () => {
                  "use server";
                  await signOut();
                }}
                className="cursor-pointer flex items-center gap-2 text-destructive focus:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <button type="submit" className="w-full text-left">
                  Sign out
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <Link href="/auth/login">
          <Button variant="outline" className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            <span>Sign in</span>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default AccountDropdown;
