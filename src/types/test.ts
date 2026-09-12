export type TestStatus = "idle" | "running" | "finished";
export type ModeKind = "timed" | "words";

export interface TestMode {
  kind: ModeKind;
  value: number;
}

export interface Result {
  id: string;
  mode: TestMode;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  errors: number;
  consistency: number;
  duration: number;
  createdAt: string;
}

export interface Metrics {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  errors: number;
  consistency: number;
}
