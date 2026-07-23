# Infrastructure — Waqfa

> **Architecture decision:** ADR-001  
> **Deployment runbook:** LLD-09-Deployment-Runbook  
> **Source of truth:** GitHub repository `alamoudimoh/Waqfa-App`

## 1. Infrastructure objectives

The infrastructure must provide:

- Clear separation between development and production.
- Self-hosted application and data ownership.
- Reproducible deployment from GitHub.
- Versioned and reversible releases.
- Restricted administrative access.
- Backup and recovery capability.

## 2. Environment inventory

| Environment | Primary responsibility | Persistent project state |
|---|---|---|
| Manage-Hub LXC | Development and management tooling | Working copies and development-only service data |
| GitHub | Authoritative source control and release metadata | Code, documentation, workflows, tags, releases |
| Waqfa LXC | Application runtime | Production PocketBase data, uploads, logs, runtime configuration |
| Staging environment | Optional pre-production validation | Staging-only data and temporary release validation |

## 3. Manage-Hub

Manage-Hub is the default remote development environment.

Expected capabilities may include:

- Git and SSH tooling.
- Code Server.
- Node.js and Bun.
- Build and test tooling.
- Approved AI coding agents.
- Docker tooling.
- Development PocketBase instance.

Boundaries:

- Development data must not be shared with production.
- Manage-Hub must not host Waqfa production workloads.
- Credentials used for development must not be reused as production secrets.
- Source changes must be pushed to GitHub to become durable project state.

## 4. GitHub

GitHub provides:

- Repository and branch history.
- Pull requests and code review.
- CI checks.
- Release tags.
- Container registry integration when configured.
- Deployment automation.

GitHub does not store:

- Production PocketBase data.
- Database backups.
- Private SSH keys.
- Real environment files.
- OAuth secrets.

## 5. Waqfa LXC

The Waqfa LXC is a dedicated runtime boundary.

Expected runtime components:

```text
Waqfa LXC
├── reverse-proxy integration
├── Waqfa web/server container
├── PocketBase container
├── persistent PocketBase data
├── persistent uploaded files
├── runtime environment configuration
├── health checks
├── logs
└── backup jobs
```

The LXC must not include general-purpose development tooling unless strictly required for operations.

## 6. Network boundaries

- Public traffic terminates through HTTPS.
- `waqfa.app` serves the public landing surface.
- `my.waqfa.app` serves the authenticated application.
- PocketBase client endpoints are exposed only as required by the application and realtime SSE.
- PocketBase administration must be restricted to trusted access paths.
- Container networks should separate public-facing, application, and data services where practical.

Exact hostnames, ports, firewall rules, reverse-proxy labels, and network names remain deployment configuration and must not be invented before verification against the live infrastructure.

## 7. Persistent storage

Persistent production data includes:

- PocketBase database files.
- PocketBase uploaded files.
- Migration state.
- Required application-generated durable assets.

The application container itself must be replaceable and must not be the only location of durable state.

## 8. Backup policy

Production backup scope:

- PocketBase data directory.
- Uploaded files.
- Runtime configuration required for restoration, stored securely outside Git.
- Deployment version and commit SHA.

Required controls:

- Scheduled backups.
- Encrypted backup storage where supported.
- Retention policy.
- Restore tests.
- Backup before schema migration or major release.
- Documented recovery point and recovery time objectives before public launch.

## 9. Artifact policy

Preferred production artifacts:

```text
ghcr.io/alamoudimoh/waqfa-app:v<semantic-version>
ghcr.io/alamoudimoh/waqfa-app:sha-<short-commit-sha>
```

Rules:

- Every deployment must map to a Git commit.
- Production must not depend only on `latest`.
- The previously deployed artifact must remain available for rollback.
- Build artifacts must be produced from committed source.

## 10. Secrets and access

Secrets are injected at runtime and managed outside the repository.

Examples:

- PocketBase superuser credentials.
- OAuth client secrets.
- SMTP credentials.
- Deployment SSH keys.
- GitHub environment secrets.

Access principles:

- Least privilege.
- Separate development and production credentials.
- Scoped machine credentials for deployment automation.
- Rotation after suspected exposure or administrator change.
- No personal GitHub token on the production LXC when a deploy key or automation credential is sufficient.

## 11. Observability

Minimum operational visibility:

- Application health endpoint.
- PocketBase health and availability check.
- Container restart status.
- Structured logs without sensitive user content.
- Release version and commit SHA in diagnostics.
- Alerting for repeated failure or unavailable services.

## 12. Staging

A staging environment may be added when release risk justifies it.

Staging must:

- Use separate data.
- Use separate secrets.
- Test the same image intended for production.
- Validate migrations, OAuth callback configuration, SSE, health checks, and rollback.

## 13. Unverified infrastructure details

The following require confirmation against the live environment before implementation:

- LXC identifier and resource allocation.
- Reverse-proxy product and labels.
- Internal addresses and DNS records.
- Docker network names.
- Persistent host directory paths.
- Backup destination and retention.
- Firewall and administrative access rules.

Mark these as `VERIFY AGAINST LIVE INFRASTRUCTURE` in deployment changes until confirmed.
