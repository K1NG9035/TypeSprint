export type TestStatus = "idle" | "running" | "finished";
export type ModeKind = "timed" | "words";
export type PassageStyle = "words" | "punctuation" | "sentences";

export interface TestMode {
  kind: ModeKind;
  value: number;
  style: PassageStyle;
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
