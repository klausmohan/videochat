import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    {
      label: "Home",
      to: "/",
      icon: <HomeIcon className="size-5" />,
    },
    {
      label: "Friends",
      to: "/friends",
      icon: <UsersIcon className="size-5" />,
    },
    {
      label: "Notifications",
      to: "/notifications",
      icon: <BellIcon className="size-5" />,
    },
  ];

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0 z-40 shadow-md">
      {/* LOGO */}
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5 group">
          <ShipWheelIcon className="size-9 text-primary group-hover:rotate-6 transition-transform" />
          <span className="text-3xl font-bold font-mono bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text tracking-wide group-hover:scale-105 transition-transform duration-200">
            Streamify
          </span>
        </Link>
      </div>

      {/* NAVIGATION LINKS */}
      <nav className="flex-1 p-4 space-y-1">
        {navLinks.map((item) => {
          const isActive = currentPath === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`btn btn-ghost justify-start w-full gap-3 px-3 rounded-xl normal-case transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:bg-base-content/5"
              }`}
            >
              <span
                className={`${
                  isActive ? "text-primary" : "text-base-content opacity-70"
                }`}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* USER FOOTER */}
      <div className="p-4 border-t border-base-300 mt-auto bg-base-100">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm truncate">
              {authUser?.fullName}
            </p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block animate-pulse" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
