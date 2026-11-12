/* Diagrams: inline SVG minh họa cho quiz. Nhãn tiếng Anh trung lập, hiển thị cho cả vi/ja. */
window.QUIZ_DIAGRAMS = {
  "sandbox": '<svg viewBox="0 0 880 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="3 sandbox modes">' +
    '<text x="20" y="24" font-family="Segoe UI,Arial,sans-serif" font-size="13" fill="#7e93a9">tighter, safer  -&gt;  looser, faster</text>' +
    '<rect x="20" y="40" width="264" height="152" rx="12" fill="#e8f5ee" stroke="#1a7f4b"/>' +
    '<text x="152" y="74" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="20" fill="#1a7f4b" font-weight="700">&#128065; read-only</text>' +
    '<text x="152" y="102" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="13" fill="#273340">read files only</text>' +
    '<text x="152" y="122" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="13" fill="#273340">no writes, no network</text>' +
    '<rect x="40" y="150" width="224" height="24" rx="12" fill="#ffffff" stroke="#1a7f4b"/><text x="152" y="167" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#1a7f4b">default for codex exec (CI)</text>' +
    '<rect x="316" y="40" width="264" height="152" rx="12" fill="#edf3fd" stroke="#2457d5"/>' +
    '<text x="448" y="74" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="20" fill="#2457d5" font-weight="700">&#9999; workspace-write</text>' +
    '<text x="448" y="102" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="13" fill="#273340">edit + run commands in workspace</text>' +
    '<text x="448" y="122" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="13" fill="#273340">network OFF by default</text>' +
    '<rect x="336" y="150" width="224" height="24" rx="12" fill="#ffffff" stroke="#2457d5"/><text x="448" y="167" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#2457d5">Auto preset in git repos</text>' +
    '<rect x="612" y="40" width="264" height="152" rx="12" fill="#fdeceb" stroke="#c0392b"/>' +
    '<text x="744" y="74" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="20" fill="#c0392b" font-weight="700">&#9888; danger-full-access</text>' +
    '<text x="744" y="102" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="13" fill="#273340">no sandbox, no approvals</text>' +
    '<text x="744" y="122" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="13" fill="#273340">--yolo: container only</text>' +
    '<rect x="632" y="150" width="224" height="24" rx="12" fill="#ffffff" stroke="#c0392b"/><text x="744" y="167" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#c0392b">Elevated risk - not recommended</text>' +
    '<text x="20" y="230" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#7e93a9">Start tight. Loosen only when the project, files and commands are trusted.</text>' +
    '<line x1="60" y1="216" x2="820" y2="216" stroke="#d7dee8" stroke-width="2"/>' +
    '<line x1="20" y1="40" x2="20" y2="192" stroke="#d7dee8" stroke-width="2"/>' +
    '</svg>',

  "paths": '<svg viewBox="0 0 880 224" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="protected paths">' +
    '<rect x="20" y="34" width="840" height="140" rx="12" fill="#f6f8fb" stroke="#d7dee8"/>' +
    '<text x="36" y="60" font-family="Segoe UI,Arial,sans-serif" font-size="14" fill="#273340" font-weight="700">workspace-write sandbox</text>' +
    '<text x="36" y="80" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#7e93a9">writable roots - protected (read-only, recursive):</text>' +
    '<rect x="36" y="94" width="88" height="34" rx="8" fill="#e8f5ee" stroke="#1a7f4b"/><text x="80" y="116" text-anchor="middle" font-family="Consolas,monospace" font-size="13" fill="#1a7f4b">.git &#128274;</text>' +
    '<rect x="136" y="94" width="96" height="34" rx="8" fill="#e8f5ee" stroke="#1a7f4b"/><text x="184" y="116" text-anchor="middle" font-family="Consolas,monospace" font-size="13" fill="#1a7f4b">.agents &#128274;</text>' +
    '<rect x="244" y="94" width="92" height="34" rx="8" fill="#e8f5ee" stroke="#1a7f4b"/><text x="290" y="116" text-anchor="middle" font-family="Consolas,monospace" font-size="13" fill="#1a7f4b">.codex &#128274;</text>' +
    '<rect x="348" y="94" width="80" height="34" rx="8" fill="#e8f5ee" stroke="#1a7f4b"/><text x="388" y="116" text-anchor="middle" font-family="Consolas,monospace" font-size="13" fill="#1a7f4b">.aws &#128274;</text>' +
    '<text x="470" y="80" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#7e93a9">editable:</text>' +
    '<rect x="470" y="94" width="80" height="34" rx="8" fill="#edf3fd" stroke="#2457d5"/><text x="510" y="116" text-anchor="middle" font-family="Consolas,monospace" font-size="13" fill="#2457d5">src/</text>' +
    '<rect x="562" y="94" width="92" height="34" rx="8" fill="#edf3fd" stroke="#2457d5"/><text x="608" y="116" text-anchor="middle" font-family="Consolas,monospace" font-size="13" fill="#2457d5">tests/</text>' +
    '<rect x="666" y="94" width="150" height="34" rx="8" fill="#eef2f7" stroke="#9aa7b5"/><text x="741" y="116" text-anchor="middle" font-family="Consolas,monospace" font-size="13" fill="#6b7a8d">node_modules/</text>' +
    '<text x="20" y="200" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#7e93a9">Agent config, git history and cloud credentials stay locked. Everything else in the workspace is editable.</text>' +
    '</svg>',

  "auth": '<svg viewBox="0 0 880 232" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="two ways to sign in">' +
    '<rect x="330" y="18" width="220" height="48" rx="12" fill="#2457d5"/><text x="440" y="48" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="16" fill="#ffffff" font-weight="700">Sign in to Codex</text>' +
    '<path d="M440 66 L230 106" stroke="#94a3b8" stroke-width="2" fill="none"/>' +
    '<path d="M440 66 L650 106" stroke="#94a3b8" stroke-width="2" fill="none"/>' +
    '<rect x="20" y="106" width="400" height="108" rx="12" fill="#edf3fd" stroke="#2457d5"/>' +
    '<text x="220" y="134" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="15" fill="#2457d5" font-weight="700">Sign in with ChatGPT</text>' +
    '<text x="220" y="158" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12.5" fill="#273340">usage follows your ChatGPT plan (Plus/Pro/Business)</text>' +
    '<text x="220" y="178" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12.5" fill="#273340">required for Codex Cloud tasks</text>' +
    '<text x="220" y="198" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12.5" fill="#1a7f4b">only way to enable Work-Cloud local access</text>' +
    '<rect x="460" y="106" width="400" height="108" rx="12" fill="#fdf3e2" stroke="#b7791f"/>' +
    '<text x="660" y="134" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="15" fill="#b7791f" font-weight="700">Sign in with an API key</text>' +
    '<text x="660" y="158" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12.5" fill="#273340">usage-based, billed via Platform account (API rates)</text>' +
    '<text x="660" y="178" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12.5" fill="#273340">CODEX_API_KEY: the natural default for CI</text>' +
    '<text x="660" y="198" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12.5" fill="#c0392b">does NOT enable Work-Cloud local access</text>' +
    '</svg>',

  "flowreq": '<svg viewBox="0 0 880 208" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="requirement flow">' +
    '<rect x="20" y="50" width="180" height="72" rx="12" fill="#fdeceb" stroke="#c0392b"/>' +
    '<text x="110" y="82" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="14" fill="#c0392b" font-weight="700">vague requirement</text>' +
    '<text x="110" y="104" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#273340">multi-module feature</text>' +
    '<path d="M200 86 L236 86" stroke="#94a3b8" stroke-width="2"/><path d="M230 80 L236 86 L230 92" fill="#94a3b8"/>' +
    '<rect x="238" y="50" width="200" height="72" rx="12" fill="#edf3fd" stroke="#2457d5"/>' +
    '<text x="338" y="82" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="14" fill="#2457d5" font-weight="700">/plan</text>' +
    '<text x="338" y="104" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#273340">survey codebase + interview you</text>' +
    '<path d="M438 86 L474 86" stroke="#94a3b8" stroke-width="2"/><path d="M468 80 L474 86 L468 92" fill="#94a3b8"/>' +
    '<rect x="476" y="50" width="200" height="72" rx="12" fill="#efeaf8" stroke="#7c3aed"/>' +
    '<text x="576" y="82" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="14" fill="#7c3aed" font-weight="700">goal / spec</text>' +
    '<text x="576" y="104" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#273340">outcome - constraints - verification</text>' +
    '<path d="M676 86 L712 86" stroke="#94a3b8" stroke-width="2"/><path d="M706 80 L712 86 L706 92" fill="#94a3b8"/>' +
    '<rect x="714" y="50" width="146" height="72" rx="12" fill="#e8f5ee" stroke="#1a7f4b"/>' +
    '<text x="787" y="82" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="14" fill="#1a7f4b" font-weight="700">implement</text>' +
    '<text x="787" y="104" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#273340">small chunks + tests</text>' +
    '<text x="440" y="192" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#7e93a9">Ask first, code later: the interview turns unclear requirements into measurable criteria.</text>' +
    '</svg>',

  "flow": '<svg viewBox="0 0 880 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="plan to PR loop">' +
    '<rect x="20" y="46" width="126" height="88" rx="12" fill="#edf3fd" stroke="#2457d5"/>' +
    '<text x="83" y="78" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="15" fill="#2457d5" font-weight="700">1. plan</text>' +
    '<text x="83" y="100" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="11.5" fill="#273340">break work into</text>' +
    '<text x="83" y="116" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="11.5" fill="#273340">small chunks</text>' +
    '<rect x="174" y="46" width="126" height="88" rx="12" fill="#efeaf8" stroke="#7c3aed"/>' +
    '<text x="237" y="78" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="15" fill="#7c3aed" font-weight="700">2. spec</text>' +
    '<text x="237" y="100" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="11.5" fill="#273340">outcome, constraints,</text>' +
    '<text x="237" y="116" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="11.5" fill="#273340">build/test commands</text>' +
    '<rect x="328" y="46" width="126" height="88" rx="12" fill="#e0f2fe" stroke="#0284c7"/>' +
    '<text x="391" y="78" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="15" fill="#0284c7" font-weight="700">3. implement</text>' +
    '<text x="391" y="100" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="11.5" fill="#273340">one chunk</text>' +
    '<text x="391" y="116" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="11.5" fill="#273340">at a time</text>' +
    '<rect x="482" y="46" width="126" height="88" rx="12" fill="#e8f5ee" stroke="#1a7f4b"/>' +
    '<text x="545" y="78" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="15" fill="#1a7f4b" font-weight="700">4. verify</text>' +
    '<text x="545" y="100" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="11.5" fill="#273340">tests + lint</text>' +
    '<text x="545" y="116" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="11.5" fill="#273340">confirm result</text>' +
    '<rect x="636" y="46" width="126" height="88" rx="12" fill="#fdf3e2" stroke="#b7791f"/>' +
    '<text x="699" y="78" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="15" fill="#b7791f" font-weight="700">5. review</text>' +
    '<text x="699" y="100" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="11.5" fill="#273340">/review, read the diff,</text>' +
    '<text x="699" y="116" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="11.5" fill="#273340">human eyes on</text>' +
    '<rect x="788" y="46" width="72" height="88" rx="12" fill="#eef2f7" stroke="#6b7a8d"/>' +
    '<text x="824" y="78" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="15" fill="#6b7a8d" font-weight="700">6. PR</text>' +
    '<text x="824" y="100" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="11.5" fill="#273340">@codex</text>' +
    '<text x="824" y="116" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="11.5" fill="#273340">review</text>' +
    '<path d="M146 90 L172 90" stroke="#94a3b8" stroke-width="2"/><path d="M166 84 L172 90 L166 96" fill="#94a3b8"/>' +
    '<path d="M300 90 L326 90" stroke="#94a3b8" stroke-width="2"/><path d="M320 84 L326 90 L320 96" fill="#94a3b8"/>' +
    '<path d="M454 90 L480 90" stroke="#94a3b8" stroke-width="2"/><path d="M474 84 L480 90 L474 96" fill="#94a3b8"/>' +
    '<path d="M608 90 L634 90" stroke="#94a3b8" stroke-width="2"/><path d="M628 84 L634 90 L628 96" fill="#94a3b8"/>' +
    '<path d="M762 90 L786 90" stroke="#94a3b8" stroke-width="2"/><path d="M780 84 L786 90 L780 96" fill="#94a3b8"/>' +
    '<path d="M545 134 C545 190 391 190 391 140" stroke="#c0392b" stroke-width="2" fill="none" stroke-dasharray="6 4"/>' +
    '<path d="M386 148 L391 140 L397 148" stroke="#c0392b" stroke-width="2" fill="none"/>' +
    '<text x="468" y="182" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#c0392b">fail -&gt; fix -&gt; repeat per chunk</text>' +
    '<text x="20" y="230" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#7e93a9">Verification is part of the work: never stop at "the agent said done".</text>' +
    '</svg>',

  "session": '<svg viewBox="0 0 880 208" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="context compaction">' +
    '<rect x="20" y="30" width="840" height="44" rx="10" fill="#edf3fd" stroke="#2457d5"/>' +
    '<text x="36" y="57" font-family="Segoe UI,Arial,sans-serif" font-size="13" fill="#273340">long conversation context - fills up over a big session</text>' +
    '<path d="M440 78 L440 116" stroke="#b7791f" stroke-width="2" stroke-dasharray="6 4"/>' +
    '<path d="M434 110 L440 118 L446 110" stroke="#b7791f" stroke-width="2" fill="none"/>' +
    '<text x="465" y="103" font-family="Consolas,monospace" font-size="14" fill="#b7791f" font-weight="700">/compact</text>' +
    '<rect x="20" y="122" width="360" height="44" rx="10" fill="#e8f5ee" stroke="#1a7f4b"/>' +
    '<text x="36" y="149" font-family="Segoe UI,Arial,sans-serif" font-size="13" fill="#273340">summarized context - keeps the thread going</text>' +
    '<rect x="430" y="122" width="200" height="44" rx="10" fill="#eef2f7" stroke="#9aa7b5"/>' +
    '<text x="530" y="149" text-anchor="middle" font-family="Consolas,monospace" font-size="13" fill="#6b7a8d">/resume saved chat</text>' +
    '<rect x="660" y="122" width="200" height="44" rx="10" fill="#eef2f7" stroke="#9aa7b5"/>' +
    '<text x="760" y="149" text-anchor="middle" font-family="Consolas,monospace" font-size="13" fill="#6b7a8d">/status session state</text>' +
    '<text x="20" y="196" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#7e93a9">Codex also compacts automatically (model_auto_compact_token_limit). Enter = steer, Tab = queue while running.</text>' +
    '</svg>',

  "injection": '<svg viewBox="0 0 880 236" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="prompt injection path">' +
    '<rect x="20" y="36" width="180" height="40" rx="10" fill="#eef2f7" stroke="#9aa7b5"/><text x="110" y="62" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="13" fill="#273340">&#127760; web page</text>' +
    '<rect x="20" y="92" width="180" height="40" rx="10" fill="#eef2f7" stroke="#9aa7b5"/><text x="110" y="118" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="13" fill="#273340">&#128196; customer file</text>' +
    '<rect x="20" y="148" width="180" height="40" rx="10" fill="#eef2f7" stroke="#9aa7b5"/><text x="110" y="174" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="13" fill="#273340">&#128172; PR comment</text>' +
    '<path d="M200 114 L318 114" stroke="#94a3b8" stroke-width="2"/><path d="M312 108 L318 114 L312 120" fill="#94a3b8"/>' +
    '<text x="258" y="102" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="11.5" fill="#7e93a9">looks like data</text>' +
    '<rect x="320" y="76" width="180" height="76" rx="12" fill="#edf3fd" stroke="#2457d5"/>' +
    '<text x="410" y="108" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="14" fill="#2457d5" font-weight="700">agent</text>' +
    '<text x="410" y="130" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#273340">reads + acts</text>' +
    '<path d="M500 114 L618 114" stroke="#c0392b" stroke-width="2"/><path d="M612 108 L618 114 L612 120" fill="#c0392b"/>' +
    '<text x="558" y="102" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="11.5" fill="#c0392b">follows it</text>' +
    '<rect x="620" y="76" width="240" height="76" rx="12" fill="#fdeceb" stroke="#c0392b"/>' +
    '<text x="740" y="108" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="14" fill="#c0392b" font-weight="700">&#9888; hidden instruction</text>' +
    '<text x="740" y="130" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#273340">runs outside its intent</text>' +
    '<rect x="20" y="176" width="270" height="36" rx="10" fill="#e8f5ee" stroke="#1a7f4b"/><text x="155" y="199" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#1a7f4b">tight sandbox + approval on-request</text>' +
    '<rect x="310" y="176" width="270" height="36" rx="10" fill="#e8f5ee" stroke="#1a7f4b"/><text x="445" y="199" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#1a7f4b">prefer cached / indexed search</text>' +
    '<rect x="600" y="176" width="260" height="36" rx="10" fill="#e8f5ee" stroke="#1a7f4b"/><text x="730" y="199" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12" fill="#1a7f4b">no uncontrolled publish rights</text>' +
    '</svg>'
};
