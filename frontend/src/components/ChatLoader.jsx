import { LoaderIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

function ChatLoader() {
  const { theme } = useThemeStore();

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center gap-4 p-6"
      data-theme={theme}
    >
      <div className="animate-spin rounded-full p-4 border-4 border-primary border-t-transparent">
        <LoaderIcon className="size-8 text-primary" />
      </div>
      <p className="text-center text-base sm:text-lg font-semibold text-base-content opacity-80">
        Connecting to chat...
      </p>
    </div>
  );
}

export default ChatLoader;
