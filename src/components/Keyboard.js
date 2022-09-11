import { playSound, SOUND_KEY } from "../sounds";

const LAYOUT = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  [" ", "a", "s", "d", "f", "g", "h", "j", "k", "l"],
  [" ", " ", "z", "x", "c", "v", "b", "n", "m", "<"],
];

function Keyboard({ onKeyPress, disabled }) {
  const handleKeyPress = (key) => {
    if (disabled) {
      return;
    }
    playSound(SOUND_KEY);
    onKeyPress(key);
  };

  return (
    <div className="Keyboard">
      {LAYOUT.map((row, i) => (
        <div className="row" key={i}>
          {row.map(
            (key, j) =>
              (key === " " && <span key={j} className="spacer"></span>) || (
                <div
                  className="key"
                  key={j}
                  onPointerDown={() => handleKeyPress(key)}
                >
                  <span className="key-inner">
                    {(key === "<" && "⌫") || key}
                  </span>
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
