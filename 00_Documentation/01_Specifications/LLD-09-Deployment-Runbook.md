# LLD-09 — Deployment Runbook

> **Project:** Waqfa (وقفة)  
> **Document family:** Low-Level Design v1.1  
> **Source chain:** BRD-Waqfa-v1.1 → HLD-Waqfa-v1.1 → ADR-001 → this LLD  
> **Status:** Implementation-ready draft except items marked `VERIFY AGAINST LIVE INFRASTRUCTURE` or `VERIFY AGAINST LIVE POCKETBASE`  
> **Change rule:** Product behavior changes require BRD revision; architecture changes require HLD and ADR review.

## 1. Traceability

**BRD:** BR-020–022, BR-024, BR-026; NFR-01, NFR-06, NFR-09.  
**HLD:** §2, §9–10, §12.  
**ADR:** ADR-001 — Development and Deployment Topology.  
**Related:** DEVELOPMENT-GUIDE, GIT-STANDARDS, INFRASTRUCTURE, SECRETS-AND-ACCESS.

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
| Manage-Hub | Development, tests, builds, development PocketBase, approved AI tools |
| GitHub | Source of truth, review, CI/CD, image metadata, release tags |
| Waqfa LXC | Production web/server runtime, PocketBase, persistent data, logs, backups |
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

## 4. Runtime Service Layout

Target logical layout:

```text
Waqfa LXC
├── waqfa-web
│   └── React 19 + TanStack Start server
├── waqfa-pocketbase
│   ├── database
│   ├── uploaded files
│   └── migrations
├── runtime environment configuration
├── health checks
├── structured logs
└── backup jobs
```

Exact container names, image names, ports, volume paths, Docker networks, reverse-proxy labels, and LXC resources are `VERIFY AGAINST LIVE INFRASTRUCTURE`.

## 5. Domain and Routing Shape

- `waqfa.app`: public landing surface.
- `my.waqfa.app`: authenticated application.
- PocketBase endpoints are exposed only as required for application traffic and authenticated SSE.
- PocketBase administrative access must be restricted to trusted paths.

Pending implementation decision:

- One TanStack Start deployable with domain-aware route trees, or
- Separate landing and authenticated application deployables.

The authenticated application may proceed while the landing deployment shape remains deferred.

## 6. Environment Configuration

Required configuration categories:

- Environment name.
- Canonical application version.
- Public app origin.
- Public landing origin.
- PocketBase internal URL.
- PocketBase browser/realtime URL.
- OAuth client configuration.
- Optional notification/SMTP settings.
- Logging level.
- Health-check settings.

Rules:

- Validate required values at startup.
- Inject secrets at runtime.
- Commit sanitized example files only.
- Separate development, staging, and production values.
- Never place PocketBase superuser credentials in browser-visible variables.

## 7. Artifact and Versioning Policy

Preferred image tags:

```text
ghcr.io/alamoudimoh/waqfa-app:v<semantic-version>
ghcr.io/alamoudimoh/waqfa-app:sha-<short-commit-sha>
```

Rules:

- Every artifact maps to a Git commit.
- `latest` is optional but must not be the only production tag.
- Retain the previously deployed image.
- The application exposes version, commit SHA, and environment in diagnostics.
- UI, logs, cache naming, and diagnostics consume one canonical version source.

## 8. CI Validation

Before publish or deploy, CI should run the scripts present in the repository for:

- Dependency installation with lockfile enforcement.
- Formatting or format verification.
- Linting.
- Type checking.
- Unit and integration tests.
- Production build.
- Container build.
- Secret scanning where configured.

Do not invent missing script names. Bootstrap must define and document the actual commands in `package.json` and workflows.

## 9. Release Procedure

### 9.1 Pre-release

1. Confirm the target commit is approved on `main`.
2. Confirm CI is successful.
3. Determine the semantic version.
4. Review migrations and compatibility.
5. Create a verified backup before schema change.
6. Record the currently deployed image and application version.

### 9.2 Build and Publish

1. Build from the approved commit.
2. Tag with semantic version and commit SHA.
3. Push to the approved container registry.
4. Record image digest where supported.

### 9.3 Staging Validation

