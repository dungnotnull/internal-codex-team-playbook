# WORKING RULES WITH OPENAI - Quy tắc làm việc với ChatGPT / Codex cho Team IT

> **Phiên bản:** 1.3.3 · Ngày cập nhật: 2026-11-13 (v1.3.3: cheatsheet đích-nội-bộ-đã-duyệt; Cloud/GitHub xin-Kido-một-lần; unattended=chỉ-read-only; ship rules file cho onboarding; v1.3.2: bảng tư thế lệnh + `.codex/rules/default.rules`; unattended=chỉ read-only; 4 điểm cho mọi task Codex; skills cần AI推進室 duyệt; v1.3.1: round-2 - chính sách outbound/PR/tuyển dụng/masking/4-điểm/rules-enforcement/automation read-only; v1.3: align guide công ty mẹ - cấm full access cho mọi người, cấm đại diện duyệt approval, MCP cần duyệt của AI推進室 + cấm Google-family MCP, cấm browser automation cho nghiệp vụ, luồng sự cố: dừng/bảo toàn/báo cáo/vô hiệu hoá; v1.2.1: bổ sung đoạn protected paths §5.2; song hành 1:1 với bản tiếng Anh làm chuẩn **[WORKING-RULES-WITH-OPENAI.md](WORKING-RULES-WITH-OPENAI.md)**) (v1.1: §6.2 Rules file chi tiết, §6.4 Skills + skills.sh, chiến lược model §8; sửa gloss `--ephemeral`)
> **Đối tượng:** Toàn bộ thành viên team (developer, BA, tester, lead) sử dụng tài khoản ChatGPT Plus / Pro / Business + Codex.
> **Điều kiện đọc:** Đọc hết file này trước khi bắt đầu dùng ChatGPT/Codex cho công việc dự án. Sau đó làm bài trắc nghiệm **quiz/QUIZ-OPENAI-RULES.html** (40 câu, thang điểm 10, có bản tiếng Nhật ở nút ngôn ngữ phía trên).
> **Chuẩn công ty mẹ:** nội dung theo guide công ty mẹ Codexアプリ安全利用ガイド-2.pdf (9 quy tắc). Nếu docs OpenAI cho phép một capability nhưng guide công ty mẹ giới hạn thì guide thắng - cả hai được đánh dấu ngay tại chỗ. dưới đây được tổng hợp từ tài liệu chính thức của OpenAI (ChatGPT Learn docs, Help Center, platform docs), các paper uy tín đã được verify link ngày 2026-11-12. Link nguồn đầy đủ nằm ở phần **§12. Nguồn tham khảo**.

---

## Mục lục

