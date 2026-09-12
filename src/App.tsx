import { useCallback, useEffect, useState } from "react";
import { HistoryList } from "./components/HistoryList";
import { ModeSelector } from "./components/ModeSelector";
import { ResultsPanel } from "./components/ResultsPanel";
import { Timer } from "./components/Timer";
import { TypingArea } from "./components/TypingArea";
import { useLocalHistory } from "./hooks/useLocalHistory";
import { useTypingTest } from "./hooks/useTypingTest";
import type { Result, TestMode } from "./types/test";

function App() {
  const [mode, setMode] = useState<TestMode>({
    kind: "timed",
    value: 30,
    style: "words",
  });
  const [lastResult, setLastResult] = useState<Result | null>(null);
  const { history, addResult } = useLocalHistory();
  const handleFinish = useCallback(
    (result: Result) => {
      setLastResult(result);
      addResult(result);
    },
    [addResult],
  );
  const test = useTypingTest(mode, handleFinish);

  useEffect(() => {
    const restart = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" ||
        (event.key === "Enter" && test.status === "finished")
      ) {
        event.preventDefault();
        test.reset();
      }
    };
    window.addEventListener("keydown", restart);
    return () => window.removeEventListener("keydown", restart);
  }, [test.reset, test.status]);

  const selectMode = (nextMode: TestMode) => {
    setMode(nextMode);
    setLastResult(null);
  };
  const timerLimit =
    mode.kind === "timed" ? mode.value : Math.max(60, mode.value * 6);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">TS</span>
          <span>TypeSprint</span>
        </div>
        <div className="header-note">A small daily practice</div>
      </header>
      <section className="hero-copy">
        <p className="eyebrow">Typing speed test</p>
        <h1>Find your rhythm.</h1>
        <p>Clear the noise. Put your fingers to work.</p>
      </section>
      <ModeSelector mode={mode} onChange={selectMode} />
      <section className="test-card">
        <div className="test-toolbar">
          <Timer
            elapsed={test.elapsed}
            limit={timerLimit}
            status={test.status}
          />
          <button
            className="restart-button"
            onClick={test.reset}
            aria-label="Restart test"
          >
            ↻ <span>Restart</span>
          </button>
        </div>
        <TypingArea
          passage={test.passage}
          typed={test.typed}
          status={test.status}
          onTyping={test.handleTyping}
          onRestart={test.reset}
        />
        <ResultsPanel
          result={lastResult}
          live={test.metrics}
          status={test.status}
          onRestart={test.reset}
        />
      </section>
      <HistoryList history={history} />
      <footer>
        <span>TYPE SPRINT / v1</span>
        <span>Runs locally in your browser</span>
      </footer>
    </main>
  );
}

export default App;
