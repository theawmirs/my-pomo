"use client";

import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { Input } from "@/modules/ui-components/shadcn/ui/input";
import { Label } from "@/modules/ui-components/shadcn/ui/label";
import { User } from "@prisma/client";
import { useEditUserProfile } from "../../hooks/useEditUserProfile";

export function EditUserProfileForm({ user }: { user: User }) {
  const { register, handleSubmit, errors, isPending, handleCancelClick, formRef } = useEditUserProfile({
    userId: user.id,
  });

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 mb-4">
        <Label>Name</Label>
        <Input defaultValue={user.name} {...register("name")} />
        {errors?.name && <p className="text-red-500">{errors?.name.message}</p>}
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
  );
}
