# High-Level Design — Waqfa (وقفة)

> **Document type:** HLD (architecture-level) · **Companion to:** BRD-Waqfa v1.1  
> **Owner:** Mohammed Alamoudi · **Status:** Draft v1.1  
> **Depth:** High-level architecture. Low-level module design deferred to separate LLDs.

## 0. Document Control

| Field | Value |
|---|---|
| Traces to | BRD-Waqfa v1.1 |
| Stack (ratified) | React 19 + TanStack Start (frontend), self-hosted PocketBase (backend retained; versioned product-approved schema additions allowed), Docker on owned Proxmox/LXC |
| Auth | PocketBase email/password plus Google OAuth; controlled account linking |
| Core subsystem | Dhikr Session & Time-Window Engine (§4) |
| Data-flow decision | TanStack Start **server functions** for one-shot reads/writes; PocketBase **realtime (SSE)** held directly by the client for live UI (§4.4) |
| Development topology | Manage-Hub development workspace → GitHub source of truth → dedicated Waqfa LXC runtime (§9) |
| Architecture decision | ADR-001 — Development and Deployment Topology |
| BRD synchronization | BRD-Waqfa v1.1 corrects the delegation trace to BR-017 and expands the product baseline with approved cross-device, continuity, travel, accessibility, and authentication requirements. |

## 1. Architecture Overview

Waqfa is a single-page, installable PWA using React 19 and TanStack Start, backed by a self-hosted PocketBase instance. TanStack Start server functions perform privileged one-shot reads and writes. The authenticated browser client separately holds PocketBase realtime SSE connections for the limited UI surfaces that need live updates.

```text
┌───────────────────────────────────────────────┐
│ Browser PWA — Arabic-only, RTL                │
│ React 19 + TanStack Router                    │
│ PocketBase JS SDK for auth + client SSE       │
└───────────────┬─────────────────┬─────────────┘
                │ HTTPS           │ HTTPS + SSE
┌───────────────▼─────────────────▼─────────────┐
│ TanStack Start server                         │
│ SSR, routing, request-scoped server functions │
└───────────────┬───────────────────────────────┘
                │ HTTPS
┌───────────────▼───────────────────────────────┐
│ PocketBase                                    │
│ Collections, API rules, auth, realtime, audit │
└───────────────────────────────────────────────┘
```

Traces: BR-001, BR-002, BR-026, NFR-01, NFR-09.

## 2. Technology Stack (ratified)

| Concern | Choice | Rationale |
|---|---|---|
| Frontend framework | React 19 + TanStack Start | Confirmed target stack (BRD §2.3, BR-026) |
| Routing | TanStack Router | Type-safe routing and SSR integration |
| Data access (one-shot) | TanStack Start server functions | Keeps privileged operations and server-only credentials outside browser code |
| Data access (live) | PocketBase JS SDK, client-held SSE | Direct client realtime path for approved live surfaces |
| Backend | PocketBase, self-hosted | Data sovereignty and retained backend architecture |
| Deployment | Docker on owned Proxmox/LXC | Existing infrastructure convention and self-hosting requirement |
| Styling | Tailwind CSS | Existing application convention and Brand Identity v3 token source |
| PWA | Manifest + service worker | BR-022 |
| Source control | GitHub | Authoritative source, review, CI/CD, tags, and releases |
| Development workspace | Manage-Hub | Central development and management tooling |
| Production runtime | Dedicated Waqfa LXC | Isolated application and PocketBase runtime |

PocketBase clients used in server-side request handling must be request-scoped and must not be shared globally across users.

## 3. Component Architecture

### 3.1 Frontend components

- **App Shell** — navigation, search, avatar menu, fullscreen, and RTL layout.
- **Home Dashboard / Daily Spiritual Plan** — core sections, optional wards, timing states, completion, continuity, and activity grid.
- **Dhikr Session** — counting/reading modes, focus mode, progress, reviewed audio, session transfer, and next-wird resolution.
- **Settings** — profile, commitments, prayer/location, travel, appearance, reminders, DND, social opt-in, account linking, export, and deletion.
- **Prayer & Qibla** — prayer-time computation and Qibla direction.
- **Muhasaba** — owner-only weekly reflection, weekly report, and personal intention.
- **Tickets / Public Board** — public Kanban and ticket comments with anonymized identity.
- **Admin Dashboard** — content approval, ticket triage, and user management.
- **Super-Admin Dashboard** — admin management and delegated permission controls.
- **Landing Page** — separate public surface at `waqfa.app`.

