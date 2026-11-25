# Pack to capability worked examples

Code snapshots: ClinicOS `eb6043f2669d671ca701581478c2d6872ded4d0a` clean; Sales `147eff267d6fe236ad84879ffcd354a31afcb9a6`, untracked docs/.DS_Store; core-docs `678902df0accca44133c4b5a3a855839fbe50d67` clean. Read-only source inspection, no deploy or live tests. Prior packs.md and pack-agent-deep-dive.md provide additional source paths.

## 1 What does pack containing capabilities mean?

**A pack is a business application. A capability is one named operation that application agrees to perform for Core.** An agent is optional behind that operation. ClinicOS combines35 capability contracts,2 inbound Eve workers,14 Tables,30 screen IDs,14 registered event handlers,6 jobs, Medplum connection requirements and shared business implementation code. These are several separate registries, not an agent with35 automatically visible tools.

Concrete source chain:
1. `kee.project.ts:1–14` imports `implementations` from capabilities/implementations.ts and `project.capabilities` exposes it.
2. `capabilities/implementations.ts:3–40` imports each implementation binding. This is membership in the pack action catalog.
3. `capabilities/<operation>/capability.ts` defines identity, input/output JSON schemas, description, resource requirements, optional approval/presentation/timeout.
4. `implementation.ts` imports that contract and binds `target` metadata + actual `run(input,ctx)`.
5. `tooling/sync-entry.mjs:66–77` serializes contract + target as generated `entry.json manifest.capabilities[]`; it does not serialize run function. Root package script sync:entry invokes generator.
6. Core installs entry metadata. Separately, live deployed pack runtime must serve matching code. Catalog declaration alone cannot execute TypeScript.
7. `/app/capabilities/[key]/invoke/route.ts:40–55` imports same binding registry, makes handlers keyed by `binding.contract.key`, calls SDK handleCapabilityInvoke. SDK verifies Core grant and route key before binding.run; per-capability wrapper applies appropriate deadline.
8. `packages/runtime/kee.ts:44–55` reconstructs SDK context from verified grant; helpers call Core for tenant Tables/Brain/connections with that authority. Neither request body nor file location decides tenant scope.

Evidence [Project](/Users/sobingt/projects/covalify/clinicos/kee.project.ts:1), [Registry](/Users/sobingt/projects/covalify/clinicos/capabilities/implementations.ts:1), [Generation](/Users/sobingt/projects/covalify/clinicos/tooling/sync-entry.mjs:66), [Door](/Users/sobingt/projects/covalify/clinicos/app/capabilities/[key]/invoke/route.ts:40), [SDK wrapper](/Users/sobingt/projects/covalify/clinicos/packages/runtime/kee.ts:44).

**Helper functions are not capabilities merely because called by one.** `bookTime` is shared library code; `clinic.book` is registered contract; Concierge `book` is an Eve tool; all three names refer to different layers.

## 2 Capability one: find actual available appointment times

Exact key **`clinic.find_times`**; name **Find open times**; source `capabilities/find-times/capability.ts:11–26`. Target `{kind:'typescript',entry:'capabilities/find-times/implementation.ts'}` at implementation11–14; generated entry1862–1873 confirms it. This is no new agent and no autonomous prompt loop.

Contract:
- input: procedure required; optional clinic-local date range, practitioner, part_of_day. Extra fields refused by JSON schema.
- output: `times` required; optional open_ranges, service, mode, service choices, calendar_open_until, note. Each actual time includes starts_at/ends_at, practitioner_ref, when with timezone, minutes, with name/role.
- requirements exactly `app:medplum`, `brain`, `table:clinic_settings`, `table:work_items`.
- approval allow; timeout30s.

Actual steps: run→kee(ctx)→parallel clinicCalendar + Brain services→match service string against configured calendars/names/aliases→ambiguous service returns choices, no calendar search→serviceCalendar validates mapping/eligible consultants→searchDay/day-span max week→parallel searchTimes + practitioner names→part-of-day filter→format exact results and optional ranges/note.

Core callbacks/effects: Brain reference + clinic settings Table reads; Medplum proxy appointment.find and clash reads. `packages/booking/medplum.ts:46–58` calls `appointment.find` one Schedule at a time with20-slot page; clashingAppointments76–85 reads booked,pending,arrived and refuses incomplete clash evidence. This action does **not reserve or book** the returned slot. Search results are an observation at that moment, not guarantee until booking.

