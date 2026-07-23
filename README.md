# Waqfa — LLD Document Set

> **Project:** Waqfa (وقفة)  
> **Document family:** Low-Level Design v1.0  
> **Source chain:** BRD-Waqfa-v1.1 → HLD-Waqfa-v1.1 → this LLD  
> **Status:** Implementation-ready draft except items marked VERIFY AGAINST LIVE POCKETBASE.  
> **Change rule:** Product behavior changes require BRD revision; architecture changes require HLD revision.

## Documents

| ID | File | Scope |
|---|---|---|
| LLD-01 | LLD-01-Dhikr-Session-Engine.md | Session, time windows, 02:00 reset, offline queue, transfer |
| LLD-02 | LLD-02-PocketBase-Schema.md | Schema, indexes, migrations, API-rule inventory |
| LLD-03 | LLD-03-Auth-RBAC-Delegation.md | RBAC and delegation enforcement |
| LLD-04 | LLD-04-RTL-Accessibility.md | Tokens, RTL, focus mode, WCAG |
| LLD-05 | LLD-05-Audit-Content-Governance.md | Audit and content approval |
| LLD-06 | LLD-06-Authentication-Linking.md | Email/password, Google OAuth, linking |
| LLD-07 | LLD-07-Notifications-Travel-Location.md | Reminders, DND, travel, location |
| LLD-08 | LLD-08-Insights-Intentions-Continuity.md | Weekly insights, intentions, continuity board |
| LLD-09 | LLD-09-Deployment-Runbook.md | Docker, domains, secrets, release/rollback |
| Matrix | TRACEABILITY-MATRIX.md | BRD → HLD → LLD mapping |

## Execution order

1. Export the live PocketBase schema and API rules read-only.
2. Finalize LLD-02, then LLD-03.
3. Implement and test LLD-01 before secondary modules.
4. Implement LLD-04 through LLD-08.
5. Use LLD-09 for staging and production.

No LLD silently resolves an HLD open question by assumption.
