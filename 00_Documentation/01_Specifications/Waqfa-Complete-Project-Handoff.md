# Waqfa (وقفة) — Complete Project Handoff & Conversation Record

> **Purpose:** A comprehensive transfer document containing the Waqfa-specific information, decisions, rationale, reviews, architecture direction, identity observations, agreed features, current-app findings, unresolved items, and authoritative project artifacts discussed in the ChatGPT conversation.
>
> **Prepared for:** Mohammed Alamoudi
>
> **Recommended use:** Upload this file together with the latest BRD, HLD, Brand Identity, landing page, and codebase inventory to the new ChatGPT Enterprise workspace. Treat the BRD and HLD as authoritative; use this document to preserve the reasoning, product intent, and decision history behind them.
>
> **Language policy:** Waqfa is Arabic-only in the product interface. This handoff uses Arabic for product decisions and English where technical names or existing artifact text require it.

---

## 1. Source-of-truth hierarchy

When continuing work on Waqfa, use this order of authority:

1. **BRD-Waqfa v1.1** — authoritative product requirements and scope.
2. **HLD-Waqfa v1.1** — authoritative high-level architecture, subject to BRD.
3. **Brand_Identity-Waqfa-Refined-v3.1.html** — visual identity baseline.
4. **waqfa_landing.html** — the current landing-page expression and day-cycle narrative.
5. **waqfainventory.md** — reverse-engineered inventory of the existing live codebase; useful but not authoritative for unverified PocketBase field types or API rules.
6. **This handoff document** — rationale, decisions, discussion history, and continuity context.

If two documents conflict, do not silently choose one. Flag the conflict and resolve it by updating all affected artifacts together.

---

## 2. Project identity

### 2.1 Name

- Arabic name: **وقفة**
- Transliteration/project name: **Waqfa**
- Core semantic idea: a meaningful spiritual pause that returns throughout the day.

### 2.2 Product form

Waqfa is intended as a modern Arabic-only Islamic dhikr/wird companion that works across:

- phone;
- tablet/iPad;
- desktop/laptop;
- installable PWA contexts.

It is not meant to be conceptually tied to mobile only. A key origin idea is that the user should be able to start on one device and continue from another.

### 2.3 Domains

- `waqfa.app` — public landing/marketing experience.
- `my.waqfa.app` — authenticated application.

### 2.4 Ownership and repository

- Owner/product owner/sole developer/super admin: Mohammed Alamoudi.
- Private repository intent: `alamoudimoh/Waqfa-App`.
- Not open source.
- Existing development branch noted in project artifacts: `Devp-v0.1`.

---

## 3. Primary product purpose and priority order

The user confirmed that Waqfa should serve all of the following goals, with a clear priority order.

### 3.1 Recommended priority hierarchy

1. **Help the user complete the core daily adhkar within their intended time windows.**
2. **Build durable daily continuity and commitment.**
3. **Bring the user back to remembrance gently throughout the day.**
4. **Provide calm social motivation through anonymized continuity signals.**
5. **Use productivity-style feedback only as a supporting mechanism, never as the spiritual goal.**

### 3.2 Product statement agreed in discussion

Waqfa should be understood as:

> A modern Arabic dhikr companion across phone, tablet, and computer that helps the user complete daily adhkar in their times, build continuity, and return to remembrance gently, while using social encouragement without turning worship into a raw-number competition.

### 3.3 Important philosophical boundary

- Completion and continuity matter.
- Raw tap count does not represent effort fairly.
- A short phrase such as “سبحان الله” cannot be compared directly to a long text such as Ayat al-Kursi.
- The product must not reward frantic tapping or encourage quantity for its own sake.
- Social motivation should remain calm, respectful, anonymous, and optional.

---

## 4. Brand and landing-page understanding

### 4.1 Landing-page insight

The attached landing page established that Waqfa is not merely a static emerald-and-gold Islamic utility brand. Its central narrative is a complete day of remembrance.

The day-cycle is:

1. dawn / الفجر;
2. morning / الصباح;
3. afternoon/day / النهار;
4. evening / المساء;
5. night/sleep / النوم.

The changing sky across those phases is a core brand device, not decorative styling.

### 4.2 Brand promise derived from the landing page

- “وقفة تتذكّر لك، بلطف ودون إزعاج.”
- A gentle spiritual companion that finds the user at the right time.
- A meaningful pause that recurs throughout the day.

### 4.3 Emotional character

- calm;
- intimate;
- spiritual;
- reassuring;
- warm;
- non-preachy;
- modern;
- respectful;
- focused.

### 4.4 Visual direction

The original identity over-centered the static emerald theme. The refined direction keeps emerald as the principal functional color, while recognizing a broader atmospheric time-of-day system:

- dawn blue;
- morning ivory;
- emerald daytime;
- evening plum;
- sunset clay;
- deep night navy;
- spiritual gold as the recurring accent.

### 4.5 Motion language

- slow transitions;
- soft illumination;
- gradual progress;
- no hyperactive or game-like motion;
- reduced-motion support;
- motion must never interrupt dhikr.

### 4.6 Arabic voice

- Arabic-only;
- short, warm, direct phrases;
- no excessive corporate language;
- no guilt or harsh loss language;
- examples discussed: “تجدك في وقتها”، “وقفة تتذكّر لك”، “أهلًا بعودتك. نبدأ من وقفة اليوم.”

### 4.7 Identity artifact work completed

A refined identity file was produced:

- `Brand_Identity-Waqfa-Refined-v3.1.html`

The refinement included:

- unified CSS design-token contract;
- semantic success/warning/error/information colors;
- operational quality baseline;
- accessibility notes;
- focus handling;
- reduced motion;
- 4px spacing grid;
- minimum 44×44 touch targets;
- documented component states;
- RTL and Arabic-only conventions;
- LTR isolation for code/data;
- Word export support;
- version update to v3.1;
- HTML/JavaScript structural validation.

---

## 5. Current application inventory

The existing application is live and was inventoried through static code analysis. The PocketBase live schema and rules were not reachable, so field types and API rules remain inferred until verified.

### 5.1 Existing pages

- `index.html` — authenticated home, greeting, streaks, contribution grid, prayer/Qibla, categories, leaderboard, Muhasaba.
- `auth.html` — login/signup, password reset, gender picker.
- `session.html` — counting session, feedback, progress, completion, next-wird.
- `settings.html` — user profile, wards, prayer/location, themes, reminders, DND, export/delete.
- `tickets.html` — public Kanban board, ticket creation, comments.
- `updates.html` — release timeline.
- `privacy.html` — privacy policy.
- `admin.html` — ticket/content/user/audit administration.
- `super-admin.html` — admin CRUD and delegation.
- `studio.html` — unrelated Yaqeen Studio page builder; agreed to remove.

### 5.2 Existing key behaviors

- Tap-counting with ripple, sound, haptic, keyboard, and progress arc.
- Periodic writes every five taps and on completion.
- Offline pending-sync fallback for session progress.
- Optional ward commitment with a seven-day removal lock.
- Daily reset at 02:00 device-local time.
- Dynamic next-wird resolution.
- Prayer times via an external provider and geolocation/manual city.
- Qibla bearing/distance.
- Global leaderboard based on activity.
- Public tickets and comments.
- PWA manifest and service worker.

### 5.3 Known gaps in the current codebase

1. Muhasaba UI saves only to `localStorage` even though a PocketBase save method exists.
2. Delegation records are created but not consumed to grant runtime capability.
3. Admin/super-admin client-side gates are UX-only; actual PocketBase rules are unverified.
4. `studio.html` uses an unrelated raw-superuser-token authentication model.
5. App versions are inconsistent across files.
6. `session.html` silently falls back to unrelated hardcoded morning adhkar when DB content is missing.
7. No automated tests exist.
8. PocketBase field types, constraints, indexes, and rules are inferred rather than confirmed.

---

## 6. Confirmed product decisions

### 6.1 Core sections

The three core sections are:

- أذكار الصباح;
- أذكار المساء;
- أذكار النوم.

They should be described as **core fixed sections**, not “mandatory” in a way that implies a religious ruling or blocks use of the app.

They:

- are always present;
- cannot be removed from the daily plan;
- are all required for a fully completed continuity day;
- do not prevent use of the rest of the application if incomplete.

### 6.2 Equal weighting

The three core sections have equal completion weight:

- one section = approximately 33%;
- two sections = approximately 67%;
- all three = 100% and a fully completed continuity day.

The longer morning section must not receive more weight simply because it contains more text.

### 6.3 Optional wards

- Optional sections may be added as personal commitments.
- Once committed, they remain locked for seven days before removal.
- Optional wards do not break the core continuity streak if missed.
- They contribute a smaller secondary commitment indicator.
- Users should not be able to inflate ranking by selecting many easy optional wards.

### 6.4 Completion after the time window

Users may complete a section after its intended window:

- it is saved in the personal record;
- it is labeled “completed outside time” or equivalent;
- it does not count as on-time completion;
- it does not repair the full-day continuity streak for that day;
- the app never blocks remembrance merely because the window closed.

### 6.5 Missed section and gentle language

If a user completes only part of the day:

- show “أكملت وقفتين من ثلاث” or equivalent;
- do not say “failed” or use shame language;
- the fully completed-day streak ends mathematically;
- the user can immediately begin a new streak without punitive animation;
- a separate weekly attendance measure should preserve the value of partial effort, e.g. “حضرت 6 أيام من 7”.

### 6.6 Muhasaba privacy

Muhasaba text is private to the user only.

Admins and super-admins:

- cannot read the text;
- cannot search it;
- cannot export it;
- cannot see it in support workflows.

They may only see non-content operational metadata if necessary, such as whether a save succeeded or the number of records.

The user can:

- create;
- edit;
- delete;
- export;
- have Muhasaba deleted with account deletion.

### 6.7 Authentication

Confirmed authentication methods:

- email and password;
- Google OAuth/Google sign-in.

Google is additive, not a replacement for password login.

Agreed behavior:

- a Google-only account is valid;
- a password may be added later;
- a duplicate account must not be created automatically if a matching email already exists;
- account linking must be deliberate and safe;
- the previous HLD statement “no SSO” was obsolete and was corrected in v1.1.

### 6.8 Social/continuity board

The social board is not a worship competition. It is a motivation surface for continuity and timely completion.

Confirmed decisions:

- participation is optional;
- disabled by default;
- user joins deliberately;
- only alias and high-level continuity are shown;
- real name, email, city, detailed dhikr, raw counts, Muhasaba, and personal notes are hidden;
- user can opt out at any time without deleting personal history.

Suggested onboarding moment:

- invite the user after the first full week or first meaningful completion milestone.

Suggested title concepts:

- رفقاء الاستمرار;
- دائرة الاستمرارية;
- المستمرون هذا الأسبوع.

### 6.9 Continuity scoring

Raw taps must carry zero ranking weight.

Recommended weekly scoring model:

- 70% — proportion of days with all three core sections completed;
- 20% — on-time completion within section windows;
- 10% — fulfillment of optional wards that the user voluntarily committed to.

The UI should prefer human-readable measures rather than opaque game points:

- completed 6 of 7 days;
- on-time commitment: excellent;
- optional wards: 4 of 5;
- current continuity: 12 days.

### 6.10 Estimated duration

A new field was agreed for `dhikr_library`:

- `estimated_duration_seconds`

Recommended meaning:

- estimated duration for one repetition of the item;
- total expected item duration = `estimated_duration_seconds × count_target`;
- used to identify clearly impossible completion speed;
- used only for social/continuity eligibility and quality signals;
- must not erase personal progress;
- must not accuse the user of cheating;
- must allow wide tolerance for different reading speeds.

Suggested gentle prompt for repeated impossible-speed tapping:

> تمهّل قليلًا، وقفتك أجمل بحضورك.

### 6.11 Counting mode and reading mode

Two session interaction modes were agreed:

1. **Counting mode** — tap for each repetition.
2. **Reading mode** — read the text and confirm item completion without tapping every repetition.

Reading mode is especially appropriate for long texts.

### 6.12 Cross-device continuation

A core product idea is that the user can start on one device and continue on another.

