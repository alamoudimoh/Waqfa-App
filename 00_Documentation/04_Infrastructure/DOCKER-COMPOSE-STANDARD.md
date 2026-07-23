# Docker Compose Standard — Waqfa

> **Applies to:** Waqfa development, staging, and production Compose definitions
> **Authority:** infrastructure-wide standard
> **Related:** LLD-09, INFRASTRUCTURE, PROJECT-STRUCTURE-STANDARD

## 1. Source conventions

Waqfa Compose files follow the established Manage-Hub style:

- explicit `container_name`;
- explicit `restart: unless-stopped`;
- external named networks where shared infrastructure already provides them;
- absolute host bind mounts for durable runtime data;
- `TZ=Asia/Riyadh`;
- health checks for long-running services;
- bounded `json-file` logging (`10m`, three files);
- secrets through `${VARIABLE}` references, never inline;
- readable service grouping and deterministic names.

The current Manage-Hub development PocketBase is `Dev-Backend` on external network `Network_Dev`, published as `8090:8090`.

## 2. Port registry

Known occupied host ports include:

| Host port | Current use |
|---|---|
| `3000` | Dockhand — reserved, Waqfa must not use it |
| `3001` | Semaphore |
| `3010` | Outline |
| `6989` | Nexterm, host network |
| `8090` | Manage-Hub development PocketBase |

Initial Waqfa development allocation:

| Host port | Service |
|---|---|
| `3100` | Authenticated Waqfa application |
| `3101` | Waqfa landing application |

Any port change must update this registry and LLD-09 in the same pull request.

## 3. Development Compose

Target file:

```text
infrastructure/compose/01_waqfa_development.yml
```

Canonical shape:

```yaml
# 01_waqfa_development
services:
  Waqfa-App-Dev:
    build:
      context: ../..
      dockerfile: infrastructure/docker/app.Dockerfile
      target: development
    container_name: Waqfa-App-Dev
    user: "1000:1000"
    restart: unless-stopped
    networks:
      - Network_Dev
    ports:
      - "3100:3000"
    environment:
      - TZ=Asia/Riyadh
      - NODE_ENV=development
      - WAQFA_POCKETBASE_INTERNAL_URL=http://Dev-Backend:8090
    env_file:
      - ../../.env
    volumes:
      - ../..:/workspace
      - Waqfa-Node-Modules:/workspace/node_modules
      - Waqfa-Pnpm-Store:/pnpm/store
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3000/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 30s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  Waqfa-Landing-Dev:
    build:
      context: ../..
      dockerfile: infrastructure/docker/landing.Dockerfile
      target: development
    container_name: Waqfa-Landing-Dev
    user: "1000:1000"
    restart: unless-stopped
    networks:
      - Network_Dev
    ports:
      - "3101:3000"
    environment:
      - TZ=Asia/Riyadh
      - NODE_ENV=development
    env_file:
      - ../../.env
    volumes:
      - ../..:/workspace
      - Waqfa-Node-Modules:/workspace/node_modules
      - Waqfa-Pnpm-Store:/pnpm/store
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3000/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 30s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

volumes:
  Waqfa-Node-Modules:
  Waqfa-Pnpm-Store:

networks:
  Network_Dev:
    external: true
```

This is a documented target. The health route, Dockerfiles, package commands, and exact service split must be finalized during repository bootstrap and validated before the Compose file is enabled.

## 4. Development backend boundary

Waqfa must not start a second PocketBase container in Manage-Hub while `Dev-Backend` is the approved shared development runtime.

The application connects over `Network_Dev` using:

```text
http://Dev-Backend:8090
```

All Waqfa collections in that shared development instance must use the `waqfa_` namespace. Generic collections are prohibited.

## 5. Production Compose

Production runs in the dedicated Waqfa LXC and is fully isolated. Target logical services are:

```text
Waqfa-App
Waqfa-Landing
Waqfa-Backend
Waqfa-Backup
```

Production must use:

- a dedicated PocketBase container;
- dedicated bind-mounted data and public storage;
- dedicated Waqfa networks;
- dedicated secrets;
- dedicated backup destination;
- immutable versioned application images;
- no dependency on Manage-Hub `Dev-Backend` or `Network_Dev`.

Preferred production host-path pattern:

```text
/opt/Waqfa/Application
/opt/Waqfa/Backend/Data
/opt/Waqfa/Backend/Static
/opt/Waqfa/Backend/Migrations
/opt/Waqfa/Backend/Hooks
/opt/Waqfa/Backups
```

Exact LXC paths, reverse-proxy network, image names, and backup target remain `VERIFY AGAINST LIVE INFRASTRUCTURE` until the production host is inspected.

## 6. Naming rules

| Resource | Pattern | Example |
|---|---|---|
| Container | `Waqfa-<Role>[-<Environment>]` | `Waqfa-App-Dev` |
| Environment variable | `WAQFA_<NAME>` | `WAQFA_POCKETBASE_INTERNAL_URL` |
| Project collection | `waqfa_<plural_entity>` | `waqfa_users` |
| Named volume | `Waqfa-<Purpose>` | `Waqfa-Pnpm-Store` |
| Dedicated production network | `Network_Waqfa_<Purpose>` | `Network_Waqfa_Backend` |
| Compose file | ordered snake_case | `01_waqfa_development.yml` |

## 7. Validation

Before enabling or changing a Compose file:

```bash
docker compose -f <file> config
```

Also verify:

- no host-port collision;
- referenced external networks exist;
- bind-mount paths exist with correct ownership;
- secrets resolve without being printed;
- health checks use commands present in the image;
- containers run as the intended UID/GID;
- log rotation is configured;
- production cannot reach development data.
