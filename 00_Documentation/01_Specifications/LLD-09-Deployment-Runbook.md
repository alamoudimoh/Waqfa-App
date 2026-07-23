# LLD-09 — Deployment Runbook

> **Project:** Waqfa (وقفة)  
> **Document family:** Low-Level Design v1.0  
> **Source chain:** BRD-Waqfa-v1.1 → HLD-Waqfa-v1.1 → this LLD  
> **Status:** Implementation-ready draft except items marked VERIFY AGAINST LIVE POCKETBASE.  
> **Change rule:** Product behavior changes require BRD revision; architecture changes require HLD revision.

## Traceability
**BRD:** BR-020–022, BR-024, BR-026; NFR-01, 06, 09.  
**HLD:** §9–10, §11.9, §12.2/5.

## Topology
waqfa.app serves the deferred landing surface; my.waqfa.app serves TanStack Start; PocketBase remains private/self-hosted behind owned Proxmox/LXC Docker infrastructure. Client SSE access is exposed only as required for authenticated realtime.

## Pending decision
Choose one deployable with separate route trees/domains or separate landing and app deployables. Authenticated app work may proceed while landing remains deferred and documented.

## Environment
PocketBase internal/public realtime URLs, app origins, OAuth configuration, app version, environment name and optional notification settings. Validate at startup. Secrets are runtime-injected and never committed.

## Release
Backup; immutable images tagged by commit/release; tests; staging migration; smoke tests; deploy; production migration; health/realtime/version verification; retain previous image and backup.

## Rollback
Application uses previous image. Schema rollback requires tested reverse migration or backup restoration. Pending mutations remain compatible across one release boundary or fail recoverably.

## Version
One build-generated version source from package metadata plus commit SHA, consumed by UI, logs, diagnostics and cache naming.

## Operations
TLS; restricted PocketBase admin; rate/request limits; structured privacy-safe logs; encrypted backups and restore drills; health checks; confirm studio.html and route/assets are absent.