1. [Tổng quan hệ sinh thái ChatGPT/Codex](#1-tổng-quan-hệ-sinh-thái-chatgptcodex)
2. [Chọn "chế độ" làm việc đúng](#2-chọn-chế-độ-làm-việc-đúng)
3. [Nguyên tắc prompting hiệu quả](#3-nguyên-tắc-prompting-hiệu-quả)
4. [Bảo mật dữ liệu dự án - quy tắc vàng](#4-bảo-mật-dữ-liệu-dự-án--quy-tắc-vàng)
5. [Sandbox, Permissions & Human-in-the-loop](#5-sandbox-permissions--human-in-the-loop)
6. [AGENTS.md, Rules & cấu hình team](#6-agentsmd-rules--cấu-hình-team)
7. [Flow làm việc chuẩn theo giai đoạn](#7-flow-làm-việc-chuẩn-theo-giai-đoạn)
8. [Quản lý chi phí và giới hạn sử dụng](#8-quản-lý-chi-phí-và-giới-hạn-sử-dụng)
9. [Các lỗi thường gặp & cách tránh](#9-các-lỗi-thường-gặp--cách-tránh)
10. [Checklist nhanh hàng ngày](#10-checklist-nhanh-hàng-ngày)
11. [Tra cứu nhanh (cheatsheet)](#11-tra-cứu-nhanh-cheatsheet)
12. [Nguồn tham khảo](#12-nguồn-tham-khảo)

---

## 1. Tổng quan hệ sinh thái ChatGPT/Codex

Team đang dùng **ChatGPT trả phí (Plus/Pro/Business)** - cùng một đăng nhập này bao gồm cả bộ công cụ AI cho dev, không cần mua thêm gì riêng:

| Bề mặt | Dùng cho | Ghi chú |
|---|---|---|
| **Chat** (web/desktop/mobile) | Câu hỏi, ý tưởng, draft, phân tích requirement, tài liệu | Nhanh, rẽ nhánh từng lượt chat |
| **ChatGPT Work** (Work mode) | Nhiệm vụ nhiều bước, nhiều nguồn/tệp, sinh deliverable (báo cáo, slide, tài liệu) để review | Có thể tiêu hao allowance nhiều hơn Chat (tùy task) |
| **Codex CLI** | Agent lập mã chạy trong terminal, automation, CI (`codex exec`) | Included trong plan; đăng nhập bằng ChatGPT |
| **Codex IDE extension** | Agent ngay cạnh editor (VS Code/Cursor...), tự mang file đang mở làm context | IDE extension tiện nhất; CLI thì nhắc @-đường dẫn |
| **Codex Cloud / web (chatgpt.com/codex)** | Giao tác vụ code chạy song song trên môi trường cloud cô lập; Code review PR GitHub/GitLab (GitHub: **GA**; GitLab merge request: **preview**) | Cloud **tắt internet mặc định** trừ khi bật |

**Ý nghĩa khi phân tích requirement / flow làm việc:**
- Việc nào **nhỏ, một lượt** → Chat. Việc nào **nhiều bước, cần file deliverable** → ChatGPT Work. Việc nào **liên quan codebase** → Codex (CLI/IDE/Cloud).
- Trước khi giao agent, trả lời 3 câu hỏi tự kiểm (tài liệu chính thức "Working with agents"): *Mô tả được kết quả + "done" nghĩa là gì? Agent có đủ thông tin/công cụ không? Mình có đánh giá được kết quả và phục hồi nếu sai không?*
- Agent **làm lâu và tiêu hao nhiều hơn chat** - cân nhắc giá trị tổng thể (thời gian review, chờ đợi, chi phí) trước khi giao việc lớn.

📚 Nguồn: [Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt) · [Working with agents](https://learn.chatgpt.com/docs/working-with-agents) · [Codex CLI](https://learn.chatgpt.com/docs/codex/cli) · [Codex Cloud](https://learn.chatgpt.com/docs/cloud) · [Codex in ChatGPT](https://chatgpt.com/codex) · [Help: using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)

---

## 2. Chọn "chế độ" làm việc đúng

> **Trọng tâm (focus) hiện tại của team - đã confirm với lead: Codex là công cụ chủ lực** - mọi việc dev/code ưu tiên theo quy trình Codex dưới đây; Chat/Work dùng cho phần phân tích & tài liệu.

Chọn bề mặt & cấu hình **theo mức rủi ro + loại việc**, không chọn theo thói quen:

1. **Chat thường / phân tích, viết tài liệu:** dùng Chat + Project (gom chat, file, nguồn liên quan). Project giúp các chat chia sẻ file/nguồn, tránh lặp ngữ cảnh.
2. **Việc code sửa file thật:**
   - Repo **đã version-controlled** → Codex khởi động preset **Auto**: `--sandbox workspace-write --ask-for-approval on-request` (đọc/sửa/chạy lệnh trong workspace tự động; ra ngoài workspace hoặc cần network mới hỏi). **Lưu ý tư thế lệnh: lệnh ghi trong sandbox không tự bật màn hình duyệt - các rule phá dữ liệu (§5.2) được thực thi bằng file `.codex/rules/` của project (`rm`→forbidden, `mv`/`cp`/`sed -i`→prompt, `git push`→forbidden).**
   - Repo/folder **chưa version-controlled** → mặc định **`read-only`** cho tới khi tin được (Codex có thể chờ "trust" thư mục qua onboarding prompt hoặc `/permissions`).
   - **CẤM full access với mọi người**: không chuyển sang `--sandbox danger-full-access` / `--yolo` - guide công ty mẹ cấm với toàn bộ member (gồm lead), kể cả trong container/devcontainer. Cần phạm vi lớn hơn -> `workspace-write` + rules/on-request.
3. **Việc chạy dài, song song nhiều nhánh:** dùng git worktrees + Codex Cloud; giao plan locally rồi delegate implementation lên cloud, review diff, mở PR. **Chính sách (guide công ty mẹ): mọi thứ chạm ra ngoài workspace của team (mở PR, publish) là hành động có người review - agent không tự push; mở PR trong luồng Cloud là một phần của luồng nền tảng đã duyệt, còn merge thì chỉ người. Codex Cloud + GitHub app cần **AI推進室 (Kido) xác nhận MỘT LẦN** khi đưa vào nghiệp vụ (guide nói "approved local working folder" - cloud không phải local, nên đây là ngoại lệ được duyệt chính thức, không phải quyền mặc định). Sau xác nhận một lần: không cần run nào cũng xin - nhưng PR **không bao giờ tự merge**, và **nối dịch vụ ngoài MỚI/thay đổi quyền app lại phải qua duyệt §6.3**.**
4. **Việc lặp định kỳ:** refine prompt tới khi ổn → lên lịch **Scheduled task** hoặc automation. Automation chạy **read-only** (hoặc chỉ rules lệnh chỉ-đọc đã duyệt): run không người giám sát không ghi file, không mở network, không ủy quyền duyệt - màn hình duyệt nào vẫn do người phụ trách tự trả lời (guide công ty mẹ).
5. **CI/automation (không tương tác):** dùng `codex exec` - run không giám sát **chỉ read-only** (`--sandbox read-only --ask-for-approval never`); KHÔNG có unattended workspace-write trong quy trình. Run có người giám sát cần sửa file thì thêm `--sandbox workspace-write`; chốt quyền theo "least permissions". Lưu ý: **`--full-auto` đã bị gỡ** - script cũ phải đổi sang `--sandbox workspace-write`  (KHÔNG chuyển sang `--approve-for-me`: đó là ủy quyền duyệt, guide công ty mẹ cấm).

### Cẩm nang nhanh Codex (focus chính của team dev)

**Đăng nhập / Auth (khác biệt quan trọng về tiền & quyền):**

| Cách đăng nhập | Cơ chế | Lưu ý |
|---|---|---|
| **Sign in with ChatGPT** | Sử dụng theo plan đã có (Plus/Pro/Business) | **Codex Cloud yêu cầu** đăng nhập ChatGPT; duy nhất cách này bật được "Local computer access with Work Cloud" |
| **API key** (`codex login --with-api-key` / `CODEX_API_KEY=...`) | Usage-based, bill qua tài khoản OpenAI Platform theo **giá API chuẩn** | API key/codex access token **KHÔNG** bật Work Cloud local access; là lựa chọn mặc định tự nhiên cho automation/CI |

**Lệnh & thao tác dùng hằng ngày:**

- `codex` - interactive; `codex exec "task"` - non-interactive (progress → `stderr`, kết quả cuối → `stdout`; thêm `--json` để parse, `-o file` để ghi kết quả cuối, `--ephemeral` khi không muốn lưu session rollout files xuống đĩa); `codex review` - code review; `codex mcp add` - MCP.
- Trong session: `/plan` (Plan mode cho việc đa bước), `/goal` (mục tiêu dài), `/review` (review cục bộ), `@` mention file, `/permissions` (đổi permission/sandbox nhanh), `/status` (xem quota), `/memories` (bật memory từng chat).
- Trong lúc agent chạy: **Enter = steer** (chèn điều hướng vào lượt đang chạy), **Tab = queue** (xếp lượt sau).

**Config knobs chính (`config.toml`):**

- `sandbox_mode`: `read-only | workspace-write | danger-full-access` (enum theo docs; chính sách team: `danger-full-access` bị CẤM - §5.2).
- `approval_policy`: `on-request | never | { granular = { sandbox_approval, rules, mcp_elicitations, request_permissions, skill_approval } }`; Docs còn có `approvals_reviewer = "auto_review"` (subagent reviewer duyệt hộ) - **chính sách team: KHÔNG dùng; màn hình duyệt luôn do chính bạn xác nhận** (guide công ty mẹ cấm đại diện duyệt).
- `[sandbox_workspace_write] network_access = true` + `features.network_proxy` (experimental, **off by default**) + allowlist/deniedlist domain (denied list luôn thắng). Proxy chỉ filter lệnh chạy trong sandbox local - web search/MCP/connector/cloud không đi qua (chi tiết §5.3).
- `project_doc_max_bytes`: mặc định **32 KiB** cho AGENTS.md chain.
- Web search cho chat local: **cached mode là mặc định** (dùng index do OpenAI giữ, hoạt động cả khi tắt network của lệnh); cần tin mới nhất mới `live` (`--search` cho 1 run; cấu hình `allowed_web_search_modes`). Guide công ty mẹ: giữ `cached`/`indexed`; `live` chỉ khi cần và không có dữ liệu nhạy trong context.
- Local Codex memories **mặc định tắt** - bật qua Settings → Personalization → "Enable Codex memories" hoặc `/memories` từng chat.

**Model & effort khi thanh toán bằng ChatGPT:** GPT-6 Luna = nhẹ/nhanh nhất (chỉnh sửa nhỏ, trích xuất dữ liệu), GPT-6 Astra = mạnh nhất (mặc định nếu không cần tiết kiệm), GPT-6.1 Sol & Terra ở giữa (Terra cho viết ngắn từ tư liệu + computer-use có tiêu chí rõ - lưu ý: computer-use/browser automation KHÔNG dùng trong quy trình hiện tại theo guide công ty mẹ). Kết hợp effort: ví dụ `Luna · Low` cho sửa nhỏ; `Luna · Extra high` cho tìm ngữ cảnh nhiều app/xếp việc.

📚 Nguồn: [Sandbox](https://learn.chatgpt.com/docs/sandboxing) · [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security) · [Codex environments](https://learn.chatgpt.com/docs/environments/modes) · [Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees) · [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode) · [Scheduled tasks](https://learn.chatgpt.com/docs/automations) · [Long-running work](https://learn.chatgpt.com/docs/long-running-work) · [Authentication](https://learn.chatgpt.com/docs/auth) · [Model selection](https://learn.chatgpt.com/docs/model-selection) · [Web search](https://learn.chatgpt.com/docs/web-search) · [Config reference](https://learn.chatgpt.com/docs/config-file/config-reference)

---

## 3. Nguyên tắc prompting hiệu quả

### 3.1 Cấu trúc 4 phần (tài liệu chính thức "Prompting")

- **Goal:** kết quả cần là gì, cho ai đọc.
- **Context:** nguồn/dữ liệu nào liên quan (attach file, @-mention file, screenshot, yêu cầu web search kèm yêu cầu nêu nguồn).
- **Output:** định dạng, độ dài, mức chi tiết cần.
- **Boundaries:** những gì KHÔNG được đổi/phải hỏi lại trước khi làm (1-2 ranh giới quan trọng nhất là đủ, đừng kiểm soát mọi bước).

> Viết **kết quả mong muốn**, không cần chỉ từng bước trừ khi quy trình chính là quan trọng. Đặc biệt với Work/Codex: nêu **"done" trông như thế nào** (ví dụ mẫu báo cáo, definition of done, test pass). **Chính sách team (guide công ty mẹ): MỌI yêu cầu cho Codex khai báo 4 điểm - đối tượng (thư mục/file được phép), công việc (làm gì), cấm (không xoá / không gửi ngoài / không truy cập ngoài thư mục), và bước xác nhận (xem danh sách ứng viên/diff trước khi chạy). Mẹo "1-2 boundaries" nói về cách diễn đạt; với task Codex thì khai báo 4 điểm là bắt buộc - vì vậy mục "cấm" PHẢI liệt kê tường minh kiểu "đừng..." (guide thắng mẹo diễn đạt).**

### 3.2 Mẹo được tài liệu chính thức khuyến nghị

- **Codex:** `@`/`/mention` file cụ thể, IDE tự kèm file đang mở; việc đa bước dùng `/plan` (Plan mode) cho Codex khảo sát + hỏi rõ trước khi sửa code; có Goal mode cho việc dài (`/goal`).
- **Lặp lại theo lượt:** lần prompt đầu không cần hoàn hảo; review → hỏi sửa cụ thể (steer). Trong Codex CLI: `Enter` khi đang chạy = **steer** (chèn thêm thông tin vào lượt hiện tại), `Tab` = **queue** (đợi lượt sau).
- **Tự kiểm trước khi giao:** yêu cầu model "final check" (vd: xác nhận mỗi action item có owner + due date; so lech 2 file trước khi kết thúc) - rồi **bạn vẫn phải tự review** trước khi dùng/đăng tải.
- **Custom instructions** (Settings > Personalization): đặt các sở thích áp dụng toàn cục ở custom instructions; chi tiết chỉ ứng cho chat hiện tại thì để trong prompt. Dự án thì dùng `AGENTS.md` (§6).
- **Yêu cầu nguồn:** khi cần thông tin mới, yêu cầu **web search + yêu cầu dẫn nguồn**; khi cần số liệu chính xác tuyệt đối, ưu tiên đưa model công cụ (tính toán trong script, dữ liệu thật) thay vì tin phép tính "một mạch" trong prompt.

### 3.3 Cơ sở khoa học - vì sao prompting như vậy hiệu quả

- Paper **Chain-of-Thought (Wei et al., 2022)**: cho model "suy nghĩ từng bước" trước khi trả lời giúp tăng đáng kể độ chính xác trên các bài toán phức tạp - tương đương với việc yêu cầu model liệt kê các bước/kiểm tra trước khi kết luận.
- Paper **ReAct (Yao et al., 2022)**: kết hợp **reasoning + acting** (nghĩ rồi hành động, dùng công cụ) tốt hơn cả hai rời rạc - tương đương cho phép agent dùng công cụ tìm kiếm/đọc file thay vì đoán từ trí nhớ.
- Paper **Principled Instructions Are All You Need / "Prompt principles" (Bsharat et al., 2023)**: khảo sát thực nghiệm 26 nguyên tắc prompt trên nhiều dòng LLM; những nguyên tắc nổi bật nhất: **viết rõ ràng, ngắn gọn, lịch sự; thêm ngữ cảnh + ví dụ few-shot; yêu cầu trả lời theo từng bước; ưu tiên câu khẳng định hành vi mong muốn thay vì câu phủ định kiểu "đừng..."; thêm "không được bịa, nếu thiếu thông tin hãy nói không biết" khi cần chính xác.**
- **The Prompt Report (Schulhoff et al., 2024)**: khảo sát hệ thống 58 kỹ thuật prompting - kết luận: prompt tốt = mô tả nhiệm vụ + ngữ cảnh + ví dụ + hướng dẫn rõ ràng; kỹ thuật nào phức tạp hơn cần được so sánh trên benchmark cụ thể, không có kỹ thuật "thắng mọi lúc".
- **Tách instruction khỏi dữ liệu động** (OpenAI prompt engineering guide): dùng delimiter rõ ràng (`"""`, XML tag, `###`) bọc phần dữ liệu đầu vào động (nội dung người dùng, file, trang web) để tránh prompt injection và "instruction drift"; yêu cầu model trả lời chỉ dựa vào tài liệu đã cung cấp, không có thì nói "không có trong tài liệu" + trích dẫn nguyên văn.
- **Khác biệt giữa model thường và reasoning model:** với model thường, few-shot + "từng bước" rất hữu ích; với reasoning model, bỏ phrase kiểu "think step by step", giữ prompt ngắn - trực tiếp - tập trung vào ràng buộc & tiêu chí thành công (theo Reasoning guide). Liên kết với chính sách 4 điểm: mẹo diễn-đạt-khẳng-định áp cho phần mô tả công việc; còn mục "cấm" trong khai báo task Codex phải liệt kê tường minh kiểu "đừng xoá/đừng gửi ngoài" (guide công ty mẹ).
- **Đánh giá prompt như đánh giá code:** dùng **Evals** (benchmark bộ test chuẩn) khi team thay đổi prompt dùng chung - tránh "prompt regression".
- **Vì sao model bịa?** Paper của nhóm nghiên cứu OpenAI *"Why Language Models Hallucinate"* (Kalai, Nachum, Vempala, Zhang - 2025): hallucination là hệ quả của **cơ chế khuyến khích** - chấm điểm thưởng câu đúng còn "không biết" bị coi như câu sai → **đoán mò có thể lãi hơn thành thật**, nên model được huấn luyện thành "thí sinh quá tự tin". Đối sách: **cho phép trả lời "không biết", yêu cầu dẫn nguồn, RAG/đưa tài liệu thật vào context, benchmark thực tế như SimpleQA cho thấy độ chính xác factual chưa cao** - luôn cần vòng verify.
- **"Why Johnny Can't Prompt" (Zamfirescu-Pereira et al., CHI '23):** nghiên cứu quan sát thấy non-expert thất bại khi thiết kế prompt vì **thử-sai bất kể (ad-hoc)**, **nhân hóa LLM như con người** thay vì hệ thống tất định, và **tổng quát hóa từ một kết quả thành công** thay vì kiểm thử theo test case. Bài học cho team: chốt prompt chuẩn theo checklist + bộ test, không tinh chỉnh theo cảm hứng từng lần.

### 3.4 Anti-pattern prompting (cấm)

- Prompt cụt không ngữ cảnh ("fix bug", "làm đẹp hơn") - kết quả sẽ là đoán mò.
- Đưa **rất nhiều dữ liệu nhạy cảm/phí** vào prompt khi chỉ cần phần liên quan (tốn credit + rủi ro §4).
- Buộc model "chỉ trả lời đúng" mà không cho phép "không biết/hỏi lại" → đẩy model bịa (hallucination).
- Cấu trúc prompt "tầng tầng" quá mức khi 1 câu rõ ràng hơn là đủ.
- Tin **số liệu, link, trích dẫn** model xuất ra mà không kiểm tra - đặc biệt link tài nguyên, luật, giá tiền (rủi ro hallucination cao nhất).

📚 Nguồn: [Prompting (ChatGPT Learn)](https://learn.chatgpt.com/docs/prompting) · [Prompt engineering (OpenAI API docs)](https://platform.openai.com/docs/guides/prompt-engineering) · [Reasoning models](https://platform.openai.com/docs/guides/reasoning) · [Working with evals](https://platform.openai.com/docs/guides/evals) · [Best practices (Codex)](https://learn.chatgpt.com/guides/best-practices) · [Model selection](https://learn.chatgpt.com/docs/model-selection) · Paper: [CoT](https://arxiv.org/abs/2201.11903) · [ReAct](https://arxiv.org/abs/2210.03629) · [Prompt principles](https://arxiv.org/abs/2312.16171) · [The Prompt Report](https://arxiv.org/abs/2406.06608) · [Why Language Models Hallucinate](https://arxiv.org/abs/2509.04664) · [Why Johnny Can't Prompt (CHI '23)](https://doi.org/10.1145/3544548.3581388)

---

## 4. Bảo mật dữ liệu dự án - quy tắc vàng

> Nguyên tắc nền: **ChatGPT/Codex là dịch vụ điện toán đám mây. Mọi thứ bạn nhập, đính kèm, hoặc cho agent đọc đều là dữ liệu được tải lên hệ thống OpenAI.** Chỉ đưa vào khi bạn đồng ý rủi ro đó.

### 4.1 Tách bạch thông tin theo độ nhạy

| Loại dữ liệu | Quy tắc |
|---|---|
| **Secrets/mã nguồn nhạy cảm tuyệt đối** (API key, token, private key, password, .env, key CI/CD, chứng chỉ) | **CẤM dán vào prompt, file đính kèm, AGENTS.md, project, memory.** Thay bằng placeholder (`$API_KEY`), tham chiếu tên biến. Nếu lỡ dán vào chat: **dừng ngay, BẢO TOÀN bằng chứng (không tự xoá chat/log), báo lead/IT-security (thêm đầu mối dữ liệu cá nhân nếu có PII) rồi revoke + rotate secret** - xoá chat chỉ khi lead/IT chỉ thị (luồng sự cố công ty mẹ: dừng -> bảo toàn -> báo cáo -> vô hiệu hoá). |
| **Mã nguồn dự án** | Chỉ cho Codex/Work đọc ở khu vực workspace được phép; không upload cả repo của khách/hợp đồng chưa cho phép lên cloud task. Chia sẽ mã trong phạm vi quyền đã duyệt. |
| **Dữ liệu cá nhân (PII) khách hàng** | TUYỆT ĐỐI không dán định danh. Quy cách masking theo guide công ty mẹ: thay bằng mã ID (bảng đối chiếu lưu riêng); **xoá** email/số điện thoại khỏi dữ liệu trước khi đưa; địa chỉ → giữ tới cấp hành chính cao nhất (tỉnh/thành); ngày sinh → nhóm tuổi (vd "30s"); nơi làm việc/trường học → ngành/vai trò/quy mô; không bao giờ dữ liệu sức khoẻ; cân nhắc synthetic data. |
| **Tài liệu public / nội bộ thường** | Tự do dùng để phân tích, viết doc, so sánh - **chỉ khi không có credential/PII; nghi ngờ thì masking trước (xem hàng PII).** |

### 4.2 Cấu hình tài khoản & workspace (Business/Team)

- **Tài khoản cá nhân (Free/Plus/Pro):** sharing để huấn luyện đang **BẬT mặc định** → vào **Settings > Data controls** tắt *"Improve the model for everyone"*. 3 ngoại lệ "đụng lại training dù đã tắt": **(1)** bấm 👍/👎 feedback có thể gửi nguyên hội thoại đi huấn luyện, **(2)** voice mode có control chia sẻ riêng, **(3)** Codex có setting "Include environments" riêng; các chương trình Trusted Access (Daybreak Blue) cho công việc cyber có thể dùng nội dung để cải thiện model.
- **Workspace Business/Enterprise/Edu/Healthcare:** OpenAI **mặc định không dùng nội dung workspace để train** (API Platform cũng vậy); retention/memory/compliance/access do admin đặt ở tầng workspace. Team phải dùng đúng workspace này cho công việc dự án.
- **Business có SSO (SAML/OIDC) + xác nhận domain miễn phí; MFA là điều chỉnh từng account.** Enterprise: RBAC, **Compliance API** (audit log - chỉ Enterprise/Edu; Business không có), và **admin Business có thể xem/export/xoá hội thoại của member** - cân nhắc khi nhóm có dữ liệu rất nhạy.
- **Temporary chat:** không vào lịch sử, không tạo memory, không dùng cải thiện model - nhưng OpenAI **giữ bản copy đến 30 ngày vì mục đích an toàn**; "save" temp chat = chuyển thành chat thường theo cài đặt cá nhân.
- **Retention (con số đã verify):** Business - hội thoại xoá/not-saved bị xoá khỏi hệ thống trong **30 ngày** (trừ ràng buộc pháp lý); Agent mode - nội dung (chat, lịch sử duyệt web, screenshot) giữ đến khi user xoá, xoá xong purge trong **90 ngày**; project/file xoá - **30 ngày**; log của memory đã xoá - **30 ngày**.
- **Agent mode:** Plus ~**40** tin nhắn/tháng, Pro ~400, Business/Enterprise ~40 (hoặc 30 credits/tin nhắn với flexible pricing). Cho agent **đăng nhập vào** app/site = cấp quyền nó truy cập dữ liệu nhạy (email, file, settings); OpenAI **ghi nhận rõ rủi ro prompt injection** của agent mode - bật ít app cần nhất, không gõ password vào hội thoại (dùng **takeover mode**), dừng khi nghi ngờ, xoá browser data của agent sau phiên nhạy. **Lưu ý chính sách: đây là mô tả cơ chế từ docs chính thức; theo guide công ty mẹ, browser automation/computer use KHÔNG dùng trên hệ thống nghiệp vụ - browser của agent mode để OFF cho workflow của team.**
- **Memory** có thể rút từ chat cũ, file Library/Space, **và cả app kết nối (Gmail…)** **(chính sách: connector Gmail/Drive-family không dùng cho công việc - guide công ty mẹ)** **(chính sách: connector Gmail/Drive-family không dùng cho công việc - guide công ty mẹ)** - thông tin nhạy từng cấp cho app liên quan có thể "tái xuất" trong chat sau; cần containment thì dùng **project-only memory**. Memory vẫn chỉ là "lớp recall": quy tắc bắt buộc để ở `AGENTS.md`/docs (§6).
- **Projects:** project chia sẻ = **mọi member xem + tải được mọi file trong project**; dữ liệu project tài khoản cá nhân chỉ bị train nếu owner VÀ toàn bộ contributor đều để training ON; Business/Enterprise mặc định không train. Không để secrets trong project files.
- **Plugins/apps/connectors:** Business **bật app mặc định BẬT** - admin audit trang Plugins sớm; Enterprise mặc định TẮT + RBAC. Có phân quyền theo app (Always ask / Allow read / low-risk / all - chế độ cuối được đánh dấu "elevated risk"), domain allowlist, DLP-lite (Drive shared drives, SharePoint/Teams sensitivity labels…; chính sách: app Google/Drive-family không cấp phát cho team; "Business bật app mặc định BẬT" là fact để audit đối chiếu, không phải quyền được dùng). **Custom MCP app chưa được OpenAI verify** - dữ liệu gửi ra ngoài tuân theo chính sách bên thứ ba, có thể giữ lâu hơn 30 ngày.

### 4.3 Hiểu về retention & dữ liệu của API

- Với ChatGPT Business/Enterprise: hội thoại, file, dữ liệu connector - **mỗi loại có rule retention riêng** (file Library tách riêng conversation; xoá chat ≠ xoá file Library; compliance records giữ 30 ngày). Xem bảng chi tiết tại ChatGPT Work overview.
- **API vs ChatGPT:** từ 2023-03-01, OpenAI API **không dùng dữ liệu khách để huấn luyện** trừ khi bạn chủ động opt-in; abuse-monitoring logs giữ tối đa **30 ngày** mặc định. Khách hàng đủ điều kiện có thể apply **Zero Data Retention (ZDR)** theo org/project - nhưng **theo từng endpoint** (chat/completions, responses, embeddings đủ điều kiện; assistants/threads/files/agents thì KHÔNG, giữ state tới khi tự xoá). Cẩn thận: input ảnh bị phân loại CSAM vẫn giữ để review thủ công; **MCP server/third-party tool tuân theo chính sách retention của bên đó**.
- **Fine-tuned model là riêng tư** (không chia sẻ, không dùng train model khác); dữ liệu fine-tune giữ tới khi bạn xoá.
- **Data residency:** API/Enterprise hỗ trợ vùng (US/EU/UK/CA/JP/KR/SG/IN/AU/UAE) cho nội dung at-rest; lưu ý **system data + third-party integration không bị chặn bởi region**; Enterprise có **EKM** (mang key riêng). Vì vậy khi dữ liệu thật nhạy: kịch bản API + ZDR + residency là cấu hình mạnh nhất.

### 4.4 Cập nhật 2025-2026 cần nắm (để không áp dụng quy tắc cũ)

- **Universal Usage Policies** áp dùng chung mọi sản phẩm; bản sửa đổi mới **có hiệu lực từ 2026-11-20** (thêm: cấm dùng output OpenAI để train model cạnh tranh, yêu cầu duyệt cho các use case quốc phòng/an ninh, review với các model-access intermediary) *(trang policy chặn client bot - 403 - đã verify bằng cách mở trực tiếp qua browser ngày 2026-11-12)*.
- Policy pillar "Respect privacy": cấm profile/monitor/score cá nhân không được phép; "Empower people": **cấm tự động hoá quyết định high-stakes (tuyển dụng, tín dụng, y tế, pháp lý...) mà không có người review** - mọi workflow team xây trên ChatGPT đều phải có human review ở các quyết định loại này. **Guide công ty mẹ nghiêm ngặt hơn với tuyển dụng: quyết định hire/reject, xếp hạng ứng viên, đánh giá con người KHÔNG giao cho Codex - kể cả dạng bản nháp dùng trực tiếp; người tự đánh giá.**
- **ChatGPT Atlas browser đã bị gỡ bỏ** - dữ liệu Atlas tách khỏi ChatGPT, xoá chat ChatGPT không xoá dữ liệu Atlas; nếu team còn dùng, phải migrate + dọn dữ liệu theo hướng dẫn của admin.
- **Custom GPTs đang bị ngừng** (chuyển sang plugins): Enterprise dừng tạo GPT mới 2026-10-26, retirement 2026-12-11; account cá nhân không tạo GPT mới. Đừng bắt đầu workflow mới dựa trên GPTs.
- Operator đã **gộp vào agent mode**; agent mode quota theo tháng như §4.2.

### 4.5 Rủi ro từ phía model & dữ liệu vào

- **Prompt injection**: nội dung từ bên ngoài (trang web, PR, data khách, file của agent browser) có thể chứa "chỉ thị" nhắm vào agent. Quy tắc: **không cho agent quyền cao hoặc tự động theo nội dung nguồn không tin được**; giữ sandbox/approval đúng theo §5; ưu tiên `web_search` chế độ `cached`/`indexed` thay vì `live` khi không cần thời gian thực; agent mode bật ít app nhất.
- **OWASP GenAI Security - LLM Top 10 for 2025** là checklist chuẩn khi thiết kế công việc AI (LLM01 Prompt Injection, LLM02 Sensitive Information Disclosure…). Team áp dụng ở mức quy trình: giới hạn dữ liệu vào, giới hạn quyền ra, kiểm định chéo kết quả.
- **Model có thể nhầm (hallucination)**: kết quả pháp lý, tiền, link, số hiệu API, phiên bản luôn **kiểm tra bằng nguồn chính thức** - như quy tắc "không tự bịa link" của chính file này (mọi link đã được kiểm tra ngày 2026-11-12).
- **Bảo mật vận hành:** encrypt AES-256 at-rest, TLS 1.2+ transit, SOC 2 Type 2, ISO/IEC 27001/27017/27018/27701, CSA STAR (theo Enterprise privacy; trang này chặn client bot - 403 - đã verify bằng cách mở trực tiếp qua browser ngày 2026-11-12) - nhưng quyền ở **provider-side của app kết nối luôn là ranh giới thực sự**: audit quyền app định kỳ.

📚 Nguồn: [Help: Data controls in ChatGPT](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt) · [Help: Temporary chat](https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt) · [Help: ChatGPT agent](https://help.openai.com/en/articles/11752874-chatgpt-agent) · [Help: Projects in ChatGPT](https://help.openai.com/en/articles/10169521-projects-in-chatgpt) · [Help: Admin controls for plugins & apps](https://help.openai.com/en/articles/11509118-admin-controls-security-and-compliance-for-plugins-and-apps) · [Help: Atlas retirement](https://help.openai.com/en/articles/20001371-chatgpt-atlas-retirement) · [Your data on the API](https://developers.openai.com/api/docs/guides/your-data) · [Usage Policies](https://openai.com/policies/usage-policies) · [Enterprise privacy](https://openai.com/enterprise-privacy/) · [Data residency expansion](https://openai.com/index/expanding-data-residency-access-to-business-customers-worldwide) · [Help: Chat and file retention policies](https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt) · [Help: Data residency (ChatGPT)](https://help.openai.com/en/articles/9903489-data-residency-and-inference-residency-for-chatgpt) · [Help: Memory](https://help.openai.com/en/articles/8590148-memory-in-chatgpt) · [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/)

---

## 5. Sandbox, Permissions & Human-in-the-loop

### 5.1 Hai tầng kiểm soát là khác nhau

- **Sandbox** = giới hạn kỹ thuật (file, lệnh, network) mà agent có thể tự làm bên trong.
- **Approval policy** = lúc nào agent phải **dừng và hỏi bạn** trước khi vượt ra ngoài.
- Mọi lệnh agent spawn (git, npm, pytest...) đều **kế thừa sandbox** - agent vẫn có thể tự làm mọi thứ chừng nào còn nằm trong phạm vi sandbox.

### 5.2 Cấu hình chuẩn team

| Tình huống | Cấu hình |
|---|---|
| Chỉ đọc/phân tích code | `sandbox_mode = "read-only"` + `approval_policy = "on-request"` |
| Sửa code trong repo version-controlled | `workspace-write` + `on-request` (preset **Auto**) |
| CI / script không tương tác | `codex exec --sandbox read-only --ask-for-approval never`  - unattended = CHỈ read-only (ghi/network cần session có người với màn hình duyệt đầy đủ) |
| Full access (`--yolo`) | **CẤM với mọi người theo guide công ty mẹ - không ngoại lệ container/devcontainer, lead cũng vậy** |

Chốt cứng: `--dangerously-bypass-approvals-and-sandbox` (alias `--yolo`) **"not recommended"** trong tài liệu chính thức. full-access bị CẤM tuyệt đối theo guide công ty mẹ: không ai được chuyển sang full access, kể cả trong container. Cần phạm vi lớn hơn? dùng `workspace-write` + rules/on-request và tự rà từng approval.

**Tư thế duyệt (guide công ty mẹ):** ưu tiên "duyệt lần này"; "luôn cho phép" chỉ dành cho lệnh chỉ-đọc an toàn - không bao giờ cho gửi ra ngoài, xoá, auth, hoặc liên kết Drive-family.

**Tư thế lệnh (phụ lục guide công ty mẹ, p.11):**

| Nhóm lệnh | Quy định team |
|---|---|
| Chỉ-đọc trong thư mục làm việc: `cat`, `head`, `tail`, `grep`, `find`, `ls`, `pwd`, `git status`, `git diff` | duyệt sau khi xem nội dung; "luôn cho phép" chỉ dành cho chỉ-đọc |
| Thay đổi trạng thái: `mv`, `cp`, `mkdir`, `sed -i`, redirect `>` | xem danh sách ứng viên/diff TRƯỚC (rule: `prompt`) |
| `rm`, `rm -rf` (xoá không thể hoàn tác) | **forbidden** - từ chối |
| Gửi ra ngoài: `curl`, `wget`, `scp`, `ssh`, `git push` | **forbidden - từ chối VÀ báo cáo** (không bao giờ "luôn cho phép") |
| Credential/quyền: `cat .env`, `env`, `sudo`, `chmod 777` | **forbidden - từ chối VÀ báo cáo** |

Không rõ lệnh? yêu cầu Codex "giải thích lệnh này làm gì" trước khi quyết.

**Thực thi (rules file):** tư thế lệnh ship kèm file mẫu - copy [`.codex/rules/default.rules`](.codex/rules/default.rules) (trong repo này) vào `<repo>/.codex/rules/` và trust project layer (§6.2). Docs: rule `forbidden` = **"Block the request without prompting"**; rule `prompt` sẽ bật màn hình duyệt; nhiều rule khớp thì quyết định chặt nhất thắng. Lệnh ghi trong sandbox tự nó không bật màn hình duyệt - rules file + kỷ luật git checkpoint (§7) là thứ giữ nguyên tư thế này; kiểm chứng mỗi rule bằng `match`/`not_match`.

**Protected paths trong writable roots:** kể cả với policy `workspace-write` mặc định, một số path luôn được bảo vệ read-only, có tính đệ quy: `.git` (thư mục hoặc pointer file - cả git directory mà pointer trỏ tới), `.agents`, `.codex`, `.aws`. Đây là cơ chế để Codex ngăn agent tự sửa cấu hình của chính nó, AWS credentials, hoặc phá lịch sử git. Toàn bộ phần còn lại của writable root vẫn ghi được; các thư mục thường như `node_modules` hay `src` không nằm trong danh sách đặc biệt này.

### 5.3 Network access

- `workspace-write` **tắt network mặc định**. Muốn phép: `[sandbox_workspace_write] network_access = true` + (nếu bật `features.network_proxy`) **allowlist domain** (denied list luôn thắng). **Chính sách (guide công ty mẹ): network chỉ mở cho đích nội bộ đã duyệt, bắt buộc nghiệp vụ; lệnh outbound trực tiếp (`curl`/`wget`/`scp`/`ssh`/`git push`, upload) là từ chối + báo cáo (tư thế lệnh §5.2). `live` web search là tính năng web-search của OpenAI, không phải lệnh outbound thô - nhưng mặc định dùng `cached`/`indexed`, `live` chỉ khi cần và không có dữ liệu nhạy trong context.**
- Proxy chỉ bảo vệ **lệnh trong sandbox** - web search, MCP, connector, cloud traffic **không đi qua proxy**; kiểm soát bằng các cấu hình riêng của từng nền (vd: internet access cho cloud task mặc định OFF).

### 5.4 Human-in-the-loop (HITL) - vai trò con người không giảm

- Hình thức ủy quyền: **Delegate** (agent làm đầu tiên) → **Review** (bạn soát) → **Own** (bạn chịu trách nhiệm ra quyết định trọng yếu).
- **Review là một phần của công việc**: soát các bước nhìn được, nguồn được dùng, hành động công cụ, kết quả - văn bản trôi chảy/trần trụi tự tin không phải là bằng chứng nhiệm vụ thành công.
- Mức review tỉ lệ **theo hậu quả** (ảnh hưởng người khác, khó rollback → review sâu hơn).
- Lưu ý quan trọng: **sửa instruction không hủy được hành động đã thực hiện** - nếu agent báo đã cập nhật hệ thống ngoài, phải vào hệ thống đó xác nhận.
- Tự động hoá review: docs có **auto-review** (`approvals_reviewer = "auto_review"`) và CLI `--approve-for-me` (route approval qua automatic review) - **nhưng guide công ty mẹ CẤM ủy quyền duyệt: màn hình duyệt luôn do người phụ trách tự kiểm. Cả hai để OFF trong quy trình này.**
- Khi có gì sai: **Redirect** (bảo sửa cụ thể) hoặc **Pause** (chặn, chờ quyết định). Dừng agent ≠ làm sạch hoàn toàn những gì đã chạy xong.

📚 Nguồn: [Sandbox](https://learn.chatgpt.com/docs/sandboxing) · [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security) · [Working with agents](https://learn.chatgpt.com/docs/working-with-agents) · [Permissions](https://learn.chatgpt.com/docs/permission-modes) · [Auto-review](https://learn.chatgpt.com/docs/sandboxing/auto-review) · [Windows sandbox](https://learn.chatgpt.com/docs/windows/windows-sandbox)

---

## 6. AGENTS.md, Rules & cấu hình team

### 6.1 AGENTS.md là gì?

**AGENTS.md** là format chuẩn mở (do OpenAI cùng nhiều bên khởi xướng - Amp, Jules/Google, Cursor, Factory - nay do Agentic AI Foundation under Linux Foundation quản trị) để ghi **hướng dẫn cho agent** trong repo. Codex đọc AGENTS.md **trước mỗi run**, ghép chain từ ~/.codex → root repo → thư mục con (file gần thư mục làm việc **đè** hướng dẫn ở trên), giới hạn mặc định **~32 KiB** (`project_doc_max_bytes`).

Cần ghi vào AGENTS.md của dự án:
- Cấu trúc repo, lệnh build/test/lint, quy ước code, quy tắc PR.
- **Boundaries**: thứ không được thay đổi (không sửa migration cũ, không đổi API public, không commit secret...), khi nào phải hỏi.
- Definition of done cho các loại task.
- Section `## Code Review Rules` để tuỳ biến review GitHub của Codex.

**Thói quen tốt:** dùng `/init` tạo khung; **cập nhật AGENTS.md mỗi khi Codex lặp lại cùng một lỗi** (tổ chức retro); giữ file ngắn - cụ thể - không chung chung; cần nhiều hướng dẫn thì chia file nhỏ liên kết thay vì nhồi một file khổng lồ.

### 6.2 Rules file (`agent-configuration/rules`)

Rules file khai báo **lệnh nào được cho phép / phải hỏi / bị cấm chạy ngoài sandbox** - dùng để bớt duyệt tay những lệnh an toàn lặp lại mà không mở khoá chung chung. Tính năng ở dạng **experimental**.

- Tạo file `.rules` trong thư mục `rules/` thuộc một config layer đang hoạt động, ví dụ `~/.codex/rules/default.rules`; project-local `<repo>/.codex/rules/` chỉ được load khi project layer đã được **trusted**.
- Cú pháp: `prefix_rule(pattern = ["gh", "pr", "view"], decision = "prompt" | "allow" | "forbidden", justification = "...")` - `pattern` khớp tiền tố lệnh.
- Khi nhiều rule cùng khớp một lệnh, Codex áp **quyết định chặt nhất: `forbidden` > `prompt` > `allow`**.
- `match` / `not_match` là "unit test inline": lệnh ví dụ được kiểm khi load rule, giúp tránh viết rule sai.
- Lệnh compound (`bash -lc "a && b"`) được tách bằng tree-sitter nếu script là chuỗi tĩnh an toàn (chỉ từ thuần + toán tử `&&`/`||`/`;`/`|`). Nếu script dùng biến, redirection, substitution, wildcard... Codex **không tách** - cả invocation được coi như MỘT lệnh (`["bash","-lc","<script>"]`) và rules áp lên toàn bộ invocation đó (hành xử conservative: không tự cấp quyền cho lệnh giấu trong script động).
- Khi bạn bấm **allow** trong TUI, Codex tự ghi `prefix_rule` vào `~/.codex/rules/default.rules` để lần sau không hỏi lại; reviewer có thể review file này như review code. **Chính sách (guide công ty mẹ): "luôn cho phép" chỉ dành cho lệnh chỉ-đọc an toàn - không bao giờ cho gửi ra ngoài, xoá, auth, Drive-family.**

### 6.3 Cấu hình `config.toml` (user/project)

- User-level `~/.codex/config.toml`: model mặc định, reasoning effort, sandbox/approval, **profiles** cho từng loại việc.
- Repo-level `.codex/config.toml` (chỉ khi project trusted): cấu hình theo dự án.
- **MCP**: cơ chế như docs (`codex mcp add ...`, bảng `[mcp_servers]`) - nhưng chính sách trước (guide công ty mẹ): **KHÔNG nối plugin / MCP server / liên kết ngoài chưa được duyệt.** MCP server mới chỉ được nối sau khi **xác nhận với AI推進室 (phòng Xúc tiến AI)**. **CẤM hoàn toàn Google-family MCP (điển hình: Google Drive)**: Drive có thể chứa credentials, dữ liệu ứng viên, hợp đồng; nếu màn hình duyệt xin nối Google-family MCP -> **từ chối + báo cáo**.
- **Subagents**: hỗ trợ chia việc trong run phức tạp.
- **Memories**: OFF mặc định; bật khi cần. **Không thay thế AGENTS.md.**
- Ghi nhớ: **quy tắc bắt buộc của team nằm trong AGENTS.md/docs trong repo** (commit được, review được), không nằm trong memory cá nhân.

### 6.4 Skills (đóng gói quy trình dùng lại)

- Skill = thư mục chứa **SKILL.md** (metadata + hướng dẫn) cùng script/asset tùy chọn. Codex chỉ load SKILL.md khi skill được chọn (tiết kiệm context).
- Vị trí: **personal** = `~/.agents/skills`; **dùng chung team** = commit vào `.agents/skills/` trong repo.
- Bắt đầu nhanh với skill **`$skill-creator`** để scaffold; giữ phiên bản đầu local, sẵn sàng rồi mới share trong repo.
- Nguồn tham khảo/khám phá: **skills.sh** ("The Agent Skills Directory" - thu thập skill từ các GitHub repos nổi bật); cũng theo dõi release notes/docs AI agent để nắm skill mới.
- Với skill từ nguồn bên ngoài: **review như review một PR** - đọc hết SKILL.md, kiểm lệnh chạy và nguồn dữ liệu nó dùng. **Review kiểu PR chỉ là bước kiểm tra kỹ thuật trước: theo guide công ty mẹ KHÔNG cài gì chưa được duyệt - MỌI skill/plugin từ nguồn ngoài cần duyệt của AI推進室 (Kido) trước khi cài cho team; lead review SKILL.md là bước kỹ thuật đi trước.**

📚 Nguồn: [AGENTS.md (Codex)](https://learn.chatgpt.com/docs/agent-configuration/agents-md) · [agents.md (chuẩn mở)](https://agents.md) · [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules) · [Config reference](https://learn.chatgpt.com/docs/config-file/config-reference) · [MCP](https://learn.chatgpt.com/docs/extend/mcp) · [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents) · [Customization overview (skills)](https://learn.chatgpt.com/docs/customization/overview) · [skills.sh](https://skills.sh) · [openai/codex (GitHub)](https://github.com/openai/codex)

---

## 7. Flow làm việc chuẩn theo giai đoạn

Tài liệu chính thức "Building an AI-Native Engineering Team" chia SDLC thành các giai đoạn với mô hình **Delegate / Review / Own** - team áp dụng như sau:

| Giai đoạn | Agent làm đầu (Delegate) | Con người giữ (Review/Own) |
|---|---|---|
| **Plan/Phân tích requirement** | Agent đọc spec, đối chiếu codebase, đánh dấu điều mơ hồ, tách subtask, ước lượng mức độ khó | Ước lượng story point, quyết định ưu tiên/trình tự - **quyết định sản phẩm vẫn thuộc về người** |
| **Design/Thiết kế** | Scaffold boilerplate, dựng prototype theo ảnh/figma, map design → component | Kiến trúc, pattern, chất lượng + accessibility, hướng UX |
| **Build** | Implement feature end-to-end theo spec (data model, API, UI, test, PR description) | Rà soát kiến trúc, đường dẫn performance/nghiệp vụ quan trọng, giữ pattern codebase |
| **Code review** | Local `/review`, GitHub `@codex review`, auto-review PR, security review (các cơ chế này chỉ viết comment - không tự approve/merge) | Đọc diff, quyết định merge; comment Codex là gợi ý không phải phán quyết; mọi PR do người review và merge (guide công ty mẹ) |
| **Test/Nghiệm thu** | Viết test, chạy pipeline chuẩn (`lint`, test suite nhỏ nhất liên quan), re-run sau khi fix | Nghiệm thu nghiệp vụ, edge case sản phẩm |
| **Maintain/Doc** | Viết/cập nhật README, CHANGELOG, ADR từ diff; kiểm tra link tài liệu | Duyệt chuẩn tài liệu; xác nhận thông tin quan trọng |

**Flow chuẩn "plan → implement → verify" cho mọi task code:**

1. **Khai báo bối cảnh:** AGENTS.md + `@-mention` file + spec/issue cụ thể.
2. **Bắt đầu bằng `/plan`** cho việc đa bước; review + chốt plan (milestone, rollback strategy).
3. **Giao implement**, dùng steer/queue để điều hướng giữa chừng thay vì dừng lượt chạy.
4. **Verify:** chạy repro step, lint + test nhỏ nhất, `/review`; so khớp "done" đã nêu từ đầu.
5. **Git checkpoint trước/sau** (commit sạch) - dùng worktree nếu cần chạy song song.
6. **Ghi nhận phản hồi** vào AGENTS.md (đừng để Codex lặp lại lỗi).
7. **Cân nhắc chi phí với Work/Cloud:** việc chạy cloud tiêu hao nhiều hơn - so khớp giá trị.

📚 Nguồn: [Building an AI-Native Engineering Team](https://learn.chatgpt.com/guides/build-ai-native-engineering-team) · [Best practices (Codex)](https://learn.chatgpt.com/guides/best-practices) · [Code review](https://learn.chatgpt.com/docs/code-review) · [Review GitHub PRs with Codex](https://learn.chatgpt.com/docs/third-party/github) · [Codex GitHub Action](https://learn.chatgpt.com/docs/github-action)

---

## 8. Quản lý chi phí và giới hạn sử dụng

- **Included trong plan:** Plus $20/tháng; Pro từ $100 (các tier $100/$200/$500); Business $20/user/tháng (kỳ thanh toán năm; $25 nếu tính tháng, tối thiểu 2 users). Codex được dùng trong các plan này. Cloud task **có thể** tiêu hao allowance nhiều hơn chat local (tùy model và task) - local và cloud **dùng chung quota** của plan.
- **Giới hạn theo cửa sổ 5 giờ** (đối với việc local; Pro hiện không có cap 5 giờ; có thể có weekly limits). Việc dùng chung giữa Codex / ChatGPT Work / ChatGPT for Excel... **chia sẻ cùng quota agentic**.
- Ước lượng tin nhắn trên cửa sổ 5 giờ (Plus, Standard Business): GPT-6 Luna nhiều nhất (~350-3.000), GPT-6.1 Terra ~35-285, GPT-6.1 Sol ~15-160, GPT-6 Astra ~5-45 - mức khác nhau theo từng model và độ phức tạp: **độ dài prompt, context, reasoning, tool use, retrieval, caching** đều ảnh hưởng; "prompt ngắn" không phải luôn rẻ.
- **Credits:** khi vượt hạn mức, Buy credits để tiếp tục (Plus/Pro/workspace Business). Giá theo token/1M tùy model & tốc độ (Fast/Ultrafast có multiplier x2-x8).
- **Theo dõi sử dụng:** `chatgpt.com/codex/settings/usage` hoặc `/status` trong Codex CLI.
- **Gợi ý tiết kiệm:**
  - Chiến lược chọn model theo giai đoạn: model suy luận mạnh (effort cao) cho việc "nghĩ" - phân tích, lập plan/spec, viết docs, brainstorming, review phức tạp; model nhẹ/nhanh + effort thấp cho việc "làm" đã có spec rõ (refactor nhỏ, test lặp lại, format). Model choice, context, reasoning đều ảnh hưởng usage.
  - Chọn model vừa đủ (model-selection guide); task nhỏ → model nhẹ/effort thấp (Low); chỉ Medium/High/Extra High cho việc phức tạp.
  - Không nhồi prompt file khổng lồ khi chỉ cần vài phần (đính kèm phần liên quan).
  - Mặc định dùng `cached`/`indexed` web search mode; chỉ `live` khi cần mới nhất.
  - Việc lặp lại định kỳ đã ổn định → gói scheduled automation để **tiết kiệm thời gian/ổn định quy trình** (lưu ý: mỗi lần chạy automation vẫn **tính usage như chạy thủ công** - không giảm quota). Automation và CI chạy **chỉ read-only** (theo §5.2, unattended duy nhất là read-only - không có màn hình duyệt để ủy quyền). Task nghiệp vụ cần ghi tự động → redesign thành attended hoặc read-only; yêu cầu đó được xem lại hoặc tách thành các bước read-only có người giám sát..
  - **KHÔNG mở `danger-full-access` - guide công ty mẹ cấm với mọi người (không ngoại lệ container).** Phạm vi rộng hơn đạt qua `workspace-write` + allowlist domain nội bộ đã duyệt; web search giữ `cached`/`indexed` mặc định (docs ghi chú: full access sẽ tự chuyển search sang `live`, tăng rủi ro prompt injection - thêm một lý do để tắt).

📚 Nguồn: [Pricing (ChatGPT Learn)](https://learn.chatgpt.com/docs/pricing) · [Help: using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan) · [Model selection](https://learn.chatgpt.com/docs/model-selection) · [Feature maturity](https://learn.chatgpt.com/docs/feature-maturity)

---

## 9. Các lỗi thường gặp & cách tránh

| # | Lỗi thường gặp | Hệ quả | Cách tránh |
|---|---|---|---|
| 1 | Dán secret/credential vào prompt | Secret vào log/hệ thống cloud, rủi ro lộ | Cấm dán; lỡ dán: dừng, giữ bằng chứng, báo lead/IT-security, revoke + rotate key |
| 2 | Prompt cụt không ngữ cảnh | Kết quả đoán mò, sửa sai chỗ | Goal/Context/Output/Boundaries; @-mention file |
| 3 | Tin tuyệt đối kết quả agent | Code sai logic, security lỗ hổng | Luôn verify: test + lint + review + repro; "fluent ≠ đúng" |
| 4 | Bật `--yolo`/full-access cho tiện | Rủi ro toàn máy; tài liệu chính thức ghi "not recommended" | Preset Auto; full-access bị CẤM hoàn toàn (guide công ty mẹ) - kể cả trong container |
| 5 | Bật network mặc cho dễ | Agent ra ngoài mạng vô kiểm soát (exfil, gọi API lạ) | Mặc định tắt; bật có allowlist khi cần |
| 6 | Cho agent hoạt động trên nội dung ngoài tin được (web/PR/file khách) với quyền cao | Prompt injection → hành động không mong muốn | Sandbox chặt; approval on-request; ưu tiên `cached`/`indexed` search mode |
| 7 | Nhồi 1 file AGENTS.md khổng lồ, mơ hồ | Agent bỏ qua hướng dẫn; vượt 32KiB limit | Ngắn, cụ thể, chia file; cập nhật khi thấy lặp lỗi |
| 8 | Dùng memory để lưu "luật team" | Mất định hướng khi máy khác/sau reset | Quy tắc sống ở `AGENTS.md`/docs trong repo |
| 9 | Không git checkpoint trước khi chạy agent | Không rollback nổi khi sửa sai | Commit/stash sạch trước; checkpoint sau khi duyệt |
| 10 | Không nêu giới hạn phạm vi/thời gian với Work/Cloud task | Tốn credit vô ích, agent chạy dài | Nêu "khi nào dừng", scope rõ, theo dõi usage dashboard `/status` |
| 11 | Tin link/số/trích dẫn model không verify | Báo cáo sai sự thật, ref chết | Rà qua link/số trước khi dùng (như quiz này làm) |
| 12 | Dùng account cá nhân Plus cho dự án nhạy | Dữ liệu business rơi vào hệ thống có training opt-in | Workspace Business; cấu hình data controls đúng |
| 13 | Việc nhỏ quá mà chạy Work/Cloud | Tốn credit; chờ lâu | Chat thường đủ; Work chỉ cho deliverable nhiều bước |
| 14 | Bỏ qua plan mode cho việc đa bước | Agent tự hành động sai hướng | `/plan` (Plan mode) rồi mới implement |
| 15 | Nhầm "chat + tool" khi cần "agent" | Không định nghĩa được "done"/review point | 3 câu hỏi tự kiểm trước khi giao (§1) |

📚 Nguồn: [Working with agents](https://learn.chatgpt.com/docs/working-with-agents) · [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security) · [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) · [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/) · [Build AI-Native Team](https://learn.chatgpt.com/guides/build-ai-native-engineering-team)

---

## 10. Checklist nhanh hàng ngày

**Cá nhân:**
- [ ] Đã ở đúng workspace Business + đúng project cho việc liên quan dự án?
- [ ] Prompt có Goal/Context/Output/Boundaries - và với task Codex có 4 điểm (đối tượng / công việc / cấm / xác-nhận-trước-khi-chạy)? Có nêu "done" + verify?
- [ ] Không có secret/PII trong prompt, file, AGENTS.md, project?
- [ ] Cấu hình sandbox/approval đúng loại việc (không yolo)?
- [ ] Kết quả đã qua: test/lint/review + kiểm tra sự thật trước khi dùng?
- [ ] Ghi chú lỗi lặp của agent vào AGENTS.md?
- [ ] Kiểm tra usage (`/status` hoặc chatgpt.com/codex/settings/usage) trước khi giao việc lớn?

**Lead/admin:**
- [ ] AGENTS.md của dự án cập nhật cùng quy ước mới; section `## Code Review Rules` hợp tình trạng hiện tại?
- [ ] Admin console: plugin/skill/membership đúng phạm vi; audit logs + analytics khi cần?
- [ ] Rà soát các yêu cầu "hỏi trước khi làm" cho hành động ra hệ thống thật (send/publish/deploy)?
- [ ] Đào tạo onboarding: mọi người đọc file này + hoàn thành quiz trước khi dùng ChatGPT/Codex cho dự án?

---

## 11. Tra cứu nhanh (cheatsheet)

```text
# Chọn bề mặt
Câu hỏi / draft ngắn               -> Chat
Nhiều bước + nhiều file/nguồn    -> ChatGPT Work
Liên quan codebase               -> Codex (IDE khi đang mở file, CLI khi cần shell/script,
                                    Cloud khi cần chạy song song/cấp PR)

# Prompt (4 phần)
Goal / Context @file / Output format / Boundaries + "done khi nào"
MỌI task Codex: đối tượng / công việc / cấm / xác-nhận-trước-khi-chạy (guide công ty mẹ)
Việc đa bước                     -> /plan trước; /goal cho mục tiêu dài
Lượt đang chạy                   -> Codex CLI: Enter = steer, Tab = queue
Yêu cầu nguồn                    -> web search + nêu rõ nguồn cần đính

# Sandbox / approval
read-only + on-request            -> phân tích, không sửa
workspace-write + on-request (Auto)-> default cho repo
codex exec --sandbox read-only --ask-for-approval never -> CI
--yolo / danger-full-access       -> CẤM (guide công ty mẹ) - với mọi người
network_access = true             -> chỉ khi cần + allowlist đích NỘI BỘ đã duyệt (guide: outbound = từ chối + báo cáo)

# An toàn
Tuyệt đối không: secret, .env, private key, PII khách, source nhạy chưa duyệt
Lỡ dán:  dừng -> giữ bằng chứng (không tự xoá) -> báo lead/IT -> revoke + rotate
Nghi ngờ: prompt injection -> ngừng + review nguồn vào

# Browser/computer automation -> CẤM cho hành động nghiệp vụ (người tự làm)
https://learn.chatgpt.com/llms.txt          -> index toàn bộ docs (.md đợi sẵn)
https://learn.chatgpt.com/docs/whats-new    -> cập nhật hàng tuần
https://academy.openai.com                      -> khóa học chính thức
```

---

## 12. Nguồn tham khảo

**Tài liệu chính thức - ChatGPT Learn / Codex (learn.chatgpt.com & developers.openai.com):**
- Index toàn bộ docs (.md đợi sẵn): https://learn.chatgpt.com/llms.txt · Export một file: https://learn.chatgpt.com/docs/llms-full.txt
- Foundations: [Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt) · [Prompting](https://learn.chatgpt.com/docs/prompting) · [Working with agents](https://learn.chatgpt.com/docs/working-with-agents) · [Model selection](https://learn.chatgpt.com/docs/model-selection) · [Personalize](https://learn.chatgpt.com/docs/personalize)
- Bảo mật/vận hành: [Sandbox](https://learn.chatgpt.com/docs/sandboxing) · [Permissions](https://learn.chatgpt.com/docs/permissions) · [Permission modes](https://learn.chatgpt.com/docs/permission-modes) · [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security) · [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules) · [Security administration](https://learn.chatgpt.com/docs/security-administration)
- Đội nhóm & flow: [Best practices](https://learn.chatgpt.com/guides/best-practices) · [AI-Native Engineering Team](https://learn.chatgpt.com/guides/build-ai-native-engineering-team) · [Get started with ChatGPT Work](https://learn.chatgpt.com/docs/get-started-with-work) · [Projects](https://learn.chatgpt.com/docs/projects) · [Long-running work](https://learn.chatgpt.com/docs/long-running-work)
- Cấu hình/dev: [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) · [Config reference](https://learn.chatgpt.com/docs/config-file/config-reference) · [Authentication](https://learn.chatgpt.com/docs/auth) · [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode) · [MCP](https://learn.chatgpt.com/docs/extend/mcp) · [Customization overview (skills)](https://learn.chatgpt.com/docs/customization/overview) · [Glossary](https://learn.chatgpt.com/docs/glossary)
- Cập nhật: [What's new](https://learn.chatgpt.com/docs/whats-new) · [Changelog](https://learn.chatgpt.com/docs/changelog) · [Feature maturity](https://learn.chatgpt.com/docs/feature-maturity)

**Help Center / chính sách (mỗi link bên dưới đã được agent mở và đọc trực tiếp ngày 2026-11-12; openai.com & help.openai.com chặn client bot - 403 - nên nếu tự check chỉ thấy 403 là bình thường):**
- [Data controls in ChatGPT](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt) - toggle training & các ngoại lệ
- [Temporary chat in ChatGPT](https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt)
- [Memory in ChatGPT](https://help.openai.com/en/articles/8590148-memory-in-chatgpt)
- [Projects in ChatGPT](https://help.openai.com/en/articles/10169521-projects-in-chatgpt)
- [GPTs in ChatGPT](https://help.openai.com/en/articles/8554407-gpts-in-chatgpt)
- [ChatGPT agent](https://help.openai.com/en/articles/11752874-chatgpt-agent)
- [Admin controls, security & compliance for plugins and apps](https://help.openai.com/en/articles/11509118-admin-controls-security-and-compliance-for-plugins-and-apps)
- [ChatGPT Atlas retirement](https://help.openai.com/en/articles/20001371-chatgpt-atlas-retirement)
- [Setting up SSO for ChatGPT Business](https://help.openai.com/en/articles/11489188-setting-up-single-sign-on-sso-for-chatgpt-business)
- [Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)
- [Chat and file retention policies](https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt) *(trích trong docs chính thức)*
- [Data residency and inference residency](https://help.openai.com/en/articles/9903489-data-residency-and-inference-residency-for-chatgpt) *(trích trong docs chính thức)*
- [Enterprise privacy](https://openai.com/enterprise-privacy/)
- [Usage Policies (universal)](https://openai.com/policies/usage-policies)
- [Your data - OpenAI API docs](https://developers.openai.com/api/docs/guides/your-data)
- [Data residency expansion (announcement)](https://openai.com/index/expanding-data-residency-access-to-business-customers-worldwide)

**OpenAI Platform (API docs):**
- [Prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering) · [Safety best practices](https://platform.openai.com/docs/guides/safety-best-practices) · [Prompt caching](https://platform.openai.com/docs/guides/prompt-caching) · [Production best practices](https://platform.openai.com/docs/guides/production-best-practices) · [Models](https://platform.openai.com/docs/models) · [API Reference](https://platform.openai.com/docs/api-reference)

**Nội bộ (công ty mẹ):**
- [openai/codex (GitHub)](https://github.com/openai/codex) · [agents.md](https://agents.md) · [skills.sh - The Agent Skills Directory](https://skills.sh) · [OpenAI Academy](https://academy.openai.com) · [A practical guide to building agents (PDF)](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)
- Bảo mật AI: [OWASP GenAI - LLM Top 10 for 2025](https://genai.owasp.org/llm-top-10/)

**Paper khoa học (arXiv/ACM):**
- [Chain-of-Thought Prompting Elicits Reasoning in LLMs](https://arxiv.org/abs/2201.11903) - Wei et al. (2022, Google)
- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629) - Yao et al. (2022, Princeton/Google)
- [Principled Instructions Are All You Need… ("Prompt principles", 26 nguyên tắc)](https://arxiv.org/abs/2312.16171) - Bsharat et al. (2023)
- [The Prompt Report: A Systematic Survey of Prompt Engineering Techniques](https://arxiv.org/abs/2406.06608) - Schulhoff et al. (2024)
- [Why Language Models Hallucinate](https://arxiv.org/abs/2509.04664) - Kalai, Nachum, Vempala, Zhang (OpenAI, 2025) + [openai.com/index/why-language-models-hallucinate](https://openai.com/index/why-language-models-hallucinate/)
- [Evaluating Large Language Models Trained on Code (HumanEval)](https://arxiv.org/abs/2107.03374) - Chen et al. (OpenAI, 2021)
- [Why Johnny Can't Prompt: How Non-AI Experts Try (and Fail) to Design LLM Prompts](https://doi.org/10.1145/3544548.3581388) - CHI '23 (ACM)

> **Quy tắc "không bịa link" của chính team:** mọi link trong file này đã được mở/kiểm tra HTTP 200 vào ngày 2026-11-12 (bằng tool chính thức hoặc agent verify trực tiếp từng URL). Các URL help.openai.com có chặn bot (403) nhưng được trích **nguyên văn** trong tài liệu chính thức của OpenAI đã tải ngày 2026-11-12 - vẫn được xem là verify. Khi thêm link mới vào file này, người thêm phải tự check bằng cách mở trước khi commit.

---
*Hết. Tiếp theo: mở **`quiz/QUIZ-OPENAI-RULES.html`** trong trình duyệt và làm bài 40 câu để kiểm tra kiến thức.*