Confirmed requirements:

- phone, tablet, and computer use the same account state;
- latest confirmed progress is restored;
- position, current item, count, and completion state synchronize;
- progress must not decrease or disappear;
- only one active session owner exists per account;
- opening on a second device prompts the user to “continue here”;
- session ownership transfers to the new device;
- stale writes from the old device are rejected or ignored.

Suggested technical fields/concepts:

- `active_device_id`;
- `session_revision`;
- `last_synced_at`;
- `session_started_at`;
- active session owner/lease;
- revision-safe stale-write rejection.

### 6.13 Travel and location changes

The device itself remains the practical time source, but the application should detect meaningful travel/location changes.

Confirmed experience:

1. The app notices a meaningful new location or timezone.
2. It does not silently change the account.
3. It asks the user to confirm.
4. Example: “لاحظنا أنك انتقلت إلى موقع جديد. هل تريد تحديث موقع وقفة ومواقيت الصلاة إلى القاهرة؟”
5. Options:
   - update location and times;
   - keep previous location;
   - choose manually.

On confirmation, update:

- city;
- coordinates;
- timezone/display context;
- prayer times;
- Qibla direction and distance;
- upcoming reminders;
- remaining time-sensitive sections when appropriate.

Travel-day behavior:

- previously completed sections remain completed;
- new timing applies only to remaining sections;
- historical days are not recalculated;
- the day is treated as a transition day;
- the app should not penalize continuity due to overlapping timezone logic.

Privacy/battery principle:

- no continuous background tracking is required;
- check on app open or explicit prayer/location update.

### 6.14 Time source and daily reset

- Device-local time is the source for active windows.
- “Today” begins at the most recent 02:00 device-local boundary.
- Progress older than that boundary is not restored into the current day.
- Significant time/location changes trigger recalculation and confirmation logic.

### 6.15 Accessibility

WCAG 2.2 AA was explained and agreed as a quality target for core routes.

Practical meaning:

- sufficient text contrast;
- large touch targets;
- keyboard support;
- visible focus;
- screen-reader semantics;
- text scaling without layout breakage;
- reduced motion;
- errors not communicated by color alone;
- accessible forms;
- large-text mode.

Priority routes:

- authentication;
- dhikr session;
- settings;
- main dashboard;
- admin panels;
- landing page.

---

## 7. Agreed feature additions 1–13

The user explicitly approved all thirteen additions below.

### 7.1 Daily spiritual plan

The home page should present the user’s day as a coherent journey rather than disconnected cards.

Show:

- morning status;
- evening status;
- sleep status;
- optional wards;
- daily completion percentage;
- next upcoming Waqfa;
- in-time/out-of-time state.

Example:

> الصباح مكتمل · المساء قادم بعد ساعتين · النوم لاحقًا

### 7.2 Continue across devices

This is a core differentiator, not a background implementation detail.

Show:

- active device;
- last synchronization time;
- “continue here” action;
- safe session transfer;
- pending/synced state.

### 7.3 Focus mode

During dhikr:

- hide non-essential navigation;
- hide leaderboard/community noise;
- suppress non-critical in-app interruptions;
- optionally keep the screen awake where supported;
- use a calm, large, distraction-free layout;
- support elderly users and distant viewing.

### 7.4 Reading mode

Provide a reading-completion mode in addition to per-repetition tapping.

Use `estimated_duration_seconds` as a gentle eligibility/quality signal, not a hard spiritual gate.

### 7.5 Adaptive respectful reminders

Reminder behavior should react to progress:

- cancel later reminders after completion;
- if started but not finished, say “أكمل وقفتك” or equivalent;
- reduce pressure after repeated ignores;
- allow one calm final reminder near window closure;
- cap reminders per section;
- gradually learn the user’s preferred time inside the allowed window;
- respect DND.

This does not require generative AI; deterministic behavior is sufficient.

### 7.6 Travel mode

After confirmed travel/location change:

- update prayer/Qibla/reminders;
- preserve completed items;
- mark the day as transitional;
- avoid unfair continuity loss.

### 7.7 Technical continuity protection

Protect the user from losing continuity due to:

- offline network;
- backend outage;
- failed synchronization;
- notification failure;
- device transfer conflict.

If a valid local completion occurred within time but failed to reach the server, it should be reconciled later.

This is not a commercial “streak freeze”; it is protection from technical failure.

### 7.8 Personal weekly report

At week end, show private self-comparison:

- complete days;
- sections most often delayed;
- best adherence period;
- optional wards completed;
- Muhasaba entry;
- comparison with the user’s own prior patterns only.

Example:

> أكملت 6 أيام من 7. أذكار المساء كانت أكثر محطة تحتاج إلى انتباه.

### 7.9 Personal weekly intention

A lightweight intention for the week, such as:

- maintain all three core sections;
- focus on morning adhkar;
- improve sleep adhkar;
- commit to one optional ward;
- return after interruption.

Use a gentle name such as **نية الأسبوع**, not a competitive “challenge.”

### 7.10 Gentle return after interruption

Do not emphasize loss.

Preferred behavior:

- “أهلًا بعودتك. نبدأ من وقفة اليوم.”
- avoid dramatic “you lost a 34-day streak” messaging;
- offer a simple restart;
- preserve historical records without shame;
- optionally hide the old streak value during return.

### 7.11 Enhanced library

Expand current search/library with:

- full-text search;
- filter by time;
- favorites;
- committed wards;
- recent items;
- short/long content;
- source display without clutter;
- open/read outside time, clearly marked outside social eligibility.

### 7.12 Large-text mode

A dedicated mode, not only a small font slider:

- very large text;
- larger controls;
- stronger contrast;
- one or two lines per screen when needed;
- simplified session UI;
- fewer animations.

### 7.13 Optional reviewed audio

Potential later-phase feature:

- approved audio recordings for selected content;
- learning/listening support;
- playback speed;
- repetition;
- controlled storage/hosting;
- no random third-party runtime sourcing;
- exact relation between listening and completion remains an implementation/policy detail.

---

## 8. Features intentionally not recommended for the core product

The discussion explicitly advised against over-gamification and unrelated social expansion.

Avoid in the core baseline:

- point currencies;
- badge stores;
- direct one-on-one competition;
- public detailed dhikr counts;
- AI-generated religious content;
- open public chat;
- full social groups at an early stage;
- excessive challenges;
- intrusive reminders;
- advertising inside dhikr;
- comparison by raw repetition count.

---

## 9. Content governance decision

The original BRD used a detailed committee model. The user later clarified that Waqfa relies on Qur’an and authentic Sunnah documented in trusted books, but preferred to avoid expanding the BRD into a potentially controversial detailed religious-review metadata framework.

Confirmed decisions:

- do not require reference date, reviewer identity, or review history for every item as a BRD requirement;
- do not introduce runtime religious-content APIs;
- content remains reviewed/approved before publication;
- keep wording concise and non-controversial.

Recommended simplified statement:

> يقدم وقفة محتوى الأذكار والأوراد المستند إلى الكتاب والسنة الصحيحة، ويخضع المحتوى لمراجعة واعتماد داخلي قبل نشره. لا يجلب التطبيق النصوص الدينية من مصادر خارجية مباشرة أثناء التشغيل.

Note: BRD v1.1 still contains the more detailed committee wording and may need a later wording revision if the owner wants the simplified formulation to be authoritative.

---

## 10. Authentication and account lifecycle details

### 10.1 Confirmed

- Email/password signup and login.
- Google OAuth.
- Google-only accounts allowed.
- Password can be added later.
- Safe linking required.
- Duplicate prevention required.

### 10.2 Current app

- Current codebase uses PocketBase email/password.
- Password reset exists.
- Client-side signup guards include alias, password confirmation, and gender.
- Google had not been implemented in the inventoried code.

### 10.3 Required future design

- Google OAuth provider configuration.
- Account linking flow.
- Existing-email collision handling.
- Recovery paths.
- Session lifecycle.
- No raw admin/superuser tokens in `localStorage`.

---

## 11. Privacy decisions

### 11.1 Public identity

Only anonymous alias may appear on social/community surfaces.

Never expose:

- real name;
- email;
- exact location;
- Muhasaba;
- detailed dhikr history;
- raw tap counts.

### 11.2 Social board

- opt-in;
- explicit explanation before joining;
- withdraw anytime;
- withdrawal hides the user but does not erase private history.

### 11.3 Muhasaba

Owner-only access.

### 11.4 Location

- user confirmation before updating;
- no unnecessary continuous tracking;
- manual choice available.

---

## 12. Security and administration

### 12.1 Roles

- regular user;
- admin;
- super admin;
- temporary delegated user permissions.

### 12.2 Admin permissions

Admin scope can include:

- tickets;
- content;
- users.

### 12.3 Delegation

- time-boxed;
- permission-scoped;
- must be enforced at runtime;
- cannot remain merely a stored record.

### 12.4 Authorization boundary

- client-side gates are UX only;
- privileged access must be server/PocketBase-rule enforced;
- every privileged action must be audited server-side.

### 12.5 Audit

- no silent in-memory/local-only audit fallback;
- append-only behavior;
- CSV export may remain.

### 12.6 Removed component

`studio.html` / Yaqeen Studio must be removed from the product and its raw-superuser-token pattern must not reappear.

---

## 13. Architecture direction

### 13.1 Target stack

- React 19;
- TanStack Start;
- TanStack Router;
- Tailwind CSS;
- PocketBase;
- Docker;
- Proxmox/LXC;
- PWA manifest/service worker.

### 13.2 Data flow

- TanStack Start server functions for privileged and one-shot reads/writes.
- Browser-held PocketBase realtime/SSE for live UI surfaces.
- Request-scoped PocketBase server client; no shared global authenticated client.

### 13.3 Key architectural components

- App shell;
- home dashboard/daily plan;
- dhikr session/time-window engine;
- settings;
- prayer and Qibla;
- Muhasaba;
- public ticket board;
- admin dashboard;
- super-admin/delegation;
- landing page as a separate product surface;
- audit and content governance.

### 13.4 Core subsystem

The highest-risk subsystem is the dhikr session/time-window/cross-device engine.

It owns:

- counting;
- reading mode;
- progress persistence;
- 02:00 reset;
- active windows;
- next-wird;
- resume;
- offline queue;
- technical continuity protection;
- device transfer;
- revision conflicts;
- duration plausibility;
- in-time/out-of-time completion.

---

## 14. Data model direction

Existing inferred collections:

- `users`;
- `dhikr_library`;
- `user_activity`;
- `tickets`;
- `ticket_comments`;
- `muhasaba`;
- `admins`;
- `delegation`;
- `audit_log`;
- `templates` (to remove/drop or explicitly retain outside Waqfa).

New/expanded concepts agreed:

- `estimated_duration_seconds` on each dhikr item;
- active device/session ownership;
- session revision/version;
- last synchronization timestamp;
- social-board opt-in flag;
- private Muhasaba access rules;
- Google identity/link records or equivalent PocketBase OAuth mapping;
- travel/location confirmation state as needed;
- weekly intention/report data as required.

Exact field types and schema changes must be confirmed against the live PocketBase instance before LLD completion.

---

## 15. Time-window logic

- Each section has `time_start` and `time_end`.
- Those windows are the sole source of truth for active availability.
- “Next wird” must never use hardcoded mappings.
- Resume must not restore a section whose window closed.
- If no section is active, show an explicit “no active wird now” state.
- Library access remains available outside windows.
- Out-of-time completion is recorded separately from in-time completion.

---

## 16. Notification logic

Existing capabilities:

- base reminders;
- ward reminders;
- DND;
- conflict warning;
- sound/haptic preferences.

Agreed expansion:

- adaptive reminders;
- cancel after completion;
- unfinished-session reminder;
- final calm reminder near closure;
- pressure reduction after repeated ignores;
- per-section cap;
- preferred-time learning inside the valid window;
- travel confirmation updates reminders;
- no excessive interruption.

---

## 17. Prayer times and Qibla

- GPS or manual city.
- Calculation method selectable.
- External prayer-time/location APIs are legitimate because the ban applies to religious text ingestion, not operational prayer-time calculation.
- Travel confirmation should update prayer times, Qibla, and reminders.
- Location update should require explicit confirmation.

