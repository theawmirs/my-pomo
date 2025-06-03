"use client";

import { LoginForm } from "@/modules/auth/login/components/login-form";
import { authStore } from "@/modules/auth/stores/auth.store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/modules/ui-components/shadcn/ui/dialog";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthModal() {
  const { isAuthenticated } = authStore();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.back();
    }
  }, [isAuthenticated, router]);

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>MyPomo Auth</DialogTitle>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
