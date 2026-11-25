# Core docs map and missing teaching links

## Scope and authority

Inspected local clone `/Users/sobingt/projects/core-docs`, HEAD `678902df0accca44133c4b5a3a855839fbe50d67`, on 25 November 2026. Read AGENTS.md. This task makes no edits to that repository. Documentation is an explanation to compare with code, not the source of current behavior. Core/packs researchers independently own the full code audit. Labels below are tentative crosswalk judgments, with unknowns explicitly retained; documentation stating an operational condition does not prove that condition in production.

The root README describes developer and PM tracks; setup pages and the Ask AI snapshot are generated from source (README lines 14–34). Inventory below is all MDX pages discovered, with principal review concentrated on fundamentals, all five build-a-pack pages, manifest, getting-started, first-feature, publishing, security, evals and PM not-ready page. Ancillary management/PM duplication is inventoried for routing, not treated as independent implementation evidence.

## Inventory

- `agent-resources/set-up-your-agent.mdx` — 209 lines
- `agent-resources/skills.mdx` — 44 lines
- `build-a-pack/agents.mdx` — 97 lines
- `build-a-pack/capabilities.mdx` — 128 lines
- `build-a-pack/events-and-handlers.mdx` — 120 lines
- `build-a-pack/screens.mdx` — 100 lines
- `build-a-pack/tables.mdx` — 114 lines
- `core-platform/brain-and-knowledge.mdx` — 76 lines
- `core-platform/channels.mdx` — 78 lines
- `core-platform/connections.mdx` — 66 lines
- `core-platform/connectors.mdx` — 91 lines
- `core-platform/kee.mdx` — 63 lines
- `core-platform/onboarding.mdx` — 57 lines
- `fundamentals/a-booking-step-by-step.mdx` — 28 lines
- `fundamentals/core-and-packs.mdx` — 44 lines
- `fundamentals/index.mdx` — 27 lines
- `fundamentals/one-kee.mdx` — 41 lines
- `fundamentals/rbac.mdx` — 71 lines
- `fundamentals/think-in-capabilities.mdx` — 57 lines
- `fundamentals/where-facts-live.mdx` — 38 lines
- `fundamentals/work-that-starts-itself.mdx` — 40 lines
- `getting-started.mdx` — 32 lines
- `guides/your-first-feature.mdx` — 61 lines
- `index.mdx` — 30 lines
- `launch-checklist.mdx` — 28 lines
- `manage/linear-workflow.mdx` — 65 lines
- `manage/who-owns-what.mdx` — 34 lines
- `migrating-from-v1.mdx` — 33 lines
- `observe/debugging.mdx` — 100 lines
- `observe/evals.mdx` — 24 lines
- `observe/review-agent-runs.mdx` — 59 lines
- `pm/design/from-ask-to-capabilities.mdx` — 85 lines
- `pm/design/screens-or-kee.mdx` — 63 lines
- `pm/design/who-approves.mdx` — 88 lines
- `pm/design/writing-a-prd.mdx` — 92 lines
- `pm/fundamentals/a-booking-step-by-step.mdx` — 48 lines
- `pm/fundamentals/core-and-packs.mdx` — 56 lines
- `pm/fundamentals/not-ready-yet.mdx` — 35 lines
- `pm/fundamentals/one-kee.mdx` — 52 lines
- `pm/fundamentals/rbac.mdx` — 54 lines
- `pm/fundamentals/work-that-starts-itself.mdx` — 57 lines
- `pm/index.mdx` — 46 lines
- `pm/migrating-from-v1.mdx` — 36 lines
- `pm/platform/brain-and-knowledge.mdx` — 61 lines
- `pm/platform/channels-and-connections.mdx` — 69 lines
- `pm/platform/kee.mdx` — 54 lines
- `pm/platform/onboarding.mdx` — 76 lines
- `pm/pm-os.mdx` — 53 lines
- `pm/set-up-your-agent.mdx` — 188 lines
- `pm/work/agent-runs-and-evals.mdx` — 66 lines
- `pm/work/linear-and-em.mdx` — 79 lines
- `reference/glossary.mdx` — 120 lines
- `reference/kee-cli-and-mcp.mdx` — 130 lines
- `reference/pack-manifest.mdx` — 402 lines
- `secure/security-and-compliance.mdx` — 69 lines
- `ship/publish-and-install.mdx` — 76 lines