When staging exists:

1. Deploy the exact production-candidate image.
2. Apply pending migrations.
3. Validate authentication and OAuth callback behavior.
4. Validate PocketBase API access and SSE.
5. Run smoke tests for landing, app, session, and administrative paths.
6. Test rollback before high-risk releases.

### 9.4 Production Deployment

1. Confirm backup completion.
2. Pull the versioned image.
3. Stop or replace the current application service with controlled downtime or rolling strategy.
4. Apply versioned migrations.
5. Start the new services.
6. Run health checks.
7. Validate domains, TLS, authentication, SSE, version, and critical routes.
8. Retain the previous image and backup.
9. Record deployment time, version, commit SHA, and operator/automation identity.

## 10. Smoke Test Checklist

- `waqfa.app` returns the intended public surface.
- `my.waqfa.app` returns the application.
- Manifest and service worker load successfully.
- Authentication succeeds.
- Google OAuth callback succeeds when configured.
- PocketBase one-shot reads/writes succeed.
- Realtime SSE connects and receives an allowed event.
- Dhikr content query returns approved records or an explicit unavailable state.
- Session progress write and refresh succeed.
- Admin routes reject unauthorized users.
- Version and commit SHA match the deployed artifact.
- Removed `studio.html` routes and assets are absent.

## 11. Rollback Procedure

Application rollback:

1. Stop deployment activity.
2. Identify the last known-good image.
3. Redeploy the previous immutable tag or digest.
4. Restart services.
5. Run the smoke checklist.
6. Record the failed and restored versions.

Schema rollback:

- Use a tested reverse migration only when explicitly supported.
- Otherwise restore the compatible pre-release backup.
- Never assume application rollback alone reverses a database change.

Compatibility rule:

- Pending client mutations should remain compatible across one release boundary where practical.
- Incompatible mutations must fail recoverably and visibly.

## 12. Backup and Restore

Backup scope:

- PocketBase data directory.
- Uploaded files.
- Required runtime configuration stored securely outside Git.
- Deployment metadata: version, SHA, and migration level.

Required controls:

- Scheduled backups.
- Retention policy.
- Encryption where supported.
- Restore testing.
- Pre-migration backup.
- Off-host copy where practical.

Restore drill:

1. Provision an isolated target.
2. Restore PocketBase data and uploads.
3. Deploy the matching application image.
4. Validate schema level and application version.
5. Run smoke tests.
6. Record duration and failures.

## 13. Security and Access

- Use scoped deployment credentials.
- Avoid personal GitHub tokens on production.
- Keep private keys outside Git.
- Restrict PocketBase administration.
- Separate production and development credentials.
- Rotate exposed or obsolete credentials.
- Follow `SECRETS-AND-ACCESS.md`.

## 14. Observability

Minimum operational signals:

- Application health endpoint.
- PocketBase availability.
- Container status and restart count.
- Structured privacy-safe logs.
- Deployed version and commit SHA.
- Backup success/failure.
- Repeated authentication, migration, or SSE failures.

Do not log Muhasaba text, auth tokens, passwords, OAuth secrets, or private user content.

## 15. Failure Handling

| Failure | Required action |
|---|---|
| CI failure | Do not publish or deploy |
| Image publish failure | Keep current production version |
| Backup failure before migration | Stop deployment |
| Migration failure | Stop, assess compatibility, restore or rollback |
| Health-check failure | Revert to previous image |
| OAuth callback failure | Keep or restore previous version unless isolated and approved |
| SSE failure | Investigate URL, proxy, and auth configuration before approval |
| Version mismatch | Treat deployment as incomplete |

## 16. Live Verification Gates

Before first production deployment, confirm:

- LXC identifier and resources.
- Host paths and ownership.
- Docker network names.
- Reverse-proxy integration.
- DNS and TLS configuration.
- Container registry path and permissions.
- GitHub environment secrets.
- Deployment SSH identity.
- PocketBase data and migration paths.
- Backup destination, encryption, retention, and restore access.
- Production OAuth callback URIs.

Unknown items remain marked `VERIFY AGAINST LIVE INFRASTRUCTURE` and must not be silently assumed.
