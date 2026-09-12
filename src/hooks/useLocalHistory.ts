import { useEffect, useState } from "react";
import type { Result } from "../types/test";

const STORAGE_KEY = "typesprint-results";

export function useLocalHistory() {
  const [history, setHistory] = useState<Result[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Result[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 10)));
  }, [history]);

  const addResult = (result: Result) =>
    setHistory((current) => [result, ...current].slice(0, 10));
  return { history, addResult };
}
