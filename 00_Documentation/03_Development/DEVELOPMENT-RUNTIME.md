# Development Runtime

## Purpose

This document defines the initial local runtime contract for the Waqfa monorepo.

## Requirements

- Node.js 22
- pnpm 10 through Corepack
- Docker Engine with Compose v2
- Existing external Docker network: `Network_Dev`
- Existing PocketBase development container: `Dev-Backend`

The development compose file does not create or manage PocketBase. It only connects Waqfa services to the existing development backend network.

## Bootstrap

```bash
corepack enable
pnpm bootstrap
```

The bootstrap script installs workspace dependencies and writes its report under:

```text
00_Documentation/09_Reports/bootstrap/
```

## Verification

```bash
pnpm verify
```

Verification covers:

- Node and pnpm availability
- Lockfile-compatible installation
- Workspace type checking
- Workspace build
- Docker Compose configuration validation

Reports are written under:

```text
00_Documentation/09_Reports/runtime/
```

## Development Compose

```bash
cp .env.development.example .env.development
docker compose --env-file .env.development \
  -f infrastructure/compose/compose.development.yaml config
```

After `apps/web` and `apps/landing` are bootstrapped, start the services with:

```bash
docker compose --env-file .env.development \
  -f infrastructure/compose/compose.development.yaml up -d
```

Ports:

- Web application: `3100`
- Landing page: `3101`

## Constraints

- Do not start a second PocketBase container in development.
- Do not rename or recreate `Network_Dev` from this repository.
- Do not place secrets in tracked environment examples or generated reports.
- Absolute host binding assumes the canonical checkout path `/opt/Dev/Waqfa-App`.

## Definition of Done

- [ ] Root workspace configuration is valid.
- [ ] Bootstrap completes successfully.
- [ ] Verification completes successfully.
- [ ] Compose configuration resolves against `Network_Dev`.
- [ ] Reports are written to the canonical report directories.
- [ ] No additional PocketBase service is created.
