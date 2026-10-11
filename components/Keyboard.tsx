
import type { LetterStatus } from "@/lib/game";

type KeyboardProps = {
  onKeyPress: (key: string) => void;
  keyboardStatus: Record<string, LetterStatus>;
  disabled: boolean;
};

const KEY_ROWS = [
  "QWERTYUIOP",
  "ASDFGHJKL",
  "ZXCVBNM",
];

export default function Keyboard({
  onKeyPress,
  keyboardStatus,
  disabled,
}: KeyboardProps) {
  return (
    <div className="keyboard">
      {KEY_ROWS.map((line, index) => (
        <div className="keyboard-row" key={line}>
          {index === 2 && (
            <button
              className="key key-special"
              onClick={() => onKeyPress("ENTER")}
              disabled={disabled}
            >
              ENTER
            </button>
          )}

          {line.split("").map((letter) => (
            <button
              key={letter}
              className={[
                "key",
                keyboardStatus[letter]
                  ? `key-${keyboardStatus[letter]}`
                  : "",
              ].join(" ")}
              onClick={() => onKeyPress(letter)}
              disabled={disabled}
              aria-label={letter}
            >
              {letter}
            </button>
          ))}

          {index === 2 && (
            <button
              className="key key-special delete-key"
              onClick={() => onKeyPress("⌫")}
              disabled={disabled}
              aria-label="Delete letter"
            >
              ⌫
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
