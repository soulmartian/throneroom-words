function Input({ maxLength, keys, hintedKeys}) {
  return (
    <div className="Input">
      {keys.map((key, i) => (
        <span key={i}>{key} </span>
      ))}
      {[...Array(maxLength - keys.length)].map((_, i) => {
        const io = i + keys.length;
        return (
          <span
            key={i}
            style={{
              color: `${(io < hintedKeys.length && "gray") || "unset"}`,
            }}
          >
            {(io < hintedKeys.length && hintedKeys[io]) || "_"}{" "}
          </span>
        );
      })}
    </div>
  );
}

export default Input;
