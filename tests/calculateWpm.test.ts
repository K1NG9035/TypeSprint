import { describe, expect, it } from "vitest";
import { calculateWpm } from "../src/utils/calculateWpm";

describe("calculateWpm", () => {
  it("calculates accuracy, errors, and raw versus net speed", () => {
    const result = calculateWpm("hello worlx", "hello world", 60);
    expect(result.rawWpm).toBe(2.2);
    expect(result.wpm).toBe(2);
    expect(result.accuracy).toBe(91);
    expect(result.errors).toBe(1);
  });

  it("returns perfect consistency for one sample", () => {
    expect(calculateWpm("abcde", "abcde", 60, [1, 1]).consistency).toBe(100);
  });
});
