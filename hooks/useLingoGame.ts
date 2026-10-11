
"use client";

import { useCallback, useEffect, useState } from "react";
import { WORDS, WORD_LENGTH, MAX_TRIES } from "@/lib/words";
import { getFeedback, LetterStatus } from "@/lib/game";

export function useLingoGame() {
  const [answer, setAnswer] = useState(() =>
    WORDS[Math.floor(Math.random() * WORDS.length)]
  );
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [message, setMessage] = useState("");
  const [won, setWon] = useState(false);
  const [stats, setStats] = useState({ played: 0, wins: 0 });

  const gameOver = won || guesses.length >= MAX_TRIES;

  const startNewGame = useCallback(() => {
    setAnswer((previous) => {
      const choices = WORDS.filter((word) => word !== previous);
      return choices[Math.floor(Math.random() * choices.length)];
    });

    setGuesses([]);
    setCurrent("");
    setMessage("");
    setWon(false);
  }, []);

  const submitGuess = useCallback(() => {
    if (gameOver) return;

    if (current.length !== WORD_LENGTH) {
      setMessage("Enter a 5-letter word first.");
      return;
    }

    const guess = current.toUpperCase();
    const nextGuesses = [...guesses, guess];

    setGuesses(nextGuesses);
    setCurrent("");

    if (guess === answer) {
      setWon(true);
      setMessage("Brilliant! You found the word!");
      setStats((s) => ({
        played: s.played + 1,
        wins: s.wins + 1,
      }));
    } else if (nextGuesses.length === MAX_TRIES) {
      setMessage(`Game over! The word was ${answer}.`);
      setStats((s) => ({ ...s, played: s.played + 1 }));
    } else {
      setMessage("");
    }
  }, [answer, current, gameOver, guesses]);

  const pressKey = useCallback(
    (key: string) => {
      if (gameOver) return;

      if (key === "ENTER") {
        submitGuess();
      } else if (key === "⌫") {
        setCurrent((value) => value.slice(0, -1));
        setMessage("");
      } else if (/^[A-Z]$/.test(key)) {
        setCurrent((value) =>
          value.length < WORD_LENGTH ? value + key : value
        );
        setMessage("");
      }
    },
    [gameOver, submitGuess]
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (/^[a-zA-Z]$/.test(event.key)) {
        pressKey(event.key.toUpperCase());
      } else if (event.key === "Enter") {
        pressKey("ENTER");
      } else if (event.key === "Backspace") {
        pressKey("⌫");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pressKey]);

  const keyboardStatus: Record<string, LetterStatus> = {};

  guesses.forEach((guess) => {
    getFeedback(guess, answer).forEach((status, index) => {
      const letter = guess[index];
      const priority: Record<LetterStatus, number> = {
        empty: 0,
        absent: 1,
        present: 2,
        correct: 3,
      };

      if (
        !keyboardStatus[letter] ||
        priority[status] > priority[keyboardStatus[letter]]
      ) {
        keyboardStatus[letter] = status;
      }
    });
  });

  return {
    answer,
    guesses,
    current,
    message,
    won,
    gameOver,
    stats,
    keyboardStatus,
    rows: Array.from({ length: MAX_TRIES }, (_, index) => {
      const guess = guesses[index];

      if (guess) {
        return {
          word: guess,
          statuses: getFeedback(guess, answer),
        };
      }

      if (index === guesses.length && !gameOver) {
        return {
          word: current.padEnd(WORD_LENGTH, " "),
          statuses: Array(WORD_LENGTH).fill("empty") as LetterStatus[],
        };
      }

      return {
        word: " ".repeat(WORD_LENGTH),
        statuses: Array(WORD_LENGTH).fill("empty") as LetterStatus[],
      };
    }),
    pressKey,
    startNewGame,
  };
}
