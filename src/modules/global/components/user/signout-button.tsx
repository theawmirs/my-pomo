"use client";

import { logout } from "@/modules/auth/login/actions/login.action";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export default function SignoutButton() {
  return (
    <Button
      variant="destructive"
      type="submit"
      className="w-full text-left cursor-pointer rounded-sm"
      onClick={() => {
        logout();
        toast.success("Logged out successfully");
      }}
    >
      Sign out
      <LogOut />
    </Button>
  );
}
