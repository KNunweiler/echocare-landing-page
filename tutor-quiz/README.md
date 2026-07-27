# Quiz U 🧠 — rapid-fire campus trivia

A Brady-the-Tutor-style quiz game: 10 rapid-fire questions per round, a countdown
per question, streak bonuses, and a letter grade at the end. Built as a fully
self-contained static app — no build step, no dependencies. Just open
`index.html` (or serve the folder) and play.

## Game modes (each with 4 difficulties: 🟢 Easy → 💀 Impossible)

| Mode | What you get |
|---|---|
| 🚩 Flags | Name the country from its flag (144 countries, tiered by obscurity; harder tiers flip it — pick the flag) |
| 🏙️ World Capitals | Capitals both directions, with classic trap answers (Sydney, Istanbul, Rio…) |
| 🗽 US State Capitals | All 50 states, with trap cities (Chicago, Seattle, NYC…) |
| 🏛️ Historical People | "Who am I?" from a one-line clue — 75 figures from Confucius to Kobe |
| 📅 Birth & Death Years | The classic: what year were they born, what year did they die (Impossible = within ±1–4 years) |
| ➗ Quick Maths | Mental arithmetic, from times tables to 17² and order-of-operations traps |
| 🌍 Geography Trivia | Rivers, deserts, old country names, and gotchas (largest desert = Antarctica) |
| 🧠 Everything | Random category every question |

## Family Voice Mode 🎤

Toggle it on the home screen, start a round, and put the phone/laptop in the
middle of the table:

- Every question is **read aloud** (speech synthesis).
- The mic **listens for yelled answers** (speech recognition) — full answers,
  partial names ("Napoleon!"), years ("1809!"), aliases ("America!", "DC!"),
  and math answers all count.
- Wrong yells count as wrong, so no shouting all four options.
- Needs Chrome or Edge with mic permission; everywhere else the app quietly
  falls back to tap-to-answer.

## Scoring

100 points per correct answer + speed bonus (5/second left) + streak bonus
(10 × streak). Personal bests are saved per mode **and** per difficulty in
`localStorage`. Finish 10/10 for the S-grade confetti.

Keyboard: press **1–4** to answer, **Enter** to submit math answers.
