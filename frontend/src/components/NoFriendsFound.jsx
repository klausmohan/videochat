import { UsersIcon } from "lucide-react";

const NoFriendsFound = () => {
  return (
    <div className="card bg-base-200 p-8 text-center shadow-md animate-fade-in rounded-2xl">
      <div className="flex items-center justify-center mb-4">
        <div className="size-16 rounded-full bg-base-300 flex items-center justify-center shadow-inner">
          <UsersIcon className="size-8 text-base-content opacity-40 animate-pulse" />
        </div>
      </div>
      <h3 className="font-semibold text-xl mb-2 tracking-tight">
        No friends yet
      </h3>
      <p className="text-base-content opacity-70 max-w-md mx-auto text-sm leading-relaxed">
        Connect with language partners below and start your conversation journey
        today!
      </p>
    </div>
  );
};

export default NoFriendsFound;
