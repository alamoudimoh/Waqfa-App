# LLD-07 — Notifications, Travel & Location

> **Project:** Waqfa (وقفة)  
> **Document family:** Low-Level Design v1.0  
> **Source chain:** BRD-Waqfa-v1.1 → HLD-Waqfa-v1.1 → this LLD  
> **Status:** Implementation-ready draft except items marked VERIFY AGAINST LIVE POCKETBASE.  
> **Change rule:** Product behavior changes require BRD revision; architecture changes require HLD revision.

## Traceability
**BRD:** BR-007–008, BR-033–034, BR-036; NFR-13–14.  
**HLD:** §4.8, §11.7, §12.9.

## Location profile
Store confirmed city, optional country code, latitude, longitude, IANA timezone, calculation method and confirmation timestamp. Never continuously track. Detected changes are proposed and require confirmation.

## Travel
Define distance/timezone threshold after browser testing. Accepted change affects future prayer/time-window behavior, preserves transition-day progress and never rewrites history. Rejected change leaves stored location unchanged.

## Reminder logic
Inputs: section windows, completion, user preferences, DND, location/prayer data and recent activity. Suppress completed sections and DND; cap frequency; stay inside valid windows; use gentle-return language after interruption.

## Delivery
Validate PWA notification/service-worker/browser support. Degrade to in-app reminders without breaking core use.

## Tests
Permission denied; DND crossing midnight; DST/timezone change; travel accepted/rejected; no historical rewrite; completed suppression; respectful copy review.
