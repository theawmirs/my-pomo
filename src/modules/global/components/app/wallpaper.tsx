"use client";

import useWallpaperStore from "../../store/wallpaper.store";

export default function Wallpaper() {
  const { wallpaper } = useWallpaperStore();

  return <div className={`absolute top-0 left-0 z-[-10] w-full h-full ${wallpaper}`}></div>;
}
