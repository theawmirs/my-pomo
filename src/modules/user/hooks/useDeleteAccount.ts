"use client";

import { deleteUser } from "@/lib/db/actions/user/user.actions";
import { logout } from "@/modules/auth/login/actions/login.action";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const useDeleteAccount = (userId: string) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteUser(userId);
      toast.success("Account deleted successfully");
      await logout();
      router.back();
    });
  };

  return {
    handleDelete,
    isPending,
  };
};
