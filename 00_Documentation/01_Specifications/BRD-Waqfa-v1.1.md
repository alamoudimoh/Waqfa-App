# Business Requirements Document — Waqfa (وقفة)

> **Document type:** Lean BRD · **Requirement method:** MoSCoW
> **Project:** Waqfa — Arabic-only Islamic dhikr/wird productivity PWA
> **Owner:** Mohammed Alamoudi
> **Status:** Draft v1.1 · Expanded product baseline for an existing, live application
> **License intent:** Not open-source (private repo, `alamoudimoh/Waqfa-App`)

## 0. Document Control

| Field | Value |
|---|---|
| Version | 1.1 (expanded product baseline) |
| Basis | Read-only codebase inventory (`Devp-v0.1`, `PocketBase/Public`) + confirmed project memory + past conversation history |
| Requirement IDs | BR-001–047, NFR-01–14 (this document) |
| Change log | v1.1 — adds cross-device continuation, daily spiritual plan, focus/reading modes, adaptive reminders, travel handling, continuity protection, weekly insights, personal intentions, gentle return, enhanced library, large-text mode, optional reviewed audio, Google sign-in, private Muhasaba, and opt-in continuity board. |

**Provenance note:** Unlike a greenfield rebuild, Waqfa already exists and is live. This BRD treats the real, inventoried app as the baseline and treats every known gap or half-finished feature (Muhasaba persistence, delegation enforcement, admin authz verification, `studio.html`) as a **Must-have requirement to complete or resolve**, not as accepted debt — this is the first time these have been written down as formal requirements, so the bar is "correct and complete," not "as currently shipped." Where the inventory's schema is inferred from client code only (no live PocketBase schema was reachable), this is flagged inline.

## 1. Vision

Waqfa is an Arabic-only, self-hosted Islamic dhikr and wird companion that works across phone, tablet, and computer. It helps a Muslim complete the core daily adhkar in their intended windows, build long-term continuity, and return to remembrance gently throughout the day through a calm, distraction-free, productivity-app-quality experience. Social features exist only to encourage continuity and timely completion; raw repetition counts are never the goal.

**Guiding principles**
- **Religious integrity is non-negotiable.** No dhikr, hadith, ayah, or Ruqyah text enters the app without prior approval from the content review committee (لجنة). Live/runtime API sourcing of religious text is never acceptable — content is batch-fetched, human-reviewed, then manually imported.
- **Privacy by design.** No real names or emails are ever exposed publicly (leaderboard, tickets); users are represented by anonymous aliases.
- **Zero-hardcode, DB-driven content.** Dhikr sections, categories, and library content are rendered from PocketBase (`dhikr_library`), never hand-written into the frontend.
- **Transparency with the community.** Bug reports and feature suggestions are visible to all users on a public Kanban board, not filtered through a silent support inbox.
- **Calm, focused interaction.** The interface should support khushū' (خشوع) — no ads, no dark patterns, no unnecessary interruptions during a dhikr session.
- **Completion before competition.** The product rewards timely completion and continuity, not raw tap counts or excessive repetition.
- **Continue anywhere.** A user can begin on one device and continue from the latest confirmed state on another device using the same account.

## 2. Scope

### 2.1 In Scope
- The authenticated PWA app (`my.waqfa.app`): daily spiritual plan, dhikr counting/reading sessions, cross-device continuation, settings/personalization, prayer times + Qibla, continuity board, weekly self-reflection (Muhasaba), personal weekly intentions, reports, library, and public ticket/Kanban board.
- The public marketing/landing page (`waqfa.app`, workstream name "Waqfa 04") — including the day-cycle landing concept and niyyah dedication section.
- Admin and super-admin dashboards for content approval, ticket triage, user management, and time-boxed permission delegation.
- The `dhikr_library` content pipeline: sourcing → committee review → manual import → publish.
- Self-hosted backend (PocketBase) on owned infrastructure (Proxmox/LXC, Docker).
- The planned React 19 + TanStack Start frontend migration (architecture itself is HLD scope; this BRD states the migration as a constraint/requirement, not a design).