---

## 18. Landing page requirements and narrative

The landing page is a distinct route/deployment surface.

It should communicate:

- a full day of remembrance;
- dawn, morning, daytime, evening, sleep;
- gentle reminders;
- privacy;
- reviewed content;
- PWA/multi-device use;
- no ads/no noise;
- niyyah/waqf dedication section;
- clear call to enter the app.

The exact legal or formal meaning of “waqf” was not conclusively defined in the conversation. The current landing page uses a niyyah dedication concept. Do not make legal/financial waqf claims without owner confirmation.

---

## 19. BRD review outcomes

The original BRD was assessed as strong and approximately 80–85% complete before the extended discussion.

Areas identified and then resolved or substantially clarified:

- primary purpose;
- social board philosophy;
- content metadata scope;
- meaning of core sections;
- auth methods;
- Muhasaba privacy;
- reminder timing;
- device time;
- multi-device use;
- accessibility;
- Arabic numerals/RTL;
- travel;
- continuity;
- landing-page role;
- backup/security areas noted for later architecture/runbook treatment.

Internal consistency issues identified:

- deferred features appeared both out-of-scope and Could Have;
- delegation enforcement needed server-side clarity;
- HLD said no SSO before Google was approved;
- older HLD footer/version text may still contain a stale v1.0 label.

---

## 20. HLD review outcomes

HLD v1.1 was updated to align with the new decisions, including:

- Google OAuth;
- private Muhasaba;
- opt-in continuity board;
- estimated duration;
- cross-device active-session ownership;
- travel handling;
- focus and large-text accessibility;
- respectful UX;
- new LLD backlog.

Important note: The generated HLD v1.1 file should be checked for a stale final line that still says “End of HLD v1.0.” This is a document-label defect, not an architectural decision.

---

## 21. Proposed implementation priorities

### Phase 1 / highest priority

1. Daily spiritual plan.
2. Session/time-window correctness.
3. Cross-device continuation and one active session.
4. Muhasaba real persistence and privacy.
5. Google sign-in and safe account linking.
6. Server-enforced admin/delegation.
7. Focus mode.
8. Reading mode and estimated duration.
9. Travel confirmation and prayer/reminder update.
10. Technical continuity protection.

### Phase 2

1. Adaptive reminders.
2. Weekly report.
3. Weekly intention.
4. Gentle return.
5. Enhanced library.
6. Large-text mode.
7. Opt-in continuity board/scoring.

### Later

1. Reviewed audio.
2. Carefully designed personal challenges if still desired.
3. Sharing cards only if they remain calm and privacy-safe.
4. Home-screen widgets and deeper OS integrations.

---

## 22. LLD backlog agreed in HLD v1.1

1. LLD-01 — Dhikr Session, Time-Window & Cross-Device Engine.
2. LLD-02 — PocketBase Schema Confirmation & Migration Notes.
3. LLD-03 — Auth, RBAC & Delegation Enforcement.
4. LLD-04 — Theming, RTL & Accessibility for React.
5. LLD-05 — Audit Logging & Content-Approval Workflow.
6. LLD-06 — Authentication & Account Linking.
7. LLD-07 — Notifications, Travel & Location.
8. LLD-08 — Weekly Insights, Intentions & Continuity Board.
9. LLD-09 — Deployment Runbook.

---

## 23. Remaining open questions

The following are not fully resolved and should be handled in LLD or explicit owner decisions:

1. Exact PocketBase API rules for admin OR active delegation.
2. Whether landing and authenticated app share a deployable.
3. Exact live PocketBase field types, constraints, indexes, and rules.
4. Whether the `templates` collection is dropped entirely.
5. Exact single version source mechanism.
6. Whether the content committee needs in-app workflow changes.
7. Exact active-session lease/revision protocol.
8. Exact duration tolerance bands.
9. Location-change threshold and browser/device support.
10. Audio formats, storage, caching, and offline policy.
11. Exact continuity-board wording and visual treatment.
12. Whether listening can ever count as completion.
13. Formal legal/financial meaning, if any, of the waqf dedication.
14. Backup, restore, retention, and disaster-recovery details should be formalized in the deployment/runbook even if not expanded in the BRD.
15. Private/security-sensitive ticket type may still need a decision; the current board is public by design.

---

## 24. Explicit instructions for future assistants

When continuing Waqfa work:

- Do not change or add product scope without asking Mohammed first.
- If unclear, ask before implementation or document modification.
- Do not silently reinterpret religious-content policy.
- Keep the app Arabic-only and RTL.
- Treat BRD as product authority and HLD as architectural authority.
- Review all attached files before asking questions that may already be answered.
- Preserve calm, non-shaming UX.
- Do not convert continuity into raw-count gamification.
- Do not expose private Muhasaba or detailed activity publicly.
- Do not use runtime third-party APIs to fetch religious text.
- Keep cross-device continuation as a core product requirement.
- Keep the three core sections equally weighted.
- Allow out-of-time completion but distinguish it from on-time completion.
- Require explicit user confirmation for location changes.
- Keep social visibility opt-in.

---

## 25. Suggested first message in a new Enterprise chat

> هذه هي ملفات مشروع وقفة الرسمية وسجل التسليم الكامل. تعامل مع `BRD-Waqfa-v1.1.md` باعتباره مصدر متطلبات المنتج، و`HLD-Waqfa-v1.1.md` باعتباره مصدر القرارات المعمارية، و`Brand_Identity-Waqfa-Refined-v3.1.html` باعتباره المرجع البصري، و`Waqfa-Complete-Project-Handoff.md` باعتباره سجل القرارات والسياق. راجع التعارضات بين الملفات أولًا. لا تغيّر قرارًا ولا تضف نطاقًا جديدًا قبل سؤالي. وقفة عربية فقط، تعمل عبر الجوال واللوحي والكمبيوتر، وتركز على إكمال الأذكار في وقتها والاستمرارية والتحفيز الهادئ دون منافسة على عدد الضغطات.

---

# Appendix A — Full BRD-Waqfa v1.1

# Business Requirements Document — Waqfa (وقفة)

> **Document type:** Lean BRD · **Requirement method:** MoSCoW
> **Project:** Waqfa — Arabic-only Islamic dhikr/wird productivity PWA
> **Owner:** Mohammed Alamoudi
> **Status:** Draft v1.1 · Expanded product baseline for an existing, live application
> **License intent:** Not open-source (private repo, `alamoudimoh/Waqfa-App`)

## 0. Document Control

| Field | Value |
|---|---|
| Version | 1.1 (expanded product baseline) |
| Basis | Read-only codebase inventory (`Devp-v0.1`, `PocketBase/Public`) + confirmed project memory + past conversation history |
| Requirement IDs | BR-001–047, NFR-01–14 (this document) |
| Change log | v1.1 — adds cross-device continuation, daily spiritual plan, focus/reading modes, adaptive reminders, travel handling, continuity protection, weekly insights, personal intentions, gentle return, enhanced library, large-text mode, optional reviewed audio, Google sign-in, private Muhasaba, and opt-in continuity board. |

**Provenance note:** Unlike a greenfield rebuild, Waqfa already exists and is live. This BRD treats the real, inventoried app as the baseline and treats every known gap or half-finished feature (Muhasaba persistence, delegation enforcement, admin authz verification, `studio.html`) as a **Must-have requirement to complete or resolve**, not as accepted debt — this is the first time these have been written down as formal requirements, so the bar is "correct and complete," not "as currently shipped." Where the inventory's schema is inferred from client code only (no live PocketBase schema was reachable), this is flagged inline.

## 1. Vision

Waqfa is an Arabic-only, self-hosted Islamic dhikr and wird companion that works across phone, tablet, and computer. It helps a Muslim complete the core daily adhkar in their intended windows, build long-term continuity, and return to remembrance gently throughout the day through a calm, distraction-free, productivity-app-quality experience. Social features exist only to encourage continuity and timely completion; raw repetition counts are never the goal.

**Guiding principles**
- **Religious integrity is non-negotiable.** No dhikr, hadith, ayah, or Ruqyah text enters the app without prior approval from the content review committee (لجنة). Live/runtime API sourcing of religious text is never acceptable — content is batch-fetched, human-reviewed, then manually imported.
- **Privacy by design.** No real names or emails are ever exposed publicly (leaderboard, tickets); users are represented by anonymous aliases.
- **Zero-hardcode, DB-driven content.** Dhikr sections, categories, and library content are rendered from PocketBase (`dhikr_library`), never hand-written into the frontend.
- **Transparency with the community.** Bug reports and feature suggestions are visible to all users on a public Kanban board, not filtered through a silent support inbox.
- **Calm, focused interaction.** The interface should support khushū' (خشوع) — no ads, no dark patterns, no unnecessary interruptions during a dhikr session.
- **Completion before competition.** The product rewards timely completion and continuity, not raw tap counts or excessive repetition.
- **Continue anywhere.** A user can begin on one device and continue from the latest confirmed state on another device using the same account.

## 2. Scope

### 2.1 In Scope
- The authenticated PWA app (`my.waqfa.app`): daily spiritual plan, dhikr counting/reading sessions, cross-device continuation, settings/personalization, prayer times + Qibla, continuity board, weekly self-reflection (Muhasaba), personal weekly intentions, reports, library, and public ticket/Kanban board.
- The public marketing/landing page (`waqfa.app`, workstream name "Waqfa 04") — including the day-cycle landing concept and niyyah dedication section.
- Admin and super-admin dashboards for content approval, ticket triage, user management, and time-boxed permission delegation.
- The `dhikr_library` content pipeline: sourcing → committee review → manual import → publish.
- Self-hosted backend (PocketBase) on owned infrastructure (Proxmox/LXC, Docker).
- The planned React 19 + TanStack Start frontend migration (architecture itself is HLD scope; this BRD states the migration as a constraint/requirement, not a design).

### 2.2 Out of Scope (this phase)
- `studio.html` ("Yaqeen Studio" page-builder) — to be **removed entirely**; it is unrelated to Waqfa's product surface, uses a different auth model, and is not part of this product going forward.
- Non-Arabic localization. Waqfa is Arabic-only by design; no English/bilingual UI is planned.
- Native mobile app-store builds (iOS/Android) — PWA/installable first; the experience must remain responsive across phone, tablet, and desktop.
- Public/open-source release of the repository.
- Live/real-time ingestion of religious content from any third-party API at runtime (permanently out of scope on religious-integrity grounds, not just this phase).
- The 30-day "challenges" feature, achievement-sharing via Web Share/Canvas, and full offline sync — these are explicitly deferred (previously tracked as v3.1/v3.2 ideas), not committed requirements of this BRD.

### 2.3 Assumptions
- Deployment target: owned Proxmox/LXC infrastructure, PocketBase in Docker, reachable via `my.waqfa.app` and `waqfa.app`.
- Target frontend stack: **React 19 + TanStack Start**, migrating from the current Vanilla JS + Tailwind implementation. Backend (PocketBase) is unaffected by this migration.
- Mohammed is the sole developer and super admin; there is no team beyond the content review committee (a review/approval function, not necessarily a coding role).
- Full architecture (migration approach, data-layer client, component structure) is HLD scope, not this BRD.

## 3. Stakeholders

| Stakeholder | Role | Interest |
|---|---|---|
| Owner (Mohammed) | Product owner, sole developer, super admin | Full control, religious accuracy, product quality |
| Content review committee (لجنة) | Religious content approval authority | Every piece of dhikr/hadith/ayah/Ruqyah text is accurate and properly attributed before publication |
| End users (Muslims using the app) | Primary users | A calm, private, reliable daily dhikr companion |
| Coding agents (Claude Code, GitHub Copilot) | Implementers | Precise, scoped, verifiable requirements grounded in the real codebase |

## 4. User Roles (canonical — as actually implemented)

Waqfa's role model is **not** the Admin/Co-Admin/User/Guest capability matrix used on other projects (e.g. Marsid) — it uses its own model, built around a dedicated `admins` collection layered on top of PocketBase's standard `users` auth collection:

