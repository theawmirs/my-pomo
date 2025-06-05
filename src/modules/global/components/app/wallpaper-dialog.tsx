"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/modules/ui-components/shadcn/ui/dialog";
import { useRouter } from "next/navigation";
import useWallpaperStore from "../../store/wallpaper.store";

export default function WallpaperDialog() {
  const router = useRouter();
  const { setWallpaper } = useWallpaperStore();

  const wallpaperOptions = [
    { name: "default", value: "default", class: "" },
    { name: "Red", value: "red", class: "bg-red-500" },
    { name: "Green", value: "green", class: "bg-green-500" },
    { name: "Blue", value: "blue", class: "bg-blue-500" },
  ];

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="flex flex-col items-center justify-center max-w-md">
        <DialogHeader className="w-full">
          <DialogTitle className="text-xl font-bold">Wallpaper</DialogTitle>
          <DialogDescription>Personalize your app with a new background color</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 w-full max-h-96 overflow-y-auto p-2">
          {wallpaperOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                setWallpaper(option.class);
              }}
              className={`relative w-full h-24 ${option.class} rounded-md cursor-pointer transition-all hover:scale-105 flex items-center justify-center shadow-sm`}
            >
              <span className="text-xs font-medium text-white drop-shadow-md">{option.name}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