### 2.2 Out of Scope (this phase)
- `studio.html` ("Yaqeen Studio" page-builder) — to be **removed entirely**; it is unrelated to Waqfa's product surface, uses a different auth model, and is not part of this product going forward.
- Non-Arabic localization. Waqfa is Arabic-only by design; no English/bilingual UI is planned.
- Native mobile app-store builds (iOS/Android) — PWA/installable first; the experience must remain responsive across phone, tablet, and desktop.
- Public/open-source release of the repository.
- Live/real-time ingestion of religious content from any third-party API at runtime (permanently out of scope on religious-integrity grounds, not just this phase).
- The 30-day "challenges" feature, achievement-sharing via Web Share/Canvas, and full offline sync — these are explicitly deferred (previously tracked as v3.1/v3.2 ideas), not committed requirements of this BRD.

### 2.3 Assumptions
- Deployment target: owned Proxmox/LXC infrastructure, PocketBase in Docker, reachable via `my.waqfa.app` and `waqfa.app`.
- Target frontend stack: **React 19 + TanStack Start**, migrating from the current Vanilla JS + Tailwind implementation. Backend (PocketBase) is unaffected by this migration.
- Mohammed is the sole developer and super admin; there is no team beyond the content review committee (a review/approval function, not necessarily a coding role).
- Full architecture (migration approach, data-layer client, component structure) is HLD scope, not this BRD.

## 3. Stakeholders

| Stakeholder | Role | Interest |
|---|---|---|
| Owner (Mohammed) | Product owner, sole developer, super admin | Full control, religious accuracy, product quality |
| Content review committee (لجنة) | Religious content approval authority | Every piece of dhikr/hadith/ayah/Ruqyah text is accurate and properly attributed before publication |
| End users (Muslims using the app) | Primary users | A calm, private, reliable daily dhikr companion |
| Coding agents (Claude Code, GitHub Copilot) | Implementers | Precise, scoped, verifiable requirements grounded in the real codebase |

## 4. User Roles (canonical — as actually implemented)

Waqfa's role model is **not** the Admin/Co-Admin/User/Guest capability matrix used on other projects (e.g. Marsid) — it uses its own model, built around a dedicated `admins` collection layered on top of PocketBase's standard `users` auth collection:

| Role | Source | Intent |
|---|---|---|
| **Regular user** | `users` collection, no `admins` record | Full personal use: dhikr sessions, settings, private Muhasaba, continuity tracking, opt-in public continuity board, reports, and public ticket board. No administrative access. |
| **Admin** | `users` + `admins` record with `role = 'admin'`, `is_active = true` | Ticket triage, `dhikr_library` content-approval queue, user suspend/activate, read-only audit log. Scoped by `admins.permissions` (`tickets`/`content`/`users` booleans). |
| **Super admin** | `users` + `admins` record with `role = 'super_admin'`, `is_active = true` | Everything an admin can do, plus admin-account CRUD (create/toggle/permission-chips/expiry) and time-boxed delegation of admin-style permissions to a regular user. |

**Delegation model:** a super admin may grant a regular user temporary (`valid_from`/`valid_to`), permission-scoped (`tickets`/`content`/`users`) elevated access via a `delegation` record. This must actually grant runtime capability (see BR-017) — today it only creates the record with no enforcement.

## 5. Functional Requirements (MoSCoW)

### 5.1 MUST HAVE

