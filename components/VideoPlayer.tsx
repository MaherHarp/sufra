"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, Youtube } from "lucide-react";
import type { Recipe, Step } from "@/data/types";
import { buildLesson, formatStamp, type Sentence } from "@/lib/lesson";

type Tab = "video" | "lesson";

export function VideoPlayer({ recipe, steps, onJumpToStep }: { recipe: Recipe; steps: Step[]; onJumpToStep: (i: number) => void }) {
  const hasVideo = !!recipe.video;
  const [tab, setTab] = useState<Tab>(hasVideo ? "video" : "lesson");
  const lesson = useMemo(() => buildLesson(recipe, steps), [recipe, steps]);
  const player = useLessonPlayer(lesson.chapters.flatMap((c) => c.sentences), lesson.total);
  const currentChapter = lesson.chapters.findLast?.((c) => c.start <= player.t + 0.01) ?? lesson.chapters[0];

  const seekChapter = (i: number) => {
    setTab("lesson");
    player.seek(lesson.chapters[i].start);
  };

  return (
    <div>
      <div role="group" aria-label="Choose how to watch" className="mb-3 flex flex-wrap gap-2">
        {hasVideo && (
          <button type="button" aria-pressed={tab === "video"} className="chip" onClick={() => { player.pause(); setTab("video"); }}>
            <Youtube className="h-4 w-4" aria-hidden /> Video walkthrough
          </button>
        )}
        <button type="button" aria-pressed={tab === "lesson"} className="chip" onClick={() => setTab("lesson")}>
          <Play className="h-4 w-4" aria-hidden /> Guided lesson · {formatStamp(lesson.total)}
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          {tab === "video" && recipe.video ? (
            <YouTubeFacade id={recipe.video.youtubeId} title={recipe.video.title} poster={recipe.image.src} />
          ) : (
            <LessonStage recipe={recipe} chapter={currentChapter} chapters={lesson.chapters.length} player={player} total={lesson.total} markers={lesson.chapters.map((c) => c.start)} />
          )}
          {tab === "video" && recipe.video && (
            <p className="mt-2 text-sm text-walnut-soft">
              Video: “{recipe.video.title}” by {recipe.video.creator} on YouTube. The creator&apos;s method can differ slightly from the
              written recipe below — follow the written steps for exact amounts. Prefer a paced, step-by-step version? Switch to the{" "}
              <button type="button" className="font-semibold text-olive underline underline-offset-2" onClick={() => setTab("lesson")}>
                guided lesson
              </button>
              .
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-walnut/10 bg-[#FBF6EC] p-4">
          <p className="font-display text-lg">Chapters</p>
          <p className="mb-3 text-sm text-walnut-soft">Each chapter matches a step in the recipe.</p>
          <ol className="max-h-[22rem] space-y-1 overflow-y-auto pr-1">
            {lesson.chapters.map((c, i) => {
              const active = tab === "lesson" && c === currentChapter;
              return (
                <li key={c.index} className={`rounded-xl ${active ? "bg-olive-soft" : ""}`}>
                  <button type="button" onClick={() => seekChapter(i)} className="flex w-full items-start gap-3 rounded-xl px-2 py-2 text-left hover:bg-linen">
                    <span className="mt-0.5 w-10 shrink-0 font-semibold tabular-nums text-terra">{formatStamp(c.start)}</span>
                    <span className="text-[0.95rem] leading-snug">{c.title}</span>
                  </button>
                  <button type="button" onClick={() => onJumpToStep(i)} className="mb-1 ml-[3.75rem] text-xs font-semibold text-olive underline-offset-2 hover:underline">
                    Read step {i + 1}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <details className="group mt-5 rounded-2xl border border-walnut/10 bg-[#FBF6EC]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-display text-lg">
          Lesson summary &amp; full transcript
          <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" aria-hidden />
        </summary>
        <div className="space-y-5 px-5 pb-6">
          <p className="max-w-prose">{recipe.videoSummary}</p>
          <ol className="space-y-4">
            {lesson.chapters.map((c, i) => (
              <li key={c.index} className="grid grid-cols-[3rem_1fr] gap-2">
                <button type="button" onClick={() => seekChapter(i)} className="text-left font-semibold tabular-nums text-terra hover:underline">
                  {formatStamp(c.start)}
                </button>
                <p className="max-w-prose text-[0.97rem]">{c.sentences.map((s) => s.text).join(" ")}</p>
              </li>
            ))}
          </ol>
        </div>
      </details>
    </div>
  );
}

function YouTubeFacade({ id, title, poster }: { id: string; title: string; poster: string }) {
  const [on, setOn] = useState(false);
  if (on) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setOn(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-walnut"
      aria-label={`Play video: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-90"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = `${poster}?auto=format&fit=crop&w=1200&q=70`;
        }}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-terra text-paper shadow-lg transition-transform group-hover:scale-105">
        <Play className="ml-1 h-9 w-9 fill-current" aria-hidden />
      </span>
      <span className="absolute bottom-4 left-5 right-5 text-left font-display text-xl text-paper drop-shadow">{title}</span>
    </button>
  );
}

/* ---------------- Guided lesson ---------------- */

type Player = ReturnType<typeof useLessonPlayer>;

function useLessonPlayer(sentences: Sentence[], total: number) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [voice, setVoice] = useState(true);
  const [canSpeak, setCanSpeak] = useState(false);
  const tRef = useRef(0);
  tRef.current = t;
  const speakingIdx = useRef<number | null>(null);
  const spokeAt = useRef(0);

  useEffect(() => setCanSpeak(typeof window !== "undefined" && "speechSynthesis" in window), []);

  // If the browser has no working voice, fall back to captions with the timeline clock.
  const voiceFailed = useCallback(() => {
    speakingIdx.current = null;
    window.speechSynthesis?.cancel();
    setCanSpeak(false);
  }, []);

  const idxAt = useCallback(
    (time: number) => {
      let i = 0;
      while (i < sentences.length - 1 && sentences[i + 1].start <= time + 0.001) i++;
      return i;
    },
    [sentences],
  );

  const stopSpeech = () => {
    speakingIdx.current = null;
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  };

  const speak = useCallback(
    (i: number) => {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(sentences[i].text);
      u.rate = 0.95;
      u.lang = "en-US";
      speakingIdx.current = i;
      spokeAt.current = performance.now();
      u.onerror = (e) => {
        if (e.error !== "interrupted" && e.error !== "canceled") voiceFailed();
      };
      u.onend = () => {
        if (speakingIdx.current !== i) return;
        // Some browsers expose speech but have no installed voice and "finish" instantly.
        if ((performance.now() - spokeAt.current) / 1000 < sentences[i].duration * 0.25) {
          voiceFailed();
          return;
        }
        const next = i + 1;
        if (next >= sentences.length) {
          setPlaying(false);
          setT(total);
          return;
        }
        setT(sentences[next].start);
        speak(next);
      };
      window.speechSynthesis.speak(u);
    },
    [sentences, total, voiceFailed],
  );

  // Clock: advances the timeline. With narration on, it waits at the end of a sentence for the voice to finish.
  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const id = window.setInterval(() => {
      const nowMs = performance.now();
      const dt = (nowMs - last) / 1000;
      last = nowMs;
      setT((prev) => {
        let next = prev + dt;
        if (voice && canSpeak && speakingIdx.current !== null) {
          const s = sentences[speakingIdx.current];
          // A voice that has gone silent for far longer than the sentence needs is treated as broken.
          if ((nowMs - spokeAt.current) / 1000 > s.duration * 2.5 + 4) {
            voiceFailed();
          } else {
            next = Math.min(next, s.start + s.duration - 0.05);
          }
        }
        if (next >= total) {
          setPlaying(false);
          return total;
        }
        return next;
      });
    }, 200);
    return () => window.clearInterval(id);
  }, [playing, voice, canSpeak, sentences, total, voiceFailed]);

  useEffect(() => () => stopSpeech(), []);

  const play = () => {
    const start = tRef.current >= total - 0.1 ? 0 : tRef.current;
    setT(start);
    setPlaying(true);
    if (voice && canSpeak) speak(idxAt(start));
  };
  const pause = () => {
    setPlaying(false);
    stopSpeech();
  };
  const seek = (time: number) => {
    const clamped = Math.max(0, Math.min(total, time));
    stopSpeech();
    setT(clamped);
    setPlaying(true);
    if (voice && canSpeak) speak(idxAt(clamped));
  };
  const toggleVoice = () => {
    const nextVoice = !voice;
    setVoice(nextVoice);
    stopSpeech();
    if (playing && nextVoice && canSpeak) speak(idxAt(tRef.current));
  };

  return { t, playing, voice: voice && canSpeak, canSpeak, play, pause, seek, toggleVoice, caption: sentences[idxAt(t)]?.text ?? "" };
}

function LessonStage({
  recipe,
  chapter,
  chapters,
  player,
  total,
  markers,
}: {
  recipe: Recipe;
  chapter: { index: number; title: string; start: number; step: Step };
  chapters: number;
  player: Player;
  total: number;
  markers: number[];
}) {
  const img = chapter.step.image ?? recipe.image;
  const pct = (player.t / total) * 100;
  const barRef = useRef<HTMLDivElement>(null);

  const onBar = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = barRef.current!.getBoundingClientRect();
    player.seek(((e.clientX - rect.left) / rect.width) * total);
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-walnut text-paper">
      <div className="relative aspect-video">
        <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-walnut via-walnut/40 to-walnut/10" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-6">
          <span className="rounded-full bg-paper/15 px-3 py-1 text-sm backdrop-blur">
            Step {chapter.index + 1} of {chapters}
          </span>
          <span lang="ar" className="font-arabic text-2xl text-saffron">{recipe.arabic}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <p className="font-display text-xl leading-tight sm:text-3xl">{chapter.title}</p>
          <p aria-live="polite" className="mt-2 min-h-[3.2em] max-w-2xl text-[0.95rem] leading-snug text-paper/90 sm:text-lg">
            {player.caption}
          </p>
        </div>
        {!player.playing && player.t === 0 && (
          <button
            type="button"
            onClick={player.play}
            className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-terra shadow-lg transition-transform hover:scale-105"
            aria-label="Play guided lesson"
          >
            <Play className="ml-1 h-9 w-9 fill-current" />
          </button>
        )}
      </div>

      <div className="px-4 pb-3 pt-2 sm:px-5">
        <div
          ref={barRef}
          onClick={onBar}
          className="relative h-6 cursor-pointer"
          role="slider"
          tabIndex={0}
          aria-label="Lesson position"
          aria-valuemin={0}
          aria-valuemax={Math.round(total)}
          aria-valuenow={Math.round(player.t)}
          aria-valuetext={`${formatStamp(player.t)} of ${formatStamp(total)}`}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") player.seek(player.t + 10);
            if (e.key === "ArrowLeft") player.seek(player.t - 10);
          }}
        >
          <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-paper/20" />
          <div className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-saffron" style={{ width: `${pct}%` }} />
          {markers.slice(1).map((m) => (
            <span key={m} className="absolute top-1/2 h-3 w-[3px] -translate-y-1/2 rounded bg-paper/70" style={{ left: `${(m / total) * 100}%` }} />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button type="button" className="rounded-full p-2 hover:bg-paper/10" aria-label="Previous chapter" onClick={() => player.seek(markers[Math.max(0, chapter.index - (player.t - chapter.start > 2 ? 0 : 1))])}>
            <SkipBack className="h-5 w-5" />
          </button>
          <button type="button" className="rounded-full p-2 hover:bg-paper/10" aria-label={player.playing ? "Pause lesson" : "Play lesson"} onClick={player.playing ? player.pause : player.play}>
            {player.playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </button>
          <button type="button" className="rounded-full p-2 hover:bg-paper/10" aria-label="Next chapter" onClick={() => chapter.index + 1 < markers.length && player.seek(markers[chapter.index + 1])}>
            <SkipForward className="h-5 w-5" />
          </button>
          <span className="ml-2 text-sm tabular-nums text-paper/80">
            {formatStamp(player.t)} / {formatStamp(total)}
          </span>
          {player.canSpeak && (
            <button type="button" className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm hover:bg-paper/10" onClick={player.toggleVoice} aria-pressed={player.voice}>
              {player.voice ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              {player.voice ? "Narration on" : "Captions only"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
