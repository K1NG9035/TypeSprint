import type { TestMode } from "../types/test";

interface ModeSelectorProps {
  mode: TestMode;
  onChange: (mode: TestMode) => void;
}

const timedOptions = [15, 30, 60, 120];
const wordOptions = [10, 25, 50, 100];

export function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <section className="mode-selector" aria-label="Test mode">
      <div className="mode-tabs">
        <button
          className={mode.kind === "timed" ? "active" : ""}
          onClick={() => onChange({ ...mode, kind: "timed", value: 30 })}
        >
          Timed
        </button>
        <button
          className={mode.kind === "words" ? "active" : ""}
          onClick={() => onChange({ ...mode, kind: "words", value: 25 })}
        >
          Words
        </button>
      </div>
      <div className="mode-options">
        {(mode.kind === "timed" ? timedOptions : wordOptions).map((value) => (
          <button
            key={value}
            className={mode.value === value ? "selected" : ""}
            onClick={() => onChange({ ...mode, value })}
          >
            {value}
            {mode.kind === "timed" ? " sec" : " words"}
          </button>
        ))}
      </div>
      <div className="style-options" aria-label="Passage style">
        {(["words", "punctuation", "sentences"] as const).map((style) => (
          <button
            key={style}
            className={mode.style === style ? "selected" : ""}
            onClick={() => onChange({ ...mode, style })}
          >
            {style[0].toUpperCase() + style.slice(1)}
          </button>
        ))}
      </div>
    </section>
  );
}
