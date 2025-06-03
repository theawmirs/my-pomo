"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/modules/ui-components/shadcn/ui/dialog";
import { useRouter } from "next/navigation";
import React from "react";
import EditUserProfileForm from "./edit-user-profile-form";
import { User } from "@prisma/client";

export default function EditUserProfileModal({ user }: { user: User }) {
  const router = useRouter();

  return (
    <div>
      <Dialog open onOpenChange={() => router.back()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <EditUserProfileForm user={user} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
