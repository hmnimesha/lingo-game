
import type { LetterStatus } from "@/lib/game";

type GameRow = {
  word: string;
  statuses: LetterStatus[];
};

type GameBoardProps = {
  rows: GameRow[];
};

export default function GameBoard({ rows }: GameBoardProps) {
  return (
    <div className="board" aria-label="Word guessing board">
      {rows.map((row, rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {Array.from({ length: 5 }, (_, colIndex) => {
            const letter = row.word[colIndex];
            const status = row.statuses[colIndex];

            return (
              <div
                key={colIndex}
                className={[
                  "tile",
                  status !== "empty" ? `tile-${status}` : "",
                  letter?.trim() ? "tile-filled" : "",
                ].join(" ")}
              >
                {letter?.trim()}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
