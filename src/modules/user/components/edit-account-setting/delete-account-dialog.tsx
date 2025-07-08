"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useDeleteAccount } from "../../hooks/useDeleteAccount";

interface Pops {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteAccountDialog({ userId, open, onOpenChange }: Pops) {
  const { handleDelete, isPending } = useDeleteAccount(userId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and all associated data.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Button disabled={isPending} onClick={handleDelete} className="flex-1 rounded-sm" variant="destructive">
            {isPending ? "Deleting..." : "Delete Account"}
          </Button>
          <Button onClick={() => onOpenChange(false)} className="flex-1 rounded-sm" variant="outline">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
