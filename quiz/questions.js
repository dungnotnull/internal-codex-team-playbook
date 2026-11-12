/* QUIZ DATA - song ngữ vi/ja. Kiểm chứng link ngày 2026-11-12.
 * multi=true: người dùng chọn nhiều đáp án; đúng khi khớp trọn bộ correct.
 * Không dùng ký tự gạch dài (em dash) trong toàn bộ nội dung hiển thị. */
window.QUIZ_DATA = {
  "vi": {
    ui: {
      htmlTitle: "Quiz 40 câu - Quy tắc làm việc với OpenAI / ChatGPT / Codex",
      kicker: "Team IT - Onboarding Quiz",
      h1: "Quy tắc làm việc với OpenAI / ChatGPT / Codex",
      sub: "40 câu · chấm điểm thang 10 · gồm câu chọn 1 đáp án và câu chọn nhiều đáp án. Đọc kỹ <strong>WORKING-RULES-WITH-OPENAI.md</strong> trước khi làm bài. Bài không lưu lịch sử - sau khi nộp, hệ thống chấm và hiển thị đáp án đúng + giải thích + link tài liệu tham khảo.",
      legendGreen: "Đã trả lời",
      legendMulti: "Câu multi-select",
      legendDiff: "Dễ / TB / Khó = độ khó",
      answered: "Câu đã trả lời:",
      submit: "Nộp bài - Chấm điểm",
      scoreMetaFmt: "Đúng {0}/{1} câu · {2} câu sai/bỏ trống",
      byGroup: "Theo từng nhóm:",
      wrongListFmt: "<strong>Các câu chưa đúng:</strong> {0} - xem giải thích và link tham khảo ngay dưới mỗi câu.",
      allPerfect: "Bạn trả lời đúng tất cả các câu. Giải thích chi tiết vẫn hiển thị dưới đây để ôn lại.",
      bands: [
        "9 điểm trở lên: Xuất sắc - có thể hướng dẫn các thành viên khác.",
        "7-8.9: Tốt - đọc lại những câu sai để chắc chắn.",
        "5-6.9: Trung bình - cần đọc kỹ lại file WORKING-RULES-WITH-OPENAI.md.",
        "3-4.9: Yếu - cần đọc lại và hỏi lead các điểm không rõ.",
        "Dưới 3: Rất yếu - bắt buộc đọc lại toàn bộ quy tắc trước khi dùng ChatGPT/Codex cho dự án."
      ],
      right: "Chính xác.",
      wrong: "Chưa đúng.",
      correctAnswerPrefix: "Đáp án đúng: ",
      youChose: "Bạn đã chọn: ",
      notChosen: "Bạn chưa chọn.",
      explain: "Giải thích: ",
      refsLabel: "Tài liệu tham khảo (link đã kiểm tra 2026-11-12):",
      retake: "Làm lại từ đầu",
      reviewHint: "Cuộn xuống dưới để xem từng câu: đánh giá đúng/sai, đáp án đúng, giải thích và link tham khảo.",
      confirmUnansweredFmt: "Bạn còn {0} câu chưa trả lời (câu: {1}).\n\nChọn 'OK' để nộp bài (câu bỏ trống sẽ bị tính sai), hoặc 'Cancel' để quay lại làm nốt.",
      multiBadge: "Chọn nhiều đáp án",
      qNumFmt: "Câu {0}/{1}",
      footer: "Nguồn quy tắc: WORKING-RULES-WITH-OPENAI.md · docs chính thức OpenAI (learn.chatgpt.com, help.openai.com, platform.openai.com) + paper arXiv + OWASP GenAI. Toàn bộ link tham khảo đã được kiểm tra (HTTP 200 hoặc trích nguyên văn trong tài liệu chính thức) ngày 2026-11-12.",
      diffs: { easy: "Dễ", medium: "Trung bình", hard: "Khó" }
    },
    questions: [
      {
        cat: "Chính sách & tài khoản",
        diff: "easy",
        multi: false,
        q: "Workspace ChatGPT Business (kỳ thanh toán năm, tối thiểu 2 users) được mô tả trong tài liệu chính thức là:",
        options: [
          "Dữ liệu business được dùng để huấn luyện mô hình theo mặc định",
          "Không dùng dữ liệu business để huấn luyện theo mặc định, có admin console, SAML SSO/MFA",
          "Chỉ dành cho cá nhân, không có admin",
          "Bắt buộc mua credits riêng để dùng Codex"
        ],
        correct: [1],
        note: "Theo trang Pricing (ChatGPT Learn) và Help Center 'Using Codex with your ChatGPT plan': gói Business $20/người/tháng (kỳ năm) - $25 nếu tính tháng, tối thiểu 2 users - với workspace riêng, SAML SSO/MFA và mặc định KHÔNG dùng dữ liệu business để huấn luyện. Team dùng đúng workspace này cho công việc dự án.",
        refs: [
          { label: "Pricing - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/pricing" },
          { label: "Help: Using Codex with your ChatGPT plan", url: "https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan" }
        ]
      },
      {
        cat: "Bảo mật dữ liệu",
        diff: "easy",
        multi: true,
        q: "Những đối tượng nào TUYỆT ĐỐI không được dán vào prompt, file đính kèm hay AGENTS.md? (chọn nhiều)",
        options: [
          "API key / access token / password",
          "File .env chứa credentials",
          "Private key, chứng chỉ, key CI/CD",
          "PII của khách hàng chưa khử định danh",
          "Tài liệu public về framework đang dùng",
          "Tên hàm/module công khai trong repo"
        ],
        correct: [0, 1, 2, 3],
        note: "ChatGPT/Codex là dịch vụ cloud: mọi thứ nhập vào, đính kèm, hoặc cho agent đọc đều được tải lên máy chủ OpenAI. Secrets (key/token/env/credential/PII) phải thay bằng placeholder (vd $API_KEY), dữ liệu khách phải mask/anonymize. Nếu lỡ dán secret: xoá hội thoại, rotate secret ở hệ thống gốc, báo lead. Lưu ý thêm: bấm phản hồi 👍/👎 có thể gửi nguyên hội thoại đi huấn luyện dù đã tắt 'Improve the model for everyone'.",
        refs: [
          { label: "Help: Data controls in ChatGPT", url: "https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt" },
          { label: "Help: Chat and file retention policies", url: "https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt" }
        ]
      },
      {
        cat: "Prompting",
        diff: "medium",
        multi: true,
        q: "Theo docs chính thức 'Prompting', một prompt tốt cho việc quan trọng nên có những cấu phần nào? (chọn nhiều)",
        options: [
          "Goal - kết quả cần là gì, cho ai",
          "Context - nguồn/dữ liệu liên quan",
          "Output - định dạng, độ dài, mức chi tiết",
          "Boundaries - cái gì không được đổi, lúc nào phải hỏi lại",
          "Bribe - hứa thưởng tiền để tăng chất lượng",
          "Repeat - lặp lại toàn bộ câu hỏi 10 lần"
        ],
        correct: [0, 1, 2, 3],
        note: "Tài liệu chính thức 'Prompting' (learn.chatgpt.com/docs/prompting) định nghĩa 4 cấu phần: Goal / Context / Output / Boundaries - dùng phần nào giúp được phần đó, không cần đủ cả. Cũng theo cùng trang: nêu rõ 'done' trông như thế nào và yêu cầu model tự 'final check' - rồi bạn vẫn phải tự review trước khi dùng. Cơ chế: cấu trúc rõ giúp model phân biệt nhiệm vụ, ngữ cảnh, định dạng - giảm nhiễu và giả định sai (xem thêm The Prompt Report, arXiv 2406.06608).",
        refs: [
          { label: "Prompting - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/prompting" },
          { label: "The Prompt Report (arXiv)", url: "https://arxiv.org/abs/2406.06608" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "easy",
        multi: false,
        q: "Trong Codex CLI, khi Codex đang chạy, phím tắt steer/queue có ý nghĩa gì?",
        options: [
          "Enter = Queue (đợi lượt sau), Tab = Steer (chèn vào lượt hiện tại)",
          "Enter = Steer (chèn thông tin vào lượt hiện tại), Tab = Queue (lưu cho lượt tiếp theo)",
          "Enter = huỷ lượt chạy, Tab = lưu draft",
          "Cả hai đều là gửi ngay và chờ trả lời mới"
        ],
        correct: [1],
        note: "Cơ chế của docs chính thức: trong lúc Codex đang chạy, Enter (CLI) là Steer - thêm điều hướng cho lượt hiện tại; Tab là Queue - xếp vào lượt sau. Mục tiêu: không gián đoạn luồng làm việc dài của agent.",
        refs: [
          { label: "Prompting - Codex CLI (ChatGPT Learn)", url: "https://learn.chatgpt.com/docs/prompting" }
        ]
      },
      {
        cat: "Sandbox & quyền",
        diff: "easy",
        multi: true,
        q: "Những giá trị nào hiện là chế độ sandbox hợp lệ của Codex? (chọn nhiều)",
        options: [
          "read-only",
          "workspace-write",
          "danger-full-access",
          "network-only",
          "untrusted"
        ],
        correct: [0, 1, 2],
        note: "Tài liệu 'Agent approvals & security' và Config reference: sandbox_mode thuộc tập read-only | workspace-write | danger-full-access. Chú ý 'untrusted' là approval_policy đã bị gỡ khỏi Codex - không phải sandbox mode; 'network-only' không tồn tại (network là setting riêng: sandbox_workspace_write.network_access).",
        refs: [
          { label: "Agent approvals & security - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-approvals-security" },
          { label: "Config reference - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/config-file/config-reference" }
        ]
      },
      {
        cat: "Sandbox & quyền",
        diff: "medium",
        multi: false,
        q: "Ở chế độ sandbox 'workspace-write', network access mặc định là:",
        options: [
          "Bật tự động cho tất cả domain",
          "Tắt; muốn bật phải set [sandbox_workspace_write] network_access = true trong config",
          "Tắt tuyệt đối, không có cách nào bật riêng",
          "Chỉ bật khi dùng Codex Cloud"
        ],
        correct: [1],
        note: "Theo docs chính thức: workspace-write (mặc định Auto cho repo version-controlled) tắt network của lệnh trong sandbox; muốn cho phép thì bật network_access = true và có thể kèm allowlist domain qua features.network_proxy (denied list luôn thắng allowlist). Cơ chế: giới hạn 'lộ dữ liệu ra ngoài' - chỉ mở khi cần và theo allowlist.",
        refs: [
          { label: "Agent approvals & security - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-approvals-security" },
          { label: "Sandboxing - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/sandboxing" }
        ]
      },
      {
        cat: "Sandbox & quyền",
        diff: "hard",
        multi: false,
        q: "Network proxy / allowlist domain trong sandbox của Codex BẢO VỆ những gì, và KHÔNG bảo vệ những gì?",
        options: [
          "Bảo vệ lệnh trong sandbox; KHÔNG lọc web search, MCP, connector, cloud traffic",
          "Bảo vệ tất cả mọi request từ bất kỳ bề mặt nào",
          "Chỉ bảo vệ Codex Cloud, không bảo vệ CLI",
          "Chỉ bảo vệ web search, không bảo vệ lệnh"
        ],
        correct: [0],
        note: "Tài liệu ghi rõ: proxy lệnh trong sandbox chỉ là một lớp; web search, MCP, app/connector call và cloud traffic KHÔNG đi qua proxy - phải kiểm soát bằng cấu hình riêng (vd internet access mặc định OFF cho cloud task; ưu tiên web_search mode 'cached'/'indexed' thay 'live' để giảm prompt injection).",
        refs: [
          { label: "Agent approvals & security - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-approvals-security" },
          { label: "Web search - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/web-search" }
        ]
      },
      {
        cat: "Sandbox & quyền",
        diff: "hard",
        multi: false,
        q: "Cờ --dangerously-bypass-approvals-and-sandbox (alias --yolo) của Codex CLI có ý nghĩa và khuyến nghị như thế nào?",
        options: [
          "Tăng tốc agent gấp đôi, được docs khuyến nghị dùng thường xuyên",
          "Bỏ cả sandbox lẫn approval; docs ghi 'not recommended' - chỉ nên dùng trong container/devcontainer bạn giám sát",
          "Bật network cho toàn máy một cách an toàn",
          "Tắt audit log theo chuẩn doanh nghiệp"
        ],
        correct: [1],
        note: "Theo docs: full-access bỏ mọi giới hạn kỹ thuật và mọi cơ chế hỏi - được đánh dấu Elevated Risk / 'not recommended'; nếu cần, chạy bên trong container bạn kiểm soát (dùng --sandbox danger-full-access trong container). Bí danh --yolo mô tả đúng tinh thần 'không hỏi ai'.",
        refs: [
          { label: "Agent approvals & security - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-approvals-security" },
          { label: "Sandboxing - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/sandboxing" }
        ]
      },
      {
        cat: "Sandbox & quyền",
        diff: "medium",
        multi: true,
        q: "Trong chính sách sandbox workspace-write mặc định, những đường dẫn nào được bảo vệ ở chế độ read-only? (chọn nhiều)",
        options: [
          ".git",
          ".agents",
          ".codex",
          ".aws",
          "node_modules",
          "src/"
        ],
        correct: [0, 1, 2, 3],
        note: "Docs 'Agent approvals & security': trong writable roots, các path .git, .agents, .codex, .aws được bảo vệ read-only (kể cả đệ quy). Cơ chế: tránh agent tự sửa cấu hình agent, credentials AWS hoặc phá lịch sử git; node_modules/src không nằm trong danh sách đặc biệt này.",
        refs: [
          { label: "Agent approvals & security - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-approvals-security" }
        ]
      },
      {
        cat: "Human-in-the-loop",
        diff: "medium",
        multi: false,
        q: "Tuyên bố nào đúng về bản chất 'instructions vs permissions' khi giao việc cho agent?",
        options: [
          "Chỉ cần viết instruction rõ là đủ, còn quyền thì agent tự quyết định",
          "Chỉ cần cấu hình permission chặt là đủ, không cần mô tả brief",
          "Cả hai: instructions truyền đạt ý định; permissions kiểm soát quyền truy cập - dùng song song",
          "Permissions chỉ dành cho admin công ty, cá nhân không cần"
        ],
        correct: [2],
        note: "Tài liệu 'Working with agents' nhấn mạnh: instructions communicate intent; permissions control access - nghĩa là brief (task/context/actions/output + 'done') và permission modes (cho phép gì, khi nào hỏi) là hai tầng kiểm soát bổ trợ nhau, không thay thế nhau.",
        refs: [
          { label: "Working with agents - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/working-with-agents" },
          { label: "Permission modes - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/permission-modes" }
        ]
      },
      {
        cat: "AGENTS.md & cấu hình",
        diff: "medium",
        multi: false,
        q: "Codex đọc AGENTS.md như thế nào khi chạy trong một thư mục dự án?",
        options: [
          "Chỉ đọc file AGENTS.md đầu tiên tìm thấy ở ổ đĩa (ngẫu nhiên)",
          "Ghép chain từ ~/.codex xuống root repo và tới thư mục làm việc; file gần thư mục làm việc có độ ưu tiên cao hơn (xuất hiện sau trong prompt); giới hạn mặc định 32 KiB (project_doc_max_bytes)",
          "Chỉ đọc AGENTS.md nằm trong thư mục root, bỏ qua tất cả thư mục con",
          "Đọc AGENTS.md sau khi đã hoàn thành task"
        ],
        correct: [1],
        note: "Theo docs 'AGENTS.md': Codex ghép instruction chain mỗi run - global (~/.codex/AGENTS.override.md hoặc AGENTS.md) - từ Git root đi xuống tới cwd (mỗi thư mục tối đa 1 file, AGENTS.override.md > AGENTS.md), concatenate từ root xuống; phần sau đè phần trước; tổng giới hạn mặc định 32 KiB (project_doc_max_bytes).",
        refs: [
          { label: "AGENTS.md - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-configuration/agents-md" },
          { label: "agents.md (chuẩn mở)", url: "https://agents.md" }
        ]
      },
      {
        cat: "AGENTS.md & cấu hình",
        diff: "easy",
        multi: false,
        q: "Quy tắc bắt buộc của team (must-always-apply) nên được lưu ở đâu?",
        options: [
          "Trong memory cá nhân của assistant, để tiện tự nhớ",
          "Quyết định tại phiên chat, để tự phát",
          "Trong AGENTS.md / tài liệu được commit trong repo",
          "Trong file ghi chú cá nhân ngoài repo"
        ],
        correct: [2],
        note: "Docs 'Memories' nói rõ: giữ quy tắc bắt buộc trong AGENTS.md hoặc tài liệu được commit; memory chỉ là 'lớp recall' (và local Codex memories mặc định TẮT) - không phải nguồn quy tắc đáng tin cậy cho compliance.",
        refs: [
          { label: "Memories - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/customization/memories" },
          { label: "AGENTS.md - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-configuration/agents-md" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "medium",
        multi: true,
        q: "Slash command nào có thật trong Codex và docs mô tả đúng ý nghĩa? (chọn nhiều)",
        options: [
          "/plan - Plan mode: khảo sát + hỏi rõ trước khi làm việc đa bước",
          "/init - scaffold AGENTS.md khởi điểm cho repo",
          "/resume - mở lại chat đã lưu; /compact - tóm tắt ngữ cảnh khi chat dài",
          "/review - review các thay đổi trong Git checkout của bạn",
          "/deploy - deploy thẳng production, không cần review",
          "/wipe-history - xoá toàn bộ history của repo"
        ],
        correct: [0, 1, 2, 3],
        note: "Slash commands đã verify trong docs: /plan (Plan mode), /init (scaffold AGENTS.md), /resume, /compact (kèm auto-compact), /review (presets review local trong CLI/IDE), /status (trạng thái phiên), /goal (Goal mode), /memories (memory từng chat). Khi agent đang chạy: Enter = steer, Tab = queue. Lưu ý /deploy, /wipe-history KHÔNG tồn tại - deploy luôn phải qua người review.",
        refs: [
          { label: "Best practices - ChatGPT Learn", url: "https://learn.chatgpt.com/guides/best-practices" },
          { label: "Code Review - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/code-review" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "easy",
        multi: false,
        q: "Với công việc lặp lại có quy trình (vd: PR review theo checklist, triage log, draft release notes), chuẩn hóa với Codex như thế nào?",
        options: [
          "Gửi lại cùng một prompt dài nhiều lần cho quen tay",
          "Đóng gói thành Skill (SKILL.md); team check-in vào .agents/skills trong repo, cá nhân để ở $HOME/.agents/skills; dùng skill-creator để scaffold",
          "Nhét thêm 1000 dòng vào AGENTS.md cho an toàn",
          "Skill chỉ có trên marketplace có phí, repo không tự làm được"
        ],
        correct: [1],
        note: "Best practices: khi workflow ổn định thì 'turn repeatable work into skills' - mỗi skill một job, input/output rõ ràng, description nêu rõ khi nào dùng; skill-creator scaffold bản đầu, giữ local khi iterate trước khi check-in team. Nguyên tắc: 'skills define the method, scheduled tasks define the schedule' - workflow còn cần steering nhiều thì rút thành skill; chạy định kỳ thì dùng Scheduled task (gọi được skill, chạy trong dedicated worktree).",
        refs: [
          { label: "Best practices - ChatGPT Learn", url: "https://learn.chatgpt.com/guides/best-practices" },
          { label: "Scheduled tasks - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/automations" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "medium",
        multi: false,
        q: "Khi dùng `codex exec` cho CI/script (chạy không tương tác), câu nào mô tả ĐÚNG hành vi mặc định và cách cấu hình?",
        options: [
          "Mặc định chạy sandbox read-only; muốn cho sửa file thêm --sandbox workspace-write; --full-auto đã bị gỡ khỏi CLI (script cũ phải đổi sang --sandbox workspace-write hoặc --approve-for-me)",
          "Mặc định full access cho nhanh, không cần cờ nào",
          "--full-auto là flag chuẩn hiện tại cho CI",
          "codex exec không hỗ trợ sandbox, phải set biến môi trường riêng"
        ],
        correct: [0],
        note: "Theo docs 'Non-interactive mode': codex exec chạy progress ra stderr, kết quả cuối ra stdout (dùng --json để parse, -o <file> --output-last-message để ghi kết quả cuối, --ephemeral cho việc không đụng repo); MẶC ĐỊNH là read-only sandbox, cho phép sửa file bằng --sandbox workspace-write, full access bằng danger-full-access; '--full-auto is no longer supported'. CI dùng CODEX_API_KEY=<api-key> codex exec --json để cấp credential tường minh.",
        refs: [
          { label: "Non-interactive mode - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/non-interactive-mode" },
          { label: "Agent approvals & security - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-approvals-security" }
        ]
      },
      {
        cat: "Bảo mật dữ liệu",
        diff: "easy",
        multi: true,
        q: "Nếu lỡ tay dán API key/token của công ty vào một chat, những bước xử lý nào ĐÚNG quy trình? (chọn nhiều)",
        options: [
          "Xoá hội thoại chứa secret ngay",
          "Rotate/đổi secret ở hệ thống gốc (revoke + cấp key mới)",
          "Báo lead/IT để đánh giá phạm vi lộ",
          "Chờ đến hết phiên làm việc rồi tự hiểu",
          "Đổi tên file để giấu tên key"
        ],
        correct: [0, 1, 2],
        note: "Việc xoá hội thoại chỉ giảm rủi ro lưu giữ theo retention; secret vẫn có thể đã vào log/đã bị dùng. Chuẩn xử lý sự cố: 1) revoke + rotate key ngay, 2) xoá hội thoại, 3) báo lead để kiểm tra hoạt động bất thường. 'Chờ hết phiên' và 'đổi tên file' không vô hiệu hoá secret đã lộ.",
        refs: [
          { label: "Working with agents - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/working-with-agents" },
          { label: "OWASP GenAI - LLM Top 10", url: "https://genai.owasp.org/llm-top-10/" }
        ]
      },
      {
        cat: "Prompting",
        diff: "medium",
        multi: false,
        q: "Để giảm hallucination khi cần thông tin chính xác, cách nào phù hợp nhất?",
        options: [
          "Đợi model trả lời nhanh rồi tin tuyệt đối vì model mới đã rất thông minh",
          "Cho phép model trả lời 'không biết / hỏi lại', yêu cầu dẫn nguồn + kiểm chứng lại bằng nguồn chính thức",
          "Càng viết dài càng tốt, ép model phải luôn có đáp án",
          "Gửi cùng một câu hỏi đi rất nhiều lần rồi chọn câu trả lời đầu tiên"
        ],
        correct: [1],
        note: "Nguyên tắc 'no-guess' + 'cite sources' là hướng docs chính thức khuyến nghị (flag missing information instead of guessing; ask for sources). Nền tảng khoa học: ReAct (arXiv 2210.03629) - cho model dùng công cụ/nguồn ngoài giúp neo vào bằng chứng thật; 'Why Language Models Hallucinate' (arXiv 2509.04664, OpenAI) giải thích root cause là cơ chế khuyến khích khiến model 'đoán' thay vì thừa nhận không biết - nên phải chủ động cho phép 'I don't know' và luôn verify bằng test/nguồn chính thức.",
        refs: [
          { label: "ReAct (arXiv)", url: "https://arxiv.org/abs/2210.03629" },
          { label: "Why Language Models Hallucinate (arXiv, OpenAI)", url: "https://arxiv.org/abs/2509.04664" },
          { label: "Prompting - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/prompting" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "medium",
        multi: false,
        q: "/plan trong ChatGPT/Codex dùng lúc nào?",
        options: [
          "Sau khi code đã chạy xong, để review",
          "Trước khi implement một việc đa bước/khó - cho Codex khảo sát và đề xuất hướng tiếp cận, hỏi rõ điều mơ hồ trước khi sửa code",
          "Chỉ dùng trong Codex CLI, không dùng được trong app",
          "Kể chuyện với model"
        ],
        correct: [1],
        note: "Theo docs 'Prompting' và 'Best practices': với việc đa bước, dùng Plan mode (/plan, hoặc Shift+Tab) để Codex thu thập ngữ cảnh và hỏi rõ trước khi code; có Goal mode (/goal) cho mục tiêu dài hạn. Đây là cách giảm hành động sai hướng khi việc còn mơ hồ.",
        refs: [
          { label: "Prompting - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/prompting" },
          { label: "Best practices - ChatGPT Learn", url: "https://learn.chatgpt.com/guides/best-practices" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "medium",
        multi: true,
        q: "Trước khi merge một PR do agent (Codex) sinh ra, team cần làm gì? (chọn nhiều)",
        options: [
          "Chạy lint + test suite nhỏ nhất liên quan, đọc report kết quả",
          "Chạy /review (local) hoặc @codex review trên GitHub để có nhận xét riêng",
          "Đọc diff bằng mắt, kiểm tra khớp 'done' đã nêu",
          "Merge ngay vì agent đã nói 'done' và văn bản rất trôi chảy",
          "Xoá branch trước khi xem diff để tiết kiệm dung lượng"
        ],
        correct: [0, 1, 2],
        note: "Nguyên tắc HITL: 'Fluent writing or a confident summary is not enough' - review là phần của công việc; kết hợp verify tự động (test/lint) + review (local /review hoặc GitHub @codex review) + mắt người đọc diff. Merge trước khi review hay xoá branch trước khi đọc đều bỏ cơ chế bảo vệ.",
        refs: [
          { label: "Working with agents - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/working-with-agents" },
          { label: "Review GitHub PRs with Codex", url: "https://learn.chatgpt.com/docs/third-party/github" }
        ]
      },
      {
        cat: "Chính sách & tài khoản",
        diff: "medium",
        multi: false,
        q: "Đăng nhập Codex: khi nào dùng 'Sign in with ChatGPT' và khi nào dùng API key?",
        options: [
          "Sign in with ChatGPT dùng theo plan đã có (Codex Cloud yêu cầu cách này; duy nhất nó bật được Work Cloud local access); API key dùng usage-based theo giá API chuẩn, phù hợp CI (CODEX_API_KEY) - nhưng không bật được Work Cloud local access",
          "Luôn dùng API key vì rẻ hơn ChatGPT",
          "Chỉ dùng Sign in with ChatGPT, không có phương án API key",
          "API key dùng để train model riêng cho team"
        ],
        correct: [0],
        note: "Theo docs 'Authentication': Codex có 2 cách sign-in cho local clients - 'Sign in with ChatGPT' (subscription access; usage theo workspace) và 'Sign in with an API key' (usage-based, bill qua tài khoản Platform theo giá API chuẩn; là lựa chọn mặc định tự nhiên cho automation - CODEX_API_KEY dùng được với codex exec/review/SDK). 'Codex cloud requires signing in with ChatGPT' và 'API keys and Codex access tokens do not enable Local computer access with Work Cloud'.",
        refs: [
          { label: "Authentication - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/auth" },
          { label: "Help: Using Codex with your ChatGPT plan", url: "https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan" }
        ]
      },
      {
        cat: "Human-in-the-loop",
        diff: "hard",
        multi: false,
        q: "Nếu bạn phát hiện agent đã làm sai ở giữa chừng và bạn sửa lại instruction, câu nào ĐÚNG?",
        options: [
          "Sửa instruction tự hoàn tác những gì agent đã thực hiện",
          "Sửa instruction không hoàn tác hành động đã xong - phải kiểm tra kết quả trên hệ thống mục tiêu và dùng các control (dừng, pause, đổi quyền) khi cần",
          "Không có cách nào kiểm soát agent một khi đã giao việc",
          "Phải xoá luôn toàn bộ dự án"
        ],
        correct: [1],
        note: "Docs 'Working with agents': 'Changing an instruction does not undo an action already completed. If an agent reports updating another system, inspect the saved result there.' - cần dùng controls (dừng, pause, thu hồi quyền) và vào hệ thống thật (git, ticket, message) để xác nhận, không tin báo cáo của agent mù quáng.",
        refs: [
          { label: "Working with agents - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/working-with-agents" }
        ]
      },
      {
        cat: "AGENTS.md & cấu hình",
        diff: "medium",
        multi: false,
        q: "Để tuỳ biến Codex khi nó review GitHub PR của repo, bạn sẽ làm gì theo docs?",
        options: [
          "Nhắn tin trực tiếp cho model qua Slack",
          "Thêm section '## Code Review Rules' vào AGENTS.md gần file/đường dẫn được quản lý + comment '@codex review' trên PR",
          "Không thể tuỳ biến, chỉ dùng cấu hình mặc định",
          "Chỉnh source code của model"
        ],
        correct: [1],
        note: "Docs 'AGENTS.md' và 'Review GitHub PRs with Codex': section '## Code Review Rules' trong AGENTS.md đặt gần dòng code quản lý sẽ được dùng cho GitHub code review; trên PR dùng comment '@codex review' (kèm focus: '@codex review for security vulnerabilities').",
        refs: [
          { label: "AGENTS.md - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-configuration/agents-md" },
          { label: "Review GitHub PRs with Codex", url: "https://learn.chatgpt.com/docs/third-party/github" }
        ]
      },
      {
        cat: "Anti-pattern & chất lượng",
        diff: "medium",
        multi: false,
        q: "Prompt injection (LLM01 trong OWASP Top 10 for LLM 2025) thường đến từ đâu nhất trong quy trình team?",
        options: [
          "Từ chính assistant của team",
          "Từ nội dung bên ngoài không tin được: trang web, file khách hàng gửi, PR/comment, kết quả tìm kiếm - agent có thể đọc và 'nghe theo chỉ thị' trong đó",
          "Từ code trong AGENTS.md",
          "Chỉ từ model cũ, model mới không có"
        ],
        correct: [1],
        note: "Prompt injection: dữ liệu không tin được (web, file, mail, PR...) có thể chứa chỉ thị nhắm vào agent. Đối sách mức quy trình: nội dung ngoài vào workspace có sandbox chặt + approval on-request; ưu tiên web_search mode 'cached'/'indexed' thay 'live'; không cho agent quyền send/publish/deploy không kiểm soát; rà OWASP LLM Top 10 như checklist.",
        refs: [
          { label: "OWASP GenAI - LLM Top 10 for 2025", url: "https://genai.owasp.org/llm-top-10/" },
          { label: "Web search - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/web-search" }
        ]
      },
      {
        cat: "Anti-pattern & chất lượng",
        diff: "hard",
        multi: false,
        q: "Trong OWASP GenAI Security Project - LLM Top 10 for 2025, rủi ro số 1 (LLM01) là gì?",
        options: [
          "LLM01 - Prompt Injection",
          "LLM01 - Model Theft",
          "LLM01 - Supply Chain",
          "LLM01 - Hallucination"
        ],
        correct: [0],
        note: "Theo trang chính thức OWASP GenAI Security Project (genai.owasp.org/llm-top-10/), LLM01 là Prompt Injection (có dạng Direct/Indirect); tiếp theo là Sensitive Information Disclosure (LLM02)... Team dùng danh sách này như checklist kiểm soát quyền và dữ liệu khi thiết kế quy trình AI.",
        refs: [
          { label: "OWASP GenAI - LLM Top 10 for 2025", url: "https://genai.owasp.org/llm-top-10/" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "medium",
        multi: true,
        q: "Về web search trong chat Codex local, những phát biểu nào đúng? (chọn nhiều)",
        options: [
          "cached là mặc định: dùng index do OpenAI duy trì, hoạt động cả khi network của lệnh bị tắt",
          "indexed: tìm trong các nguồn đã được index",
          "live: lấy trực tiếp trang web - dùng khi task phụ thuộc thông tin mới nhất",
          "dark: tìm ngầm không ghi log"
        ],
        correct: [0, 1, 2],
        note: "Docs 'Web search': chat local mặc định chạy cached search; indexed là chế độ index; live dùng cho thông tin mới nhất (CLI: --search cho từng lượt chạy; cấu hình allowed_web_search_modes). Ưu tiên cached/indexed thay live để giảm rủi ro prompt injection từ trang không tin cậy.",
        refs: [
          { label: "Web search - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/web-search" },
          { label: "Agent approvals & security - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-approvals-security" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "medium",
        multi: false,
        q: "Muốn ghép thêm công cụ/dịch vụ bên ngoài (MCP server) vào Codex, cách đúng theo docs là gì?",
        options: [
          "codex mcp add <tên> ... hoặc khai báo [mcp_servers.<tên>] trong config; đặt required = true nếu workflow phụ thuộc server này",
          "Sửa mô tả model trong AGENTS.md để tự sinh MCP",
          "Cài MCP riêng trong ChatGPT app, Codex tự nhận biết",
          "Không thể mở rộng công cụ, Codex chỉ dùng tool mặc định"
        ],
        correct: [0],
        note: "MCP server khai báo table [mcp_servers.<tên>] (stdio cần 'command', remote cần 'url'); CLI có codex mcp add. Với codex exec: nếu MCP server required = true mà khởi động lỗi thì codex exec thoát với error thay vì bỏ qua - tránh chạy task thiếu công cụ bắt buộc.",
        refs: [
          { label: "Extend with MCP - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/extend/mcp" },
          { label: "Non-interactive mode - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/non-interactive-mode" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "medium",
        multi: true,
        q: "Về Codex Cloud, những phát biểu nào đúng? (chọn nhiều)",
        options: [
          "Yêu cầu đăng nhập Sign in with ChatGPT",
          "Internet access của cloud task mặc định OFF - có thể cấu hình riêng cho từng environment",
          "Chạy được nhiều task song song trên các worktree/environment, xong xem diff để review",
          "Dùng được API key để chạy Codex Cloud"
        ],
        correct: [0, 1, 2],
        note: "Docs: 'Codex Cloud requires signing in with ChatGPT'; internet access là cài đặt của environment (mặc định OFF theo nguyên tắc least-privilege); worktrees cho phép nhiều chat/task độc lập trên cùng repo mà không xung đột. API key/codex access token KHÔNG bật được Work Cloud local access - cloud đi theo workspace ChatGPT.",
        refs: [
          { label: "Codex Cloud - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/cloud" },
          { label: "Worktrees - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/environments/git-worktrees" },
          { label: "Authentication - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/auth" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "medium",
        multi: false,
        q: "Mọi người muốn chạy song song nhiều việc trên cùng một repo Git với Codex - pattern chuẩn trong docs? ",
        options: [
          "Mỗi việc một git worktree (chung git history, khác thư mục làm việc) để các chat/task độc lập không đụng nhau",
          "Cả team dùng chung đúng một thư mục làm việc cho mọi agent",
          "Copy nguyên repo ra nhiều bản thủ công rồi gộp lại bằng tay",
          "Codex không hỗ trợ chạy nhiều việc trên một repo"
        ],
        correct: [0],
        note: "Docs 'Worktrees': worktrees dùng Git worktree thật dưới mui - mỗi việc một thư mục, các chat chạy độc lập không xung đột; chỉ áp dụng với project là Git repo; scheduled tasks chạy trên background worktree riêng để không đụng branch người đang làm. Chiến lược: plan local - implementation song song - review diff - merge PR.",
        refs: [
          { label: "Worktrees - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/environments/git-worktrees" }
        ]
      },
      {
        cat: "AGENTS.md & cấu hình",
        diff: "medium",
        multi: false,
        q: "Codex đọc cấu hình từ đâu?",
        options: [
          "User-level ~/.codex/config.toml + project-scoped .codex/config.toml; profile riêng dạng $CODEX_HOME/<tên>.config.toml",
          "Chỉ đọc config nằm trong repo, không có config user-level",
          "Chỉ chỉnh qua GUI, không có file cấu hình",
          "Mỗi lần chạy sẽ hỏi lại toàn bộ cấu hình"
        ],
        correct: [0],
        note: "Docs 'Config reference': user config ở ~/.codex/config.toml; project override ở .codex/config.toml; profile là file $CODEX_HOME/<tên>.config.toml. Chú ý: key provider/notification/telemetry nên đặt ở user-level, không nhét vào project config - tránh repo thay đổi cấu hình máy mỗi người.",
        refs: [
          { label: "Config reference - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/config-file/config-reference" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "easy",
        multi: false,
        q: "Việc lặp lại định kỳ (tổng kết hằng ngày, dọn nhánh cũ theo lịch) chuẩn hóa bằng cơ chế nào?",
        options: [
          "Scheduled task (automation): lên lịch chạy trong background, xem trạng thái active/paused/completed trong tab Scheduled",
          "Mở đúng chat cũ mỗi ngày và gõ lại prompt",
          "Đặt reminder trong lịch cá nhân rồi copy-paste prompt thủ công",
          "Codex không hỗ trợ việc chạy theo lịch"
        ],
        correct: [0],
        note: "Docs 'Scheduled tasks': cho phép schedule recurring task chạy background (ChatGPT web/mobile; các plan đủ điều kiện có thể trigger từ app event); theo dõi recent runs trong tab Scheduled; kết hợp skills cho workflow phức tạp hơn. Với Git repo, task chạy trên worktree riêng để không đụng branch người khác.",
        refs: [
          { label: "Scheduled tasks - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/automations" },
          { label: "Worktrees - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/environments/git-worktrees" }
        ]
      },
      {
        cat: "Sandbox & quyền",
        diff: "medium",
        multi: false,
        q: "approval_policy = on-request trong Codex ý nghĩa là gì?",
        options: [
          "Codex tự chạy trong sandbox; chỉ khi cần làm việc ngoài quyền (network, lệnh ngoài workspace) mới dừng xin phép",
          "Codex xin phép cho mọi thao tác, kể cả đọc file trong workspace",
          "Codex chạy không cần xin phép vì sandbox cho phép mọi thứ",
          "Chỉ là tên gợi ý, không ảnh hưởng hoạt động"
        ],
        correct: [0],
        note: "Docs: on-request = agent tự quyết trong phạm vi sandbox, khi cần thêm quyền mới hỏi. Các giá trị khác: never (không hỏi - CI/tin cậy tuyệt đối) và granular = { sandbox_approval, rules, mcp_elicitations, request_permissions, skill_approval }; có approvals_reviewer = 'auto_review' để subagent reviewer duyệt approval prompt thay bạn.",
        refs: [
          { label: "Agent approvals & security - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-approvals-security" },
          { label: "Config reference - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/config-file/config-reference" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "easy",
        multi: false,
        q: "Script CI cần lấy kết quả của Codex để xử lý tiếp. Cách nào chuẩn theo docs?",
        options: [
          "codex exec \"...\" --json (progress chạy ra stderr, kết quả cuối ra stdout); hoặc -o <file> --output-last-message để ghi kết quả cuối ra file",
          "Phân tích toàn bộ log của CLI bằng regex",
          "Chạy qua GUI rồi chụp màn hình OCR",
          "codex exec không hỗ trợ tự động hóa"
        ],
        correct: [0],
        note: "Docs 'Non-interactive mode': codex exec streaming progress ra stderr in kết quả cuối ra stdout - dễ pipe/tách; mẫu CI trong docs: CODEX_API_KEY=<api-key> codex exec --json \"...\"; có cờ -o <path>/--output-last-message ghi message cuối ra file, --ephemeral cho việc không đụng repo.",
        refs: [
          { label: "Non-interactive mode - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/non-interactive-mode" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "easy",
        multi: false,
        q: "Công cụ review có sẵn của Codex dùng như thế nào cho đúng?",
        options: [
          "Local: chạy lệnh codex review cho thay đổi trước khi mở PR; GitHub: comment @codex review vào PR (có thể chỉ định focus, vd security)",
          "Codex không có công cụ review, phải review thủ công 100%",
          "Chỉ review được PR sau khi đã merge",
          "Phải cài thêm extension bên thứ ba trả phí"
        ],
        correct: [0],
        note: "Docs 'Code Review' + 'Non-interactive mode': codex review là lệnh built-in (CODEX_API_KEY dùng được cho codex review); review PR bằng chat không tự post comment/không approve/merge - dùng @codex review trên GitHub để có comment; tuỳ biến nguyên tắc bằng section '## Code Review Rules' trong AGENTS.md.",
        refs: [
          { label: "Code Review - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/code-review" },
          { label: "Non-interactive mode - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/non-interactive-mode" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "medium",
        multi: false,
        q: "Khi thanh toán theo plan ChatGPT, chọn model + effort trong Codex thế nào là đúng?",
        options: [
          "Luna nhẹ/nhanh nhất cho sửa nhỏ - trích xuất dữ liệu; Astra mạnh nhất - mặc định khi không cần tiết kiệm; Sol/Terra cân bằng; effort cao hơn tốn usage nhiều hơn",
          "Chỉ cần GPT-6.1 Sol/Terra là rẻ nhất cho mọi việc",
          "Model chỉ đổi được trong dashboard admin, CLI không đổi được",
          "Effort không ảnh hưởng tới mức tốn usage"
        ],
        correct: [0],
        note: "Docs 'Model selection': Luna là model 'most efficient', Astra 'state-of-the-art, most powerful' - mặc định nếu không cần tối ưu usage; GPT-6.1 Sol (chi phí hợp lý cho dự án phức tạp) và Terra (viết ngắn từ nguồn có sẵn, computer-use có tiêu chí rõ). Effort ảnh hưởng usage: ví dụ 'Luna · Low' cho chỉnh nhỏ; 'Luna · Extra high' cho tìm ngữ cảnh nhiều app / xếp việc.",
        refs: [
          { label: "Model selection - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/model-selection" },
          { label: "Pricing - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/pricing" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "medium",
        multi: false,
        q: "Thực chiến: team bắt đầu feature mới \"tạo hệ thống quản lý xe\" (đa module, yêu cầu còn mơ hồ). Flow chuẩn khi dùng Codex là gì?",
        options: [
          "Bắt tay code ngay trong chat thường, cho nhanh",
          "Bắt đầu bằng /plan cho Codex khảo sát codebase + 'interview' bạn để làm rõ yêu cầu/ranh giới; chốt thành goal có đủ Outcome - Constraints - Verification, rồi mới implement theo từng phần có test",
          "Đưa 1 câu 'làm hệ thống quản lý xe' rồi kỳ vọng",
          "Yêu cầu Codex tự đoán requirement, sai chỗ nào sửa chỗ đó"
        ],
        correct: [1],
        note: "Docs Long-running work: outcome chưa rõ thì bắt đầu bằng /plan (Plan mode cho Codex 'gather context + ask clarifying questions' - tức interview requirement); sau đó /goal với 3 thành phần khi áp dụng: Outcome (kết quả, vd: CRUD xe + hợp đồng + báo cáo), Constraints (framework, auth, chuẩn dữ liệu), Verification (test/API check làm bằng chứng xong). Áp cho hệ quản lý xe: nêu module xe/bãi/hợp đồng, ràng buộc stack + quy ước, và criteria 'test pass + demo flow đăng ký xe' trước khi code.",
        refs: [
          { label: "Long-running work - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/long-running-work" },
          { label: "Best practices - ChatGPT Learn", url: "https://learn.chatgpt.com/guides/best-practices" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "medium",
        multi: false,
        q: "Thứ tự nào mô tả đúng quy trình plan - spec - implement - testing khi code với agent Codex?",
        options: [
          "Plan chia việc nhỏ - Spec (outcome/constraints/verification + build/test/lint commands) - Implement từng phần - Test/lint/review sau mỗi phần - summary + PR",
          "Implement toàn bộ trước, viết spec và test sau cùng",
          "Chỉ cần test gộp một lần ở cuối, trung gian không cần verify",
          "Spec chỉ để trình bày cho sếp, không dùng làm tiêu chí kiểm kết quả"
        ],
        correct: [0],
        note: "Best practices: agent phải biết build/test/lint commands và 'what done means & how to verify' (nên nằm trong AGENTS.md); không chỉ bảo 'sinh code' - yêu cầu Codex tự viết test khi cần, chạy đúng test suite, confirm kết quả rồi review changes; Long-running: 'verification = tests, measurements, review criteria chứng minh xong'. Ví dụ dự án xyz: spec ghi rõ 'API tạo/đổi trạng thái xe trả 200 + có test pytest pass + lint 0 warning'.",
        refs: [
          { label: "Best practices - ChatGPT Learn", url: "https://learn.chatgpt.com/guides/best-practices" },
          { label: "Long-running work - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/long-running-work" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "easy",
        multi: false,
        q: "Quản lý phiên làm việc (session) và ngữ cảnh dài trong Codex CLI, cách đúng là gì?",
        options: [
          "/resume để quay lại chat đã lưu; /compact để tóm tắt ngữ cảnh khi chat dài (Codex cũng tự compact); /status để xem trạng thái phiên; Enter/Tab để steer/queue khi agent đang chạy",
          "Mỗi câu hỏi mở một chat mới cho thoáng",
          "Chỉ có cách đọc lại toàn bộ log thủ công",
          "Lỗi phiên là mất sạch, không có cơ chế khôi phục"
        ],
        correct: [0],
        note: "Best practices liệt kê: /resume (mở lại chat đã lưu), /compact (tóm tắt context khi chat dài; ngoài ra Codex tự compact - có config model_auto_compact_token_limit), /status (trạng thái phiên); trong lúc chạy Enter = steer, Tab = queue. Nguyên tắc long-running: việc liên quan giữ cùng chat để dùng lại context; việc độc lập mới tách chat.",
        refs: [
          { label: "Best practices - ChatGPT Learn", url: "https://learn.chatgpt.com/guides/best-practices" },
          { label: "Long-running work - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/long-running-work" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "medium",
        multi: false,
        q: "Giao việc dài cho agent (vd: refactor + migrate module trong hệ quản lý xe) thì theo dõi & quản lý tiến độ hiệu quả nhất thế nào?",
        options: [
          "Dùng /goal (có progress row: pause/resume/edit goal), xin status recap giữa chừng trong cùng chat, chạy việc song song bằng worktrees, tách subagent cho exploration/test/triage",
          "Bật agent rồi để tự đi, không cần theo dõi",
          "Gom mọi việc vào một chat duy nhất cho dễ nhìn, kể cả việc đụng cùng file",
          "Chỉ xem kết quả cuối cùng, không cần checkpoint"
        ],
        correct: [0],
        note: "Long-running work: /goal tạo goal có tiêu chí hoàn thành; progress row cho pause/resume/edit; 'Ask for a status recap' giữa chừng; chạy song song thì mỗi chat 1 worktree và 'tránh 2 chat cùng sửa 1 file'. Best practices: dùng subagents cho exploration - tests - triage (config có spawn_agent/wait_agent/resume_agent). Kiểm soát tiến độ = checkpoints verifiable, không phải 'tin rồi bỏ qua'.",
        refs: [
          { label: "Long-running work - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/long-running-work" },
          { label: "Best practices - ChatGPT Learn", url: "https://learn.chatgpt.com/guides/best-practices" }
        ]
      },
      {
        cat: "AGENTS.md & cấu hình",
        diff: "hard",
        multi: true,
        q: "Những file/cấu hình Markdown nào quan trọng và nên đưa vào repo khi code với Codex? (chọn nhiều)",
        options: [
          "AGENTS.md - quy ước build/test/review + 'done' nghĩa gì, Codex tự đọc theo chain (repo tới sub-dir, ~32KiB)",
          "AGENTS.override.md - override ưu tiên cao hơn AGENTS.md khi thư mục cần quy tắc riêng",
          "Tệp md theo chủ đề (planning, coding style...) được AGENTS.md chính tham chiếu khi file gốc quá dài",
          "README.md - Codex tự đổi tên README thành AGENTS.md"
        ],
        correct: [0, 1, 2],
        note: "Best practices: dùng /init scaffold AGENTS.md khởi điểm; nếu AGENTS.md quá dài thì giữ file chính gọn + tham chiếu các md task-specific (planning/coding...); chain đọc là AGENTS.override.md > AGENTS.md theo thư mục (32 KiB mặc định). Đi kèm: .codex/config.toml lưu durable prefs + khai báo [mcp_servers.<tên>] nếu dùng MCP; Codex KHÔNG tự đổi README.md thành AGENTS.md.",
        refs: [
          { label: "AGENTS.md - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-configuration/agents-md" },
          { label: "Best practices - ChatGPT Learn", url: "https://learn.chatgpt.com/guides/best-practices" }
        ]
      },
      {
        cat: "Codex & workflow",
        diff: "easy",
        multi: false,
        q: "Cách kiểm tra hạn mức (quota) sử dụng Codex và thời điểm reset hiện tại là gì?",
        options: [
          "Gọi hỗ trợ OpenAI qua ticket rồi chờ trả lời",
          "Lệnh /status trong Codex CLI (xem quota còn lại trong phiên hoạt động) và usage dashboard tại chatgpt.com/codex/settings/usage - hiển thị quota theo model + thời điểm reset",
          "Đọc file codex-usage.log trong repo",
          "Chỉ hiện khi xoá dữ liệu trình duyệt"
        ],
        correct: [1],
        note: "Docs 'Pricing' FAQ chính là 2 cách này: usage dashboard (chatgpt.com/codex/settings/usage) ghi remaining limits hiện tại và cửa sổ reset; đang trong session thì dùng /status. Dự đoán quota theo 'prompt length alone is not a reliable estimate' - tốn bao nhiêu phụ thuộc model, local/cloud và độ phức tạp; allowance agentic dùng chung giữa các bề mặt. (Fact thêm từ câu đã thay: Pro hiện không có giới hạn 5h, Plus/Standard Business có ước lượng tin nhắn local/5h.)",
        refs: [
          { label: "Pricing - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/pricing" },
          { label: "Help: Using Codex with your ChatGPT plan", url: "https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan" }
        ]
      }
    ]
  },
  "ja": {
    ui: {
      htmlTitle: "40問クイズ - OpenAI / ChatGPT / Codex の利用ルール",
      kicker: "ITチーム - オンボーディングクイズ",
      h1: "OpenAI / ChatGPT / Codex の利用ルール",
      sub: "全40問 · 10点満点で採点 · 単一選択と複数選択の両方があります。受験前に <strong>WORKING-RULES-WITH-OPENAI.md</strong> を必ずお読みください。回答履歴は保存しません - 送信すると採点し、各問の正解・解説・参考資料リンクを表示します。",
      legendGreen: "回答済み",
      legendMulti: "複数選択問題",
      legendDiff: "簡単 / 標準 / 難しい = 難易度",
      answered: "回答済み:",
      submit: "提出して採点",
      scoreMetaFmt: "正解 {0}/{1} 問 · 誤答・未回答 {2} 問",
      byGroup: "カテゴリ別:",
      wrongListFmt: "<strong>未正解の問題:</strong> {0} - 各問の下に解説と参考リンクがあります。",
      allPerfect: "全問正解です。以下の解説で復習もできます。",
      bands: [
        "9点以上: 優秀 - 他のメンバーを指導できます。",
        "7-8.9: 良好 - 誤答部分を再確認してください。",
        "5-6.9: 標準 - WORKING-RULES-WITH-OPENAI.md をもう一度読み込みましょう。",
        "3-4.9: 要改善 - 不明な点はリードに質問してください。",
        "3点未満: ルールの全文を読み直し、ChatGPT/Codex の利用を一旦見合わせてください。"
      ],
      right: "正解。",
      wrong: "不正解。",
      correctAnswerPrefix: "正解: ",
      youChose: "あなたの選択: ",
      notChosen: "未選択です。",
      explain: "解説: ",
      refsLabel: "参考資料 (リンクは2026-11-12に検証済み):",
      retake: "最初からやり直す",
      reviewHint: "下にスクロールすると各問の判定・正解・解説・参考リンクを確認できます。",
      confirmUnansweredFmt: "未回答が{0}問あります (問題: {1})。\n\n「OK」で提出 (未回答は不正解扱い)、「キャンセル」で戻ります。",
      multiBadge: "複数選択可",
      qNumFmt: "問題 {0}/{1}",
      footer: "ルールの出典: WORKING-RULES-WITH-OPENAI.md · OpenAI公式ドキュメント (learn.chatgpt.com, help.openai.com, platform.openai.com) + arXivの論文 + OWASP GenAI。参考リンクは2026-11-12に存在確認済み (HTTP 200、または公式文書からの引用)。",
      diffs: { easy: "簡単", medium: "標準", hard: "難しい" }
    },
    questions: [
      {
        cat: "ポリシー・アカウント",
        diff: "easy",
        multi: false,
        q: "ChatGPT Business ワークスペース (年払い、最低2ユーザー) について公式ドキュメントの記述として正しいのは?",
        options: [
          "Business データはデフォルトでモデル学習に使われる",
          "デフォルトで Business データを学習に使わず、admin コンソール・SAML SSO/MFA付き",
          "個人専用で管理者機能がない",
          "Codex 利用には別途 credits 購入が必須"
        ],
        correct: [1],
        note: "Pricing ページとヘルプセンター 'Using Codex with your ChatGPT plan' より: Business は $20/人/月 (年払い、月払いなら $25、最低2ユーザー) で、専用ワークスペース、SAML SSO/MFA、デフォルトで Business データの学習不使用。チームの業務にはこのワークスペースを使う。",
        refs: [
          { label: "Pricing - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/pricing" },
          { label: "Help: Using Codex with your ChatGPT plan", url: "https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan" }
        ]
      },
      {
        cat: "データセキュリティ",
        diff: "easy",
        multi: true,
        q: "プロンプト・添付ファイル・AGENTS.md に絶対に入力してはいけないものはどれ? (複数選択)",
        options: [
          "APIキー / アクセストークン / パスワード",
          "認証情報を含む .env ファイル",
          "秘密鍵・証明書・CI/CDのキー",
          "匿名化していない顧客の個人情報 (PII)",
          "使用中フレームワークの公開ドキュメント",
          "リポジトリ内の公開関数/モジュール名"
        ],
        correct: [0, 1, 2, 3],
        note: "ChatGPT/Codex はクラウドサービスであり、入力・添付・エージェントが読んだものはすべて OpenAI のサーバーへ送られる。シークレット (キー/トークン/.env/認証情報/PII) はプレースホルダ (例: $API_KEY) に置換し、顧客データはマスク or 匿名化する。誤って貼った場合: 会話を削除、元システムでキーをローテート、リードへ報告。なお 👍/👎 のフィードバックは 'Improve the model for everyone' をオフにしていても会話ごと学習に送られる場合がある。",
        refs: [
          { label: "Help: Data controls in ChatGPT", url: "https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt" },
          { label: "Help: Chat and file retention policies", url: "https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt" }
        ]
      },
      {
        cat: "プロンプト",
        diff: "medium",
        multi: true,
        q: "公式ドキュメント 'Prompting' によると、重要なタスクの良いプロンプトに含めるべき要素は? (複数選択)",
        options: [
          "Goal - 何を・誰のために作るか",
          "Context - 関連する情報・資料",
          "Output - 形式・長さ・詳細度",
          "Boundaries - 変更禁止点と、いつ確認を求めるべきか",
          "Bribe - 品質向上のため金銭を約束する",
          "Repeat - 同じ質問を10回繰り返す"
        ],
        correct: [0, 1, 2, 3],
        note: "公式 'Prompting' は4要素 Goal / Context / Output / Boundaries を定義。全部を必ず入れる必要はなく、役に立つ要素だけ使う。また 'done' の姿を明示し、モデル自身に 'final check' をさせた上で、人がレビューする。構造化はタスク・文脈・形式の見分けを助け、推測や誤解を減らす (The Prompt Report, arXiv 2406.06608 参照)。",
        refs: [
          { label: "Prompting - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/prompting" },
          { label: "The Prompt Report (arXiv)", url: "https://arxiv.org/abs/2406.06608" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "easy",
        multi: false,
        q: "Codex CLI で Codex 実行中の steer/queue 操作の意味は?",
        options: [
          "Enter = Queue (次回待ち), Tab = Steer (現在のターンに割り込み)",
          "Enter = Steer (現在のターンに情報追加), Tab = Queue (次のターンへ積む)",
          "Enter = 実行キャンセル, Tab = ドラフト保存",
          "どちらも即送信して回答待ちになる"
        ],
        correct: [1],
        note: "公式ドキュメント: 実行中は Enter (CLI) で Steer (現在ターンへの追加指示)、Tab で Queue (次ターンへ積む)。長い作業の流れを止めずに方向修正するための仕組み。",
        refs: [
          { label: "Prompting - Codex CLI (ChatGPT Learn)", url: "https://learn.chatgpt.com/docs/prompting" }
        ]
      },
      {
        cat: "サンドボックスと権限",
        diff: "easy",
        multi: true,
        q: "現在の Codex で有効な sandbox モードはどれ? (複数選択)",
        options: [
          "read-only",
          "workspace-write",
          "danger-full-access",
          "network-only",
          "untrusted"
        ],
        correct: [0, 1, 2],
        note: "'Agent approvals & security' と Config reference: sandbox_mode は read-only | workspace-write | danger-full-access の3値。'untrusted' は廃止された approval_policy であってサンドボックスモードではない。'network-only' という値は存在しない (ネットワークは sandbox_workspace_write.network_access の個別設定)。",
        refs: [
          { label: "Agent approvals & security - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-approvals-security" },
          { label: "Config reference - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/config-file/config-reference" }
        ]
      },
      {
        cat: "サンドボックスと権限",
        diff: "medium",
        multi: false,
        q: "sandbox 'workspace-write' のデフォルトのネットワークアクセスは?",
        options: [
          "全ドメインに対して自動的に有効",
          "オフ。使うには config で [sandbox_workspace_write] network_access = true を設定",
          "完全にオフで個別に有効化できない",
          "Codex Cloud 利用時のみ有効"
        ],
        correct: [1],
        note: "公式: workspace-write (バージョン管理済みリポジトリの Auto プリセット) ではサンドボックス内コマンドのネットワークはオフ。必要なら network_access = true を設定し、必要なら features.network_proxy のドメイン許可リストを併用 (拒否リストが常に優先)。",
        refs: [
          { label: "Agent approvals & security - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-approvals-security" },
          { label: "Sandboxing - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/sandboxing" }
        ]
      },
      {
        cat: "サンドボックスと権限",
        diff: "hard",
        multi: false,
        q: "Codex サンドボックスのネットワークプロキシ/ドメイン許可リストが保護するものと、保護しないものは?",
        options: [
          "サンドボックス内コマンドを保護。Web検索・MCP・コネクタ・クラウド通信は対象外",
          "全サーフェスの全リクエストを保護",
          "Codex Cloud のみ保護、CLI は対象外",
          "Web検索のみ保護、コマンドは対象外"
        ],
        correct: [0],
        note: "公式: プロキシはサンドボックス内コマンドの一層に過ぎず、Web検索・MCP・コネクタ・クラウド通信には適用されない。各サーフェスの個別設定で制御する (例: クラウドタスクのインターネットアクセスはデフォルトOFF、プロンプトインジェクション低減のため web_search は 'cached'/'indexed' を 'live' より優先)。",
        refs: [
          { label: "Agent approvals & security - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-approvals-security" },
          { label: "Web search - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/web-search" }
        ]
      },
      {
        cat: "サンドボックスと権限",
        diff: "hard",
        multi: false,
        q: "--dangerously-bypass-approvals-and-sandbox (別名 --yolo) の意味と推奨は?",
        options: [
          "エージェントが2倍速くなるので常用が推奨される",
          "サンドボックスと承認の両方を無効化。公式は 'not recommended' - 監視できる container/devcontainer 内でのみ使用",
          "全マシンのネットワークを安全に有効化する",
          "企業向け監査ログを無効化する"
        ],
        correct: [1],
        note: "公式: full-access は技術的制限と承認フローのすべてを外すため Elevated Risk/'not recommended'。必要な場合は自分で管理するコンテナ内で実行 (--sandbox danger-full-access をコンテナ内で使用)。--yolo という別名が由来を示している。",
        refs: [
          { label: "Agent approvals & security - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-approvals-security" },
          { label: "Sandboxing - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/sandboxing" }
        ]
      },
      {
        cat: "サンドボックスと権限",
        diff: "medium",
        multi: true,
        q: "デフォルトの workspace-write ポリシーで read-only 保護されるパスはどれ? (複数選択)",
        options: [
          ".git",
          ".agents",
          ".codex",
          ".aws",
          "node_modules",
          "src/"
        ],
        correct: [0, 1, 2, 3],
        note: "公式: writable roots 内でも .git / .agents / .codex / .aws は read-only 保護 (再帰的)。エージェントが設定・AWS認証情報・Git履歴を壊すのを防ぐ仕組み。node_modules や src はこの特別保護の対象外。",
        refs: [
          { label: "Agent approvals & security - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-approvals-security" }
        ]
      },
      {
        cat: "人間のレビュー",
        diff: "medium",
        multi: false,
        q: "「instructions vs permissions」の本質として正しいのは?",
        options: [
          "指示を明確に書くだけで十分、権限はエージェントの裁量",
          "パーミッションを厳しく設定するだけで十分、ブリーフは不要",
          "両方: instructions は意図を伝え、permissions はアクセスを制御する - 併用する",
          "Permissions は管理者専用、個人は不要"
        ],
        correct: [2],
        note: "公式 'Working with agents': instructions communicate intent; permissions control access。ブリーフ (タスク/文脈/アクション/成果物 + 'done') と permission modes (許可範囲・確認タイミング) は補完し合う二層の制御。",
        refs: [
          { label: "Working with agents - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/working-with-agents" },
          { label: "Permission modes - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/permission-modes" }
        ]
      },
      {
        cat: "AGENTS.mdと設定",
        diff: "medium",
        multi: false,
        q: "Codex はプロジェクト実行時に AGENTS.md をどう読むか?",
        options: [
          "ディスク上で最初に見つけたAGENTS.mdだけを読む (ランダム)",
          "~/.codex から Git ルート、作業ディレクトリへ連結し、作業ディレクトリに近いほど優先 (後に連結され上書き)。既定上限は 32 KiB (project_doc_max_bytes)",
          "ルート直下の AGENTS.md のみを読み、サブディレクトリは無視",
          "タスク完了後に読む"
        ],
        correct: [1],
        note: "公式 'AGENTS.md': 毎実行時に instruction chain を構築 - global (~/.codex/AGENTS.override.md or AGENTS.md) - Git ルートから順に cwd へ (各フォルダ最大1ファイル、AGENTS.override.md > AGENTS.md)。後から連結されたものが上書きし、合計は既定 32 KiB まで。",
        refs: [
          { label: "AGENTS.md - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-configuration/agents-md" },
          { label: "agents.md (オープン規格)", url: "https://agents.md" }
        ]
      },
      {
        cat: "AGENTS.mdと設定",
        diff: "easy",
        multi: false,
        q: "チームの必須ルール (必ず適用すべきもの) はどこに置くべき?",
        options: [
          "アシスタントの個人メモリに保存しておく",
          "チャットごとにその場で決める",
          "リポジトリにコミットされた AGENTS.md / ドキュメント",
          "リポジトリ外の個人メモファイル"
        ],
        correct: [2],
        note: "公式 'Memories': 必須ルールは AGENTS.md またはコミット済みドキュメントに置く。メモリは 'recall 層' にすぎず (ローカルの Codex memories はデフォルトでオフ)、コンプライアンスのための信頼できるルール源ではない。",
        refs: [
          { label: "Memories - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/customization/memories" },
          { label: "AGENTS.md - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-configuration/agents-md" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "medium",
        multi: true,
        q: "Codex に実際に存在し、docs の説明と一致する slash コマンドはどれ? (複数選択)",
        options: [
          "/plan - Plan mode: 多段階タスクの前に調査と質問で曖昧点を解消",
          "/init - リポジトリの開始用 AGENTS.md を scaffold",
          "/resume - 保存済みチャットを再開。/compact - 長い文脈の要約",
          "/review - Git checkout 内の変更をレビュー",
          "/deploy - レビューなしで production へ即デプロイ",
          "/wipe-history - リポジトリ履歴を全消去"
        ],
        correct: [0, 1, 2, 3],
        note: "docs で確認済み: /plan、/init、/resume、/compact (自動 compact もあり)、/review (CLI/IDE のローカル review プリセット)、/status (セッション状態)、/goal、/memories。実行中は Enter=steer、Tab=queue。/deploy・/wipe-history は存在しない - デプロイは必ず人のレビューを経由。",
        refs: [
          { label: "Best practices - ChatGPT Learn", url: "https://learn.chatgpt.com/guides/best-practices" },
          { label: "Code Review - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/code-review" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "easy",
        multi: false,
        q: "繰り返しのワークフロー (チェックリストによる PR レビュー、ログトリアージ、リリースノート執筆など) の標準化は?",
        options: [
          "同じ長いプロンプトを何度も送り直す",
          "Skill (SKILL.md) にパッケージ。チーム用は repo の .agents/skills。個人用は $HOME/.agents/skills。skill-creator で scaffold",
          "AGENTS.md に1000行追記して安心",
          "Skill は有料マーケットプレイス専用でリポジトリでは作れない"
        ],
        correct: [1],
        note: "Best practices: ワークフローが安定したら 'turn repeatable work into skills' - 1 スキル 1 ジョブ、入出力を明確化、description で使用場面を明示。skill-creator で初版 scaffold、まずローカルで反復してから repository へ。『skills define the method, scheduled tasks define the schedule』 - 定期実行は Scheduled task (skill 呼び出し可、専用 worktree でも実行可)。",
        refs: [
          { label: "Best practices - ChatGPT Learn", url: "https://learn.chatgpt.com/guides/best-practices" },
          { label: "Scheduled tasks - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/automations" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "medium",
        multi: false,
        q: "CI/スクリプト (非対話) での `codex exec` の挙動と設定として正しいのは?",
        options: [
          "デフォルトは read-only サンドボックス。編集を許すなら --sandbox workspace-write。--full-auto は廃止済み (スクリプトは --sandbox workspace-write または --approve-for-me へ移行)",
          "デフォルトで full access なのでフラグ不要",
          "--full-auto が現在の CI 標準フラグ",
          "codex exec はサンドボックス非対応、環境変数で別途設定する"
        ],
        correct: [0],
        note: "公式 'Non-interactive mode': codex exec は進行状況を stderr、最終メッセージを stdout へ (--json でパース、-o <file> --output-last-message で最終結果を保存、--ephemeral でリポジトリ非永続)。デフォルトは read-only、編集許可は --sandbox workspace-write、公式より --full-auto は廃止。CI は CODEX_API_KEY=<api-key> codex exec --json で認証を明示。",
        refs: [
          { label: "Non-interactive mode - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/non-interactive-mode" },
          { label: "Agent approvals & security - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-approvals-security" }
        ]
      },
      {
        cat: "データセキュリティ",
        diff: "easy",
        multi: true,
        q: "会社の API キー/トークンを誤ってチャットに貼ってしまった場合の正しい対応は? (複数選択)",
        options: [
          "該当会話を直ちに削除",
          "元システムでキーをローテート (revoke + 新キー発行)",
          "リーク範囲を評価するためリード/ITへ報告",
          "セッション終了まで放置する",
          "ファイル名を変えて隠す"
        ],
        correct: [0, 1, 2],
        note: "会話の削除は retention 上のリスクを減らすだけ。キーは既にログ/利用に流れている可能性がある。標準対応: 1) 即 revoke + rotate, 2) 会話削除, 3) リードへ報告し不審なアクティビティを確認。'放置' や 'ファイル名変更' はキーを無効化しない。",
        refs: [
          { label: "Working with agents - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/working-with-agents" },
          { label: "OWASP GenAI - LLM Top 10", url: "https://genai.owasp.org/llm-top-10/" }
        ]
      },
      {
        cat: "プロンプト",
        diff: "medium",
        multi: false,
        q: "正確な情報が必要なときに hallucination を減らす最善の方法は?",
        options: [
          "新しいモデルなので速い回答をそのまま信じる",
          "'わからない/確認する' を許し、出典を求め、公式ソースで検証する",
          "長文で書き、必ず回答させる",
          "同じ質問を多数送り、最初の回答を選ぶ"
        ],
        correct: [1],
        note: "公式の 'no-guess' + 'cite sources' 原則 (情報不足は推測せず明示、検証用に出典を要求)。科学的背景: ReAct (arXiv 2210.03629) はツール/外部ソース利用が実証に基づく回答を促すこと、'Why Language Models Hallucinate' (arXiv 2509.04664, OpenAI) は 'わからない' を受け入れさせる仕組みと検証の必要性を示す。",
        refs: [
          { label: "ReAct (arXiv)", url: "https://arxiv.org/abs/2210.03629" },
          { label: "Why Language Models Hallucinate (arXiv, OpenAI)", url: "https://arxiv.org/abs/2509.04664" },
          { label: "Prompting - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/prompting" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "medium",
        multi: false,
        q: "ChatGPT/Codex の /plan はいつ使うか?",
        options: [
          "コード実行後のレビュー用",
          "多段階/難しいタスクの実装前 - Codex に調査とアプローチ提案、曖昧点の質問をさせる",
          "Codex CLI 限定でアプリでは使えない",
          "モデルとの雑談用"
        ],
        correct: [1],
        note: "公式 'Prompting'/'Best practices': 多段階タスクでは /plan (Shift+Tab) で文脈収集と曖昧点の質問を先に行う。長期目標には /goal。曖昧なまま行動させないための仕組み。",
        refs: [
          { label: "Prompting - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/prompting" },
          { label: "Best practices - ChatGPT Learn", url: "https://learn.chatgpt.com/guides/best-practices" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "medium",
        multi: true,
        q: "Codex が生成した PR をマージする前にチームがすべきことは? (複数選択)",
        options: [
          "関連する最小の lint + test を実行し、結果を確認",
          "ローカルの /review または GitHub の @codex review を実行",
          "diff を目で読み、最初に定義した 'done' と照合",
          "エージェントが 'done' と言い文章が滑らかだから即マージ",
          "容量節約のため確認前に branch を削除"
        ],
        correct: [0, 1, 2],
        note: "HITL原則: '滑らかな文章や自信のある要約は十分ではない'。自動検証 (test/lint) + レビュー (/review, @codex review) + 目視 diff を組み合わせる。確認前のマージや branch 削除は保護を無効化する行為。",
        refs: [
          { label: "Working with agents - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/working-with-agents" },
          { label: "Review GitHub PRs with Codex", url: "https://learn.chatgpt.com/docs/third-party/github" }
        ]
      },
      {
        cat: "ポリシー・アカウント",
        diff: "medium",
        multi: false,
        q: "Codex のサインイン: 'Sign in with ChatGPT' と API キーの使い分けは?",
        options: [
          "ChatGPT サインインはプラン枠で利用 (Codex Cloud はこの方式必須で、Work Cloud のローカルアクセスを有効化できるのはこの方法のみ)。API キーは従量制で Platform アカウントに標準 API 料金で請求され、CI 向け (CODEX_API_KEY) - ただし Work Cloud のローカルアクセスは有効化できない",
          "常に API キーの方が安いので API キー一択",
          "Sign in with ChatGPT のみで API キー方式は存在しない",
          "API キーはチーム専用モデルの学習用"
        ],
        correct: [0],
        note: "公式 'Authentication': ローカルクライアントのサインインは2方式 - 'Sign in with ChatGPT' (プラン枠、使用量はワークスペースに従う) と 'Sign in with an API key' (従量制、標準API料金)。'Codex cloud requires signing in with ChatGPT'、且つ 'API keys and Codex access tokens do not enable Local computer access with Work Cloud'。",
        refs: [
          { label: "Authentication - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/auth" },
          { label: "Help: Using Codex with your ChatGPT plan", url: "https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan" }
        ]
      },
      {
        cat: "人間のレビュー",
        diff: "hard",
        multi: false,
        q: "エージェントが途中で間違えたことに気づき、指示を修正した場合に正しいのは?",
        options: [
          "指示の修正は実行済みの行動を自動的に取り消す",
          "指示の修正は完了済みの行動を取り消さない - 対象システムで結果を確認し、制御コントロール (停止・一時停止・権限変更) を必要に応じて使う",
          "タスクを渡した後はエージェントを制御できない",
          "プロジェクト全体を削除するしかない"
        ],
        correct: [1],
        note: "公式 'Working with agents': 'Changing an instruction does not undo an action already completed.' 報告された他システムの更新は対象システムで確認する。停止や権限回収などのコントロールを使い、エージェントの報告だけを鵜呑みにしない。",
        refs: [
          { label: "Working with agents - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/working-with-agents" }
        ]
      },
      {
        cat: "AGENTS.mdと設定",
        diff: "medium",
        multi: false,
        q: "リポジトリの GitHub PR レビューを Codex 用にカスタマイズするには?",
        options: [
          "Slack で直接モデルにメッセージを送る",
          "対象パス付近の AGENTS.md に '## Code Review Rules' セクションを追加し、PR 上で '@codex review' コメントを使う",
          "カスタマイズ不可、デフォルト設定のみ",
          "モデルのソースコードを変更する"
        ],
        correct: [1],
        note: "公式 'AGENTS.md' と 'Review GitHub PRs with Codex': AGENTS.md の '## Code Review Rules' (該当コード付近におく) が GitHub レビューに使われる。PR 上では '@codex review' コメント (例: '@codex review for security vulnerabilities')。",
        refs: [
          { label: "AGENTS.md - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-configuration/agents-md" },
          { label: "Review GitHub PRs with Codex", url: "https://learn.chatgpt.com/docs/third-party/github" }
        ]
      },
      {
        cat: "アンチパターンと品質",
        diff: "medium",
        multi: false,
        q: "OWASP Top 10 for LLM 2025 の LLM01 プロンプトインジェクションは、チームのプロセスで主にどこから来るか?",
        options: [
          "チーム自身のアシスタント",
          "信頼できない外部コンテンツ: Webページ、顧客送付ファイル、PR/コメント、検索結果 - エージェントがその中の '指示' に従う可能性",
          "AGENTS.md 内のコード",
          "旧モデルのみで、新モデルには無い"
        ],
        correct: [1],
        note: "プロンプトインジェクション: 信頼できないデータ (web・ファイル・メール・PR等) がエージェント向けの指示を含み得る。対処: 外部コンテンツは厳しいサンドボックス+承認 on-request で扱い、web_search は 'live' より 'cached'/'indexed' を優先、agent に無制限の送信/公開/デプロイ権限を与えない。OWASP LLM Top 10 をチェックリストとして使用。",
        refs: [
          { label: "OWASP GenAI - LLM Top 10 for 2025", url: "https://genai.owasp.org/llm-top-10/" },
          { label: "Web search - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/web-search" }
        ]
      },
      {
        cat: "アンチパターンと品質",
        diff: "hard",
        multi: false,
        q: "OWASP GenAI Security Project - LLM Top 10 for 2025 の第1位 (LLM01) は?",
        options: [
          "LLM01 - Prompt Injection",
          "LLM01 - Model Theft",
          "LLM01 - Supply Chain",
          "LLM01 - Hallucination"
        ],
        correct: [0],
        note: "公式ページ (genai.owasp.org/llm-top-10/) によると LLM01 は Prompt Injection (Direct/Indirect)。第2位は Sensitive Information Disclosure (LLM02)。AI プロセス設計時の権限とデータのチェックリストとして利用する。",
        refs: [
          { label: "OWASP GenAI - LLM Top 10 for 2025", url: "https://genai.owasp.org/llm-top-10/" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "medium",
        multi: true,
        q: "Codex ローカルチャットの Web 検索について正しい記述は? (複数選択)",
        options: [
          "cached がデフォルト: OpenAI 維持のインデックスを使い、ネットワーク無効でも動く",
          "indexed: インデックス済みのソースから検索",
          "live: 直接 Web ページを取得 - 最新情報が必要なタスクに使用",
          "dark: ログを残さない隠し検索モード"
        ],
        correct: [0, 1, 2],
        note: "公式 'Web search': ローカルチャットのデフォルトは cached。indexed はインデックス済みソース、live は最新情報用 (CLI: --search でその実行だけ live。allowed_web_search_modes で設定)。プロンプトインジェクション低減のため 'live' より cached/indexed を優先。",
        refs: [
          { label: "Web search - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/web-search" },
          { label: "Agent approvals & security - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-approvals-security" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "medium",
        multi: false,
        q: "Codex に外部ツール/サービス (MCP server) を追加する正しい方法は?",
        options: [
          "codex mcp add <名前> ... または config に [mcp_servers.<名前>] を宣言。workflow が依存するなら required = true",
          "AGENTS.md でモデルの説明を変えて MCP を自動生成",
          "ChatGPT アプリに別途インストールすれば Codex が自動認識",
          "ツール拡張は不可、デフォルトの tool のみ"
        ],
        correct: [0],
        note: "MCP サーバーは [mcp_servers.<名前>] テーブル (stdio は 'command'、リモートは 'url' が必須)。CLI は codex mcp add。codex exec では required = true の MCP サーバーの起動に失敗すると、スキップせずエラーで終了する。",
        refs: [
          { label: "Extend with MCP - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/extend/mcp" },
          { label: "Non-interactive mode - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/non-interactive-mode" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "medium",
        multi: true,
        q: "Codex Cloud について正しい記述は? (複数選択)",
        options: [
          "Sign in with ChatGPT が必須",
          "クラウドタスクの Internet access はデフォルト OFF - 環境ごとに設定可能",
          "複数タスクを worktree/environment で並行実行し、差分を確認してレビュー",
          "API キーで Codex Cloud を実行できる"
        ],
        correct: [0, 1, 2],
        note: "公式: 'Codex Cloud requires signing in with ChatGPT'。Internet access は environment 設定 (デフォルト OFF の least-privilege)。worktrees は同じリポジトリで独立した複数チャットを衝突なく実行。API キー/Codex トークンは Work Cloud のローカルアクセスを有効化できず、クラウドは ChatGPT ワークスペースに従う。",
        refs: [
          { label: "Codex Cloud - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/cloud" },
          { label: "Worktrees - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/environments/git-worktrees" },
          { label: "Authentication - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/auth" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "medium",
        multi: false,
        q: "同じ Git リポジトリで複数タスクを並行実行する正規のパターンは?",
        options: [
          "タスクごとに git worktree (履歴は共有、作業ディレクトリは別) で独立したチャット/タスクを実行",
          "全員が 1 つの作業フォルダを共有",
          "リポジトリを手動で複数コピーして手動マージ",
          "Codex は 1 リポジトリで複数タスク非対応"
        ],
        correct: [0],
        note: "公式 'Worktrees': git worktree をそのまま利用 - タスクごとに別ディレクトリで独立実行、Git リポジトリのみ対応。Scheduled tasks も専用の background worktree で実行され他と衝突しない。戦略は ローカルで計画 - 並行実装 - diff レビュー - PR マージ。",
        refs: [
          { label: "Worktrees - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/environments/git-worktrees" }
        ]
      },
      {
        cat: "AGENTS.mdと設定",
        diff: "medium",
        multi: false,
        q: "Codex は設定をどこから読むか?",
        options: [
          "ユーザー設定 ~/.codex/config.toml + プロジェクト設定 .codex/config.toml。プロファイルは $CODEX_HOME/<名前>.config.toml",
          "リポジトリ内の設定のみ、ユーザー設定は無い",
          "GUI からのみ変更、設定ファイルは無い",
          "毎回実行時に全部質問される"
        ],
        correct: [0],
        note: "公式 'Config reference': ユーザー設定は ~/.codex/config.toml、プロジェクト オーバーライドは .codex/config.toml、プロファイルは $CODEX_HOME/<名前>.config.toml。provider/notification/telemetry の鍵はユーザー設定に置くべき (リポジトリに置かない)。",
        refs: [
          { label: "Config reference - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/config-file/config-reference" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "easy",
        multi: false,
        q: "定期的に繰り返す作業 (毎日の集計、不要 branch の掃除など) の標準化は?",
        options: [
          "Scheduled task (automation): バックグラウンドで定期実行、Scheduled タブで active/paused/completed を確認",
          "毎日同じチャットを開いてプロンプトを再入力",
          "個人のリマインダーで手動コピペ",
          "スケジュール実行は非対応"
        ],
        correct: [0],
        note: "公式 'Scheduled tasks': 定期タスクをバックグラウンド実行 (ChatGPT Web/モバイル、対応プランはアプリイベントのトリガーにも対応)。実行履歴は Scheduled タブ。skills と組み合わせで複雑化可能。Git リポジトリのタスクは専用 worktree で実行。",
        refs: [
          { label: "Scheduled tasks - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/automations" },
          { label: "Worktrees - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/environments/git-worktrees" }
        ]
      },
      {
        cat: "サンドボックスと権限",
        diff: "medium",
        multi: false,
        q: "approval_policy = on-request の意味は?",
        options: [
          "サンドボックス内は自律実行。権限外 (ネットワーク、ワークスペース外のコマンド) が必要な時だけ承認を求める",
          "ファイル読み取りを含む全操作で承認を求める",
          "承認不要で全操作を実行する",
          "単なる名称で、動作に影響しない"
        ],
        correct: [0],
        note: "公式: on-request はサンドボックス内で自律実行し、追加権限が必要な時のみ問い合わせる。他の値は never (質問なし - CI/完全信頼) と granular = { sandbox_approval, rules, mcp_elicitations, request_permissions, skill_approval }。approvals_reviewer = 'auto_review' でレビューサブエージェントに承認を委譲も可能。",
        refs: [
          { label: "Agent approvals & security - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-approvals-security" },
          { label: "Config reference - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/config-file/config-reference" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "easy",
        multi: false,
        q: "CI スクリプトで Codex の結果を受け取る正しい方法は?",
        options: [
          "codex exec \"...\" --json (進行状況は stderr、最終結果のみ stdout)。または -o <file> --output-last-message で最終結果をファイル保存",
          "CLI の全ログを regex で解析",
          "GUI を操作してスクリーンショット OCR",
          "codex exec は自動化非対応"
        ],
        correct: [0],
        note: "公式 'Non-interactive mode': 進行状況を stderr、最終メッセージを stdout へ。公式の CI 例: CODEX_API_KEY=<api-key> codex exec --json \"...\"。-o <path>/--output-last-message で最終メッセージをファイルに保存、--ephemeral はリポジトリ非破壊のタスク用。",
        refs: [
          { label: "Non-interactive mode - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/non-interactive-mode" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "easy",
        multi: false,
        q: "Codex の内蔵レビュー機能の正しい使い方は?",
        options: [
          "ローカル: codex review コマンドで PR 新設前の変更をレビュー。GitHub: PR 上で @codex review コメント (セキュリティなどフォーカス指定も可能)",
          "Codex にはレビュー機能が無い、100% 手作業",
          "マージ後しかレビューできない",
          "有料のサードーパーティ拡張が必須"
        ],
        correct: [0],
        note: "公式 'Code Review' + 'Non-interactive mode': codex review は内蔵コマンド (CODEX_API_KEY 使用可)。チャット上での PR レビューはコメント投稿/承認/マージをしない - GitHub 上の @codex review コメントで発動。基準は AGENTS.md の '## Code Review Rules' セクションでカスタマイズ。",
        refs: [
          { label: "Code Review - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/code-review" },
          { label: "Non-interactive mode - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/non-interactive-mode" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "medium",
        multi: false,
        q: "ChatGPT プランで支払う場合の model と effort の選び方として正しいのは?",
        options: [
          "Luna は最速で軽い - 小修正やデータ抽出向き。Astra は最強 - 用途最適化不要ならデフォルト。Sol/Terra はバランス型。effort が高いほど使用量を余分に消費",
          "GPT-6.1 Sol/Terra なら全タスクで無料",
          "モデルは admin ダッシュボードのみで変更、CLI では不可",
          "effort は使用量に影響しない"
        ],
        correct: [0],
        note: "公式 'Model selection': Luna は 'most efficient'、Astra は 'state-of-the-art, most powerful' (使用量を気にしないならデフォルト)。GPT-6.1 Sol はコスト重視の複雑プロジェクト、Terra は資料ベースの短文や computer-use。effort は使用量に影響: 'Luna · Low' は小修正、'Luna · Extra high' は複数アプリ横断の文脈検索や優先順位付け。",
        refs: [
          { label: "Model selection - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/model-selection" },
          { label: "Pricing - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/pricing" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "medium",
        multi: false,
        q: "実践例: チームが新機能「車両管理システムの構築」(複数モジュール、要求が曖昧) を始めるとき、Codex の標準フローは?",
        options: [
          "通常チャットでいきなりコーディングを始める",
          "まず /plan で Codex にコードベース調査と 'ヒアリング' をさせ要求/制約を明確化。Outcome - Constraints - Verification を揃えたゴールに確定してから、テスト付きで部分ごとに実装",
          "『車両管理システムを作って』の 1 行で済ませる",
          "Codex に要件を推測させ、間違えた箇所だけ後から直す"
        ],
        correct: [1],
        note: "公式 Long-running work: 成果が曖昧なら最初に /plan (Plan mode は context 収集と 'clarifying questions' = 要件ヒアリング)。その後 /goal で3要素を含める: Outcome (例: 車両/契約/レポートの CRUD)、Constraints (フレームワーク、認証、データ規約)、Verification (テスト合格や API 確認)。完了基準を先に固めてから実装する。",
        refs: [
          { label: "Long-running work - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/long-running-work" },
          { label: "Best practices - ChatGPT Learn", url: "https://learn.chatgpt.com/guides/best-practices" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "medium",
        multi: false,
        q: "plan - spec - implement - testing の正しい順序は?",
        options: [
          "Plan で細分化 - Spec (outcome/constraints/verification + build/test/lint コマンド) - 部分ごとに実装 - 各部で test/lint/review - 要約と PR",
          "全実装してから spec と test を作る",
          "最後にまとめて 1 回だけテスト、中間では検証しない",
          "Spec は上司向けの資料で、検証基準には使わない"
        ],
        correct: [0],
        note: "Best practices: エージェントには build/test/lint コマンドと 'done の定義と検証方法' を伝える (AGENTS.md に記すのが望ましい)。コード生成だけでなく 'test 作成 - 関連 test suite 実行 - 結果確認 - レビュー' まで依頼する。例: 『車両 API は 200 を返し pytest 合格、lint 警告 0』。",
        refs: [
          { label: "Best practices - ChatGPT Learn", url: "https://learn.chatgpt.com/guides/best-practices" },
          { label: "Long-running work - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/long-running-work" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "easy",
        multi: false,
        q: "Codex CLI でのセッション管理と長い文脈 (context) の扱いとして正しいのは?",
        options: [
          "/resume で保存済みチャットを再開。/compact で長い文脈を要約 (自動 compact もあり)。/status でセッション状態確認。実行中は Enter=steer、Tab=queue",
          "質問ごとに新しいチャットを開く",
          "ログを手動で全部読み返すしかない",
          "セッション切れで失われたものは復元できない"
        ],
        correct: [0],
        note: "Best practices の slash コマンド: /resume (保存チャットの再開)、/compact (チャントが長くなった時の文脈要約。Codex は自動 compact も行い、model_auto_compact_token_limit で調整)、/status (セッション状態)。実行中は Enter/Tab で steer/queue。関連業務は同じチャットで文脈を再利用。",
        refs: [
          { label: "Best practices - ChatGPT Learn", url: "https://learn.chatgpt.com/guides/best-practices" },
          { label: "Long-running work - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/long-running-work" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "medium",
        multi: false,
        q: "長いタスク (例: 車両管理システムのリファクタ + 移行) の進捗管理で最も効果的な方法は?",
        options: [
          "/goal を使う (進捗 row で pause/resume/edit)。同じチャットで途中 status recap を依頼。並行は worktree で分離。探索/test/triage は subagent に分担",
          "起動したら放置する",
          "ファイル衝突を気にせず 1 チャットに全部詰め込む",
          "最終結果のみ確認、中間 checkpoint は不要"
        ],
        correct: [0],
        note: "Long-running work: /goal の progress row で pause/resume/edit、'Ask for a status recap' で途中状況確認。並行実行は chat ごとに worktree、'2 チャットが同一ファイルを変更しない' ことに注意。Best practices: exploration/test/triage は subagents (spawn_agent/wait_agent/resume_agent 設定あり)。進捗管理 = 検証可能な checkpoint。",
        refs: [
          { label: "Long-running work - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/long-running-work" },
          { label: "Best practices - ChatGPT Learn", url: "https://learn.chatgpt.com/guides/best-practices" }
        ]
      },
      {
        cat: "AGENTS.mdと設定",
        diff: "hard",
        multi: true,
        q: "Codex でコーディングする際に重要で、リポジトリに置くべき Markdown ファイル/設定は? (複数選択)",
        options: [
          "AGENTS.md - build/test/review 規約と 'done' の定義。Codex が chain (リポジトリ→サブディレクトリ、約32KiB) で自動読込",
          "AGENTS.override.md - ディレクトリ固有の上書き用 (AGENTS.md より優先)",
          "AGENTS.md が長くなった場合に参照する、用途別 Markdown (planning・coding style など)",
          "README.md - Codex が自動で README を AGENTS.md に改名する"
        ],
        correct: [0, 1, 2],
        note: "Best practices: /init で AGENTS.md を scaffolding。長い場合は本体を簡潔に保ち、用途別 Markdown を参照させる。読込 chain は AGENTS.override.md > AGENTS.md (既定 32KiB)。加えて .codex/config.toml に永続設定や [mcp_servers.<名前>] を配置。README.md は自動改名されない。",
        refs: [
          { label: "AGENTS.md - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/agent-configuration/agents-md" },
          { label: "Best practices - ChatGPT Learn", url: "https://learn.chatgpt.com/guides/best-practices" }
        ]
      },
      {
        cat: "Codexとワークフロー",
        diff: "easy",
        multi: false,
        q: "Codex の利用上限 (クォータ) とリセット時期の確認方法は?",
        options: [
          "OpenAI サポートにチケットで待つ",
          "Codex CLI の /status (実行中セッションの残量) と usage dashboard (chatgpt.com/codex/settings/usage) - モデル別の上限とリセット時刻を表示",
          "リポジトリの codex-usage.log を読む",
          "ブラウザデータ削除時にのみ表示される"
        ],
        correct: [1],
        note: "公式 'Pricing' FAQ: usage dashboard に現在の remaining limits とリセット時刻。セッション中の確認は /status。'プロンプトの長さだけでは正確に見積もれない' - 消費量はモデル・local/cloud・複雑度に依存し、agentic allowance は各サーフェスで共有。(補足: Pro は現在 5 時間制限なし、Plus/Standard Business は目安表あり。)",
        refs: [
          { label: "Pricing - ChatGPT Learn", url: "https://learn.chatgpt.com/docs/pricing" },
          { label: "Help: Using Codex with your ChatGPT plan", url: "https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan" }
        ]
      }
    ]
  }
};
