# Keemakr: follow the work

Visual-first edition. All diagrams and playback are in the standalone HTML. Source snapshot 25 November 2026; live state and latency remain unverified.

## 01. One setup contains many actions

ClinicOS [clinicos] is one business setup [pack] containing many named actions [capabilities].

Remember: An action is not an agent. A helper is not automatically an action.

1. This business setup [clinicos] is the parent bundle.
2. Named actions are children alongside workers, records, views, events, jobs and connections.
3. Select one child [clinic.find_times]; keep its parent identity.
4. A shared helper is code, not another public action or another agent.

### Mechanism and caveats

Pack containment is the missing connection: project.capabilities and project.agents are sibling declarations, not the same list. ClinicOS has 35 action bindings but only two declared inbound Eve workers. Exact global identity is <pack slug>/<contract key>, verified in Core: clinicos/clinic.find_times and clinicos/clinic.book. Sales slug is sales; verified children include practices.source, practice.enrich and campaign.place. Neither a helper export nor an agent tool becomes a capability without a declared/bound contract.

Sources: PK01, PK05, PK06, PK07, PK11, PK41, FINDC, BOOKC, SALESSLUG.

## 02. One action has a promise and an engine

The contract [capability.ts] says what the action accepts and returns. The binding [implementation.ts] supplies target metadata and executable code.

Remember: TypeScript target describes dispatch. Its handler can still call a model.

1. The named action [clinic.find_times] has one stable contract identity.
2. The promise declares input, output, requirements and starting approval policy.
3. The binding [implementation.ts] pairs that contract with target metadata and executable [run].
4. Target kind chooses dispatch, not a universal rule about whether the code uses AI.
5. The model receives descriptions, schemas and results; imported helper source executes as code.

### Mechanism and caveats

ClinicOS uses defineCapability for typed contract data and bindCapability for contract + target + run. Its local helper narrows target to TypeScript, while Core also accepts agent, team, work and reserved Core handlers. Sales agent:sales targets a runtime whose mounted capability channel dispatches ordinary run code; this does not itself require a conversational LLM turn. A TypeScript handler can call Core’s authorized model broker. Contract identity, implementation target and actual internal reasoning are separate facts.

Sources: PK02, PK03, PK04, PK08, PK13, PK38, PK42, FINDC, FINDI, BOOKC, STAFF, SALESSOURCE.

## 03. One registry connects two sides

One list [capabilities/implementations.ts] feeds generated catalogue data and the deployed runtime’s executable dispatch map.

Remember: The run function stays in deployed code; it is not serialized into entry.json.

1. The implementation binding must be included in the shared registry [implementations.ts].
2. The generator follows project declarations into [entry.json.capabilities[]].
3. Only contract and target metadata serialize; the [run] function stays in deployed code.
4. The invoke route imports the same registry and builds its exact-key handler map.
5. Published contract and deployed handler must match; a missing handler returns [unknown_capability].

### Mechanism and caveats

Trace the actual bridge: implementation.ts → capabilities/implementations.ts → kee.project.ts → tooling/sync-entry.mjs → entry.json.capabilities[], and independently registry → invoke route → handlers[binding.contract.key] → binding.run. The generated entry contains contract plus target metadata, not JavaScript run. Upload validates named file presence but does not prove deployed route parity. When adding supported generic contract fields, verify this generator forwards them; a deliberately narrower local helper is not itself a defect.

Sources: PK07, PK09, PK10, PK14, PK15, PK30, PK31, PK40, PK46, PK53, BIND, GEN.

## 04. Installed here, governed here

The generated action must be published, installed and enabled here. Finding it still does not authorize execution.

Remember: Published, found, ready, allowed and completed are independent states.

1. Generated metadata describes [clinicos/clinic.find_times]; runtime code remains a separate deployment.
2. Publishing stores an immutable contract version and declared dependency closure.
3. An active consented company installation receives the tenant binding.
4. Default search selects enabled candidates and returns readiness, missing dependencies and access advice.
5. Exact invocation rechecks membership, policy, approval and required dependencies.
6. A scoped grant reaches the handler; Core broker access and returned output are validated.

### Mechanism and caveats

Core exact ID is pack slug + slash + contract key. Publishing persists immutable contract snapshots and computed closure. Closure unions declared action, implementing agent/team and declared tools requirements; it is metadata, not static analysis of helper calls. TypeScript contributes its own listed requirements. Active install creates bindings; widening approved access can hold consent, while existing choices survive resync. Search can find unready or approval-required candidates. Invocation rechecks, mints narrowed runtime authority, validates output and prevents a late response from replacing reclaimed uncertainty. No live install/deployed version was checked.

Sources: PK01, PK18, PK19, PK20, PK21, PK22, PK23, PK24, PK25, PK26, PK27, PK28, PK29, PK30, PK32, PK34, PK39, PK50.

## 05. Find a time, then book that time

Two actions inside ClinicOS compose through exact slot fields. Finding a time does not secretly call booking.

Remember: The operator composes actions; each keeps its own contract, policy and outcome.

1. Find availability [clinic.find_times] returns structured real slots; it does not reserve them.
2. The user chooses; Core/operator carries the same exact slot fields forward.
3. Booking [clinic.book] adds person identity to that slot input.
4. The no-write preview checks the proposed action before required approval.
5. After approval, fresh slot checks precede hold, confirm and read-back.
6. [appointment_ref] proves the appointment outcome; follow-up events have separate status.

### Mechanism and caveats

Find open times [clinic.find_times] requires procedure and returns times plus optional service/range/context fields. Exact times carry starts_at, ends_at, practitioner_ref, when, minutes, with; service/mode accompany the response. It uses Medplum/Brain/settings/work_items, approval allow, timeout 30s. It does not change appointments but can raise setup work; it is not in the hardcoded read-only deadline allowlist. Book [clinic.book] adds person identity, requires exact fields, has approval_required, preview and a 60s budget. Preview uses no-write authority; execution checks fresh conditions then shared bookTime verifies provider truth. Output includes appointment_ref, starts_at, when, already_booked, look_alike and confirmation. Timeout constants are not latency measurements. Patient tools and booking page use shared helpers under separate authority; they are not universally routed through staff clinic.book.

Sources: FINDC, FINDI, FINDMED, BOOKC, BOOKREQ, STAFF, BOOK, PK38, PK49.

## 06. Two catalogs, not one giant tool list

Eve offers model tools. Keemakr searches installed business actions through a few authored wrappers.

Remember: Found, ready, permitted and approved are separate states.

1. Eve exposes authored search and invoke schemas to the model.
2. Search ranks current enabled action bindings and hydrates member-specific facts.
3. A result can be found while a required calendar is missing.
4. The model supplies the exact action identity to the invoke wrapper.
5. Invocation rechecks authority and any exact-action approval before dispatch.

### Mechanism and caveats

The selected action ribbon retains its Pack parent across this bridge. The root build gate expects 24 authored static tools, not one model tool per installed business action; it was not executed. Publishing writes immutable contracts and dependency closure. Active consented installs create enabled bindings while preserving existing choices. Verified owner/admin can change enabled/approval/approvers. Default search filters disabled bindings, ranks lexical/semantic candidates and hydrates readiness and permission/approver advice. A found result can remain ready=false or approval-required. Invocation performs live checks again.

Sources: E12, E14, E15, E16, E17, E19, E20, E21, E22, E23.

## 07. Read docs, verify the owning code

