# ADR-001 — Development and Deployment Topology

> **Status:** Accepted  
> **Decision owner:** Mohammed Alamoudi  
> **Applies to:** Waqfa repository, development workflow, CI/CD, and runtime infrastructure  
> **Related documents:** HLD-Waqfa-v1.1, LLD-09-Deployment-Runbook, DEVELOPMENT-GUIDE, GIT-STANDARDS

## Context

Waqfa requires a documented separation between development tooling, source control, and production runtime. The available Manage-Hub LXC already hosts development and management tooling such as Code Server, Git, Node.js, Bun, AI coding tools, automation services, and a development PocketBase instance. A dedicated Waqfa LXC is intended to host the application runtime.

The project needs one authoritative source of code, isolated production services, repeatable deployment, and a workflow that supports automated agents without allowing undocumented changes directly on production.

## Considered options

### Option A — Develop and run Waqfa on Manage-Hub

Advantages:
- Existing tools are already installed.
- Lowest initial setup effort.

Disadvantages:
- Mixes management, automation, development, and production workloads.
- Broadens the impact of a service failure, update, or security incident.
- Makes backup, rollback, and operational ownership less clear.

### Option B — Develop and run Waqfa on the dedicated Waqfa LXC

Advantages:
- Project-specific isolation.
- Fewer infrastructure components.

Disadvantages:
- Turns the production runtime into a development workstation.
- Requires compilers, AI tools, credentials, and editors on production.
- Increases configuration drift and the risk of unreviewed production changes.

### Option C — Develop directly on GitHub

Advantages:
- Centralized history and review.
- No dependency on one local workspace.

Disadvantages:
- GitHub is the source-control and automation platform, not the default runtime workspace.
- Practical development still requires a local, remote, or Codespaces environment.

### Option D — Manage-Hub development, GitHub source of truth, Waqfa LXC runtime

Advantages:
- Clear responsibility per environment.
- Production remains minimal and isolated.
- Every durable change is committed and reviewable.
- Enables CI/CD, immutable images, rollback, and reproducible environments.

Disadvantages:
- Requires initial CI/CD and environment configuration.
- Requires disciplined secret and branch management.

## Decision

Adopt Option D:

```text
Manage-Hub = development and management environment
GitHub     = authoritative source of truth and release control
Waqfa LXC  = isolated runtime environment
```

Canonical flow:

```text
Developer or approved coding agent
        ↓
Manage-Hub working copy
        ↓
Feature/fix/docs branch
        ↓
Commit and push
        ↓
GitHub pull request and checks
        ↓
Approved main branch
        ↓
Versioned build artifact/container image
        ↓
Waqfa LXC deployment
```

## Required boundaries

### Manage-Hub

May contain:
- Source working copies.
- Code Server and command-line development tools.
- Node.js, Bun, package managers, linters, tests, and build tools.
- Approved AI development tools.
- Development-only PocketBase data and test services.

Must not be treated as the Waqfa production runtime.

### GitHub

Must contain:
- All source code and durable project documentation.
- Branch and pull-request history.
- CI workflows and release metadata.
- Infrastructure definitions that are safe to commit.

Must not contain:
- Production secrets.
- Private keys.
- Real environment files.
- Production database files or backups.

### Waqfa LXC

May contain only what is required to run and operate Waqfa:
- Waqfa application service.
- PocketBase runtime.
- Persistent data volumes.
- Runtime configuration injected outside Git.
- Logs, health checks, and backup jobs.

Must not contain:
- General development editors.
- AI coding tools.
- Personal GitHub credentials.
- Unnecessary build toolchains.

## Source-control policy

- `main` represents a releasable state.
- Work is performed on short-lived branches.
- Direct production edits are prohibited.
- Every durable change must be committed to GitHub.
- Emergency runtime changes must be reproduced in source control immediately and followed by a normal release.

## Deployment policy

- Prefer immutable versioned images over `git pull` on production.
- Every deployed artifact must be traceable to a commit SHA.
- Production deployment must retain the previously deployed image for rollback.
- Database changes require versioned migrations and a verified backup.
- `latest` must not be the only production tag.

## Security consequences

- Manage-Hub credentials cannot be reused as production application secrets.
- Development and production PocketBase data must remain separate.
- Deployment access must use a scoped machine credential or deploy key.
- GitHub Actions secrets must be environment-scoped and rotated.
- The Waqfa LXC must not expose PocketBase administrative access publicly.

## Operational consequences

- Manage-Hub loss does not lose source code because GitHub is authoritative.
- Waqfa LXC replacement is possible from versioned infrastructure definitions, images, and backups.
- Rollback is performed by redeploying the previous image and, where required, restoring a verified compatible backup.

## Reconsideration triggers

Re-evaluate this decision if:
- The project adopts GitHub Codespaces as the primary workspace.
- A separate staging LXC becomes mandatory.
- Multiple developers require isolated development environments.
- The deployment platform changes from Proxmox/LXC to another runtime.

## Decision summary

Waqfa development occurs on Manage-Hub, all durable state is committed to GitHub, and production runs on a dedicated Waqfa LXC. GitHub is the sole authoritative source for code, documentation, releases, and deployable definitions.
