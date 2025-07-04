import { BellIcon } from "lucide-react";

function NoNotificationsFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="size-20 rounded-full bg-base-300 flex items-center justify-center mb-6 shadow-inner">
        <BellIcon className="size-10 text-base-content opacity-40 animate-pulse" />
      </div>
      <h3 className="text-xl font-bold mb-2 tracking-tight">
        No notifications yet
      </h3>
      <p className="text-base-content opacity-70 max-w-sm text-sm leading-relaxed">
        You're all caught up! Friend requests and messages will show up here
        when you receive them.
      </p>
    </div>
  );
}

export default NoNotificationsFound;