Important precision: call it **“find availability”**, not purely side-effect-free. Contract says it can raise a staff task when calendar/consultant setup is missing, hence table:work_items requirement. It does not change appointments but exceptional operational task writes may occur. It is not in hardcoded read-only deadline allowlist in packages/runtime/deadline.ts14.

Failure/clarification outcomes: unknown/ambiguous procedure→times[] plus service options; reversed date span→bad_span; missing schedule→not_scheduled; mismapped connected project→calendar_mapping_broken; consultant not allowed→not_eligible; incomplete clash check→throws, never treat unknown as free. Names read failure substitutes “the consultant”; role isn't fabricated.

Evidence [Contract](/Users/sobingt/projects/covalify/clinicos/capabilities/find-times/capability.ts:11), [Execution](/Users/sobingt/projects/covalify/clinicos/capabilities/find-times/implementation.ts:11), [Mapping checks](/Users/sobingt/projects/covalify/clinicos/capabilities/clinic-context.ts:30), [Actual Medplum read](/Users/sobingt/projects/covalify/clinicos/packages/booking/medplum.ts:46).

## 3 Capability two: book the selected appointment

Exact key **`clinic.book`**; name **Book an appointment**; contract book/capability.ts29–74; target TypeScript `capabilities/book/implementation.ts` at binding16–18; generated entry2415–2431 confirms.

Contract:
- required input first_name, procedure, service, starts_at, ends_at, practitioner_ref, with, when, minutes, mode. Existing contact_id optional; new person's email/phone optional fields; no_last_name exception, purpose/prep owner/staff told_them optional.
- output appointment_ref, starts_at, when, already_booked, look_alike, confirmation.
- requirements imported BOOKING_REQUIREMENTS = app:medplum,brain,table:people,enquiries,consultations,calendar_lock,clinic_settings,work_items, plus channels.
- approval_required starting policy, timeout60s, preview:true. Card: “book {first_name} for {service} on {when}”; detail “With {with}, {mode}, {minutes} minutes”; sends:false because action preview itself does not show a message to send.

Execution is **two visits to same implementation under different authority**:
1. Preview uses no-write grant: validate timezone display/time not passed/duration/service/practitioner; check slot still open; return card matching person/new person. No new contact before approval.
2. Approval execution rechecks business conditions. Create/resolve contact only after bookability; preserve name appropriately; build booking request. Shared bookTime checks safety/age/chart/person/hour constraints, holds under calendar lock, confirms Medplum, reads back outcome, writes consultation state, publishes booked event.
3. Staff booking has a named staff override for safety hold; visit can be booked but patient message held. The `confirmation` output tells staff only actual result, with lookalike warning. **Outcome proof is appointment_ref/readback, not a model sentence.**

Failure paths: card_mismatch for time/name/service/duration mismatch; needs_last_name for new person until staff ask or explicitly no_last_name; slot_taken/calendar_busy/safety_hold/unknown outcome handled by booking logic. Deterministic person+practitioner+time key supports checking a retry against first appointment. Never imply database transaction spans Core and Medplum.

Later event handlers are separate work: consultation.booked→registered confirmation/brief/intake preparation. Forms drafted on booking still require staff send. Confirmation failure does not erase appointment; safety held delivery must not be called sent.

Evidence [Contract](/Users/sobingt/projects/covalify/clinicos/capabilities/book/capability.ts:29), [Requirements](/Users/sobingt/projects/covalify/clinicos/packages/booking/requirements.ts:1), [Preview/execution](/Users/sobingt/projects/covalify/clinicos/capabilities/book/implementation.ts:19), [Shared engine](/Users/sobingt/projects/covalify/clinicos/packages/booking/book.ts:120), [Event follow-through](/Users/sobingt/projects/covalify/clinicos/handlers/events/send-confirmation.ts:20).

### How the two connect
Staff: “Find a consultation time Thursday afternoon”→clinic.find_times→structured exact times→staff chooses→clinic.book input carries exact starts_at/ends_at/practitioner_ref/when/minutes/service/with→preview→approval→real booking. This is application composition by Core/operator, not find_times secretly invoking book.

Patient: channel→Concierge Eve tools `find-times`,`read-back`,`book`→packages/booking/book-offered.ts108→same bookTime; **patient own yes replaces staff approval card on this lane**. Patient tool is not automatically invocation of named clinic.book capability. Third entry, booking page, also uses bookOffered at packages/booking/booking-page.ts307. Visual: three entry rails, one shared booking engine.

## 4 Compare Sales capabilities without confusing agent target with reasoning

