import { writeFileSync } from "node:fs";
import { deliverySeconds, wordBudget } from "../docs/timing.mjs";

function writeCsv(name, headers, rows) {
  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n") + "\n";
  writeFileSync(new URL("../data/" + name, import.meta.url), csv);
}

const speechPaces = [110, 130, 160];
const timePaces = [...speechPaces, 238];
const wordCounts = [100, 200, 250, 300, 500, 750, 1000, 1400, 1500, 2000];
writeCsv(
  "words-to-seconds.csv",
  ["words", "speech_110_wpm_seconds", "speech_130_wpm_seconds", "speech_160_wpm_seconds", "silent_reading_238_wpm_seconds"],
  wordCounts.map((words) => [words, ...timePaces.map((wpm) => Math.round(deliverySeconds(words, wpm)))]),
);

const slotMinutes = [2, 3, 5, 8, 10, 20];
writeCsv(
  "speech-word-budgets.csv",
  ["slot_minutes", "slot_seconds", "reserved_seconds", "pace_wpm", "word_budget"],
  slotMinutes.flatMap((minutes) => [
    ...speechPaces.map((wpm) => [minutes, minutes * 60, 0, wpm, wordBudget(minutes * 60, wpm)]),
    [minutes, minutes * 60, 60, 130, wordBudget(minutes * 60, 130, 60)],
  ]),
);
