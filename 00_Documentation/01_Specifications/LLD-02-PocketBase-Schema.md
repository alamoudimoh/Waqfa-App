# LLD-02 — PocketBase Schema Confirmation & Migration Notes

> **Project:** Waqfa (وقفة)  
> **Document family:** Low-Level Design v1.0  
> **Source chain:** BRD-Waqfa-v1.1 → HLD-Waqfa-v1.1 → this LLD  
> **Status:** Implementation-ready draft except items marked VERIFY AGAINST LIVE POCKETBASE.  
> **Change rule:** Product behavior changes require BRD revision; architecture changes require HLD revision.

## Traceability
**BRD:** BR-001–019, BR-024–029, BR-033, BR-040; NFR-02–04, 09, 11–13.  
**HLD:** §5–6, §8, §11.2, §12.

## Mandatory discovery gate
Before implementation export the live collections, fields, required/unique flags, relations, indexes, all list/view/create/update/delete rules, auth providers and installed migrations/hooks. Until then this document is a proposed contract, not a statement of the live schema.

## Required collections
users; admins; delegation; dhikr_library; user_activity; active_sessions; optional session_mutations/idempotency ledger; muhasaba; weekly_intentions; tickets; ticket_comments; audit_log; optional content_assets.

## Critical proposed fields
- active_sessions: user, section, business_date, owner_device_id, revision, mode, progress_json, status, started_at, transferred_at.
- delegation: user, permissions, valid_from, valid_to, is_active, granted_by, revoked_at.
- dhikr_library: section/category, Arabic text, source/attribution, target count, order, time_start, time_end, approved, estimated_duration_seconds, optional audio relation.

## Constraints
Owner-only Muhasaba; approved-only content visibility; anonymous public projection; non-negative valid progress; monotonic revision; one active session per user/business date as supported by the verified PocketBase version.

## Migration rules
Additive by default. Destructive changes need backup, staging rehearsal and rollback. Decide templates collection disposition after confirming no studio.html consumers. Every migration records version, reason, BRD/HLD trace and rollback status.

## Closure deliverables
pocketbase-schema-export.json; api-rules-before.md; api-rules-after.md; versioned migrations; discrepancy table proposed-vs-live; schema test database.