## Claim crosswalk

All documentation paths in this section are under `/Users/sobingt/projects/core-docs/content/docs/`. Exact line ranges refer to the pinned clone above. Code paths are owning sources to inspect/verify, rather than claims that every line was rerun or behavior tested here.

1. **A Pack contains capabilities alongside agents/data/events/jobs/screens.** Docs: `fundamentals/core-and-packs.mdx:12–24`. Implied connection: ClinicOS is the parent bundle; `clinic.book` and `clinic.find_times` are siblings inside it, not separate agents or separately installed products. Code owner: ClinicOS `kee.project.ts:11,76`, `capabilities/implementations.ts:1–40`. **Tentatively aligned, teaching omission in current visual guide.** Visual fix: persistent outer ClinicOS frame containing two named action tiles, then zoom one tile while retaining the frame.
2. **kee.project.ts is the single authored source and entry.json generated.** Docs: `fundamentals/core-and-packs.mdx:26–28`, `getting-started.mdx:18–24`, `reference/pack-manifest.mdx:8–10`. Implied connection: “single source” means authored manifest/root of declaration imports, not the only file containing behavior. Code owner: ClinicOS kee.project imports; package.json sync:entry script; generator implementation. **Tentatively aligned but wording can hide import graph.** Visual fix: folder map → project imports → generator → uploaded entry, with implementations remaining in deployed code.
3. **Adding a binding activates the capability.** Docs: `guides/your-first-feature.mdx:29–36`, especially 31: without binding capability does not exist. Implied connection: contract file alone is inert; binding list has TWO consumers, manifest generation and runtime dispatch. Code owner: ClinicOS `capabilities/implementations.ts:1,40`, `app/capabilities/[key]/invoke/route.ts:4,41`, kee.project.ts:11,76, actual sync script. **Aligned in inspected local imports, deployment unverified.** Visual fix: fork one registry into top catalogue branch and bottom invoke branch; show a disconnected file fails both branches.
4. **Capability is contract; implementation can vary.** Docs: `fundamentals/think-in-capabilities.mdx:8–35`, `build-a-pack/capabilities.mdx:68–98`. Implied connection: input/output/approval/requirements describe boundary; target binds executable code/agent/team/work behind it. Code owner: `tooling/contract.ts`, actual contract and `implementation.ts`, Core registry/invoke schema. **Tentatively aligned.** Visual fix: action tile splits into public contract face and hidden engine; changing engine preserves same call key if contract unchanged. Avoid asserting all target kinds equally implemented without source verification.
5. **Kee finds descriptions by meaning and calls exact ID.** Docs: `fundamentals/think-in-capabilities.mdx:19–21`, `core-platform/kee.mdx:14–18`. Implied connection: manifest actions become installed catalogue entries; search returns candidates; exact key+parent pack identify call. Code owner: Core `agent/tools/capability-search.ts`, `src/lib/marketplace/capability-search.ts`, `capability-invoke.ts`. **Tentatively aligned; exact persisted/search hydration chain owned by Core researcher.** Visual fix: two pack-shaped groups feed installed catalogue; match result retains `clinicos` parent ribbon throughout invoke.
6. **Core prefixes pack slug to capability key.** Docs: `build-a-pack/capabilities.mdx:46`, `reference/pack-manifest.mdx:46,311`. Implied connection: local `clinic.book` is not globally self-identifying; display parent slug + local action key as two fields unless exact serial syntax verified. Code owner: Core exact capability ID resolver and registry builder. **Unverified serialization detail.** Visual fix: separate labels “Business setup [slug: clinicos]” + “Action [key: clinic.book]”; do not invent colon/slash/dot composite syntax.
7. **One capability gets only its requirements.** Docs: `build-a-pack/capabilities.mdx:46,102`, `secure/security-and-compliance.mdx:18–28`. Implied connection: pack install permission ceiling and per-call reduced grant are distinct, plus live membership/access checks. Code owner: Core `capability-invoke.ts`, `capability/server.ts`, SDK invoke guard. **Tentatively aligned.** Visual fix: large approved-access envelope in Pack shrinks to small ticket attached to selected action. Missing requirement is closed gate, not model judgment.
8. **Default approval allow; admin can change, restricted approvers remain held.** Docs: `build-a-pack/capabilities.mdx:46,56–62`, `core-platform/kee.mdx:24–47`. Implied connection: contract starting policy differs from effective per-company policy; selected actor/approver separate. Code owner: capability policy resolution/approval route. **Unverified all precedence details pending Core audit.** Visual fix: declared rule + company setting merge at gate, with click to view precedence. Do not paint every read/write universally approved.
9. **Concrete booking contract.** Docs: `reference/pack-manifest.mdx:29–41`, `build-a-pack/capabilities.mdx:110`. Implied connection: same parent Pack offers find-times then booking, and output of former constrains exact inputs to latter. Code owner: ClinicOS find-times contract/implementation and book contract:30–44, book implementation. **Tentatively aligned; sample trimmed.** Visual fix: slot token with exact timestamp/practitioner fields travels from find-times output to book input; person identity added separately. Read stage vs effect stage visually different.
10. **Patient and staff share booking code but not entry/authority lane.** Docs: `fundamentals/a-booking-step-by-step.mdx:10–20`, `core-platform/kee.mdx:43`. Implied connection: patient tool can call shared helper without invoking staff capability or card; shared business function is not itself the installed contract. Code owner: Concierge book tool, `packages/booking/book-offered.ts`, `packages/booking/book.ts`, `capabilities/book/implementation.ts`. **Tentatively aligned with prior pack research.** Visual fix: three top entrances converge on shared helper; label staff capability branch separately from patient/page branches.
11. **Booking duplicate sends no second confirmation.** Docs: `fundamentals/a-booking-step-by-step.mdx:13–14`. Implied connection: booking effect and each follow-up delivery have their own dedup/retry boundaries. Code owner: booking event idempotency, handler confirmation send. **Unverified breadth; do not promote to universal exactly-once guarantee.** Visual fix: two ledgers “visit exists” and “notice delivered,” with response-loss replay exercise.
12. **Brief and confirmation handling order.** Docs: `fundamentals/a-booking-step-by-step.mdx:14`, `build-a-pack/events-and-handlers.mdx:49–55`. Implied connection: handlers may run concurrently; a combined handler can enforce specific order. Code owner: current `handlers/events/index.ts`, confirmation/brief handlers. **Potential chronology/drift to check against current file graph.** Prior notes listed confirmation, draft intake and brief separately; docs describe combined confirmation/brief. Do not choose prose over source. Visual fix: current registered handler lanes, labeled order only where code awaits it.
13. **Event declaration vs handler vs delivery are distinct.** Docs: `reference/pack-manifest.mdx:206–241`, `build-a-pack/events-and-handlers.mdx:23–55`. Implied connection: payload schema announces a possible fact, binding and reachable event URL make reactions executable. Code owner: Sales manifest missing eventHandlers; checkout-paid stub; Core event worker. **Omission in docs examples about partially wired Sales setup, not necessarily contradiction.** Visual fix: event contract tile → subscription binding → event URL → handler → persisted effect; break actual absent edge.
14. **Scheduled jobs start off, company budget/consent/readiness matters.** Docs: `reference/pack-manifest.mdx:239`, `build-a-pack/events-and-handlers.mdx:74–112`, `ship/publish-and-install.mdx:39–54`. Implied connection: declared cadence is not proof jobs run; installed permission and enabled schedule and consent/budget form gates. Code owner: Core scheduler/run-start consent and budget, ClinicOS jobs. **Unverified deployment; tentatively aligned design.** Visual fix: stopped clock gains only after three gates, cadence shown as trigger not completion SLO.
15. **Pack deployment and entry upload are separate.** Docs: `ship/publish-and-install.mdx:6–20,24–37`. Implied connection: deployed handler and Core catalogue can momentarily disagree; additive compatibility across window required. Code owner: upload/publish path, version update install fanout, runtime route. **Unverified operational universal wording.** Visual fix: two rails `runtime code` and `Core entry`, version markers with short mismatched window. Include rename failure example.
16. **Every install latest, no pin/rollback, single production environment.** Docs: `ship/publish-and-install.mdx:60–74`. Implied connection: documentation describes release policy/deployment reality, which source types alone cannot prove. Code owner: upload handler install version reconciliation and deployment configuration/live checks. **Unverified live claims, not source-certified.** Visual fix: badge “Docs state; current deployment not checked,” with evidence drawer; don’t use as universal architecture premise without audit.
17. **Screen button may direct act, open chat or invoke capability.** Docs: `build-a-pack/screens.mdx:60–90`. Implied connection: being inside same Pack does not route every screen action through capability approval. Code owner: screen dispatch and handlers; actual UI helper `askKee`. **Tentatively aligned.** Visual fix: three visibly different edges out of same screen; open-chat edge stops at unsent draft; direct action edge retains handler-level authorization.
18. **Tool/skill/action is translated as Capability.** Docs: `reference/glossary.mdx:50–64`, especially 61. Implied connection: convenient business vocabulary is context-limited; an Eve `defineTool` is NOT identical to an installed capability binding, and channel.tools are scopes. Code owner: Eve agent tools versus capability registry versus manifest channel scope fields. **Pedagogical ambiguity/omission, not automatically code drift.** Visual fix: parent Pack → business action tile first; only then show Eve search/invoke tools as bridge. Show three exact labels rather than one synonym table.
19. **Everything not clinical is ids/codes elsewhere; Medplum only clinical records.** Docs: `secure/security-and-compliance.mdx:30–48`, `build-a-pack/tables.mdx` ownership guidance. Implied connection: sensitive derived free text and traced content require inspection beyond intended system-of-record. Code owner: ClinicOS schemas enquiry reason/work detail/copilot quote/detail, transcript/trace config and retention. **Potential policy-vs-actual storage drift, prior code notes identify sensitive text columns; source researcher to verify.** Visual fix: intended home map plus actual extra copies as highlighted hotspots; never label compliant.
20. **Pack agents default tools and discoverability.** Docs: `build-a-pack/agents.mdx:22–43,65–73`, `reference/pack-manifest.mdx:346–354`. Implied connection: `channel.tools` scopes are neither Eve tool loader nor guarantee unavailable model defaults; inbound declarations/instructions differ from technical menu. Code owner: actual agent.ts config + built Eve output/version. **Omission/unverified compiled behavior.** Visual fix: separate “channel permission list [channel.tools]” from “model tool menu [defineTool/defaultTools]”.
21. **One Kee, no router, nothing between Kee and capability.** Docs: `core-platform/kee.mdx:8`, `fundamentals/one-kee.mdx`. Implied connection: no second conversational agent handoff in primary path does not mean no Core search, policy, validation, workflow or RPC layers. Code owner: actual operator tool → capability invoke pipeline. **Pedagogical overcompression.** Visual fix: retain shared Core gate between assistant and pack action; label “no agent handoff” rather than physically erase all middleware.
22. **No end-to-end evals, ordinary tests no models.** Docs: `observe/evals.mdx:6–18`, `ship/publish-and-install.mdx:74`, `pm/fundamentals/not-ready-yet.mdx:8–16`. Implied connection: keep dated state separate from current test corpus, distinguish pack eval cases vs automated full Core+pack evaluation. Code owner: current eval directories/CI scripts and actual end-to-end harness. **Potential drift/overbroad ordinary-test claim; unverified current full-stack harness.** Visual fix: map tested boundary with dashed untested edges, not red all-system failure.
23. **Failed inbound message tells nobody; WhatsApp unproven.** Docs: `pm/fundamentals/not-ready-yet.mdx:3,8–16`, dated 16 Nov. Implied connection: dated readiness and failure escalation require current code/live verification. Code owner: inbound final failure path, notifications, channel provider setup. **Unverified current state, date prominently.** Visual fix: show unresolved delivery exception path with badge “docs snapshot; verify current”, not a current reproduced incident.

