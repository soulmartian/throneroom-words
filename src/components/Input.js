function Input({ maxLength, keys, hintedKeys, isCorrect }) {
  return (
    <div className={`Input${(isCorrect && " input-correct") || ""}`}>
      {[...Array(maxLength)].map((_, i) => (
        <div
          className={`key key-${
            (keys[i] && "full") ||
            (!keys[i + 1] && (i === 0 || keys[i - 1]) && "cursor") ||
            "empty"
          }`}
          key={i}
        >
          <span className="inner-key">{keys[i]}</span>
          {hintedKeys[i] && <span className="help">{hintedKeys[i]}</span>}
        </div>
      ))}
    </div>
  );
}

export default Input;
