# WORKING RULES WITH OPENAI - IT Team Rules for ChatGPT / Codex

> **Version:** 1.2 · Updated: 2026-11-12 (v1.2: English canonical edition, dash normalization; v1.1: detailed rules-file section added, skills.sh section added, model strategy in §8; `--ephemeral` gloss fixed)
> **Audience:** Every team member (developer, BA, tester, lead) using a ChatGPT Plus / Pro / Business account + Codex.
> **Before you start:** Read this entire file before using ChatGPT/Codex for project work. Then take the quiz **quiz/QUIZ-OPENAI-RULES.html** (40 questions, 10-point scale, Japanese version available via the language switch at the top).
> **Sources:** Everything below is compiled from official OpenAI documentation (ChatGPT Learn docs, Help Center, platform docs) and reputable papers, with all links verified on 2026-11-12. The full source list is in **§12. References**.

---

## Table of contents

1. [Overview of the ChatGPT/Codex ecosystem](#1-overview-of-the-chatgptcodex-ecosystem)
2. [Choosing the right working mode](#2-choosing-the-right-working-mode)
3. [Effective prompting principles](#3-effective-prompting-principles)
4. [Project data security - golden rules](#4-project-data-security-golden-rules)
5. [Sandbox, permissions & human-in-the-loop](#5-sandbox-permissions--human-in-the-loop)
6. [AGENTS.md, rules & team configuration](#6-agentsmd-rules--team-configuration)
7. [Standard workflow by phase](#7-standard-workflow-by-phase)
8. [Cost management and usage limits](#8-cost-management-and-usage-limits)
9. [Common mistakes & how to avoid them](#9-common-mistakes--how-to-avoid-them)
10. [Daily quick checklist](#10-daily-quick-checklist)
11. [Quick reference (cheatsheet)](#11-quick-reference-cheatsheet)
12. [References](#12-references)

---

## 1. Overview of the ChatGPT/Codex ecosystem

The team uses **paid ChatGPT (Plus/Pro/Business)** - the same login includes the whole AI toolkit for developers, no separate purchase needed:

| Surface | Use it for | Notes |
|---|---|---|
| **Chat** (web/desktop/mobile) | Questions, ideas, drafts, requirements analysis, documentation | Fast, branches turn by turn |
| **ChatGPT Work** (Work mode) | Multi-step tasks with multiple sources/files that produce deliverables (reports, slides, docs) for review | Consumes more allowance than Chat |
| **Codex CLI** | Coding agent in the terminal, automation, CI (`codex exec`) | Included in the plan; sign in with ChatGPT |
| **Codex IDE extension** | Agent next to the editor (VS Code/Cursor...), automatically includes open files as context | IDE extension is the most convenient; in the CLI you mention @-paths |
| **Codex Cloud / web (chatgpt.com/codex)** | Delegate coding tasks that run in parallel in an isolated cloud environment; PR code review for GitHub/GitLab (GitHub: **GA**; GitLab merge requests: **preview**) | Cloud has the internet **off by default** unless enabled |

**What this means for requirements analysis / workflow:**
- Small, single-turn tasks → Chat. Multi-step tasks needing file deliverables → ChatGPT Work. Anything touching the codebase → Codex (CLI/IDE/Cloud).
- Before delegating to an agent, answer 3 self-check questions (official "Working with agents" doc): *Can I describe the outcome and what "done" means? Does the agent have the information/tools it needs? Can I evaluate the result and recover if something goes wrong?*
- Agents **take longer and consume more than chat** - weigh the overall value (review time, waiting, cost) before handing off large work.

📚 Sources: [Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt) · [Working with agents](https://learn.chatgpt.com/docs/working-with-agents) · [Codex CLI](https://learn.chatgpt.com/docs/codex/cli) · [Codex Cloud](https://learn.chatgpt.com/docs/cloud) · [Codex in ChatGPT](https://chatgpt.com/codex) · [Help: using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)

---

## 2. Choosing the right working mode

> **Current team focus - confirmed with the lead: Codex is the primary tool** - all dev/code work follows the Codex process below; Chat/Work is for analysis & documentation.

Pick the surface and configuration **by risk level + task type**, not by habit:

1. **Plain chat / analysis, docs:** use Chat + a Project (collects related chats, files, sources). Projects help chats share files/sources and avoid repeating context.
2. **Code work that really edits files:**
   - Version-controlled repo → Codex starts with the **Auto** preset: `--sandbox workspace-write --ask-for-approval on-request` (read/write/run commands inside the workspace automatically; it asks before going outside the workspace or needing network).
   - Folder that is NOT version-controlled → **`read-only`** by default until you trust it (Codex may wait for "trust" via an onboarding prompt or `/permissions`).
   - Only use **`danger-full-access` / `--yolo`** when the §5 conditions are locked in (run inside a container you control).
3. **Long-running, multi-branch work:** use git worktrees + Codex Cloud; plan locally, delegate implementation to the cloud, review the diff, open a PR.
4. **Recurring tasks:** refine the prompt until it is stable → schedule it as a **Scheduled task** / automation.
5. **CI/automation (non-interactive):** use `codex exec` - it **runs a read-only sandbox by default**; add `--sandbox workspace-write` to allow edits; lock permissions to the "least permissions" principle. Note: **`--full-auto` has been removed** - old scripts must switch to `--sandbox workspace-write` (or `--approve-for-me` to route approvals through automatic review).

### Codex quick handbook (the team's main focus)

**Sign-in / auth (an important money & permission difference):**

| Sign-in method | Mechanism | Notes |
|---|---|---|
| **Sign in with ChatGPT** | Uses your existing plan (Plus/Pro/Business) | **Codex Cloud requires** ChatGPT sign-in; this is the only method that enables "Local computer access with Work Cloud" |
| **API key** (`codex login --with-api-key` / `CODEX_API_KEY=...`) | Usage-based, billed through your OpenAI Platform account at **standard API rates** | API keys/codex access tokens do **NOT** enable Work Cloud local access; the natural default for automation/CI |

**Daily commands & operations:**

- `codex` - interactive; `codex exec "task"` - non-interactive (progress goes to `stderr`, the final result to `stdout`; add `--json` to parse, `-o file` to write the final result, `--ephemeral` when you do not want session rollout files persisted to disk); `codex review` - code review; `codex mcp add` - MCP.
- In a session: `/plan` (Plan mode for multi-step work), `/goal` (long-running goals), `/review` (local review), `@` file mention, `/permissions` (change permission/sandbox quickly), `/status` (see quota), `/memories` (memory per chat).
- While the agent runs: **Enter = steer** (insert guidance into the current turn), **Tab = queue** (line up the next turn).

**Key config knobs (`config.toml`):**

- `sandbox_mode`: `read-only | workspace-write | danger-full-access`.
- `approval_policy`: `on-request | never | { granular = { sandbox_approval, rules, mcp_elicitations, request_permissions, skill_approval } }`; `approvals_reviewer = "auto_review"` lets a reviewer subagent approve approval prompts on your behalf.
- `[sandbox_workspace_write] network_access = true` + `features.network_proxy` (experimental, **off by default**) + domain allowlist/deniedlist (the denied list always wins). The proxy only filters commands running inside the local sandbox - web search/MCP/connector/cloud traffic does not go through it (details in §5.3).
- `project_doc_max_bytes`: **32 KiB** default for the AGENTS.md chain.
- Web search for local chat: **cached mode is the default** (uses an OpenAI-maintained index, works even when the command's network is off); use `live` only when you need the latest info (`--search` for a single run; configure `allowed_web_search_modes`).
- Local Codex memories are **off by default** - enable via Settings → Personalization → "Enable Codex memories" or per chat with `/memories`.

**Models & effort when paying through ChatGPT:** GPT-6 Luna = lightest/fastest (small edits, data extraction), GPT-6 Astra = most powerful (default when you are not conserving usage), GPT-6.1 Sol & Terra in between (Terra for concise writing from supplied material + computer-use tasks with a defined outcome). Pair with effort: e.g. `Luna · Low` for small edits; `Luna · Extra high` for finding context across multiple apps/triage.

📚 Sources: [Sandbox](https://learn.chatgpt.com/docs/sandboxing) · [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security) · [Codex environments](https://learn.chatgpt.com/docs/environments/modes) · [Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees) · [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode) · [Scheduled tasks](https://learn.chatgpt.com/docs/automations) · [Long-running work](https://learn.chatgpt.com/docs/long-running-work) · [Authentication](https://learn.chatgpt.com/docs/auth) · [Model selection](https://learn.chatgpt.com/docs/model-selection) · [Web search](https://learn.chatgpt.com/docs/web-search) · [Config reference](https://learn.chatgpt.com/docs/config-file/config-reference)

---

## 3. Effective prompting principles

### 3.1 The 4-part structure (official "Prompting" docs)

- **Goal:** what the required result is, and who reads it.
- **Context:** which sources/data matter (attach files, @-mention, screenshots, request web search along with a request to cite sources).
- **Output:** format, length, level of detail needed.
- **Boundaries:** what must NOT change / must be asked first (1-2 of the most important boundaries are enough - do not try to control every step).

> Write the **desired result**, not step-by-step instructions, unless the process itself is the deliverable. Especially for Work/Codex: state **what "done" looks like** (e.g. a sample report, a definition of done, passing tests).

### 3.2 Tips recommended by the official docs

- **Codex:** `@`/`/mention` specific files; the IDE includes open files automatically; for multi-step work use `/plan` (Plan mode) so Codex can explore and ask before editing; long-running work has Goal mode (`/goal`).
- **Iterate turn by turn:** the first prompt does not have to be perfect; review → ask for specific corrections (steer). In Codex CLI: `Enter` while running = **steer** (add information to the current turn), `Tab` = **queue** (wait for the next turn).
- **Self-check before shipping:** ask the model for a "final check" (e.g. confirm every action item has an owner + due date; diff two files before finishing) - and then **review it yourself** anyway before using/publishing.
- **Custom instructions** (Settings > Personalization): put globally applicable preferences in custom instructions; keep chat-specific details in the prompt. For project work use `AGENTS.md` (§6).
- **Ask for sources:** when you need fresh information, request **web search + citations**; for absolutely-correct numbers, prefer giving the model tools (compute in a script, use real data) instead of trusting single-pass mental math in the prompt.

### 3.3 The science behind it - why prompting like this works

- Paper **Chain-of-Thought (Wei et al., 2022)**: having the model "think step by step" before answering significantly improves accuracy on complex problems - equivalent to asking the model to enumerate steps/check before concluding.
- Paper **ReAct (Yao et al., 2022)**: combining **reasoning + acting** (think, then act, using tools) beats either alone - equivalent to letting an agent search/read files instead of guessing from memory.
- Paper **Principled Instructions Are All You Need / "Prompt principles" (Bsharat et al., 2023)**: an empirical study of 26 prompting principles across many LLM families; the standouts: **write clearly, concisely, politely; add context + few-shot examples; request step-by-step responses; prefer affirmative phrasing of the desired behavior over negative "don't..." phrasing; add "do not invent - if information is missing, say you don't know" when accuracy matters.**
- **The Prompt Report (Schulhoff et al., 2024)**: a systematic survey of 58 prompting techniques - conclusion: a good prompt = task description + context + examples + clear instructions; fancier techniques must be compared against specific benchmarks, no technique "wins everywhere".
- **Separate instructions from dynamic data** (OpenAI prompt engineering guide): wrap dynamic input (user content, files, web pages) in clear delimiters (`"""`, XML tags, `###`) to prevent prompt injection and "instruction drift"; ask the model to answer only from the supplied material, and to say "not in the provided material" (with a verbatim quote) when it is not there.
- **Regular models vs reasoning models:** with regular models, few-shot + "step by step" helps a lot; with reasoning models, drop phrases like "think step by step" and keep prompts short - direct - focused on constraints & success criteria (per the Reasoning guide).
- **Evaluate prompts like code:** use **Evals** (standard test suites) whenever the team changes a shared prompt - avoid "prompt regression".
- **Why do models hallucinate?** The OpenAI research paper *"Why Language Models Hallucinate"* (Kalai, Nachum, Vempala, Zhang - 2025): hallucination is a consequence of **incentive structures** - scoring gives credit for correct guesses while "I don't know" counts as wrong → **guessing can outperform honesty**, so models are trained into overconfident test-takers. Countermeasures: **allow "I don't know" answers, require citations, RAG/real documents in context; benchmarks like SimpleQA show factual accuracy is still not high** - always keep a verification loop.
- **"Why Johnny Can't Prompt" (Zamfirescu-Pereira et al., CHI '23):** field studies found non-experts fail at prompt design because of **ad-hoc trial-and-error**, **anthropomorphizing the LLM as a human** instead of a deterministic system, and **generalizing from one success** instead of testing against cases. Team lesson: lock prompts to a checklist + test set; do not tune by vibes.

### 3.4 Prompting anti-patterns (banned)

- Context-free stub prompts ("fix the bug", "make it prettier") - results are guesswork.
- Dumping **huge amounts of sensitive/wasteful data** into the prompt when only a slice is relevant (burns allowance + §4 risk).
- Forcing the model to "only answer correctly" without allowing "I don't know / ask again" → pushes it to invent.
- Over-nesting prompt structure when one clear sentence is enough.
- Trusting **numbers, links, citations** the model produces without checking - especially resource links, laws, prices (highest hallucination risk).

📚 Sources: [Prompting (ChatGPT Learn)](https://learn.chatgpt.com/docs/prompting) · [Prompt engineering (OpenAI API docs)](https://platform.openai.com/docs/guides/prompt-engineering) · [Reasoning models](https://platform.openai.com/docs/guides/reasoning) · [Working with evals](https://platform.openai.com/docs/guides/evals) · [Best practices (Codex)](https://learn.chatgpt.com/guides/best-practices) · [Model selection](https://learn.chatgpt.com/docs/model-selection) · Papers: [CoT](https://arxiv.org/abs/2201.11903) · [ReAct](https://arxiv.org/abs/2210.03629) · [Prompt principles](https://arxiv.org/abs/2312.16171) · [The Prompt Report](https://arxiv.org/abs/2406.06608) · [Why Language Models Hallucinate](https://arxiv.org/abs/2509.04664) · [Why Johnny Can't Prompt (CHI '23)](https://doi.org/10.1145/3544548.3581388)

---

## 4. Project data security - golden rules

> Ground rule: **ChatGPT/Codex is a cloud service. Everything you type, attach, or let the agent read is data uploaded to OpenAI's systems.** Only provide it when you accept that risk.

### 4.1 Segregate information by sensitivity

| Data type | Rule |
|---|---|
| **Secrets / absolutely sensitive source code** (API keys, tokens, private keys, passwords, .env, CI/CD keys, certificates) | **NEVER paste into prompts, attachments, AGENTS.md, projects, memories.** Use placeholders (`$API_KEY`) and reference variable names. If pasted by accident: delete the chat immediately, rotate the secret at the source system, tell the lead. |
| **Project source code** | Let Codex/Work read only approved workspace areas; do not upload a whole client/contract repo to cloud tasks without permission. Share code within approved access scope only. |
| **Customer personal data (PII)** | De-identify (anonymize/mask) before putting it into prompts or attachments. Consider synthetic data. |
| **Public / normal internal documents** | Free to use for analysis, writing docs, comparisons. |

### 4.2 Account & workspace configuration (Business/Team)

- **Personal accounts (Free/Plus/Pro):** sharing for training is **ON by default** → go to **Settings > Data controls** and turn off *"Improve the model for everyone"*. 3 ways training can still re-engage even after it is off: **(1)** 👍/👎 feedback can send the whole conversation off for training, **(2)** voice mode has its own sharing control, **(3)** Codex has a separate "Include environments" setting; Trusted Access (Daybreak Blue) programs for cyber work may use content to improve models.
- **Workspace Business/Enterprise/Edu/Healthcare:** OpenAI **does not train on workspace content by default** (same for the API Platform); retention/memory/compliance/access are controlled by admins at the workspace level. The team must use this workspace for project work.
- **Business includes SSO (SAML/OIDC) + free domain verification; MFA is a per-account setting.** Enterprise adds RBAC, the **Compliance API** (audit logs - Enterprise/Edu only; Business does not have it), and **Business admins can view/export/delete member conversations** - consider this for very sensitive teams.
- **Temporary chat:** not in history, no memories, not used for improvement - but OpenAI **keeps a copy for up to 30 days for safety**; "saving" a temp chat turns it into a normal chat per your personal settings.
- **Retention (verified numbers):** Business - deleted/not-saved conversations are purged from live systems within **30 days** (except legal holds); Agent mode - content (chats, browsing history, screenshots) is kept until the user deletes it, then purged within **90 days**; project/file deletion - **30 days**; deleted-memory logs - **30 days**.
- **Agent mode:** Plus ~**40** messages/month, Pro ~400, Business/Enterprise ~40 (or 30 credits per message with flexible pricing). Letting the agent **sign in to** an app/site = granting it access to sensitive data (email, files, settings); OpenAI **explicitly documents the prompt-injection risk** of agent mode - connect the fewest apps needed, never type passwords into the conversation (use **takeover mode**), stop when something looks off, clear the agent's browser data after sensitive sessions.
- **Memory** can draw from old chats, Library/Space files, **and connected apps (Gmail...)** - sensitive info granted to an app can "resurface" in later chats; for containment use **project-only memory**. Memory is still just a "recall layer": mandatory rules live in `AGENTS.md`/docs (§6).
- **Projects:** a shared project = **every member can view + download every file in it**; a personal-account project is used for training only if the owner AND all contributors have training ON; Business/Enterprise default to no training. Never keep secrets in project files.
- **Plugins/apps/connectors:** Business has apps **ON by default** - admins should audit the Plugins page early; Enterprise defaults to OFF + RBAC. Per-app permission modes exist (Always ask / Allow read / low-risk / all - the last is flagged "elevated risk"), domain allowlists, and DLP-lite (Drive shared drives, SharePoint/Teams sensitivity labels...). **Custom MCP apps are not OpenAI-verified** - data sent to third parties follows their policy and may be kept longer than 30 days.

### 4.3 Retention & the API

- For ChatGPT Business/Enterprise: conversations, files, connector data - **each has its own retention rule** (Library files are separate from conversations; deleting a chat does not delete Library files; compliance records are kept 30 days). See the full table in the ChatGPT Work overview.
- **API vs ChatGPT:** since 2023-03-01 the OpenAI API **does not train on customer data** unless you explicitly opt in; abuse-monitoring logs are kept up to **30 days** by default. Eligible customers can request **Zero Data Retention (ZDR)** per org/project - but **per endpoint** (chat/completions, responses, embeddings are eligible; assistants/threads/files/agents are NOT - they keep state until you delete them). Beware: images classified as CSAM are retained for manual review; **MCP servers/third-party tools follow their own retention policies**.
- **Fine-tuned models are private** (not shared, not used to train other models); fine-tuning data is kept until you delete it.
- **Data residency:** the API/Enterprise supports regions (US/EU/UK/CA/JP/KR/SG/IN/AU/UAE) for content at rest; note that **system data + third-party integrations are not blocked by region**; Enterprise adds **EKM** (bring your own keys). So for truly sensitive data: API + ZDR + residency is the strongest configuration.

### 4.4 2025-2026 updates to know (so you don't apply stale rules)

- **Universal Usage Policies** apply across all products; the revised version takes **effect 2026-11-20** (adds: bans on using OpenAI output to train competing models, approval requirements for defense/security use cases, review requirements for model-access intermediaries) *(the policy page blocks scripted clients - 403 - verified by opening it directly in a browser on 2026-11-12)*.
- Policy pillar "Respect privacy": no unauthorized profiling/monitoring/scoring of people; "Empower people": **no automating high-stakes decisions (hiring, credit, health, legal...) without human review** - every workflow the team builds on ChatGPT must keep a human in the loop for decisions of this kind.
- **The ChatGPT Atlas browser has been retired** - Atlas data is separate from ChatGPT and deleting ChatGPT chats does not delete Atlas data; if the team still used it, migrate + clean up per the admin guidance.
- **Custom GPTs are being discontinued** (migrating to plugins): Enterprise stops new GPT creation 2026-10-26, retirement 2026-12-11; personal accounts cannot create new GPTs. Do not start new workflows on GPTs.
- Operator has been **merged into agent mode**; agent mode quota is per month as in §4.2.

### 4.5 Model-side & input-side risks

- **Prompt injection**: outside content (web pages, PRs, customer data, agent-browser files) can carry "instructions" aimed at the agent. Rule: **never give high permissions or automation based on untrusted input**; keep sandbox/approval set per §5; prefer `cached`/`indexed` web search over `live` when real-time is not needed; connect as few agent-mode apps as possible.
- **OWASP GenAI Security - LLM Top 10 for 2025** is the standard checklist when designing AI work (LLM01 Prompt Injection, LLM02 Sensitive Information Disclosure...). The team applies it at process level: limit data in, limit permissions out, cross-check results.
- **Models can be wrong (hallucination)**: legal facts, prices, links, API identifiers, versions must always be **checked against official sources** - like this file's own "no invented links" rule (all links verified 2026-11-12).
- **Operational security:** AES-256 encryption at rest, TLS 1.2+ in transit, SOC 2 Type 2, ISO/IEC 27001/27017/27018/27701, CSA STAR (per Enterprise privacy; that page blocks scripted clients - 403 - verified by opening it directly in a browser on 2026-11-12) - but the **provider-side permissions of connected apps are always the real boundary**: audit app permissions regularly.

📚 Sources: [Help: Data controls in ChatGPT](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt) · [Help: Temporary chat](https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt) · [Help: ChatGPT agent](https://help.openai.com/en/articles/11752874-chatgpt-agent) · [Help: Projects in ChatGPT](https://help.openai.com/en/articles/10169521-projects-in-chatgpt) · [Help: Admin controls for plugins & apps](https://help.openai.com/en/articles/11509118-admin-controls-security-and-compliance-for-plugins-and-apps) · [Help: Atlas retirement](https://help.openai.com/en/articles/20001371-chatgpt-atlas-retirement) · [Your data on the API](https://developers.openai.com/api/docs/guides/your-data) · [Usage Policies](https://openai.com/policies/usage-policies) · [Enterprise privacy](https://openai.com/enterprise-privacy/) · [Data residency expansion](https://openai.com/index/expanding-data-residency-access-to-business-customers-worldwide) · [Help: Chat and file retention policies](https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt) · [Help: Data residency (ChatGPT)](https://help.openai.com/en/articles/9903489-data-residency-and-inference-residency-for-chatgpt) · [Help: Memory](https://help.openai.com/en/articles/8590148-memory-in-chatgpt) · [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/)

---

## 5. Sandbox, permissions & human-in-the-loop

### 5.1 Two different layers of control

- **Sandbox** = the technical boundary (files, commands, network) the agent can act within on its own.
- **Approval policy** = when the agent must **stop and ask you** before going beyond.
- Everything the agent spawns (git, npm, pytest...) **inherits the sandbox** - the agent can keep working autonomously as long as it stays inside the sandbox boundary.

### 5.2 Standard team configurations

| Scenario | Configuration |
|---|---|
| Read-only / code analysis | `sandbox_mode = "read-only"` + `approval_policy = "on-request"` |
| Editing code in a version-controlled repo | `workspace-write` + `on-request` (the **Auto** preset) |
| CI / non-interactive scripts | `codex exec --sandbox read-only --ask-for-approval never`, or workspace-write with rules |
| Accepted, controlled risk | `--sandbox danger-full-access` **only inside a container/devcontainer you supervise** |

Hard rule: `--dangerously-bypass-approvals-and-sandbox` (alias `--yolo`) is **"not recommended"** in the official docs. Whoever needs full access must run inside a container + have lead approval.

### 5.3 Network access

- `workspace-write` has the network **off by default**. To allow it: `[sandbox_workspace_write] network_access = true` + (if you enable `features.network_proxy`) **domain allowlists** (the denied list always wins).
- The proxy only protects **commands inside the sandbox** - web search, MCP, connectors, cloud traffic **do not go through the proxy**; control each separately with its own settings (e.g. internet access for cloud tasks defaults to OFF).

### 5.4 Human-in-the-loop (HITL) - the human role does not shrink

- Delegation pattern: **Delegate** (the agent goes first) → **Review** (you check) → **Own** (you are responsible for the critical decisions).
- **Review is part of the work**: inspect visible steps, sources used, tool actions, results - fluent, confident prose is not proof of success.
- Review depth scales **with consequences** (affects others, hard to roll back → review more deeply).
- Important: **changing an instruction does not undo an action already taken** - if the agent says it updated an external system, verify the result in that system.
- Automating review: **auto-review** (`approvals_reviewer = "auto_review"`) lets a reviewer-agent approve approval prompts for you - with its own configurable policy.
- When something is wrong: **Redirect** (give a focused correction) or **Pause** (stop and decide). Stopping the agent does not equal cleaning up what already ran.

📚 Sources: [Sandbox](https://learn.chatgpt.com/docs/sandboxing) · [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security) · [Working with agents](https://learn.chatgpt.com/docs/working-with-agents) · [Permissions](https://learn.chatgpt.com/docs/permission-modes) · [Auto-review](https://learn.chatgpt.com/docs/sandboxing/auto-review) · [Windows sandbox](https://learn.chatgpt.com/docs/windows/windows-sandbox)

---

## 6. AGENTS.md, rules & team configuration

### 6.1 What is AGENTS.md?

**AGENTS.md** is an open standard format (initiated by OpenAI together with other vendors - Amp, Jules/Google, Cursor, Factory - now stewarded by the Agentic AI Foundation under the Linux Foundation) for writing **agent instructions** in a repo. Codex reads AGENTS.md **before every run**, building a chain from ~/.codex → repo root → subdirectories (files closer to the working directory **override** guidance above them), capped by default at **~32 KiB** (`project_doc_max_bytes`).

What to put in the project's AGENTS.md:
- Repo structure, build/test/lint commands, code conventions, PR rules.
- **Boundaries**: what must not change (no editing old migrations, no public API changes, no committing secrets...), when to ask.
- Definition of done per task type.
- A `## Code Review Rules` section to customize Codex's GitHub review.

**Good habits:** scaffold with `/init`; **update AGENTS.md whenever Codex repeats the same mistake** (hold a retro); keep files short - specific - not generic; if you need a lot of guidance, split into small linked files instead of one giant file.

### 6.2 Rules file (`agent-configuration/rules`)

The rules file declares which commands are **allowed / must-ask / forbidden to run outside the sandbox** - to avoid manually approving the same safe commands repeatedly without unlocking everything at once. The feature is **experimental**.

- Create a `.rules` file in the `rules/` directory of an active config layer, e.g. `~/.codex/rules/default.rules`; project-local `<repo>/.codex/rules/` is only loaded when the project layer is **trusted**.
- Syntax: `prefix_rule(pattern = ["gh", "pr", "view"], decision = "prompt" | "allow" | "forbidden", justification = "...")` - `pattern` matches the command prefix.
- When several rules match one command, Codex applies the **strictest decision: `forbidden` > `prompt` > `allow`**.
- `match` / `not_match` are inline "unit tests": example commands are tested when the rules load, helping you avoid writing wrong rules.
- Compound commands (`bash -lc "a && b"`) are split with tree-sitter only when the script is a safely static string (plain words + `&&`/`||`/`;`/`|` operators). If the script uses variables, redirections, substitutions, wildcards... Codex **does not split it** - the whole invocation is treated as ONE command (`["bash","-lc","<script>"]`) and rules apply to that entire invocation (conservative behavior: no permissions get granted to commands hidden inside a dynamic script).
- When you click **allow** in the TUI, Codex writes a `prefix_rule` to `~/.codex/rules/default.rules` so it does not ask again next time; reviewers can review this file like code.

### 6.3 `config.toml` configuration (user/project)

- User-level `~/.codex/config.toml`: default model, reasoning effort, sandbox/approval, **profiles** per task type.
- Repo-level `.codex/config.toml` (only when the project is trusted): project-specific configuration.
- **MCP**: declare MCP servers (`codex mcp add ...`) to connect internal tooling; only add servers you trust - MCP gives the agent new action tools.
- **Subagents**: help split up complex runs.
- **Memories**: OFF by default; enable when needed. They do **not replace AGENTS.md**.
- Remember: **binding team rules live in AGENTS.md/docs in the repo** (committed, reviewable), not in personal memories.

### 6.4 Skills (reusable packaged workflows)

- A skill = a folder containing **SKILL.md** (metadata + instructions) plus optional scripts/assets. Codex loads only the SKILL.md when a skill is chosen (context-friendly).
- Locations: **personal** = `~/.agents/skills`; **team-shared** = committed to `.agents/skills/` in the repo.
- Get started fast with the **`$skill-creator`** skill to scaffold; keep the first version local, share it in the repo once it is ready.
- Reference hubs/ discovery: **skills.sh** ("The Agent Skills Directory" - collects skills from notable GitHub repos); also follow AI-agent release notes/docs to catch new skills.
- For third-party skills: **review like a PR** - read the whole SKILL.md, check the commands it runs and the data sources it uses, before installing it for the whole team.

📚 Sources: [AGENTS.md (Codex)](https://learn.chatgpt.com/docs/agent-configuration/agents-md) · [agents.md (open standard)](https://agents.md) · [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules) · [Config reference](https://learn.chatgpt.com/docs/config-file/config-reference) · [MCP](https://learn.chatgpt.com/docs/extend/mcp) · [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents) · [Customization overview (skills)](https://learn.chatgpt.com/docs/customization/overview) · [skills.sh](https://skills.sh) · [openai/codex (GitHub)](https://github.com/openai/codex)

---

## 7. Standard workflow by phase

The official "Building an AI-Native Engineering Team" guide splits the SDLC into phases with the **Delegate / Review / Own** model - the team applies it as follows:

| Phase | Agent leads (Delegate) | Humans keep (Review/Own) |
|---|---|---|
| **Plan / requirements analysis** | Agent reads the spec, cross-references the codebase, flags ambiguities, breaks out subtasks, estimates difficulty | Story-point estimation, priority/sequence decisions - **product decisions stay human** |
| **Design** | Scaffold boilerplate, prototype from images/figma, map design → components | Architecture, patterns, quality + accessibility, UX direction |
| **Build** | Implement features end-to-end per spec (data model, API, UI, tests, PR description) | Review critical architecture/performance paths, keep codebase patterns |
| **Code review** | Local `/review`, GitHub `@codex review`, automatic PR review, security review | Read the diff, decide the merge; Codex comments are suggestions, not verdicts |
| **Test / acceptance** | Write tests, run the standard pipeline (`lint`, the smallest relevant test suites), re-run after fixes | Business acceptance, product edge cases |
| **Maintain / Docs** | Write/update README, CHANGELOG, ADRs from diffs; check doc links | Own documentation standards; verify important information |

**Standard flow "plan → implement → verify" for every code task:**

1. **Declare context:** AGENTS.md + `@-mention` files + the specific spec/issue.
2. **Start with `/plan`** for multi-step work; review + lock the plan (milestones, rollback strategy).
3. **Delegate implementation**, using steer/queue to correct course mid-run instead of stopping the session.
4. **Verify:** run repro steps, lint + the smallest relevant tests, `/review`; compare against the "done" stated up front.
5. **Git checkpoints before/after** (clean commits) - use worktrees when running in parallel.
6. **Feed lessons back** into AGENTS.md (do not let Codex repeat mistakes).
7. **Mind the cost of Work/Cloud:** cloud runs consume more - match against value.

📚 Sources: [Building an AI-Native Engineering Team](https://learn.chatgpt.com/guides/build-ai-native-engineering-team) · [Best practices (Codex)](https://learn.chatgpt.com/guides/best-practices) · [Code review](https://learn.chatgpt.com/docs/code-review) · [Review GitHub PRs with Codex](https://learn.chatgpt.com/docs/third-party/github) · [Codex GitHub Action](https://learn.chatgpt.com/docs/github-action)

---

## 8. Cost management and usage limits

- **Included in the plan:** Plus $20/month; Pro from $100 (tiers $100/$200/$500); Business $20/user/month (billed annually; $25 if billed monthly, minimum 2 users). Codex is included in these plans. Cloud tasks **may** consume more of the allowance than local messages (depends on model and task) - local and cloud **share the plan's quota**.
- **5-hour window limits** (for local work; Pro currently has no five-hour cap; weekly limits may also apply). Usage shared across Codex / ChatGPT Work / ChatGPT for Excel... **draws from the same agentic quota**.
- Estimated messages per 5-hour window (Plus, Standard Business): GPT-6 Luna the most (~350-3,000), GPT-6.1 Terra ~35-285, GPT-6.1 Sol ~15-160, GPT-6 Astra ~5-45 - levels differ per model and complexity: **prompt length, context, reasoning, tool use, retrieval, caching** all matter; a "short prompt" is not always cheaper.
- **Credits:** when you hit your limit, buy credits to continue (Plus/Pro/Business workspaces). Rates are per 1M tokens depending on model & speed (Fast/Ultrafast carry a x2-x8 multiplier).
- **Track usage:** `chatgpt.com/codex/settings/usage` or `/status` in Codex CLI.
- **Savings tips:**
  - Model strategy by phase: strong reasoning models (high effort) for "thinking" work - analysis, plan/spec writing, docs, brainstorming, complex review; light/fast models + low effort for "doing" work that already has a clear spec (small refactors, repetitive tests, formatting). Model choice, context and reasoning all affect usage.
  - Right-size the model (model-selection guide); small tasks → light model/low effort (Low); Medium/High/Extra High only for complex work.
  - Do not stuff enormous files into prompts when only a slice is needed (attach the relevant part).
  - Default to the `cached`/`indexed` web search mode; use `live` only when you need the latest.
  - For stable recurring work → schedule automation to **save time / keep the process consistent** (note: each automated run **counts usage like a manual run** - it does not reduce quota).
  - Be careful opening **`danger-full-access`**: web search silently **switches to `live` by default** → higher prompt-injection risk than `cached` (docs say cached "lowers - but doesn't remove -" the risk; there is no separate price for live).

📚 Sources: [Pricing (ChatGPT Learn)](https://learn.chatgpt.com/docs/pricing) · [Help: using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan) · [Model selection](https://learn.chatgpt.com/docs/model-selection) · [Feature maturity](https://learn.chatgpt.com/docs/feature-maturity)

---

## 9. Common mistakes & how to avoid them

| # | Common mistake | Consequence | How to avoid |
|---|---|---|---|
| 1 | Pasting secrets/credentials into prompts | Secrets end up in logs/cloud systems, leak risk | Placeholder + environment variables; if pasted: delete chat + rotate key |
| 2 | Context-free stub prompts | Guesswork, wrong fixes | Goal/Context/Output/Boundaries; @-mention files |
| 3 | Trusting agent output blindly | Broken logic, security holes | Always verify: tests + lint + review + repro; "fluent ≠ correct" |
| 4 | Enabling `--yolo`/full-access for convenience | Whole-machine risk; officially "not recommended" | Auto preset; full access only inside containers |
| 5 | Enabling network by default | Uncontrolled outbound access (exfil, unknown APIs) | Off by default; enable with allowlists when needed |
| 6 | Running the agent on untrusted content (web/PR/client files) with high permissions | Prompt injection → unwanted actions | Tight sandbox; on-request approvals; prefer `cached`/`indexed` search |
| 7 | One giant vague AGENTS.md | Agent ignores instructions; 32KiB limit exceeded | Short, specific, split files; update when mistakes repeat |
| 8 | Storing "team rules" in memories | Lost on other machines/after reset | Rules live in `AGENTS.md`/docs in the repo |
| 9 | No git checkpoint before running agents | Cannot roll back when edits go wrong | Clean commit/stash first; checkpoint after approval |
| 10 | No scope/time limits on Work/Cloud tasks | Wasted allowance, long-running agents | State "when to stop", scope clearly, watch the usage dashboard `/status` |
| 11 | Trusting model-provided links/numbers/quotes without checking | Misreported facts, dead references | Screen links/numbers before use (like this quiz does) |
| 12 | Using personal Plus accounts for sensitive projects | Business data in a training-opt-in system | Business workspace; correct data controls |
| 13 | Using Work/Cloud for tiny tasks | Wasted credits; waiting | Plain chat is enough; Work only for multi-step deliverables |
| 14 | Skipping plan mode on multi-step work | Agent goes the wrong way on its own | `/plan` (Plan mode) before implementing |
| 15 | Confusing "chat + tools" when you need an "agent" | "Done"/review point undefined | The 3 self-check questions before handing off (§1) |

📚 Sources: [Working with agents](https://learn.chatgpt.com/docs/working-with-agents) · [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security) · [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) · [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/) · [Build AI-Native Team](https://learn.chatgpt.com/guides/build-ai-native-engineering-team)

---

## 10. Daily quick checklist

**Individual:**
- [ ] On the right Business workspace + the right project for this work?
- [ ] Prompt has Goal/Context/Output/Boundaries? States "done" + how to verify?
- [ ] No secrets/PII in prompts, files, AGENTS.md, projects?
- [ ] Sandbox/approval configured for the task type (no yolo)?
- [ ] Results have passed: test/lint/review + fact-check before use?
- [ ] Recorded the agent's repeated mistakes into AGENTS.md?
- [ ] Checked usage (`/status` or chatgpt.com/codex/settings/usage) before handing off big work?

**Lead/admin:**
- [ ] Project AGENTS.md updated with new conventions; `## Code Review Rules` section still current?
- [ ] Admin console: plugins/skills/membership correctly scoped; audit logs + analytics when needed?
- [ ] Reviewed "ask before acting" requirements for real-system actions (send/publish/deploy)?
- [ ] Onboarding: everyone reads this file + completes the quiz before using ChatGPT/Codex for projects?

---

## 11. Quick reference (cheatsheet)

```text
# Pick the surface
Question / short draft            -> Chat
Multi-step + multi-file/source    -> ChatGPT Work
Codebase work                     -> Codex (IDE when files are open, CLI when you need shell/scripts,
                                     Cloud for parallel runs / handing off PRs)

# Prompt (4 parts)
Goal / Context @file / Output format / Boundaries + "when is it done"
Multi-step task                   -> /plan first; /goal for long-running goals
While the agent runs              -> Codex CLI: Enter = steer, Tab = queue
Need sources                      -> web search + require citations

# Sandbox / approvals
read-only + on-request            -> analysis, no edits
workspace-write + on-request (Auto)-> repo default
codex exec --sandbox read-only --ask-for-approval never -> CI
--yolo / danger-full-access       -> only in containers + lead approval
network_access = true             -> only when needed + domain allowlist

# Safety
Absolutely never: secrets, .env, private keys, customer PII, unapproved sensitive source
If pasted:  delete chat -> rotate the secret -> tell the lead
Suspicious: prompt injection -> stop + review the input source

# Verified links before use (official sources)
https://learn.chatgpt.com/llms.txt          -> index of all docs (.md ready to fetch)
https://learn.chatgpt.com/docs/whats-new    -> weekly updates
https://academy.openai.com                      -> official courses
```

---

## 12. References

**Official docs - ChatGPT Learn / Codex (learn.chatgpt.com & developers.openai.com):**
- Index of all docs (.md ready to fetch): https://learn.chatgpt.com/llms.txt · single-file export: https://learn.chatgpt.com/docs/llms-full.txt
- Foundations: [Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt) · [Prompting](https://learn.chatgpt.com/docs/prompting) · [Working with agents](https://learn.chatgpt.com/docs/working-with-agents) · [Model selection](https://learn.chatgpt.com/docs/model-selection) · [Personalize](https://learn.chatgpt.com/docs/personalize)
- Security/operations: [Sandbox](https://learn.chatgpt.com/docs/sandboxing) · [Permissions](https://learn.chatgpt.com/docs/permissions) · [Permission modes](https://learn.chatgpt.com/docs/permission-modes) · [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security) · [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules) · [Security administration](https://learn.chatgpt.com/docs/security-administration)
- Team & flow: [Best practices](https://learn.chatgpt.com/guides/best-practices) · [AI-Native Engineering Team](https://learn.chatgpt.com/guides/build-ai-native-engineering-team) · [Get started with ChatGPT Work](https://learn.chatgpt.com/docs/get-started-with-work) · [Projects](https://learn.chatgpt.com/docs/projects) · [Long-running work](https://learn.chatgpt.com/docs/long-running-work)
- Configuration/dev: [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) · [Config reference](https://learn.chatgpt.com/docs/config-file/config-reference) · [Authentication](https://learn.chatgpt.com/docs/auth) · [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode) · [MCP](https://learn.chatgpt.com/docs/extend/mcp) · [Customization overview (skills)](https://learn.chatgpt.com/docs/customization/overview) · [Glossary](https://learn.chatgpt.com/docs/glossary)
- Updates: [What's new](https://learn.chatgpt.com/docs/whats-new) · [Changelog](https://learn.chatgpt.com/docs/changelog) · [Feature maturity](https://learn.chatgpt.com/docs/feature-maturity)

**Help Center / policies (each link below was opened and read directly by an agent on 2026-11-12; openai.com & help.openai.com block scripted clients - 403 - so seeing 403 in a quick check is normal):**
- [Data controls in ChatGPT](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt) - training toggles & the exceptions
- [Temporary chat in ChatGPT](https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt)
- [Memory in ChatGPT](https://help.openai.com/en/articles/8590148-memory-in-chatgpt)
- [Projects in ChatGPT](https://help.openai.com/en/articles/10169521-projects-in-chatgpt)
- [GPTs in ChatGPT](https://help.openai.com/en/articles/8554407-gpts-in-chatgpt)
- [ChatGPT agent](https://help.openai.com/en/articles/11752874-chatgpt-agent)
- [Admin controls, security & compliance for plugins and apps](https://help.openai.com/en/articles/11509118-admin-controls-security-and-compliance-for-plugins-and-apps)
- [ChatGPT Atlas retirement](https://help.openai.com/en/articles/20001371-chatgpt-atlas-retirement)
- [Setting up SSO for ChatGPT Business](https://help.openai.com/en/articles/11489188-setting-up-single-sign-on-sso-for-chatgpt-business)
- [Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)
- [Chat and file retention policies](https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt) *(quoted in official docs)*
- [Data residency and inference residency](https://help.openai.com/en/articles/9903489-data-residency-and-inference-residency-for-chatgpt) *(quoted in official docs)*
- [Enterprise privacy](https://openai.com/enterprise-privacy/)
- [Usage Policies (universal)](https://openai.com/policies/usage-policies)
- [Your data - OpenAI API docs](https://developers.openai.com/api/docs/guides/your-data)
- [Data residency expansion (announcement)](https://openai.com/index/expanding-data-residency-access-to-business-customers-worldwide)

**OpenAI Platform (API docs):**
- [Prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering) · [Safety best practices](https://platform.openai.com/docs/guides/safety-best-practices) · [Prompt caching](https://platform.openai.com/docs/guides/prompt-caching) · [Production best practices](https://platform.openai.com/docs/guides/production-best-practices) · [Models](https://platform.openai.com/docs/models) · [API Reference](https://platform.openai.com/docs/api-reference)

**Other:**
- [openai/codex (GitHub)](https://github.com/openai/codex) · [agents.md](https://agents.md) · [skills.sh - The Agent Skills Directory](https://skills.sh) · [OpenAI Academy](https://academy.openai.com) · [A practical guide to building agents (PDF)](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)
- AI security: [OWASP GenAI - LLM Top 10 for 2025](https://genai.owasp.org/llm-top-10/)

**Research papers (arXiv/ACM):**
- [Chain-of-Thought Prompting Elicits Reasoning in LLMs](https://arxiv.org/abs/2201.11903) - Wei et al. (2022, Google)
- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629) - Yao et al. (2022, Princeton/Google)
- [Principled Instructions Are All You Need... ("Prompt principles", 26 principles)](https://arxiv.org/abs/2312.16171) - Bsharat et al. (2023)
- [The Prompt Report: A Systematic Survey of Prompt Engineering Techniques](https://arxiv.org/abs/2406.06608) - Schulhoff et al. (2024)
- [Why Language Models Hallucinate](https://arxiv.org/abs/2509.04664) - Kalai, Nachum, Vempala, Zhang (OpenAI, 2025) + [openai.com/index/why-language-models-hallucinate](https://openai.com/index/why-language-models-hallucinate/)
- [Evaluating Large Language Models Trained on Code (HumanEval)](https://arxiv.org/abs/2107.03374) - Chen et al. (OpenAI, 2021)
- [Why Johnny Can't Prompt: How Non-AI Experts Try (and Fail) to Design LLM Prompts](https://doi.org/10.1145/3544548.3581388) - CHI '23 (ACM)

> **The team's own "no invented links" rule:** every link in this file was opened/HTTP-checked on 2026-11-12 (via official tooling or direct per-URL agent verification). help.openai.com URLs block bots (403) but are quoted **verbatim** in official OpenAI documents downloaded on 2026-11-12 - still considered verified. When adding a new link to this file, the person adding it must check it by opening it before committing.

---

*End. Next: open **`quiz/QUIZ-OPENAI-RULES.html`** in a browser and take the 40-question quiz to check your knowledge.*
