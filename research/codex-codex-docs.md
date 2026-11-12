# Research: Official OpenAI Codex + ChatGPT developer docs (paid teams: Plus / Pro / Business)

Research date: 2026-11-12. Research only — no code changes made.

Sources actually fetched and read during this research (no guessed/invented URLs):

- https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan (Help Center, "Using Codex with your ChatGPT plan")
- https://learn.chatgpt.com/llms.txt (official docs index; Markdown twin of every page at `/docs/<slug>.md`)
- https://learn.chatgpt.com/docs/agent-configuration/agents-md.md (AGENTS.md guide)
- https://learn.chatgpt.com/docs/agent-approvals-security.md (Agent approvals & security)
- https://learn.chatgpt.com/docs/sandboxing.md (Sandbox, per-surface)
- https://learn.chatgpt.com/docs/config-file/config-reference.md (config.toml reference)
- https://learn.chatgpt.com/docs/codex/cli.md (Codex CLI guide)
- https://learn.chatgpt.com/docs/codex/ide.md (Codex IDE extension)
- https://learn.chatgpt.com/docs/cloud.md (Codex Cloud)
- https://learn.chatgpt.com/docs/auth.md (Authentication)
- https://learn.chatgpt.com/docs/models.md (Models)
- https://learn.chatgpt.com/docs/pricing.md (Pricing, plans, credits, limits)
- https://learn.chatgpt.com/docs/extend/mcp.md (Model Context Protocol)
- https://learn.chatgpt.com/docs/customization/memories.md (Memories)
- https://learn.chatgpt.com/guides/best-practices (Best practices guide)
- https://github.com/openai/codex (openai/codex repo README)

Note: legacy `developers.openai.com/codex/*` URLs now redirect to `learn.chatgpt.com/docs/*` pages; the ChatGPT Learn docs are the current home of Codex developer documentation.

## 1. What Codex is today + connecting a paid ChatGPT account

- Codex is OpenAI's coding agent shipped across surfaces: Codex CLI ("lightweight coding agent that runs in your terminal"; install via `curl .../codex/install.sh`, PowerShell installer, `npm i -g @openai/codex`, or Homebrew), the Codex IDE extension (VS Code/Cursor/Windsurf extension; separate Xcode and JetBrains integrations), Codex mode in the ChatGPT desktop app (`codex app`), Codex web/cloud at chatgpt.com/codex, and Codex Cloud for delegated cloud coding tasks. GitHub code review (@Codex / automatic reviews) runs on the cloud side.
  - Sources: https://github.com/openai/codex · https://learn.chatgpt.com/docs/codex/ide.md · https://learn.chatgpt.com/docs/cloud.md
- Sign-in: two auth methods for local clients — "Sign in with ChatGPT" (subscription plan benefits; browser flow from `codex login` / signed-out screen) or an API key (`printenv OPENAI_API_KEY | codex login --with-api-key`) for usage-billed use. Codex Cloud requires signing in with ChatGPT; API-key auth gets no ChatGPT-plan cloud features (no GitHub code review, no Slack).
  - Sources: https://learn.chatgpt.com/docs/auth.md · https://learn.chatgpt.com/docs/pricing.md
- Plan requirements: Codex is included across ChatGPT plans (Free and Go included); Codex Cloud is available to eligible Plus, all Pro tiers, Business, Enterprise, Healthcare, and Education accounts — not Free/Go. Auto-review safety checks are free with a ChatGPT account.
  - Source: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan
- Models when paying with ChatGPT: GPT-6.1 Sol, GPT-6.1 Terra (needs Codex CLI ≥ 0.159.0), GPT-6 Sol, GPT-6 Luna, and GPT-6 Astra are surfaced across desktop/web/CLI/IDE; with an API key, model availability follows what your API key can access.
  - Sources: https://learn.chatgpt.com/docs/models.md · https://learn.chatgpt.com/docs/pricing.md

## 2. AGENTS.md convention (format, tips, how Codex consumes it)

- Codex reads AGENTS.md *before doing any work* and builds an instruction chain once per run. Precedence: global scope first (`~/.codex/AGENTS.override.md`, else `AGENTS.md`; first non-empty wins), then from the project root (typically the Git root) walking down to the cwd — in each directory it checks `AGENTS.override.md`, then `AGENTS.md`, then any configured fallback names, taking at most one file per directory.
  - Source: https://learn.chatgpt.com/docs/agent-configuration/agents-md.md
- Merge behavior: files are concatenated root-down and joined with blank lines, so files closer to your current directory win (they appear later in the prompt). Combined instructions are capped by `project_doc_max_bytes` (32 KiB default); `project_doc_fallback_filenames` in config.toml lets repos like `TEAM_GUIDE.md` act as instruction files.
  - Source: https://learn.chatgpt.com/docs/agent-configuration/agents-md.md
