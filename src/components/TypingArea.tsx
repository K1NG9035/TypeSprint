import { useEffect, useRef } from "react";
import type { TestStatus } from "../types/test";

interface TypingAreaProps {
  passage: string;
  typed: string;
  status: TestStatus;
  onTyping: (value: string) => void;
  onRestart: () => void;
}

export function TypingArea({
  passage,
  typed,
  status,
  onTyping,
  onRestart,
}: TypingAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="typing-shell" onClick={() => inputRef.current?.focus()}>
      <div className="typing-area" aria-label="Typing passage">
        {passage.split("").map((character, index) => {
          const typedCharacter = typed[index];
          const state =
            typedCharacter === undefined
              ? "pending"
              : typedCharacter === character
                ? "correct"
                : "incorrect";
          return (
            <span className={state} key={`${index}-${character}`}>
              {character}
            </span>
          );
        })}
      </div>
      <input
        ref={inputRef}
        className="typing-input"
        value={typed}
        onChange={(event) => onTyping(event.target.value)}
        onKeyDown={(event) => {
          if (
            event.key === "Escape" ||
            (event.key === "Enter" && status === "finished")
          ) {
            event.preventDefault();
            onRestart();
          }
        }}
        aria-label="Type the passage"
        autoComplete="off"
        spellCheck={false}
      />
      <p className="typing-hint">
        {status === "finished"
          ? "Test complete. Press Enter or Escape to restart."
          : "Click here and start typing"}
      </p>
    </div>
  );
}
