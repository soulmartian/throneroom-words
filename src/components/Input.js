function Input({ maxLength, keys, hintedKeys, isCorrect}) {
  return (
    <div className={`Input${isCorrect && " input-correct" || ""}`}>
      {keys.map((key, i) => (
        <span className="key key-full" key={i}>{key} </span>
      ))}
      {[...Array(maxLength - keys.length)].map((_, i) => {
        const io = i + keys.length;
        return (
          <span
            key={i}
            className={`key key-${(io < hintedKeys.length && "hint") || "empty"}`}
          >
            {(io < hintedKeys.length && hintedKeys[io]) || ""}
          </span>
        );
      })}
    </div>
  );
}

export default Input;
