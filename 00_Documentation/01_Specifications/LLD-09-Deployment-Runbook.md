# LLD-09 — Deployment Runbook

> **Project:** Waqfa (وقفة)  
> **Document family:** Low-Level Design v1.1  
> **Source chain:** BRD-Waqfa-v1.1 → HLD-Waqfa-v1.1 → ADR-001 → this LLD  
> **Status:** Implementation-ready draft except items marked `VERIFY AGAINST LIVE INFRASTRUCTURE` or `VERIFY AGAINST LIVE POCKETBASE`  
> **Change rule:** Product behavior changes require BRD revision; architecture changes require HLD and ADR review.

## 1. Traceability

**BRD:** BR-020–022, BR-024, BR-026; NFR-01, NFR-06, NFR-09.  
**HLD:** §2, §5, §9–10, §12.  
**ADR:** ADR-001 — Development and Deployment Topology.  
**Related:** DEVELOPMENT-GUIDE, GIT-STANDARDS, INFRASTRUCTURE, SECRETS-AND-ACCESS, DOCKER-COMPOSE-STANDARD, DATABASE-NAMING-STANDARD.

## 2. Canonical Topology

```text
Manage-Hub development workspace
        ↓
Short-lived Git branch
        ↓
GitHub pull request and CI
        ↓
Approved main branch
        ↓
Versioned container image
        ↓
Dedicated Waqfa LXC runtime
```

Environment responsibilities:

| Environment | Responsibility |
|---|---|
| Manage-Hub | Development, tests, builds, shared development PocketBase process with isolated `waqfa_*` collections, approved AI tools |
| GitHub | Source of truth, review, CI/CD, image metadata, release tags |
| Waqfa LXC | Fully isolated production web/runtime, PocketBase, data, secrets, networks, logs, backups |
| Staging | Optional isolated pre-production validation |

## 3. Repository and Branch Workflow

1. Synchronize `main`.
2. Create a short-lived branch following `GIT-STANDARDS.md`.
3. Implement and validate on Manage-Hub.
4. Commit with Conventional Commits.
5. Push and open a pull request.
6. Merge only after required validation.
7. Build the deployable artifact from the approved commit.

Direct production edits are prohibited. Emergency runtime changes must be reproduced in Git immediately and released normally.

## 4. Repository Layout

Canonical local checkout:

```text
/opt/Dev/Waqfa-App
```

The repository layout is governed by:

```text
00_Documentation/03_Development/PROJECT-STRUCTURE-STANDARD.md
```

Runtime data, secrets, backups, database files, build output, and dependency directories remain outside Git.

## 5. Manage-Hub Development Runtime

### 5.1 Existing shared backend

The approved development PocketBase runtime is:

```text
Container: Dev-Backend
Image: ghcr.io/muchobien/pocketbase:0.35
Network: Network_Dev
Host port: 8090
Internal URL: http://Dev-Backend:8090
Data: /opt/Dev/Runtime/Backend/Data
Static: /opt/Dev/Runtime/Backend/Static
```

Waqfa must not start a second development PocketBase container while this runtime is approved.

Development process sharing does not permit data sharing. Every Waqfa collection must start with `waqfa_`; generic collections and use of `marsid_*` resources are prohibited.

### 5.2 Known Manage-Hub port registry

| Host port | Use |
|---|---|
| `3000` | Dockhand — reserved |
| `3001` | Semaphore |
| `3010` | Outline |
| `6989` | Nexterm host network |
| `8090` | Development PocketBase |
| `3100` | Reserved for Waqfa authenticated application development |
| `3101` | Reserved for Waqfa landing development |

Waqfa must not bind host port `3000`.

### 5.3 Development Compose target

Target path:

```text
infrastructure/compose/01_waqfa_development.yml
```

Logical services:

```text
Waqfa-App-Dev      → host 3100, container 3000
Waqfa-Landing-Dev  → host 3101, container 3000
Dev-Backend        → existing external dependency on Network_Dev
```

The Compose definition follows `DOCKER-COMPOSE-STANDARD.md`, including:

- explicit container names;
- `user: "1000:1000"` where supported;
- `restart: unless-stopped`;
- `TZ=Asia/Riyadh`;
- external `Network_Dev`;
- health checks;
- bounded `json-file` logging;
- secrets through environment references;
- no development PocketBase service duplication.

Exact Dockerfile stages, health routes, package commands, and service split are finalized during bootstrap and must pass `docker compose config` before use.

