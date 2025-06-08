"use client";

import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { Input } from "@/modules/ui-components/shadcn/ui/input";
import { User } from "@prisma/client";
import { useEditUserProfile } from "../../hooks/useEditUserProfile";
import { UserIcon, AtSignIcon, Loader2 } from "lucide-react";
import UploadImageProfile from "./upload-image-profile";
import { useEffect, useState } from "react";

export function EditUserProfileForm({ user }: { user: User }) {
  const { register, handleSubmit, errors, isPending, handleCancelClick, formRef } = useEditUserProfile({
    userId: user.id,
  });
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Name Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-primary">
          <UserIcon className="h-4 w-4" />
          <h3 className="font-medium">Your Name</h3>
        </div>
        <div>
          <Input defaultValue={user.name} {...register("name")} className="mb-1" />
          {errors?.name && <p className="text-red-500 text-xs">{errors?.name.message}</p>}
        </div>
      </div>

      {/* Username Section - if this field exists in your model */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-primary">
          <AtSignIcon className="h-4 w-4" />
          <h3 className="font-medium">Username</h3>
        </div>
        <Input className="bg-muted/30 text-stone-600" disabled defaultValue={user.email?.split("@")[0] || "username"} />
      </div>

      {/* Profile Image Section - placeholder for future feature */}
      <UploadImageProfile
        setUserImageUrl={setUserImageUrl}
        setIsUploadingImage={setIsUploadingImage}
        isUploadingImage={isUploadingImage}
      />
      <input type="hidden" {...register("imageUrl")} value={userImageUrl || ""} />

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button disabled={isPending || isUploadingImage} className="flex-1 rounded-md" type="submit">
          {isPending ? "Saving..." : isUploadingImage ? "Uploading..." : "Save Changes"}
          {isUploadingImage && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
        </Button>
        <Button onClick={handleCancelClick} className="flex-1 rounded-md" variant="outline" type="button">
          Cancel
        </Button>
      </div>
    </form>
  );
}
