import type { TestStatus } from "../types/test";

interface TimerProps {
  elapsed: number;
  limit: number;
  status: TestStatus;
}

export function Timer({ elapsed, limit, status }: TimerProps) {
  const remaining = Math.max(0, limit - elapsed);
  return (
    <div className="timer" aria-label="Timer">
      <span>{status === "running" ? remaining : limit}</span>
      <small>{status === "running" ? "seconds left" : "seconds"}</small>
    </div>
  );
}
