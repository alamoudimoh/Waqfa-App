# LLD-04 — Theming, RTL & Accessibility for React

> **Project:** Waqfa (وقفة)  
> **Document family:** Low-Level Design v1.0  
> **Source chain:** BRD-Waqfa-v1.1 → HLD-Waqfa-v1.1 → this LLD  
> **Status:** Implementation-ready draft except items marked VERIFY AGAINST LIVE POCKETBASE.  
> **Change rule:** Product behavior changes require BRD revision; architecture changes require HLD revision.

## Traceability
**BRD:** BR-002, BR-021, BR-027, BR-030, BR-038–040; NFR-05, 10, 14.  
**HLD:** §7, §10, §11.4.

## Tokens
Brand Identity v3 is authoritative. Implement semantic CSS variables and typed token names in tokens.css, typography.css, motion.css, accessibility.css and globals.css. Feature code must not scatter raw visual values.

## RTL
Root is lang=ar dir=rtl. Use logical CSS properties. Mirror directional icons only. Isolate technical LTR content with bdi/dir=ltr. Use the approved Arabic numeral utility except where technical values require LTR.

## Typography and large text
Cairo for UI; Amiri only in approved religious-text contexts. Support 200% zoom and a token-based large-text mode. No horizontal scrolling in core mobile flows.

## Accessibility
Keyboard operation, visible focus, named/value-aware counter, text equivalents for progress, correct dialog focus management, restrained aria-live behavior, reduced motion and large touch targets.

## Focus mode
Remove non-essential navigation and motion while preserving exit, pause, mode switch and accessibility controls. Wake Lock is progressive enhancement only.

## Acceptance
axe scan; keyboard walkthrough; screen-reader walkthrough; 200% zoom; reduced motion; mobile/tablet/desktop RTL review.
