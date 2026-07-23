# Secrets and Access — Waqfa

> **Applies to:** development, CI/CD, production, PocketBase, OAuth, email, and administrative access  
> **Related:** ADR-001, INFRASTRUCTURE, DEVELOPMENT-GUIDE, LLD-09-Deployment-Runbook

## 1. Principles

- No secret is committed to Git.
- Development and production credentials are separate.
- Access follows least privilege.
- Machine access uses scoped machine credentials.
- Credentials are rotated after exposure, role changes, or decommissioning.
- Production access is auditable.

## 2. Secret categories

| Category | Examples | Storage location |
|---|---|---|
| Application runtime | PocketBase URL, public origins, environment name | Runtime environment configuration |
| Administrative | PocketBase superuser credentials | Approved password manager or secret store |
| OAuth | Google client secret | GitHub environment secret and production secret store |
| Deployment | SSH deploy key, registry credential | GitHub environment secret and target authorized keys |
| Notifications | SMTP username/password | Runtime secret store |
| Encryption/backup | Backup encryption key | Dedicated secure secret store |

Public identifiers such as OAuth client IDs may be committed only when they are intentionally public and the platform documentation confirms this. Client secrets never qualify.

## 3. Prohibited repository content

Do not commit:

```text
.env
.env.local
.env.production
*.pem
*.key
id_rsa*
id_ed25519*
pb_data/
backups/
production database exports
real credentials in documentation
```

Provide sanitized example files instead:

```text
.env.example
.env.development.example
.env.production.example
```

## 4. Development access

Manage-Hub may hold development credentials required for local services.

Rules:

- Development credentials must not grant production access unless explicitly required.
- Personal developer credentials must not be copied into the Waqfa LXC.
- AI tools must not be given unrestricted production credentials.
- Development PocketBase must use independent data and administrative credentials.

## 5. GitHub access

- Repository writes occur through authenticated users or approved GitHub Apps.
- Deployment workflows use GitHub Environments where available.
- Production secrets must be scoped to the production environment.
- Environment protection and approval rules should be enabled before public launch.
- Long-lived personal access tokens are avoided where GitHub App, OIDC, deploy key, or scoped token access is available.

## 6. Deployment credentials

Preferred model:

- A dedicated deployment identity.
- A scoped SSH key or equivalent machine credential.
- Access restricted to required deployment commands and directories.
- No interactive personal GitHub credential on the Waqfa LXC.

The private deployment key is stored in the CI secret store. The target receives only the corresponding public key.

## 7. PocketBase administration

- PocketBase superuser credentials are never exposed to browser code.
- Administrative endpoints are restricted to trusted network paths where possible.
- Application users authenticate through the normal PocketBase auth flow.
- Server functions and API rules enforce application authorization.
- Production backups containing PocketBase data are treated as sensitive secrets.

## 8. OAuth

- Development and production use separate callback configuration where practical.
- Redirect URIs must be exact and limited to approved domains.
- Account linking must follow LLD-06 and must not merge accounts solely by matching email.
- OAuth secrets are rotated after suspected exposure.

## 9. Rotation

Rotate a credential when:

- It is committed or printed in a public or shared location.
- An administrator or automation service loses access.
- A machine is rebuilt or decommissioned.
- A dependency or service reports credential compromise.
- The credential reaches its planned rotation interval.

Rotation must include:

1. Issue replacement credential.
2. Update consumers.
3. Verify service health.
4. Revoke the previous credential.
5. Record the rotation without recording the secret value.

## 10. Incident response

On suspected secret exposure:

1. Revoke or rotate the credential immediately.
2. Review repository history, workflow logs, and host logs.
3. Remove exposed values from current files.
4. Purge history only when required; rotation remains mandatory.
5. Verify no unauthorized deployment or data access occurred.
6. Document the incident and corrective controls.

## 11. Documentation rule

Documentation may include placeholders only:

```text
POCKETBASE_ADMIN_EMAIL=<stored-outside-git>
POCKETBASE_ADMIN_PASSWORD=<stored-outside-git>
GOOGLE_OAUTH_CLIENT_SECRET=<github-environment-secret>
```

Never include a real password, token, private key, or backup encryption key in a Markdown file, issue, commit message, or pull request.

## 12. Live verification

Before production deployment, verify:

- Who has repository admin access.
- Which GitHub Actions secrets exist and their scopes.
- Which SSH public keys are authorized on the Waqfa LXC.
- PocketBase superuser inventory.
- OAuth redirect URIs.
- SMTP credential ownership.
- Backup encryption and restore access.

Any unknown item remains marked `VERIFY AGAINST LIVE INFRASTRUCTURE`.