Documentation is a reference, not runtime evidence. Separate aligned claims, teaching omissions, checked drift, implementation gaps and unverified state.

Remember: A missing explanation is not automatically a software defect.

1. Documentation supplies teaching intent; current owning code decides implementation facts.
2. Pack containment is aligned in docs and code; the previous guide omitted that visual link.
3. Same-feature capability approval cards default to one day and cap at seven days, despite no-timer wording.
4. Sales conversion lacks executable wiring; live approval bindings are a different unverified question.

### Mechanism and caveats

Docs snapshot 678902df0accca44133c4b5a3a855839fbe50d67 is supporting reference; Core v2 b5f3402 remains authoritative. Verified same-scope drift: staff chat capability cards use openCapabilityAskStep(kind=capability, expiresAt=cardDeadline), one-day default/seven-day maximum shortened by action/named times. Do not borrow ask_user semantics. Teaching omission: tool/skill/action synonyms and “nothing between” describe a simple conversational path, not the absence of search, validation, workflow, authority or network layers. Closure is declared metadata union, not automatic source analysis. Sales unbound conversion is a source gap; actual campaign approval binding is unverified. Narrow helper types and forwarding subsets require field-parity checks when extending, not automatic defect labels. Table-column numerical differences, deployment policy, chronological and eval readiness claims remain unverified here and are omitted from strong verdicts.

Sources: PK01, PK41, PK42, PK43, PK44, PK45, PK46, PK47, PK48, PK49, PK50, PK51, PK52, PK53, PK54, PK55, PK56, DOCGLOSS, EVENT, STUB.

## 08. A request becomes business work

A person asks. Keemakr finds permitted work and reports what happened.

Remember: A receipt is acceptance. A confirmed outcome is completion.

1. The person asks for a consultation or qualified prospects.
2. Business context determines the appropriate work lane.
3. A clinic booking can use a constrained action; research can start tracked work.
4. The system reports confirmed outcome, review wait or uncertainty.

### Mechanism and caveats

This is a teaching synthesis. The three lanes differ: patient conversation tools, staff governed named actions and tracked work. Not every request uses every station. Action acceptance and an ended model turn do not establish business completion.

Sources: E18, E23, E24, BOOK, SALES.

## 09. The business setup is an application

Instructions, actions, screens, record shapes and wiring work together. They do not all become model tools.

Remember: A pack is business code around its conversation workers.

1. The authored blueprint imports the pieces that define this business setup.
2. Conversation workers provide instructions and deliberately limited tool surfaces.
3. Screens and record shapes serve people and code; they are not automatically prompt context.
4. Events and schedules need explicit wiring to reach executable code.

### Mechanism and caveats

ClinicOS has 35 bound actions, 14 Tables, 30 screen IDs, two declared inbound Eve agents, 14 event responders and six jobs. Voice and Copilot are separate custom LiveKit workers. Sales is a smaller aesthetic-practice pipeline. Generated entry.json describes installable contracts; it does not start every source file.

Sources: GEN, BIND, A01, A02, C01.

## 10. A file needs a reachable path

An import, registry, route or schedule must connect a file to running work.

Remember: A file on disk is not automatically callable.

1. Ordinary helpers run when another function imports and calls them.
2. An action needs its contract and implementation in the registry.
3. The runtime route finds that exact registered key before execution.
4. Sales checkout conversion lacks a handler binding and its current stub writes nothing.

### Mechanism and caveats

Helpers use normal TypeScript imports. Next route.ts files become HTTP endpoints, not Eve tools. Action contracts need authored manifest, implementation registry, install and target handler parity. Events need handler index plus subscription. Jobs need JOBS, enabled schedule, work route and runner. Screens need registry and renderer. Tests/evals are verification code and do not execute in production merely by being present.

Sources: E06, E07, GEN, BIND, EVENT, STUB.

## 11. How Eve gets its tool menu

Configuration and declared lifecycle resolvers determine what tools the model can see.

Remember: Eve runs the loop. The selected model proposes the next step.

1. The root agent disables framework defaults while retaining authored tool definitions.
2. The authored build verifier expects 24 static tools; this review did not run it.
3. Files resolves per turn; Knowledge and Tables currently resolve at session start.
4. Execution rechecks current authority even when tool visibility was resolved earlier.

### Mechanism and caveats

Current root source pins Eve 0.80.1, but the other workspace node_modules held 0.58.1 and was not used to infer 0.80.1 internals. Authored definitions and verifier establish the inspected boundary; compiled output is unverified. Kee root currently routes its main model to DeepSeek Flash with medium reasoning; pack labels can resolve through Core to different provider routes. This is configuration, not observed live selection. Dynamic Knowledge/Tables session-start freshness deserves a restore-dependency/later-turn regression test, not a claim of a reproduced bug. Clinic Concierge/Intake disable defaults and have limited authored tools. Sales 0.44.4 has a dynamic SDK directory; inbound declares tools:[] but lacks explicit defaultTools:false and compiled audit. Do not claim technical exclusion from prompt wording alone.

Sources: E01, E02, E03, E04, E05, E08, E09, E10, CON, INBOUND, SALES.

## 12. A message enters an Eve session

Next web and Eve are peer services from the same Core repository. Current chat follows Eve’s session log.

Remember: A source folder is not an executing service.

1. The client submits a message to authenticated Next web.
2. Core creates or attaches to an owned Eve session before sending.
3. The receipt says accepted, not completed. Steering can wait for a step boundary.
4. Eve runs the model/tool loop with current context and offered schemas.
5. Eve events replay through the public view to the client.

### Mechanism and caveats

withEve declares separate Next and Eve peer services from this repository. Core registers a new session before send. Existing-session sends can supply a sequence cursor and return a stream receipt rather than a full snapshot. Follow/reconnect starts replay from zero because there is no stored projection; WireProjection documents O(n²) re-derivation. This is a source-supported latency hypothesis to benchmark, not measured bottleneck dominance.

Sources: E28, E29, E30, E33, E34, E35, E36, E37, E38.

## 13. Two return roads have different jobs

Pack-to-Core service calls access authorized records. Workflow completion callbacks must reach the owning Eve service.

Remember: Saving a report is not the same as waking its workflow.

1. The governed workflow invokes the pack with scoped authority.
2. Pack code calls Core’s broker for permitted Tables or connected services.
3. The broker checks authority and returns the service result.
4. Tracked work reports must reach the Eve service that owns the waiting hook.

### Mechanism and caveats

Normal Core service callbacks and Eve workflow completion callbacks are separate mechanisms. The workflow installs owner/completion/progress hooks before starting work, then parks without polling. Source warns that a resume recorded from the Next namespace can fail to wake an Eve-owned run. Public callback routing and owner identity must be verified. A wrong-owner failure is not a slow language model.

Sources: E26, E27, E28, E29, E30, E43, E44.

## 14. Clinic conversation has limited tools

Concierge and Intake use Eve. Direct page saves and custom voice workers follow different execution paths.

Remember: Model text must be supported by permitted code results.

1. Typed words enter a deduped, safety-screened Eve turn.
2. Turn context and per-step model resolution stay within current authority.
3. A declared tool calls shared business functions; the model does not read their source automatically.
4. Code verifies the effect; guarded reply rejects unsupported booking or team claims.

### Mechanism and caveats

