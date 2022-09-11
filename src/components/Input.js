function Input({ maxLength, keys, hintedKeys, isCorrect }) {
  return (
    <div className={`Input${(isCorrect && " input-correct") || ""}`}>
      {[...Array(maxLength)].map((_, i) => {
        if (keys[i]) {
          return (
            <span className="key key-full" key={i}>
              {keys[i]}
            </span>
          );
        }

        if (hintedKeys[i]) {
          return (
            <span className="key key-hint" key={i}>
              {hintedKeys[i]}
            </span>
          );
        }

        return <span className="key key-empty" key={i}></span>
      })}
    </div>
  );
}

export default Input;
