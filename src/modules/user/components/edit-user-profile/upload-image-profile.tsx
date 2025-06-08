"use client";

import { Button } from "@/modules/ui-components/shadcn/ui/button";
import { Label } from "@/modules/ui-components/shadcn/ui/label";
import { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface Props {
  setUserImageUrl: (url: string) => void;
}

export default function UploadImageProfile({ setUserImageUrl }: Props) {
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setIsLoading(true);

    if (!inputFileRef.current?.files) {
      toast.error("No file selected");
      setIsLoading(false);
      return;
    }

    const file = inputFileRef.current.files[0];

    try {
      const fileExtension = file.name.split(".").pop();
      const newFileName = `my-pomo/profile-images/${uuidv4()}.${fileExtension}`;
      const newBlob = await upload(newFileName, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      setBlob(newBlob);
      setUserImageUrl(newBlob.url);
      toast.success("Image uploaded successfully!");
    } catch (uploadError) {
      toast.error((uploadError as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-primary">
          <CameraIcon className="h-4 w-4" />
          <h3 className="font-medium">Profile Image</h3>
        </div>
        <div className="flex items-center justify-between bg-muted/30 p-3 rounded-md">
          <Label htmlFor="file-input" className="text-stone-600 text-sm cursor-pointer">
            Choose a profile image
          </Label>

          <p className="text-xs text-stone-500">
            {blob ? "Image uploaded successfully!" : isLoading ? "Uploading..." : "No image selected"}
          </p>
          <input onChange={handleSubmit} type="file" ref={inputFileRef} id="file-input" className="hidden" />
        </div>
      </div>
      {blob && (
        <div className="flex items-center">
          <Image src={blob.url} alt="profile-image" width={100} height={100} className="rounded-sm" />
        </div>
      )}
    </>
  );
}