- Tips: use `/init` to scaffold a starter file; cover repo layout, build/test/lint commands, conventions and PR expectations, constraints/do-not rules, and what "done" means. Keep it short and accurate, update it after Codex repeats the same mistake (ask for a retrospective), and split large teams' guidance into linked task-specific files instead of one huge file.
  - Source: https://learn.chatgpt.com/guides/best-practices
- A `## Code Review Rules` section in the AGENTS.md nearest the governed code customizes Codex GitHub code review; code-review usage only applies to GitHub-run reviews, while local reviews count against general limits.
  - Sources: https://learn.chatgpt.com/docs/agent-configuration/agents-md.md · https://learn.chatgpt.com/docs/pricing.md
- Keep must-always-apply team rules in AGENTS.md or checked-in docs — ChatGPT/Codex memories are only a recall layer, not a rules source.
  - Source: https://learn.chatgpt.com/docs/customization/memories.md

## 3. Sandbox modes, approval policy, network controls, safe operation

- Exact knobs from the config reference: `sandbox_mode` = `read-only | workspace-write | danger-full-access`; `approval_policy` = `on-request | never | { granular = {...} }`. The legacy `approval_policy = "untrusted"` is removed (startup failure in CLI 0.149.0+ / desktop and extension 26.818.31338+; project-level `trust_level = "untrusted"` remains supported) and `on-failure` is deprecated.
  - Sources: https://learn.chatgpt.com/docs/config-file/config-reference.md · https://learn.chatgpt.com/docs/agent-approvals-security.md
- Defaults: network access is off by default and local writes are limited to the workspace. Launch recommendations: version-controlled folder → "Auto" preset (`--sandbox workspace-write --ask-for-approval on-request`); non-version-controlled → `read-only`. In workspace-write, sandboxed commands inherit the boundary; protected read-only paths inside writable roots include `.git`, `.agents`, `.codex`, `.aws` (recursively).
  - Sources: https://learn.chatgpt.com/docs/agent-approvals-security.md · https://learn.chatgpt.com/docs/sandboxing.md
- Network controls: enable outbound commands with `[sandbox_workspace_write] network_access = true`; `features.network_proxy` (off by default) then enforces allowlist-first domain rules (exact hosts, `*.example.com`, `**.example.com`, global `*` allow; `deny` always wins), blocks local/private destinations unless `allow_local_binding = true`, and includes best-effort DNS-rebinding checks. The proxy does NOT filter web search, MCP, app/connector calls, or cloud traffic.
  - Source: https://learn.chatgpt.com/docs/agent-approvals-security.md
- Full access: `--sandbox danger-full-access` or `--dangerously-bypass-approvals-and-sandbox` (`--yolo`) removes sandbox and approvals — flagged "not recommended"; docs recommend using it only inside containers/devcontainers you control and trusting the repo. OS enforcement differs: macOS Seatbelt, Linux `bwrap` + seccomp (bubblewrap must be installed), Windows MXC (elevated/unelevated legacy), WSL2 uses the Linux sandbox (WSL1 unsupported since 0.115).
  - Source: https://learn.chatgpt.com/docs/agent-approvals-security.md
- Extra safety: auto-review routes eligible approval prompts to a reviewer agent (`approvals_reviewer = "auto_review"`), granular approval policies can keep some prompts interactive while auto-rejecting others, and GPT-6 Astra safety monitoring can pause tasks. Help Center states auto-review checks are free with ChatGPT accounts, while the dev docs note auto-review uses extra model calls — treat usage impact as worth verifying.
  - Sources: https://learn.chatgpt.com/docs/agent-approvals-security.md · https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan

## 4. Best practices: planning, prompting, memory/context, web search, MCP

- Prompt shape: give Goal / Context (@-mention specific files) / Constraints / "Done when" — this keeps Codex scoped with fewer assumptions. Prefer GPT-6.1 Sol as the default workhorse; scale reasoning effort up (Medium/High/Extra High) for complex or long agentic tasks and down (Low) for quick well-scoped work.
  - Source: https://learn.chatgpt.com/guides/best-practices
- Planning first: for complex or ambiguous work use Plan mode (`/plan` or Shift+Tab) so Codex gathers context and asks clarifying questions before coding; alternatively ask Codex to interview you, or follow an execution-plan/`PLANS.md` template for long-running multi-step work.
  - Source: https://learn.chatgpt.com/guides/best-practices
- Consistency + reliability: personal defaults in `~/.codex/config.toml` (models, reasoning, sandbox/approval, profiles), repo behavior in `.codex/config.toml` (trusted projects), CLI flags for one-offs. Run a verify loop — tests, lint/type checks, `/review` (base branch, uncommitted, or commit), Git checkpoints before/after tasks, and GitHub PR reviews (@Codex or automatic).
  - Sources: https://learn.chatgpt.com/guides/best-practices · https://learn.chatgpt.com/docs/pricing.md
