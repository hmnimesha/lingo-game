
export type LetterStatus =
  | "correct"
  | "present"
  | "absent"
  | "empty";

export function getFeedback(
  guess: string,
  answer: string
): LetterStatus[] {
  const result: LetterStatus[] = Array(5).fill("absent");
  const remaining = answer.split("");

  // Find correctly positioned letters first.
  for (let i = 0; i < 5; i++) {
    if (guess[i] === answer[i]) {
      result[i] = "correct";
      remaining[i] = "";
    }
  }

  // Then find letters in the wrong positions.
  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;

    const index = remaining.indexOf(guess[i]);

    if (index !== -1) {
      result[i] = "present";
      remaining[index] = "";
    }
  }

  return result;
}
