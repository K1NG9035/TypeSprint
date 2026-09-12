import type { Metrics, Result } from "../types/test";

interface ResultsPanelProps {
  result: Result | null;
  live: Metrics;
  status: string;
}

export function ResultsPanel({ result, live, status }: ResultsPanelProps) {
  const metrics = result ?? live;
  return (
    <section className="results-panel" aria-label="Typing results">
      <div>
        <strong>{metrics.wpm}</strong>
        <span>WPM</span>
      </div>
      <div>
        <strong>{metrics.accuracy}%</strong>
        <span>Accuracy</span>
      </div>
      <div>
        <strong>{metrics.rawWpm}</strong>
        <span>Raw WPM</span>
      </div>
      <div>
        <strong>{metrics.errors}</strong>
        <span>Errors</span>
      </div>
      <div>
        <strong>{metrics.consistency}%</strong>
        <span>Consistency</span>
      </div>
      {status === "finished" && (
        <p className="result-note">Result saved to your local history.</p>
      )}
    </section>
  );
}
