# LLD-06 — Authentication & Account Linking

> **Project:** Waqfa (وقفة)  
> **Document family:** Low-Level Design v1.0  
> **Source chain:** BRD-Waqfa-v1.1 → HLD-Waqfa-v1.1 → this LLD  
> **Status:** Implementation-ready draft except items marked VERIFY AGAINST LIVE POCKETBASE.  
> **Change rule:** Product behavior changes require BRD revision; architecture changes require HLD revision.

## Traceability
**BRD:** BR-010, BR-041 and account lifecycle requirements; NFR-02–03, 11.  
**HLD:** §3.2, §6, §11.6.

## Flows
Email/password sign-up/sign-in, Google OAuth, Google-only accounts, adding a password, controlled provider linking, recovery, export and deletion.

## Linking
Never merge solely by matching email. Require an authenticated session plus proof of control of the second identity. On conflict stop and recover; do not overwrite profile/progress. Verify exact linking behavior against the live PocketBase version.

## Session
Client PocketBase auth store; request-scoped server client; refresh once on 401, retry once, then sign out. No superuser/admin token in localStorage. Final cookie/CSRF design follows LLD-09 deployment mode.

## Deletion
Require re-authentication. Apply the confirmed retention/anonymization policy to public tickets/comments and delete private sessions, Muhasaba and intentions. Audit without private text.

## Tests
Email auth; Google-only auth; linking success; conflict refusal; refresh behavior; suspended/deleted denial; provider metadata cannot escalate privilege.
