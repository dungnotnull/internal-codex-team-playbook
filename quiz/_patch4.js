/* Patch 4: replace Q1 (workspace usage), Q12 (skills + skills.sh), Q34 (model strategy) in vi+ja; update backTop labels. */
const fs = require("fs");
const P = "D:/orca-onboarding/chatgpt-rules/quiz/questions.js";
let t = fs.readFileSync(P, "utf8");

function replaceBlock(snippet, newBlock) {
  const i = t.indexOf(snippet);
  if (i === -1) throw new Error("snippet not found: " + snippet);
  if (t.indexOf(snippet, i + 1) !== -1) throw new Error("snippet not unique: " + snippet);
  const start = t.lastIndexOf("\n      {", i);
  const close = t.indexOf("\n      },", i);
  if (start === -1 || close === -1) throw new Error("block bounds fail for: " + snippet);
  const blockLen = close + 9 - start;
  if (blockLen > 6000) throw new Error("block too long (" + blockLen + ") for: " + snippet);
  t = t.slice(0, start) + newBlock + t.slice(close + 9);
}

/* ---- Q1 vi ---- */
replaceBlock("Workspace ChatGPT Business (kỳ thanh toán năm",
"\n      {\n" +
"        cat: \"Chính sách & tài khoản\",\n" +
"        diff: \"easy\",\n" +
"        multi: false,\n" +
"        q: \"Làm việc với codebase và dữ liệu dự án, member nên dùng ChatGPT/Codex trên môi trường nào?\",\n" +
"        options: [\n" +
"          \"Workspace ChatGPT Business của team: dedicated workspace, có quản trị + SAML SSO/MFA, mặc định KHÔNG dùng dữ liệu business để huấn luyện\",\n" +
"          \"Tài khoản cá nhân - mọi workspace có mức bảo mật như nhau\",\n" +
"          \"Tài khoản cá nhân với chế độ ẩn danh - không cần quản trị\",\n" +
"          \"Workspace nào cũng được, miễn không tốn phí team\"\n" +
"        ],\n" +
"        correct: [0],\n" +
"        note: \"Theo 'Pricing' và help 'Using Codex with your ChatGPT plan': công việc dự án chạy trên workspace ChatGPT Business của team - dedicated workspace với admin controls, SAML SSO/MFA và mặc định KHÔNG dùng dữ liệu business để huấn luyện. Không trộn công việc dự án vào tài khoản cá nhân; cách xử lý dữ liệu nhạy cảm xem nhóm câu Bảo mật dữ liệu.\",\n" +
"        refs: [\n" +
"          { label: \"Pricing - ChatGPT Learn\", url: \"https://learn.chatgpt.com/docs/pricing\" },\n" +
"          { label: \"Help: Data controls in ChatGPT\", url: \"https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt\" }\n" +
"        ]\n" +
"      },");

/* ---- Q1 ja ---- */
replaceBlock("ChatGPT Business ワークスペース (年払い",
"\n      {\n" +
"        cat: \"ポリシー・アカウント\",\n" +
"        diff: \"easy\",\n" +
"        multi: false,\n" +
"        q: \"プロジェクトのコードやデータを扱う時、メンバーはどの環境で ChatGPT/Codex を使うべき?\",\n" +
"        options: [\n" +
"          \"チームの ChatGPT Business ワークスペース: 専用ワークスペースで管理コンソールと SAML SSO/MFA 付き、デフォルトで Business データを学習に使わない\",\n" +
"          \"個人アカウント - すべてのワークスペースのセキュリティは同じ\",\n" +
"          \"個人アカウントの匿名モード - 管理は不要\",\n" +
"          \"料金がかからなければどのワークスペースでもよい\"\n" +
"        ],\n" +
"        correct: [0],\n" +
"        note: \"Pricing ページとヘルプ 'Using Codex with your ChatGPT plan' より: 業務はチームの ChatGPT Business ワークスペースで行う - 管理コンソール・SAML SSO/MFA 付き、デフォルトで Business データを学習に使いません。プロジェクトの仕事を個人アカウントと混ぜない。機微データの扱いはセキュリティ関連の設問を参照。\",\n" +
"        refs: [\n" +
"          { label: \"Pricing - ChatGPT Learn\", url: \"https://learn.chatgpt.com/docs/pricing\" },\n" +
"          { label: \"Help: Data controls in ChatGPT\", url: \"https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt\" }\n" +
"        ]\n" +
"      },");

