# LLD-03 — Auth, RBAC & Delegation Enforcement

> **Project:** Waqfa (وقفة)  
> **Document family:** Low-Level Design v1.0  
> **Source chain:** BRD-Waqfa-v1.1 → HLD-Waqfa-v1.1 → this LLD  
> **Status:** Implementation-ready draft except items marked VERIFY AGAINST LIVE POCKETBASE.  
> **Change rule:** Product behavior changes require BRD revision; architecture changes require HLD revision.

## Traceability
**BRD:** BR-015–019; NFR-02–04.  
**HLD:** §6, §8, §10, §11.3.

## Boundary
PocketBase API rules are the final enforcement boundary. Client route guards are UX only. Every privileged TanStack Start server function resolves identity and capability server-side.

## Capabilities
Tickets, content, users, and admins.manage. Regular users have none. Admin permissions come from an active admins record. Super admin has all. Delegation grants only named permissions during valid_from <= now < valid_to and cannot grant admins.manage.

## Resolution
Allow active super admin; else active admin with permission; else active non-expired, non-revoked delegation with permission; otherwise deny. Record the authorization source in audit_log.

## API rules
VERIFY AGAINST LIVE POCKETBASE. Each protected collection/action must express authenticated AND (active super-admin OR active admin capability OR active valid delegation capability). Never trust client-submitted roles.

## Delegation lifecycle
Only super admin grants/revokes. Validate dates and maximum duration. Expiry and revocation take effect server-side immediately. No onward delegation. All changes are audited.

## Test matrix
Unauthenticated; regular; inactive admin; missing permission; valid admin; super admin; delegated before/during/after window; revoked delegation; tampered client state. Tests must run against a staging clone of actual rules.
