# High-Level Design — Waqfa (وقفة)

> **Document type:** HLD (architecture-level) · **Companion to:** BRD-Waqfa v1.0
> **Owner:** Mohammed Alamoudi · **Status:** Draft v1.1
> **Depth:** High-level architecture. Low-level module design deferred to separate LLDs.

## 0. Document Control

| Field | Value |
|---|---|
| Traces to | BRD-Waqfa v1.1 |
| Stack (ratified) | React 19 + TanStack Start (frontend), self-hosted PocketBase (backend retained; versioned product-approved schema additions allowed), Docker on owned Proxmox/LXC |
| Auth | PocketBase email/password plus Google OAuth; controlled account linking |
| Core subsystem | Dhikr Session & Time-Window Engine (§4) |
| Data-flow decision | TanStack Start **server functions** for one-shot reads/writes; PocketBase **realtime (SSE)** held directly by the client for live UI (leaderboard, activity grid) — verified this is the only viable realtime path (§4.4) |
| BRD synchronization | BRD-Waqfa v1.1 corrects the delegation trace to BR-017 and expands the product baseline with approved cross-device, continuity, travel, accessibility, and authentication requirements. |

## 1. Architecture Overview

Waqfa is a single-page, installable PWA (React 19 + TanStack Start) backed by a self-hosted PocketBase instance. TanStack Start's server functions act as the sole place that performs privileged, one-shot reads/writes against PocketBase; the browser client separately and directly holds PocketBase's realtime (SSE) connection for the small set of UI surfaces that need live updates, since PocketBase realtime is a browser-only capability and cannot be proxied through a server-side hook or SSR context (verified, §4.4). No component other than the TanStack Start server and the authenticated browser client ever talks to PocketBase.

```
┌───────────────────────────────────────────────┐
│  Browser (PWA, Arabic-only, RTL)               │
│  React 19 components                           │
│   ├─ PocketBase JS SDK (auth token + realtime  │
│   │   SSE subscriptions — leaderboard,         │
│   │   activity grid)                           │
│   └─ TanStack Router (client-side navigation)  │
└───────────────┬─────────────────┬───────────────┘
                │ HTTPS (loaders/  │ HTTPS + SSE
                │ server fns)      │ (direct PB realtime)
┌───────────────▼─────────────────▼───────────────┐
│  TanStack Start server                          │
│  - SSR + routing                                │
│  - Server functions (one-shot reads/writes:     │
│    dhikr counts, settings, tickets, admin ops)  │
│  - Single PocketBase client instance per request│
└───────────────┬───────────────────────────────────┘
                │ HTTPS (server-initiated)
┌───────────────▼───────────────────────────────────┐
│  PocketBase (self-hosted)                         │
│  - Collections (schema unchanged by migration)    │
│  - API Rules (RBAC enforcement — admin/super_admin│
│    /delegation)                                   │
│  - Realtime broker (SSE, record-level events)     │
│  - Content-approval gate (`dhikr_library.approved`)│
└─────────────────────────────────────────────────┘
```

Traces: BR-001, BR-002, BR-026, NFR-01, NFR-09.

## 2. Technology Stack (ratified)

| Concern | Choice | Rationale |
|---|---|---|
| Frontend framework | React 19 + TanStack Start | Confirmed target stack (BRD §2.3, BR-026) |
| Routing | TanStack Router (bundled with TanStack Start) | Ratified alongside TanStack Start; type-safe routing, SSR-integrated |
| Data access (one-shot) | TanStack Start **server functions** | Server-only logic callable from loaders/components; keeps PocketBase credentials and privileged writes off the client where they don't need to be there (BR-018, NFR-02) |
| Data access (live) | PocketBase JS SDK, client-held realtime subscription (SSE) | Verified: PocketBase realtime is implemented via Server-Sent Events and is explicitly a client-side-only capability — the JSVM/server-side environment cannot subscribe. A server function cannot proxy this for the client. |
| Backend | PocketBase (self-hosted), retained | Sovereignty (NFR-01), no redesign required for the frontend swap; approved additive changes are versioned (NFR-09) |
| Deployment | Docker, owned Proxmox/LXC | Existing infra convention, BRD §7 |
| Styling | Tailwind CSS | Carried over from the current app; Brand Identity v3 is the token source |
| PWA | Manifest + service worker | BR-022, carried over from current implementation |

