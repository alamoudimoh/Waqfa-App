# LLD-01 — Dhikr Session, Time-Window & Cross-Device Engine

> **Project:** Waqfa (وقفة)  
> **Document family:** Low-Level Design v1.0  
> **Source chain:** BRD-Waqfa-v1.1 → HLD-Waqfa-v1.1 → this LLD  
> **Status:** Implementation-ready draft except items marked VERIFY AGAINST LIVE POCKETBASE.  
> **Change rule:** Product behavior changes require BRD revision; architecture changes require HLD revision.

## Traceability
**BRD:** BR-002–006, BR-025, BR-028–029, BR-031, BR-033, BR-038, BR-040, BR-047; NFR-04, 07–08, 12–14.  
**HLD:** §4, §10, §11.1.

## Modules
- domain: time-window, reset-boundary, progress-reducer, transfer-protocol.
- server: getSession, saveProgress, completeSection, acquireSession, transferSession.
- client: optimistic controller, pending-write queue, realtime ownership updates.
- UI: counter, reading, focus shell, recovery/transfer dialogs.

## Canonical session
Fields: id, userId, sectionId, businessDate, ownerDeviceId, revision, mode, itemProgress, startedAt, updatedAt, transferredAt. Collection/field names must be confirmed in LLD-02.

## 02:00 business date
Convert current instant to the confirmed IANA timezone, subtract two hours, then derive YYYY-MM-DD. Use timezone/DST data, never a fixed offset. Progress from another businessDate is stale. Confirmed travel affects future resolution without rewriting historical completion.

## Time-window resolution
1. Load approved, applicable core and committed optional sections.
2. Normalize start/end; support overnight intervals.
3. Filter sections valid at the current local time.
4. Exclude completed sections for the business date.
5. Prefer the current canonical active session; otherwise select the nearest valid scheduled section.
6. If none is active, return the next future section and start time or NONE_TODAY.
7. Never use hardcoded next-section mappings.

## Persistence and idempotency
Tap feedback is immediate. Queue writes every five taps, on item completion, visibility change and navigation. Each mutation carries sessionId, baseRevision and mutationId. Duplicate mutationId is idempotent. Revision mismatch returns STALE_REVISION; no last-write-wins.

## Cross-device ownership
One active owner device. Transfer atomically increments revision and changes ownerDeviceId. Old device becomes read-only. Transfer retries use transferRequestId. Stale devices cannot overwrite newer state.

## Failure codes
OFFLINE_QUEUED, STALE_REVISION, OWNER_CHANGED, WINDOW_CLOSED, CONTENT_EMPTY, AUTH_EXPIRED. Empty content never triggers hardcoded religious text.

## Required tests
Window boundaries; overnight windows; 01:59:59/02:00:00; DST; duplicate mutation; stale revision; offline replay order; transfer idempotency; counting/reading equivalence; duration eligibility never erases private completion.
