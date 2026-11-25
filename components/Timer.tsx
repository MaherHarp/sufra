"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Bell, Pause, Play, RotateCcw, Timer as TimerIcon, X } from "lucide-react";
import { formatClock, formatDuration } from "@/lib/format";
import { readStored, writeStored } from "@/lib/storage";

export interface RunningTimer {
  id: string; // stable key, e.g. "classic-creamy-hummus:1"
  label: string;
  recipe?: string;
  duration: number; // seconds
  endAt: number | null; // ms timestamp while running
  remaining: number; // seconds left when paused
  done: boolean;
}

interface TimerApi {
  timers: RunningTimer[];
  now: number;
  start: (t: { id: string; label: string; seconds: number; recipe?: string }) => void;
  pause: (id: string) => void;
  resume: (id: string) => void;
  reset: (id: string) => void;
  dismiss: (id: string) => void;
  remainingOf: (t: RunningTimer) => number;
}

const TimerContext = createContext<TimerApi | null>(null);

export function useTimers() {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error("useTimers must be used inside <TimerProvider>");
  return ctx;
}

/** A short three-note chime made with the Web Audio API — no sound file needed. */
function chime() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    [660, 880, 990].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.22;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.35, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.55);
    });
    setTimeout(() => ctx.close(), 1500);
  } catch {
    /* audio not available */
  }
}

export function TimerProvider({ children }: { children: ReactNode }) {
  const [timers, setTimers] = useState<RunningTimer[]>([]);
  const [now, setNow] = useState(() => Date.now());
  const loaded = useRef(false);

  // Timers survive reloads, so an overnight soak timer is still there tomorrow.
  useEffect(() => {
    setTimers(readStored<RunningTimer[]>("timers", []));
    loaded.current = true;
  }, []);
  useEffect(() => {
    if (loaded.current) writeStored("timers", timers);
  }, [timers]);

  const remainingOf = useCallback(
    (t: RunningTimer) => (t.endAt ? Math.max(0, (t.endAt - now) / 1000) : t.remaining),
    [now],
  );

  useEffect(() => {
    if (!timers.some((t) => t.endAt && !t.done)) return;
    const id = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(id);
  }, [timers]);

  // Fire alarms for timers that just finished.
  useEffect(() => {
    const finished = timers.filter((t) => t.endAt && !t.done && t.endAt <= now);
    if (!finished.length) return;
    setTimers((all) => all.map((t) => (finished.some((f) => f.id === t.id) ? { ...t, done: true, endAt: null, remaining: 0 } : t)));
    chime();
    if ((navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation?.hasBeenActive) navigator.vibrate?.([300, 150, 300]);
    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      finished.forEach((f) => new Notification("Timer done", { body: f.label }));
    }
  }, [now, timers]);

  // Keep chiming every 6 seconds until a finished timer is dismissed.
  const anyDone = timers.some((t) => t.done);
  useEffect(() => {
    if (!anyDone) return;
    const id = window.setInterval(chime, 6000);
    return () => window.clearInterval(id);
  }, [anyDone]);

  const start: TimerApi["start"] = useCallback(({ id, label, seconds, recipe }) => {
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      Notification.requestPermission().catch(() => undefined);
    }
    const t0 = Date.now();
    setNow(t0);
    setTimers((all) => [
      ...all.filter((t) => t.id !== id),
      { id, label, recipe, duration: seconds, endAt: t0 + seconds * 1000, remaining: seconds, done: false },
    ]);
  }, []);

  const pause = useCallback((id: string) => {
    setTimers((all) =>
      all.map((t) => (t.id === id && t.endAt ? { ...t, remaining: Math.max(0, (t.endAt - Date.now()) / 1000), endAt: null } : t)),
    );
  }, []);
  const resume = useCallback((id: string) => {
    const t0 = Date.now();
    setNow(t0);
    setTimers((all) => all.map((t) => (t.id === id && !t.endAt && !t.done ? { ...t, endAt: t0 + t.remaining * 1000 } : t)));
  }, []);
  const reset = useCallback((id: string) => {
    const t0 = Date.now();
    setNow(t0);
    setTimers((all) => all.map((t) => (t.id === id ? { ...t, done: false, endAt: t0 + t.duration * 1000, remaining: t.duration } : t)));
  }, []);
  const dismiss = useCallback((id: string) => setTimers((all) => all.filter((t) => t.id !== id)), []);

  return (
    <TimerContext.Provider value={{ timers, now, start, pause, resume, reset, dismiss, remainingOf }}>
      {children}
      <TimerDock />
    </TimerContext.Provider>
  );
}

