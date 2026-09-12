import {
  PUNCTUATION,
  SENTENCE_LIST,
  SYMBOLS,
  WORD_LIST,
} from "../data/wordLists";
import type { PassageStyle, TestMode } from "../types/test";

const previousPassages = new Map<string, string>();

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function createWords(count: number): string[] {
  return Array.from({ length: count }, () => randomItem(WORD_LIST));
}

function createPunctuationPassage(count: number): string {
  return createWords(count)
    .map((word, index) => {
      if (index === 0) return word;
      if (index === 1) return `${randomItem(SYMBOLS)}${word}`;
      if (index === 2) return `${word}${randomItem(PUNCTUATION)}`;
      const roll = Math.random();
      if (roll < 0.14) return `${randomItem(SYMBOLS)}${word}`;
      if (roll < 0.34) return `${word}${randomItem(PUNCTUATION)}`;
      if (roll < 0.42) return `${word}${randomItem(SYMBOLS)}`;
      return word;
    })
    .join(" ");
}

function createSentencePassage(count: number): string {
  const sentences: string[] = [];
  let wordCount = 0;

  while (wordCount < count) {
    const sentence = randomItem(SENTENCE_LIST);
    sentences.push(sentence);
    wordCount += sentence.split(/\s+/).length;
  }

  return sentences.join(" ");
}

function createPassage(style: PassageStyle, count: number): string {
  if (style === "punctuation") return createPunctuationPassage(count);
  if (style === "sentences") return createSentencePassage(count);
  return createWords(count).join(" ");
}

export function generatePassage(mode: TestMode): string {
  const count =
    mode.kind === "words" ? mode.value : Math.max(160, mode.value * 3);
  const key = `${mode.kind}:${mode.value}:${mode.style}`;
  const previous = previousPassages.get(key);
  let passage = createPassage(mode.style, count);
  let attempts = 0;

  while (passage === previous && attempts < 10) {
    passage = createPassage(mode.style, count);
    attempts += 1;
  }

  previousPassages.set(key, passage);
  return passage;
}
