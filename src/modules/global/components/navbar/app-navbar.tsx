import Link from "next/link";
import AccountDropdown from "../user/account-dropdown";
import SettingDropdown from "../app/setting-dropdown";

export default async function AppNavbar() {
  return (
    <div className="flex justify-between w-full px-8 py-4">
      <Link href="/pomodoro" className="flex items-center gap-2 cursor-pointer">
        <h2 className="text-2xl font-bold tracking-wide text-primary">
          MY <span className="text-stone-700">POMO</span>
        </h2>
      </Link>
      <div className="flex items-center gap-2">
        <SettingDropdown />
        <AccountDropdown />
      </div>
    </div>
  );
}
