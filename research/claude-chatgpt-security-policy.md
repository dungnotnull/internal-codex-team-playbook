# ChatGPT Data Security, Privacy Settings, and Usage Policies — Research Findings

Research date: 2026-11-12. Scope: paid team usage across ChatGPT Plus / Pro / Business / Enterprise.

Method note: every URL below was fetched and read directly on the research date (openai.com and help.openai.com reject default fetchers with 403; content was retrieved via a web-reader). Items listed under "Further reading (not fetched)" were NOT verified and are pointers only.

---

## 1. Data controls: training toggle, retention, temporary chat, deletion, MFA/SSO, workspace admin

### 1a. Turning off model training ("Improve the model for everyone")
- On personal workspaces (Free/Plus/Pro), data sharing is enabled BY DEFAULT; users turn off "Improve the model for everyone" under Settings > Data controls, and keep chat history.
- Caveats that override the opt-out: thumbs-up/down feedback can still send the whole conversation to training; voice mode has a SEPARATE sharing control; Codex has a separate "Include environments" setting; Trusted Access sessions ("Daybreak Blue") may use content for model improvement (cyber-abuse safeguards) even when the toggle is off.
- Managed workspaces (Business / Enterprise / Edu / Healthcare): OpenAI does NOT use workspace content to train models by default, and the API Platform is also excluded by default. Organization retention, memory, compliance, and access settings can be set at workspace level.

Source: https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt
Source: https://openai.com/enterprise-privacy

### 1b. Retention windows (verified numbers)
- Temporary chats: not in history, not used for improvement, but a copy "may be kept for up to 30 days for safety purposes".
- Enterprise / Edu / Healthcare: workspace admins control retention; deleted conversations are removed from OpenAI systems within 30 days unless legally required to keep longer.
- Business: deleted OR UNSAVED conversations removed within 30 days (plus legal/harm exceptions).
- Agent-mode chats, browsing history, and screenshots: retained until the user deletes them; deleted content is purged from systems within 90 days.
- Deleted projects/files and logs of deleted saved memories: removed within 30 days.

Source: https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt
Source: https://openai.com/enterprise-privacy
Source: https://help.openai.com/en/articles/11752874-chatgpt-agent
Source: https://help.openai.com/en/articles/10169521-projects-in-chatgpt

### 1c. Temporary chat
- While temporary: stays out of history, does not create/update memories, is not used to improve models; personalization (memories/custom instructions/plugins) is chosen before the first message and cannot be changed after.
- Saving a temporary chat converts it to a regular chat; from then on account personalization and model-improvement settings apply.
- Enterprise nuance: temporary chats are still exportable via the Compliance API for 30 days even when the workspace sets a different custom retention period.

Source: https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt

### 1d. Deletion and export
- Self-service data export and account deletion exist only for Free/Go/Plus/Pro; in Business/Enterprise/Healthcare workspaces they must go through the workspace owner (Edu admins may enable exports).
- OpenAI may retain logs of deleted saved memories up to 30 days for safety/debugging; turning off "Reference chat history" schedules chat-history-derived memory for deletion from OpenAI systems within 30 days.

Source: https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt
Source: https://help.openai.com/en/articles/8590148-memory-in-chatgpt

### 1e. MFA / SSO / workspace admin controls
- ChatGPT Business includes SSO (SAML and OIDC) and email-domain verification at no extra cost; SSO governs sign-in only — standalone Business does NOT include SCIM/directory sync. MFA is a separate per-account control (help article exists; not fetched in this pass).
- Enterprise privacy commitments: SAML SSO, fine-grained feature/access control, admin-controlled retention, custom models not shared.
- Admin visibility differs by plan — important for team policy: Enterprise/Edu admins get an AUDIT LOG via the Compliance API (not direct chat browsing); ChatGpt BUSINESS workspace admins can view, access, export, and DELETE end-user conversations.
- Agent mode in Enterprise ships with a workspace toggle DEFAULT OFF, RBAC assignment, app controls, and requestable website blocklists.

Source: https://help.openai.com/en/articles/11489188-setting-up-single-sign-on-sso-for-chatgpt-business
Source: https://openai.com/enterprise-privacy
Source: https://help.openai.com/en/articles/11752874-chatgpt-agent

---

## 2. Data-sharing surfaces and their privacy implications

