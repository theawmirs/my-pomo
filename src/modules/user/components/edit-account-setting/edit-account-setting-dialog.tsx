"use client";

import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/modules/ui-components/shadcn/ui/dialog";
import { Dialog } from "@/modules/ui-components/shadcn/ui/dialog";
import { Input } from "@/modules/ui-components/shadcn/ui/input";
import { Label } from "@/modules/ui-components/shadcn/ui/label";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEditAccountDetails } from "../../hooks/useEditAccountDetails";
import { Switch } from "@/modules/ui-components/shadcn/ui/switch";
import { LockIcon, MailIcon, EyeIcon, TrashIcon, Loader } from "lucide-react";
import DeleteAccountDialog from "./delete-account-dialog";
import { useState } from "react";
import { changeProfileVisibilityAction } from "../../actions/user.actions";
import { toast } from "sonner";
interface Props {
  user: User;
}

export function EditAccountSettingDialog({ user }: Props) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(user.isProfilePublic);

  const router = useRouter();

  const { handleSubmit, formRef, isPending, handleCancelClick, errors, register } = useEditAccountDetails({
    userId: user.id,
  });

  const handleChangeProfileVisibility = async () => {
    const previousState = isPublic;
    setIsPublic((prev) => !prev);
    setIsLoading(true);

    try {
      const res = await changeProfileVisibilityAction(user.id);

      if (res.success) {
        toast.success(res.message);
      } else {
        setIsPublic(previousState);
        toast.error(res.message);
      }
    } catch (error) {
      setIsPublic(previousState);
      toast.error("An error occurred while changing profile visibility.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={true} onOpenChange={() => router.back()}>
        <DialogContent className="max-w-md">
          <DialogHeader className="space-y-2 mb-2">
            <DialogTitle className="text-2xl font-semibold">Account Settings</DialogTitle>
            <DialogDescription>Manage your account settings and preferences.</DialogDescription>
          </DialogHeader>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Email Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <MailIcon className="h-4 w-4" />
                <h3 className="font-medium">Email Address</h3>
              </div>
              <Input className="bg-muted/30 text-stone-600" disabled defaultValue={user.email} />
            </div>

            {/* Password Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <LockIcon className="h-4 w-4" />
                <h3 className="font-medium">Change Password</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <Input
                    {...register("currentPassword")}
                    type="password"
                    id="currentPassword"
                    placeholder="Current password"
                    className="mb-1"
                  />
                  {errors?.currentPassword && <p className="text-red-500 text-xs">{errors?.currentPassword.message}</p>}
                </div>

                <div>
                  <Input
                    {...register("newPassword")}
                    type="password"
                    id="newPassword"
                    placeholder="New password"
                    className="mb-1"
                  />
                  {errors?.newPassword && <p className="text-red-500 text-xs">{errors?.newPassword.message}</p>}
                </div>

                <div>
                  <Input
                    {...register("repeatNewPassword")}
                    type="password"
                    id="repeatNewPassword"
                    placeholder="Repeat new password"
                    className="mb-1"
                  />
                  {errors?.repeatNewPassword && (
                    <p className="text-red-500 text-xs">{errors?.repeatNewPassword.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Visibility Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <EyeIcon className="h-4 w-4" />
                <h3 className="font-medium">Profile Visibility</h3>
              </div>
              <div className="flex items-center justify-between bg-muted/30 p-3 rounded-md">
                <Label className="text-stone-600 text-sm">Profile visibility</Label>
                <div className="flex items-center gap-2">
                  <Switch
                    className="cursor-pointer"
                    checked={isPublic}
                    onCheckedChange={() => handleChangeProfileVisibility()}
                    disabled={isLoading}
                  />
                  {!isLoading && <p className="text-sm text-stone-600">{isPublic ? "Public" : "Private"}</p>}
                  {isLoading && <Loader className="w-4 h-4 animate-spin" />}
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="space-y-3 pt-2 border-t border-gray-200">
              <div className="flex items-center gap-2 text-destructive">
                <TrashIcon className="h-4 w-4" />
                <h3 className="font-medium">Danger Zone</h3>
              </div>
              <Button
                className="rounded-sm w-full text-destructive hover:text-white hover:bg-destructive/90"
                variant="outline"
                type="button"
                onClick={() => setOpen(true)}
              >
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button disabled={isPending} className="flex-1 rounded-md" type="submit">
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
              <Button onClick={handleCancelClick} className="flex-1 rounded-md" variant="outline" type="button">
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* DELETE ACCOUNT DIALOG */}
      <DeleteAccountDialog userId={user.id} open={open} onOpenChange={setOpen} />
    </div>
  );
}
