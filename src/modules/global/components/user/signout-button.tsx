"use client";

import { logout } from "@/modules/auth/login/actions/login.action";
import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SignoutButton() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  useEffect(() => {
    if (isLoggedOut) {
      toast.success("Logged out successfully");
      setIsLoggedOut(false);
    }
  }, [isLoggedOut]);
  return (
    <Button
      variant="destructive"
      type="submit"
      className="w-full text-left cursor-pointer rounded-sm"
      onClick={() => {
        logout();
        setIsLoggedOut(true);
      }}
    >
      Sign out
      <LogOut />
    </Button>
  );
}
