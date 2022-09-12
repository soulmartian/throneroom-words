import { useEffect } from "react";
import { useLocalStorage } from "../hooks";
import { playSound, SOUND_KEY } from "../sounds";

function Header({ levelNumber, hintCount, onUseHint }) {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  const handleUseHintClick = () => {
    playSound(SOUND_KEY);
    onUseHint();
  };

  const handleDarkModeClick = () => {
    playSound(SOUND_KEY);
    setDarkMode(!darkMode);
  };

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
      <div className="spacer"></div>
      <button onClick={handleUseHintClick}>
        <span>
          use hint
          <br />
          <strong>{("" + hintCount).padStart(4, "0")}</strong>
        </span>
        💡
      </button>
      <button onClick={handleDarkModeClick}>
        <span>
          {(darkMode && "light") || "dark"}
          <br />
          mode
        </span>
        {(darkMode && "☀️") || "🌙"}
      </button>
    </div>
  );
}

export default Header;