Concierge has 17 authored tool files; health-fact is dynamic and absent unless the patient-facts feature is enabled. Intake has five tools, not every clinic capability. Both disable defaults. Session state tracks readback, identity-so-far, effect evidence, delivery dedupe and revisions; it is not Brain or the clinical chart. Reply can end via a fixed code answer without another model round. Intake handoff raises staff work while keeping chat active; safety remains. Voice/Copilot use custom LiveKit workers, not Eve defineAgent.

Sources: CON, INT, FORM, BOOK, OFFER, REPLY, TURN, HOOK.

## 15. Three entries share one booking engine

Patient tool, approved staff action and booking page converge on shared booking code. Follow-up work remains separate.

Remember: The visit can exist while a form draft still awaits staff.

1. The patient tool reaches bookOffered after current choice and safety checks.
2. Shared bookTime checks policy, coordinates hold, confirms and reads back.
3. Medplum establishes appointment truth; operational records and event follow.
4. Confirmation, intake draft and brief proceed independently after the booking fact.

### Mechanism and caveats

Patient book tool and booking page call bookOffered, which calls bookTime; staff capability calls shared booking code under its own authority. Patient and staff gates differ; staff has named override behavior. A duplicate/new message can revoke old turn authority without undoing a remote confirmed visit; later valid work reconciles by key. Confirmation, draft intake and brief are distinct event paths. No universal exactly-once promise follows.

Sources: BOOK, STAFF, OFFER, PAGE, BIND, HANDLERS, CONFIRM, TURN.

## 16. Research prepares; policy controls placement

Sales uses real provider research. Its model, action channel and inbound adapter are different surfaces.

Remember: Prepared, enrolled, delivered and converted are different milestones.

1. Internal chat can start governed tracked work; it is not purely read-only.
2. Direct action handlers run research code, not necessarily another conversational model.
3. Qualification prepares evidence and a candidate list.
4. Placement depends on the live Core approval binding and current suppression.
5. Provider enrollment precedes local touch, creating a reconciliation boundary.

### Mechanism and caveats

Sales internal and inbound use Eve 0.44.4; their models are not necessarily Kee root’s current main route. Internal has pipeline_status, start_brief and a dynamic SDK directory that can mount grant-scoped Core tools. Inbound declares tools:[] and forbids action calls in instructions, but compiled defaults are unverified. Its adapter implements reply posting; requested handoff has no action found in the local tree. This is a reachability gap to verify, not proof Core lacks handoff.

Sources: SALES, INBOUND, ADAPTER, PLACE, SEGMENT, E23, E27.

## 17. An event can stop at an unbound socket

Declaring checkout-paid does not connect conversion recording. The current Sales responder is an unwired stub.

Remember: A schema-reuse edge is not an execution edge.

1. The checkout event identity appears in generated declarations.
2. No event handler binding connects delivery to this responder.
3. The current stub only returns Boolean(lead_id), with no conversion write.
4. A repair needs registration, authenticated delivery and idempotent persistence tests.

### Mechanism and caveats

Current source: checkoutPaidIdentity reaches manifest generation, but recordConversion is not registered and only returns a boolean. engagement.record is a real capability; using an engagement event schema as input is a type/contract relationship, not proof a subscription delivers events to it. Proposed repair must prove exact release/target, authority, one conversion touch and duplicate-delivery behavior.

Sources: EVENT, STUB, E15.

## 18. A known action is not authority

Installation, readiness, membership, policy and exact approval are separate server gates. Health-data purpose matters after tenant checks.

Remember: Enabling availability never grants everyone permission.

1. The server derives company and member from verified authority.
2. The exact installed action and required dependencies must be ready.
3. Policy can park the exact action for an authorized reviewer.
4. The scoped ticket reaches the exact handler; callbacks recheck permitted access.

### Mechanism and caveats

Owner/admin enable control uses verified management-role enforcement; a client surface header is not the security boundary. Publishing/installing/enabling/discovering do not imply execution permission. PHI can exist outside Medplum in enquiry reasons, work details, Copilot quotes, conversation/transcript context and model processing/telemetry. US/HIPAA review requires actual agreements, roles, safeguards and retention evidence, unverified here. No compliance verdict follows from code.

Sources: E16, E17, E22, E23, E24, E26, E27, PRIV, TRACE, HHS.

## 19. Follow the wait before choosing a fix

First receipt, first useful answer and verified business outcome have different clocks.

Remember: Current operator histogram names do not prove exported p95.

1. Measure from client submit, not only provider first token.
2. Preparation, lifecycle context and Eve acceptance can precede model output.
3. Discovery includes ranking, readiness and member/approver hydration.
4. Tool work can add Core callbacks, provider waits and model decision loops.
5. Server emission is not browser paint; correlate both without sensitive content.

### Mechanism and caveats

Source has Core/Eve hop logs, but operatorMetrics is NoopMeter and discarded; no metric readers/views prove a live histogram. Replay begins at zero and O(n²) re-derivation is explicit source hypothesis for long reconnects. Steering acceptance can wait at a step boundary during a slow tool. Discovery hydration contains permissions/dependencies beyond vector retrieval. Compute end-to-end percentiles from full requests; never sum stage p95. No latency distribution was measured.

Sources: E04, E19, E20, E22, E35, E36, E37, E38, E47, E48, NOOP.

## 20. A lost reply leaves an outcome question

The provider may have completed the write before the caller stops waiting.

Remember: Reconcile the effect before replaying an ambiguous write.

1. The request leaves under one stable operation identity.
2. The provider can commit before its reply is lost.
3. Core does not blindly auto-retry runtime_timeout.
4. Read provider evidence by key before repairing local state or repeating.

### Mechanism and caveats

Core deliberately excludes ambiguous runtime_timeout from transient replay. Shared clinic booking has deterministic key/read-back behavior. Sales enrollment precedes local touch and has a crash window; do not imply it already has all desired reconciliation. Lease expiry and workflow replay are not universal exactly-once external effects. Earlier work can remain completed when a later batch item fails.

Sources: TIMEOUT, BOOK, PLACE, E43, E44.

## 21. Shorten the measured critical path

Overlap independent work and checkpoint long tasks while keeping authority and outcome checks.

Remember: A faster-looking answer must still report the truth.

1. Establish a source-versioned synthetic baseline and complete trace.
2. Overlap only independent reads; dependent work remains ordered.
3. Cache stable metadata by version, not live member or consent decisions.
4. Checkpoint long work and compare latency, cost, quality and duplicate effects.

### Mechanism and caveats

Implemented optimizations include some concurrent context reads and versioned caches. Further bounded Sales practice concurrency, billed-stage checkpoints, incremental projection and truthful progress UI are proposals. Test revoked access, foreign records, stale approvals, duplicate callback and ambiguous timeout before claiming improvement. The diagram is dependency topology, not measured timing. A parallel sum uses max(branches) plus overhead, not the sum of each tail percentile.

Sources: E04, E05, E22, E38, TIMEOUT, PLACE, NOOP.

## 22. What to fix first

Prove authorized outcomes, close real wiring gaps, then measure and improve the slow path.

Remember: Source gap, risk and missing verification are different findings.

1. Fault-test correct effects and tenant/member authority first.
2. Verify compiled tools, deployed handlers, event bindings and workflow-owner callbacks.
3. Connect client, turn, tool-call and work IDs without sensitive content.
4. Change one measured bottleneck and rerun reliability tests.

### Mechanism and caveats

