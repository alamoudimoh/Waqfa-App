# Git Standards — Waqfa

> **Applies to:** all source code, documentation, infrastructure, automation, and release changes  
> **Authority:** repository-wide standard  
> **Related:** ADR-001, DEVELOPMENT-GUIDE, LLD-09-Deployment-Runbook

## 1. Objectives

This standard ensures every repository change is:

- Understandable without opening the diff.
- Traceable to a clear purpose.
- Safe to review and revert.
- Consistent across human and AI contributors.
- Suitable for automated release notes and changelogs.

## 2. Protected branch model

```text
main
├── feat/*
├── fix/*
├── docs/*
├── refactor/*
├── test/*
├── chore/*
├── ci/*
└── release/*
```

Rules:

- `main` must remain releasable.
- Do not develop directly on `main`.
- Use short-lived branches.
- Keep one logical purpose per branch.
- Merge through a pull request unless an explicitly documented emergency process applies.

## 3. Branch naming

Format:

```text
<type>/<short-kebab-case-description>
```

Allowed types:

| Type | Purpose |
|---|---|
| `feat` | New product capability |
| `fix` | Defect correction |
| `docs` | Documentation-only change |
| `refactor` | Internal code restructuring without intended behavior change |
| `test` | Test-only work |
| `chore` | Maintenance or non-product work |
| `ci` | CI/CD and automation |
| `release` | Release preparation |

Examples:

```text
feat/google-account-linking
fix/session-revision-conflict
docs/development-deployment-governance
ci/container-publish-workflow
```

## 4. Commit message standard

Use Conventional Commits:

```text
<type>(<scope>): <imperative summary>

<body>

<footer>
```

### 4.1 Allowed commit types

| Type | Use |
|---|---|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Refactor without intended behavior change |
| `perf` | Performance improvement |
| `test` | Add or correct tests |
| `build` | Build system or dependency changes |
| `ci` | CI/CD configuration |
| `chore` | Maintenance |
| `revert` | Revert a prior commit |
| `security` | Security hardening or vulnerability remediation |

### 4.2 Scope guidance

Use a stable subsystem or document family:

```text
auth
session
pocketbase
notifications
insights
accessibility
landing
infrastructure
deployment
architecture
docs
ci
```

### 4.3 Summary rules

The first line must:

- Use the imperative mood.
- Start with a lowercase verb after the colon.
- Be specific.
- Avoid a trailing period.
- Stay within 72 characters where practical.

Good:

```text
docs(architecture): record development and deployment topology
fix(session): reject stale cross-device progress writes
feat(auth): add controlled Google account linking
```

Avoid:

```text
Updated files
Changes
Fix bug
WIP
Final update
```

## 5. Standard commit body

Use a concise body when the change is not self-evident.

Recommended format:

```text
<type>(<scope>): <imperative summary>

- describe the first material change
- describe the second material change
- state an important boundary or consequence
- mention tests, migration, or documentation impact
```

Example:

```text
docs(deployment): define environment separation and release flow

- document Manage-Hub as the development workspace
- establish GitHub as the source of truth
- reserve the Waqfa LXC for runtime services
- define image tagging, backup, and rollback requirements
```

## 6. Commit footer

Use footers where applicable:

```text
Refs: BR-026, NFR-01
Closes: #42
BREAKING CHANGE: rename the runtime environment variable
```

Rules:

- Use `Refs:` for non-closing traceability.
- Use `Closes:` only when the commit or merged PR fully resolves an issue.
- Use `BREAKING CHANGE:` for incompatible behavior, API, schema, or deployment changes.

## 7. Commit quality rules

Each commit must:

- Represent one coherent change.
- Leave the branch in a valid state where practical.
- Avoid mixing formatting with unrelated behavior changes.
- Include required tests or documentation updates.
- Exclude secrets, generated credentials, database files, and local environment files.

Do not commit:

```text
.env
.env.*
*.pem
*.key
pb_data/
backups/
node_modules/
dist/
```

Exceptions require an explicit documented reason and a safe placeholder/example file.

## 8. Pull request standard

PR title follows the commit summary format:

```text
<type>(<scope>): <imperative summary>
```

PR body must include:

```md
## Summary

## Changes

## Validation

## Documentation and traceability

## Deployment or migration impact

## Risks and rollback
```

A PR must state `None` when a section does not apply rather than omit it.

## 9. Merge strategy

Preferred strategy:

- Squash merge for a branch containing iterative or corrective commits.
- Preserve a clean final Conventional Commit message.
- Rebase merge may be used when every commit is independently meaningful and compliant.
- Avoid merge commits unless preserving branch topology has a documented benefit.

The final merged commit must summarize the complete user-visible or architectural outcome, not the last edit performed.

## 10. Release commits and tags

Release preparation:

```text
release: prepare v0.1.0
```

Tags use Semantic Versioning:

```text
v0.1.0
v0.1.1
v0.2.0
v1.0.0
```

Every deployed image must include at least one immutable identifier:

```text
ghcr.io/alamoudimoh/waqfa-app:v0.1.0
ghcr.io/alamoudimoh/waqfa-app:sha-<short-sha>
```

`latest` must not be the sole production identifier.

## 11. Documentation traceability

When a change affects requirements or architecture:

- Product requirement changes update the BRD.
- Architecture decisions update the HLD and, when significant, an ADR.
- Implementation detail changes update the relevant LLD.
- Deployment changes update LLD-09.
- Cross-document references update the traceability matrix.

## 12. AI contributor requirements

AI-generated commits and pull requests follow the same standard as human work.

Before committing, the contributor must:

- Read the relevant BRD/HLD/LLD documents.
- Avoid inventing unresolved infrastructure or PocketBase details.
- Mark unverified live-system assumptions explicitly.
- Keep changes scoped to the requested branch purpose.
- Summarize exactly what changed and what was validated.

## 13. Canonical examples

### Documentation

```text
docs(architecture): record development and deployment topology

- define Manage-Hub as the development environment
- establish GitHub as the authoritative source of truth
- reserve the Waqfa LXC for isolated runtime workloads
- document deployment and security boundaries
```

### Feature

```text
feat(session): add revision-safe active session transfer

- issue a new revision when session ownership moves devices
- reject stale writes from the previous owner
- preserve last-confirmed progress during transfer
- add integration coverage for conflict recovery

Refs: BR-029, NFR-12
```

### Fix

```text
fix(content): prevent unrelated fallback dhikr content

- return an explicit unavailable state for empty approved queries
- remove the cross-section fallback path
- add regression coverage for empty sections

Refs: BR-025, NFR-07
```

## 14. Standard commit summary template

Use this template across the repository:

```text
<type>(<scope>): <imperative outcome>

- <material change 1>
- <material change 2>
- <material change 3>
- <validation, migration, or documentation impact>

Refs: <requirement, ADR, or issue identifiers when applicable>
```
