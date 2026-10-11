
type HeaderProps = {
  onNewGame: () => void;
};

export default function Header({ onNewGame }: HeaderProps) {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Lingo home">
        <span className="brand-icon">L</span>
        <span>lingo<span className="brand-dot">.</span></span>
      </a>

      <div className="top-actions">
        <span className="level-pill">WORD GAME</span>
        <button
          className="icon-button"
          onClick={onNewGame}
          aria-label="Start a new game"
          title="New game"
        >
          ↻
        </button>
      </div>
    </header>
  );
}