**Verified, not assumed:** PocketBase's realtime subscriptions are implemented via Server-Sent Events, and the PocketBase documentation explicitly states that server-side/JSVM contexts cannot open WebSocket/SSE connections to receive them — only client-side SDK usage supports subscribe/unsubscribe. Separately, PocketBase's own docs warn that combining PocketBase with SSR needs careful client-instance handling to avoid security issues from an incorrectly shared server-side client and potential performance bottlenecks from heavy client↔server↔PocketBase round-trips — this is why the design below gives server functions a fresh, request-scoped PocketBase client rather than a shared global instance (§4.4, §6).

## 3. Component Architecture

### 3.1 Frontend components (high-level)
- **App Shell** — top navigation, search (Ctrl+K), avatar menu (sole entry point into Settings per BR-007), fullscreen toggle. RTL-only layout (BR-027, NFR-05).
- **Home Dashboard / Daily Spiritual Plan** — greeting, three equal core sections, committed optional wards, completed/current/upcoming/late states, next pause, continuity stats, and 12-week activity. Public continuity data is opt-in, anonymized, and excludes raw counts.
- **Dhikr Session** — counter and reading modes, focus mode, progress, reviewed optional audio, estimated-duration eligibility checks, session transfer, and next-wird resolution.
- **Settings** — profile, ward commitments, prayer/location, confirmed travel updates, theme/font/accent, large-text mode, reminders + DND, social opt-in, Google account linking, data export/delete.
- **Prayer & Qibla** — prayer-times computation and compass, sourced from an external prayer-times provider + geolocation (BR-008); this is the one legitimate external-API dependency, distinct from and never used for religious *text* content (BR-013 boundary).
- **Muhasaba** — owner-only weekly reflection, weekly report, and personal intention. Admin and super-admin paths have no read access to the text.
- **Tickets / Public Board** — public Kanban, per-ticket comment thread, "My tickets" filter (BR-014).
- **Admin Dashboard** — content-approval queue, ticket triage, user management (BR-015), gated by a role check that is UX-only on the client and re-verified server-side on every server function call (BR-018).
- **Super-Admin Dashboard** — admin-account CRUD, delegation grant/revoke UI (BR-016), consuming the corrected delegation-enforcement path (BR-017, §6).
- **Landing Page (waqfa.app / "Waqfa 04")** — a separate route tree/deployment target from the authenticated app, day-cycle marketing concept (BR-021); shares the design-token source but not the authenticated component tree.

