# LLD-05 — Audit Logging & Content-Approval Workflow

> **Project:** Waqfa (وقفة)  
> **Document family:** Low-Level Design v1.0  
> **Source chain:** BRD-Waqfa-v1.1 → HLD-Waqfa-v1.1 → this LLD  
> **Status:** Implementation-ready draft except items marked VERIFY AGAINST LIVE POCKETBASE.  
> **Change rule:** Product behavior changes require BRD revision; architecture changes require HLD revision.

## Traceability
**BRD:** BR-012–013, BR-015–019, BR-025; NFR-04, 07.  
**HLD:** §8, §10, §11.5.

## Audit contract
Store actor, authorization source, optional delegation, action, resource type/id, safe before/after metadata, requestId and occurredAt. Never log tokens, passwords or private Muhasaba text.

## Semantics
Privileged mutation and audit are one user-visible operation. No browser-memory fallback. requestId makes retries idempotent. Audit is append-only. A business-write/audit-write inconsistency must become an explicit reconciliation alert.

## Audited actions
Content approval/publication; ticket triage; user suspension; admin lifecycle; permission changes; delegation grant/revoke; protected exports.

## Content workflow
Batch source → committee review outside runtime → manual import as draft/unapproved → admin queue → approval metadata → approved visibility. Runtime third-party religious-text APIs and hardcoded frontend fallbacks are prohibited.

## Export
Server-side filtered CSV with authorization, limits and spreadsheet-formula injection protection.

## Tests
Unauthorized audit denial; audit for every privileged mutation; retry idempotency; failed-audit reconciliation; unapproved content hidden; private text absent.
