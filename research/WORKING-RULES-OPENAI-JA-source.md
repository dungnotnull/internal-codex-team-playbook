# WORKING RULES WITH OPENAI - ChatGPT / Codex 向け IT チームルール

> **バージョン:** 1.3.2 (v1.3.2: コマンド姿勢テーブル + `.codex/rules/default.rules` 適用; 無人=read-only のみ; Codex タスク全般で 4 点宣言; skill は AI推進室 承認; v1.3.1:v1.3.1: 親会社ガイド round-2 - outbound/PR/採用/マスク仕様/4点宣言/rules 強制/自動化 read-only; v1.3: 更新日: 2026-11-13 (v1.3: 親会社ガイドとの整合 - フルアクセスは全員禁止、承認の代行は禁止、MCP には AI推進室の承認が必要で Google 系 MCP は全面禁止、業務システムでのブラウザ自動化は禁止、インシデントフローは 停止/保全/報告/無効化。v1.2.1: 保護パス §5.2 + ベトナム語版。v1.2: 英語正規版。v1.1: ルールファイルの詳細化、skills.sh、モデル戦略、`--ephemeral` の用語説明を修正)
> **親会社ガイド:** 本版は親会社ガイド **Codexアプリ安全利用ガイド-2.pdf**（9 か条、§12）に従います。公式 OpenAI ドキュメントが機能を許容していても、親会社ガイドが制限している場合は親会社ガイドを優先します - 該当箇所には両方の注記を本文中にインラインで記載しています。
> **ベトナム語版:** [`WORKING-RULES-WITH-OPENAI-VI.md`](WORKING-RULES-WITH-OPENAI-VI.md) - 本ファイルと 1:1 で同期しています。
> **日本語版:** 英語版 v1.3 からの翻訳
> **対象:** ChatGPT Plus / Pro / Business アカウント + Codex を利用するすべてのチームメンバー（開発者、BA、テスター、リード）。
> **前に読むこと:** プロジェクト業務で ChatGPT/Codex を利用する前に、まず本ファイル全体を読んでください。そのうえで、クイズ **quiz/QUIZ-OPENAI-RULES.html**（40 問、10 点満点。上部の言語切替から日本語版あり）に取り組んでください。
> **出典:** 以下の内容は、公式 OpenAI ドキュメント（ChatGPT Learn ドキュメント、ヘルプセンター、プラットフォームドキュメント）および信頼性の高い論文をもとにまとめたものであり、リンクはすべて 2026-11-12 に検証済みです。全ソース一覧は **§12. 参考文献** にあります。

---

## 目次

1. ChatGPT/Codex エコシステムの全体像
2. 適切な作業モードの選択
3. 効果的なプロンプティングの原則
4. プロジェクトデータのセキュリティ - 黄金律
5. サンドボックス、権限と human-in-the-loop
6. AGENTS.md、ルール、チーム設定
7. フェーズごとの標準ワークフロー
8. コスト管理と利用制限
9. よくあるミスとその回避方法
10. 毎日のクイックチェックリスト
11. クイックリファレンス（チートシート）
12. 参考文献

---

## 1. ChatGPT/Codex エコシステムの全体像

チームは **有料 ChatGPT（Plus/Pro/Business）** を利用します - 同じログインに開発者向けの AI ツール一式がすべて含まれており、別途購入は不要です:

| サービス | 主な用途 | 備考 |
|---|---|---|
| **Chat**（Web/デスクトップ/モバイル） | 質問、アイデア、下書き、要件分析、ドキュメント作成 | 高速。ターンごとに分岐する |
| **ChatGPT Work**（Work モード） | 複数のソース/ファイルを扱い、レビュー用の成果物（レポート、スライド、ドキュメント）を生成する複数ステップのタスク | Chat より利用枠を多く消費する |
| **Codex CLI** | ターミナル内のコーディングエージェント、自動化、CI（`codex exec`） | プランに含まれる。ChatGPT でサインインする |
| **Codex IDE 拡張機能** | エディタの隣で動くエージェント（VS Code/Cursor など）。開いているファイルを自動的にコンテキストへ含める | IDE 拡張機能が最も手軽。CLI では @ パスでファイルを指定する |
| **Codex Cloud / Web（chatgpt.com/codex）** | 隔離されたクラウド環境で並列実行されるコーディングタスクの委譲。GitHub/GitLab の PR コードレビュー（GitHub: **GA**、GitLab マージリクエスト: **preview**） | 有効化しないかぎり、Cloud はインターネット **既定でオフ** |

**要件分析/ワークフローへの示唆:**
- 1 ターンで完結する小さなタスク → Chat。ファイル成果物が必要な複数ステップのタスク → ChatGPT Work。コードベースに触れる作業はすべて → Codex（CLI/IDE/Cloud）。
- エージェントに委譲する前に、3 つのセルフチェック質問（公式 "Working with agents" ドキュメント）に答えてください: *Can I describe the outcome and what "done" means? Does the agent have the information/tools it needs? Can I evaluate the result and recover if something goes wrong?*
- エージェントは **チャットよりも時間がかかり、消費も大きくなります** - 大きな仕事を丸ごと渡す前に、総合的な価値（レビュー時間、待ち時間、コスト）を見極めてください。

📚 参考: [Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt) · [Working with agents](https://learn.chatgpt.com/docs/working-with-agents) · [Codex CLI](https://learn.chatgpt.com/docs/codex/cli) · [Codex Cloud](https://learn.chatgpt.com/docs/cloud) · [Codex in ChatGPT](https://chatgpt.com/codex) · [Help: using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)

---

## 2. 適切な作業モードの選択

> **現在のチームの焦点 - リードに確認済み: Codex が主要ツール** - 開発/コード作業はすべて以下の Codex プロセスに従い、Chat/Work は分析とドキュメントに使います。

サービスと設定は、習慣ではなく **リスクレベル + タスク種別** に基づいて選択します:

1. **通常のチャット/分析、ドキュメント:** Chat + Project を使います（関連するチャット、ファイル、ソースをまとめられます）。Projects によってチャット間でファイル/ソースを共有でき、コンテキストの繰り返しを避けられます。
2. **実際にファイルを編集するコード作業:**
   - バージョン管理下のリポジトリ → Codex は **Auto** プリセットで開始します: `--sandbox workspace-write --ask-for-approval on-request`（ワークスペース内での読み書きやコマンド実行は自動。ワークスペースの外に出る場合やネットワークが必要な場合には、事前に確認を求めます）。
   - バージョン管理されていないフォルダ → 信頼できるようになるまで既定で **`read-only`**（Codex はオンボーディング プロンプトや `/permissions` で "trust" を待つ場合があります）。
   - **フルアクセスは全員禁止**: `--sandbox danger-full-access` / `--yolo` には決して切り替えないこと - 親会社ガイドは、リードを含むすべてのメンバーに対してこれを禁止しており、コンテナ/devcontainer の内部でも例外はありません。より広いスコープが必要なら `workspace-write` + rules/on-request。
   - **承認を代行させない**: `--approve-for-me` や `approvals_reviewer = "auto_review"` は決して使わないこと - 承認画面は責任者が自分自身で確認します（親会社ガイド）。
3. **長期間・複数ブランチにまたがる作業:** git worktrees + Codex Cloud を使います。ローカルで計画し、実装をクラウドへ委譲し、diff をレビューして PR をオープンします。 **ポリシー（親会社ガイド）: チームのワークスペースを超える一切（PR のオープン、公開）は人間がレビューするアクションです - エージェントは直接 push せず、マージは人間だけが行います。Codex Cloud + ワークスペースの GitHub app は、親会社が承認したワークスペース上に既にプロビジョニングされたプラットフォーム機能です（ランごとの AI推進室 申請は不要。クラウド環境は既定でオフライン）。ただし包括承認ではありません: PR のオープンは GitHub app 経由、マージは常に人間が行い、**新しい外部サービスの接続（やアプリ権限の変更）は引き続き §6.3 の承認フロー（AI推進室）が必要です。****
4. **繰り返し発生する作業:** プロンプトが安定するまで磨きます → **Scheduled task**/automation としてスケジュールします。 自動化は **read-only**（または以前に承認済みの読み取り専用ルールのみ）で実行します: 無人実行は書き込み・ネットワーク開放・承認の委譲をしません - 承認画面が出た場合は、やはり責任者が自分で回答します（親会社ガイド）。
5. **CI/自動化（非対話）:** `codex exec` を使います - **既定では読み取り専用（read-only）のサンドボックスで実行**されます。編集を許すには `--sandbox workspace-write` を追加し、権限は "least permissions"（最小権限）の原則に固定します。注意: **`--full-auto` は廃止されました** - 古いスクリプトは `--sandbox workspace-write` へ移行してください（`--approve-for-me` へ移行してはいけません: 承認の自動レビューへの振り分けであり、親会社ガイドが禁止しています）。

### Codex クイックハンドブック（チームの主軸）

**サインイン/認証（コストと権限に関する重要な違い）:**

| サインイン方式 | 仕組み | 備考 |
|---|---|---|
| **Sign in with ChatGPT** | 既存のプラン（Plus/Pro/Business）を利用 | **Codex Cloud には** ChatGPT サインインが必須。"Local computer access with Work Cloud" を有効化できる唯一の方式 |
| **API key**（`codex login --with-api-key` / `CODEX_API_KEY=...`） | 利用量に応じた課金。OpenAI Platform アカウント経由で **標準の API 料金** が適用される | API key/codex アクセストークンは Work Cloud のローカルアクセスを有効化**しません**。自動化/CI の自然な既定 |

**日常のコマンドと操作:**

- `codex` - 対話型。`codex exec "task"` - 非対話型（進行状況は `stderr` へ、最終結果は `stdout` へ。解析には `--json`、最終結果の書き出しには `-o file`、セッションの rollout ファイルをディスクに残したくない場合は `--ephemeral`）。`codex review` - コードレビュー。`codex mcp add` - MCP。
- セッション内: `/plan`（複数ステップ作業用の Plan mode）、`/goal`（長期のゴール）、`/review`（ローカルレビュー）、`@` によるファイル指定、`/permissions`（権限/サンドボックスを素早く変更）、`/status`（残量確認）、`/memories`（チャット単位のメモリ）。
- エージェント実行中: **Enter = steer**（現在のターンに指示を差し込む）、**Tab = queue**（次のターンを並べて待機）。

**主要な設定項目（`config.toml`）:**

- `sandbox_mode`: `read-only | workspace-write | danger-full-access`。
- `approval_policy`: `on-request | never | { granular = { sandbox_approval, rules, mcp_elicitations, request_permissions, skill_approval } }`。ドキュメントにはさらに `approvals_reviewer = "auto_review"`（レビューサブエージェントがあなたの代わりにプロンプトを承認する）も載っていますが、**チーム方針: 使用しないこと。承認画面は必ず自分自身で確認する**（親会社ガイドは承認の代行を禁止）。
- `[sandbox_workspace_write] network_access = true` + `features.network_proxy`（実験的、**既定でオフ**）+ ドメイン許可/拒否リスト（拒否リストが常に優先）。プロキシのフィルタ対象はローカルサンドボックス内で実行されるコマンドのみ - Web 検索/MCP/コネクタ/クラウドのトラフィックは経由しません（詳細は §5.3）。
- `project_doc_max_bytes`: AGENTS.md チェーンの既定値は **32 KiB**。
- ローカルチャットの Web 検索: **cached モードが既定**（OpenAI が管理するインデックスを使用。コマンド自体のネットワークがオフでも機能します）。最新情報が必要なときだけ `live` を使います（単発の実行には `--search`、`allowed_web_search_modes` で設定）。 親会社ガイド: `cached`/`indexed` を維持し、`live` は必要かつ機密データが文脈に無いときに限ります。
- ローカルの Codex memories は **既定でオフ** - Settings → Personalization → "Enable Codex memories"、またはチャットごとに `/memories` で有効化します。

**ChatGPT 経由の支払いでのモデルと effort:** GPT-6 Luna = 最軽量/最速（小さな編集、データ抽出）、GPT-6 Astra = 最強（利用量を節約しないときの既定）、GPT-6.1 Sol と Terra はその中間（Terra は、渡された素材からの簡潔な文章作成と、ゴールが明確に定義された computer-use タスク向け - 注: この運用では computer-use/ブラウザ自動化は使用しません（親会社ガイド））。effort との組み合わせ: 例えば小さな編集には `Luna · Low`、複数アプリにまたがる文脈探索/トリアージには `Luna · Extra high`。

📚 参考: [Sandbox](https://learn.chatgpt.com/docs/sandboxing) · [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security) · [Codex environments](https://learn.chatgpt.com/docs/environments/modes) · [Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees) · [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode) · [Scheduled tasks](https://learn.chatgpt.com/docs/automations) · [Long-running work](https://learn.chatgpt.com/docs/long-running-work) · [Authentication](https://learn.chatgpt.com/docs/auth) · [Model selection](https://learn.chatgpt.com/docs/model-selection) · [Web search](https://learn.chatgpt.com/docs/web-search) · [Config reference](https://learn.chatgpt.com/docs/config-file/config-reference)

---

## 3. 効果的なプロンプティングの原則

### 3.1 4 部構成（公式 "Prompting" ドキュメント）

- **Goal:** 求める成果は何か、誰が読むのか。
- **Context:** どのソース/データが重要か（ファイル添付、@-メンション、スクリーンショット。出典の引用を求めながら Web 検索を依頼する）。
- **Output:** 形式、分量、必要な詳細レベル。
- **Boundaries:** 変えてはいけないもの/事前に確認すべきもの（最重要の 1-2 で十分 - すべてのステップを管理しようとしない）。

> 手順書ではなく **望む成果** を書きます。ただし、プロセスそのものが成果物である場合は別です。特に Work/Codex では、**"done"（完了）がどんな状態か** を明示します（例: レポートの見本、完了の定義、通過すべきテスト）。 **チーム方針（親会社ガイド）: Codex へのすべてのリクエストは 4 点を必ず宣言します - 対象（許可されたフォルダ/ファイル）、作業（何をするか）、禁止事項（削除なし/外部送信なし/フォルダ外アクセスなし）、確認ステップ（実行前に候補リスト/差分を見せる）。「1-2 の境界で十分」のヒントは表現スタイルの話で、Codex タスクでは 4 点宣言が必須ゆえ、"禁止" 項目は明示的に書きます（親会社ガイドが表現のヒントに優先します）。**

### 3.2 公式ドキュメントが推奨する Tips

- **Codex:** 特定のファイルは `@`/`/mention` で指名します。IDE では開いているファイルが自動的に含まれます。複数ステップの作業では `/plan`（Plan mode）を使うと、Codex が編集前に探索して質問できます。長時間に及ぶ作業には Goal mode（`/goal`）があります。
- **ターンごとに反復する:** 最初のプロンプトは完璧でなくて構いません。確認 → 具体的な修正を依頼する（steer）。Codex CLI では、実行中に `Enter` で **steer**（現在のターンに情報を追加）、`Tab` で **queue**（次のターンを待つ）。
- **出荷前のセルフチェック:** モデルに "final check"（最終確認）を依頼します（例: すべてのアクション項目に担当者 + 期限があることを確認する、仕上げ前に 2 つのファイルを diff する）- それでも利用/公開の前に **自分自身でレビュー** します。
- **Custom instructions**（Settings > Personalization）: 全般的に適用したい設定は custom instructions に置き、チャット固有の詳細はプロンプトに置きます。プロジェクト作業では `AGENTS.md`（§6）を使います。
- **出典を求める:** 新鮮な情報が必要なときは **Web 検索 + 引用** を依頼します。絶対に正しい数値が必要なときは、プロンプト内の暗算を信用するのではなく、モデルに道具を与える方式を優先します（スクリプトで計算する、実データを使う）。

### 3.3 科学的な裏付け - なぜこのプロンプティングが機能するのか

- 論文 **Chain-of-Thought (Wei et al., 2022)**: 答える前に "think step by step"（一歩ずつ考える）と促すと、複雑な問題での正確性が大幅に向上します - 結論を出す前に手順を列挙し/確認させる指示に相当します。
- 論文 **ReAct (Yao et al., 2022)**: **推論 + 行動** の組み合わせ（考え、次に道具を使って行動する）は、どちらか単独よりも優れます - エージェントに記憶からの推測ではなく、検索/ファイルの読み取りをさせることに相当します。
- 論文 **Principled Instructions Are All You Need / "Prompt principles" (Bsharat et al., 2023)**: 多くの LLM ファミリーにわたる 26 のプロンプティング原則に関する実証研究。際立ったもの: **明確に、簡潔に、丁寧に書く。コンテキスト + few-shot 例を加える。ステップバイステップの回答を求める。望む振る舞いは、否定形の "don't..." 言い回しよりも肯定形で表現する。正確性が重要な場面では "do not invent - if information is missing, say you don't know" を加える。**
- **The Prompt Report (Schulhoff et al., 2024)**: 58 のプロンプティング技法を体系的に調査した報告書 - 結論: 良いプロンプト = タスクの説明 + コンテキスト + 例 + 明確な指示。凝った技法は具体的なベンチマークと比較する必要があり、"wins everywhere"（どこでも最適）な技法は存在しません。
- **指示と動的データを分離する**（OpenAI prompt engineering ガイド）: 動的な入力（ユーザー内容、ファイル、Web ページ）を明確な区切り（`"""`、XML タグ、`###`）で囲み、prompt injection と "instruction drift"（指示の逸脱）を防ぎます。与えられた素材だけから答えるよう求め、素材になければ "not in the provided material"（提供された素材にはない）と（逐語的な引用とともに）述べさせます。
- **通常モデルと reasoning モデルの使い分け:** 通常モデルでは few-shot + "step by step" が大きく効きます。reasoning モデルでは "think step by step" のようなフレーズを外し、プロンプトは短く - 直接的に - 制約と成功基準に絞ります（Reasoning ガイドより）。
- **プロンプトをコードのように評価する:** チームが共有プロンプトを変更するときは、必ず **Evals**（標準テストスイート）を使います - "prompt regression"（プロンプトの退行）を避けるためです。
- **モデルはなぜハルシネーションを起こすのか?** OpenAI の研究論文 *"Why Language Models Hallucinate"*（Kalai, Nachum, Vempala, Zhang - 2025）: ハルシネーションは **インセンティブ構造** の帰結です - 採点は正しい推測に点を与える一方、"I don't know"（わからない）は誤答として扱われる → **推測が正直さを上回り得る**ため、モデルは過信する試験受験者のように訓練されてしまいます。対策: **"I don't know" という回答を認める、引用を必須にする、コンテキストに RAG や実文書を入れる。SimpleQA のようなベンチマークでは、事実正確性がまだ高くないことが示されています** - 常に検証ループを維持してください。
- **"Why Johnny Can't Prompt" (Zamfirescu-Pereira et al., CHI '23):** フィールドスタディでは、非専門家がプロンプト設計で失敗する要因として、**アドホックな試行錯誤**、決定論的なシステムではなく **LLM を人間として擬人化すること**、ケースを通したテストではなく **1 回の成功から一般化すること** が見つかりました。チームの教訓: プロンプトはチェックリスト + テストセットに固定し、感覚で調整しない。

### 3.4 プロンプティングのアンチパターン（禁止）

- コンテキストなしのスタブ プロンプト（"fix the bug"、"make it prettier"） - 結果は当てずっぽうになります。
- 関連するのは一部だけなのに、**大量の機密データ/無駄なデータ** をプロンプトへ流し込む（利用枠を浪費 + §4 のリスク）。
- "I don't know / ask again" を認めないまま "only answer correctly"（正しくしか答えない）と強いる → でっち上げを招きます。
- 1 つの明確な文で足りるのに、プロンプト構造を過剰に入れ子にする。
- モデルが出力した **数値、リンク、引用** を確認せずに鵜呑みにする - 特にリソース リンク、法令、価格はハルシネーション リスクが最も高い。

📚 参考: [Prompting (ChatGPT Learn)](https://learn.chatgpt.com/docs/prompting) · [Prompt engineering (OpenAI API docs)](https://platform.openai.com/docs/guides/prompt-engineering) · [Reasoning models](https://platform.openai.com/docs/guides/reasoning) · [Working with evals](https://platform.openai.com/docs/guides/evals) · [Best practices (Codex)](https://learn.chatgpt.com/guides/best-practices) · [Model selection](https://learn.chatgpt.com/docs/model-selection) · 論文: [CoT](https://arxiv.org/abs/2201.11903) · [ReAct](https://arxiv.org/abs/2210.03629) · [Prompt principles](https://arxiv.org/abs/2312.16171) · [The Prompt Report](https://arxiv.org/abs/2406.06608) · [Why Language Models Hallucinate](https://arxiv.org/abs/2509.04664) · [Why Johnny Can't Prompt (CHI '23)](https://doi.org/10.1145/3544548.3581388)

---

## 4. プロジェクトデータのセキュリティ - 黄金律

> 基本原則: **ChatGPT/Codex はクラウドサービスです。打ち込むもの、添付するもの、エージェントに読ませるものは、すべて OpenAI のシステムへアップロードされるデータです。** そのリスクを受け入れられる場合にのみ提供してください。

### 4.1 機密度による情報の分類

| データの種類 | ルール |
|---|---|
| **シークレット/極めて機密性の高いソースコード**（API キー、トークン、秘密鍵、パスワード、.env、CI/CD キー、証明書） | **プロンプト、添付ファイル、AGENTS.md、プロジェクト、メモリには絶対に貼り付けない。** プレースホルダ（`$API_KEY`）を使い、変数名で参照する。誤って貼り付けた場合: **停止する。証跡を保全する（チャット/ログを自分で削除しない）。リード/IT セキュリティへ報告する（個人データが関わる場合は個人情報窓口にも）。そのうえでシークレットを失効 + ローテーションする**。チャットの削除は、リード/IT セキュリティの指示があるときに限ります（親会社インシデントフロー: 停止 → 保全 → 報告 → 無効化）。 |
| **プロジェクトのソースコード** | Codex/Work に読み取らせるのは承認済みのワークスペース領域のみ。承認なく顧客/契約リポジトリ全体をクラウドタスクへアップロードしない。コードは許可されたアクセス範囲内でのみ共有する。 |
| **顧客の個人情報（PII）** | 識別子は絶対に貼りません。親会社ガイドのマスク仕様: ID コードに置き換える（対応表は別管理）。データからは**メールアドレス/電話番号を削除**してから渡す。住所 → 最上位の行政区分だけ残す。生年月日 → 年代（例:「30 代」）。勤務先/学校名 → 業界/職種/規模のカテゴリに置き換える。健康データは一切渡さない。合成データの利用も検討する。 |
| **公開情報/通常の社内ドキュメント** | 分析、ドキュメント作成、比較に自由に使用できる - **ただし認証情報/PII を含まない場合に限る。疑わしい場合は先にマスクする（PII 行を見る）。** |

**セッションハイジーン（親会社ガイド）:** 業務オブジェクト（案件/応募者/プロジェクト）ごとにセッションを分け、貼り付け前にクリップボードを見直します - 認証情報や個人情報が作業内容に混入しないようにします。

**ブラウザ自動操作（親会社ガイド）:** ブラウザ拡張、@Browser/@Chrome 型の自動操作、コンピューター操作は業務システムでは禁止です - ログイン、閲覧、ダウンロード、送信、公開、更新は人が行います。

**セッション衛生（親会社ガイド）:** 業務オブジェクトごと（案件/申請者/プロジェクト）にセッションを分け、貼り付けの前にクリップボードを再確認します。認証情報や個人データを作業コンテンツに紛れ込ませてはいけません。

**ブラウザ自動化（親会社ガイド）:** 業務システムでは、ブラウザ拡張、@Browser/@Chrome 形式の自動化、computer-use は禁止です。ログイン、閲覧、ダウンロード、申請、公開、更新は、人が自分自身で行います。

### 4.2 アカウントとワークスペースの設定（Business/Team）

- **個人アカウント（Free/Plus/Pro）:** 学習への共有は **既定でオン** → **Settings > Data controls** を開き、*"Improve the model for everyone"* をオフにします。オフにした後でも学習への送信が起こりうる経路は 3 つあります: **(1)** 👍/👎 フィードバックは会話全体をトレーニングへ送ることがある、**(2)** voice mode には独自の共有設定がある、**(3)** Codex には "Include environments" という別設定がある。サイバー業務向けの Trusted Access（Daybreak Blue）プログラムでは、コンテンツがモデル改善に使われる場合があります。
- **Workspace（Business/Enterprise/Edu/Healthcare）:** OpenAI は **既定ではワークスペースのコンテンツで学習しません**（API Platform も同様）。保持/メモリ/コンプライアンス/アクセスは、管理者がワークスペース レベルで制御します。チームはプロジェクト業務にこのワークスペースを使わなければなりません。
- **Business には SSO（SAML/OIDC）が含まれ、ドメイン検証は無料。MFA はアカウント単位の設定です。** Enterprise はさらに RBAC と **Compliance API**（監査ログ - Enterprise/Edu のみ。Business にはない）を加え、**Business の管理者はメンバーの会話を閲覧/エクスポート/削除できる** - 極めて機密性の高いチームでは、この点も考慮してください。
- **テンポラリーチャット:** 履歴には入らず、メモリも使わず、改善にも使用されません - ただし OpenAI は安全のため **最大 30 日間コピーを保持** します。テンポラリーチャットを "保存" すると、個人設定に従って通常のチャットに変わります。
- **保持期間（検証済みの数値）:** Business - 削除/未保存の会話は、本番システムから **30 日以内** に消去されます（法的ホールドは除く）。Agent mode - コンテンツ（チャット、閲覧履歴、スクリーンショット）はユーザーが削除するまで保持され、削除後 **90 日以内** に消去されます。プロジェクト/ファイルの削除 - **30 日**。削除済みメモリのログ - **30 日**。
- **Agent mode:** Plus は ~**40** 件/月、Pro は ~400 件、Business/Enterprise は ~40 件（フレキシブル価格では 1 メッセージあたり 30 credits）。エージェントにアプリ/サイトへの **サインインを** 任せることは、機密データ（メール、ファイル、設定）へのアクセスを与えることと同じです。OpenAI は Agent mode の **prompt injection リスクを明示的に文書化** しています - 接続するアプリは必要最小限にし、会話にパスワードを入力しない（**takeover mode** を使う）、不審な点があれば停止する、機密性の高いセッションの後はエージェントのブラウザデータを消去する。 **ポリシー注意: これらは公式ドキュメントの機構の説明。親会社ガイドにより業務システムではブラウザ自動操作/コンピューター操作は使用せず、チームのワークフローでは Agent mode のブラウザはオフにします。**
- **Memory** は過去のチャット、Library/Space ファイル、**接続済みアプリ（Gmail など）** から引き出せます - アプリに渡した機密情報が、後のチャットで "resurface"（再浮上）する可能性があります。封じ込めには **project-only memory**（プロジェクト限定メモリ）を使います。Memory はあくまで "recall layer"（想起レイヤー）であり、必須のルールは `AGENTS.md`/ドキュメント（§6）に置きます。 **（ポリシー: 業務には Gmail/Drive 系コネクタを使用しません - 親会社ガイド）**
- **Projects:** 共有プロジェクトでは **すべてのメンバーが、その中の全ファイルを閲覧 + ダウンロードできます**。個人アカウントのプロジェクトは、オーナーとすべてのコントリビューターの学習共有がオンである場合に限り学習に使われます。Business/Enterprise は既定で学習なし。プロジェクトファイルにシークレットを置いてはいけません。
- **Plugins/apps/connectors:** Business では apps が **既定でオン** - 管理者は早い段階で Plugins ページを監査すべきです。Enterprise は既定でオフ + RBAC。アプリごとの権限モード（Always ask / Allow read / low-risk / all - 最後のものは "elevated risk"（危険度が高い）と表示される）や、ドメイン許可リスト、DLP-lite（Drive 共有ドライブ、SharePoint/Teams の秘密度ラベルなど; ポリシー: Google/Drive 系アプリはチーム用としてプロビジョンしない -「Business では apps 既定でオン」は監査すべき事実であり、許可ではない）があります。**カスタム MCP アプリは OpenAI 検証済みではありません** - 第三者へ送られたデータはその先のポリシーに従い、30 日より長く保持される可能性があります。

### 4.3 保持期間と API

- ChatGPT Business/Enterprise の場合: 会話、ファイル、コネクタデータ - **それぞれが固有の保持ルールを持ちます**（Library ファイルは会話とは別物。チャットを削除しても Library ファイルは削除されない。コンプライアンス記録は 30 日間保持される）。全容は ChatGPT Work の概要にある表を参照してください。
- **API と ChatGPT:** 2023-03-01 以降、OpenAI API は明示的にオプトインしないかぎり **顧客データで学習しません**。不正利用監視ログは既定で最大 **30 日** 保持されます。要件を満たす顧客は、org/プロジェクト単位で **Zero Data Retention（ZDR）** を申請できます - ただし **エンドポイント単位** です（chat/completions、responses、embeddings は対象。assistants/threads/files/agents は対象外 - ユーザーが削除するまで状態を保持します）。注意: CSAM と分類された画像は人手確認のため保持されます。**MCP サーバー/サードパーティ製ツールは独自の保持ポリシーに従います**。
- **ファインチューニング済みモデルは非公開** です（共有されず、他モデルの学習にも使われません）。ファインチューニング用データは、ユーザーが削除するまで保持されます。
- **データレジデンシー:** API/Enterprise は、保存データ（content at rest）に対してリージョン（US/EU/UK/CA/JP/KR/SG/IN/AU/UAE）をサポートします。ただし **システムデータ + サードパーティ統合は、リージョンでは遮断されない** 点、Enterprise は **EKM**（bring your own keys、顧客管理鍵）を追加する点に注意してください。したがって、本当に機密性の高いデータには、API + ZDR + residency が最も強固な構成です。

### 4.4 把握しておく 2025-2026 年の更新情報（古いルールを適用しないために）

- **Universal Usage Policies** は全製品に適用されます。改訂版は **2026-11-20 に発効** します（追加事項: OpenAI の出力で競合モデルを学習することの禁止、防衛/セキュリティ用途での承認要件、モデルアクセス仲介事業者へのレビュー要件）*（ポリシーページはスクリプトクライアントをブロックします - 403 - 2026-11-12 にブラウザで直接開いて検証済み）*。
- ポリシーの柱 "Respect privacy"（プライバシーの尊重）: 許可のない人物のプロファイリング/監視/スコアリングはしない。"Empower people": **human review（人間の確認）なしで、重大な決定（採用、与信、健康、法律問題など）を自動化しない** - チームが ChatGPT 上に構築するすべてのワークフローは、この種の決定について human in the loop を維持しなければなりません。 **親会社ガイドは採用についてさらに厳格です: 採否（hire/reject）、応募者の順位付け、人物評価を Codex に委ねません - 直接使える状態のドラフトでさえも。これらの判断は人間が自分で行います。**
- **ChatGPT Atlas ブラウザはサービス終了（retired）** しました。Atlas のデータは ChatGPT とは別物であり、ChatGPT のチャットを削除しても Atlas のデータは削除されません。チームでまだ利用していた場合は、管理者向けガイダンスに従って移行 + クリーンアップしてください。
- **Custom GPTs は廃止の方向**（plugins への移行）です。Enterprise は新規 GPT の作成を 2026-10-26 に停止し、2026-12-11 に完全終了します。個人アカウントでは新しい GPT を作成できません。GPT を土台にした新しいワークフローを始めないこと。
- Operator は **agent mode へ統合** されました。agent mode の枠は §4.2 のとおり月単位です。

### 4.5 モデル側・入力側のリスク

- **Prompt injection**: 外部コンテンツ（Web ページ、PR、顧客データ、エージェントブラウザのファイル）は、エージェントを狙った "instructions"（指示）を運べます。ルール: **信頼できない入力を根拠に、高い権限や自動化を与えない**。サンドボックス/承認は §5 のとおり設定する。リアルタイム性が不要なら、Web 検索は `live` より `cached`/`indexed` を優先する。agent mode のアプリは必要最小限だけ接続する。
- **OWASP GenAI Security - LLM Top 10 for 2025** は、AI 業務を設計する際の標準チェックリストです（LLM01 Prompt Injection、LLM02 Sensitive Information Disclosure など）。チームはプロセス レベルで適用します: 入れるデータを絞る、出す権限を絞る、結果は突き合わせて確認する。
- **モデルは間違え得る（ハルシネーション）**: 法的事実、価格、リンク、API 識別子、バージョンは、必ず **公式ソースと突き合わせて確認** します - 本ファイル自身の "no invented links"（でっち上げリンク禁止）ルールと同じ姿勢です（全リンクを 2026-11-12 に検証済み）。
- **運用セキュリティ:** 保存時は AES-256 暗号化、転送時は TLS 1.2+、SOC 2 Type 2、ISO/IEC 27001/27017/27018/27701、CSA STAR（Enterprise privacy による。当該ページはスクリプトクライアントをブロックします - 403 - 2026-11-12 にブラウザで直接開いて検証済み）- ただし、**本当の境界線は接続アプリのプロバイダ側権限です**。アプリの権限は定期的に監査してください。

📚 参考: [Help: Data controls in ChatGPT](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt) · [Help: Temporary chat](https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt) · [Help: ChatGPT agent](https://help.openai.com/en/articles/11752874-chatgpt-agent) · [Help: Projects in ChatGPT](https://help.openai.com/en/articles/10169521-projects-in-chatgpt) · [Help: Admin controls for plugins & apps](https://help.openai.com/en/articles/11509118-admin-controls-security-and-compliance-for-plugins-and-apps) · [Help: Atlas retirement](https://help.openai.com/en/articles/20001371-chatgpt-atlas-retirement) · [Your data on the API](https://developers.openai.com/api/docs/guides/your-data) · [Usage Policies](https://openai.com/policies/usage-policies) · [Enterprise privacy](https://openai.com/enterprise-privacy/) · [Data residency expansion](https://openai.com/index/expanding-data-residency-access-to-business-customers-worldwide) · [Help: Chat and file retention policies](https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt) · [Help: Data residency (ChatGPT)](https://help.openai.com/en/articles/9903489-data-residency-and-inference-residency-for-chatgpt) · [Help: Memory](https://help.openai.com/en/articles/8590148-memory-in-chatgpt) · [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/)

---

## 5. サンドボックス、権限と human-in-the-loop

### 5.1 異なる 2 つの制御レイヤー

- **サンドボックス（Sandbox）** = エージェントが自立的に動作できる技術的な境界（ファイル、コマンド、ネットワーク）。
- **承認ポリシー（approval policy）** = 境界の外へ出る前に、エージェントが **停止してあなたに確認** しなければならない条件。
- エージェントが起動するすべての子プロセス（git、npm、pytest など）は **サンドボックスを継承** します - サンドボックスの境界内に留まるかぎり、エージェントは自律的に動き続けられます。

### 5.2 チーム標準の構成

| シナリオ | 構成 |
|---|---|
| 読み取り専用/コード分析 | `sandbox_mode = "read-only"` + `approval_policy = "on-request"` |
| バージョン管理下リポジトリでのコード編集 | `workspace-write` + `on-request`（**Auto** プリセット） |
| CI/非対話スクリプト | `codex exec --sandbox read-only --ask-for-approval never`、または rules 付きの workspace-write（`never` と automation が許されるのは read-only の場合のみ - 承認画面が存在しないため。無人の書き込み/ネットワーク実行は禁止） |
| フルアクセス（"full access" / `--yolo`） | **親会社ガイドにより全員禁止 - コンテナ/devcontainer の例外なし、リードも含めて** |

ハードルール: `--dangerously-bypass-approvals-and-sandbox`（エイリアス `--yolo`）は、公式ドキュメントで **"not recommended"**（非推奨）とされており、親会社ガイドにより **全面的に禁止されています: コンテナ内部を含め、フルアクセスへ切り替える者はいません。** より広いスコープが必要な場合は、`workspace-write` + rules/on-request を使い、すべての承認を必ず自分自身で確認してください。

**承認の姿勢（親会社ガイド）:** 何かを許可するときは "this time only"（今回のみ）を優先します。永続的な "always allow"（常に許可）は、安全な読み取り専用操作に限ります - 外部送信、削除、認証、Drive 系連携に使ってはいけません。

**コマンドの姿勢（親会社ガイド付録）:** 作業フォルダ内の読み取り専用の確認コマンド（`cat`、`head`、`tail`、`grep`、`find`、`ls`、`pwd`、`git status/diff`）は、内容を確認したうえで許可できます。状態を変える操作（`mv`、`cp`、`mkdir`、`sed -i`、出力リダイレクト `>`）は、候補リストを先にレビューします。**却下**: `rm` / `rm -rf`（削除は不可逆です）。**却下して報告**: `curl` / `wget` / `scp` / `ssh` / `git push`（外部転送）、`cat .env` / `env` / `sudo` / `chmod 777`（認証情報の読み出し、権限の緩和）。コマンドに確信が持てないときは、判断の前に Codex に "explain what this command does"（このコマンドが何をするか説明して）と尋ねてください。 **機械的な強制: この姿勢は rules ファイルで強制できます - 動作サンプルはこのリポジトリの `.codex/rules/default.rules` を `<repo>/.codex/rules/` へコピーして使います。 - `.codex/rules/` に `prefix_rule` をコミット: `rm` → `forbidden`; `mv` / `cp` / `sed -i` / 出力 `>` → `prompt`; `git push` → `forbidden`（プロジェクト層、trusted）。サンドボックス内の書き込みコマンドは承認画面を出さないため、rules ファイルこそがこの姿勢を実効化します。**

**書き込み可能ルート内の保護パス:** 既定の `workspace-write` ポリシー下でも、いくつかのパスは再帰的に常に読み取り専用で保護されます: `.git`（ディレクトリまたはポインタファイル - 解決後の Git ディレクトリも含む）、`.agents`、`.codex`、`.aws`。これによって Codex は、エージェントが自分自身の設定、AWS 認証情報、git 履歴を書き換えるのを防ぎます。それ以外の書き込み可能ルート内の内容は書き込み可能のままであり、`node_modules` や `src` といった通常のフォルダはこの特別リストには含まれません。

### 5.3 ネットワークアクセス

- `workspace-write` は、ネットワークが **既定でオフ** です。許可するには: `[sandbox_workspace_write] network_access = true` を設定 +（`features.network_proxy` を有効化する場合）**ドメイン許可リスト**（拒否リストが常に優先）。 **ポリシー（親会社ガイド）: ネットワークは、必要最小限の、既に承認済みの内部宛先に限って開放します。直接の外向きコマンド（`curl`/`wget`/`scp`/`ssh`/`git push`、アップロード）は、却下して報告します（§5.2 のコマンドの姿勢）。`live` Web 検索は生のコマンド送信ではなく OpenAI 経由の Web 検索機能ですが、既定は `cached`/`indexed` を維持し、`live` は必要かつ機密データが文脈に無い場合だけ使います。**
- プロキシが保護するのは **サンドボックス内のコマンド** だけです - Web 検索、MCP、コネクタ、クラウドのトラフィックは **プロキシを経由しません**。それぞれ固有の設定で個別に制御します（例: クラウドタスクのインターネットアクセスは既定でオフ）。

### 5.4 Human-in-the-loop（HITL）- 人間の役割は縮小しない

- 委譲パターン: **Delegate**（エージェントが先に動く）→ **Review**（あなたが確認する）→ **Own**（重要な決定の責任はあなたにある）。
- **レビューは作業の一部** です: 見えるステップ、使用したソース、ツール操作、結果を点検します。流暢で自信満々な文章は、成功の証明にはなりません。
- レビューの深さは **影響の大きさに比例** させます（他者に影響する、ロールバックが難しい → より深くレビューする）。
- 重要: **指示を変えても、実行済みのアクションは取り消されません** - エージェントが外部システムを更新したと言ったら、そのシステムの中で結果を確認してください。
- レビューの自動化: 公式ドキュメントには **auto-review**（`approvals_reviewer = "auto_review"`。レビューエージェントが対象のプロンプトを承認する）と CLI の `--approve-for-me`（承認リクエストを自動レビューへ振り分ける）があります - **しかし親会社ガイドは承認の代行を禁止しています。承認画面は常に責任者が確認します。本運用では両方ともオフのままです。**
- 問題が起きたとき: **Redirect**（絞った修正指示を出す）または **Pause**（停止して判断する）。エージェントを停止しても、すでに実行された内容の後始末は別です。

📚 参考: [Sandbox](https://learn.chatgpt.com/docs/sandboxing) · [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security) · [Working with agents](https://learn.chatgpt.com/docs/working-with-agents) · [Permissions](https://learn.chatgpt.com/docs/permission-modes) · [Auto-review](https://learn.chatgpt.com/docs/sandboxing/auto-review) · [Windows sandbox](https://learn.chatgpt.com/docs/windows/windows-sandbox)

---

## 6. AGENTS.md、ルール、チーム設定

### 6.1 AGENTS.md とは？

**AGENTS.md** は、リポジトリ内に**エージェントへの指示**を書くためのオープンスタンダード形式です（OpenAI が Amp、Jules/Google、Cursor、Factory などのベンダーと共同で開始し、現在は Linux Foundation 傘下の Agentic AI Foundation が管理しています）。Codex は**毎回の実行前に** AGENTS.md を読み込み、~/.codex → リポジトリのルート → サブディレクトリというチェーンを構成します（作業ディレクトリに近いファイルほど、上位の指示を**上書き**します）。既定の上限は **~32 KiB**（`project_doc_max_bytes`）です。

プロジェクトの AGENTS.md に書くこと：
- リポジトリ構成、build/test/lint コマンド、コーディング規約、PR ルール。
- **境界線**：変更してはならないこと（既存のマイグレーションを編集しない、公開 API を変更しない、シークレットをコミットしない等）と、確認を求めるタイミング。
- タスク種別ごとの完了の定義（definition of done）。
- Codex の GitHub レビューをカスタマイズするための `## Code Review Rules` セクション。

**良い習慣：** `/init` でひな形を作る。**Codex が同じミスを繰り返したら必ず AGENTS.md を更新する**（レトロスペクティブを実施する）。ファイルは短く・具体的に保ち、汎用的にしない。多くの指示が必要な場合は、1 つの巨大ファイルにせず、小さなファイルに分割して相互にリンクする。

### 6.2 ルールファイル（`agent-configuration/rules`）

ルールファイルは、サンドボックス外で実行するコマンドのうち、どれが**許可 / 要確認 / 禁止**に該当するかを宣言します。同じ安全なコマンドを繰り返し手動承認するのを避けつつ、すべてを一括で解禁しないための仕組みです。この機能は**実験的（experimental）**です。

- アクティブな config レイヤーの `rules/` ディレクトリに `.rules` ファイルを作成します（例：`~/.codex/rules/default.rules`）。プロジェクトローカルの `<repo>/.codex/rules/` は、プロジェクトレイヤーが**信頼済み（trusted）**のときにのみ読み込まれます。
- 構文：`prefix_rule(pattern = ["gh", "pr", "view"], decision = "prompt" | "allow" | "forbidden", justification = "...")` - `pattern` はコマンドの接頭辞に一致します。
- 複数のルールが 1 つのコマンドに一致した場合、Codex は**最も厳しい判定を適用します：`forbidden` > `prompt` > `allow`**。
- `match` / `not_match` はインラインの「ユニットテスト」です。ルールの読み込み時にサンプルコマンドが検証されるため、誤ったルールを書くのを防げます。
- 複合コマンド（`bash -lc "a && b"`）は、スクリプトが安全に静的な文字列（単純な語 + `&&`/`||`/`;`/`|` 演算子）である場合に限り、tree-sitter によって分割されます。スクリプトに変数、リダイレクト、置換、ワイルドカード等が使われている場合、Codex は**分割しません**。呼び出し全体が 1 つのコマンド（`["bash","-lc","<script>"]`）として扱われ、ルールはその呼び出し全体に適用されます（保守的な動作：動的スクリプトの中に隠れたコマンドに権限は付与されません）。
- TUI で **allow** をクリックすると、Codex は `prefix_rule` を `~/.codex/rules/default.rules` に書き込み、次回から再質問しなくなります。レビュアーはこのファイルをコードと同じようにレビューできます。**ポリシー（親会社ガイド）：恒久的な「always allow（常に許可）」は、安全な読み取り専用操作だけに限定します。外部送信・削除・認証・Drive 系連携には決して付与しません。**

### 6.3 `config.toml` の設定（ユーザー/プロジェクト）

- ユーザーレベルの `~/.codex/config.toml`：既定のモデル、reasoning effort、サンドボックス/承認、タスク種別ごとの **profiles**。
- リポジトリレベルの `.codex/config.toml`（プロジェクトが信頼済みの場合のみ）：プロジェクト固有の設定。
- **MCP**：仕組み自体はドキュメントどおりです（`codex mcp add ...`、`[mcp_servers]` テーブル）。ただし、まずポリシー（親会社ガイド）が優先：**未承認のプラグイン / MCP サーバー / 外部サービス連携は接続してはなりません。** 新しい MCP サーバーは、**AI推進室で確認された後に限って**許可されます。**Google 系 MCP（Google Drive を含む）は全面禁止です**：Drive には認証情報、応募者の個人情報、契約書が含まれている可能性があります。Google 系 MCP の接続を承認画面で求められた場合は、**拒否して報告してください**。
- **サブエージェント**：複雑な実行を分割するのに役立ちます。
- **メモリ（Memories）**：既定はオフ。必要なときに有効化します。AGENTS.md を**置き換えるものではありません**。
- 忘れないこと：**チームの拘束力のあるルールは、リポジトリ内の AGENTS.md やドキュメントに置きます**（コミット済みでレビュー可能）。個人のメモリには置きません。

### 6.4 スキル（再利用可能なパッケージ済みワークフロー）

- スキル = **SKILL.md**（メタデータ + 指示）と、任意のスクリプト/アセットを含むフォルダーです。Codex はスキルが選ばれたときに SKILL.md だけを読み込みます（コンテキスト消費が少なくて済みます）。
- 配置場所：**個人用** = `~/.agents/skills`。**チーム共有** = リポジトリの `.agents/skills/` にコミットします。
- ひな形作成には **`$skill-creator`** スキルを使うと早く始められます。最初のバージョンはローカルで育て、準備ができたらリポジトリで共有します。
- 参照ハブ/発見：**skills.sh**（「The Agent Skills Directory」- 著名な GitHub リポジトリからスキルを収集）。加えて、AI エージェントのリリースノートやドキュメントを追い、新しいスキルを見逃さないようにします。
- サードパーティのスキルは、**PR と同じようにレビューします**。チーム全体に導入する前に、SKILL.md を通読し、実行されるコマンドと使用するデータソースを確認します。 **PR 方式のレビューは技術的なステップであって承認ではありません: 親会社ガイドにより未承認のものは接続しません: チーム向けのサードパーティ skill/plugin の導入はまず AI推進室（Kido）の承認が必要で、リードによる SKILL.md レビューはその前の技術チェックです。**

📚 参考: [AGENTS.md (Codex)](https://learn.chatgpt.com/docs/agent-configuration/agents-md) ・ [agents.md (open standard)](https://agents.md) ・ [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules) ・ [Config reference](https://learn.chatgpt.com/docs/config-file/config-reference) ・ [MCP](https://learn.chatgpt.com/docs/extend/mcp) ・ [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents) ・ [Customization overview (skills)](https://learn.chatgpt.com/docs/customization/overview) ・ [skills.sh](https://skills.sh) ・ [openai/codex (GitHub)](https://github.com/openai/codex)

---

## 7. フェーズごとの標準ワークフロー

公式の「Building an AI-Native Engineering Team」ガイドは、SDLC を **Delegate / Review / Own**（委譲 / レビュー / 責任を負う）のモデルでフェーズに分けています。チームではこれを次のように適用します：

| フェーズ | エージェントが主導（Delegate） | 人間が担う（Review/Own） |
|---|---|---|
| **計画 / 要件分析** | エージェントは仕様を読み、コードベースと突き合わせ、あいまいな点を指摘し、サブタスクに分解し、難易度を見積もる | ストーリーポイントの見積もり、優先度/順序の決定 - **プロダクトの意思決定は人間が行う** |
| **設計** | ひな形（ボイラープレート）の生成、画像/figma からのプロトタイピング、デザイン → コンポーネントへのマッピング | アーキテクチャ、パターン、品質 + アクセシビリティ、UX の方向性 |
| **実装** | 仕様どおりに機能をエンドツーエンドで実装（データモデル、API、UI、テスト、PR 説明） | 重要なアーキテクチャ/パフォーマンス経路のレビュー、コードベースのパターンの維持 |
| **コードレビュー** | ローカルの `/review`、GitHub の `@codex review`、自動 PR レビュー、セキュリティレビュー（これらはコメントを書くだけで、承認/マージはしません） | 差分を読み、マージを判断する。Codex のコメントは提案であり、裁定ではない。すべての PR は人間がレビューしてマージします（親会社ガイド） |
| **テスト / 受け入れ** | テストを作成し、標準パイプライン（`lint`、最小限の関連テストスイート）を実行し、修正後に再実行する | ビジネス受け入れ、プロダクトのエッジケース |
| **保守 / ドキュメント** | 差分から README、CHANGELOG、ADR を作成/更新し、ドキュメントのリンクを確認する | ドキュメント標準の管理。重要な情報の検証 |

**すべてのコードタスクに共通する標準フロー「plan → implement → verify」（計画 → 実装 → 検証）：**

1. **コンテキストを宣言する:** AGENTS.md + `@-mention` でのファイル指定 + 対象の仕様/issue。
2. **`/plan` から始める**（複数ステップの作業の場合）。プランをレビューして確定する（マイルストーン、ロールバック戦略）。
3. **実装を委譲する。** セッションを停止させる代わりに、steer/queue を使って実行中に軌道修正する。
4. **検証する:** 再現手順の実行、lint + 最小限の関連テスト、`/review`。冒頭で宣言した「完了」と突き合わせる。
5. **前後で Git チェックポイント**を取る（きれいなコミット）。並列で実行するときは worktree を使う。
6. **教訓を AGENTS.md に還元する**（Codex に同じミスを繰り返させない）。
7. **Work/Cloud のコストに注意する:** クラウド実行はより多く消費します - 価値と見合うかで判断する。

📚 参考: [Building an AI-Native Engineering Team](https://learn.chatgpt.com/guides/build-ai-native-engineering-team) ・ [Best practices (Codex)](https://learn.chatgpt.com/guides/best-practices) ・ [Code review](https://learn.chatgpt.com/docs/code-review) ・ [Review GitHub PRs with Codex](https://learn.chatgpt.com/docs/third-party/github) ・ [Codex GitHub Action](https://learn.chatgpt.com/docs/github-action)

---

## 8. コスト管理と利用制限

- **プランに含まれるもの：** Plus は $20/month。Pro は $100 から（tier は $100/$200/$500）。Business は $20/user/month（年払い。月払いの場合は $25、最低 2 ユーザー）。Codex はこれらのプランに含まれます。クラウドタスクはローカルのメッセージより多くの利用枠を**消費することがあります**（モデルとタスク次第）。ローカルとクラウドは**プランのクォータを共有**します。
- **5 時間ウィンドウの制限**（ローカル作業向け。Pro には現在、5 時間上限はありません。週次の上限が適用される場合もあります）。Codex / ChatGPT Work / ChatGPT for Excel... にまたがって共有される使用量は、**同一のエージェント系クォータから消費**されます。
- 5 時間ウィンドウあたりの概算メッセージ数（Plus、Standard Business）：GPT-6 Luna が最多（~350-3,000）、GPT-6.1 Terra ~35-285、GPT-6.1 Sol ~15-160、GPT-6 Astra ~5-45。水準はモデルや複雑さごとに変わります：**プロンプトの長さ、コンテキスト、推論、ツール使用、検索、キャッシング**のすべてが影響し、「短いプロンプト」が必ずしも安いとは限りません。
- **クレジット：** 上限に達したら、クレジットを購入して続行します（Plus/Pro/Business ワークスペース）。レートはモデルと速度に応じて 1M トークンあたりで課金されます（Fast/Ultrafast は x2-x8 の倍率がかかります）。
- **使用量の確認：** `chatgpt.com/codex/settings/usage` または Codex CLI の `/status`。
- **節約のヒント：**
  - フェーズごとのモデル戦略：「考える」仕事（分析、plan/仕様の作成、ドキュメント作成、ブレインストーミング、複雑なレビュー）には強力な推論モデル（high effort）。「やる」仕事（すでに明確な仕様がある小さなリファクタリング、繰り返しのテスト、フォーマット調整）には軽量/高速モデル + 低 effort。モデル選択、コンテキスト、推論のいずれも使用量に影響します。
  - モデルを適正サイズにする（model-selection ガイド）。小さなタスク → 軽量モデル/低 effort（Low）。Medium/High/Extra High は複雑な仕事だけに。
  - 必要なのが一部だけなら、巨大なファイルをプロンプトに詰め込まない（該当部分だけ添付する）。
  - Web 検索モードは `cached`/`indexed` を既定に。`live` は最新情報が本当に必要なときだけ使う。
  - 安定した定常作業 → 自動化をスケジュール登録して**時間を節約し、プロセスを一貫させる**（注意：自動実行も**手動実行と同じように使用量としてカウント**されます。クォータは減りません）。 自動化は read-only で実行します; 使用しません - §5.2 のとおり、無人モードは read-only のみ（承認画面が出ないため委譲も発生しません）。無人の書き込み/ネットワーク実行は使いません。
- **`danger-full-access` は開放しません - 親会社ガイドにより全員禁止です（コンテナ内の例外もありません）。** より広い到達範囲は `workspace-write` + 承認済み内部ドメインの許可リストで実現し、Web 検索は既定で `cached`/`indexed` を維持します（ドキュメントの注記: フルアクセスにすると検索は黙って `live` に切り替わり、プロンプトインジェクションのリスクが上がります - オフにしておくもう一つの理由）。

📚 参考: [Pricing (ChatGPT Learn)](https://learn.chatgpt.com/docs/pricing) ・ [Help: using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan) ・ [Model selection](https://learn.chatgpt.com/docs/model-selection) ・ [Feature maturity](https://learn.chatgpt.com/docs/feature-maturity)

---

## 9. よくあるミスとその回避方法

| # | よくあるミス | 結果 | 回避方法 |
|---|---|---|---|
| 1 | シークレット/認証情報をプロンプトに貼る | シークレットがログ/クラウドシステムに残り、漏洩リスク | 絶対に貼らない。貼った場合：停止 → 証拠の保全 → リード/IT セキュリティへの報告 → キーの失効 + ローテーション |
| 2 | 文脈のないスタブプロンプト | 当てずっぽう、誤った修正 | Goal/Context/Output/Boundaries。ファイルは @-mention で指定 |
| 3 | エージェントの出力を盲信する | 壊れたロジック、セキュリティホール | 必ず検証する：テスト + lint + レビュー + 再現確認。「流暢 ≠ 正確」 |
| 4 | 利便性のために `--yolo`/フルアクセスを有効にする | マシン全体のリスク。公式には「非推奨」 | Auto プリセットに変更。フルアクセスは全面的に禁止 (親会社ガイド) - コンテナ内でも不可 |
| 5 | ネットワークを既定で有効にする | 管理されていない外向きアクセス（exfil、未知の API） | 既定はオフ。必要なときだけ許可リスト（allowlist）で有効化 |
| 6 | 信頼できないコンテンツ（web/PR/顧客ファイル）を高権限でエージェントに実行させる | プロンプトインジェクション → 意図しないアクション | 厳格なサンドボックス。on-request の承認。`cached`/`indexed` 検索を優先 |
| 7 | 巨大で曖昧な 1 つの AGENTS.md | エージェントが指示を無視。32KiB の上限を超過 | 短く具体的に、ファイルを分割する。ミスが繰り返されたら更新 |
| 8 | 「チームのルール」をメモリに保存する | 他のマシン/リセット後には失われる | ルールはリポジトリ内の `AGENTS.md`/docs に置く |
| 9 | エージェント実行前に Git チェックポイントを取らない | 編集が失敗したときにロールバックできない | 先にクリーンなコミット/stash。承認後にチェックポイント |
| 10 | Work/Cloud タスクにスコープ/時間の制限がない | 利用枠の浪費、長時間稼働するエージェント | 「いつ止めるか」を明示し、スコープを明確にし、`/status` の使用量ダッシュボードを注視する |
| 11 | モデルが出したリンク/数値/引用を確認せずに信頼する | 誤った事実情報、切れた参照 | 使用前にリンク/数値をふるいにかける（このクイズと同じ方法） |
| 12 | 機密プロジェクトに個人 Plus アカウントを使う | トレーニング許諾済みシステムに Business のデータ | Business ワークスペース。正しいデータコントロール |
| 13 | 小さなタスクに Work/Cloud を使う | クレジットの浪費。待ち時間 | 通常の Chat で十分。Work は複数ステップの成果物だけに |
| 14 | 複数ステップの作業で plan モードを省略する | エージェントが独りで誤った方向へ進む | 実装前に `/plan`（Plan モード） |
| 15 | 「エージェント」が必要な場面で「チャット + ツール」と混同する | 「完了」/レビューの位置づけが未定義 | 引き渡し前に 3 つの自己チェック質問（§1） |

📚 参考: [Working with agents](https://learn.chatgpt.com/docs/working-with-agents) ・ [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security) ・ [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) ・ [OWASP LLM Top 10](https://genai.owasp.org/llm-top-10/) ・ [Build AI-Native Team](https://learn.chatgpt.com/guides/build-ai-native-engineering-team)

---

## 10. 毎日のクイックチェックリスト

**個人：**
- [ ] 適切な Business ワークスペースにいて、この作業に適したプロジェクトか？
- [ ] プロンプトに Goal/Context/Output/Boundaries があるか？「完了」と検証方法を明示しているか？（Codex タスクでは 4 点宣言 - 対象 / 作業 / 禁止 / 実行前確認 - も含めます）
- [ ] プロンプト、ファイル、AGENTS.md、プロジェクトにシークレット/PII が含まれていないか？
- [ ] タスク種別に合わせてサンドボックス/承認を設定したか（yolo は使わない）？
- [ ] 使用前に、結果が test/lint/review + 事実確認を通過しているか？
- [ ] エージェントが繰り返したミスを AGENTS.md に記録したか？
- [ ] 大きな仕事の引き渡し前に使用量を確認したか（`/status` または chatgpt.com/codex/settings/usage）？

**リード/管理者：**
- [ ] プロジェクトの AGENTS.md を新しい規約で更新したか。`## Code Review Rules` セクションは現行のまま有効か？
- [ ] 管理コンソール：プラグイン/スキル/メンバーシップのスコープは適切か。必要に応じて監査ログ + 分析を確認したか？
- [ ] 未承認の MCP/plugin/外部連携が残っていないか。新しい MCP server には AI推進室の承認記録があるか。残存接続/権限は定期的に確認するか？
- [ ] 未承認の MCP/プラグイン/外部連携を接続していないか。新しい MCP サーバーにはすべて AI推進室の承認記録があるか？残存する接続/権限を定期的にレビューしているか？
- [ ] 実システムへの操作（送信/公開/デプロイ）に関する「実行前に確認」の要件をレビューしたか？
- [ ] オンボーディング：メンバー全員が、プロジェクトで ChatGPT/Codex を使う前にこのファイルを読み、クイズを完了しているか？

---

## 11. クイックリファレンス（チートシート）

```text
# 利用面の選び方
質問 / 短い下書き                   -> Chat
複数ステップ + 複数ファイル/ソース  -> ChatGPT Work
コードベースの作業                  -> Codex (ファイルを開いているなら IDE、シェル/スクリプトが必要なら CLI、
                                       並列実行 / PR の引き渡しなら Cloud)

# プロンプト (4 部構成)
Goal / Context @file / Output format / Boundaries + "いつ完了か"すべての Codex タスク: 対象 / 作業 / 禁止 / 実行前確認 (親会社ガイド)
複数ステップのタスク                -> まず /plan。長期のゴールは /goal
エージェントの実行中                -> Codex CLI: Enter = steer, Tab = queue
出典が必要                          -> web search + 出典の提示を要求

# サンドボックス / 承認
read-only + on-request              -> 分析用、編集なし
workspace-write + on-request (Auto) -> リポジトリの既定
codex exec --sandbox read-only --ask-for-approval never -> CI
--yolo / danger-full-access         -> 全面禁止 (親会社ガイド) - 全員対象
承認を代行 (auto_review / --approve-for-me) -> 禁止。承認画面は必ず本人が確認する
network_access = true               -> 必要なときだけ + ドメイン許可リスト

# 安全性
絶対に禁止: シークレット、.env、秘密鍵、顧客 PII、未承認の機密ソース
貼った場合:  停止 -> 証拠の保全 (自分で削除しない) -> リード/IT に報告 -> 失効 + ローテーション
ブラウザ/コンピュータの自動化 -> 業務操作では禁止 (人間が行う)
疑わしい時: プロンプトインジェクション -> 停止 + 入力ソースの確認

# 使用前に確認済みのリンク (公式ソース)
https://learn.chatgpt.com/llms.txt          -> 全ドキュメントのインデックス (.md をそのまま取得可)
https://learn.chatgpt.com/docs/whats-new    -> 週次の更新情報
https://academy.openai.com                      -> 公式コース
```

---

## 12. 参考文献

**公式ドキュメント - ChatGPT Learn / Codex（learn.chatgpt.com と developers.openai.com）：**
- 全ドキュメントのインデックス（.md をそのまま取得可）：https://learn.chatgpt.com/llms.txt ・単一ファイルへの書き出し：https://learn.chatgpt.com/docs/llms-full.txt
- 基礎: [Use ChatGPT](https://learn.chatgpt.com/docs/use-chatgpt) ・ [Prompting](https://learn.chatgpt.com/docs/prompting) ・ [Working with agents](https://learn.chatgpt.com/docs/working-with-agents) ・ [Model selection](https://learn.chatgpt.com/docs/model-selection) ・ [Personalize](https://learn.chatgpt.com/docs/personalize)
- セキュリティ/運用: [Sandbox](https://learn.chatgpt.com/docs/sandboxing) ・ [Permissions](https://learn.chatgpt.com/docs/permissions) ・ [Permission modes](https://learn.chatgpt.com/docs/permission-modes) ・ [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security) ・ [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules) ・ [Security administration](https://learn.chatgpt.com/docs/security-administration)
- チームとフロー: [Best practices](https://learn.chatgpt.com/guides/best-practices) ・ [AI-Native Engineering Team](https://learn.chatgpt.com/guides/build-ai-native-engineering-team) ・ [Get started with ChatGPT Work](https://learn.chatgpt.com/docs/get-started-with-work) ・ [Projects](https://learn.chatgpt.com/docs/projects) ・ [Long-running work](https://learn.chatgpt.com/docs/long-running-work)
- 設定/開発: [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) ・ [Config reference](https://learn.chatgpt.com/docs/config-file/config-reference) ・ [Authentication](https://learn.chatgpt.com/docs/auth) ・ [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode) ・ [MCP](https://learn.chatgpt.com/docs/extend/mcp) ・ [Customization overview (skills)](https://learn.chatgpt.com/docs/customization/overview) ・ [Glossary](https://learn.chatgpt.com/docs/glossary)
- 更新情報: [What's new](https://learn.chatgpt.com/docs/whats-new) ・ [Changelog](https://learn.chatgpt.com/docs/changelog) ・ [Feature maturity](https://learn.chatgpt.com/docs/feature-maturity)

**ヘルプセンター/ポリシー（以下の各リンクは 2026-11-12 にエージェントが直接開いて読み込み済み。openai.com と help.openai.com はスクリプト系クライアントをブロックします - 403 - そのため簡易チェックで 403 が出るのは正常です）：**
- [Data controls in ChatGPT](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt) - トレーニングの切り替えとその例外
- [Temporary chat in ChatGPT](https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt)
- [Memory in ChatGPT](https://help.openai.com/en/articles/8590148-memory-in-chatgpt)
- [Projects in ChatGPT](https://help.openai.com/en/articles/10169521-projects-in-chatgpt)
- [GPTs in ChatGPT](https://help.openai.com/en/articles/8554407-gpts-in-chatgpt)
- [ChatGPT agent](https://help.openai.com/en/articles/11752874-chatgpt-agent)
- [Admin controls, security & compliance for plugins and apps](https://help.openai.com/en/articles/11509118-admin-controls-security-and-compliance-for-plugins-and-apps)
- [ChatGPT Atlas retirement](https://help.openai.com/en/articles/20001371-chatgpt-atlas-retirement)
- [Setting up SSO for ChatGPT Business](https://help.openai.com/en/articles/11489188-setting-up-single-sign-on-sso-for-chatgpt-business)
- [Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)
- [Chat and file retention policies](https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt) *(公式ドキュメント内で引用)*
- [Data residency and inference residency](https://help.openai.com/en/articles/9903489-data-residency-and-inference-residency-for-chatgpt) *(公式ドキュメント内で引用)*
- [Enterprise privacy](https://openai.com/enterprise-privacy/)
- [Usage Policies (universal)](https://openai.com/policies/usage-policies)
- [Your data - OpenAI API docs](https://developers.openai.com/api/docs/guides/your-data)
- [Data residency expansion (announcement)](https://openai.com/index/expanding-data-residency-access-to-business-customers-worldwide)

**OpenAI Platform（API ドキュメント）：**
- [Prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering) ・ [Safety best practices](https://platform.openai.com/docs/guides/safety-best-practices) ・ [Prompt caching](https://platform.openai.com/docs/guides/prompt-caching) ・ [Production best practices](https://platform.openai.com/docs/guides/production-best-practices) ・ [Models](https://platform.openai.com/docs/models) ・ [API Reference](https://platform.openai.com/docs/api-reference)

**社内（親会社）：**
- Codex アプリ安全利用ガイド **`Codexアプリ安全利用ガイド-2.pdf`**（このリポジトリ内、9 つのルール）：着手前の禁止事項（Google Drive/Google 系 MCP、認証情報/PII）、データ最小化、権限/連携の確認（「ask-for-approval」を標準とする + フルアクセス禁止 + 承認を代行させない + ブラウザ自動化の禁止）、ドキュメント内の指示には従わない（プロンプトインジェクション）、依頼の具体化（対象/作業/禁止事項/確認事項）、取り返しのつかない操作は一覧を先に、承認画面は必ず確認（「always allow」は読み取り専用のみ）、結果/セッションは人間が管理、停止して報告するインシデントフロー（停止 → 保全 → 報告 → 無効化）+ 作業前チェックリスト + 利用ログの記録。

**その他：**
- [openai/codex (GitHub)](https://github.com/openai/codex) ・ [agents.md](https://agents.md) ・ [skills.sh - The Agent Skills Directory](https://skills.sh) ・ [OpenAI Academy](https://academy.openai.com) ・ [A practical guide to building agents (PDF)](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)
- AI セキュリティ: [OWASP GenAI - LLM Top 10 for 2025](https://genai.owasp.org/llm-top-10/)

**研究論文（arXiv/ACM）：**
- [Chain-of-Thought Prompting Elicits Reasoning in LLMs](https://arxiv.org/abs/2201.11903) - Wei et al. (2022, Google)
- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629) - Yao et al. (2022, Princeton/Google)
- [Principled Instructions Are All You Need... ("Prompt principles", 26 principles)](https://arxiv.org/abs/2312.16171) - Bsharat et al. (2023)
- [The Prompt Report: A Systematic Survey of Prompt Engineering Techniques](https://arxiv.org/abs/2406.06608) - Schulhoff et al. (2024)
- [Why Language Models Hallucinate](https://arxiv.org/abs/2509.04664) - Kalai, Nachum, Vempala, Zhang (OpenAI, 2025) + [openai.com/index/why-language-models-hallucinate](https://openai.com/index/why-language-models-hallucinate/)
- [Evaluating Large Language Models Trained on Code (HumanEval)](https://arxiv.org/abs/2107.03374) - Chen et al. (OpenAI, 2021)
- [Why Johnny Can't Prompt: How Non-AI Experts Try (and Fail) to Design LLM Prompts](https://doi.org/10.1145/3544548.3581388) - CHI '23 (ACM)

> **チーム独自の「リンクを勝手に作らない」ルール：** このファイル内のすべてのリンクは、2026-11-12 に（公式ツール経由または URL 単位でのエージェントによる直接検証で）開封/HTTP チェック済みです。help.openai.com の URL はボットをブロックします（403）が、2026-11-12 にダウンロードした公式の OpenAI ドキュメントに**そのまま（verbatim）**引用されているため、引き続き検証済みとみなします。このファイルに新しいリンクを追加するときは、追加した本人がコミット前に必ず開いて確認しなければなりません。

---

*以上で終わりです。次は、ブラウザで **`quiz/QUIZ-OPENAI-RULES.html`** を開き、40問のクイズに答えて理解度を確認しましょう。*
