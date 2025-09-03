import { useThemeStore } from "../store/themeStore";

export const PageLoader = () => {
  const { theme } = useThemeStore();
  return (
    <div
      className="h-screen flex items-center justify-center"
      data-theme={theme}
    >
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
};
