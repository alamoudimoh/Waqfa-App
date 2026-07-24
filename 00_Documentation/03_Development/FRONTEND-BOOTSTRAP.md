# Frontend Bootstrap

## Scope

This phase initializes the Waqfa frontend workspace without adding business logic or database integration.

## Applications

- `apps/web` — authenticated application shell on port `3100`.
- `apps/landing` — public landing shell on port `3101`.

## Shared Packages

- `packages/ui`
- `packages/config`
- `packages/types`
- `packages/utils`

## Runtime Contracts

- React 19
- Vite
- TypeScript
- TanStack Query in the app shell
- Arabic RTL defaults
- Existing development Docker runtime and external PocketBase remain unchanged

## Local Validation

```bash
corepack enable
pnpm install
pnpm --filter @waqfa/web typecheck
pnpm --filter @waqfa/landing typecheck
pnpm --filter @waqfa/web build
pnpm --filter @waqfa/landing build
```

## Definition of Done

- [ ] Both applications install from the root workspace.
- [ ] Web runs on port `3100`.
- [ ] Landing runs on port `3101`.
- [ ] Both applications pass TypeScript checks.
- [ ] Both applications build successfully.
- [ ] Shared packages are recognized by pnpm.
- [ ] No PocketBase schema or business logic is introduced.