/* ---- Q12 vi: memories -> skills + skills.sh ---- */
replaceBlock("Quy tắc bắt buộc của team (must-always-apply)",
"\n      {\n" +
"        cat: \"Codex & workflow\",\n" +
"        diff: \"medium\",\n" +
"        multi: false,\n" +
"        q: \"Team muốn khai thác thêm skills (khả năng đóng gói quy trình) cho Codex - cách làm đúng là gì?\",\n" +
"        options: [\n" +
"          \"Tham khảo thư viện skills.sh (directory skill cho AI agent, tổng hợp từ các GitHub repo nổi bật), review nội dung SKILL.md như review code rồi cài vào .agents/skills của repo để dùng chung; theo dõi tin tức AI agent để cập nhật skill mới\",\n" +
"          \"Internet có skill nào thì cài, skill luôn an toàn\",\n" +
"          \"Có skills rồi thì không cần AGENTS.md và docs chính thức nữa\",\n" +
"          \"Skill chỉ team OpenAI mới tạo được\"\n" +
"        ],\n" +
"        correct: [0],\n" +
"        note: \"Theo docs 'Customization overview' và guide 'Best practices': skill là thư mục chứa SKILL.md (instructions + metadata); personal skills ở $HOME/.agents/skills, skill dùng chung team được commit vào .agents/skills trong repo; $skill-creator hỗ trợ tạo khung ban đầu. skills.sh là 'The Agent Skills Directory' (verify HTTP 200 ngày 2026-11-12) - nơi khám phá skill từ nhiều GitHub repos prominent. Với skill nguồn ngoài: luôn review quyền/lệnh và nguồn dữ liệu trong SKILL.md như review một PR trước khi cài; theo dõi tin tức AI agent và release notes để cập nhật.\",\n" +
"        refs: [\n" +
"          { label: \"skills.sh - The Agent Skills Directory\", url: \"https://skills.sh\" },\n" +
"          { label: \"Customization overview - ChatGPT Learn\", url: \"https://learn.chatgpt.com/docs/customization/overview\" },\n" +
"          { label: \"Best practices guide - ChatGPT Learn\", url: \"https://learn.chatgpt.com/guides/best-practices\" }\n" +
"        ]\n" +
"      },");

/* ---- Q12 ja ---- */
replaceBlock("チームの必須ルール (必ず適用すべきもの)",
"\n      {\n" +
"        cat: \"Codexとワークフロー\",\n" +
"        diff: \"medium\",\n" +
"        multi: false,\n" +
"        q: \"チームで Codex に skills (定型的なプロセスのパッケージ化) を正しく導入する方法は?\",\n" +
"        options: [\n" +
"          \"skills.sh (AI エージェント向けスキルのディレクトリ、著名な GitHub リポジトリから集約) を参考にし、SKILL.md の中身をコードレビューのように確認してからリポジトリの .agents/skills に入れて共有。AI エージェント関連のニュースもフォローして新スキルを追跡\",\n" +
"          \"ネットで見つけたスキルは何でもインストール - スキルは常に安全\",\n" +
"          \"スキルがあれば AGENTS.md や公式ドキュメントは不要\",\n" +
"          \"スキルは OpenAI のチームしか作れない\"\n" +
"        ],\n" +
"        correct: [0],\n" +
"        note: \"公式 'Customization overview' とガイド 'Best practices' より: スキルは SKILL.md (手順 + メタデータ) を含むフォルダ。個人用は $HOME/.agents/skills、チーム共有はリポジトリの .agents/skills にコミット。$skill-creator で足場を作れる。skills.sh は 'The Agent Skills Directory' (2026-11-12 に HTTP 200 確認) で、複数の GitHub リポジトリからスキルを発見できる。外部ソースのスキルは導入前に権限・データソースを PR 同様にレビューし、AI エージェント関連ニュースもフォローして最新化する。\",\n" +
"        refs: [\n" +
"          { label: \"skills.sh - The Agent Skills Directory\", url: \"https://skills.sh\" },\n" +
"          { label: \"Customization overview - ChatGPT Learn\", url: \"https://learn.chatgpt.com/docs/customization/overview\" },\n" +
"          { label: \"Best practices guide - ChatGPT Learn\", url: \"https://learn.chatgpt.com/guides/best-practices\" }\n" +
"        ]\n" +
"      },");