### 3.2 Backend components (high-level)
- **PocketBase Collections** — schema carried over unchanged from the current app (§5); no migration required by BR-026/NFR-09.
- **Auth** — PocketBase `users` auth collection with email/password and Google OAuth. Google-only accounts are allowed; account linking requires a verified controlled flow and never merges solely by matching email.
- **API Rules (RBAC)** — the actual enforcement boundary for admin/super_admin/delegation access (BR-018); this HLD requires these rules be read and confirmed against the live instance rather than assumed (BRD open question #3).
- **Content-Approval Gate** — the `dhikr_library.approved` flag and its associated admin queue are the only path by which committee-reviewed content becomes visible to end users (BR-012, BR-013).
- **Realtime Broker** — PocketBase's built-in SSE broker, emitting record create/update/delete events; consumed directly by authenticated browser clients for `user_activity` (own + leaderboard-scoped reads) and any other live surface.
- **Audit Log** — server-side-only writes triggered by every privileged server function, no client-side or local-only fallback (BR-019).

All server-side privileged operations flow through TanStack Start server functions, never directly from a React component to PocketBase, so BR-018/NFR-02's server-side authorization boundary has one single place to enforce and audit.

## 4. Dhikr Session, Time-Window & Cross-Device Engine (core subsystem)

This is the highest-complexity, highest-risk subsystem: it owns per-item counting, time-window-based section resolution, the 02:00 daily reset boundary, and offline-tolerant writes — the one area where a subtle bug directly produces an incorrect religious-practice experience (e.g. routing a user into the wrong wird, or silently losing progress).

### 4.1 Responsibilities
1. Render the active dhikr session (counts, targets, progress) for a given section.
2. On each count/completion, persist progress to PocketBase without blocking the UI.
3. On session completion, resolve the correct "next wird" using time-window logic (BR-003, BR-004).
4. Enforce the 02:00 local-time daily reset boundary (BR-005).
5. Tolerate offline writes via local queuing + flush-on-reconnect (BR-028).
6. Never silently substitute unrelated hardcoded content when a section has no approved rows.
7. Enforce one active session owner per account and transfer ownership safely between devices.
8. Support counting and reading modes using canonical progress state.
9. Evaluate `estimated_duration_seconds` only for continuity-board eligibility, never to erase private progress.
10. Preserve transition-day completion after confirmed travel/location changes.

### 4.2 Time-window resolution model
Each `dhikr_library` section carries `time_start`/`time_end` (and, per current inventory, a `time` label). The engine's section-resolution function must treat `time_start`/`time_end` as the **sole source of truth** for whether a section is currently valid — this closes the previously known gap where the "next wird" button could open a section (e.g. أذكار النوم) regardless of whether the current device time actually fell inside that section's window.

Resolution algorithm (high-level, not code-level):
1. Read current device-local time.
2. Query all sections; filter to those whose `[time_start, time_end)` window contains the current time.
3. If the just-completed section's mandatory/ward peers include a still-incomplete section in that filtered set, offer it as "next wird."
4. If no section's window contains the current time (e.g. a gap between windows), the engine must show an explicit "no active wird right now" state — it must not fall back to selecting the nearest section by proximity, and it must not silently reuse the previous section.
5. This same time-window filter is reused by "resume" logic (a user re-opening the app mid-session) — resume must not restore progress into a section whose window has since closed.

### 4.3 Daily reset (02:00 boundary)
Reset is a **read-time computation**, not a server-side scheduled job: "today" is defined as the interval since the most recent 02:00 local boundary. On load, the engine compares each stored progress timestamp (server `user_activity` row, or a queued local write) against that boundary; anything older is treated as belonging to a prior day and is not restored into the current session (BR-005). This preserves the current app's behavior and requires no PocketBase cron/hook.

### 4.4 Data flow & realtime boundary (verified)
- **One-shot writes** (per-tap or per-completion progress updates) go through a TanStack Start server function, which holds a fresh, request-scoped PocketBase client — never a shared global instance across requests, per PocketBase's own SSR guidance about avoiding security issues from incorrectly shared server-side clients.
- **Live reads** the session UI needs from other surfaces (e.g. today's own `user_activity` row reflecting a write just made) are handled by the browser holding its own PocketBase realtime subscription directly — confirmed this is the only viable path, since PocketBase's realtime layer is SSE-based and explicitly cannot be subscribed to from a server-side/JSVM context. The server function layer is therefore write/one-shot-read only; it is not in the realtime path at all.
- **Offline tolerance:** writes that fail to reach the server function (network down) are queued in local state and flushed on the browser's `online` event, matching the currently implemented pattern (BR-028) — this queuing lives entirely client-side and is orthogonal to the server-function/realtime split above.
- **No hardcoded fallback content:** if a section's `dhikr_library` query returns zero approved rows, the engine renders an explicit empty/error state rather than substituting any bundled placeholder list (BR-025, NFR-07).

### 4.5 Failure semantics
| Condition | Required behavior |
|---|---|
| Section query returns 0 rows | Explicit "content not available" state (BR-025) — never a hardcoded substitute |
| Current time falls outside every section's window | Explicit "no active wird" state — never nearest-match fallback |
| Server function write fails (offline) | Queue locally, flush on reconnect (BR-028); UI shows a pending/sync indicator, not a silent failure |
| Server function write fails (online, server error) | Surface a visible error; do not mark local progress as synced |
| Realtime subscription drops | Rely on the PocketBase SDK's built-in automatic reconnect/resubscribe (confirmed SDK behavior) rather than hand-rolled reconnect logic |

→ **Deferred to LLD:** exact server-function signatures, the precise time-window comparison implementation (timezone/DST edge handling), the local-queue data structure and flush algorithm, retry/backoff policy, and the exact PocketBase query filters used for section resolution.


### 4.6 Active-session transfer model
- The server stores active device/session ownership, a monotonically increasing revision, and last-confirmed progress.
- A second device must explicitly choose “continue here”; this increments the revision and invalidates writes from the previous owner.
- Writes include the expected revision and are idempotent. Stale writes are rejected and trigger a refresh rather than overwriting newer state.
- Offline progress may be reconciled only when it belongs to the current revision or through an explicit recovery flow.

### 4.7 Duration and continuity eligibility
- `dhikr_library.estimated_duration_seconds` represents an expected duration for one repetition.
- Derived expected time uses `estimated_duration_seconds × count_target`, with a generous tolerance band.
- Suspiciously fast completion is stored privately but excluded from public continuity scoring. The UI uses neutral, non-accusatory language.

### 4.8 Travel and location transition
- Location/timezone changes are detected only with permission and confirmed by the user before updating the account.
- Confirmed changes update future prayer times, Qibla, reminders, and remaining section windows.
- Historical days and already completed sections are immutable. The transition day retains completed sections and evaluates only remaining sections under the new location.

## 5. Data Model (high-level)

**Decision (per BRD §2.3/§7, NFR-09): the PocketBase schema is inherited, not redesigned.** The frontend migration does not justify unrelated schema changes, but approved additive requirements such as duration metadata and active-session transfer are versioned migrations. The domains below are carried over from the codebase inventory; per BRD open question #4, exact field types/constraints/API rules must still be confirmed against the live instance (not re-litigated here).

| Domain | Collection(s) | Notes |
|---|---|---|
| Identity | `users` (PB auth) | Profile + all personalization fields live directly on the user record (no separate preferences collection) |
| Authorization | `admins` | Role (`admin`/`super_admin`), scoped `permissions`, `is_active` — the actual enforcement boundary is PB API rules referencing this collection, not client code (BR-018) |
| Delegation | `delegation` | Time-boxed permission grants; must be *consumed* by API rules, not just stored |
| Active session | `active_sessions` or equivalent versioned fields | One active owner per user, device transfer, revision, last-confirmed progress, stale-write rejection |
| Weekly intention/report | derived and/or dedicated records | Personal intention and weekly summaries; no public detailed comparison |
| Dhikr content | `dhikr_library` | Content catalog gated by `approved`; adds `estimated_duration_seconds` and optional reviewed audio metadata |
| Activity | `user_activity` | One row per user per day; source of continuity, grid, weekly report, and opt-in public board. Raw counts are not a ranking input. |
| Self-reflection | `muhasaba` | Owner-only text, server persisted, unavailable to admins/super-admins |
| Community board | `tickets`, `ticket_comments` | Public visibility with anonymized submitter identity (BR-014) |
| Audit | `audit_log` | Server-only writes, append-only, no local-only fallback (BR-019) |
| Removed | `templates` (was `studio.html`-only) | To be dropped or explicitly retained per BRD open question #5 — not part of this HLD's carried-over model |

→ **Deferred to LLD:** every field name/type/constraint, relation cardinality, index, and the exact PocketBase API rule expression per collection (this is the direct successor to BRD open questions #3 and #4).

## 6. Authentication & Authorization

**Locked decisions:**
- Auth: PocketBase email/password plus Google OAuth. Google-only accounts are valid; users may add a password later.
- Authz enforcement point: **must be PocketBase API rules**, not the client-side role check currently used as a UX gate in `admin.html`/`super-admin.html` (BR-018, NFR-02). The client-side check remains as a UX convenience (avoid flashing admin UI to non-admins) but is never the security boundary.
- **Delegation must be enforced, not just stored (BR-017).** The corrected design: PocketBase API rules for admin-gated collections/actions must be composed to check *either* an active `admins` record *or* an active, non-expired `delegation` record scoped to the relevant permission (`tickets`/`content`/`users`) — e.g. a rule resolving "does this caller currently have `content` capability" by checking both sources, rather than only the `admins` table. This closes the gap where delegation records exist but grant nothing.
- Session handling: PocketBase SDK's own `authStore`, carried through TanStack Start's server functions via a request-scoped client (not a shared global instance, per §4.4's SSR-safety note).
- Silent refresh: preserved from the current app's pattern (401 → refresh → retry once → force logout on second failure).

**Admin/Super-admin/Delegation resolution (conceptual, not rule-level):**
```
On any privileged server function call:
  1. Resolve caller's identity from the PocketBase auth token (server-side).
  2. Check: does an active `admins` record grant this permission? → allow.
  3. Else, check: does an active, non-expired `delegation` record grant this permission
     to this user right now? → allow.
  4. Else → deny, regardless of what the client believed its own role to be.
```
This is the same shape whether expressed as a PocketBase collection API rule or a server-function-side check backed by both collections — the exact expression is LLD scope.

→ **Deferred to LLD:** exact PocketBase API rule syntax per collection/action, the delegation-lookup query shape, session-token refresh implementation detail, and how the client-side UX gate is kept in sync with (but never substituted for) the server-side rule.

## 7. Theming, RTL & Accessibility

- Theming: Brand Identity v3 (single-theme, Arabic-only) is the token source; no multi-theme switcher is required (per prior decision — Waqfa's palette is not changing as part of this migration).
- i18n/RTL: Arabic-only, full RTL via logical properties, Arabic numerals, and approved typography.
- Accessibility: target WCAG 2.2 AA for core routes, including keyboard operation, focus visibility, text scaling, large targets, screen-reader semantics, reduced motion, and a dedicated large-text mode.
- Focus mode: session routes suppress non-essential navigation and interruptions, with optional wake lock where supported.

→ **Deferred to LLD:** component-level RTL/logical-property conventions, exact token consumption pattern in React (CSS variables vs. a token module), Arabic-numeral formatting utility placement.

## 8. Audit & Content Governance

- **Audit logging (BR-019):** every privileged server function call (admin/super-admin actions) writes to `audit_log` server-side, with no client-side or local-memory-only fallback — this closes the current gap where a failed server write could leave an audit event existing only in one browser tab.
- **Content governance (BR-012, BR-013):** the `dhikr_library.approved` gate remains the sole publication mechanism; this HLD does not introduce any new ingestion path, and explicitly forbids any live third-party religious-content API call at runtime, preserving the existing offline batch-review workflow.

→ **Deferred to LLD:** exact audit-log write points (which server functions log what), retry semantics for a failed audit write, and the CSV export query.

## 9. Deployment Architecture

- Containerization and infrastructure conventions are unchanged from the current app: Docker on owned Proxmox/LXC, PocketBase self-hosted, no new external dependency introduced by the frontend migration (NFR-01, NFR-09).
- Domain split preserved: `my.waqfa.app` (authenticated app) and `waqfa.app` (public landing page, "Waqfa 04") remain two distinct route trees/deployment targets, as already decided.
- The TanStack Start server process replaces the current static-file-serving model for the authenticated app; the landing page may remain a simpler static/SSR target depending on its own complexity (LLD-level decision).

→ **Deferred to LLD/runbook:** exact compose/service layout, environment variables, build/deploy steps for the TanStack Start server, and whether the landing page shares the same deployable or is fully separate.

## 10. Cross-Cutting Concerns

| Concern | Approach | Traces |
|---|---|---|
| Security | Server-side-verified authz for every privileged action; no client-trusted role; no raw tokens in `localStorage` anywhere (the removed `studio.html` was the only offender) | BR-018, BR-020, NFR-02, NFR-03 |
| Reliability | No silent local-only fallbacks for audit or Muhasaba; explicit error/empty states over hardcoded substitutes | BR-011, BR-019, BR-025, NFR-04, NFR-07 |
| Performance | Session-tap feedback stays instant (client-side); PocketBase writes remain batched/periodic, not per-tap | NFR-08 |
| Portability | Frontend migration introduces zero PocketBase schema change | BR-026, NFR-09 |
| Consistency | Single canonical app-version source, referenced everywhere version is shown | BR-024, NFR-06 |
| Religious integrity | No runtime third-party content API; committee-approval gate is the only publication path | BR-012, BR-013 |
| i18n/RTL | Arabic-only, RTL throughout, Arabic numerals preserved | BR-027, NFR-05 |
| Accessibility | WCAG 2.2 AA target, large-text mode, reduced motion, keyboard and assistive-technology support | BR-030, BR-039, NFR-10 |
| Multi-device | One active session owner, revision-safe transfer, stale-write rejection | BR-029, NFR-12 |
| Privacy | Owner-only Muhasaba; opt-in anonymized continuity board; confirmed location changes only | BR-010, BR-011, BR-033, NFR-11, NFR-13 |
| Respectful UX | No shame, accusation, raw-count competition, or excessive interruption | BR-023, BR-032, BR-037, NFR-14 |

## 11. LLD Backlog (next documents)

Ordered by complexity/risk:

1. **LLD-01 — Dhikr Session, Time-Window & Cross-Device Engine** (core/deep LLD, priority #1): section-resolution algorithm detail, timezone/DST edge cases for the 02:00 boundary, local-queue/flush data structures, server-function signatures, failure-state enum.
2. **LLD-02 — PocketBase Schema Confirmation & Migration Notes**: field-by-field confirmation against the live instance (types, constraints, indexes, relations), resolution of the `templates`/`studio.html` removal, and any TanStack-Start-side data-client typing.
3. **LLD-03 — Auth, RBAC & Delegation Enforcement**: exact PocketBase API rule expressions for admin/super_admin/delegation-aware access, session/token handling inside TanStack Start server functions.
4. **LLD-04 — Theming, RTL & Accessibility for React**: tokens, focus mode, large-text mode, keyboard/screen-reader behavior, reduced motion, Arabic numerals.
5. **LLD-05 — Audit Logging & Content-Approval Workflow**: exact write points, retry semantics, CSV export query, `dhikr_library.approved` admin-queue flow.
6. **LLD-06 — Authentication & Account Linking**: email/password, Google OAuth, identity linking, duplicate-account prevention, recovery.
7. **LLD-07 — Notifications, Travel & Location**: adaptive reminders, DND, confirmed travel changes, transition-day handling.
8. **LLD-08 — Weekly Insights, Intentions & Continuity Board**: scoring, opt-in privacy, weekly report, gentle return.
9. **LLD-09 — Deployment Runbook**: TanStack Start server + PocketBase compose layout, landing-page deployment shape, environment/secrets handling.

## 12. Open Questions (resolve during LLD)

1. Exact PocketBase API rule syntax for composing "admin OR active delegation" authorization checks (§6) — needs to be written and tested against the real instance, not just designed conceptually here.
2. Whether the landing page (`waqfa.app`) shares the TanStack Start deployable with the authenticated app or is deployed as a fully separate, simpler target (§9).
3. Field-level schema confirmation for every collection (carried over from BRD open question #4) — blocks precise LLD-01/02 work until the live instance is reachable.
4. Disposition of the `templates` collection once `studio.html` is removed (carried over from BRD open question #5).
5. Concrete single-source-of-truth mechanism for the app version string (carried over from BRD open question #6) — e.g. a build-time constant vs. a shared config module imported everywhere version is rendered.
6. Whether the content review committee's batch-review workflow needs any tooling change as part of this migration, or remains entirely outside the app (current assumption: entirely outside, manual import only).
7. Exact active-session schema and revision protocol.
8. Exact continuity scoring formula and duration tolerance bands.
9. Location-change threshold and device/browser support strategy.
10. Audio asset format, storage, caching, and offline policy.

---

*End of HLD v1.0. Next: LLD documents per §11, starting with LLD-01 (Dhikr Session & Time-Window Engine).*
