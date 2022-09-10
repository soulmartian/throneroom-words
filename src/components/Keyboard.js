const LAYOUT = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "<"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

function Keyboard({ onKeyPress, disabled }) {
  return (
    <div className="Keyboard">
      {LAYOUT.map((row, i) => (
        <div key={i}>
          {row.map((key, j) => (
            <button disabled={disabled} key={j} onClick={() => onKeyPress(key)}>
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
