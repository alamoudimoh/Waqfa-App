# Waqfa — BRD/HLD/LLD Traceability Matrix

> **Project:** Waqfa (وقفة)  
> **Document family:** Architecture and Low-Level Design v1.1  
> **Source chain:** BRD-Waqfa-v1.1 → HLD-Waqfa-v1.1 → ADR/LLD set  
> **Status:** Implementation-ready draft except items marked for live verification.  
> **Change rule:** Product behavior changes require BRD revision; architecture changes require HLD and ADR review.

| BRD area | HLD | ADR / LLD / operational document |
|---|---|---|
| Dashboard/daily plan/activity | §3.1, §5 | LLD-02, LLD-08 |
| Session/counting/reading/next wird | §4 | LLD-01 |
| Reset/time windows/offline/transfer | §4.2–4.6 | LLD-01, LLD-02 |
| Settings/prayer/location/reminders | §3.1, §4.8 | LLD-02, LLD-07 |
| Muhasaba/intentions/privacy | §3.1, §5, §10 | LLD-02, LLD-08 |
| Tickets/Kanban | §3.1, §5 | LLD-02, LLD-03, LLD-05 |
| Admin/delegation | §3, §6 | LLD-03 |
| Content approval | §3.2, §8 | LLD-02, LLD-05 |
| Authentication/linking | §3.2, §6 | LLD-06 |
| RTL/accessibility/focus/large text | §7 | LLD-04 |
| Continuity/scoring/respectful UX | §4.7, §10 | LLD-08 |
| Audit | §8 | LLD-05 |
| Migration/deployment/version | §1–2, §9–10 | ADR-001, LLD-09 |
| Development environment separation | §9.1–9.3 | ADR-001, DEVELOPMENT-GUIDE, INFRASTRUCTURE |
| Git source-control governance | §9.1–9.4, §10 | ADR-001, GIT-STANDARDS, DEVELOPMENT-GUIDE |
| Production runtime isolation | §9.2–9.5 | ADR-001, LLD-09, INFRASTRUCTURE |
| Secrets and deployment access | §9.3–9.4, §10 | LLD-09, SECRETS-AND-ACCESS |
| Backup, restore, rollback | §9.4, §10 | LLD-09, INFRASTRUCTURE |

## Architecture decision trace

| Decision | Source | Implementation detail |
|---|---|---|
| Manage-Hub is the development workspace | ADR-001 | DEVELOPMENT-GUIDE, INFRASTRUCTURE |
| GitHub is the authoritative source of truth | ADR-001 | GIT-STANDARDS, DEVELOPMENT-GUIDE |
| Waqfa LXC is the isolated runtime | ADR-001 | LLD-09, INFRASTRUCTURE |
| Production uses traceable versioned artifacts | HLD §9.4, ADR-001 | LLD-09 |
| Secrets remain outside Git | HLD §9.4, ADR-001 | SECRETS-AND-ACCESS, LLD-09 |
| Direct production editing is prohibited | HLD §9.3, ADR-001 | DEVELOPMENT-GUIDE, LLD-09 |

## Unresolved inherited gates

- Live PocketBase schema and API rules.
- Exact delegation rule syntax.
- Former templates/studio artifact disposition.
- Final landing deployable shape.
- Canonical application-version implementation.
- Active-session protocol validation.
- Continuity scoring tolerance.
- Location threshold.
- Audio storage and caching.
- Live LXC identifiers, storage paths, networks, reverse proxy, DNS, backup destination, and deployment credentials.

These gates are assigned to the relevant LLD or infrastructure document and must not be silently assumed.