Confirmed source gap: Sales checkout conversion is unwired and stubbed; first-page list/count limits remain in prior research. Risks: provider-success/local-failure, repeated paid calls, override provenance, health-data copies. Missing verification: compiled/default tools, installed policy, provider agreements, deployed versions and live latency. Proposed work: safe checkpoints, bounded concurrency, replay projection improvements and context freshness tests. Suggested owner roles and acceptance criteria require assignment; no tickets or dates are claimed.

Sources: E03, E16, E27, E38, E44, EVENT, STUB, TIMEOUT, NOOP.

## Source library

### E01. package.json:42-88

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/package.json#L42-L88

### E02. agent/agent.ts:1-31

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/agent.ts#L1-L31

### E03. scripts/verify-agent-build.mjs:1-135

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/scripts/verify-agent-build.mjs#L1-L135

### E04. agent/instructions/discovery.ts:1-105

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/instructions/discovery.ts#L1-L105

### E05. agent/lib/turn-member.ts:1-65

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/lib/turn-member.ts#L1-L65

### E06. agent/tools/capability-invoke.ts:1-32

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/tools/capability-invoke.ts#L1-L32

### E07. src/workflows/capability-steps.ts:1-61

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/workflows/capability-steps.ts#L1-L61

### E08. agent/tools/my-files.ts:10-102

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/tools/my-files.ts#L10-L102

### E09. agent/tools/knowledge-search.ts:41-85

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/tools/knowledge-search.ts#L41-L85

### E10. agent/tools/tables.ts:367-395

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/tools/tables.ts#L367-L395

### E11. agent/channels/pack-report.ts:1-10

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/channels/pack-report.ts#L1-L10

### E12. src/lib/marketplace/capability-schema.ts:349-470

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L349-L470

### E13. src/lib/marketplace/capability-schema.ts:500-565

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L500-L565

### E14. src/lib/marketplace/index.ts:250-318

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/index.ts#L250-L318

### E15. src/lib/marketplace/index.ts:1249-1278

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/index.ts#L1249-L1278

### E17. src/lib/marketplace/capabilities.ts:84-174

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capabilities.ts#L84-L174

### E18. agent/instructions.md:1-15

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/instructions.md#L1-L15

### E19. agent/tools/capability-search.ts:23-81

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/tools/capability-search.ts#L23-L81

### E20. src/lib/marketplace/capability-search.ts:157-245

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-search.ts#L157-L245

### E21. src/lib/marketplace/capability-search.ts:302-332

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-search.ts#L302-L332

### E22. src/lib/marketplace/capability-matches.ts:62-175

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-matches.ts#L62-L175

### E23. agent/tools/capability-invoke.ts:209-240

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/tools/capability-invoke.ts#L209-L240

### E24. src/workflows/capability-steps.ts:4-61

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/workflows/capability-steps.ts#L4-L61

### E25. src/lib/marketplace/capability-schema.ts:519-533

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L519-L533

### E26. packages/agent-sdk/src/capabilities.ts:1-26

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/packages/agent-sdk/src/capabilities.ts#L1-L26

### E27. packages/agent-sdk/src/capabilities.ts:126-194

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/packages/agent-sdk/src/capabilities.ts#L126-L194

### E28. vercel.ts:1-12

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/vercel.ts#L1-L12

### E29. vercel.ts:63-110

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/vercel.ts#L63-L110

### E30. vercel.ts:200-223

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/vercel.ts#L200-L223

### E31. next.config.ts:15-41

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/next.config.ts#L15-L41

### E32. next.config.ts:129-145

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/next.config.ts#L129-L145

### E33. src/lib/operator/eve-conversation.ts:68-88

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/eve-conversation.ts#L68-L88

### E34. agent/channels/eve.ts:12-55

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/channels/eve.ts#L12-L55

### E35. src/lib/operator/eve-conversation.ts:52-57

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/eve-conversation.ts#L52-L57

### E36. src/lib/operator/eve-conversation.ts:113-169

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/eve-conversation.ts#L113-L169

### E37. src/lib/operator/eve-conversation.ts:171-201

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/eve-conversation.ts#L171-L201

### E38. src/lib/operator/eve-projection.ts:86-94

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/eve-projection.ts#L86-L94

### E39. src/lib/model.ts:75-110

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/model.ts#L75-L110

### E40. src/lib/model.ts:355-395

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/model.ts#L355-L395

### E41. src/lib/model-forward.ts:1-21

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/model-forward.ts#L1-L21

### E42. src/app/api/capability/model/v1/chat/completions/route.ts:1-20

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/app/api/capability/model/v1/chat/completions/route.ts#L1-L20

### E43. src/workflows/pack-execution.ts:143-204

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/workflows/pack-execution.ts#L143-L204

### E44. src/lib/work/pack-report.ts:11-32

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/work/pack-report.ts#L11-L32

### E45. agent/hooks/asks.ts:1-21

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/hooks/asks.ts#L1-L21

### E46. agent/hooks/asks.ts:28-103

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/hooks/asks.ts#L28-L103

### E47. agent/instrumentation/keemakr.ts:5-21

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/instrumentation/keemakr.ts#L5-L21

### E48. agent/instrumentation/otel.ts:5-19

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/instrumentation/otel.ts#L5-L19

### E16. Availability PATCH: verified owner/admin role

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/app/api/capabilities/[slug]/[key]/route.ts#L1-L99

### A01. ClinicOS blueprint imports,1–14

/Users/sobingt/projects/covalify/clinicos/kee.project.ts:1

### A02. Generator

/Users/sobingt/projects/covalify/clinicos/tooling/sync-entry.mjs:15

### A03. Concierge package

/Users/sobingt/projects/covalify/clinicos/agents/concierge/package.json:1

### A04. Intake package

/Users/sobingt/projects/covalify/clinicos/agents/intake/package.json:1

### A05. Contract

/Users/sobingt/projects/covalify/clinicos/capabilities/book/capability.ts:29

### A06. Binding

/Users/sobingt/projects/covalify/clinicos/capabilities/book/implementation.ts:1

### A07. Registry

/Users/sobingt/projects/covalify/clinicos/capabilities/implementations.ts:1

### A08. Invocation

/Users/sobingt/projects/covalify/clinicos/app/capabilities/[key]/invoke/route.ts:1

### A09. Staff import3/run50

/Users/sobingt/projects/covalify/clinicos/capabilities/book/implementation.ts:3

### A10. Helper import13/run108

/Users/sobingt/projects/covalify/clinicos/packages/booking/book-offered.ts:13

### A11. Booking page import26/run307

/Users/sobingt/projects/covalify/clinicos/packages/booking/booking-page.ts:26

### A12. Generator40

/Users/sobingt/projects/covalify/clinicos/tooling/sync-entry.mjs:39

### A13. SDK client wrapper

/Users/sobingt/projects/covalify/clinicos/packages/runtime/kee.ts:1

### A14. Channel route

/Users/sobingt/projects/covalify/clinicos/app/channels/v1/deliver/route.ts:1

### A15. Screen route

/Users/sobingt/projects/covalify/clinicos/app/screens/[screen]/load/route.ts:1

### A16. Form route

/Users/sobingt/projects/covalify/clinicos/app/links/[purpose]/form/[[...action]]/route.ts:1

### A17. Index

/Users/sobingt/projects/covalify/clinicos/handlers/events/index.ts:1

### A18. Route

/Users/sobingt/projects/covalify/clinicos/app/events/v1/deliver/route.ts:1

### A19. Handler20–46

/Users/sobingt/projects/covalify/clinicos/handlers/events/send-confirmation.ts:20

### A20. Abilities

/Users/sobingt/projects/covalify/clinicos/app/api/abilities/route.ts:1