| Role | Source | Intent |
|---|---|---|
| **Regular user** | `users` collection, no `admins` record | Full personal use: dhikr sessions, settings, private Muhasaba, continuity tracking, opt-in public continuity board, reports, and public ticket board. No administrative access. |
| **Admin** | `users` + `admins` record with `role = 'admin'`, `is_active = true` | Ticket triage, `dhikr_library` content-approval queue, user suspend/activate, read-only audit log. Scoped by `admins.permissions` (`tickets`/`content`/`users` booleans). |
| **Super admin** | `users` + `admins` record with `role = 'super_admin'`, `is_active = true` | Everything an admin can do, plus admin-account CRUD (create/toggle/permission-chips/expiry) and time-boxed delegation of admin-style permissions to a regular user. |

**Delegation model:** a super admin may grant a regular user temporary (`valid_from`/`valid_to`), permission-scoped (`tickets`/`content`/`users`) elevated access via a `delegation` record. This must actually grant runtime capability (see BR-017) — today it only creates the record with no enforcement.

## 5. Functional Requirements (MoSCoW)

### 5.1 MUST HAVE

| ID | Requirement |
|---|---|
| BR-001 | **Authenticated home dashboard.** On login, the user sees a personalized greeting, current/longest streak, a 12-week (84-day) activity contribution grid, and featured/favorite dhikr category cards. |
| BR-002 | **Dhikr counting session.** A dedicated session screen lets the user tap-count each dhikr item toward its target count, with visual progress (arc), audio/haptic feedback, adjustable font size, and keyboard support. |
| BR-003 | **Dynamic "next wird" resolution.** On session completion, the app determines the next scheduled section by current time and section `time_start`/`time_end` windows — never a hardcoded next-section mapping. |
| BR-004 | **Time-validated section selection.** The "next wird" and "resume" logic must only select a section whose `time_start`–`time_end` window contains the current time; a user must never be routed into أذكار النوم (or any section) outside its valid time window. *(Resolves the previously known session.html time-validation gap.)* |
| BR-005 | **Daily reset at 02:00 local time.** All counters and per-day progress reset at 02:00 device-local time; any saved progress older than the most recent 02:00 boundary is discarded, not carried over. |
| BR-006 | **Core + optional (ward) sections.** أذكار الصباح / المساء / النوم are core, always-present sections that cannot be removed from the daily plan; users may additionally commit to optional "ward" sections, which lock for exactly 7 days from commitment before they can be removed, with a visible countdown/progress indicator. |
| BR-007 | **Settings as single source of truth.** All user configuration (profile, ward commitments, prayer/location, theme/font/accent, notification schedule + DND, data export/deletion) lives in `settings.html`, stored in PocketBase on the `users` record — no `localStorage`-based configuration, and no other page redirects into settings except via the avatar menu. |
| BR-008 | **Prayer times + Qibla.** Compute prayer times (GPS or manual city) and a live Qibla compass bearing/distance to Mecca, with a selectable calculation method. |
| BR-009 | **12-week activity grid + streaks.** Visualize the last 84 days of activity with 4 intensity levels derived from `user_activity.total_count`/`level`, plus current-streak and longest-streak stats. |
| BR-010 | **Opt-in continuity board with anonymized identity.** Participation is disabled by default and enabled by explicit user choice. Ranking is based on timely completion and continuity, not raw dhikr counts. Only alias, continuity days, and high-level completion indicators may be public; detailed adhkar, counts, Muhasaba, location, and identity data remain private. |
| BR-011 | **Private weekly Muhasaba that persists to PocketBase.** The weekly self-review must write to `muhasaba` and be readable only by its owner. Admins and super admins cannot read, search, or export the text. Local-only fallback is not acceptable. |
| BR-012 | **Content review committee gate.** No dhikr, hadith, ayah, or Ruqyah text may be published to `dhikr_library` without prior committee approval; the `approved` flag must gate visibility, and the admin content-approval queue is the only path to publication. |
| BR-013 | **No live runtime religious-content APIs.** Religious content is sourced via offline batch-fetch → committee review → manual import; the running app must never call a third-party religious-content API directly at runtime. |
| BR-014 | **Public transparency board.** All bug reports and feature suggestions (`tickets`) are visible to every user, with per-ticket threaded comments (`ticket_comments`), while the submitter's identity is not publicly shown. |
| BR-015 | **Admin content-approval and ticket-triage dashboard.** Admins can review/approve/reject `dhikr_library` entries, triage tickets (status, notes, image-attached replies), and manage users (suspend/activate) — each gated by their specific `admins.permissions`. |
| BR-016 | **Super-admin account and delegation management.** Super admins can create/toggle admin accounts with per-section permissions and expiry, and grant time-boxed delegated permissions to a regular user. |
| BR-017 | **Delegation must actually grant runtime capability.** A user with an active, non-expired `delegation` record must be able to exercise the delegated permissions (`tickets`/`content`/`users`) at runtime — creating the record alone is insufficient. *(Resolves the known gap where delegation records exist but are never consumed.)* |
| BR-018 | **Server-enforced admin/super-admin authorization.** Access to admin and super-admin capabilities must be enforced by PocketBase collection API rules, not solely by client-side role checks; the client-side gate is UX only. This must be explicitly verified against the live PocketBase rules, not assumed from the client code. |
| BR-019 | **Audit logging.** Every privileged admin/super-admin action is recorded in `audit_log` (actor, action, target collection, before/after values, timestamp) — server-side, without a local-only fallback that can silently drop entries. |
| BR-020 | **Removal of `studio.html`.** The orphaned "Yaqeen Studio" page-builder tool — with its separate branding, raw-superuser-token auth model, and unrelated `templates` collection — is removed from the product entirely. |
| BR-021 | **Public landing page (waqfa.app / "Waqfa 04").** A day-cycle-themed marketing page at `waqfa.app`, structurally separate from the authenticated app at `my.waqfa.app`, introduces the product and links to the app. |
| BR-022 | **PWA installability.** The app is installable (manifest + service worker), with cache-first static-asset caching and pass-through for API/cross-origin requests. |
| BR-023 | **Adaptive reminder scheduling with Do Not Disturb.** Users configure per-section reminders and DND hours. Completed sections cancel later reminders; partially completed sessions may receive a gentle continuation reminder; repeated ignored reminders reduce rather than increase interruption; reminders remain bounded and respectful. |
| BR-024 | **Single source of truth for app version.** The app must expose one canonical version number, consistent across config, footer text, and cache-busting query strings — not the current mix of `3.0.0`/`3.6.0`/per-file `?v=` values. |
| BR-025 | **No silent content fallback across unrelated sections.** If a requested section's `dhikr_library` query returns no rows, the app must show an explicit "content not yet available" state — not silently substitute an unrelated hardcoded dhikr list. |
| BR-026 | **React 19 + TanStack Start migration.** The frontend is migrated from Vanilla JS to React 19 + TanStack Start, with the PocketBase backend retained; only product-approved, versioned schema additions may be introduced. *(Architecture of the migration itself is HLD scope.)* |
| BR-027 | **Arabic-only interface.** The entire app, admin panels, and landing page are Arabic-only, RTL — no bilingual/English mode is required or planned. |
| BR-028 | **Daily spiritual plan.** The home experience presents the user’s day as a clear sequence of core and committed sections, showing completed, current, upcoming, late, and out-of-window states, daily completion percentage, and the next meaningful pause. |
| BR-029 | **Cross-device continuation with one active session.** A user can begin on one device and continue on another from the latest confirmed item/count/progress state. Only one device may own the active session at a time; transferring the session must not lose, duplicate, or reduce progress. |
| BR-030 | **Focus mode for dhikr sessions.** During a session, non-essential navigation, social surfaces, tickets, updates, and unrelated prompts are hidden. The mode supports large controls, optional screen wake lock where available, and minimal interruption. |
| BR-031 | **Counting mode and reading mode.** Users may complete suitable content through tap-counting or a reading flow that presents the text and allows confirmation after a reasonable reading interval. Both modes write the same canonical completion state. |
| BR-032 | **Estimated reading duration.** Each `dhikr_library` item includes `estimated_duration_seconds` for one repetition. The system derives expected session duration from this value and `count_target`. Unrealistically fast completion may be excluded from public continuity scoring but must never erase personal progress or accuse the user. |
| BR-033 | **Travel and location-change confirmation.** When a meaningful location or timezone change is detected, the app asks the user to confirm updating city, coordinates, prayer times, Qibla, reminders, and future section windows. Previously completed sections and historical days are never recalculated. The transition day preserves completed sections and applies the new location only to remaining sections. |
| BR-034 | **Technical continuity protection.** Progress completed locally within the valid window remains eligible after delayed sync when failure was caused by connectivity, server outage, or device transfer. Technical faults must not unfairly break a continuity day. |
| BR-035 | **Weekly personal report.** The app summarizes completed days, section timing, committed optional wards, continuity, and the user’s own patterns without comparing private detail against other users. |
| BR-036 | **Personal weekly intention.** A user may choose a simple weekly intention such as improving evening adherence, maintaining the three core sections, or committing to one optional ward. It is personal, non-competitive, and editable for the next cycle. |
| BR-037 | **Gentle return after interruption.** After missed days, the app welcomes the user back without loss-framed or shaming language, preserves historical records, and helps restart from the current day. |
| BR-038 | **Enhanced dhikr library.** The library supports search within text, time/category filters, favorites, committed wards, recently opened content, and opening content outside its window. Out-of-window completion is stored personally but does not count as timely completion. |
| BR-039 | **Large-text accessibility mode.** A dedicated mode provides very large Arabic text, larger controls, stronger contrast, simplified session layout, and reduced non-essential motion for older users and distance viewing. |
| BR-040 | **Optional reviewed audio.** Approved audio may be attached to selected content for learning and listening, with playback controls and locally controlled hosting. Audio is optional and never sourced from an unreviewed runtime content API. |
| BR-041 | **Google authentication.** Users can register/sign in with Google OAuth in addition to email/password. Google-only accounts may exist without a password and may add one later. Matching email alone must not silently merge accounts; account linking requires a verified, controlled flow. |
| BR-042 | **Core-section completion model.** Morning, evening, and sleep adhkar are equal core sections. Each contributes one third of daily core completion; a full continuity day requires all three. Partial completion remains visible without shame language. |
| BR-043 | **Late completion.** Core or optional sections may be opened and completed after their window from the library. The completion is stored in personal history as out-of-window and does not count as timely completion or restore a missed full-continuity day. |

### 5.2 SHOULD HAVE

| ID | Requirement |
|---|---|
| BR-044 | **Offline pending-sync for dhikr progress.** If a dhikr-count update cannot reach PocketBase, it should queue locally and flush automatically once connectivity returns (existing pattern in `session.html`), applied consistently to any similar write path (e.g. Muhasaba once BR-011 is implemented). |
| BR-045 | **Weekly/12-week Muhasaba summary views.** Beyond the single weekly entry, a rollup view (e.g. the existing 12-week summary modal) should help a user reflect on longer-term patterns. |
| BR-046 | **CSV export of the audit log** for the super admin, as already implemented, should remain available and reflect only server-persisted entries once BR-019 is resolved. |
| BR-047 | **Automated tests** (unit and/or e2e) for the core session-counting, daily-reset, and next-wird-selection logic, given these are the app's highest-risk correctness paths and no tests currently exist. |

### 5.3 COULD HAVE

- Personal 30-day programs may be considered later only if they preserve Waqfa’s calm, non-competitive character.
- Shareable progress cards may be considered later, limited to high-level continuity and never detailed dhikr counts.
- Broader offline-first synchronization beyond the defined pending-sync and active-session transfer model may be considered later.

### 5.4 WON'T HAVE (this phase)

- `studio.html` / "Yaqeen Studio" page-builder — removed, not carried forward in any form.
- Bilingual (English) UI — Waqfa is Arabic-only by design.
- Live/runtime third-party religious-content APIs — permanently excluded on religious-integrity grounds, not a phased deferral.
- Native iOS/Android app-store builds.
- Open-source release of the repository.

## 6. Non-Functional Requirements

