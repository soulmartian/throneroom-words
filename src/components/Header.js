import { useEffect } from "react";
import { useLocalStorage } from "../hooks";

function Header({ levelNumber }) {
  const [darkMode, setDarkMode] = useLocalStorage("DARK_MODE", false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className="Header">
      <span>#{("" + levelNumber).padStart(4, "0")}</span>
      <button onClick={() => setDarkMode(!darkMode)}>
        <span>{(darkMode && "light") || "dark"}<br />mode</span>
        {(darkMode && "☀️") || "🌙"}
      </button>
    </div>
  );
}

export default Header;