### 2a. Memory
- Memory can draw from past chats, saved memories, custom instructions, saved files (Library/Space), and CONNECTED APPS such as Gmail — sensitive info shared in any of these can resurface in later chats.
- Controls: Settings > Personalization > Memory ("Reference saved memories", "Reference chat history", memory summary, delete/turn off). Workspace owners/admins can manage memory settings and role availability.
- Regulated workspaces (ChatGPT for Healthcare; Enterprise "Regulated Workspace"): improved memory is disabled by default, is NOT covered by the BAA, and PHI must not be entered; Project-only memory is the containment option.

Source: https://help.openai.com/en/articles/8590148-memory-in-chatgpt

### 2b. Projects
- A project concentrates chats + uploaded files + instructions; in shared projects ALL members can view and download project files, so any file added is effectively team-visible.
- Shared projects are forced to project-only memory (no member's outside context leaks in or out); in Enterprise/Edu even default project memory stays contained within the project.
- Training: for personal accounts, shared-project data may train models ONLY if the owner AND every contributor left training on; Business/Enterprise/Edu never train by default.

Source: https://help.openai.com/en/articles/10169521-projects-in-chatgpt

### 2c. Custom GPTs
- Custom GPTs are being RETIRED and migrated to plugins (Enterprise new-GPT creation ended 2026-10-26; standard retirement 2026-12-11; FedRAMP/approved deferral 2027-02-11). New GPT creation is no longer available on personal Free/Go/Plus/Pro accounts.
- Privacy posture: GPT builders CANNOT see user conversations; consumer-plan GPT chats follow the user's training opt-out; Business/Enterprise/Edu GPT data is not trained on by default.
- Biggest leak vector: GPTs using apps/actions send relevant parts of your input to third-party APIs — OpenAI does not audit or control how those providers use/store the data; data sent via an action "may be retained longer than 30 days and used for other purposes" under the recipient's policy.

Source: https://help.openai.com/en/articles/8554407-gpts-in-chatgpt
Source: https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt

### 2d. Connectors / apps (and code interpreter)
- Defaults differ by plan: Enterprise/Edu ship with new plugins/apps DISABLED by default (RBAC-gated); ChatGPT Business has apps ENABLED BY DEFAULT — a Business admin should audit the Plugins page early.
- Governance available: per-app read/write action controls, permission tiers (Always ask / Allow read / Allow low-risk / Allow all actions — the last flagged "elevated risk"), per-app allowed email domains ("Manage domains"), and verified-domain connection blocking for listed apps (Gmail, Drive, Slack, GitHub, etc.).
- DLP-lite controls exist for Google Drive (block shared drives), SharePoint and Teams (site/team allowlists + sensitivity-label exclusions), and Outlook Email (sensitivity-label GUID exclusions).
- Custom MCP apps are NOT verified by OpenAI; third-party data leaves OpenAI's terms entirely (provider storage/residency applies). On the API side, code-interpreter/hosted-container state is ephemeral (deleted when the container expires).

Source: https://help.openai.com/en/articles/11509118-admin-controls-security-and-compliance-for-plugins-and-apps
Source: https://developers.openai.com/api/docs/guides/your-data

### 2e. Agent mode (operator)
- Signing the agent into sites/apps grants access to sensitive data (email, files, account settings) and can act on your behalf; OpenAI explicitly documents prompt-injection risk. Safeguards: confirmations for high-impact actions, refusal patterns, injection monitoring, "watch mode".
- Official best practices: never type passwords/private info in messages (use takeover mode, where screenshots are not captured); enable only needed apps; avoid vague prompts; stop on suspicion; clear remote browser data; review app permissions. Cookies persist across sessions.
- Human review: agent content (including screenshots) may be accessed by authorized OpenAI personnel/trusted providers for abuse, support, legal, or model improvement (unless opted out). Business data (including agent sessions) is not trained on by default; Plus/Pro follows the consumer toggle.
- Enterprise: workspace toggle default OFF, RBAC, app restrictions, domain blocklists, Compliance API logging (conversations, not individual actions), and data residency/custom retention respected.

Source: https://help.openai.com/en/articles/11752874-chatgpt-agent

---

## 3. Official usage and sharing policies

### 3a. Consumer vs business terms — the core divergence
- Consumer (Free/Go/Plus/Pro): training on your content is ON by default; you must opt out per account (or via the Privacy Portal), with the carve-outs listed in 1a.
- Business plans (Business/Enterprise/Edu/Healthcare) and the API Platform: training on your data is OFF by default and only happens via explicit opt-in; you own inputs/outputs (where allowed by law); retention is admin-controlled.
- Data submitted to business services still passes through automated content classifiers/safety tools (metadata only), and human access is limited to support, abuse investigation, and legal cases; Business admins themselves can read/export/delete member conversations (see 1e).

Source: https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt
Source: https://openai.com/enterprise-privacy

### 3b. Usage Policies (universal, all products)
- Current version effective 2025-11-20 per changelog "universal set of policies across OpenAI products and services"; a newer revision (announced 2026-10-21) takes effect 2026-11-20 adding restrictions on using OpenAI outputs to train competing models, national-security/law-enforcement approval requirements, and model-access intermediary review.
- "Respect privacy" is an explicit policy pillar: no aggregating/monitoring/profiling/distributing private info without authorization, no facial-recognition databases, no real-time remote biometric ID in public, no social scoring/emotion inference in workplaces.
- "Empower people" prohibits automating high-stakes decisions (employment, credit, housing, medical, legal, etc.) without human review — relevant for any team building workflows on ChatGPT.

Source: https://openai.com/policies/usage-policies

### 3c. ChatGPT vs API data handling
- API: since 2023-03-01, API data is NOT used for training unless you explicitly opt in. Abuse-monitoring logs (which can contain prompts/responses + classifier metadata) are kept up to 30 days by default.
- Eligible customers can apply for Zero Data Retention or Modified Abuse Monitoring (org- or project-level); note the per-endpoint eligibility table — chat/completions, responses, embeddings are ZDR-eligible, while assistants/threads/files/agents are NOT (they retain state until deleted).
- Exceptions even under ZDR: CSAM-classified image inputs are retained for manual review; prompt-caching tensors persist locally up to 24h. MCP servers and other third-party tools follow the third party's retention policy.
- Fine-tuned models are private (never shared or used to train other models); fine-tuning data is retained until the customer deletes it.

Source: https://developers.openai.com/api/docs/guides/your-data

### 3d. Trust and compliance resources
- Verified claims: SOC 2 Type 2 audit completed for ChatGPT Enterprise, Edu, Healthcare, Business, and the API Platform; AES-256 at rest and TLS 1.2+ in transit; GDPR/CCPA support via an executable DPA; BAA available (API/Healthcare context); adherence to CSA STAR and ISO/IEC 27001, 27017, 27018, 27701.
- The Trust Portal (trust.openai.com) is the place to request SOC 2 reports and security documentation — it is linked from the Enterprise privacy page (portal itself is SafeBase-hosted and was not fetched in this pass).

Source: https://openai.com/enterprise-privacy
Source: https://openai.com/index/expanding-data-residency-access-to-business-customers-worldwide

---

## 4. Official security-guidance best practices

### 4a. Secrets and credentials
- Do not paste passwords or private data into agent prompts — use takeover mode for sensitive logins; clear remote browser data and cookies after sensitive sessions; sign out of sites inside the agent's browser.
- Only connect apps/APIs you trust: OpenAI states it does not audit third-party providers' security; data sent through actions is governed by the recipient's policy and can outlive OpenAI's 30-day windows.
- Regularly review app permissions; disable apps not needed for the current task; treat custom (unverified) MCP apps as developer-only tools.

Source: https://help.openai.com/en/articles/11752874-chatgpt-agent
Source: https://help.openai.com/en/articles/8554407-gpts-in-chatgpt
Source: https://help.openai.com/en/articles/11509118-admin-controls-security-and-compliance-for-plugins-and-apps

### 4b. Enterprise DLP / data governance
- Layers available to admins: RBAC for plugins/apps/projects/agent; per-app action + permission tiers; Safety & Security Controls with sensitivity-label exclusions (SharePoint, Teams, Outlook) and drive/site allowlists; verified-domain restrictions to stop company accounts connecting apps in personal workspaces; Compliance API (Enterprise/Edu only) for audit logging incl. projects and agent conversations.
- ChatGPT Business caveat: no Compliance Platform; instead, Business admins have direct view/export/delete over member conversations — factor this into choosing Business vs Enterprise for sensitive teams.
- Encryption in transit and at rest covers customer content, but provider-side permissions always remain authoritative for connected apps.

Source: https://help.openai.com/en/articles/11509118-admin-controls-security-and-compliance-for-plugins-and-apps
Source: https://openai.com/enterprise-privacy

### 4c. Data residency
- Regions available: Europe, UK, US, Canada, Japan, South Korea, Singapore, India, Australia, UAE (ChatGPT Enterprise/Edu workspaces + eligible API projects).
- Scope: customer content at rest in region (Enterprise: conversations, files, GPTs, image artifacts); API regional processing via us./eu. endpoints; Enterprise Key Management (EKM) lets customers bring their own keys (AWS/GCP/Azure KMS).
- Limits: system data (accounts, billing, usage metadata) and third-party integrations are NOT bound by the region; non-US API residency requires approval for abuse-monitoring controls plus a Modified Retention amendment; API residency carries a 10% price uplift for models released on/after 2026-03-05.

Source: https://openai.com/index/expanding-data-residency-access-to-business-customers-worldwide
Source: https://developers.openai.com/api/docs/guides/your-data

---

## 5. Notable 2025–2026 updates

- Agent mode shipped for paid plans (Plus 40 / Pro 400 / Business & Enterprise 40 messages per month, or 30 credits/message on flexible pricing); Operator was folded INTO agent mode and the Operator site is gone.
- ChatGPT Atlas (the ChatGPT-integrated browser) has been RETIRED; Atlas browser memories/cookies/history are separate from ChatGPT data, and deleting ChatGPT chats does NOT remove Atlas data — workspace admins are told to migrate members off Atlas and update docs.
- Custom GPTs are being retired in favor of plugins (creation cutoff 2026-10-26 for Enterprise, retirement 2026-12-11, FedRAMP 2027-02-11); personal accounts can no longer create GPTs.
- Usage Policies consolidated into one universal set (2025-10-29) and revised again effective 2026-11-20 (no training competing models on outputs; national-security use approvals; intermediary review).
- Privacy-surface changes worth tracking: "Trusted Access" programs (Daybreak Blue) that can train even when opted out; improved memory + project-only memory for regulated workspaces; data-residency expansion to 10 regions (page dated 2026-09-16); Enterprise privacy page updated 2026-01-08.

Source: https://help.openai.com/en/articles/11752874-chatgpt-agent
Source: https://help.openai.com/en/articles/20001371-chatgpt-atlas-retirement
Source: https://help.openai.com/en/articles/8554407-gpts-in-chatgpt
Source: https://openai.com/policies/usage-policies
Source: https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt
Source: https://openai.com/index/expanding-data-residency-access-to-business-customers-worldwide
Source: https://openai.com/enterprise-privacy

---

## All verified sources (fetched 2026-11-12)

1. https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt
2. https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt
3. https://help.openai.com/en/articles/8590148-memory-in-chatgpt
4. https://help.openai.com/en/articles/8554407-gpts-in-chatgpt
5. https://help.openai.com/en/articles/11752874-chatgpt-agent
6. https://help.openai.com/en/articles/10169521-projects-in-chatgpt
7. https://help.openai.com/en/articles/11509118-admin-controls-security-and-compliance-for-plugins-and-apps
8. https://help.openai.com/en/articles/20001371-chatgpt-atlas-retirement
9. https://help.openai.com/en/articles/11489188-setting-up-single-sign-on-sso-for-chatgpt-business
10. https://openai.com/enterprise-privacy
11. https://openai.com/policies/usage-policies
12. https://developers.openai.com/api/docs/guides/your-data
13. https://openai.com/index/expanding-data-residency-access-to-business-customers-worldwide

## Further reading (NOT fetched — unverified pointers)

- OpenAI Trust Portal: https://trust.openai.com
- Terms of Use (ROW): https://openai.com/policies/row-terms-of-use
- Business terms (May 2025): https://openai.com/policies/may-2025-business-terms
- Data Processing Addendum: https://openai.com/policies/data-processing-addendum
- How your data is used to improve model performance: https://help.openai.com/en/articles/5722486
- MFA management: https://help.openai.com/en/articles/7967234
- ChatGPT Atlas launch announcement (Oct 2025): https://openai.com/index/introducing-chatgpt-atlas
- ChatGPT agent launch announcement: https://openai.com/index/introducing-chatgpt-agent
