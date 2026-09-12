import type { Metrics } from "../types/test";

export function calculateWpm(
  typed: string,
  target: string,
  elapsedSeconds: number,
  samples: number[] = [],
): Metrics {
  const elapsedMinutes = Math.max(elapsedSeconds, 1) / 60;
  let correctCharacters = 0;
  let errors = 0;

  for (let index = 0; index < typed.length; index += 1) {
    if (typed[index] === target[index]) correctCharacters += 1;
    else errors += 1;
  }

  const rawWpm = Math.round((typed.length / 5 / elapsedMinutes) * 10) / 10;
  const wpm = Math.max(
    0,
    Math.round((correctCharacters / 5 / elapsedMinutes) * 10) / 10,
  );
  const accuracy =
    typed.length === 0
      ? 100
      : Math.round((correctCharacters / typed.length) * 100);
  const values = samples.length > 1 ? samples : [rawWpm];
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance =
    values.reduce((sum, value) => sum + (value - average) ** 2, 0) /
    values.length;
  const consistency = Math.max(0, Math.round(100 - Math.sqrt(variance)));

  return { wpm, rawWpm, accuracy, errors, consistency };
}