/* ---- Q34 vi: general model strategy ---- */
replaceBlock("Khi thanh toán theo plan ChatGPT, chọn model + effort",
"\n      {\n" +
"        cat: \"Codex & workflow\",\n" +
"        diff: \"medium\",\n" +
"        multi: false,\n" +
"        q: \"Chiến lược chọn model trong Codex để cân bằng chất lượng và cost cho team?\",\n" +
"        options: [\n" +
"          \"Model suy luận mạnh cho các việc 'nghĩ': phân tích, lập plan/spec, viết docs, brainstorming, review phức tạp; model nhanh/rẻ hơn cho các việc 'làm': thực thi theo spec rõ ràng, refactor nhỏ, chạy test lặp lại\",\n" +
"          \"Luôn dùng model mạnh nhất cho mọi tác vụ, kể cả việc lặp lại đơn giản\",\n" +
"          \"Luôn dùng model rẻ nhất, vì chất lượng hoàn toàn do prompt quyết định\",\n" +
"          \"Model không ảnh hưởng đến usage/cost\"\n" +
"        ],\n" +
"        correct: [0],\n" +
"        note: \"Nguyên tắc từ docs 'Model selection': suy luận cao chỉ cần thiết cho tác vụ mở (phân tích, plan/spec, brainstorming, đánh giá thiết kế) - docs nói 'default to Astra' khi không cần tối ưu usage; task thực thi đã có spec rõ (sửa nhỏ, test, format) chạy tốt trên model hiệu quả hơn - docs hướng tới model 'most efficient' khi cần optimize usage và 'GPT-6.1 Sol' khi 'cost matters'. 'Pricing' nhấn mạnh: model choice, context, reasoning đều ảnh hưởng usage - chọn model/effort theo giai đoạn công việc thay vì để max effort mặc định.\",\n" +
"        refs: [\n" +
"          { label: \"Model selection - ChatGPT Learn\", url: \"https://learn.chatgpt.com/docs/model-selection\" },\n" +
"          { label: \"Config reference - ChatGPT Learn\", url: \"https://learn.chatgpt.com/docs/config-file/config-reference\" }\n" +
"        ]\n" +
"      },");

/* ---- Q34 ja ---- */
replaceBlock("ChatGPT プランで支払う場合の model と effort の選び方",
"\n      {\n" +
"        cat: \"Codexとワークフロー\",\n" +
"        diff: \"medium\",\n" +
"        multi: false,\n" +
"        q: \"チームでの品質とコストのバランスのための model 選択戦略は?\",\n" +
"        options: [\n" +
"          \"『考える』仕事 (分析・plan/spec 作成・ドキュメント作成・ブレインストーミング・複雑なレビュー) は推論が強いモデル、『実行する』仕事 (明確な spec に沿った実装・小さなリファクタ・反復テスト) は速く安いモデル\",\n" +
"          " + "\"単純な反復作業を含め、すべてのタスクで最強のモデルを使う\",\n" +
"          \"常に最安のモデルを使う - 品質はプロンプトだけで決まる\",\n" +
"          \"モデルは usage/コストに影響しない\"\n" +
"        ],\n" +
"        correct: [0],\n" +
"        note: \"公式 'Model selection' の原則: 推論の強さが必要なのは開いたタスク (分析・plan/spec・ブレインストーミング・設計評価)。usage を気にしないなら 'default to Astra'。spec が明確な実装・テスト・整形は効率的なモデルで十分 - docs は usage を最適化するなら 'most efficient' モデル、'cost matters' なら 'GPT-6.1 Sol' を案内。『Pricing』より model 選択・context・reasoning はすべて usage に影響 - 常に最高 effort にせず、仕事の段階で model/effort を選ぶ。\",\n" +
"        refs: [\n" +
"          { label: \"Model selection - ChatGPT Learn\", url: \"https://learn.chatgpt.com/docs/model-selection\" },\n" +
"          { label: \"Config reference - ChatGPT Learn\", url: \"https://learn.chatgpt.com/docs/config-file/config-reference\" }\n" +
"        ]\n" +
"      },");

