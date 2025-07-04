import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between w-full">
          {/* LOGO (only for chat page) */}
          {isChatPage ? (
            <Link to="/" className="flex items-center gap-2.5">
              <ShipWheelIcon className="size-8 text-primary" />
              <span className="text-2xl sm:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Streamify
              </span>
            </Link>
          ) : (
            <div />
          )}

          {/* Right side controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Notifications */}
            <Link
              to="/notifications"
              className="tooltip"
              data-tip="Notifications"
            >
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-5 w-5 text-base-content opacity-70" />
              </button>
            </Link>

            {/* Theme Selector */}
            <ThemeSelector />

            {/* Avatar */}
            <div className="avatar">
              <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={authUser?.profilePic} alt="User Avatar" />
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={logoutMutation}
              className="btn btn-ghost btn-circle tooltip"
              data-tip="Logout"
            >
              <LogOutIcon className="h-5 w-5 text-error opacity-70 hover:text-error-content transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
