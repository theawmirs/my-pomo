"use client";
import DarkmodeToggle from "./theme-toggle";

const AppNavbar = () => {
  return (
    <div className="flex justify-between w-full px-8 py-4">
      <h2 className="text-2xl font-bold tracking-wide text-primary">
        MY <span className="text-stone-700">POMO</span>
      </h2>
      <DarkmodeToggle />
    </div>
  );
};

export default AppNavbar;
