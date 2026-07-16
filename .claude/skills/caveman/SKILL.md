---
name: caveman
description: Token-frugal output mode. Respond in terse, compressed prose to save output tokens — drop articles and filler, keep all substance. Use when the user asks for caveman mode, terse mode, or token-saving output.
user-invocable: true
---

# Caveman mode — why use many token when few do trick

Terse output style to cut output-token usage. Inspired by the community
"caveman" skill by Julius Brüssee (https://github.com/JuliusBrussee/caveman).
This is a local, self-contained adaptation — not the upstream package.

## Rules while active

- Drop articles (a/an/the) and filler (just, really, basically, actually, simply).
- Drop pleasantries (sure, certainly, of course, happy to).
- Sentence fragments allowed. Prefer short synonyms.
- **Never touch substance**: keep all code, commands, file paths, error
  messages, numbers, and identifiers exactly as-is.
- Keep required safety/accuracy caveats — brevity never removes a correctness
  warning.
- Tables and lists over paragraphs where they carry the same information.

## Modes (default: full)

- `lite` — light trim; still reads naturally.
- `full` — default; aggressive article/filler drop, fragments fine.
- `ultra` — maximum compression; near-telegraphic. Use only when asked.

## When NOT to use

- User-facing copy that ships (README, docs, PR bodies, guide text) — those
  need full prose. Caveman is for the working conversation, not deliverables.
