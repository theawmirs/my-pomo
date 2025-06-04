"use client";

import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/modules/ui-components/shadcn/ui/dialog";
import { Dialog } from "@/modules/ui-components/shadcn/ui/dialog";
import { Input } from "@/modules/ui-components/shadcn/ui/input";
import { Label } from "@/modules/ui-components/shadcn/ui/label";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEditAccountDetails } from "../../hooks/useEditAccountDetails";

interface Props {
  user: User;
}

export function EditAccountSettingDialog({ user }: Props) {
  const { handleSubmit, formRef, isPending, handleCancelClick, errors, register } = useEditAccountDetails({
    userId: user.id,
  });

  const router = useRouter();

  return (
    <div>
      <Dialog open={true} onOpenChange={() => router.back()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Account Settings</DialogTitle>
            <DialogDescription>Manage your account settings and preferences.</DialogDescription>
          </DialogHeader>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mb-4">
              <Label className="text-stone-600">Email: </Label>
              <Input className="text-stone-600" disabled defaultValue={user.email} />
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <Label>Password:</Label>
              <div className="flex flex-col gap-2">
                <Input
                  {...register("currentPassword")}
                  type="password"
                  id="currentPassword"
                  placeholder="Current password"
                />
                {errors?.currentPassword && <p className="text-red-500">{errors?.currentPassword.message}</p>}

                <Input {...register("newPassword")} type="password" id="newPassword" placeholder="New password" />
                {errors?.newPassword && <p className="text-red-500">{errors?.newPassword.message}</p>}
                <Input
                  {...register("repeatNewPassword")}
                  type="password"
                  id="repeatNewPassword"
                  placeholder="Repeat new password"
                />
                {errors?.repeatNewPassword && <p className="text-red-500">{errors?.repeatNewPassword.message}</p>}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button disabled={isPending} className="flex-1 rounded-sm" type="submit">
                {isPending ? "Saving..." : "Save"}
              </Button>
              <Button onClick={handleCancelClick} className="flex-1 rounded-sm" variant="destructive" type="button">
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