/* ---- ui backTop labels ---- */
const labelReps = [
  ["backTop: \"⬆ Về đầu trang\"", "backTop: \"⬆ Lên đầu trang - xem giải thích\"", 1],
  ["backTop: \"⬆ 上へ戻る\"", "backTop: \"⬆ 上へ戻る - 解説を見る\"", 1]
];
for (const [from, to, expect] of labelReps) {
  const count = t.split(from).length - 1;
  if (count !== expect) throw new Error("label count " + count + " expected " + expect + " for: " + from);
  t = t.split(from).join(to);
}

/* ---- validate + regenerate snapshot ---- */
global.window = {};
eval(t);
const D = window.QUIZ_DATA;
const errs = [];
for (const l of ["vi", "ja"]) {
  const Q = D[l].questions;
  if (Q.length !== 40) errs.push(l + " count=" + Q.length);
  const multiCount = Q.filter(q => q.multi).length;
  if (l === "vi") console.log("multi=" + multiCount);
  const cat1 = D.vi.questions[0];
  Q.forEach((q, i) => {
    const v = D.vi.questions[i];
    if (JSON.stringify(q.correct) !== JSON.stringify(v.correct)) errs.push("correct mismatch Q" + (i + 1));
    if ((q.img || "") !== (v.img || "")) errs.push("img mismatch Q" + (i + 1));
    if (q.multi !== v.multi) errs.push("multi mismatch Q" + (i + 1));
  });
  if (/[\u2014\u2013]/.test(JSON.stringify(Q))) errs.push("dash " + l);
}
console.log("Q1 vi q: " + D.vi.questions[0].q.slice(0, 40));
console.log("Q12 vi q: " + D.vi.questions[11].q.slice(0, 40));
console.log("Q34 vi q: " + D.vi.questions[33].q.slice(0, 40));
console.log("Q12 vi has skills.sh ref: " + D.vi.questions[11].refs.some(r => r.url.indexOf("skills.sh") !== -1));
console.log("Q34 vi has config ref: " + D.vi.questions[33].refs.some(r => r.url.indexOf("config-reference") !== -1));
if (errs.length) { console.log("ERRS:\n" + errs.join("\n")); process.exit(1); }
fs.writeFileSync(P, t, "utf8");

const out = { generatedAt: "2026-11-12", note: "audit input extracted VERBATIM from quiz/questions.js (post content-refresh: Q1 workspace usage, Q12 skills/skills.sh, Q34 model strategy; difficulty tags removed from UI)", questions: D.vi.questions.map((q, i) => ({ n: i + 1, cat: q.cat, difsHidden: true, multi: q.multi, q: q.q, options: q.options, correct: q.correct, note: q.note, refs: q.refs, img: q.img || null, ja: { q: D.ja.questions[i].q, options: D.ja.questions[i].options, correct: D.ja.questions[i].correct, note: D.ja.questions[i].note } })) };
fs.writeFileSync("D:/orca-onboarding/chatgpt-rules/research/quiz-audit-input.json", JSON.stringify(out, null, 2), "utf8");
console.log("PATCH4 OK");
