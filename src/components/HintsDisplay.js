function HintsDisplay({ hints }) {
  return (
    <div className="HintsDisplay">
      {hints.map(({ type, value }, i) => (
        <div
          key={i}
          style={{ backgroundColor: `${{ definition: "aqua", example: "lime" }[type]}` }}
        >{value}</div>
      ))}
    </div>
  );
}

export default HintsDisplay;
