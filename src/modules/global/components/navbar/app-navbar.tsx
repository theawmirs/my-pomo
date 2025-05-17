import { auth } from "@/lib/auth/auth";
import AccountDropdown from "../../user/account-dropdown";
import DarkmodeToggle from "./theme-toggle";
import SettingDropdown from "../app/setting-dropdown";

const AppNavbar = async () => {
  const session = await auth();
  return (
    <div className="flex justify-between w-full px-8 py-4">
      <h2 className="text-2xl font-bold tracking-wide text-primary">
        MY <span className="text-stone-700">POMO</span>
      </h2>
      <div className="flex items-center gap-2">
        <SettingDropdown />
        <AccountDropdown />
        {!session && <DarkmodeToggle />}
      </div>
    </div>
  );
};

export default AppNavbar;
