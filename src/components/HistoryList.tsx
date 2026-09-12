import type { Result } from "../types/test";

interface HistoryListProps {
  history: Result[];
}

export function HistoryList({ history }: HistoryListProps) {
  return (
    <section className="history" aria-label="Recent results">
      <div className="section-heading">
        <h2>Recent runs</h2>
        <span>{history.length}/10 saved</span>
      </div>
      {history.length === 0 ? (
        <p className="empty-history">Your completed tests will appear here.</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div className="history-row" key={item.id}>
              <span>
                {item.mode.value}
                {item.mode.kind === "timed" ? " sec" : " words"}
              </span>
              <strong>{item.wpm} WPM</strong>
              <span>{item.accuracy}% accuracy</span>
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
