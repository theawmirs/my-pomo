import Link from "next/link";
import AccountDropdown from "../user/account-dropdown";
import SettingDropdown from "../app/setting-dropdown";

export default async function AppNavbar() {
  return (
    <div className="flex justify-between w-full px-8 py-4">
      <Link href="/pomodoro" className="flex items-center gap-3 cursor-pointer group transition-all duration-300">
        <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold tracking-wide text-primary flex items-center">
          MY{" "}
          <span className="text-stone-700 ml-1 relative group-hover:text-primary/80 transition-colors">
            POMO
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </span>
        </h2>
      </Link>
      <div className="flex items-center gap-2">
        <SettingDropdown />
        <AccountDropdown />
      </div>
    </div>
  );
}
