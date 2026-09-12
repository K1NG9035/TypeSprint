import { describe, expect, it } from "vitest";
import { generatePassage } from "../src/utils/generatePassage";
import type { TestMode } from "../src/types/test";

const timedWords: TestMode = { kind: "timed", value: 15, style: "words" };

 describe("generatePassage", () => {
  it("creates a different passage when the same test is restarted", () => {
    const first = generatePassage(timedWords);
    const second = generatePassage(timedWords);
    expect(second).not.toBe(first);
  });

  it("includes symbols and punctuation in punctuation mode", () => {
    const passage = generatePassage({ kind: "words", value: 10, style: "punctuation" });
    expect(passage).toMatch(new RegExp("[@#$%&*()+=/]"));
    expect(passage).toMatch(/[.,!?;:'"-]/);
  });

  it("creates capitalized sentences with terminal punctuation", () => {
    const passage = generatePassage({ kind: "words", value: 10, style: "sentences" });
    expect(passage).toMatch(/^[A-Z]/);
    expect(passage).toMatch(/[.!?]$/);
    expect(passage).toMatch(/[.!?] [A-Z]/);
  });
});
