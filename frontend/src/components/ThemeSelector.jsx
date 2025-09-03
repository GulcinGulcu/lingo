import { useThemeStore } from "../store/themeStore";
import { PaletteIcon } from "../../icons/PaletteIcon";
import { THEMES } from "../constants";

export const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="text-base-content opacity-70" />
      </button>
      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 w-60 max-h-80 overflow-y-auto bg-base-200 backdrop:blur-lg rounded-2xl border border-base-content/15 shadow-2xl"
      >
        <div className="space-y-1">
          {THEMES.map((themeData) => (
            <button
              key={themeData.name}
              onClick={() => setTheme(themeData.name)}
              className={`btn btn-ghost w-full flex items-center p-2 gap-2 ${
                theme === themeData.name ? "btn-active" : ""
              }`}
            >
              <PaletteIcon className="text-base-content opacity-70" />
              <span className="text-sm font-medium">{themeData.label}</span>
              <div className="ml-auto flex gap-1">
                {themeData.colors.map((color, i) => (
                  <span
                    key={i}
                    className="rounded-full size-2"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
