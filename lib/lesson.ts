import type { Recipe, Step } from "@/data/types";

/** Narration speed used to time the guided lesson (words per second, a calm teaching pace). */
const WPS = 2.4;

export interface Sentence {
  text: string;
  start: number; // seconds from lesson start
  duration: number;
}

export interface Chapter {
  index: number; // position in the visible step list
  title: string;
  start: number;
  duration: number;
  sentences: Sentence[];
  step: Step;
}

const splitSentences = (s: string) =>
  s
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z0-9(“"])/)
    .map((x) => x.trim())
    .filter(Boolean);

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

/** Spoken script for one step: title, instructions and what "done" looks like. */
export function narrationFor(step: Step, n: number): string[] {
  return [
    `Step ${n}. ${step.title}.`,
    ...step.body.flatMap(splitSentences),
    `How you know it's right: ${step.cue}`,
  ];
}

/** Builds the timed chapter list for the guided lesson from the recipe's steps. */
export function buildLesson(recipe: Recipe, steps: Step[]): { chapters: Chapter[]; total: number } {
  let t = 0;
  const intro: Sentence[] = [
    { text: `Welcome. Today we're making ${recipe.title}.`, start: 0, duration: 0 },
    ...splitSentences(recipe.summary).map((text) => ({ text, start: 0, duration: 0 })),
  ];
  const chapters: Chapter[] = [];
  steps.forEach((step, i) => {
    const lines = i === 0 ? [...intro.map((s) => s.text), ...narrationFor(step, i + 1)] : narrationFor(step, i + 1);
    const sentences: Sentence[] = [];
    const chapterStart = t;
    for (const text of lines) {
      const duration = Math.max(2.2, words(text) / WPS);
      sentences.push({ text, start: t, duration });
      t += duration;
    }
    chapters.push({ index: i, title: step.title, start: chapterStart, duration: t - chapterStart, sentences, step });
  });
  return { chapters, total: t };
}

export const formatStamp = (sec: number) => {
  const s = Math.floor(sec);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