| ID | Category | Requirement |
|---|---|---|
| NFR-01 | Sovereignty | The app and its data run entirely on owned infrastructure (Proxmox/LXC + Docker + self-hosted PocketBase); no core function depends on an external cloud service. |
| NFR-02 | Security | Admin/super-admin authorization is enforced at the PocketBase API-rule layer, independent of client-side UI state (traces to BR-018). |
| NFR-03 | Security | No raw superuser or admin tokens are stored in `localStorage` by any part of the app (this pattern, currently present only in the removed `studio.html`, must not reappear elsewhere). |
| NFR-04 | Reliability | Privileged-action audit entries are never lost to a local-only fallback; if a server write fails, the action must be retried or surfaced as a visible error, not silently recorded only in-memory. |
| NFR-05 | i18n/RTL | Full right-to-left layout throughout, consistent with Arabic-only scope; no leftover LTR assumptions in layout or number formatting outside intentionally LTR data (e.g. embedded Latin text). |
| NFR-06 | Consistency | A single, unambiguous app version identifier is used everywhere version is displayed or referenced (traces to BR-024). |
| NFR-07 | Maintainability | Dhikr and religious content is never hardcoded in frontend files as a fallback; any missing content is an explicit empty/error state (traces to BR-025). |
| NFR-08 | Performance | Session-counting interactions (tap → visual/audio feedback) must feel instantaneous; PocketBase writes are batched/periodic (as currently implemented — every 5 taps + per-completion) rather than blocking the UI on every tap. |
| NFR-09 | Portability | The React 19 + TanStack Start migration must preserve the hosting model. Schema changes explicitly approved by product requirements, such as `estimated_duration_seconds` and session-transfer metadata, are allowed and must be versioned. |
| NFR-10 | Accessibility | Core user, admin, and landing-page flows target WCAG 2.2 AA: keyboard operation, sufficient contrast, visible focus, screen-reader semantics, large touch targets, text scaling, and reduced-motion support. |
| NFR-11 | Privacy | Muhasaba text is owner-only. Public continuity participation is opt-in and exposes only approved high-level anonymized indicators. |
| NFR-12 | Multi-device consistency | Cross-device session transfer is revision-safe and idempotent; stale devices cannot overwrite a newer confirmed session state. |
| NFR-13 | Location privacy | Location is checked only with user permission and is not continuously tracked. A detected change does not update the stored location without user confirmation. |
| NFR-14 | Respectful UX | The product avoids shame, accusation, loss-framing, excessive gamification, and interruptive reminders. Missed or suspiciously fast activity is handled neutrally and privately. |

## 7. Constraints

- Frontend target stack: React 19 + TanStack Start (migrating from Vanilla JS + Tailwind CSS).
- Backend: self-hosted PocketBase, unaffected by the frontend migration.
- Deployment: Docker on owned Proxmox/LXC infrastructure.
- Domain split: `waqfa.app` (public landing page, "Waqfa 04") vs. `my.waqfa.app` (the authenticated app).
- Git: `alamoudimoh/Waqfa-App` (private), scoped commits (no `git add -A`), `main` kept empty per current branch policy, active development on `Devp-v0.1`.
- All religious content changes must pass the content review committee before entering `dhikr_library`.
- Brand Identity v3 (Arabic-only) is the authoritative visual reference for all UI decisions.
- Arabic numerals applied comprehensively across the UI via `toArabicNumerals`.

## 8. Success Criteria

1. All BR-001–043 (Must) demonstrably work end-to-end against the live PocketBase instance, with no requirement satisfied only by a client-side/local fallback where server persistence was intended.
2. Admin and super-admin access is verified against actual PocketBase collection API rules, not assumed from client-side checks (BR-018 confirmed, not just implemented).
3. Muhasaba entries created in the UI are retrievable from the `muhasaba` PocketBase collection (BR-011 confirmed with a real read-back test).
4. A delegated user's granted permissions are observably usable at runtime for the duration of the delegation window, and revoked/expired outside it (BR-017 confirmed).
5. `studio.html` and its unique auth path are absent from the deployed app (BR-020 confirmed).
6. A single version string appears consistently across the app's config, UI footer, and asset cache-busting parameters (BR-024 confirmed).
7. The React 19 + TanStack Start frontend serves all Must-have functionality with controlled, versioned schema changes only where approved by this BRD.
8. A user can start a session on one device, transfer it to another, and continue without losing or duplicating progress.
9. Public continuity ranking excludes raw repetition counts and requires explicit opt-in.
10. Muhasaba text is verified inaccessible to admin and super-admin accounts.
11. Confirmed travel/location changes update future prayer and reminder behavior without rewriting historical completion.
12. Focus mode, reading mode, weekly report, gentle return, enhanced library, and large-text mode pass end-to-end acceptance tests.

## 9. Risks, Assumptions & Dependencies

