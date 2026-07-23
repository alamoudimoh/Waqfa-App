# Development Guide — Waqfa

> **Primary workspace:** Manage-Hub  
> **Source of truth:** GitHub repository `alamoudimoh/Waqfa-App`  
> **Runtime:** dedicated Waqfa LXC  
> **Related:** ADR-001, GIT-STANDARDS, HLD-Waqfa-v1.1, LLD-09-Deployment-Runbook

## 1. Environment roles

| Environment | Role | Allowed work |
|---|---|---|
| Manage-Hub | Development and management workspace | Coding, tests, local builds, development PocketBase, AI tools |
| GitHub | Authoritative source and review platform | Branches, commits, PRs, CI/CD, releases, documentation |
| Waqfa LXC | Production runtime | Versioned application and PocketBase services only |

Do not use the production LXC as a general development workstation.

## 2. Initial clone

```bash
mkdir -p /opt/Dev/Projects
cd /opt/Dev/Projects
git clone git@github.com:alamoudimoh/Waqfa-App.git
cd Waqfa-App
```

Confirm the remote:

```bash
git remote -v
```

## 3. Start work

Always synchronize `main` before creating a branch:

```bash
git checkout main
git pull --ff-only origin main
git checkout -b feat/example-change
```

Use the branch types defined in `GIT-STANDARDS.md`.

## 4. Development workflow

Typical workflow:

```bash
bun install
bun run dev
bun run lint
bun run test
bun run build
```

Scripts may be finalized during project bootstrap. Until then, do not invent commands that are not present in the repository; inspect `package.json` first.

## 5. PocketBase development data

- Use a development-only PocketBase instance and data directory.
- Do not connect the development frontend to production data by default.
- Do not copy production `pb_data` into Git.
- Schema changes must be represented by versioned migrations.
- Any live schema or API-rule detail not yet verified must remain marked `VERIFY AGAINST LIVE POCKETBASE`.

## 6. Environment files

Commit examples only:

```text
.env.example
.env.development.example
.env.production.example
```

Never commit:

```text
.env
.env.local
.env.production
private keys
deploy credentials
PocketBase superuser credentials
OAuth client secrets
```

## 7. Before committing

Run the checks that exist for the affected scope:

```bash
bun run lint
bun run test
bun run build
```

Also verify:

- No secrets or runtime data are staged.
- Documentation matches architectural changes.
- BRD/HLD/LLD traceability is updated where required.
- The change is limited to one coherent purpose.

Review staged changes:

```bash
git status
git diff --staged
```

## 8. Commit and push

Use the repository standard:

```bash
git add <paths>
git commit
git push -u origin feat/example-change
```

Canonical format:

```text
<type>(<scope>): <imperative outcome>

- <material change 1>
- <material change 2>
- <validation or documentation impact>

Refs: <requirement, ADR, or issue identifiers>
```

## 9. Pull request

Open a PR into `main` and include:

- Summary.
- Changes.
- Validation.
- Documentation and traceability.
- Deployment or migration impact.
- Risks and rollback.

The branch must not be deployed to production merely because it exists. Production deployment follows an approved merge and release process.

## 10. Production release boundary

The preferred flow is:

```text
Manage-Hub branch
    ↓
GitHub pull request
    ↓
CI validation
    ↓
Merge to main
    ↓
Versioned container image
    ↓
Waqfa LXC deployment
```

Do not manually edit production application files. If an emergency change is unavoidable, reproduce it in a branch immediately and deploy the resulting versioned artifact.

## 11. AI-assisted development

Approved AI tools may operate from Manage-Hub, but they must:

- Use a dedicated branch.
- Read the relevant specifications before implementation.
- Avoid direct production changes.
- Follow `GIT-STANDARDS.md`.
- State what was validated.
- Avoid inventing live PocketBase schema, rules, or credentials.

## 12. Recovery

If the Manage-Hub working copy is lost:

```bash
cd /opt/Dev/Projects
git clone git@github.com:alamoudimoh/Waqfa-App.git
```

Unpushed work is not considered durable project state. Push branches regularly when they contain meaningful recoverable work.
