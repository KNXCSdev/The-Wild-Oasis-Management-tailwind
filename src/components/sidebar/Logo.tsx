import { useDarkMode } from "../../context/DarkModeContext";

export default function Logo() {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="flex w-full justify-center">
      <img
        src={`/logo-${isDarkMode ? "dark" : "light"}.png`}
        alt="The Wild Oasis Logo"
        loading="lazy"
        className="h-42 w-auto max-w-full"
      />
    </div>
  );
}