## 6. Production Runtime Service Layout

Production is completely isolated inside the dedicated Waqfa LXC.

Target logical layout:

```text
Waqfa LXC
├── Waqfa-App
│   └── React 19 + TanStack Start server
├── Waqfa-Landing
├── Waqfa-Backend
│   ├── dedicated PocketBase process
│   ├── dedicated pb_data
│   ├── dedicated pb_public
│   ├── dedicated migrations
│   └── dedicated hooks
├── Waqfa-Backup
├── runtime environment configuration
├── dedicated networks
├── health checks
├── structured logs
└── backup and restore jobs
```

Production must not depend on:

- Manage-Hub;
- `Dev-Backend`;
- `Network_Dev`;
- Marsid containers, collections, data, networks, volumes, or credentials;
- generic PocketBase application collections.

The `waqfa_` collection namespace remains mandatory in production.

Exact LXC identifier, container images, ports, volume paths, reverse-proxy network, and backup target are `VERIFY AGAINST LIVE INFRASTRUCTURE`.

## 7. Production Host-Path Standard

Preferred target pattern:

```text
/opt/Waqfa/Application
/opt/Waqfa/Backend/Data
/opt/Waqfa/Backend/Static
/opt/Waqfa/Backend/Migrations
/opt/Waqfa/Backend/Hooks
/opt/Waqfa/Backups
```

The final paths must be confirmed against the production LXC before deployment and then recorded here and in `INFRASTRUCTURE.md`.

## 8. Domain and Routing Shape

- `waqfa.app`: public landing surface.
- `my.waqfa.app`: authenticated application.
- PocketBase endpoints are exposed only as required for application traffic and authenticated SSE.
- PocketBase administrative access must be restricted to trusted paths.

Pending implementation decision:

- one TanStack Start deployable with domain-aware route trees; or
- separate landing and authenticated application deployables.

The authenticated application may proceed while the final landing deployment shape remains deferred.

## 9. Environment Configuration

Required configuration categories:

- environment name;
- canonical application version;
- public app origin;
- public landing origin;
- PocketBase internal URL;
- PocketBase browser/realtime URL;
- OAuth client configuration;
- optional notification/SMTP settings;
- logging level;
- health-check settings.

Rules:

- all project variables use the `WAQFA_` prefix where they are Waqfa-specific;
- validate required values at startup;
- inject secrets at runtime;
- commit sanitized example files only;
- separate development, staging, and production values;
- never place PocketBase superuser credentials in browser-visible variables.

## 10. Docker Compose Validation

Before enabling or changing any Compose definition:

```bash
docker compose -f <file> config
```

Verify:

- no host-port collision;
- referenced external networks exist;
- bind-mount paths exist with correct ownership;
- secrets resolve without being printed;
- health-check commands exist in their image;
- intended UID/GID is used;
- log rotation is configured;
- development services reach `Dev-Backend` over `Network_Dev`;
- production has no route to development or Marsid data.

## 11. Artifact and Versioning Policy

Preferred image tags:

```text
ghcr.io/alamoudimoh/waqfa-app:v<semantic-version>
ghcr.io/alamoudimoh/waqfa-app:sha-<short-commit-sha>
```

Rules:

- every artifact maps to a Git commit;
- `latest` is optional but must not be the only production tag;
- retain the previously deployed image;
- the application exposes version, commit SHA, and environment in diagnostics;
- UI, logs, cache naming, and diagnostics consume one canonical version source.

## 12. CI Validation

Before publish or deploy, CI should run the scripts present in the repository for:

- dependency installation with lockfile enforcement;
- formatting or format verification;
- linting;
- type checking;
- unit and integration tests;
- production build;
- container build;
- Compose configuration validation;
- secret scanning where configured;
- database namespace validation proving every Waqfa collection begins with `waqfa_`.

Do not invent missing script names. Bootstrap must define and document the actual commands in `package.json` and workflows.

## 13. Release Procedure

### 13.1 Pre-release

1. Confirm the target commit is approved on `main`.
2. Confirm CI is successful.
3. Determine the semantic version.
4. Review migrations and compatibility.
5. Verify no generic or cross-project collection reference exists.
6. Create a verified backup before schema change.
7. Record the currently deployed image and application version.

### 13.2 Build and Publish

1. Build from the approved commit.
2. Tag with semantic version and commit SHA.
3. Push to the approved container registry.
4. Record image digest where supported.