### 3.2 Backend components

- **PocketBase Collections** — retained backend model with versioned, approved additions.
- **Auth** — PocketBase email/password and Google OAuth.
- **API Rules** — enforcement boundary for roles, delegation, privacy, and ownership.
- **Content-Approval Gate** — approved religious content only.
- **Realtime Broker** — PocketBase SSE for approved live surfaces.
- **Audit Log** — server-side, append-oriented privileged action records.

## 4. Dhikr Session, Time-Window & Cross-Device Engine

This is the highest-risk subsystem because incorrect behavior can route a user to the wrong section, lose progress, or incorrectly calculate daily continuity.

### 4.1 Responsibilities

1. Render the active session and progress.
2. Persist progress without blocking tap feedback.
3. Resolve the next valid section from time windows.
4. Enforce the 02:00 local daily boundary.
5. Queue offline writes and flush after reconnection.
6. Show explicit unavailable states rather than unrelated fallback content.
7. Enforce one active session owner and safe cross-device transfer.
8. Support counting and reading modes.
9. Use expected duration only for public continuity eligibility.
10. Preserve transition-day progress after confirmed travel changes.

### 4.2 Time-window resolution

`time_start` and `time_end` are the authoritative section-window fields. The engine filters sections by the current local time and never chooses a nearest or unrelated fallback section.

### 4.3 Daily reset

The 02:00 reset is computed at read time. Progress older than the most recent local 02:00 boundary belongs to the previous day and is not restored into the current session.

### 4.4 Data flow and realtime boundary

- One-shot server reads and writes use TanStack Start server functions.
- Every server request creates a fresh PocketBase client.
- Approved live reads use direct authenticated browser SSE subscriptions.
- Offline writes are queued in the browser and flushed after reconnection.
- Missing content produces an explicit unavailable state.

### 4.5 Failure semantics

| Condition | Required behavior |
|---|---|
| Empty approved section query | Show explicit unavailable state |
| No active section window | Show explicit no-active-wird state |
| Offline write failure | Queue locally and show pending sync state |
| Online server error | Show a visible error and do not mark the mutation synced |
| Realtime interruption | Reconnect through the supported PocketBase client behavior |

### 4.6 Active-session transfer

- The server stores the active owner, revision, and last-confirmed progress.
- “Continue here” transfers ownership and increments the revision.
- Writes include the expected revision and are idempotent.
- Stale writes are rejected.

### 4.7 Duration and continuity eligibility

Expected duration is derived from item metadata and target count. Unusually fast completion remains private but may be excluded from public continuity scoring without accusatory language.

### 4.8 Travel and location transition

Location/timezone changes require user confirmation. Completed sections and historical days remain immutable; only remaining sections use the confirmed new location.

## 5. Data Model (high-level)

| Domain | Collection or model | Purpose |
|---|---|---|
| Identity | `users` | Authentication, profile, and personalization |
| Authorization | `admins` | Role, scoped permissions, and active state |
| Delegation | `delegation` | Time-boxed permission grants |
| Active session | `active_sessions` or equivalent versioned fields | Ownership, revision, progress, and stale-write rejection |
| Dhikr content | `dhikr_library` | Approved content and reviewed optional media |
| Activity | `user_activity` | Daily activity, continuity, and weekly insights |
| Self-reflection | `muhasaba` | Owner-only weekly text |
| Community | `tickets`, `ticket_comments` | Public transparent feedback board |
| Audit | `audit_log` | Privileged action records |

Exact fields, indexes, relationships, migrations, and API rules remain LLD scope and must be verified against the live PocketBase instance.

## 6. Authentication & Authorization

Locked decisions:

- PocketBase email/password plus Google OAuth.
- Google-only accounts are valid.
- Account linking follows a controlled verified flow.
- PocketBase API rules are the final authorization boundary.
- Client role checks are UX-only.
- Delegation must be consumed at runtime and checked for permission scope and validity period.
- Privileged server functions resolve identity and capability on every call.

## 7. Theming, RTL & Accessibility

