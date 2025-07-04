import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="relative dropdown dropdown-end z-50">
      {/* DROPDOWN TRIGGER */}
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle hover:scale-105 active:scale-95 transition-transform duration-150"
        aria-label="Select Theme"
      >
        <PaletteIcon className="size-5 text-base-content" />
      </button>

      {/* DROPDOWN CONTENT */}
      <div
        tabIndex={0}
        className="dropdown-content mt-3 p-2 shadow-xl bg-base-100/80 backdrop-blur-lg rounded-2xl border border-base-300
          w-64 max-h-80 overflow-y-auto space-y-1 animate-fade-in transition-all"
      >
        {THEMES.map((themeOption) => {
          const isSelected = theme === themeOption.name;
          return (
            <button
              key={themeOption.name}
              onClick={() => setTheme(themeOption.name)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl 
                transition-colors group
                ${
                  isSelected
                    ? "bg-primary/10 text-primary font-semibold"
                    : "hover:bg-base-content/5 text-base-content"
                }`}
            >
              <div className="flex items-center gap-2">
                <PaletteIcon className="size-4 text-inherit" />
                <span className="text-sm truncate">{themeOption.label}</span>
              </div>
              {/* COLOR PREVIEW BUBBLES */}
              <div className="flex gap-1 ml-2">
                {themeOption.colors.map((color, i) => (
                  <span
                    key={i}
                    className="w-2.5 h-2.5 rounded-full border border-base-300"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelector;