### 13.3 Staging Validation

When staging exists:

1. Deploy the exact production-candidate image.
2. Apply pending migrations.
3. Validate authentication and OAuth callback behavior.
4. Validate PocketBase API access and SSE.
5. Run smoke tests for landing, app, session, and administrative paths.
6. Test rollback before high-risk releases.

### 13.4 Production Deployment

1. Confirm backup completion.
2. Pull the versioned image.
3. Stop or replace the current application service using the approved strategy.
4. Apply versioned migrations.
5. Start the new services.
6. Run health checks.
7. Validate domains, TLS, authentication, SSE, version, and critical routes.
8. Retain the previous image and backup.
9. Record deployment time, version, commit SHA, and operator/automation identity.

## 14. Smoke Test Checklist

- `waqfa.app` returns the intended public surface.
- `my.waqfa.app` returns the application.
- manifest and service worker load successfully.
- authentication through `waqfa_users` succeeds.
- Google OAuth callback succeeds when configured.
- PocketBase one-shot reads/writes succeed.
- realtime SSE connects and receives an allowed event.
- Dhikr content query uses `waqfa_dhikr_library` and returns approved records or an explicit unavailable state.
- session progress write and refresh succeed.
- admin routes reject unauthorized users.
- no generic or `marsid_*` collection is referenced.
- version and commit SHA match the deployed artifact.
- removed `studio.html` routes and assets are absent.

## 15. Rollback Procedure

Application rollback:

1. Stop deployment activity.
2. Identify the last known-good image.
3. Redeploy the previous immutable tag or digest.
4. Restart services.
5. Run the smoke checklist.
6. Record the failed and restored versions.

Schema rollback:

- use a tested reverse migration only when explicitly supported;
- otherwise restore the compatible pre-release backup;
- never assume application rollback alone reverses a database change.

Compatibility rule:

- pending client mutations should remain compatible across one release boundary where practical;
- incompatible mutations must fail recoverably and visibly.

## 16. Backup and Restore

Backup scope:

- dedicated production PocketBase data directory;
- uploaded files;
- required runtime configuration stored securely outside Git;
- deployment metadata: version, SHA, and migration level.

Required controls:

- scheduled backups;
- retention policy;
- encryption where supported;
- restore testing;
- pre-migration backup;
- off-host copy where practical.

Restore drill:

1. Provision an isolated target.
2. Restore Waqfa PocketBase data and uploads.
3. Deploy the matching application image.
4. Validate schema level and application version.
5. Run smoke tests.
6. Record duration and failures.

## 17. Security and Access

- use scoped deployment credentials;
- avoid personal GitHub tokens on production;
- keep private keys outside Git;
- restrict PocketBase administration;
- separate production and development credentials;
- rotate exposed or obsolete credentials;
- follow `SECRETS-AND-ACCESS.md`.

## 18. Observability

Minimum operational signals:

- application health endpoint;
- PocketBase availability;
- container status and restart count;
- structured privacy-safe logs;
- deployed version and commit SHA;
- backup success/failure;
- repeated authentication, migration, or SSE failures.

Do not log Muhasaba text, auth tokens, passwords, OAuth secrets, or private user content.

## 19. Failure Handling

| Failure | Required action |
|---|---|
| CI failure | Do not publish or deploy |
| Compose validation failure | Do not start or replace services |
| Host-port collision | Select and document a non-conflicting port |
| Image publish failure | Keep current production version |
| Backup failure before migration | Stop deployment |
| Migration failure | Stop, assess compatibility, restore or rollback |
| Generic or cross-project collection detected | Block merge and deployment |
| Health-check failure | Revert to previous image |
| OAuth callback failure | Keep or restore previous version unless isolated and approved |
| SSE failure | Investigate URL, proxy, and auth configuration before approval |
| Version mismatch | Treat deployment as incomplete |

## 20. Live Verification Gates

Before first production deployment, confirm:

- Waqfa LXC identifier and resources;
- production host paths and ownership;
- dedicated Docker network names;
- reverse-proxy integration;
- DNS and TLS configuration;
- container registry path and permissions;
- GitHub environment secrets;
- deployment SSH identity;
- dedicated PocketBase data, static, migration, and hook paths;
- backup destination, encryption, retention, and restore access;
- production OAuth callback URIs.

Unknown items remain marked `VERIFY AGAINST LIVE INFRASTRUCTURE` and must not be silently assumed.
