
type GameStatsProps = {
  played: number;
  wins: number;
};

export default function GameStats({
  played,
  wins,
}: GameStatsProps) {
  const winRate = played
    ? Math.round((wins / played) * 100)
    : 0;

  return (
    <div className="stats-card">
      <span className="section-label">YOUR PROGRESS</span>

      <div className="stats-grid">
        <div>
          <strong>{played}</strong>
          <span>Played</span>
        </div>

        <div>
          <strong>{winRate}%</strong>
          <span>Win rate</span>
        </div>
      </div>

      <div className="stats-note">
        <span>✧</span> Every word makes you sharper.
      </div>
    </div>
  );
}