## Why the existing animated guide still leaves the relationship unclear

`reports/build_visual_guide.py` has meaningful diagrams but teaches two adjacent abstractions before establishing containment. Scene anatomy shows “capabilities/ contracts+implementations” as one sibling box around `kee.project.ts`; scene activation immediately turns it into an anonymous registry. Scene discovery then contrasts Eve tools vs business action rows without a persistent ClinicOS or Sales parent. The learner sees a folder, a registry and a tool menu, but never sees the SAME book action carried through all three.

Missing links: (1) one Pack contains many bounded capabilities; (2) one contract is paired with one binding and target implementation, not one extra agent; (3) the binding registry feeds both generated entry and runtime dispatcher; (4) upload/install makes a catalogue entry available for a particular company; (5) Core search returns that exact parent+action identity; (6) Core invocation grants only selected action requirements and targets runtime; (7) helpers may be shared with patient/page flows without those flows becoming that staff capability; (8) channel scope “tools” differ from Eve tools; (9) source presence, manifest registration, upload, install readiness and permission are successive conditions, not synonyms.

## Six EARLY animation scenes

Use everyday names followed by exact code names in brackets. Insert before the two-registry comparison. Keep ClinicOS outer frame and the same highlighted tile throughout. Main caption one sentence, no card lists; technical view remains optional.

