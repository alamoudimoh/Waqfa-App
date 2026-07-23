# Project Structure Standard — Waqfa

> **Applies to:** repository organization, local checkout layout, generated assets, infrastructure files, and documentation
> **Authority:** project-wide structural standard
> **Related:** ADR-001, LLD-09, DATABASE-NAMING-STANDARD, DOCUMENTATION-MAINTENANCE-STANDARD

## 1. Core rules

1. The canonical checkout path on Manage-Hub is `/opt/Dev/Waqfa-App`.
2. The repository root must contain only repository-level configuration, indexes, and top-level domains.
3. Application code, infrastructure, documentation, prototypes, tests, and tooling must not be mixed.
4. New folders require a documented purpose and owner.
5. Temporary files, runtime data, credentials, backups, database files, build output, and dependency directories must never be committed.
6. Directory names are lowercase kebab-case except for the existing numbered documentation root, which is retained for compatibility.

## 2. Canonical repository tree

```text
/opt/Dev/Waqfa-App/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   ├── CODEOWNERS
│   └── pull_request_template.md
├── 00_Documentation/
│   ├── 01_Specifications/
│   ├── 02_Architecture_Decisions/
│   ├── 03_Development/
│   ├── 04_Infrastructure/
│   ├── 05_Security/
│   ├── 06_Database/
│   ├── 07_Operations/
│   ├── 08_Testing/
│   ├── 09_Reports/
│   │   ├── dev/
│   │   ├── ia-f/
│   │   ├── ia-r/
│   │   └── ia-v/
│   └── 99_Archive/
├── apps/
│   ├── app/
│   └── landing/
├── packages/
│   ├── config/
│   ├── database/
│   ├── design-system/
│   ├── shared/
│   ├── testing/
│   └── typescript-config/
├── infrastructure/
│   ├── compose/
│   ├── docker/
│   ├── pocketbase/
│   │   ├── pb_hooks/
│   │   ├── pb_migrations/
│   │   ├── seeds/
│   │   └── exports/
│   ├── scripts/
│   └── systemd/
├── prototypes/
│   ├── auth/
│   ├── homepage/
│   ├── landing/
│   ├── session/
│   └── settings/
├── tests/
│   ├── e2e/
│   ├── integration/
│   └── fixtures/
├── tools/
│   ├── generators/
│   ├── validation/
│   └── workspace/
├── .dockerignore
├── .editorconfig
├── .env.example
├── .gitignore
├── CONTRIBUTING.md
├── README.md
├── SECURITY.md
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.json
```

## 3. Domain ownership

| Path | Purpose |
|---|---|
| `apps/app` | Authenticated Waqfa application served at `my.waqfa.app` |
| `apps/landing` | Public Waqfa landing surface served at `waqfa.app` |
| `packages/database` | Typed collection names, schemas, query helpers, and project database contracts |
| `packages/design-system` | Project-specific tokens and reusable Waqfa UI components |
| `packages/shared` | Project-local reusable logic that is not infrastructure-specific |
| `infrastructure/compose` | Development, staging, and production Compose definitions |
| `infrastructure/pocketbase` | PocketBase migrations, hooks, approved seeds, and sanitized exports |
| `prototypes` | Historical or design-reference HTML that is not production source |
| `00_Documentation` | Requirements, architecture, standards, operations, database documentation, and reports |

## 4. Prototype handling

Existing HTML mockups are reference artifacts. During bootstrap they must move under `prototypes/` and must not be treated as production code. Production implementation belongs in `apps/app` or `apps/landing`.

## 5. Runtime data boundary

The following remain outside Git:

```text
/opt/Dev/Runtime/Backend/Data
/opt/Dev/Runtime/Backend/Static
/opt/Dev/Waqfa-App/node_modules
/opt/Dev/Waqfa-App/.env
/opt/Dev/Waqfa-App/dist
/opt/Dev/Waqfa-App/backups
```

Production data belongs only on the dedicated Waqfa LXC and is never synchronized into the repository.

## 6. Change discipline

A pull request that changes the repository structure must update:

- this standard;
- the root README when user navigation changes;
- relevant infrastructure or development documentation;
- the traceability matrix when architecture or implementation ownership changes.

Structural changes are incomplete until documentation is updated in the same pull request.
