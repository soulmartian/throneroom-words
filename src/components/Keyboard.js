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

    onKeyPress(key);
  };

  return (
    <div className="Keyboard">
      {LAYOUT.map((row, i) => (
        <div className="row" key={i}>
          {row.map(
            (key, j) =>
              (key === " " && <span key={j} className="spacer"></span>) || (
                <span
                  className="key"
                  key={j}
                  onMouseDown={() => handleKeyPress(key)}
                  // onTouchDown={() => handleKeyPress(key)}
                >
                  {(key === "<" && "⌫") || key}
                </span>
              )
          )}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