| ID | Requirement |
|---|---|
| BR-001 | **Authenticated home dashboard.** On login, the user sees a personalized greeting, current/longest streak, a 12-week (84-day) activity contribution grid, and featured/favorite dhikr category cards. |
| BR-002 | **Dhikr counting session.** A dedicated session screen lets the user tap-count each dhikr item toward its target count, with visual progress (arc), audio/haptic feedback, adjustable font size, and keyboard support. |
| BR-003 | **Dynamic "next wird" resolution.** On session completion, the app determines the next scheduled section by current time and section `time_start`/`time_end` windows — never a hardcoded next-section mapping. |
| BR-004 | **Time-validated section selection.** The "next wird" and "resume" logic must only select a section whose `time_start`–`time_end` window contains the current time; a user must never be routed into أذكار النوم (or any section) outside its valid time window. *(Resolves the previously known session.html time-validation gap.)* |
| BR-005 | **Daily reset at 02:00 local time.** All counters and per-day progress reset at 02:00 device-local time; any saved progress older than the most recent 02:00 boundary is discarded, not carried over. |
| BR-006 | **Core + optional (ward) sections.** أذكار الصباح / المساء / النوم are core, always-present sections that cannot be removed from the daily plan; users may additionally commit to optional "ward" sections, which lock for exactly 7 days from commitment before they can be removed, with a visible countdown/progress indicator. |
| BR-007 | **Settings as single source of truth.** All user configuration (profile, ward commitments, prayer/location, theme/font/accent, notification schedule + DND, data export/deletion) lives in `settings.html`, stored in PocketBase on the `users` record — no `localStorage`-based configuration, and no other page redirects into settings except via the avatar menu. |
| BR-008 | **Prayer times + Qibla.** Compute prayer times (GPS or manual city) and a live Qibla compass bearing/distance to Mecca, with a selectable calculation method. |
| BR-009 | **12-week activity grid + streaks.** Visualize the last 84 days of activity with 4 intensity levels derived from `user_activity.total_count`/`level`, plus current-streak and longest-streak stats. |
| BR-010 | **Opt-in continuity board with anonymized identity.** Participation is disabled by default and enabled by explicit user choice. Ranking is based on timely completion and continuity, not raw dhikr counts. Only alias, continuity days, and high-level completion indicators may be public; detailed adhkar, counts, Muhasaba, location, and identity data remain private. |
| BR-011 | **Private weekly Muhasaba that persists to PocketBase.** The weekly self-review must write to `muhasaba` and be readable only by its owner. Admins and super admins cannot read, search, or export the text. Local-only fallback is not acceptable. |
| BR-012 | **Content review committee gate.** No dhikr, hadith, ayah, or Ruqyah text may be published to `dhikr_library` without prior committee approval; the `approved` flag must gate visibility, and the admin content-approval queue is the only path to publication. |
| BR-013 | **No live runtime religious-content APIs.** Religious content is sourced via offline batch-fetch → committee review → manual import; the running app must never call a third-party religious-content API directly at runtime. |
| BR-014 | **Public transparency board.** All bug reports and feature suggestions (`tickets`) are visible to every user, with per-ticket threaded comments (`ticket_comments`), while the submitter's identity is not publicly shown. |
| BR-015 | **Admin content-approval and ticket-triage dashboard.** Admins can review/approve/reject `dhikr_library` entries, triage tickets (status, notes, image-attached replies), and manage users (suspend/activate) — each gated by their specific `admins.permissions`. |
| BR-016 | **Super-admin account and delegation management.** Super admins can create/toggle admin accounts with per-section permissions and expiry, and grant time-boxed delegated permissions to a regular user. |
| BR-017 | **Delegation must actually grant runtime capability.** A user with an active, non-expired `delegation` record must be able to exercise the delegated permissions (`tickets`/`content`/`users`) at runtime — creating the record alone is insufficient. *(Resolves the known gap where delegation records exist but are never consumed.)* |
| BR-018 | **Server-enforced admin/super-admin authorization.** Access to admin and super-admin capabilities must be enforced by PocketBase collection API rules, not solely by client-side role checks; the client-side gate is UX only. This must be explicitly verified against the live PocketBase rules, not assumed from the client code. |
| BR-019 | **Audit logging.** Every privileged admin/super-admin action is recorded in `audit_log` (actor, action, target collection, before/after values, timestamp) — server-side, without a local-only fallback that can silently drop entries. |
| BR-020 | **Removal of `studio.html`.** The orphaned "Yaqeen Studio" page-builder tool — with its separate branding, raw-superuser-token auth model, and unrelated `templates` collection — is removed from the product entirely. |
| BR-021 | **Public landing page (waqfa.app / "Waqfa 04").** A day-cycle-themed marketing page at `waqfa.app`, structurally separate from the authenticated app at `my.waqfa.app`, introduces the product and links to the app. |
| BR-022 | **PWA installability.** The app is installable (manifest + service worker), with cache-first static-asset caching and pass-through for API/cross-origin requests. |
| BR-023 | **Adaptive reminder scheduling with Do Not Disturb.** Users configure per-section reminders and DND hours. Completed sections cancel later reminders; partially completed sessions may receive a gentle continuation reminder; repeated ignored reminders reduce rather than increase interruption; reminders remain bounded and respectful. |
| BR-024 | **Single source of truth for app version.** The app must expose one canonical version number, consistent across config, footer text, and cache-busting query strings — not the current mix of `3.0.0`/`3.6.0`/per-file `?v=` values. |
| BR-025 | **No silent content fallback across unrelated sections.** If a requested section's `dhikr_library` query returns no rows, the app must show an explicit "content not yet available" state — not silently substitute an unrelated hardcoded dhikr list. |
| BR-026 | **React 19 + TanStack Start migration.** The frontend is migrated from Vanilla JS to React 19 + TanStack Start, with the PocketBase backend retained; only product-approved, versioned schema additions may be introduced. *(Architecture of the migration itself is HLD scope.)* |
| BR-027 | **Arabic-only interface.** The entire app, admin panels, and landing page are Arabic-only, RTL — no bilingual/English mode is required or planned. |
| BR-028 | **Daily spiritual plan.** The home experience presents the user’s day as a clear sequence of core and committed sections, showing completed, current, upcoming, late, and out-of-window states, daily completion percentage, and the next meaningful pause. |
| BR-029 | **Cross-device continuation with one active session.** A user can begin on one device and continue on another from the latest confirmed item/count/progress state. Only one device may own the active session at a time; transferring the session must not lose, duplicate, or reduce progress. |
| BR-030 | **Focus mode for dhikr sessions.** During a session, non-essential navigation, social surfaces, tickets, updates, and unrelated prompts are hidden. The mode supports large controls, optional screen wake lock where available, and minimal interruption. |
| BR-031 | **Counting mode and reading mode.** Users may complete suitable content through tap-counting or a reading flow that presents the text and allows confirmation after a reasonable reading interval. Both modes write the same canonical completion state. |
| BR-032 | **Estimated reading duration.** Each `dhikr_library` item includes `estimated_duration_seconds` for one repetition. The system derives expected session duration from this value and `count_target`. Unrealistically fast completion may be excluded from public continuity scoring but must never erase personal progress or accuse the user. |
| BR-033 | **Travel and location-change confirmation.** When a meaningful location or timezone change is detected, the app asks the user to confirm updating city, coordinates, prayer times, Qibla, reminders, and future section windows. Previously completed sections and historical days are never recalculated. The transition day preserves completed sections and applies the new location only to remaining sections. |
| BR-034 | **Technical continuity protection.** Progress completed locally within the valid window remains eligible after delayed sync when failure was caused by connectivity, server outage, or device transfer. Technical faults must not unfairly break a continuity day. |
| BR-035 | **Weekly personal report.** The app summarizes completed days, section timing, committed optional wards, continuity, and the user’s own patterns without comparing private detail against other users. |
| BR-036 | **Personal weekly intention.** A user may choose a simple weekly intention such as improving evening adherence, maintaining the three core sections, or committing to one optional ward. It is personal, non-competitive, and editable for the next cycle. |
| BR-037 | **Gentle return after interruption.** After missed days, the app welcomes the user back without loss-framed or shaming language, preserves historical records, and helps restart from the current day. |
| BR-038 | **Enhanced dhikr library.** The library supports search within text, time/category filters, favorites, committed wards, recently opened content, and opening content outside its window. Out-of-window completion is stored personally but does not count as timely completion. |
| BR-039 | **Large-text accessibility mode.** A dedicated mode provides very large Arabic text, larger controls, stronger contrast, simplified session layout, and reduced non-essential motion for older users and distance viewing. |
| BR-040 | **Optional reviewed audio.** Approved audio may be attached to selected content for learning and listening, with playback controls and locally controlled hosting. Audio is optional and never sourced from an unreviewed runtime content API. |
| BR-041 | **Google authentication.** Users can register/sign in with Google OAuth in addition to email/password. Google-only accounts may exist without a password and may add one later. Matching email alone must not silently merge accounts; account linking requires a verified, controlled flow. |
| BR-042 | **Core-section completion model.** Morning, evening, and sleep adhkar are equal core sections. Each contributes one third of daily core completion; a full continuity day requires all three. Partial completion remains visible without shame language. |
| BR-043 | **Late completion.** Core or optional sections may be opened and completed after their window from the library. The completion is stored in personal history as out-of-window and does not count as timely completion or restore a missed full-continuity day. |

