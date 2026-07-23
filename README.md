# Waqfa — Project Documentation

> **Project:** Waqfa (وقفة)  
> **Repository:** `alamoudimoh/Waqfa-App`  
> **Source chain:** BRD-Waqfa-v1.1 → HLD-Waqfa-v1.1 → ADR/LLD set  
> **Status:** Implementation-ready documentation except items explicitly marked for live verification.

## Repository Governance

```text
Manage-Hub = development workspace
GitHub     = authoritative source of truth
Waqfa LXC  = isolated runtime environment
```

All durable source and documentation changes must be committed to GitHub. Production application files must not be edited directly.

## Documentation

### Specifications

| ID | File | Scope |
|---|---|---|
| BRD | `00_Documentation/01_Specifications/BRD-Waqfa-v1.1.md` | Product and business requirements |
| HLD | `00_Documentation/01_Specifications/HLD-Waqfa-v1.1.md` | System and deployment architecture |
| LLD-01 | `00_Documentation/01_Specifications/LLD-01-Dhikr-Session-Engine.md` | Session, time windows, reset, offline queue, transfer |
| LLD-02 | `00_Documentation/01_Specifications/LLD-02-PocketBase-Schema.md` | Schema, indexes, migrations, and API-rule inventory |
| LLD-03 | `00_Documentation/01_Specifications/LLD-03-Auth-RBAC-Delegation.md` | RBAC and delegation enforcement |
| LLD-04 | `00_Documentation/01_Specifications/LLD-04-RTL-Accessibility.md` | Tokens, RTL, focus mode, and accessibility |
| LLD-05 | `00_Documentation/01_Specifications/LLD-05-Audit-Content-Governance.md` | Audit and content approval |
| LLD-06 | `00_Documentation/01_Specifications/LLD-06-Authentication-Linking.md` | Email/password, Google OAuth, and linking |
| LLD-07 | `00_Documentation/01_Specifications/LLD-07-Notifications-Travel-Location.md` | Reminders, DND, travel, and location |
| LLD-08 | `00_Documentation/01_Specifications/LLD-08-Insights-Intentions-Continuity.md` | Weekly insights, intentions, and continuity |
| LLD-09 | `00_Documentation/01_Specifications/LLD-09-Deployment-Runbook.md` | CI/CD, runtime, release, rollback, and recovery |
| Matrix | `00_Documentation/01_Specifications/TRACEABILITY-MATRIX.md` | BRD → HLD → ADR/LLD mapping |

### Architecture and Operations

| File | Purpose |
|---|---|
| `00_Documentation/02_Architecture_Decisions/ADR-001-Development-and-Deployment-Topology.md` | Records why development, source control, and runtime are separated |
| `00_Documentation/03_Development/DEVELOPMENT-GUIDE.md` | Canonical daily development workflow |
| `00_Documentation/03_Development/GIT-STANDARDS.md` | Branch, commit, PR, merge, and release standards |
| `00_Documentation/04_Infrastructure/INFRASTRUCTURE.md` | Environment, networking, persistence, backup, and artifact boundaries |
| `00_Documentation/05_Security/SECRETS-AND-ACCESS.md` | Secrets, credentials, access, rotation, and incident response |

## Commit Standard

All commits use Conventional Commits:

```text
<type>(<scope>): <imperative outcome>

- <material change 1>
- <material change 2>
- <validation, migration, or documentation impact>

Refs: <requirement, ADR, or issue identifiers when applicable>
```

Example:

```text
docs(architecture): record development and deployment topology

- define Manage-Hub as the development environment
- establish GitHub as the authoritative source of truth
- reserve the Waqfa LXC for isolated runtime workloads
- document deployment and security boundaries

Refs: ADR-001
```

See `00_Documentation/03_Development/GIT-STANDARDS.md` for the complete standard.

## Execution Order

1. Export and verify the live PocketBase schema and API rules read-only.
2. Finalize LLD-02 and LLD-03 using the verified live configuration.
3. Bootstrap the repository and development environment according to ADR-001.
4. Implement and test LLD-01 before secondary modules.
5. Implement LLD-04 through LLD-08.
6. Use LLD-09 for staging and production deployment.

No document silently resolves an open HLD, PocketBase, or live infrastructure question by assumption.
