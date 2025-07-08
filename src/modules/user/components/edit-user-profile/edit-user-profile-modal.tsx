"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import React from "react";
import { User } from "@prisma/client";
import { EditUserProfileForm } from ".";

export function EditUserProfileModal({ user }: { user: User }) {
  const router = useRouter();

  return (
    <div>
      <Dialog open={true} onOpenChange={() => router.back()}>
        <DialogContent className="max-w-md">
          <DialogHeader className="space-y-2 mb-2">
            <DialogTitle className="text-2xl font-semibold">Edit Profile</DialogTitle>
            <DialogDescription>Manage your profile information and preferences.</DialogDescription>
          </DialogHeader>
          <EditUserProfileForm user={user} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
