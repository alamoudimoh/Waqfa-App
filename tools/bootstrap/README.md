# Waqfa Bootstrap Tools

This directory contains repository bootstrap and verification scripts.

Planned scripts:

- `bootstrap.sh` — orchestrates the complete development bootstrap.
- `create-structure.sh` — creates the canonical repository structure idempotently.
- `install-dev-tools.sh` — validates and installs approved development tools.
- `verify.sh` — verifies repository, Docker, ports, networks, and PocketBase connectivity.

Scripts must be safe to run repeatedly, must not mutate production, and must follow the standards under `00_Documentation/`.