### A — A business setup contains actions
Caption: “ClinicOS is the setup. Find open times and book a visit are two actions inside it.”
Stage: large ClinicOS container [Pack slug: clinicos]; inside, two tiles [clinic.find_times] and [clinic.book], alongside dim screen/table/agent icons. Click a tile: zoom while parent boundary stays visible. Sales toggle uses two actually verified Sales capability keys, not marketing examples or invented actions. Teach containment before activation.

### B — One action, two halves
Caption: “The promise says what goes in and out. The code does the work.”
Stage: chosen booking tile unfolds like a hinged document. Front contract [capability.ts] shows input, output, approval, requirements; back code [implementation.ts] shows bindCapability contract+target+run. Input packet passes schema outline, touches target, returns output. Changing plain code to agent is an OPTIONAL conceptual example, not evidence every kind currently deployed.

### C — One list connects two sides
Caption: “The same binding list builds Core’s catalogue and the runtime’s dispatch map.”
Stage: `book/implementation.ts` plugs into [capabilities/implementations.ts]. Registry forks UP through [kee.project.ts → sync:entry → entry.json] and DOWN to [invoke route → handlers map]. Add-file-only toggle leaves a socket disconnected on both branches. This is the missing bridge most likely to resolve the user’s confusion.

### D — Installed here, callable here
Caption: “Uploading describes it to Core. This company still needs an enabled, ready installation.”
Stage: generated book contract travels to Core catalogue; company-shaped installation encloses approved requirements. Disabled/missing Medplum gate stops packet; enabled+ready allows description into search result. Runtime code is visibly a separate deployed rail. Do not animate installation as copying all source into Eve.