### 5.2 SHOULD HAVE

| ID | Requirement |
|---|---|
| BR-044 | **Offline pending-sync for dhikr progress.** If a dhikr-count update cannot reach PocketBase, it should queue locally and flush automatically once connectivity returns (existing pattern in `session.html`), applied consistently to any similar write path (e.g. Muhasaba once BR-011 is implemented). |
| BR-045 | **Weekly/12-week Muhasaba summary views.** Beyond the single weekly entry, a rollup view (e.g. the existing 12-week summary modal) should help a user reflect on longer-term patterns. |
| BR-046 | **CSV export of the audit log** for the super admin, as already implemented, should remain available and reflect only server-persisted entries once BR-019 is resolved. |
| BR-047 | **Automated tests** (unit and/or e2e) for the core session-counting, daily-reset, and next-wird-selection logic, given these are the app's highest-risk correctness paths and no tests currently exist. |

### 5.3 COULD HAVE

- Personal 30-day programs may be considered later only if they preserve Waqfa’s calm, non-competitive character.
- Shareable progress cards may be considered later, limited to high-level continuity and never detailed dhikr counts.
- Broader offline-first synchronization beyond the defined pending-sync and active-session transfer model may be considered later.

### 5.4 WON'T HAVE (this phase)

- `studio.html` / "Yaqeen Studio" page-builder — removed, not carried forward in any form.
- Bilingual (English) UI — Waqfa is Arabic-only by design.
- Live/runtime third-party religious-content APIs — permanently excluded on religious-integrity grounds, not a phased deferral.
- Native iOS/Android app-store builds.
- Open-source release of the repository.