### A21. Work route

/Users/sobingt/projects/covalify/clinicos/app/api/work/route.ts:1

### A22. Workflow

/Users/sobingt/projects/covalify/clinicos/workflows/clinic-work.ts:1

### A23. Steps33–44

/Users/sobingt/projects/covalify/clinicos/workflows/steps.ts:33

### A24. Generator89–138

/Users/sobingt/projects/covalify/clinicos/tooling/sync-entry.mjs:89

### A25. Load route14–20

/Users/sobingt/projects/covalify/clinicos/app/screens/[screen]/load/route.ts:14

### A26. Startup

/Users/sobingt/projects/covalify/clinicos/instrumentation.ts:1

### A27. Agent OTEL

/Users/sobingt/projects/covalify/clinicos/packages/runtime/agent-otel.ts:1

### A28. Scripts

/Users/sobingt/projects/covalify/clinicos/package.json:1

### A29. Agent

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/agent.ts:1

### A30. Disabled direct channel

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/channels/eve.ts:1

### A31. Inbound122–135

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/channels/inbound.ts:122

### A32. Tool folder exemplar

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/tools/book.ts:29

### A33. Dynamic health-fact15–29

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/tools/health-fact.ts:15

### A34. KB

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/tools/knowledge.ts:5

### A35. New link13–43

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/tools/new-link.ts:13

### A36. State22–166

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/lib/session.ts:22

### A37. Hook13–60

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/hooks/reset-turn.ts:13

### A38. Clinic instructions21–46

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/instructions/clinic.ts:21

### A39. Person instructions11–18

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/instructions/person.ts:11

### A40. Reply17–88

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/lib/reply.ts:17

### A41. Inbound125–130

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/channels/inbound.ts:125

### A42. Agent

/Users/sobingt/projects/covalify/clinicos/agents/intake/agent/agent.ts:1

### A43. Tool save

/Users/sobingt/projects/covalify/clinicos/agents/intake/agent/tools/save-answers.ts:1

### A44. Inbound53–111

/Users/sobingt/projects/covalify/clinicos/agents/intake/agent/channels/inbound.ts:53

### A45. Dynamic form13–41

/Users/sobingt/projects/covalify/clinicos/agents/intake/agent/instructions/clinic.ts:13

### A46. Save tool21–35

/Users/sobingt/projects/covalify/clinicos/agents/intake/agent/tools/save-answers.ts:21

### A47. State

/Users/sobingt/projects/covalify/clinicos/agents/intake/agent/lib/session.ts:1

### A48. Handoff11–53

/Users/sobingt/projects/covalify/clinicos/agents/intake/agent/tools/hand-off.ts:11

### A49. Route

/Users/sobingt/projects/covalify/clinicos/app/voice/v1/call/route.ts:1

### A50. Worker1–40

/Users/sobingt/projects/covalify/clinicos/agents/voice-call/call.ts:1

### A51. Session route1–26

/Users/sobingt/projects/covalify/clinicos/app/voice/v1/session/route.ts:1

### A52. Voice constants59–87

/Users/sobingt/projects/covalify/clinicos/agents/voice-call/call.ts:59

### A53. Handover

/Users/sobingt/projects/covalify/clinicos/packages/runtime/call-agent.ts:1

### A54. Route

/Users/sobingt/projects/covalify/clinicos/app/calls/v1/copilot/route.ts:1

### A55. Worker1–51

/Users/sobingt/projects/covalify/clinicos/agents/copilot-call/agent.ts:1

### A56. Handover36–53

/Users/sobingt/projects/covalify/clinicos/packages/runtime/call-agent.ts:36

### A57. Agent

/Users/sobingt/projects/sales/agents/sales/agent/agent.ts:1

### A58. Channel

/Users/sobingt/projects/sales/agents/sales/agent/channels/eve.ts:1

### A59. Capability channel

/Users/sobingt/projects/sales/agents/sales/agent/channels/capabilities.ts:1

### A60. Directory

/Users/sobingt/projects/sales/agents/sales/agent/tools/keemakr-directory.ts:1

### A61. Sandbox

/Users/sobingt/projects/sales/agents/sales/agent/sandbox.ts:1

### A62. Task starter

/Users/sobingt/projects/sales/agents/sales/agent/tools/start_brief.ts:1

### A63. Instructions

/Users/sobingt/projects/sales/agents/sales/agent/instructions.md:1

### A64. Agent

/Users/sobingt/projects/sales/agents/sales-inbound/agent/agent.ts:1

### A65. Chat channel

/Users/sobingt/projects/sales/agents/sales-inbound/agent/channels/core.ts:1

### A66. Brain instructions

/Users/sobingt/projects/sales/agents/sales-inbound/agent/instructions/brain.ts:1

### A67. Adapter170–211,240–305

/Users/sobingt/projects/sales/packages/runtime/core-chat-adapter.ts:170

### A68. Instructions

/Users/sobingt/projects/sales/agents/sales-inbound/agent/instructions.md:1

### A69. Adapter240–305

/Users/sobingt/projects/sales/packages/runtime/core-chat-adapter.ts:240

### A70. sendTurn104–112

/Users/sobingt/projects/covalify/clinicos/packages/runtime/channel-turn.ts:104

### A71. book helper

/Users/sobingt/projects/covalify/clinicos/packages/booking/book-offered.ts:108

### A72. staff binding

/Users/sobingt/projects/covalify/clinicos/capabilities/book/implementation.ts:16

### A73. Handler16–46

/Users/sobingt/projects/covalify/clinicos/handlers/events/send-confirmation.ts:16

### A74. Workflow

/Users/sobingt/projects/covalify/clinicos/workflows/clinic-work.ts:11

### A75. Task plan

/Users/sobingt/projects/sales/agents/sales/agent/tools/start_brief.ts:23

### A76. Checkout handler36–43

/Users/sobingt/projects/sales/handlers/events/checkout-paid.ts:36

### A77. Sales generator87

/Users/sobingt/projects/sales/tooling/sync-entry.mjs:87

### A78. Engagement contract

/Users/sobingt/projects/sales/capabilities/engagement-record/capability.ts:1

### A79. booking-page307

/Users/sobingt/projects/covalify/clinicos/packages/booking/booking-page.ts:307

### A80. Runtime56–133

/Users/sobingt/projects/covalify/clinicos/packages/runtime/channel-turn.ts:56

### C01. Sales project

/Users/sobingt/projects/sales/kee.project.ts:1

### C02. ClinicOS guidance

/Users/sobingt/projects/covalify/clinicos/AGENTS.md:1

### C03. Sales guidance

/Users/sobingt/projects/sales/AGENTS.md:1

### C04. Binding registry

/Users/sobingt/projects/covalify/clinicos/capabilities/implementations.ts:3

### C05. Agent declarations, lines 22–106

/Users/sobingt/projects/covalify/clinicos/agents/index.ts:22

### C06. Table registry, line 497

/Users/sobingt/projects/covalify/clinicos/packages/schemas/tables.ts:497

### C07. Generated registry, lines 2–64

/Users/sobingt/projects/covalify/clinicos/ui/screen-registry.ts:2

### C08. Handlers registry, lines 3–18

/Users/sobingt/projects/covalify/clinicos/handlers/events/index.ts:3

### C09. Jobs registry

/Users/sobingt/projects/covalify/clinicos/jobs/index.ts:1

### C10. Reminder cadence

