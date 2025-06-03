"use client";

import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { Input } from "@/modules/ui-components/shadcn/ui/input";
import { Label } from "@/modules/ui-components/shadcn/ui/label";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

export function EditUserProfileForm({ user }: { user: User }) {
  const router = useRouter();

  const handleCancelClick = () => {
    router.back();
  };
  return (
    <form>
      <div className="flex flex-col gap-2 mb-4">
        <Label>Name</Label>
        <Input defaultValue={user.name} />
      </div>
      <div className="flex gap-2 mt-4">
        <Button className="flex-1 rounded-sm" type="submit">
          Save
        </Button>
        <Button onClick={handleCancelClick} className="flex-1 rounded-sm" variant="destructive" type="button">
          Cancel
        </Button>
      </div>
    </form>
  );
}
