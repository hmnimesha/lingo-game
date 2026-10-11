
const RULES = [
  {
    letter: "A",
    color: "correct",
    title: "Spot on!",
    description: "Correct letter, correct spot.",
  },
  {
    letter: "B",
    color: "present",
    title: "Almost there",
    description: "Right letter, wrong spot.",
  },
  {
    letter: "C",
    color: "absent",
    title: "Not this time",
    description: "This letter isn't in the word.",
  },
];

export default function GameInstructions() {
  return (
    <div className="info-card">
      <div className="info-icon">✦</div>
      <h3>How to play</h3>
      <p>Guess the hidden five-letter word in six attempts.</p>

      {RULES.map((rule) => (
        <div className="legend-item" key={rule.color}>
          <span className={`legend-tile legend-${rule.color}`}>
            {rule.letter}
          </span>
          <div>
            <strong>{rule.title}</strong>
            <span>{rule.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