### E — Find times, then book this time
Caption: “The first action returns a slot. The next action uses that exact slot.”
Stage: same Pack parent contains find-times read action and book write action. Slot ticket travels with exact timestamp/practitioner, person token added, approval gate closes until press, binding runs booking helper. Move packet to return carrying already_booked/confirmation as actual output fields. Show private patient/page route joining helper via separate entry on secondary toggle, not main first pass.

### F — The complete thread, from file to outcome
Caption: “Follow one action all the way: authored, registered, uploaded, found, permitted, executed.”
Stage: camera pan along ONE connected route, highlighting one step at a time. Persistent mini-map: Pack → contract+binding → registry → generated entry → upload/install → Core search → exact invoke → runtime dispatcher → shared business code → scoped Core service → provider result → output validation → user statement. At user click “Where does Eve fit?”, reveal Eve tool tray as caller bridge to search/invoke, not parent owner of the business action.

A secondary `Docs / Current source` toggle highlights mismatches/unknowns exactly at their node, not in a detached gap list. For example documentation's broad Tool=Capability vocabulary becomes separate labeled tool tray and Pack action. No source verified means node tagged unknown; proposed repair uses dashed line and cannot impersonate executed path.

## Delivery cautions

The new explanatory link is a graph of identities carried through files and registries, not simply more nouns. Keep one concrete action name and parent frame stable as camera/view changes. Minimize visible labels, but never hide the Pack parent during initial discovery explanation. Reliability/permission gates appear before latency optimization. Documents provide vocabulary and intended contracts; code path and current install evidence decide actual behavior. No runtime changes or docs publication authorized by this research.
