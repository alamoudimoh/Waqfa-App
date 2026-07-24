# Waqfa — Project Documentation

> **Project:** Waqfa (وقفة)  
> **Repository:** `alamoudimoh/Waqfa-App`  
> **Source chain:** BRD-Waqfa-v1.1 → HLD-Waqfa-v1.1 → ADR/LLD set  
> **Status:** Implementation-ready documentation except items explicitly marked for live verification.

## Repository Governance

```text
Manage-Hub = development workspace
GitHub     = authoritative source of truth
Waqfa LXC  = fully isolated production runtime
```

All durable source and documentation changes must be committed to GitHub. Production application files must not be edited directly.

## Mandatory Naming and Isolation

```text
Repository checkout       /opt/Dev/Waqfa-App
PocketBase collections    waqfa_*
Authentication collection waqfa_users
Environment variables     WAQFA_*
Production runtime        dedicated Waqfa LXC
```

Waqfa must not use generic PocketBase collections and must not reuse or modify any `marsid_*` collection. Development may use the existing Manage-Hub `Dev-Backend` process with project-scoped `waqfa_*` collections. Production uses an independent PocketBase container, data, secrets, networks, and backups.

## Documentation

### Specifications

| ID | File | Scope |
|---|---|---|
| BRD | `00_Documentation/01_Specifications/BRD-Waqfa-v1.1.md` | Product and business requirements |
| HLD | `00_Documentation/01_Specifications/HLD-Waqfa-v1.1.md` | System, data-isolation, and deployment architecture |
| LLD-01 | `00_Documentation/01_Specifications/LLD-01-Dhikr-Session-Engine.md` | Session, time windows, reset, offline queue, transfer |
| LLD-02 | `00_Documentation/01_Specifications/LLD-02-PocketBase-Schema.md` | Prefixed schema, indexes, migrations, and API-rule inventory |
| LLD-03 | `00_Documentation/01_Specifications/LLD-03-Auth-RBAC-Delegation.md` | RBAC and delegation enforcement |
| LLD-04 | `00_Documentation/01_Specifications/LLD-04-RTL-Accessibility.md` | Tokens, RTL, focus mode, and accessibility |
| LLD-05 | `00_Documentation/01_Specifications/LLD-05-Audit-Content-Governance.md` | Audit and content approval |
| LLD-06 | `00_Documentation/01_Specifications/LLD-06-Authentication-Linking.md` | Email/password, Google OAuth, and linking |
| LLD-07 | `00_Documentation/01_Specifications/LLD-07-Notifications-Travel-Location.md` | Reminders, DND, travel, and location |
| LLD-08 | `00_Documentation/01_Specifications/LLD-08-Insights-Intentions-Continuity.md` | Weekly insights, intentions, and continuity |
| LLD-09 | `00_Documentation/01_Specifications/LLD-09-Deployment-Runbook.md` | Compose, ports, CI/CD, runtime, release, rollback, and recovery |
| Matrix | `00_Documentation/01_Specifications/TRACEABILITY-MATRIX.md` | BRD → HLD → ADR/LLD mapping |

### Architecture, Development, and Operations

| File | Purpose |
|---|---|
| `00_Documentation/02_Architecture_Decisions/ADR-001-Development-and-Deployment-Topology.md` | Records why development, source control, and runtime are separated |
| `00_Documentation/03_Development/DEVELOPMENT-GUIDE.md` | Canonical daily development workflow |
| `00_Documentation/03_Development/GIT-STANDARDS.md` | Branch, commit, PR, merge, and release standards |
| `00_Documentation/03_Development/PROJECT-STRUCTURE-STANDARD.md` | Canonical repository and `/opt/Dev/Waqfa-App` organization |
| `00_Documentation/03_Development/DOCUMENTATION-MAINTENANCE-STANDARD.md` | Continuous documentation and definition-of-done rules |
| `00_Documentation/03_Development/AI-OPERATING-MODEL.md` | Waqfa-specific operating model for Factory Droid, OpenCode, Claude Code, and Codex |
| `00_Documentation/03_Development/AI-TASK-ROUTING.md` | Easy, medium, and hard task classification and tool assignment |
| `00_Documentation/03_Development/AI-TASK-BRIEF.md` | Required task intake, approval, validation, and delivery template |
| `AGENTS.md` | Repository-level instructions for AI coding agents |
| `00_Documentation/04_Infrastructure/INFRASTRUCTURE.md` | Environment, networking, persistence, backup, and artifact boundaries |
| `00_Documentation/04_Infrastructure/DOCKER-COMPOSE-STANDARD.md` | Manage-Hub Compose conventions, port registry, and production isolation |
| `00_Documentation/05_Security/SECRETS-AND-ACCESS.md` | Secrets, credentials, access, rotation, and incident response |
| `00_Documentation/06_Database/DATABASE-NAMING-STANDARD.md` | Mandatory `waqfa_` namespace and PocketBase naming rules |

## Development Ports

| Host port | Waqfa use |
|---|---|
| `3100` | Authenticated application development |
| `3101` | Landing development |

Host port `3000` is reserved by Dockhand and must not be used by Waqfa.

## Commit Standard

All commits use Conventional Commits:

```text
<type>(<scope>): <imperative outcome>

- <material change 1>
- <material change 2>
- <validation, migration, or documentation impact>

Refs: <requirement, ADR, or issue identifiers when applicable>
```

See `00_Documentation/03_Development/GIT-STANDARDS.md` for the complete standard.

## Execution Order

1. Export and verify the live PocketBase schema and API rules read-only.
2. Confirm and create only `waqfa_*` collections through versioned migrations.
3. Finalize LLD-02 and LLD-03 using the verified live configuration.
4. Bootstrap `/opt/Dev/Waqfa-App` according to PROJECT-STRUCTURE-STANDARD.
5. Finalize and validate the development Compose definition using ports `3100` and `3101`.
6. Implement and test LLD-01 before secondary modules.
7. Implement LLD-04 through LLD-08.
8. Use LLD-09 for staging and fully isolated production deployment.

No document silently resolves an open HLD, PocketBase, or live infrastructure question by assumption.
