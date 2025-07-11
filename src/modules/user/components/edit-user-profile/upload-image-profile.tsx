"use client";

import { Button } from "@/components/ui/button";
import { CameraIcon, Loader2, Upload, X } from "lucide-react";
import { useUploadImageProfile } from "../../hooks/useUploadImageProfile";

interface Props {
  setUserImageUrl: (url: string) => void;
  setIsUploadingImage: (isUploading: boolean) => void;
  isUploadingImage: boolean;
}

export default function UploadImageProfile({ setUserImageUrl, setIsUploadingImage, isUploadingImage }: Props) {
  const { handleFileChange, handleUpload, resetImage, blob, previewUrl, inputFileRef } = useUploadImageProfile({
    setIsUploadingImage,
    setUserImageUrl,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-primary">
        <CameraIcon className="h-4 w-4" />
        <h3 className="font-medium">Profile Image</h3>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => inputFileRef.current?.click()}>
              <CameraIcon className="h-4 w-4 mr-2" />
              Select Image
            </Button>

            {previewUrl && !blob && (
              <Button type="button" variant="default" size="sm" onClick={handleUpload} disabled={isUploadingImage}>
                {isUploadingImage ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </>
                )}
              </Button>
            )}

            {previewUrl && (
              <Button type="button" variant="destructive" size="sm" onClick={resetImage}>
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            {isUploadingImage
              ? "Uploading..."
              : blob
              ? "Image uploaded successfully!"
              : "Recommended: Square image, at least 300x300px"}
          </p>

          <input
            type="file"
            ref={inputFileRef}
            id="file-input"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
