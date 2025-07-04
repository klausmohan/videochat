import { LoaderIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const PageLoader = () => {
  const { theme } = useThemeStore();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-base-100 transition-colors duration-300"
      data-theme={theme}
    >
      <div className="flex flex-col items-center space-y-3 text-center">
        <LoaderIcon className="animate-spin size-12 text-primary drop-shadow-md" />
        <p className="text-sm text-base-content opacity-60 tracking-wide animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
