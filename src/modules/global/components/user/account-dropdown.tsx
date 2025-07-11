import { auth } from "@/lib/auth/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, User, UserCog } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SignoutButton from "./signout-button";
import { getUserById } from "@/lib/db/actions/user/user.actions";

export default async function AccountDropdown() {
  const session = await auth();

  let user;
  if (session?.user?.id) {
    user = await getUserById(session?.user?.id);
  }

  return (
    <div>
      {session ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.image || ""} alt="Profile" />
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
              <Link href={`/user/${session.user?.id}`}>
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href={`/account`}>
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  <UserCog className="h-4 w-4" />
                  <span>Account settings</span>
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <SignoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <Link href="/auth">
          <Button variant="outline" className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            <span>Sign in</span>
          </Button>
        </Link>
      )}
    </div>
  );
}
