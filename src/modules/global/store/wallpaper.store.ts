import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WallpaperStore {
  wallpaper: string;
  setWallpaper: (wallpaper: string) => void;
}

const useWallpaperStore = create<WallpaperStore>()(
  persist(
    (set) => ({
      wallpaper: "",
      setWallpaper: (wallpaper) => set({ wallpaper }),
    }),
    {
      name: "wallpaper-storage",
    }
  )
);

export default useWallpaperStore;
