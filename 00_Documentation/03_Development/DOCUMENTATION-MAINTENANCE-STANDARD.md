# Documentation Maintenance Standard — Waqfa

> **Applies to:** requirements, architecture, implementation design, infrastructure, database, security, operations, testing, reports, and reusable engineering standards
> **Authority:** repository-wide definition-of-done rule
> **Related:** GIT-STANDARDS, PROJECT-STRUCTURE-STANDARD, DATABASE-NAMING-STANDARD, LLD-09

## 1. Policy

Documentation is part of the implementation, not a later cleanup activity.

A change is incomplete when its code, schema, infrastructure, workflow, naming, or operational behavior changes but the authoritative documentation remains stale.

Required documentation updates must be included in the same branch and pull request as the change they describe.

## 2. Authoritative document by change type

| Change | Required documentation |
|---|---|
| Product behavior or requirement | BRD and traceability matrix |
| Architecture boundary or technology decision | HLD and an ADR when material |
| Module implementation contract | Relevant LLD |
| PocketBase collection, field, API rule, hook, or migration | LLD-02/03 plus `06_Database` documents |
| Docker service, port, network, volume, image, or health check | LLD-09 plus infrastructure documents |
| Repository layout or ownership | PROJECT-STRUCTURE-STANDARD and README |
| Branch, commit, review, or release process | GIT-STANDARDS |
| Secret, identity, or access behavior | SECRETS-AND-ACCESS |
| Backup, restore, deployment, or incident process | LLD-09 and operations documentation |
| Test strategy or acceptance gate | Testing documentation and relevant LLD |

## 3. Project-specific versus reusable standards

Project-specific decisions remain in Waqfa, including:

- `waqfa_` database namespace;
- Waqfa domains, containers, ports, networks, and volumes;
- religious-content governance;
- Waqfa application architecture and requirements.

Reusable engineering rules may later be extracted to a central standards repository, including:

- repository organization principles;
- Docker Compose formatting and naming conventions;
- database naming principles;
- Git workflow;
- documentation maintenance policy;
- secrets management;
- audit and verification workflow.

Until a central standards repository exists and is versioned, the copy committed in Waqfa remains authoritative for Waqfa. Extraction must not replace project-specific rules with vague global guidance.

## 4. Pull request checklist

Every pull request must answer:

```text
[ ] Does this change product behavior or requirements?
[ ] Does this change architecture or a technology boundary?
[ ] Does this change repository structure?
[ ] Does this change Docker services, ports, networks, volumes, or images?
[ ] Does this change a PocketBase collection, field, rule, hook, migration, or seed?
[ ] Does this change an environment variable or secret?
[ ] Does this change CI/CD, deployment, backup, restore, or operations?
[ ] Does this create or change a reusable engineering convention?
[ ] Were all affected authoritative documents updated in this PR?
[ ] Were unresolved live-system facts marked explicitly rather than assumed?
```

A `No` answer is acceptable. An applicable unanswered item is not.

## 5. Documentation quality rules

Documentation must:

- name exact paths, identifiers, and ownership boundaries;
- distinguish verified facts from proposed design;
- avoid exposing secrets or private runtime data;
- preserve traceability to requirements and decisions;
- record rollback, migration, or compatibility impact when applicable;
- avoid duplicating the same rule in conflicting forms;
- link to the canonical rule instead of creating local variants.

## 6. Reports

Development and audit reports belong under:

```text
00_Documentation/09_Reports/
├── dev/
├── ia-f/
├── ia-r/
└── ia-v/
```

Reports are append-only, timestamped, and committed with the work they describe when the applicable workflow requires them.

An independent-audit report must include the real subagent/task identifier when the auditing system exposes one. A self-review must not be presented as an independent audit.

## 7. Definition of done

A unit of work is complete only when:

1. implementation or documentation changes are present;
2. affected tests or validations pass;
3. required documentation is updated;
4. migration and rollback impact is recorded;
5. no generic PocketBase naming or cross-project data dependency is introduced;
6. the pull request explains validation, documentation, deployment impact, risks, and rollback.
