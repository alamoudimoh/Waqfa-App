# AI Operating Model — Waqfa

## 1. Purpose

This document defines how Factory Droid, OpenCode, Claude Code, and Codex participate in Waqfa development without weakening repository governance, project isolation, security, traceability, or human control.

The model applies to all AI-assisted work performed against `alamoudimoh/Waqfa-App` from Manage-Hub or another approved development workspace.

## 2. Governing principles

1. **GitHub is the authoritative source of truth.** Tool-local chat history is not durable project state.
2. **Specifications govern implementation.** BRD, HLD, ADR, and LLD documents take precedence over tool assumptions.
3. **One task, one implementing owner.** A second tool may review, but must not concurrently edit the same scope.
4. **No direct work on `main`.** Every task uses a dedicated branch and Pull Request.
5. **No direct production modification.** Production receives approved, versioned artifacts only.
6. **Evidence before claims.** Every delivery reports changed files, validation, limitations, risks, and rollback.
7. **Human approval remains mandatory** for security, data, architecture, infrastructure, production, and irreversible changes.

## 3. Waqfa-specific boundaries

All tools must preserve:

```text
Repository checkout       /opt/Dev/Waqfa-App
PocketBase collections    waqfa_*
Authentication collection waqfa_users
Environment variables     WAQFA_*
Development workspace     Manage-Hub
Production runtime        dedicated Waqfa LXC
```

The following are prohibited:

- Reusing or modifying any `marsid_*` collection.
- Committing `.env` files, credentials, tokens, private keys, or PocketBase runtime data.
- Inventing unverified PocketBase schema, API rules, or live infrastructure details.
- Editing production files as a substitute for a branch, review, and release.

## 4. Source precedence

For every task, read the applicable material in this order:

1. `BRD-Waqfa-v1.1.md`
2. `HLD-Waqfa-v1.1.md`
3. Applicable ADR
4. Applicable LLD
5. Development and Git standards
6. Existing code, tests, and repository configuration

When two sources conflict, do not silently reconcile them. Record the conflict and request a decision before changing architecture, security, persistent data, or production behavior.

## 5. Operating cycle

### Intake

- Define the outcome.
- Identify requirement references.
- Declare allowed and forbidden files.
- Write measurable acceptance criteria.
- Record risks and approval gates.

Use `AI-TASK-BRIEF.md`.

### Classification

Classify the task as Easy, Medium, or Hard using `AI-TASK-ROUTING.md`.

### Assignment

- **OpenCode:** fast local exploration and small edits.
- **Codex:** precise implementation, tests, defect repair, and code review.
- **Claude Code:** broad-context analysis, architecture, ambiguity resolution, and large-refactor planning.
- **Factory Droid:** long, repeatable, multi-step implementation where the plan is already stable.

### Execution

- Synchronize `main`.
- Create a dedicated branch.
- Read required source documents before editing.
- Implement the smallest coherent change satisfying acceptance criteria.
- Do not expand scope without recording and approving the change.

### Validation

Inspect repository configuration before selecting commands. Run only available and applicable checks, including lint, tests, type checking, build, RTL/accessibility review, migration validation, and documentation traceability.

Review the final diff for secrets, runtime data, unintended files, and scope expansion.

### Delivery

The implementing tool produces:

- A conventional commit.
- A Pull Request into `main`.
- A delivery report containing changed files, acceptance results, validation evidence, unexecuted checks, risks, documentation impact, and rollback.

The implementing tool does not merge its own PR unless explicitly instructed.

## 6. Human approval gates

Explicit approval is required before:

- Authentication, authorization, OAuth, linking, RBAC, or delegation changes.
- PocketBase schema, collections, API rules, indexes, or migrations.
- Secrets, credentials, or access-control changes.
- Infrastructure, networking, deployment, backups, recovery, or production actions.
- Architecture or public contract changes.
- Destructive or difficult-to-reverse operations.
- Bypassing validation failures or merging a high-risk PR.

## 7. Parallel work policy

Parallel execution is permitted only when each stream has:

- A separate owner.
- A separate branch.
- Non-overlapping files or explicitly separated ownership.
- Defined inputs and outputs.
- A designated integrator when a shared file must eventually change.

Do not assign the same task to multiple tools for competing implementations unless the user explicitly requests alternatives and no branch is modified.

## 8. Definition of done

A task is complete when:

- Acceptance criteria are satisfied.
- Required checks pass, or failures and omissions are documented.
- No secret, runtime data, or unrelated change is included.
- Waqfa namespace and isolation rules remain intact.
- Documentation and BRD/HLD/LLD traceability are updated where needed.
- Risks and rollback are documented.
- Required human review is complete.