## 6. Non-Functional Requirements

| ID | Category | Requirement |
|---|---|---|
| NFR-01 | Sovereignty | The app and its data run entirely on owned infrastructure (Proxmox/LXC + Docker + self-hosted PocketBase); no core function depends on an external cloud service. |
| NFR-02 | Security | Admin/super-admin authorization is enforced at the PocketBase API-rule layer, independent of client-side UI state (traces to BR-018). |
| NFR-03 | Security | No raw superuser or admin tokens are stored in `localStorage` by any part of the app (this pattern, currently present only in the removed `studio.html`, must not reappear elsewhere). |
| NFR-04 | Reliability | Privileged-action audit entries are never lost to a local-only fallback; if a server write fails, the action must be retried or surfaced as a visible error, not silently recorded only in-memory. |
| NFR-05 | i18n/RTL | Full right-to-left layout throughout, consistent with Arabic-only scope; no leftover LTR assumptions in layout or number formatting outside intentionally LTR data (e.g. embedded Latin text). |
| NFR-06 | Consistency | A single, unambiguous app version identifier is used everywhere version is displayed or referenced (traces to BR-024). |
| NFR-07 | Maintainability | Dhikr and religious content is never hardcoded in frontend files as a fallback; any missing content is an explicit empty/error state (traces to BR-025). |
| NFR-08 | Performance | Session-counting interactions (tap → visual/audio feedback) must feel instantaneous; PocketBase writes are batched/periodic (as currently implemented — every 5 taps + per-completion) rather than blocking the UI on every tap. |
| NFR-09 | Portability | The React 19 + TanStack Start migration must preserve the hosting model. Schema changes explicitly approved by product requirements, such as `estimated_duration_seconds` and session-transfer metadata, are allowed and must be versioned. |
| NFR-10 | Accessibility | Core user, admin, and landing-page flows target WCAG 2.2 AA: keyboard operation, sufficient contrast, visible focus, screen-reader semantics, large touch targets, text scaling, and reduced-motion support. |
| NFR-11 | Privacy | Muhasaba text is owner-only. Public continuity participation is opt-in and exposes only approved high-level anonymized indicators. |
| NFR-12 | Multi-device consistency | Cross-device session transfer is revision-safe and idempotent; stale devices cannot overwrite a newer confirmed session state. |
| NFR-13 | Location privacy | Location is checked only with user permission and is not continuously tracked. A detected change does not update the stored location without user confirmation. |
| NFR-14 | Respectful UX | The product avoids shame, accusation, loss-framing, excessive gamification, and interruptive reminders. Missed or suspiciously fast activity is handled neutrally and privately. |

## 7. Constraints

- Frontend target stack: React 19 + TanStack Start (migrating from Vanilla JS + Tailwind CSS).
- Backend: self-hosted PocketBase, unaffected by the frontend migration.
- Deployment: Docker on owned Proxmox/LXC infrastructure.
- Domain split: `waqfa.app` (public landing page, "Waqfa 04") vs. `my.waqfa.app` (the authenticated app).
- Git: `alamoudimoh/Waqfa-App` (private), scoped commits (no `git add -A`), `main` kept empty per current branch policy, active development on `Devp-v0.1`.
- All religious content changes must pass the content review committee before entering `dhikr_library`.
- Brand Identity v3 (Arabic-only) is the authoritative visual reference for all UI decisions.
- Arabic numerals applied comprehensively across the UI via `toArabicNumerals`.

## 8. Success Criteria

