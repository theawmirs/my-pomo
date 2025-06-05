"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/modules/ui-components/shadcn/ui/dialog";
import { useRouter } from "next/navigation";

export default function WallpaperDialog() {
  const router = useRouter();

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="flex flex-col items-center justify-center">
        <DialogHeader>
          <DialogTitle>Wallpaper</DialogTitle>
          <DialogDescription>Change the wallpaper of your app</DialogDescription>
        </DialogHeader>
        <div className="text-center py-4">
          <p className="text-lg font-semibold">Coming Soon</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
