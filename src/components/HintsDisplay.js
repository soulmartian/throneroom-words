const capitalInitial = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function HintsDisplay({ hints }) {
  return (
    <div className="HintsDisplay">
      {hints.map(({ type, value }, i) => (
        <div key={i} className={`hint hint-${type}`}>
          {capitalInitial(value)}.
        </div>
      ))}
    </div>
  );
}

export default HintsDisplay;
