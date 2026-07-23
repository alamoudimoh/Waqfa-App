# Waqfa — BRD/HLD/LLD Traceability Matrix

> **Project:** Waqfa (وقفة)  
> **Document family:** Low-Level Design v1.0  
> **Source chain:** BRD-Waqfa-v1.1 → HLD-Waqfa-v1.1 → this LLD  
> **Status:** Implementation-ready draft except items marked VERIFY AGAINST LIVE POCKETBASE.  
> **Change rule:** Product behavior changes require BRD revision; architecture changes require HLD revision.

| BRD area | HLD | LLD |
|---|---|---|
| Dashboard/daily plan/activity | §3.1, §5 | 02, 08 |
| Session/counting/reading/next wird | §4 | 01 |
| Reset/time windows/offline/transfer | §4.2–4.6 | 01, 02 |
| Settings/prayer/location/reminders | §3.1, §4.8 | 02, 07 |
| Muhasaba/intentions/privacy | §3.1, §5, §10 | 02, 08 |
| Tickets/Kanban | §3.1, §5 | 02, 03, 05 |
| Admin/delegation | §3, §6 | 03 |
| Content approval | §3.2, §8 | 02, 05 |
| Authentication/linking | §3.2, §6 | 06 |
| RTL/accessibility/focus/large text | §7 | 04 |
| Continuity/scoring/respectful UX | §4.7, §10 | 08 |
| Audit | §8 | 05 |
| Migration/deployment/version | §1–2, §9 | 09 |

## Unresolved inherited gates
Live schema/rules; exact delegation rule syntax; templates disposition; landing deployment shape; version mechanism; active-session protocol validation; scoring tolerance; location threshold; audio storage/caching. These are assigned to LLDs and not assumed resolved.