/** The button that sits on a step. Shows a live countdown once started. */
export function TimerButton({ id, label, seconds, recipe, large = false }: { id: string; label: string; seconds: number; recipe?: string; large?: boolean }) {
  const { timers, start, pause, resume, remainingOf } = useTimers();
  const t = timers.find((x) => x.id === id);
  const size = large ? "text-lg px-6 py-3" : "";

  if (!t) {
    return (
      <button type="button" className={`btn-terra ${size}`} onClick={() => start({ id, label, seconds, recipe })}>
        <TimerIcon className="h-4 w-4" aria-hidden />
        Start {formatDuration(seconds)} timer
      </button>
    );
  }
  if (t.done) {
    return (
      <span role="status" className={`btn bg-saffron text-walnut ${size}`}>
        <Bell className="h-4 w-4 animate-bounce" aria-hidden /> Time&apos;s up
      </span>
    );
  }
  const running = !!t.endAt;
  return (
    <button
      type="button"
      className={`btn border-2 border-terra bg-terra-soft text-terra ${size}`}
      onClick={() => (running ? pause(id) : resume(id))}
      aria-label={running ? `Pause ${label} timer` : `Resume ${label} timer`}
    >
      {running ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
      <span className="tabular-nums">{formatClock(remainingOf(t))}</span>
      {!running && <span className="text-sm font-medium">paused</span>}
    </button>
  );
}

function TimerDock() {
  const { timers, pause, resume, reset, dismiss, remainingOf } = useTimers();
  if (!timers.length) return null;
  return (
    <aside
      aria-label="Kitchen timers"
      className="timer-dock no-print fixed bottom-3 left-3 right-3 z-[60] flex flex-col gap-2 sm:left-auto sm:right-4 sm:w-80"
    >
      {timers.map((t) => {
        const left = remainingOf(t);
        const pct = t.done ? 100 : 100 - (left / t.duration) * 100;
        return (
          <div
            key={t.id}
            role={t.done ? "alert" : undefined}
            className={`overflow-hidden rounded-2xl border shadow-[0_8px_24px_-12px_rgba(74,50,34,0.45)] ${
              t.done ? "border-saffron bg-saffron-soft" : "border-walnut/15 bg-paper"
            }`}
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{t.label}</p>
                {t.recipe && <p className="truncate text-xs text-walnut-soft">{t.recipe}</p>}
              </div>
              <p className={`font-display text-2xl tabular-nums ${t.done ? "text-terra" : ""}`}>
                {t.done ? "Done" : formatClock(left)}
              </p>
            </div>
            <div className="h-1 bg-linen">
              <div className="h-full bg-terra transition-[width] duration-500" style={{ width: `${pct}%` }} />
            </div>
            <div className="flex items-center justify-end gap-1 px-2 py-1.5">
              {!t.done && (
                <button
                  type="button"
                  onClick={() => (t.endAt ? pause(t.id) : resume(t.id))}
                  className="rounded-full p-2 hover:bg-linen"
                  aria-label={t.endAt ? `Pause ${t.label}` : `Resume ${t.label}`}
                >
                  {t.endAt ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
              )}
              <button type="button" onClick={() => reset(t.id)} className="rounded-full p-2 hover:bg-linen" aria-label={`Restart ${t.label}`}>
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className={`rounded-full p-2 hover:bg-linen ${t.done ? "bg-terra text-paper hover:bg-terra" : ""}`}
                aria-label={t.done ? `Stop alarm for ${t.label}` : `Cancel ${t.label}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </aside>
  );
}
