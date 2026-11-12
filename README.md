# 🧭 Codex Team Playbook

[![Quiz](https://img.shields.io/badge/quiz-40_questions-blue)](#quiz)
[![i18n](https://img.shields.io/badge/i18n-VI%20%7C%20JA-orange)](#quiz)
[![Links](https://img.shields.io/badge/links-verified_2026--11--12-brightgreen)](#link-verification-policy)
[![Tracking](https://img.shields.io/badge/answer_history-none-success)](#quiz)
[![Engine](https://img.shields.io/badge/JS-vanilla-yellow)](#quiz)

Working rules for a dev team that lives inside **OpenAI ChatGPT & Codex** - written Codex-first (the CLI/IDE/Cloud coding agent), with a self-contained bilingual onboarding quiz.

> Everything here is grounded in official documentation and peer-reviewed papers. Every reference link was re-verified on **2026-11-12** (see [Link verification policy](#link-verification-policy)).

## What is this?

When a team starts using ChatGPT/Codex for real project work, the first questions are always the same: where do secrets go, how much can the agent touch, when does it ask for approval, how do we review AI-generated PRs, and who pays for what. This repo packages the answers into:

1. **A single rules document** - the source of truth for daily usage onboarding.
2. **A zero-dependency quiz** - proves every teammate actually absorbed the rules.

## What's inside

| Path | What it is | Language |
|---|---|---|
| [`WORKING-RULES-WITH-OPENAI.md`](WORKING-RULES-WITH-OPENAI.md) | 12-section working rules + daily checklist + cheatsheet | 🌐 English (canonical) |
| [`WORKING-RULES-WITH-OPENAI-VI.md`](WORKING-RULES-WITH-OPENAI-VI.md) | Same content, kept 1:1 in sync | 🇻🇳 Vietnamese |
| [`quiz/QUIZ-OPENAI-RULES.html`](quiz/QUIZ-OPENAI-RULES.html) | 40-question grading quiz (no backend, no database) | 🇻🇳 / 🇯🇵 switcher |
| `research/` | Evidence corpus: downloaded official docs + researched notes | English |

## 📑 The rules document (12 sections)

| # | Section |
|---|---|
| 1 | ChatGPT/Codex ecosystem overview and plan/permissions basics |
| 2 | Choosing the right "mode" - with a Codex quick-reference (auth, commands, config knobs, web search, models) |
| 3 | Effective prompting (Goal / Context / Output / Boundaries) |
| 4 | Project data security - the golden rules (no secrets, no PII, rotate on leak) |
| 5 | Sandbox, permissions & human-in-the-loop (read-only / workspace-write / danger-full-access, `--yolo` warnings) |
| 6 | AGENTS.md, rules files & team configuration (32 KiB chain, `## Code Review Rules`) |
| 7 | Standard workflow per phase (plan - spec - implement - test - review - PR) |
| 8 | Cost and usage limits (what to expect per plan, where quota shows) |
| 9 | Common mistakes and how to avoid them |
| 10 | Daily checklist |
| 11 | Cheatsheet (commands, slash commands, key flags) |
| 12 | Sources (official docs, papers, standards) |

## 🎯 The quiz

Open `quiz/QUIZ-OPENAI-RULES.html` in any browser. No build step, no server, no dependencies.

- **40 questions** across 8 categories, on a **10-point scale** (score shown to 2 decimals).
- **10 multi-select questions** - graded by exact answer-set matching.
- Category badges on every question.
- **Illustrated diagrams** (inline SVG, zero external requests) on 7 key questions - sandbox levels, protected paths, sign-in options, the requirement flow, the plan-to-PR loop, long-context compaction, and prompt-injection paths. Each figure re-appears inside the per-question review panel **after grading only**, so diagrams never reveal an answer before you submit. Two neutral, official-product illustrations (MCP request poster, IDE review screen) are also shown during the quiz because they do not disclose the correct option.
- After submitting: per-question verdict, correct answers, your picks, an explanation, and **verified reference links** for wrong-and-right answers alike - plus a prominent **"back to top"** button (VI/JA) in the result panel, next to the retake button.
- **Header branding:** the official `OpenAI_Developers` wordmark served by the official docs site (`learn.chatgpt.com/OpenAI_Developers.svg`, fetched 2026-11-12) is bundled as a local asset at `quiz/img/openai-developers.svg` and shown on the dark header and the landing page. Purely for identification in this internal training context.
- **Web polish:** original favicon set (inline-SVG mark plus PNG/Apple-touch icons generated from it) and full SEO/social meta (description, keywords, Open Graph, Twitter card, theme-color, robots) on both the landing and the quiz page.
- Unanswered questions trigger a confirm dialog before grading.
- **No answer history is stored anywhere.** The only persisted item is the UI language preference (`localStorage` key `quiz_lang`) - clear it via "retake" or devtools if you prefer.
- **Languages: Vietnamese and Japanese.** Switch with the header buttons, or deep-link with `?lang=ja` (optional URL param).

### Category coverage

| Category | Questions |
|---|---|
| Codex & workflow | 19 |
| Sandbox & permissions | 7 |
| Prompting / security / policy / HITL / anti-patterns | 10 |
| AGENTS.md & configuration | 4 |

## 🚀 Quick start

```bash
# clone
git clone https://github.com/<you>/codex-team-playbook.git
cd codex-team-playbook

# read the rules
open WORKING-RULES-WITH-OPENAI.md

# take the quiz (any modern browser)
open quiz/QUIZ-OPENAI-RULES.html
```

Optional: enable GitHub Pages on `quiz/` for a shareable URL, e.g. `https://<you>.github.io/codex-team-playbook/quiz/QUIZ-OPENAI-RULES.html?lang=ja`.

## 🔗 Link verification policy

Anti-hallucination is a hard rule in this repo:

- Every reference URL in the quiz and the rules doc was verified on **2026-11-12** by direct HTTP check (HTTP 200) or was quoted verbatim inside an officially-fetched documentation page (30 unique references in the quiz).
- `agents.md`, arXiv, and OWASP external links were re-verified the same day.
- No generated, guessed, or "plausible-sounding" links are allowed. If a link fails verification, it gets cut.

## 🗂️ Repository structure

```
.
├── WORKING-RULES-WITH-OPENAI.md      # master rules doc (EN canonical; VI version in git history)
├── WORKING-RULES-WITH-OPENAI-VI.md   # Vietnamese edition, kept 1:1 with the EN canonical
├── WORKING-RULES-WITH-OPENAI.docx    # Word export of the EN canonical (Google Docs import)
├── WORKING-RULES-WITH-OPENAI-VI.docx # Word export of the Vietnamese edition
├── WORKING-RULES-WITH-OPENAI-JA.docx # Word export of the Japanese edition (translated from EN v1.2.1)
├── README.md
├── index.html                        # landing page (root for static hosting)
├── quiz/
│   ├── QUIZ-OPENAI-RULES.html        # quiz entry page (i18n switcher)
│   ├── diagrams.js                   # inline SVG illustrations
│   ├── questions.js                  # 40 questions x 2 locales
│   ├── app.js                        # grading engine + i18n runtime
│   └── styles.css
└── research/
    ├── openai-docs/                  # downloaded official docs (evidence)
    └── *.md                          # researched notes from agent panes
```

## 📌 Publishing notes

- Facts reflect official docs as of the **2026-11-12** snapshot. OpenAI ships fast - re-check live docs before onboarding.
- `research/openai-docs/` contains third-party documentation downloaded for internal verification. For a **public** repo, consider keeping that folder private (it is not needed to run the quiz).
- Add a `LICENSE` file that matches how you want teammates to reuse this.

## 🙌 Contributing

- Spot an outdated fact or a broken link? Open an issue - link quality is tracked in the verification policy above.
- New question ideas for the quiz should map to a section of the rules doc, and must carry their own verified references.
