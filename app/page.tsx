
"use client";

import Header from "@/components/Header";
import GameBoard from "@/components/GameBoard";
import Keyboard from "@/components/Keyboard";
import GameInstructions from "@/components/GameInstructions";
import GameStats from "@/components/GameStats";
import { useLingoGame } from "@/hooks/useLingoGame";

export default function Home() {
  const game = useLingoGame();

  return (
    <main className="app">
      <Header onNewGame={game.startNewGame} />

      <section className="hero">
        <div className="eyebrow">
          <span className="sparkle">✦</span> A LITTLE WORD MAGIC
        </div>
        <h1>Let&apos;s play <span>Lingo.</span></h1>
        <p>
          Guess the five-letter word. You have six tries to crack the code.
        </p>
      </section>

      <section className="game-layout">
        <div className="game-card">
          <div className="game-heading">
            <div>
              <span className="section-label">YOUR CHALLENGE</span>
              <h2>Find the hidden word</h2>
            </div>

            <div className="attempt-badge">
              {Math.min(game.guesses.length + (game.gameOver ? 0 : 1), 6)}
              <span> / 6</span>
            </div>
          </div>

          <GameBoard rows={game.rows} />

          <div className="feedback" aria-live="polite">
            {game.message || "Take your time — every guess counts."}
          </div>

          {game.gameOver && (
            <button
              className="play-again"
              onClick={game.startNewGame}
            >
              Play again <span>→</span>
            </button>
          )}

          <Keyboard
            onKeyPress={game.pressKey}
            keyboardStatus={game.keyboardStatus}
            disabled={game.gameOver}
          />
        </div>

        <aside className="side-column">
          <GameInstructions />
          <GameStats
            played={game.stats.played}
            wins={game.stats.wins}
          />
        </aside>
      </section>

      <footer className="footer">
        <span>LINGO<span className="brand-dot">.</span></span>
        <span>One word at a time.</span>
      </footer>
    </main>
  );
}