/Users/sobingt/projects/covalify/clinicos/jobs/reminders.ts:10

### C11. Sweep

/Users/sobingt/projects/covalify/clinicos/jobs/hold-sweep.ts:8

### C12. No-show

/Users/sobingt/projects/covalify/clinicos/jobs/no-show.ts:15

### C13. Follow-up

/Users/sobingt/projects/covalify/clinicos/jobs/follow-ups.ts:23

### C14. Reconcile

/Users/sobingt/projects/covalify/clinicos/jobs/medplum-reconcile.ts:35

### C15. Idle hand-back

/Users/sobingt/projects/covalify/clinicos/jobs/staff-idle-hand-back.ts:36

### C16. App requirements, lines 1–40

/Users/sobingt/projects/covalify/clinicos/apps/requirements.ts:1

### C17. Registry, lines 3–12

/Users/sobingt/projects/sales/capabilities/implementations.ts:3

### C18. Schemas, lines 1–110

/Users/sobingt/projects/sales/packages/schemas/tables.ts:1

### C19. Manifest, lines 35–75

/Users/sobingt/projects/sales/kee.project.ts:35

### C20. Requirements, lines 1–50

/Users/sobingt/projects/sales/apps/requirements.ts:1

### C21. Book constants/parser, lines 1–27

/Users/sobingt/projects/sales/packages/sales-rules/book.ts:1

### C22. ClinicOS record identity

/Users/sobingt/projects/covalify/clinicos/packages/records/people.ts:1

### C23. ClinicOS booking

/Users/sobingt/projects/covalify/clinicos/packages/booking/book.ts:1

### C24. Sales placement

/Users/sobingt/projects/sales/capabilities/campaign-place/implementation.ts:1

### C25. Inbound path, lines 1–12,47–90

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/channels/inbound.ts:1

### C26. readClinic, lines 76–117

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/lib/clinic.ts:76

### C27. Staff action, lines 19–81

/Users/sobingt/projects/covalify/clinicos/capabilities/book/implementation.ts:19

### C28. Manifest description

/Users/sobingt/projects/covalify/clinicos/kee.project.ts:25

### C29. Copilot call states, lines 429–495

/Users/sobingt/projects/covalify/clinicos/packages/schemas/tables.ts:429

### C30. Copilot controls, lines 1–56

/Users/sobingt/projects/covalify/clinicos/packages/copilot/controls.ts:1

### C31. Task creator, lines 6–47

/Users/sobingt/projects/sales/agents/sales/agent/tools/start_brief.ts:6

### C32. Sourcing, lines 1–66

/Users/sobingt/projects/sales/capabilities/practices-source/implementation.ts:1

### C33. Waterfall, lines 71–137

/Users/sobingt/projects/sales/packages/enrich/waterfall.ts:71

### C34. Qualification, lines 18–62

/Users/sobingt/projects/sales/capabilities/leads-qualify/implementation.ts:18

### C35. Contract, lines 7–15

/Users/sobingt/projects/sales/capabilities/campaign-place/capability.ts:7

### C36. Placement, lines 15–44

/Users/sobingt/projects/sales/capabilities/campaign-place/implementation.ts:15

### C37. Adapter, lines 59–96

/Users/sobingt/projects/sales/packages/runtime/core-chat-adapter.ts:59

### C38. ClinicOS log

/Users/sobingt/projects/keemakr/research_notes/Keemakr%20business%20operator%20explained/clinicos-test.log

### C39. Sales scripts

/Users/sobingt/projects/sales/package.json:1

### C40. Manifest end, lines 96–109

/Users/sobingt/projects/sales/kee.project.ts:96

### C41. Implementation, lines 13–41

/Users/sobingt/projects/sales/capabilities/engagement-record/implementation.ts:13

### C42. Status, lines 11–17

/Users/sobingt/projects/sales/agents/sales/agent/tools/pipeline_status.ts:11

### C43. List, lines 15–23

/Users/sobingt/projects/sales/capabilities/leads-list/implementation.ts:15

### C44. Qualification, lines 29–35

/Users/sobingt/projects/sales/capabilities/leads-qualify/implementation.ts:29

### C45. Segment rules, lines 64–96

/Users/sobingt/projects/sales/packages/sales-rules/segment.ts:64

### C46. Titles/budget, lines 20–27

/Users/sobingt/projects/sales/capabilities/practice-enrich/implementation.ts:20

### C47. Readers, lines 25–40

/Users/sobingt/projects/sales/packages/runtime/book.ts:25

### C48. Placement schema, line 14

/Users/sobingt/projects/sales/capabilities/campaign-place/capability.ts:14

### C49. Placement, lines 23–61

/Users/sobingt/projects/sales/capabilities/campaign-place/implementation.ts:23

### C50. Guard, lines 1–55

/Users/sobingt/projects/sales/packages/enrich/run.ts:1

### C51. Enrich loop

/Users/sobingt/projects/sales/capabilities/practice-enrich/implementation.ts:45

### C52. Deadline implementation, lines 1–39

/Users/sobingt/projects/covalify/clinicos/packages/runtime/deadline.ts:1

### C53. Rate wrapper, lines 116–157

/Users/sobingt/projects/covalify/clinicos/packages/runtime/kee.ts:116

### C54. Decision helper, lines 8–21,33–99

/Users/sobingt/projects/covalify/clinicos/packages/runtime/decide.ts:8

### C55. Screen, lines 26–42,67–96

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/lib/safety-screen.ts:26

### C56. Inbound failure behavior

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/channels/inbound.ts:79

### C57. Hold cache

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/lib/safety-hold.ts:452

### C58. Fresh booking check

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/tools/book.ts:41

### C59. Copilot constants

/Users/sobingt/projects/covalify/clinicos/agents/copilot-call/agent.ts:40

### C60. Lookup budget

/Users/sobingt/projects/covalify/clinicos/agents/voice-call/lookup.ts:210

### C61. Consent recording, lines 1–58

/Users/sobingt/projects/covalify/clinicos/packages/records/marketing-consent.ts:1

### C62. Follow-up, lines 18–62,93–112

/Users/sobingt/projects/covalify/clinicos/capabilities/follow-up/implementation.ts:18

### C63. Enquiry fields, lines 108–124

/Users/sobingt/projects/covalify/clinicos/packages/schemas/tables.ts:108

### C64. Work task fields, lines 243–272

/Users/sobingt/projects/covalify/clinicos/packages/schemas/tables.ts:243

### BOOK. Shared verified booking

/Users/sobingt/projects/covalify/clinicos/packages/booking/book.ts:1–166

### STAFF. Staff clinic.book binding

/Users/sobingt/projects/covalify/clinicos/capabilities/book/implementation.ts:1–81

### OFFER. Patient and page helper

/Users/sobingt/projects/covalify/clinicos/packages/booking/book-offered.ts:13–108

### PAGE. Booking page entry

/Users/sobingt/projects/covalify/clinicos/packages/booking/booking-page.ts:26–307

### EVENT. Sales event declaration without handler binding

/Users/sobingt/projects/sales/kee.project.ts:96–109

### STUB. Conversion responder does not write

/Users/sobingt/projects/sales/handlers/events/checkout-paid.ts:36–43

### CON. Concierge source agent

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/agent.ts:1–12

### INT. Intake handoff leaves chat active

/Users/sobingt/projects/covalify/clinicos/agents/intake/agent/tools/hand-off.ts:11–53

### FORM. Deterministic form HTTP entry