- Brand Identity v3 is the token source.
- Arabic-only and RTL throughout.
- Logical CSS properties are preferred.
- WCAG 2.2 AA is the target for core routes.
- Large text, keyboard use, focus visibility, reduced motion, screen-reader semantics, and large touch targets are required.
- Focus mode suppresses non-essential interruptions during sessions.

## 8. Audit & Content Governance

- Every privileged action writes to `audit_log` server-side.
- No client-only audit fallback is accepted.
- Religious content is published only after committee approval.
- Runtime religious-text API ingestion is prohibited.

## 9. Development, Source-Control & Deployment Architecture

### 9.1 Canonical topology

```text
Manage-Hub development workspace
        ↓
Short-lived Git branch
        ↓
GitHub commit, pull request, and CI
        ↓
Approved main branch and versioned artifact
        ↓
Dedicated Waqfa LXC runtime
```

This topology is formally recorded in `ADR-001-Development-and-Deployment-Topology.md`.

### 9.2 Environment responsibilities

| Environment | Responsibility |
|---|---|
| Manage-Hub | Development, local validation, development PocketBase, and approved coding tools |
| GitHub | Authoritative source, review history, CI/CD, releases, and documentation |
| Waqfa LXC | Isolated production application, PocketBase, persistent data, logs, health checks, and backups |
| Staging | Optional pre-production validation using separate data and secrets |

### 9.3 Mandatory boundaries

- Manage-Hub must not be the production runtime.
- The Waqfa LXC must not be a general development workstation.
- Every durable source or documentation change must exist in GitHub.
- Direct production application edits are prohibited.
- Production artifacts must map to a commit SHA.
- Development and production PocketBase data and credentials must be separate.

### 9.4 Deployment model

- Preferred deployment uses immutable versioned container images.
- `latest` must not be the only production tag.
- The previous image remains available for rollback.
- Database changes use versioned migrations and require a verified backup.
- Secrets are injected at runtime and never committed.

### 9.5 Domain split

- `waqfa.app` serves the public landing surface.
- `my.waqfa.app` serves the authenticated application.
- Final landing deployable separation remains an implementation decision documented in LLD-09.

## 10. Cross-Cutting Concerns

| Concern | Approach | Traces |
|---|---|---|
| Security | Server-verified authorization, runtime secrets, no client-trusted roles | BR-018, NFR-02, NFR-03 |
| Reliability | Explicit errors, no silent fallbacks, backups, rollback | BR-011, BR-019, BR-025, NFR-04 |
| Performance | Instant client feedback and bounded writes | NFR-08 |
| Portability | Versioned infrastructure and deployable artifacts | BR-026, NFR-09 |
| Consistency | Canonical app version and repository-wide Git standards | BR-024, NFR-06 |
| Religious integrity | Committee approval and no runtime religious-text APIs | BR-012, BR-013 |
| RTL/accessibility | Arabic-only, WCAG target, large text and reduced motion | BR-027, BR-039, NFR-05, NFR-10 |
| Multi-device | Revision-safe transfer and stale-write rejection | BR-029, NFR-12 |
| Privacy | Owner-only Muhasaba and anonymized opt-in public data | BR-010, BR-011, NFR-11 |
| Operations | Manage-Hub development, GitHub source of truth, Waqfa LXC runtime | ADR-001, LLD-09 |

## 11. LLD Set

1. LLD-01 — Dhikr Session Engine.
2. LLD-02 — PocketBase Schema.
3. LLD-03 — Auth, RBAC & Delegation.
4. LLD-04 — RTL & Accessibility.
5. LLD-05 — Audit & Content Governance.
6. LLD-06 — Authentication & Account Linking.
7. LLD-07 — Notifications, Travel & Location.
8. LLD-08 — Insights, Intentions & Continuity.
9. LLD-09 — Deployment Runbook.

## 12. Open Questions

1. Exact live PocketBase API-rule syntax.
2. Whether landing and authenticated app share one deployable.
3. Field-level live schema confirmation.
4. Final disposition of the former studio/templates artifacts.
5. Canonical app-version implementation.
6. Exact active-session schema and revision protocol.
7. Exact continuity scoring tolerance.
8. Location-change threshold and browser support.
9. Audio storage, caching, and offline policy.
10. Final live infrastructure identifiers, paths, networking, backup target, and deployment credentials.

---

*End of HLD v1.1.*
