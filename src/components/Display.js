const capitalInitial = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function Display({ hints, children }) {
  return (
    <div className="Display">
      {hints.map(({ type, value }, i) => (
        <div key={i} className={`hint hint-${type}`}>
          {capitalInitial(value)}.
        </div>
      ))}
      {children}
    </div>
  );
}

export default Display;
