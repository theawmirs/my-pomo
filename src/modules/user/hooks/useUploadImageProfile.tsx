import { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface Props {
  setIsUploadingImage: (isUploading: boolean) => void;
  setUserImageUrl: (url: string) => void;
}

export const useUploadImageProfile = ({ setIsUploadingImage, setUserImageUrl }: Props) => {
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Create a preview before uploading
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleUpload = async () => {
    setIsUploadingImage(true);

    if (!inputFileRef.current?.files?.length) {
      toast.error("No file selected");
      setIsUploadingImage(false);
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
      setIsUploadingImage(false);
    }
  };

  const resetImage = async () => {
    if (blob) {
      setIsDeleting(true);
      try {
        await fetch("/api/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: blob.url }),
        });

        setBlob(null);
        setUserImageUrl("");
        toast.success("Image removed");
      } catch (error) {
        toast.error("Failed to remove image.", {
          description: (error as Error).message,
        });
        return;
      } finally {
        setIsDeleting(false);
      }
    }

    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
    setPreviewUrl(null);
  };

  return {
    handleFileChange,
    handleUpload,
    resetImage,
    blob,
    previewUrl,
    inputFileRef,
    isDeleting,
  };
};
