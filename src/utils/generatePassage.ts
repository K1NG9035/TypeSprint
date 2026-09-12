import { WORD_LIST } from "../data/wordLists";
import type { TestMode } from "../types/test";

export function generatePassage(mode: TestMode): string {
  const count =
    mode.kind === "words" ? mode.value : Math.max(160, mode.value * 3);
  const words = Array.from(
    { length: count },
    (_, index) => WORD_LIST[index % WORD_LIST.length],
  );
  return words.join(" ");
}