1. All BR-001–043 (Must) demonstrably work end-to-end against the live PocketBase instance, with no requirement satisfied only by a client-side/local fallback where server persistence was intended.
2. Admin and super-admin access is verified against actual PocketBase collection API rules, not assumed from client-side checks (BR-018 confirmed, not just implemented).
3. Muhasaba entries created in the UI are retrievable from the `muhasaba` PocketBase collection (BR-011 confirmed with a real read-back test).
4. A delegated user's granted permissions are observably usable at runtime for the duration of the delegation window, and revoked/expired outside it (BR-017 confirmed).
5. `studio.html` and its unique auth path are absent from the deployed app (BR-020 confirmed).
6. A single version string appears consistently across the app's config, UI footer, and asset cache-busting parameters (BR-024 confirmed).
7. The React 19 + TanStack Start frontend serves all Must-have functionality with controlled, versioned schema changes only where approved by this BRD.
8. A user can start a session on one device, transfer it to another, and continue without losing or duplicating progress.
9. Public continuity ranking excludes raw repetition counts and requires explicit opt-in.
10. Muhasaba text is verified inaccessible to admin and super-admin accounts.
11. Confirmed travel/location changes update future prayer and reminder behavior without rewriting historical completion.
12. Focus mode, reading mode, weekly report, gentle return, enhanced library, and large-text mode pass end-to-end acceptance tests.

## 9. Risks, Assumptions & Dependencies

| Type | Item | Note/Mitigation |
|---|---|---|
| Risk | Live PocketBase schema was not directly inspectable during inventory (no `pb_data/` or reachable admin API) — the schema in this BRD is inferred from client-side field references only | Verify field types, constraints, and existing API rules directly against the running PocketBase instance before or during HLD/LLD work; do not assume inferred types are exact |
| Risk | Admin/super-admin authorization may currently rely only on client-side checks in production, matching what the inventory found in the code | Treat BR-018/NFR-02 as unverified until the actual PocketBase collection rules are read and confirmed |
| Risk | Removing `studio.html` may affect any external workflow that currently depends on it (e.g. if it's used for building marketing pages) | Confirm nothing else consumes the `templates` collection or depends on `studio.html` being reachable before deletion |
| Assumption | The React 19 + TanStack Start migration will preserve the PocketBase hosting model and existing data domains, allowing only product-approved, versioned schema additions | To be confirmed in the HLD; flag immediately if migration work reveals a schema change is actually required |
| Dependency | Content review committee availability/cadence | Publication of new `dhikr_library` content is gated on committee throughput, not a technical dependency the app can resolve on its own |
| Risk | Cross-device writes may overwrite each other if the current JSON session record remains last-write-wins | Introduce active-session ownership, revision checks, and idempotent transfer semantics before enabling continuation across devices |
| Risk | `estimated_duration_seconds` may unfairly classify naturally fast readers | Use wide tolerance, apply it only to public scoring eligibility, and never erase personal completion |
| Risk | Location detection may surprise users or create privacy concerns | Require permission and explicit confirmation before updating stored location; do not continuously track |

## 10. Open Questions (to resolve in HLD)

1. Exact React 19 + TanStack Start architecture: routing approach, state management, and how the existing `API`/`pb` data-access layer (`config.js`) is restructured or preserved during migration.
2. Precise mechanism for enforcing delegation permissions at runtime (BR-017) — client-side capability check, server-side API-rule composition referencing `delegation`, or both.
3. Exact PocketBase API rules currently in force for `admins`-gated pages, to be confirmed rather than inferred (BR-018).
4. Field-level schema confirmation for every collection listed in this BRD (types, required/unique constraints, relation cardinality) once the live PocketBase instance/admin API is reachable.
5. Whether `templates` (used only by the now-removed `studio.html`) should be dropped from the schema entirely or retained for a possible future, properly-integrated page-builder.
6. Concrete plan and cutover strategy for fixing the app-version inconsistency (BR-024) — single source of truth location (e.g. one constant imported everywhere vs. build-time injection).
7. Exact active-session ownership, revision, transfer, and stale-device rejection model for BR-029.
8. Exact scoring formula and tolerance bands for continuity eligibility using `estimated_duration_seconds`, without exposing raw counts.
9. Location-change detection thresholds and transition-day semantics for BR-033.
10. Audio asset governance, storage, and download/offline policy for BR-040.

---

*End of BRD v1.0. Next artifact: HLD.*
