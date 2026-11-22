# Cairn

Shared graph memory for coding agents. Every coding agent — Claude Code,
Cursor, Codex, VS Code, Antigravity, Gemini, Windsurf, Zed, OpenCode, and more —
gets the same memory of the project: decisions with their reasoning, changes
with provenance, open questions, risks, and handoffs.

- **The memory is Markdown you own.** Notes live in a vault folder, hand-editable in
  Obsidian, diffable in git. There is no database and no proprietary format.
- **Agents share it through MCP.** One local MCP server serves all clients — 14
  tools plus two resources — so the next session starts with context instead of
  a blank page.
- **Typed edges connect everything.** `decision` → `change` implements it,
  `risk` → `task` blocks it, `question` → `answer` resolves it. The graph is
  rebuilt from the vault on every start.

GitHub: https://github.com/Arshdeep-Yadav/Cairn
Issues: https://github.com/Arshdeep-Yadav/Cairn/issues
License: MIT (see the repo's LICENSE file)

This repository (`cairn.site`) hosts the marketing/documentation site for the
project: install steps, a per-client wiring guide, the architecture diagram,
the memory-model reference, security posture, deploy guides and a FAQ —
[see the site](https://cairn.arshdeep.works) or browse
[`index.html`](index.html) directly.