| Type | Item | Note/Mitigation |
|---|---|---|
| Risk | Live PocketBase schema was not directly inspectable during inventory (no `pb_data/` or reachable admin API) — the schema in this BRD is inferred from client-side field references only | Verify field types, constraints, and existing API rules directly against the running PocketBase instance before or during HLD/LLD work; do not assume inferred types are exact |
| Risk | Admin/super-admin authorization may currently rely only on client-side checks in production, matching what the inventory found in the code | Treat BR-018/NFR-02 as unverified until the actual PocketBase collection rules are read and confirmed |
| Risk | Removing `studio.html` may affect any external workflow that currently depends on it (e.g. if it's used for building marketing pages) | Confirm nothing else consumes the `templates` collection or depends on `studio.html` being reachable before deletion |
| Assumption | The React 19 + TanStack Start migration will preserve the PocketBase hosting model and existing data domains, allowing only product-approved, versioned schema additions | To be confirmed in the HLD; flag immediately if migration work reveals a schema change is actually required |
| Dependency | Content review committee availability/cadence | Publication of new `dhikr_library` content is gated on committee throughput, not a technical dependency the app can resolve on its own |
| Risk | Cross-device writes may overwrite each other if the current JSON session record remains last-write-wins | Introduce active-session ownership, revision checks, and idempotent transfer semantics before enabling continuation across devices |
| Risk | `estimated_duration_seconds` may unfairly classify naturally fast readers | Use wide tolerance, apply it only to public scoring eligibility, and never erase personal completion |
| Risk | Location detection may surprise users or create privacy concerns | Require permission and explicit confirmation before updating stored location; do not continuously track |

## 10. Open Questions (to resolve in HLD)

1. Exact React 19 + TanStack Start architecture: routing approach, state management, and how the existing `API`/`pb` data-access layer (`config.js`) is restructured or preserved during migration.
2. Precise mechanism for enforcing delegation permissions at runtime (BR-017) — client-side capability check, server-side API-rule composition referencing `delegation`, or both.
3. Exact PocketBase API rules currently in force for `admins`-gated pages, to be confirmed rather than inferred (BR-018).
4. Field-level schema confirmation for every collection listed in this BRD (types, required/unique constraints, relation cardinality) once the live PocketBase instance/admin API is reachable.
5. Whether `templates` (used only by the now-removed `studio.html`) should be dropped from the schema entirely or retained for a possible future, properly-integrated page-builder.
6. Concrete plan and cutover strategy for fixing the app-version inconsistency (BR-024) — single source of truth location (e.g. one constant imported everywhere vs. build-time injection).
7. Exact active-session ownership, revision, transfer, and stale-device rejection model for BR-029.
8. Exact scoring formula and tolerance bands for continuity eligibility using `estimated_duration_seconds`, without exposing raw counts.
9. Location-change detection thresholds and transition-day semantics for BR-033.
10. Audio asset governance, storage, and download/offline policy for BR-040.

---

*End of BRD v1.0. Next artifact: HLD.*


---

# Appendix B — Full HLD-Waqfa v1.1

# High-Level Design — Waqfa (وقفة)

> **Document type:** HLD (architecture-level) · **Companion to:** BRD-Waqfa v1.0
> **Owner:** Mohammed Alamoudi · **Status:** Draft v1.1
> **Depth:** High-level architecture. Low-level module design deferred to separate LLDs.

## 0. Document Control

| Field | Value |
|---|---|
| Traces to | BRD-Waqfa v1.1 |
| Stack (ratified) | React 19 + TanStack Start (frontend), self-hosted PocketBase (backend retained; versioned product-approved schema additions allowed), Docker on owned Proxmox/LXC |
| Auth | PocketBase email/password plus Google OAuth; controlled account linking |
| Core subsystem | Dhikr Session & Time-Window Engine (§4) |
| Data-flow decision | TanStack Start **server functions** for one-shot reads/writes; PocketBase **realtime (SSE)** held directly by the client for live UI (leaderboard, activity grid) — verified this is the only viable realtime path (§4.4) |
| BRD synchronization | BRD-Waqfa v1.1 corrects the delegation trace to BR-017 and expands the product baseline with approved cross-device, continuity, travel, accessibility, and authentication requirements. |

## 1. Architecture Overview

Waqfa is a single-page, installable PWA (React 19 + TanStack Start) backed by a self-hosted PocketBase instance. TanStack Start's server functions act as the sole place that performs privileged, one-shot reads/writes against PocketBase; the browser client separately and directly holds PocketBase's realtime (SSE) connection for the small set of UI surfaces that need live updates, since PocketBase realtime is a browser-only capability and cannot be proxied through a server-side hook or SSR context (verified, §4.4). No component other than the TanStack Start server and the authenticated browser client ever talks to PocketBase.

```
┌───────────────────────────────────────────────┐
│  Browser (PWA, Arabic-only, RTL)               │
│  React 19 components                           │
│   ├─ PocketBase JS SDK (auth token + realtime  │
│   │   SSE subscriptions — leaderboard,         │
│   │   activity grid)                           │
│   └─ TanStack Router (client-side navigation)  │
└───────────────┬─────────────────┬───────────────┘
                │ HTTPS (loaders/  │ HTTPS + SSE
                │ server fns)      │ (direct PB realtime)
┌───────────────▼─────────────────▼───────────────┐
│  TanStack Start server                          │
│  - SSR + routing                                │
│  - Server functions (one-shot reads/writes:     │
│    dhikr counts, settings, tickets, admin ops)  │
│  - Single PocketBase client instance per request│
└───────────────┬───────────────────────────────────┘
                │ HTTPS (server-initiated)
┌───────────────▼───────────────────────────────────┐
│  PocketBase (self-hosted)                         │
│  - Collections (schema unchanged by migration)    │
│  - API Rules (RBAC enforcement — admin/super_admin│
│    /delegation)                                   │
│  - Realtime broker (SSE, record-level events)     │
│  - Content-approval gate (`dhikr_library.approved`)│
└─────────────────────────────────────────────────┘
```

Traces: BR-001, BR-002, BR-026, NFR-01, NFR-09.

## 2. Technology Stack (ratified)

| Concern | Choice | Rationale |
|---|---|---|
| Frontend framework | React 19 + TanStack Start | Confirmed target stack (BRD §2.3, BR-026) |
| Routing | TanStack Router (bundled with TanStack Start) | Ratified alongside TanStack Start; type-safe routing, SSR-integrated |
| Data access (one-shot) | TanStack Start **server functions** | Server-only logic callable from loaders/components; keeps PocketBase credentials and privileged writes off the client where they don't need to be there (BR-018, NFR-02) |
| Data access (live) | PocketBase JS SDK, client-held realtime subscription (SSE) | Verified: PocketBase realtime is implemented via Server-Sent Events and is explicitly a client-side-only capability — the JSVM/server-side environment cannot subscribe. A server function cannot proxy this for the client. |
| Backend | PocketBase (self-hosted), retained | Sovereignty (NFR-01), no redesign required for the frontend swap; approved additive changes are versioned (NFR-09) |
| Deployment | Docker, owned Proxmox/LXC | Existing infra convention, BRD §7 |
| Styling | Tailwind CSS | Carried over from the current app; Brand Identity v3 is the token source |
| PWA | Manifest + service worker | BR-022, carried over from current implementation |

**Verified, not assumed:** PocketBase's realtime subscriptions are implemented via Server-Sent Events, and the PocketBase documentation explicitly states that server-side/JSVM contexts cannot open WebSocket/SSE connections to receive them — only client-side SDK usage supports subscribe/unsubscribe. Separately, PocketBase's own docs warn that combining PocketBase with SSR needs careful client-instance handling to avoid security issues from an incorrectly shared server-side client and potential performance bottlenecks from heavy client↔server↔PocketBase round-trips — this is why the design below gives server functions a fresh, request-scoped PocketBase client rather than a shared global instance (§4.4, §6).

## 3. Component Architecture

### 3.1 Frontend components (high-level)
- **App Shell** — top navigation, search (Ctrl+K), avatar menu (sole entry point into Settings per BR-007), fullscreen toggle. RTL-only layout (BR-027, NFR-05).
- **Home Dashboard / Daily Spiritual Plan** — greeting, three equal core sections, committed optional wards, completed/current/upcoming/late states, next pause, continuity stats, and 12-week activity. Public continuity data is opt-in, anonymized, and excludes raw counts.
- **Dhikr Session** — counter and reading modes, focus mode, progress, reviewed optional audio, estimated-duration eligibility checks, session transfer, and next-wird resolution.
- **Settings** — profile, ward commitments, prayer/location, confirmed travel updates, theme/font/accent, large-text mode, reminders + DND, social opt-in, Google account linking, data export/delete.
- **Prayer & Qibla** — prayer-times computation and compass, sourced from an external prayer-times provider + geolocation (BR-008); this is the one legitimate external-API dependency, distinct from and never used for religious *text* content (BR-013 boundary).
- **Muhasaba** — owner-only weekly reflection, weekly report, and personal intention. Admin and super-admin paths have no read access to the text.
- **Tickets / Public Board** — public Kanban, per-ticket comment thread, "My tickets" filter (BR-014).
- **Admin Dashboard** — content-approval queue, ticket triage, user management (BR-015), gated by a role check that is UX-only on the client and re-verified server-side on every server function call (BR-018).
- **Super-Admin Dashboard** — admin-account CRUD, delegation grant/revoke UI (BR-016), consuming the corrected delegation-enforcement path (BR-017, §6).
- **Landing Page (waqfa.app / "Waqfa 04")** — a separate route tree/deployment target from the authenticated app, day-cycle marketing concept (BR-021); shares the design-token source but not the authenticated component tree.

### 3.2 Backend components (high-level)
- **PocketBase Collections** — schema carried over unchanged from the current app (§5); no migration required by BR-026/NFR-09.
- **Auth** — PocketBase `users` auth collection with email/password and Google OAuth. Google-only accounts are allowed; account linking requires a verified controlled flow and never merges solely by matching email.
- **API Rules (RBAC)** — the actual enforcement boundary for admin/super_admin/delegation access (BR-018); this HLD requires these rules be read and confirmed against the live instance rather than assumed (BRD open question #3).
- **Content-Approval Gate** — the `dhikr_library.approved` flag and its associated admin queue are the only path by which committee-reviewed content becomes visible to end users (BR-012, BR-013).
- **Realtime Broker** — PocketBase's built-in SSE broker, emitting record create/update/delete events; consumed directly by authenticated browser clients for `user_activity` (own + leaderboard-scoped reads) and any other live surface.
- **Audit Log** — server-side-only writes triggered by every privileged server function, no client-side or local-only fallback (BR-019).

All server-side privileged operations flow through TanStack Start server functions, never directly from a React component to PocketBase, so BR-018/NFR-02's server-side authorization boundary has one single place to enforce and audit.

## 4. Dhikr Session, Time-Window & Cross-Device Engine (core subsystem)

This is the highest-complexity, highest-risk subsystem: it owns per-item counting, time-window-based section resolution, the 02:00 daily reset boundary, and offline-tolerant writes — the one area where a subtle bug directly produces an incorrect religious-practice experience (e.g. routing a user into the wrong wird, or silently losing progress).

### 4.1 Responsibilities
1. Render the active dhikr session (counts, targets, progress) for a given section.
2. On each count/completion, persist progress to PocketBase without blocking the UI.
3. On session completion, resolve the correct "next wird" using time-window logic (BR-003, BR-004).
4. Enforce the 02:00 local-time daily reset boundary (BR-005).
5. Tolerate offline writes via local queuing + flush-on-reconnect (BR-028).
6. Never silently substitute unrelated hardcoded content when a section has no approved rows.
7. Enforce one active session owner per account and transfer ownership safely between devices.
8. Support counting and reading modes using canonical progress state.
9. Evaluate `estimated_duration_seconds` only for continuity-board eligibility, never to erase private progress.
10. Preserve transition-day completion after confirmed travel/location changes.

### 4.2 Time-window resolution model
Each `dhikr_library` section carries `time_start`/`time_end` (and, per current inventory, a `time` label). The engine's section-resolution function must treat `time_start`/`time_end` as the **sole source of truth** for whether a section is currently valid — this closes the previously known gap where the "next wird" button could open a section (e.g. أذكار النوم) regardless of whether the current device time actually fell inside that section's window.

Resolution algorithm (high-level, not code-level):
1. Read current device-local time.
2. Query all sections; filter to those whose `[time_start, time_end)` window contains the current time.
3. If the just-completed section's mandatory/ward peers include a still-incomplete section in that filtered set, offer it as "next wird."
4. If no section's window contains the current time (e.g. a gap between windows), the engine must show an explicit "no active wird right now" state — it must not fall back to selecting the nearest section by proximity, and it must not silently reuse the previous section.
5. This same time-window filter is reused by "resume" logic (a user re-opening the app mid-session) — resume must not restore progress into a section whose window has since closed.

### 4.3 Daily reset (02:00 boundary)
Reset is a **read-time computation**, not a server-side scheduled job: "today" is defined as the interval since the most recent 02:00 local boundary. On load, the engine compares each stored progress timestamp (server `user_activity` row, or a queued local write) against that boundary; anything older is treated as belonging to a prior day and is not restored into the current session (BR-005). This preserves the current app's behavior and requires no PocketBase cron/hook.

### 4.4 Data flow & realtime boundary (verified)
- **One-shot writes** (per-tap or per-completion progress updates) go through a TanStack Start server function, which holds a fresh, request-scoped PocketBase client — never a shared global instance across requests, per PocketBase's own SSR guidance about avoiding security issues from incorrectly shared server-side clients.
- **Live reads** the session UI needs from other surfaces (e.g. today's own `user_activity` row reflecting a write just made) are handled by the browser holding its own PocketBase realtime subscription directly — confirmed this is the only viable path, since PocketBase's realtime layer is SSE-based and explicitly cannot be subscribed to from a server-side/JSVM context. The server function layer is therefore write/one-shot-read only; it is not in the realtime path at all.
- **Offline tolerance:** writes that fail to reach the server function (network down) are queued in local state and flushed on the browser's `online` event, matching the currently implemented pattern (BR-028) — this queuing lives entirely client-side and is orthogonal to the server-function/realtime split above.
- **No hardcoded fallback content:** if a section's `dhikr_library` query returns zero approved rows, the engine renders an explicit empty/error state rather than substituting any bundled placeholder list (BR-025, NFR-07).

### 4.5 Failure semantics
| Condition | Required behavior |
|---|---|
| Section query returns 0 rows | Explicit "content not available" state (BR-025) — never a hardcoded substitute |
| Current time falls outside every section's window | Explicit "no active wird" state — never nearest-match fallback |
| Server function write fails (offline) | Queue locally, flush on reconnect (BR-028); UI shows a pending/sync indicator, not a silent failure |
| Server function write fails (online, server error) | Surface a visible error; do not mark local progress as synced |
| Realtime subscription drops | Rely on the PocketBase SDK's built-in automatic reconnect/resubscribe (confirmed SDK behavior) rather than hand-rolled reconnect logic |

→ **Deferred to LLD:** exact server-function signatures, the precise time-window comparison implementation (timezone/DST edge handling), the local-queue data structure and flush algorithm, retry/backoff policy, and the exact PocketBase query filters used for section resolution.


### 4.6 Active-session transfer model
- The server stores active device/session ownership, a monotonically increasing revision, and last-confirmed progress.
- A second device must explicitly choose “continue here”; this increments the revision and invalidates writes from the previous owner.
- Writes include the expected revision and are idempotent. Stale writes are rejected and trigger a refresh rather than overwriting newer state.
- Offline progress may be reconciled only when it belongs to the current revision or through an explicit recovery flow.

### 4.7 Duration and continuity eligibility
- `dhikr_library.estimated_duration_seconds` represents an expected duration for one repetition.
- Derived expected time uses `estimated_duration_seconds × count_target`, with a generous tolerance band.
- Suspiciously fast completion is stored privately but excluded from public continuity scoring. The UI uses neutral, non-accusatory language.

### 4.8 Travel and location transition
- Location/timezone changes are detected only with permission and confirmed by the user before updating the account.
- Confirmed changes update future prayer times, Qibla, reminders, and remaining section windows.
- Historical days and already completed sections are immutable. The transition day retains completed sections and evaluates only remaining sections under the new location.

## 5. Data Model (high-level)

**Decision (per BRD §2.3/§7, NFR-09): the PocketBase schema is inherited, not redesigned.** The frontend migration does not justify unrelated schema changes, but approved additive requirements such as duration metadata and active-session transfer are versioned migrations. The domains below are carried over from the codebase inventory; per BRD open question #4, exact field types/constraints/API rules must still be confirmed against the live instance (not re-litigated here).

| Domain | Collection(s) | Notes |
|---|---|---|
| Identity | `users` (PB auth) | Profile + all personalization fields live directly on the user record (no separate preferences collection) |
| Authorization | `admins` | Role (`admin`/`super_admin`), scoped `permissions`, `is_active` — the actual enforcement boundary is PB API rules referencing this collection, not client code (BR-018) |
| Delegation | `delegation` | Time-boxed permission grants; must be *consumed* by API rules, not just stored |
| Active session | `active_sessions` or equivalent versioned fields | One active owner per user, device transfer, revision, last-confirmed progress, stale-write rejection |
| Weekly intention/report | derived and/or dedicated records | Personal intention and weekly summaries; no public detailed comparison |
| Dhikr content | `dhikr_library` | Content catalog gated by `approved`; adds `estimated_duration_seconds` and optional reviewed audio metadata |
| Activity | `user_activity` | One row per user per day; source of continuity, grid, weekly report, and opt-in public board. Raw counts are not a ranking input. |
| Self-reflection | `muhasaba` | Owner-only text, server persisted, unavailable to admins/super-admins |
| Community board | `tickets`, `ticket_comments` | Public visibility with anonymized submitter identity (BR-014) |
| Audit | `audit_log` | Server-only writes, append-only, no local-only fallback (BR-019) |
| Removed | `templates` (was `studio.html`-only) | To be dropped or explicitly retained per BRD open question #5 — not part of this HLD's carried-over model |

→ **Deferred to LLD:** every field name/type/constraint, relation cardinality, index, and the exact PocketBase API rule expression per collection (this is the direct successor to BRD open questions #3 and #4).

## 6. Authentication & Authorization

**Locked decisions:**
- Auth: PocketBase email/password plus Google OAuth. Google-only accounts are valid; users may add a password later.
- Authz enforcement point: **must be PocketBase API rules**, not the client-side role check currently used as a UX gate in `admin.html`/`super-admin.html` (BR-018, NFR-02). The client-side check remains as a UX convenience (avoid flashing admin UI to non-admins) but is never the security boundary.
- **Delegation must be enforced, not just stored (BR-017).** The corrected design: PocketBase API rules for admin-gated collections/actions must be composed to check *either* an active `admins` record *or* an active, non-expired `delegation` record scoped to the relevant permission (`tickets`/`content`/`users`) — e.g. a rule resolving "does this caller currently have `content` capability" by checking both sources, rather than only the `admins` table. This closes the gap where delegation records exist but grant nothing.
- Session handling: PocketBase SDK's own `authStore`, carried through TanStack Start's server functions via a request-scoped client (not a shared global instance, per §4.4's SSR-safety note).
- Silent refresh: preserved from the current app's pattern (401 → refresh → retry once → force logout on second failure).

**Admin/Super-admin/Delegation resolution (conceptual, not rule-level):**
```
On any privileged server function call:
  1. Resolve caller's identity from the PocketBase auth token (server-side).
  2. Check: does an active `admins` record grant this permission? → allow.
  3. Else, check: does an active, non-expired `delegation` record grant this permission
     to this user right now? → allow.
  4. Else → deny, regardless of what the client believed its own role to be.
```
This is the same shape whether expressed as a PocketBase collection API rule or a server-function-side check backed by both collections — the exact expression is LLD scope.

→ **Deferred to LLD:** exact PocketBase API rule syntax per collection/action, the delegation-lookup query shape, session-token refresh implementation detail, and how the client-side UX gate is kept in sync with (but never substituted for) the server-side rule.

## 7. Theming, RTL & Accessibility

- Theming: Brand Identity v3 (single-theme, Arabic-only) is the token source; no multi-theme switcher is required (per prior decision — Waqfa's palette is not changing as part of this migration).
- i18n/RTL: Arabic-only, full RTL via logical properties, Arabic numerals, and approved typography.
- Accessibility: target WCAG 2.2 AA for core routes, including keyboard operation, focus visibility, text scaling, large targets, screen-reader semantics, reduced motion, and a dedicated large-text mode.
- Focus mode: session routes suppress non-essential navigation and interruptions, with optional wake lock where supported.

→ **Deferred to LLD:** component-level RTL/logical-property conventions, exact token consumption pattern in React (CSS variables vs. a token module), Arabic-numeral formatting utility placement.

## 8. Audit & Content Governance

- **Audit logging (BR-019):** every privileged server function call (admin/super-admin actions) writes to `audit_log` server-side, with no client-side or local-memory-only fallback — this closes the current gap where a failed server write could leave an audit event existing only in one browser tab.
- **Content governance (BR-012, BR-013):** the `dhikr_library.approved` gate remains the sole publication mechanism; this HLD does not introduce any new ingestion path, and explicitly forbids any live third-party religious-content API call at runtime, preserving the existing offline batch-review workflow.

→ **Deferred to LLD:** exact audit-log write points (which server functions log what), retry semantics for a failed audit write, and the CSV export query.

## 9. Deployment Architecture

- Containerization and infrastructure conventions are unchanged from the current app: Docker on owned Proxmox/LXC, PocketBase self-hosted, no new external dependency introduced by the frontend migration (NFR-01, NFR-09).
- Domain split preserved: `my.waqfa.app` (authenticated app) and `waqfa.app` (public landing page, "Waqfa 04") remain two distinct route trees/deployment targets, as already decided.
- The TanStack Start server process replaces the current static-file-serving model for the authenticated app; the landing page may remain a simpler static/SSR target depending on its own complexity (LLD-level decision).

→ **Deferred to LLD/runbook:** exact compose/service layout, environment variables, build/deploy steps for the TanStack Start server, and whether the landing page shares the same deployable or is fully separate.

## 10. Cross-Cutting Concerns

| Concern | Approach | Traces |
|---|---|---|
| Security | Server-side-verified authz for every privileged action; no client-trusted role; no raw tokens in `localStorage` anywhere (the removed `studio.html` was the only offender) | BR-018, BR-020, NFR-02, NFR-03 |
| Reliability | No silent local-only fallbacks for audit or Muhasaba; explicit error/empty states over hardcoded substitutes | BR-011, BR-019, BR-025, NFR-04, NFR-07 |
| Performance | Session-tap feedback stays instant (client-side); PocketBase writes remain batched/periodic, not per-tap | NFR-08 |
| Portability | Frontend migration introduces zero PocketBase schema change | BR-026, NFR-09 |
| Consistency | Single canonical app-version source, referenced everywhere version is shown | BR-024, NFR-06 |
| Religious integrity | No runtime third-party content API; committee-approval gate is the only publication path | BR-012, BR-013 |
| i18n/RTL | Arabic-only, RTL throughout, Arabic numerals preserved | BR-027, NFR-05 |
| Accessibility | WCAG 2.2 AA target, large-text mode, reduced motion, keyboard and assistive-technology support | BR-030, BR-039, NFR-10 |
| Multi-device | One active session owner, revision-safe transfer, stale-write rejection | BR-029, NFR-12 |
| Privacy | Owner-only Muhasaba; opt-in anonymized continuity board; confirmed location changes only | BR-010, BR-011, BR-033, NFR-11, NFR-13 |
| Respectful UX | No shame, accusation, raw-count competition, or excessive interruption | BR-023, BR-032, BR-037, NFR-14 |

## 11. LLD Backlog (next documents)

Ordered by complexity/risk:

1. **LLD-01 — Dhikr Session, Time-Window & Cross-Device Engine** (core/deep LLD, priority #1): section-resolution algorithm detail, timezone/DST edge cases for the 02:00 boundary, local-queue/flush data structures, server-function signatures, failure-state enum.
2. **LLD-02 — PocketBase Schema Confirmation & Migration Notes**: field-by-field confirmation against the live instance (types, constraints, indexes, relations), resolution of the `templates`/`studio.html` removal, and any TanStack-Start-side data-client typing.
3. **LLD-03 — Auth, RBAC & Delegation Enforcement**: exact PocketBase API rule expressions for admin/super_admin/delegation-aware access, session/token handling inside TanStack Start server functions.
4. **LLD-04 — Theming, RTL & Accessibility for React**: tokens, focus mode, large-text mode, keyboard/screen-reader behavior, reduced motion, Arabic numerals.
5. **LLD-05 — Audit Logging & Content-Approval Workflow**: exact write points, retry semantics, CSV export query, `dhikr_library.approved` admin-queue flow.
6. **LLD-06 — Authentication & Account Linking**: email/password, Google OAuth, identity linking, duplicate-account prevention, recovery.
7. **LLD-07 — Notifications, Travel & Location**: adaptive reminders, DND, confirmed travel changes, transition-day handling.
8. **LLD-08 — Weekly Insights, Intentions & Continuity Board**: scoring, opt-in privacy, weekly report, gentle return.
9. **LLD-09 — Deployment Runbook**: TanStack Start server + PocketBase compose layout, landing-page deployment shape, environment/secrets handling.

## 12. Open Questions (resolve during LLD)

1. Exact PocketBase API rule syntax for composing "admin OR active delegation" authorization checks (§6) — needs to be written and tested against the real instance, not just designed conceptually here.
2. Whether the landing page (`waqfa.app`) shares the TanStack Start deployable with the authenticated app or is deployed as a fully separate, simpler target (§9).
3. Field-level schema confirmation for every collection (carried over from BRD open question #4) — blocks precise LLD-01/02 work until the live instance is reachable.
4. Disposition of the `templates` collection once `studio.html` is removed (carried over from BRD open question #5).
5. Concrete single-source-of-truth mechanism for the app version string (carried over from BRD open question #6) — e.g. a build-time constant vs. a shared config module imported everywhere version is rendered.
6. Whether the content review committee's batch-review workflow needs any tooling change as part of this migration, or remains entirely outside the app (current assumption: entirely outside, manual import only).
7. Exact active-session schema and revision protocol.
8. Exact continuity scoring formula and duration tolerance bands.
9. Location-change threshold and device/browser support strategy.
10. Audio asset format, storage, caching, and offline policy.

---

*End of HLD v1.0. Next: LLD documents per §11, starting with LLD-01 (Dhikr Session & Time-Window Engine).*


---

# Appendix C — Full Existing Codebase Inventory

# Waqfa (وقفة) — Codebase Inventory

**Source:** `alamoudimoh/Waqfa-App` @ branch `Devp-v0.1`, path `PocketBase/Public` (+ `PocketBase/scripts`)
**Method:** Read-only static analysis of the client code. No live PocketBase instance was reachable from this environment (`https://dev.waqfa.app` timed out, and no `pb_data/` directory exists in the repo), so **the collection schema below is reverse-engineered entirely from `pb.collection(...)` calls and field references in the client JS** — it is not a dump of the actual PocketBase schema. Treat field *types* as inferred/likely, not authoritative.

---

## 1. Pages (`PocketBase/Public/*.html`)

| File | Purpose |
|---|---|
| `index.html` | Main authenticated home screen — hero greeting/streak stats, 28-day contribution grid, prayer-times + Qibla compass cards, featured/favorite dhikr category cards, global leaderboard, weekly "Muhasaba" (self-review) modal, and a hidden developer "future ideas" panel. |
| `auth.html` | Login / signup screen (email+password against PB `users`), gender picker, forgot-password flow, auto-redirects to `index.html` if already authenticated. |
| `session.html` | The actual dhikr-counting UI — tap-to-count button with ripple/haptic/sound feedback, progress arc, per-dhikr detail panel, session-complete overlay that computes and links to the "next wird" section. |
| `settings.html` | Full settings hub: profile/avatar, mandatory + optional ("ward") sections with 7-day commitment lock, prayer method/location, theme/font/accent color, reminders + DND hours, data export / clear-activity / delete-account. |
| `tickets.html` | Public "البلاغات والمقترحات" (bug reports & suggestions) Kanban board (جديدة / قيد الدراسة / قيد التنفيذ / تم الحل) with a "My tickets" tab, ticket creation modal (with image uploads), and per-ticket comment thread. |
| `updates.html` | Timeline/changelog page ("آخر التحديثات") — vertical timeline UI for release notes. |
| `privacy.html` | Static privacy-policy page. |
| `admin.html` | Admin dashboard (role `admin`): tickets Kanban + status/notes, content-approval queue for `dhikr_library`, user list with suspend/activate, read-only audit log with CSV export. Gated by a client-side check against the `admins` collection. |
| `super-admin.html` | Super-admin dashboard (role `super_admin`): everything in `admin.html` **plus** admin-account management (create/toggle/permission-chips) and a time-boxed delegation system for granting temporary admin permissions to regular users. |
| `studio.html` | "Yaqeen Studio Hub" — a standalone GrapesJS-based visual page-builder that authenticates directly against PocketBase's superuser endpoint and reads/writes a `templates` collection. Unrelated in branding/naming to the rest of the app (see Known Gaps). |

Non-HTML app assets in `Public/`: `manifest.json` (PWA manifest), `sw.js` (service worker — cache-first for static assets, network-first bypass for `/api/*`), icons, `js/config.js`.

---

## 2. JS Modules (`js/home/*.js`)

Loaded in this order by `index.html`; together they build the home page (`js/config.js` is loaded separately and shared by every page).

| File | What it does |
|---|---|
| `01-auth-mock.js` | Auth guard for the home page (redirects to `auth.html` if not logged in), user-menu dropdown wiring, and `getSectionButtonState()` (decides "start / resume / done" label per section). |
| `02-categories.js` | Builds the dhikr category cards — color/icon-by-time-of-day helpers, the large "featured" (current/next) card, small favorite cards, the full "all sections" library modal with search. |
| `03-grid-data.js` | Tiny helper: converts a grid-cell index into a human-readable Arabic date (`getDayDate`). |
| `04-quotes-greeting.js` | Time-of-day greeting text, a 30-quote daily bank + 5-quote Friday bank, Hijri-date computation via `Intl`, and PB-backed daily quote fetch with local fallback. |
| `05-grid-leaderboard.js` | Renders the 84-day contribution grid + day-detail modal, and the weekly leaderboard rows + per-player detail modal (bar chart of dhikr distribution, 14-day mini grid, badges placeholder). |
| `06-search-fullscreen.js` | Ctrl+K / mobile search modal querying `dhikr_library`, plus fullscreen toggle. |
| `07-prayer-qibla.js` | Full prayer-times engine (Aladhan API + geolocation/manual city via Nominatim, countdown timer, calc-method select) and Qibla compass (bearing calc, DeviceOrientation compass needle, distance-to-Mecca). |
| `08-muhasaba-init.js` | 12-week summary modal, weekly Muhasaba (self-reflection) modal — **saves only to `localStorage`, not PocketBase** (see Known Gaps) — Friday-after-Maghrib auto-open logic, dev-ideas panel toggle, and the page's main `IIFE` init (loads streak/activity, builds grid/categories/leaderboard, wires visibility/bfcache refresh, 60s polling refresh).

`js/config.js` (shared, not in `js/home/`) defines `WAQFA_CONFIG`/`pb` client, online/offline tracking, a silent-401-refresh wrapper, Arabic-numeral/time formatters, and the `API` object — the single data-access layer used by every page (`getSections`, `saveActivity`, `getTodayActivity`, `upsertTodayActivity`, `getCurrentStreak`, ticket/comment CRUD, `getUserSettings`/`saveUserSetting`, `saveMuhasaba`).

---

## 3. PocketBase Collections (inferred from client code — not a live schema dump)

| Collection | Fields referenced in code | Notes |
|---|---|---|
| **`users`** (PB auth collection) | `email`, `password`, `name`, `alias`, `gender` (`male`/`female`), `avatar` (file), `avatar_emoji`, `theme` (`auto`/`light`/`dark`), `font_size` (1–4), `accent_color`, `city`, `lat`, `lng`, `prayer_method` (int), `sound_enabled`, `haptic_enabled`, `dnd_enabled`, `dnd_from`, `dnd_to`, `reminders` (JSON array), `ward_commitments` (JSON object, keyed by section name), `suspended` (bool, admin-set) | Core identity + all personalization/settings live on the user record. |
| **`dhikr_library`** | `cat01`, `section`, `subsection`, `time`, `time_start`, `time_end`, `text`, `count_target`, `source`, `fadl` / `reason`, `title`, `order`, `approved` (bool) | The dhikr content catalog; `approved=false` rows feed the admin "content review" queue. |
| **`user_activity`** | `user` (relation), `date` (YYYY-MM-DD), `total_count`, `level` (0–3), `sessions` (JSON, keyed by section/time-of-day, each `{complete, count, lastIndex, dhikrProgress}`), `progress` (0–100), `mandatory_complete` (bool) | One row per user per day; the entire streak/leaderboard/grid system is derived from this. |
| **`tickets`** | `user` (relation), `type` (`typo`/`tech`/`feature`/`religious`/`other`), `description`, `related_section`, `title`, `status` (`جديدة`/`قيد الدراسة`/`قيد التنفيذ`/`تم الحل`), `admin_note`, `images` (file[], up to 3) | Public bug/feature-report board. |
| **`ticket_comments`** | `ticket` (relation), `user` (relation), `message`, `image` (file), `is_admin_reply` (bool), `created` | Per-ticket conversation thread. |
| **`muhasaba`** | `user`, `week_start`, `note`, `week_stats` | Weekly self-reflection entries — **write path exists in `API.saveMuhasaba()` but the actual UI (`08-muhasaba-init.js`) never calls it**, saving to `localStorage` instead (see Known Gaps). |
| **`admins`** | `user` (relation), `role` (`admin`/`moderator`/`reviewer`/`super_admin`), `permissions` (JSON: `{tickets, content, users}` booleans), `is_active` (bool), `expires_at` | Drives both the `admin.html` and `super-admin.html` auth gates and per-section permission hiding. |
| **`delegation`** | `from_user` (relation), `to_user` (relation), `permissions` (JSON), `valid_from`, `valid_to`, `is_active` (bool) | Super-admin-only: time-boxed grant of admin-style permissions to a regular user. Listed in the nav but its permissions don't appear to be *consumed* anywhere (no code reads `delegation` to actually elevate a user's access at runtime — see Known Gaps). |
| **`audit_log`** | `executor` (relation), `action`, `target_collection`, `old_value`, `new_value`, `created` | Append-only; both admin panels write to it (`logAudit()`), and it also has a purely-local in-memory fallback if the PB write fails, meaning some audit entries can exist only in a browser tab and never reach the server. |
| **`templates`** (used by `studio.html` only) | `name`, `html`, `css` | Belongs to the separate "Yaqeen Studio" page builder, not part of the Waqfa data model above. |

---

## 4. Auth

- **Collection used:** PocketBase's built-in `users` auth collection (`pb.collection('users').authWithPassword/create/authRefresh/requestPasswordReset`), via the `pocketbase.umd.js` JS SDK (v0.21.x).
- **Session persistence:** handled entirely by the PB SDK's own `authStore` (browser storage), checked on every protected page via `if (!pb.authStore.isValid) location.href = 'auth.html'`.
- **Silent refresh:** `withTokenRefresh()` in `config.js` catches 401s, calls `authRefresh()` once, retries the original call, and force-logs-out (clears authStore, redirects to `auth.html`) if the retry also fails.
- **Signup guardrails (client-side only):** alias ≥5 chars, no spaces, password ≥8 chars + confirmation match, gender toggle. Server-side enforcement depends on PocketBase collection rules, which could not be inspected here.
- **Admin/Super-admin auth:** *not* a separate PB auth collection — it's a regular `users` login gated by an additional lookup into the `admins` collection (`role === 'admin' | 'super_admin'` and `is_active === true`), performed client-side in an IIFE at the top of `admin.html` / `super-admin.html` before removing a full-screen "checking permissions" overlay. **This means the actual access control boundary is PocketBase collection API rules, not the JS — the JS check is UX only** (flagged in Known Gaps).
- **Studio auth:** `studio.html` bypasses all of the above and authenticates directly against PocketBase's superuser endpoints (`/api/collections/_superusers/auth-with-password`, falling back to the legacy `/api/admins/auth-with-password`), storing a raw PB superuser token in `localStorage`.

---

## 5. Key Features Actually Implemented

- **Dhikr counters (`session.html`):** tap-to-increment counter per dhikr item with target counts, SVG progress arc, Web Audio-generated tap/complete/session-complete tones, `navigator.vibrate` haptics, adjustable font size, auto-advance, keyboard support (Space/Enter/arrows). Progress is periodically (every 5 taps + on each dhikr completion) pushed to `user_activity.sessions` via `API.upsertTodayActivity`, with an offline `localStorage` pending-sync fallback that flushes on the `online` event.
- **`ward_commitments` (optional sections):** stored as a JSON map on the `users` record in `settings.html`; adding one locks it for exactly 7 days (`locked_until` timestamp) before it can be removed, with a live countdown/progress bar in the UI. Reminders for these are dynamically merged into the notification list.
- **Daily reset logic:** `API.getResetTime()` computes "today" as starting at 02:00 local time; `session.html`'s `restoreProgress()` explicitly discards any saved progress (local pending-sync or the day's PB record) whose timestamp is older than that reset boundary, so progress doesn't leak across the 02:00 cutoff.
- **`session.html` "next wird" logic:** on session completion, `showSessionComplete()` calls `API.getSections()` + `API.getCurrentSection()` to find the next scheduled section by time-of-day and dynamically rewrites the "next wird" button's label/link (`session.html?section=...&time=...`) — it is *not* hardcoded per section.
- **`settings.html` sections:** Profile (avatar upload/emoji, name, alias, gender) · Wird/sections (mandatory locked list + optional 7-day-locked list + add-optional modal with time window + reminder interval + DND-conflict warning) · Prayer times (GPS/manual city via Nominatim, calc-method) · Theme/display (auto/light/dark with sunset/sunrise auto-switch, font size, 5 accent colors) · Notifications (4 base reminders + dynamic per-ward reminders + sound/haptic toggles + DND hours) · Data (export-to-JSON, clear activity, delete account).
- **Admin functionality:** ticket triage (status changes, admin notes, threaded replies with optional image), `dhikr_library` content-approval queue, user list with suspend/activate, read-only audit log with CSV export, permission-based nav hiding (`admins.permissions`).
- **Super-admin functionality:** everything above, plus admin-account CRUD (role, per-section permission chips, expiry date, activate/deactivate) and a delegation system (grant time-boxed permissions to a non-admin user) — though see Known Gaps re: delegation enforcement.
- **Public transparency board (`tickets.html`):** every user-submitted bug/feature ticket and its status/admin-note is visible to *all* users by design ("لا يُعرض اسمك" — your name isn't shown, but the ticket content is public), plus a personal "My tickets" filtered view.
- **PWA basics:** manifest + service worker with cache-first for static assets and pass-through for `/api/*` and cross-origin requests.

---

## 6. Known Gaps

- **Muhasaba never reaches PocketBase from the UI.** `API.saveMuhasaba()` exists and writes to the `muhasaba` collection, but the actual "حفظ وقفتي الأسبوعية" button in `08-muhasaba-init.js` only writes to `localStorage` with the comment *"حفظ محلي (PocketBase لاحقاً)"* — "saved locally, PocketBase later." This is a literal in-code TODO.
- **Explicit unbuilt-feature backlog is shipped in `index.html`** inside a hidden `#devIdeasSection` (toggled by a "···" footer button, meant for the developer only): a v3.1 "30-day challenges" feature referencing a `challenges` collection that doesn't exist yet; sharing achievements via Web Share API/Canvas (v3.2); full offline PWA sync (v3.2). Note the "full settings page" item listed there as unbuilt is actually now built in `settings.html` — the dev-notes panel is stale relative to the code.
- **Delegation permissions aren't consumed anywhere.** `super-admin.html` lets a super-admin create `delegation` records granting a regular user time-boxed `tickets`/`content`/`users` permissions, but no code (in `admin.html`, `super-admin.html`, or elsewhere) reads the `delegation` collection to actually elevate a delegated user's runtime access — the feature only manages records, it doesn't yet grant capability.
- **Admin/super-admin access control is UX-only in the code shown.** The `role`/`is_active` check happens client-side before hiding a loading overlay; real enforcement must live in PocketBase's collection API rules, which weren't inspectable (no reachable PB instance/`pb_data` in this environment). Worth explicitly verifying server-side rules match the client's assumptions.
- **`studio.html` ("Yaqeen Studio") looks orphaned/out of place.** Different branding, a different auth model (raw PB superuser token in `localStorage` instead of the app's `users`+`admins` pattern), and a `templates` collection not referenced anywhere else in the app. It also grabs `index.html` in a hidden iframe and scrapes `.app-wrapper` HTML/styles as a "start from current page" seed for the page builder — fragile and undocumented.
- **Version numbers are inconsistent across the codebase:** `config.js` declares `VERSION: '3.0.0'`; script cache-busters vary per page (`?v=3.1.5`, `?v=3.5.4`, `?v=3.6.8`); footer text says "v3.0.0" on `index.html`/`auth.html` but "v3.6.0" on `settings.html`. No single source of truth for the app version.
- **`session.html` ships a hardcoded 8-item mock `DHIKR_LIST`** as a fallback used whenever the `dhikr_library` PB query returns nothing — meaning any section not fully populated in the DB silently falls back to unrelated generic morning-adhkar content rather than an explicit error state.
- **No automated tests** (unit/e2e) exist anywhere in `PocketBase/Public` or `PocketBase/scripts`.
- **`PocketBase/scripts/make_snippet_screenshot.py`** exists but wasn't reviewed in depth for this inventory — flagged as present but unexamined.
- **Schema in this report is inferred, not verified.** No `pb_data/` directory and no reachable PocketBase admin API were available in this environment, so field *types* (string vs. number vs. relation cardinality, required/unique constraints, PB access rules) could not be confirmed — only field *names actually used* by the client could be extracted.


---

# Appendix D — Artifact register

Files known from this project conversation:

- `BRD-Waqfa.md` — original BRD v1.0.
- `BRD-Waqfa-v1.1.md` — expanded BRD after product discussion.
- `HLD-Waqfa.md` — original HLD v1.0.
- `HLD-Waqfa-v1.1.md` — synchronized HLD after decisions.
- `waqfainventory.md` — static codebase inventory.
- `waqfa_landing.html` — attached copy of current landing page.
- `Brand_Identity-Waqfa.html` — original identity guide.
- `Brand_Identity-Waqfa-Refined-v3.1.html` — refined identity guide.
- `Brand_Identity-Marsid.html` — comparison baseline only, not a Waqfa authority.
- Marsid BRD/HLD/LLDs — reference quality baseline only, not Waqfa requirements.

---

*End of complete Waqfa project handoff.*
