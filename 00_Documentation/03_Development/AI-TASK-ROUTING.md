# AI Task Routing — Waqfa

## Purpose

Classify work by scope, risk, and reversibility before selecting an AI tool. Tool preference never overrides Waqfa security, data-isolation, Git, or human-approval rules.

## Level 1 — Easy

**Characteristics**

- One to three files.
- Localized behavior.
- No security, data, infrastructure, or production impact.
- Easy rollback.
- Clear acceptance criteria.

**Waqfa examples**

- Copy or layout correction.
- RTL or accessibility adjustment within an existing component.
- Local lint fix.
- Focused unit test.
- Documentation update that does not change requirements.

**Default tools:** OpenCode or Codex.

**Required delivery:** short task brief, focused validation, small PR.

## Level 2 — Medium

**Characteristics**

- Several files or one complete module.
- More than one application layer.
- Existing API integration or bounded business logic.
- Moderate discovery or test work.
- Reversible without data migration.

**Waqfa examples**

- Implementing a documented screen flow.
- Dhikr-session behavior already defined in LLD-01.
- A cross-component defect.
- A bounded PocketBase client integration that does not alter schema or rules.
- Non-architectural refactoring.

**Default tools:** Codex or Claude Code. Use Factory Droid for a clear, repetitive multi-step plan.

**Required delivery:** implementation plan, acceptance criteria, relevant tests, human review before merge.

## Level 3 — Hard

**Characteristics**

- Architecture or broad cross-cutting change.
- High ambiguity.
- Persistent data, migration, authentication, authorization, secrets, infrastructure, or production impact.
- Difficult rollback.

**Waqfa examples**

- PocketBase collection or API-rule changes.
- Authentication linking, OAuth, RBAC, or delegation.
- Session reset or offline-transfer semantics not fully resolved by LLD-01.
- Deployment topology or production Compose changes.
- Audit, content-governance, backup, or recovery behavior.

**Default tools:** Claude Code for analysis and design, then Codex or Factory Droid for explicitly bounded implementation.

**Required delivery:** written decision or specification update, phased plan, human gates, rollback plan, and comprehensive validation.

## Scoring

Add one point for each condition:

- More than five files expected.
- More than one technical layer.
- Public interface or data contract changes.
- Persistent data or migration.
- Authentication, authorization, secrets, or security.
- Infrastructure or production.
- Requirement or implementation ambiguity.
- Difficult rollback.

Classification:

- **0–1:** Easy.
- **2–4:** Medium.
- **5+:** Hard.

Any security, persistent-data, infrastructure, or production item is automatically **Hard**, regardless of score.

## Tool selection

| Work pattern | Preferred tool |
|---|---|
| Small local edit or exploration | OpenCode |
| Precise implementation, tests, defect repair, PR review | Codex |
| Broad context, architecture, ambiguity resolution, large refactor analysis | Claude Code |
| Long, repeatable, multi-stage execution with a stable plan | Factory Droid |

## Conflict prevention

- One implementing tool owns each task.
- Do not allow two tools to edit the same branch or overlapping file scope concurrently.
- A second tool may perform read-only review.
- Parallel execution is allowed only when file ownership and outputs are explicitly separated.
