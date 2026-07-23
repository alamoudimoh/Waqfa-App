# LLD-02 — PocketBase Schema Confirmation & Migration Notes

> **Project:** Waqfa (وقفة)  
> **Document family:** Low-Level Design v1.1  
> **Source chain:** BRD-Waqfa-v1.1 → HLD-Waqfa-v1.1 → this LLD  
> **Status:** Implementation-ready draft except items marked VERIFY AGAINST LIVE POCKETBASE.  
> **Change rule:** Product behavior changes require BRD revision; architecture changes require HLD revision.

## Traceability

**BRD:** BR-001–019, BR-024–029, BR-033, BR-040; NFR-02–04, 09, 11–13.  
**HLD:** §5–6, §8, §11.2, §12.  
**Standard:** `00_Documentation/06_Database/DATABASE-NAMING-STANDARD.md`.

## Mandatory discovery gate

Before implementation export the live collections, fields, required/unique flags, relations, indexes, all list/view/create/update/delete rules, auth providers and installed migrations/hooks. Until then this document is a proposed contract, not a statement of the live schema.

## Mandatory namespace rule

Every Waqfa-owned PocketBase collection must start with `waqfa_`.

The authentication collection is `waqfa_users`. Waqfa must not use the generic `users` collection, any other generic application collection, or any collection owned by Marsid or another project.

A generic collection name is a merge and deployment blocker.

## Required collections

Proposed canonical names:

```text
waqfa_users
waqfa_admins
waqfa_delegations
waqfa_dhikr_library
waqfa_user_activity
waqfa_active_sessions
waqfa_session_mutations
waqfa_muhasaba
waqfa_weekly_intentions
waqfa_tickets
waqfa_ticket_comments
waqfa_audit_logs
waqfa_content_assets
waqfa_notification_settings
waqfa_user_wards
waqfa_prayer_settings
waqfa_device_sessions
```

The exact final collection set remains subject to live schema confirmation and implementation review. Any additional collection must retain the `waqfa_` prefix.

## Critical proposed fields

- `waqfa_active_sessions`: user, section, business_date, owner_device_id, revision, mode, progress_json, status, started_at, transferred_at.
- `waqfa_delegations`: user, permissions, valid_from, valid_to, is_active, granted_by, revoked_at.
- `waqfa_dhikr_library`: section/category, Arabic text, source/attribution, target count, order, time_start, time_end, approved, estimated_duration_seconds, optional audio relation.

Relation-field names remain semantic (`user`, `ticket`, `section`, `granted_by`) and do not receive `_id` unless the value is intentionally stored as text rather than as a PocketBase relation.

## Constraints

- Owner-only `waqfa_muhasaba` access.
- Approved-only `waqfa_dhikr_library` visibility.
- Anonymous public projection for continuity and ticket surfaces.
- Non-negative valid progress.
- Monotonic active-session revision.
- One active session per user/business date as supported by the verified PocketBase version.
- No Waqfa API rule, hook, migration, or application query may reference a generic collection identifier.
- No `marsid_*` collection may be modified or reused by Waqfa.

## Environment isolation

### Development

Manage-Hub may use the existing `Dev-Backend` PocketBase container. Isolation is enforced by the `waqfa_` collection namespace, scoped migrations, project-specific API rules, and verified backups before destructive operations.

### Production

The Waqfa LXC uses a dedicated PocketBase container, data directory, migrations, hooks, credentials, and backup process. Production has no dependency on Manage-Hub, Marsid, or any other project's runtime data.

The `waqfa_` prefix remains mandatory in production.

## Migration rules

- Migrations are the authoritative schema history.
- Store them under `infrastructure/pocketbase/pb_migrations/`.
- Additive changes are preferred.
- Destructive changes require backup, staging rehearsal, explicit rollback/restoration strategy, and approval.
- Manual dashboard changes are incomplete until represented by a reviewed and committed migration.
- Every migration records version, reason, affected `waqfa_*` collections, BRD/HLD trace, destructive impact, and rollback status.
- Migration filenames are chronological and descriptive, such as `1700000001_create_waqfa_users.js`.

## Application collection constants

Collection identifiers must be defined once in the project database package and imported by all application code. Distributed string literals are prohibited.

Target location:

```text
packages/database/src/collections.ts
```

## Closure deliverables

- `pocketbase-schema-export.json`;
- `api-rules-before.md`;
- `api-rules-after.md`;
- versioned `waqfa_*` migrations;
- discrepancy table: proposed versus live;
- schema test database;
- automated check proving no generic or cross-project collection name is referenced.