Exact keys from current contracts:
- **`practices.source`**, Source practices for a brief: input state(required), volume/segment/offset; output practices,returned,asked,next_offset,shortfall_reason. Requirements table:companies + app:contacts. `implementation.ts12–15 target:{kind:'agent',agent:'sales'}`. Actual run normalizes input→sourceApolloPractices→Core Apollo companies.search→normalize/filter→companies upsert. Missing provider with zero output throws connection_unavailable/sourcing_degraded; partial output is honest shortfall. It writes operational rows though outside provider calls are reads. [Contract](/Users/sobingt/projects/sales/capabilities/practices-source/capability.ts:11), [Run](/Users/sobingt/projects/sales/capabilities/practices-source/implementation.ts:12).
- **`practice.enrich`**, Find a practice's people and evidence: input practice_ids; output results; requirements companies/evidence/people + contacts/finder/reader apps. Agent target sales; actual code loop performs Apollo/Hunter/optional Firecrawl waterfall, writes evidence/people/company honesty state, not an Eve model deciding each field. $25 budget, bounded contacts, missing scopes/crawl reason are actual control paths. [Contract](/Users/sobingt/projects/sales/capabilities/practice-enrich/capability.ts:8), [Run](/Users/sobingt/projects/sales/capabilities/practice-enrich/implementation.ts:31).
- **`campaign.place`**, Place approved leads in their segment's campaign: input person_ids + optional book/note, output placed/refused/summary, requirements companies/people/touches/brain/app:outreach. Agent target sales. Description expects Gate1 approval but **contract has NO approval field**; tenant binding must explicitly require approval. Actual run checks qualified company/segment, TierA/B, business email, suppression; deterministic touch avoids recorded duplicate; rereads suppression immediately before real Smartlead leads.add, then records touch/person status. Crash between provider success and record needs reconciliation before retry. [Contract](/Users/sobingt/projects/sales/capabilities/campaign-place/capability.ts:7), [Run](/Users/sobingt/projects/sales/capabilities/campaign-place/implementation.ts:12).

All Sales bindings are imported by capabilities/implementations.ts; Eve capabilities channel mounts handleCapabilityInvoke directly at /capabilities/:key/invoke. **Metadata target agent:sales means routed to that agent app; this particular handler dispatches ordinary implementation.run. It does not by itself prove an LLM turn.** Internal sales chat starts a Core task plan via start_brief; Core invokes capabilities through that direct-code door.

[Registry](/Users/sobingt/projects/sales/capabilities/implementations.ts:1), [Mounted direct-code handler](/Users/sobingt/projects/sales/agents/sales/agent/channels/capabilities.ts:1), [Task starter](/Users/sobingt/projects/sales/agents/sales/agent/tools/start_brief.ts:23).

## 5 Docs versus code crosswalk: classify discrepancies fairly

Docs are a teaching source, not current runtime evidence. Use code for observed pack behavior; use owning Core source for platform global guarantees. No docs changes requested here.