/Users/sobingt/projects/covalify/clinicos/app/links/[purpose]/form/[[...action]]/route.ts:1

### BIND. Clinic action registry

/Users/sobingt/projects/covalify/clinicos/capabilities/implementations.ts:1–40

### GEN. Clinic manifest generator

/Users/sobingt/projects/covalify/clinicos/tooling/sync-entry.mjs:15–138

### JOBS. Clinic recurring work entry

/Users/sobingt/projects/covalify/clinicos/workflows/clinic-work.ts:11

### SALES. Sales dynamic tool directory

/Users/sobingt/projects/sales/agents/sales/agent/tools/keemakr-directory.ts:1

### INBOUND. Sales inbound definition

/Users/sobingt/projects/sales/agents/sales-inbound/agent/agent.ts:1

### ADAPTER. Sales inbound adapter reply-only reachability

/Users/sobingt/projects/sales/packages/runtime/core-chat-adapter.ts:240–305

### PLACE. Campaign enrollment precedes local touch write

/Users/sobingt/projects/sales/capabilities/campaign-place/implementation.ts:15–61

### PRIV. Enquiry reason, work detail and Copilot copies

/Users/sobingt/projects/covalify/clinicos/packages/schemas/tables.ts:108–124,243–272,429–495

### TRACE. Configurable trace input/output capture

/Users/sobingt/projects/covalify/clinicos/packages/runtime/agent-otel.ts:1–14

### NOOP. Operator metrics are discarded, not exported p95

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/telemetry.ts#L1-L32

### TIMEOUT. runtime_timeout is deliberately not auto-retried

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-invoke.ts#L2517-L2524

### HHS. HHS cloud guidance: agreements and risk analysis

https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html

### HANDLERS. Clinic registered event responders

/Users/sobingt/projects/covalify/clinicos/handlers/events/index.ts:1–18

### CONFIRM. Booking confirmation reaction

/Users/sobingt/projects/covalify/clinicos/handlers/events/send-confirmation.ts:16–46

### REPLY. Concierge effect claim guard and fixed reply

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/lib/reply.ts:17–88

### TURN. Turn cancellation, authority and delivery dedupe

/Users/sobingt/projects/covalify/clinicos/packages/runtime/channel-turn.ts:56–133

### HOOK. Concierge turn reset and safety

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/hooks/reset-turn.ts:13–60

### SEGMENT. Real sales research and qualification

/Users/sobingt/projects/sales/packages/enrich/waterfall.ts:71–137

### PK01. keemakr/src/lib/marketplace/capability-schema.ts:1-45

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L1-L45

### PK02. keemakr/src/lib/marketplace/capability-schema.ts:84-97

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L84-L97

### PK03. keemakr/src/lib/marketplace/capability-schema.ts:419-461

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L419-L461

### PK04. keemakr/src/lib/marketplace/capability-schema.ts:500-533

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L500-L533

### PK05. clinicos/kee.project.ts:1-13

https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/kee.project.ts#L1-L13

### PK06. clinicos/kee.project.ts:55-78

https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/kee.project.ts#L55-L78

### PK07. clinicos/capabilities/implementations.ts:1-40

https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/capabilities/implementations.ts#L1-L40

### PK08. clinicos/tooling/contract.ts:79-96

https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/tooling/contract.ts#L79-L96

### PK09. clinicos/tooling/sync-entry.mjs:60-82

https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/tooling/sync-entry.mjs#L60-L82

### PK10. clinicos/app/capabilities/[key]/invoke/route.ts:40-55

https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/app/capabilities/[key]/invoke/route.ts#L40-L55

### PK11. keemakr/agent/agent.ts:4-31

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/agent.ts#L4-L31

### PK12. keemakr/scripts/verify-agent-build.mjs:36-119

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/scripts/verify-agent-build.mjs#L36-L119

### PK13. core-docs/content/docs/fundamentals/think-in-capabilities.mdx:23-35

https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/fundamentals/think-in-capabilities.mdx#L23-L35

### PK14. clinicos/tooling/sync-entry.mjs:10-15

https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/tooling/sync-entry.mjs#L10-L15

### PK15. clinicos/tooling/sync-entry.mjs:29-82

https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/tooling/sync-entry.mjs#L29-L82

### PK16. keemakr/src/lib/marketplace/capability-schema.ts:349-470

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L349-L470

### PK17. keemakr/src/lib/marketplace/capability-schema.ts:479-497

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L479-L497

### PK18. keemakr/src/lib/marketplace/index.ts:250-318

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/index.ts#L250-L318

### PK19. keemakr/src/lib/marketplace/index.ts:1249-1278

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/index.ts#L1249-L1278

### PK20. keemakr/src/lib/marketplace/index.ts:1466-1545

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/index.ts#L1466-L1545

### PK21. keemakr/src/lib/marketplace/capabilities.ts:155-170

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capabilities.ts#L155-L170

### PK22. keemakr/src/app/api/capabilities/[slug]/[key]/route.ts:1-99

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/app/api/capabilities/[slug]/[key]/route.ts#L1-L99

### PK23. keemakr/src/lib/marketplace/capability-invoke.ts:668-680

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-invoke.ts#L668-L680

### PK24. keemakr/src/lib/marketplace/capabilities.ts:84-136

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capabilities.ts#L84-L136

### PK25. keemakr/src/lib/marketplace/capability-search.ts:157-245

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-search.ts#L157-L245

### PK26. keemakr/src/lib/marketplace/capability-search.ts:302-332

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-search.ts#L302-L332

### PK27. keemakr/src/lib/marketplace/capability-matches.ts:226-251

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-matches.ts#L226-L251

### PK28. keemakr/src/lib/marketplace/capability-invoke.ts:608-709

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-invoke.ts#L608-L709

### PK29. keemakr/src/lib/marketplace/capability-invoke.ts:1920-1998

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-invoke.ts#L1920-L1998

### PK30. keemakr/packages/agent-sdk/src/capabilities.ts:126-194

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/packages/agent-sdk/src/capabilities.ts#L126-L194

### PK31. clinicos/app/capabilities/[key]/invoke/route.ts:40-55

https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/app/capabilities/[key]/invoke/route.ts#L40-L55

### PK32. keemakr/src/lib/capability/server.ts:1-55

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/capability/server.ts#L1-L55

### PK33. keemakr/packages/operator-sdk/src/index.ts:282-312

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/packages/operator-sdk/src/index.ts#L282-L312

### PK34. keemakr/src/lib/marketplace/capability-invoke.ts:2383-2454

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-invoke.ts#L2383-L2454

### PK35. keemakr/src/workflows/pack-execution.ts:143-204

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/workflows/pack-execution.ts#L143-L204

### PK36. keemakr/src/lib/work/pack-report.ts:11-32

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/work/pack-report.ts#L11-L32

### PK37. keemakr/vercel.ts:63-96

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/vercel.ts#L63-L96

### PK38. clinicos/capabilities/book/capability.ts:29-44

https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/capabilities/book/capability.ts#L29-L44

### PK39. keemakr/src/lib/marketplace/capability-schema.ts:536-565

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L536-L565

### PK40. clinicos/app/capabilities/[key]/invoke/route.ts:23-37

https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/app/capabilities/[key]/invoke/route.ts#L23-L37

### PK41. core-docs/content/docs/fundamentals/core-and-packs.mdx:8-34

https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/fundamentals/core-and-packs.mdx#L8-L34

### PK42. core-docs/content/docs/build-a-pack/capabilities.mdx:44-98

