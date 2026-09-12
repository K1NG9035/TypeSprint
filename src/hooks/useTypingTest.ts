import { useCallback, useEffect, useRef, useState } from "react";
import { calculateWpm } from "../utils/calculateWpm";
import { generatePassage } from "../utils/generatePassage";
import type { Metrics, Result, TestMode, TestStatus } from "../types/test";

export function useTypingTest(
  mode: TestMode,
  onFinish: (result: Result) => void,
) {
  const [passage, setPassage] = useState(() => generatePassage(mode));
  const [typed, setTyped] = useState("");
  const [status, setStatus] = useState<TestStatus>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [metrics, setMetrics] = useState<Metrics>(() =>
    calculateWpm("", passage, 1),
  );
  const startedAt = useRef<number | null>(null);
  const samples = useRef<number[]>([]);
  const finishRef = useRef(false);

  const reset = useCallback(() => {
    const nextPassage = generatePassage(mode);
    setPassage(nextPassage);
    setTyped("");
    setStatus("idle");
    setElapsed(0);
    setMetrics(calculateWpm("", nextPassage, 1));
    startedAt.current = null;
    samples.current = [];
    finishRef.current = false;
  }, [mode]);

  const finish = useCallback(
    (finalTyped: string, seconds: number) => {
      if (finishRef.current) return;
      finishRef.current = true;
      const finalMetrics = calculateWpm(
        finalTyped,
        passage,
        seconds,
        samples.current,
      );
      setMetrics(finalMetrics);
      setElapsed(seconds);
      setStatus("finished");
      onFinish({
        id: `${Date.now()}`,
        mode,
        ...finalMetrics,
        duration: seconds,
        createdAt: new Date().toISOString(),
      });
    },
    [mode, onFinish, passage],
  );

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (status !== "running") return undefined;
    const timer = window.setInterval(() => {
      const seconds = Math.floor(
        (Date.now() - (startedAt.current ?? Date.now())) / 1000,
      );
      setElapsed(seconds);
      if (mode.kind === "timed" && seconds >= mode.value)
        finish(typed, mode.value);
    }, 250);
    return () => window.clearInterval(timer);
  }, [finish, mode, status, typed]);

  const handleTyping = useCallback(
    (value: string) => {
      if (status === "finished") return;
      const nextTyped = value.slice(0, passage.length);
      if (status === "idle") {
        startedAt.current = Date.now();
        setStatus("running");
      }
      const seconds = Math.max(
        1,
        (Date.now() - (startedAt.current ?? Date.now())) / 1000,
      );
      const nextMetrics = calculateWpm(
        nextTyped,
        passage,
        seconds,
        samples.current,
      );
      samples.current = [...samples.current, nextMetrics.rawWpm].slice(-30);
      setTyped(nextTyped);
      setMetrics(nextMetrics);
      if (mode.kind === "words" && nextTyped.length >= passage.length)
        finish(nextTyped, Math.max(1, Math.round(seconds)));
    },
    [finish, mode.kind, passage, status, typed.length],
  );

  return { passage, typed, status, elapsed, metrics, handleTyping, reset };
}
