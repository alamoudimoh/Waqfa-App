# Waqfa AI Agent Instructions

## Source of truth

Use this precedence order:

1. `00_Documentation/01_Specifications/BRD-Waqfa-v1.1.md`
2. `00_Documentation/01_Specifications/HLD-Waqfa-v1.1.md`
3. Applicable ADR and LLD documents
4. `00_Documentation/03_Development/DEVELOPMENT-GUIDE.md`
5. `00_Documentation/03_Development/GIT-STANDARDS.md`
6. Existing repository code and tests

Do not resolve contradictions by assumption. Record the conflict and stop before changing architecture, security, data, or production behavior.

## Mandatory isolation

- Work only from Manage-Hub or an approved development workspace.
- Never edit production application files directly.
- Use only `waqfa_*` PocketBase collections.
- Use `waqfa_users` as the authentication collection.
- Use only `WAQFA_*` environment variables.
- Do not read, modify, migrate, or reuse any `marsid_*` collection.
- Never commit secrets, `.env` files, PocketBase runtime data, private keys, tokens, or credentials.

## Git workflow

- Never modify `main` directly.
- Synchronize `main`, then create one dedicated branch per task.
- Use branch names defined in `00_Documentation/03_Development/GIT-STANDARDS.md`.
- Keep one task owner and one clearly bounded scope.
- Submit all durable changes through a Pull Request.
- Do not merge your own PR unless explicitly instructed.

## Task routing

Classify each task before implementation using:

`00_Documentation/03_Development/AI-TASK-ROUTING.md`

Default routing:

- Small, localized change: OpenCode or Codex.
- Multi-file implementation or defect: Codex or Claude Code.
- Architecture, authentication, migrations, infrastructure, or high ambiguity: Claude Code for analysis, then Codex or Factory Droid for bounded implementation.
- Long, repeatable, multi-step execution: Factory Droid.

A second tool may review the work, but must not implement concurrently on the same branch or file scope.

## Before implementation

1. Read the relevant BRD, HLD, ADR, and LLD sections.
2. Create a task brief using `00_Documentation/03_Development/AI-TASK-BRIEF.md`.
3. Identify allowed files, forbidden files, acceptance criteria, risks, and required validation.
4. Confirm whether the task requires a human approval gate.

## Human approval gates

Stop for explicit approval before:

- Authentication, authorization, OAuth, delegation, or secrets changes.
- PocketBase schema, API rules, migrations, indexes, or destructive data operations.
- Infrastructure, networking, deployment, backups, or production changes.
- Public contracts, architecture, or irreversible behavior changes.
- Bypassing failed tests or merging a high-risk PR.

## Validation

Inspect `package.json` and repository configuration before selecting commands. Do not invent scripts.

For the affected scope, run available checks such as:

```bash
bun run lint
bun run test
bun run build
```

Also review:

```bash
git status
git diff --staged
```

Every delivery must state:

- Files changed.
- Acceptance criteria satisfied.
- Commands executed and results.
- Tests not executed and why.
- Remaining risks or assumptions.
- Documentation and traceability impact.
- Rollback approach when applicable.