https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/build-a-pack/capabilities.mdx#L44-L98

### PK43. core-docs/content/docs/reference/pack-manifest.mdx:8-23

https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/reference/pack-manifest.mdx#L8-L23

### PK44. core-docs/content/docs/core-platform/kee.mdx:6-53

https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/core-platform/kee.mdx#L6-L53

### PK45. core-docs/content/docs/core-platform/connectors.mdx:60-66

https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/core-platform/connectors.mdx#L60-L66

### PK46. core-docs/content/docs/ship/publish-and-install.mdx:6-37

https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/ship/publish-and-install.mdx#L6-L37

### PK47. core-docs/content/docs/ship/publish-and-install.mdx:60-74

https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/ship/publish-and-install.mdx#L60-L74

### PK48. keemakr/src/lib/operator/card-deadline.ts:1-34

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/card-deadline.ts#L1-L34

### PK49. keemakr/src/workflows/capability-steps.ts:128-156

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/workflows/capability-steps.ts#L128-L156

### PK50. keemakr/src/lib/marketplace/capability-schema.ts:536-565

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L536-L565

### PK51. keemakr/src/lib/hitl/policy.ts:249-280

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/hitl/policy.ts#L249-L280

### PK52. keemakr/src/lib/hitl/policy.ts:334-408

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/hitl/policy.ts#L334-L408

### PK53. clinicos/tooling/sync-entry.mjs:66-77

https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/tooling/sync-entry.mjs#L66-L77

### PK54. keemakr/packages/operator-sdk/src/index.ts:296-312

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/packages/operator-sdk/src/index.ts#L296-L312

### PK55. keemakr/src/lib/hitl/policy.ts:1-24

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/hitl/policy.ts#L1-L24

### PK56. keemakr/src/lib/hitl/policy.ts:136-147

https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/hitl/policy.ts#L136-L147

### PX01. Project

/Users/sobingt/projects/covalify/clinicos/kee.project.ts:1

### PX02. Registry

/Users/sobingt/projects/covalify/clinicos/capabilities/implementations.ts:1

### PX03. Generation

/Users/sobingt/projects/covalify/clinicos/tooling/sync-entry.mjs:66

### PX04. Door

/Users/sobingt/projects/covalify/clinicos/app/capabilities/[key]/invoke/route.ts:40

### PX05. SDK wrapper

/Users/sobingt/projects/covalify/clinicos/packages/runtime/kee.ts:44

### PX06. Contract

/Users/sobingt/projects/covalify/clinicos/capabilities/find-times/capability.ts:11

### PX07. Execution

/Users/sobingt/projects/covalify/clinicos/capabilities/find-times/implementation.ts:11

### PX08. Mapping checks

/Users/sobingt/projects/covalify/clinicos/capabilities/clinic-context.ts:30

### PX09. Actual Medplum read

/Users/sobingt/projects/covalify/clinicos/packages/booking/medplum.ts:46

### PX10. Contract

/Users/sobingt/projects/covalify/clinicos/capabilities/book/capability.ts:29

### PX11. Requirements

/Users/sobingt/projects/covalify/clinicos/packages/booking/requirements.ts:1

### PX12. Preview/execution

/Users/sobingt/projects/covalify/clinicos/capabilities/book/implementation.ts:19

### PX13. Shared engine

/Users/sobingt/projects/covalify/clinicos/packages/booking/book.ts:120

### PX14. Event follow-through

/Users/sobingt/projects/covalify/clinicos/handlers/events/send-confirmation.ts:20

### PX15. Contract

/Users/sobingt/projects/sales/capabilities/practices-source/capability.ts:11

### PX16. Run

/Users/sobingt/projects/sales/capabilities/practices-source/implementation.ts:12

### PX17. Contract

/Users/sobingt/projects/sales/capabilities/practice-enrich/capability.ts:8

### PX18. Run

/Users/sobingt/projects/sales/capabilities/practice-enrich/implementation.ts:31

### PX19. Contract

/Users/sobingt/projects/sales/capabilities/campaign-place/capability.ts:7

### PX20. Run

/Users/sobingt/projects/sales/capabilities/campaign-place/implementation.ts:12

### PX21. Registry

/Users/sobingt/projects/sales/capabilities/implementations.ts:1

### PX22. Mounted direct-code handler

/Users/sobingt/projects/sales/agents/sales/agent/channels/capabilities.ts:1

### PX23. Task starter

/Users/sobingt/projects/sales/agents/sales/agent/tools/start_brief.ts:23

### PX24. Docs

/Users/sobingt/projects/core-docs/content/docs/fundamentals/core-and-packs.mdx:8

### PX25. Forwarder

/Users/sobingt/projects/covalify/clinicos/app/channels/v1/deliver/route.ts:1

### PX26. Docs

/Users/sobingt/projects/core-docs/content/docs/build-a-pack/capabilities.mdx:68

### PX27. Docs

/Users/sobingt/projects/core-docs/content/docs/build-a-pack/agents.mdx:24

### PX28. Actual Concierge tools

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/tools/book.ts:29

### PX29. Docs

/Users/sobingt/projects/core-docs/content/docs/reference/pack-manifest.mdx:173

### PX30. Actual build

/Users/sobingt/projects/covalify/clinicos/tooling/sync-entry.mjs:89

### PX31. Docs

/Users/sobingt/projects/core-docs/content/docs/reference/pack-manifest.mdx:161

### PX32. Generator

/Users/sobingt/projects/covalify/clinicos/tooling/sync-entry.mjs:23

### PX33. Docs

/Users/sobingt/projects/core-docs/content/docs/build-a-pack/agents.mdx:75

### PX34. Concierge resolver

/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/agent.ts:1

### PX35. Sales model

/Users/sobingt/projects/sales/agents/sales/agent/agent.ts:1

### PX36. Docs

/Users/sobingt/projects/core-docs/content/docs/build-a-pack/capabilities.mdx:44

### PX37. Sales contract

/Users/sobingt/projects/sales/capabilities/campaign-place/capability.ts:7

### PX38. Docs

/Users/sobingt/projects/core-docs/content/docs/ship/publish-and-install.mdx:6

### PX39. Sales generator

/Users/sobingt/projects/sales/tooling/sync-entry.mjs:77

### PX40. Conversion stub

/Users/sobingt/projects/sales/handlers/events/checkout-paid.ts:36

### FINDC. Find open times exact contract

/Users/sobingt/projects/covalify/clinicos/capabilities/find-times/capability.ts:11–26

### FINDI. Find open times implementation and TypeScript target

/Users/sobingt/projects/covalify/clinicos/capabilities/find-times/implementation.ts:11–95

### BOOKC. Book exact contract, preview and policy

/Users/sobingt/projects/covalify/clinicos/capabilities/book/capability.ts:29–74

### BOOKREQ. Declared booking requirements

/Users/sobingt/projects/covalify/clinicos/packages/booking/requirements.ts:1

### FINDMED. Real Medplum availability and clash checks

/Users/sobingt/projects/covalify/clinicos/packages/booking/medplum.ts:46–85

### SALESSOURCE. Agent-target sales action, direct implementation

/Users/sobingt/projects/sales/capabilities/practices-source/implementation.ts:12–66

### SALESSLUG. Sales parent slug and sibling declarations

/Users/sobingt/projects/sales/kee.project.ts:14–40

### DOCGLOSS. Docs terminology: tool/skill/action shorthand

https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/reference/glossary.mdx#L50-L64

