# Database Naming Standard — Waqfa

> **Applies to:** PocketBase collections, fields, indexes, migrations, hooks, exports, and application constants
> **Authority:** mandatory project-wide database rule
> **Related:** HLD §5–6, LLD-02, LLD-09, ADR-001

## 1. Non-negotiable isolation rule

Waqfa must not create, depend on, or reuse any generic application collection in PocketBase.

Every Waqfa-owned collection name must begin with:

```text
waqfa_
```

This rule includes the authentication collection. Waqfa must use:

```text
waqfa_users
```

It must not use a generic `users` collection or any generic collection owned by another project.

## 2. Prohibited collection names

The following names are prohibited for Waqfa because they are unscoped:

```text
users
admins
delegation
dhikr_library
user_activity
active_sessions
muhasaba
weekly_intentions
tickets
ticket_comments
audit_log
notification_settings
settings
content_assets
```

Project code, migrations, API rules, hooks, documentation, and tests must not reference these names as live collection identifiers.

## 3. Canonical collection names

The proposed Waqfa collection namespace is:

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

The final list remains subject to verified LLD-02 schema work. Any addition must retain the `waqfa_` prefix.

## 4. Naming syntax

### Collections

```text
waqfa_<plural_entity>
```

Rules:

- lowercase snake_case;
- plural entity name;
- mandatory `waqfa_` prefix;
- no provider name in product-facing names;
- no ambiguous abbreviations.

### Fields

Use lowercase snake_case.

Examples:

```text
is_active
is_approved
is_public
has_audio
starts_at
expires_at
completed_at
last_synced_at
business_date
owner_device_id
```

### Relations

PocketBase relation fields use the entity role, not a synthetic `_id` suffix:

```text
user
ticket
section
granted_by
parent_comment
```

Use `_id` only when a value is intentionally stored as plain text rather than as a PocketBase relation.

### Booleans

Use `is_`, `has_`, or another explicit predicate:

```text
is_active
is_approved
has_audio
```

### Timestamps

Use `_at` for date-time values and `_date` for business dates:

```text
started_at
transferred_at
revoked_at
business_date
```

## 5. Environment isolation

### Development

Manage-Hub may use the existing development PocketBase container `Dev-Backend`, provided that:

- every Waqfa collection uses `waqfa_`;
- no Marsid or other project collection is renamed, reused, or modified for Waqfa;
- Waqfa migrations are scoped and reviewed before application;
- a backup exists before destructive schema operations.

### Production

Production is completely isolated in the dedicated Waqfa LXC:

- dedicated PocketBase container;
- dedicated `pb_data`;
- dedicated migrations and hooks;
- dedicated secrets and superuser access;
- dedicated backup and restore process;
- no Marsid or other project collections or runtime data.

The `waqfa_` prefix remains mandatory in production even though the runtime is isolated.

## 6. Migration source of truth

Every durable schema change must be represented by a versioned migration under:

```text
infrastructure/pocketbase/pb_migrations/
```

Manual dashboard changes are not authoritative until the corresponding migration is generated, reviewed, committed, and validated.

Migration filenames must be chronological and descriptive, for example:

```text
1700000001_create_waqfa_users.js
1700000002_create_waqfa_dhikr_library.js
1700000003_create_waqfa_user_activity.js
```

Every migration must record:

- purpose;
- affected collections;
- requirement or architecture trace;
- destructive impact, if any;
- backup requirement;
- rollback or restoration strategy.

## 7. Application constants

Collection names must be defined once in a typed project database package and imported by application code. Direct string literals distributed across routes, hooks, and server functions are prohibited.

Target location:

```text
packages/database/src/collections.ts
```

Example shape:

```ts
export const WAQFA_COLLECTIONS = {
  users: "waqfa_users",
  admins: "waqfa_admins",
  dhikrLibrary: "waqfa_dhikr_library",
} as const;
```

## 8. Validation gate

Before merging any database change, verify:

- no generic Waqfa collection names exist;
- no `marsid_*` collection is touched;
- all new collections start with `waqfa_`;
- API rules reference the prefixed names;
- migrations and documentation agree;
- tests use the same canonical constants;
- production data remains isolated.

A violation of the prefix rule blocks merge and deployment.