1. **Aligned concept:** core-and-packs.mdx16–24 lists agent/capability/Table/event/job/screen/requirements, matching current ClinicOS registries. Good foundation, but “one repository and deployment” (10) is simplified: ClinicOS includes separate Eve apps and Next runtime forwarding routes. Explain multiple deployable processes inside the pack application rather than parroting one process. [Docs](/Users/sobingt/projects/core-docs/content/docs/fundamentals/core-and-packs.mdx:8), [Forwarder](/Users/sobingt/projects/covalify/clinicos/app/channels/v1/deliver/route.ts:1).
2. **Aligned contract pattern:** build-a-pack/capabilities.mdx68–98 shows contract→binding and target kinds; current ClinicOS examples TypeScript and Sales agent targets demonstrate it. **Teaching omission:** docs shorthand agent target can suggest model reasoning; actual Sales capability channel directly dispatches run, so show dispatch code alongside metadata. [Docs](/Users/sobingt/projects/core-docs/content/docs/build-a-pack/capabilities.mdx:68).
3. **Aligned agent distinction:** agents.mdx8–18 says staff features often need capability, not new agent; page43 distinguishes patient's yes from staff approval. Matches current patient book tool vs staff action. **Missing detail:** manifest channel.tools are allowed Core scopes, not identical to Eve tool filenames. Separate scope badges from model tool buttons. [Docs](/Users/sobingt/projects/core-docs/content/docs/build-a-pack/agents.mdx:24), [Actual Concierge tools](/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/tools/book.ts:29).
4. **Potentially misleading literal wording:** reference/pack-manifest.mdx175 says “screens are not in the manifest”; source sync-entry89–138 invokes UI builder that adds generated surfaces/screenRegistry to manifest. Intended meaning seems screens are authored in files, not manually in kee.project. Treat as docs clarification: authored differently, generated manifest still carries them. [Docs](/Users/sobingt/projects/core-docs/content/docs/reference/pack-manifest.mdx:173), [Actual build](/Users/sobingt/projects/covalify/clinicos/tooling/sync-entry.mjs:89).
5. **Exact numeric disagreement:** manifest docs165 says32 Table columns; ClinicOS generator23–27 enforces max34. Owning Core validation must adjudicate current limit; don't assert source generator's34 proves platform allows it. Label docs/pack validator drift needing Core check. [Docs](/Users/sobingt/projects/core-docs/content/docs/reference/pack-manifest.mdx:161), [Generator](/Users/sobingt/projects/covalify/clinicos/tooling/sync-entry.mjs:23).
6. **Model guidance vs old pack:** agents docs77–93 says use Core label, model names refused; ClinicOS agent uses per-step label concierge (not listed in table), Intake conversation, but old Sales names Haiku and provider directly. This is current pack interoperability/authority difference, not sufficient proof it fails: inspect exact target channel and Core gateway enforcement. Do not pretend Sales already uses same resolver. [Docs](/Users/sobingt/projects/core-docs/content/docs/build-a-pack/agents.mdx:75), [Concierge resolver](/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/agent.ts:1), [Sales model](/Users/sobingt/projects/sales/agents/sales/agent/agent.ts:1).
7. **Docs explain omission accurately:** capabilities docs46 says omitted approval means allow (admin may override). Sales campaign.place description expecting approval is not equivalent to contract approval_required. This is runtime configuration proof gap/contract omission, not docs drift. Need inspect installed binding before judging actual send policy. [Docs](/Users/sobingt/projects/core-docs/content/docs/build-a-pack/capabilities.mdx:44), [Sales contract](/Users/sobingt/projects/sales/capabilities/campaign-place/capability.ts:7).
8. **Shipping model documented but unverified live:** publish-and-install.mdx6–16 distinguishes deployed code vs uploaded entry; 28–37 describes additive compatibility before removal. This is exactly the capability reachability gap: entry and handler must match. Current local entry matches2 ClinicOS target paths but deployed release/install not inspected. [Docs](/Users/sobingt/projects/core-docs/content/docs/ship/publish-and-install.mdx:6).
9. **Concrete true missing wiring:** Sales generator87 emits event identities only; checkout-paid recordConversion is stub unregistered; event contract is not routed implementation. Separately, a schema reference from engagement.record is not proof Smartlead event delivery is configured. Treat implementation gap / missing live wiring evidence separately from docs teaching omission. [Sales generator](/Users/sobingt/projects/sales/tooling/sync-entry.mjs:77), [Conversion stub](/Users/sobingt/projects/sales/handlers/events/checkout-paid.ts:36).

## 6 Visual artifact prescription

Opening scene: one pack container with **separate visible drawers** Agents / Named operations / Working registers / Screens / Reactions / Jobs / Connected apps. Click Named operations to reveal actual clinic.find_times + clinic.book cards, then choose one.

Each capability scene has four synchronized panels: **contract** (input→output, resources, approval); **registration** (implementation registry→generated entry); **execution** (route→run→shared helper→Core provider); **proof** (returned actual observation/effect, possible refusal). One highlighted code pointer per step. Avoid full code dump until user expands engineering detail.

Animation1 find availability: synthetic procedure+Thursday→ambiguous? branch→calendar search→actual time cards emerge; no appointment created icon. Click one card, same exact fields slide into booking input.
Animation2 book: card preview/no writes→Approve→recheck slot (inject taken slot option)→lock/confirm/readback→appointment proof→event splits into brief/intake/confirmation. Approval rejected stops before writes.
Animation3 toggle staff/patient/booking page: separate authority rails converge shared booking engine; labels explain why patient readback/yes is not staff approval.
Animation4 remove registry edge: file remains on disk but operation vanishes from generated catalog/route map. Restore entry but leave stale deployed handler: advertised operation→runtime no handler. Four states: source written, registered, deployed, installed; never label source alone live.
Animation5 Sales agent target: show request enters Eve APP then direct handler→run; conversational model asleep. A separate internal chat starter uses Eve model then starts background plan. Make difference unmistakable.

No live performance claims or real people; no publishing. Current source counts and trace examples need snapshot label and cite source path/SHA. Exact platform outer key prefix (`clinicos/clinic.book`, etc.) must be verified in Core; local contract key is exactly clinic.book, avoid guessing fully qualified ID.