- Memory/context: Codex memory is off by default; enable with `[features] memories = true` or desktop Settings > Personalization, control per chat with `/memories`, stored under `$CODEX_HOME/memories_v2/` (generated files with secrets redacted, updated in background). Keep mandatory rules in AGENTS.md instead of relying on memory.
  - Source: https://learn.chatgpt.com/docs/customization/memories.md
- Web search & MCP: `web_search` tool modes are `disabled | cached | indexed | live` (default `cached` = OpenAI-maintained index, reduces prompt-injection exposure; full-access runs default to `live`; `codex --search` enables live). MCP config lives in `~/.codex/config.toml` (or project `.codex/config.toml` for trusted projects) and is shared by desktop app/CLI/IDE; manage with `codex mcp add <name> -- <command>`, `codex mcp list`, `codex mcp login`; supports STDIO + Streamable HTTP servers with OAuth (incl. CIMD/DCR), and Codex consumes the server's `instructions` field (keep the first 512 characters self-contained).
  - Sources: https://learn.chatgpt.com/docs/agent-approvals-security.md · https://learn.chatgpt.com/docs/config-file/config-reference.md · https://learn.chatgpt.com/docs/extend/mcp.md

## 5. Pricing / limits for Plus, Pro, Business (credits + 2025–2026 changes)

- Plan prices: Plus $20/mo; Pro from $100 with $100/$200/$500 tiers (Ultrafast mode on Pro $500); Business $20 per user/mo billed annually ($25 monthly, 2+ users) with dedicated workspace, SAML SSO/MFA and no training on business data by default. Free/Go include Codex; API-key auth is billed separately at API rates.
  - Source: https://learn.chatgpt.com/docs/pricing.md
- Usage estimates (local messages per 5-hour period, Plus and Standard Business): GPT-6 Astra 5–45; GPT-6.1 Sol 15–160; GPT-6.1 Terra 35–285; GPT-6 Sol 15–150; GPT-6 Luna 350–3,000. Pro currently has no five-hour cap; weekly limits may apply; the agentic allowance is shared across Codex, ChatGPT Work, ChatGPT for Excel, etc. Check usage at chatgpt.com/codex/settings/usage or `/status` in the CLI.
  - Source: https://learn.chatgpt.com/docs/pricing.md
- Credits: after included limits, eligible Plus/Pro users can buy ChatGPT credits to continue without upgrading, and Business/Edu/Enterprise flexible-pricing workspaces buy workspace credits. Credit token rates per 1M tokens (Standard speed) include: GPT-6 Astra 250 in / 25 cached / 1,250 out; GPT-6.1 Sol 50 / 2.5 / 250; GPT-6.1 Terra 25 / 1.25 / 125; GPT-6 Luna 2.5 / 0.25 / 12.5; no separate cache-write charge for Codex credit billing. Speed multipliers: Fast = 2.5x subscription / 2x credits; Ultrafast = 8x / 6x.
  - Sources: https://learn.chatgpt.com/docs/pricing.md · https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan
- 2025–2026 changes worth tracking: GPT-5.4 and GPT-5.4 mini removed from Codex with ChatGPT sign-in as of Aug 31 2026 (replaced by 5.6-Terra/5.6-Luna per Help Center); GPT-5.5 retires from Codex with ChatGPT sign-in Oct 14, 2026; `approval_policy = "untrusted"` removal (CLI 0.149.0+); Enterprise token-based billing is metered in USD instead of credits; referral/banked rate-limit resets exist for Plus/Pro/Business.
  - Sources: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan · https://learn.chatgpt.com/docs/pricing.md
- Workspace controls for teams: admins set starting model/reasoning/Fast Mode (Workspace settings > Models), RBAC + Compliance API audit logging for Codex clients, and cloud access is off by default for Enterprise workspaces — Business/Enterprise admins manage plugin installs from the Admin console.
  - Source: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan

## Observed discrepancies / gotchas (flagged, not resolved)

- The llms.txt index lists `https://learn.chatgpt.com/guides/best-practices.md`, but that exact URL returned HTTP 404 when fetched; the HTML page (no `.md`) works: https://learn.chatgpt.com/guides/best-practices
- Auto-review usage: Help Center says auto-review safety checks are free and don't count toward plan limits; the developer "Agent approvals & security" page says auto-review uses extra model calls that can add to Codex usage. Verify current behavior on your plan.
- Legacy URLs: `developers.openai.com/codex/guides/agents-md`, `/codex/sandbox`, and other old paths still resolve but redirect to `learn.chatgpt.com/docs/...` pages — cite the resolved URLs in new docs.
