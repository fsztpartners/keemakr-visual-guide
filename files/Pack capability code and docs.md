# Pack to capability: code and documentation crosswalk

A business setup [pack] is the parent application. Named business actions [capabilities] are children alongside workers [agents], working registers [Tables], screens, events, jobs and connected apps. ClinicOS [clinicos] contains both Find open times [clinic.find_times] and Book an appointment [clinic.book]. These are examples from 35 bound ClinicOS actions, not two separate agents and not the entire inventory. A shared helper [bookTime] is implementation code, not automatically a public action.

The revised guide opens with this containment relationship and carries one selected parent/action identity through contract, binding, two-consumer registry, generated entry, publish/install, search, authority and result. Code is authoritative. core-docs is supporting teaching material, checked at snapshot `678902df0accca44133c4b5a3a855839fbe50d67`. Core v2 remains `b5f3402e71a983cecb12061511eb88714cdd1ba4`; local ClinicOS and Sales snapshots remain those in the guide. No deployment, tenant configuration or live provider outcome was tested by this comparison.

## One concrete identity survives the whole path

The local contract key [clinic.book] becomes exact Core identity [clinicos/clinic.book]. The authored contract [capability.ts] defines the boundary: description, input/output schemas, requirements, starting policy and presentation. The binding [implementation.ts] combines that contract, target metadata and executable [run]. The same [capabilities/implementations.ts] list has two consumers. The generator follows [kee.project.ts] and serializes contract plus target metadata into [entry.json.capabilities[]]. It does not serialize the run function. The runtime invocation route separately imports the list and makes the handler map keyed by [binding.contract.key]. A source file, generated metadata, published version and deployed handler are four separate facts.

An action's implementation kind selects dispatch. ClinicOS targets TypeScript. A TypeScript handler can still call a model through Core's authorized broker. Sales uses agent:sales target metadata, while its mounted capability channel directly dispatches implementation code; that particular action path does not itself require a conversational LLM turn. Neither “TypeScript means no AI anywhere” nor “agent target means another reasoning conversation” is a valid universal rule.

The model sees selected instructions/context, tool descriptions/input schemas and returned results. It does not automatically read helpers' source. Eve's authored search/invoke tools bridge into the installed capability catalogue; adding one business action does not add another root Eve tool file.

## Two real clinic actions compose through data

Find open times [clinic.find_times] accepts a procedure with optional local date span, practitioner and part of day. It returns structured real times containing starts_at, ends_at, practitioner_ref, when, minutes and with, alongside service/mode and optional clarification/range fields. It does not reserve an appointment. It is also not universally side-effect-free: missing consultant/calendar setup can raise staff work [work_items]. Its approval is allow and its timeout budget is 30 seconds; it is absent from the hardcoded read-only deadline allowlist.

Book an appointment [clinic.book] requires those exact slot fields plus person information. It has approval_required, preview:true and a 60-second budget. The no-write preview validates the proposal without prematurely creating a contact. Approved execution rechecks the current slot, then shared booking code coordinates hold, confirmation and provider read-back. Output includes appointment_ref, starts_at, when, already_booked, look_alike and confirmation. These timeout values are budgets, not measured latency.

The Core/operator composes the two actions around the user's choice. Find-times does not secretly invoke booking. Patient Eve tools and the booking page reach shared booking helpers through different authority lanes; they are not automatically routed through the staff clinic.book card. Appointment existence, confirmation delivery and staff sending intake are separate outcomes.

## Readiness and domain setup need separate states

| Situation | Layer | Correct interpretation |
|---|---|---|
| Medplum connection/account unavailable | Core required dependency | Search can report ready:false/missing; invocation must not bypass it. |
| Connected app but missing clinic Schedule/consultant mapping | Domain setup inside handler | Core dependency readiness can be true while business setup remains incomplete. Handler can refuse or raise staff setup work. |
| Fully configured calendar but no suitable open time | Legitimate domain result | An empty availability result is not automatically an infrastructure or configuration failure. |
| Action disabled by verified owner/admin | Tenant binding availability | Ordinary default search excludes it; the published contract and source can still exist. |
| Enabled and dependency-ready, but member lacks authority | Member/policy boundary | Found and ready are not execution permission. |
| Exact action awaiting required review | Approval boundary | Prepared and requested are not approved or completed. |
| Published exact contract, deployed handler absent/stale | Release parity | Runtime can return unknown_capability; metadata upload does not magically deploy code. |
| Provider may have acted but reply is lost | Effect boundary | Reconcile by operation/provider evidence; do not fabricate success or blindly replay. |

## Code and docs crosswalk

Categories describe different findings. ALIGNED is agreement. TEACHING OMITTED is a relationship missing or overcompressed in the guide/docs explanation. DOCS DRIFT is a checked same-scope contradiction. IMPLEMENTATION GAP is a concrete missing executable path. UNVERIFIED requires more source/deployment/testing evidence. A narrow helper or a source-only check is not automatically a defect.

| Relationship or claim | Category | Owning evidence and treatment |
|---|---|---|
| Pack contains capabilities and sibling registries | ALIGNED | [clinicos/kee.project.ts:1-13](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/kee.project.ts#L1-L13); [core-docs/content/docs/fundamentals/core-and-packs.mdx:8-34](https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/fundamentals/core-and-packs.mdx#L8-L34). Keep the parent frame and show two examples from the larger bound list. |
| Existing guide showed registries without carrying the same Pack/action | TEACHING OMITTED | [keemakr/src/lib/marketplace/capability-schema.ts:1-45](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L1-L45); [clinicos/capabilities/implementations.ts:1-40](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/capabilities/implementations.ts#L1-L40). Carry clinicos/clinic.book from child tile through files, catalogue and runtime. |
| Contract plus executable binding | ALIGNED | [clinicos/tooling/contract.ts:79-96](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/tooling/contract.ts#L79-L96); [core-docs/content/docs/build-a-pack/capabilities.mdx:44-98](https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/build-a-pack/capabilities.mdx#L44-L98). Keep identity separate from dispatch and internal AI calls. |
| One implementation registry has two consumers | ALIGNED | [clinicos/tooling/sync-entry.mjs:60-82](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/tooling/sync-entry.mjs#L60-L82); [clinicos/app/capabilities/[key]/invoke/route.ts:40-55](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/app/capabilities/[key]/invoke/route.ts#L40-L55). Generated data and executable handler map both depend on registry inclusion. |
| Generated entry performs the run function | TEACHING OMITTED | [clinicos/tooling/sync-entry.mjs:29-82](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/tooling/sync-entry.mjs#L29-L82); [clinicos/tooling/sync-entry.mjs:66-77](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/tooling/sync-entry.mjs#L66-L77). Contract and target serialize; run remains deployed code. |
| Same exact key exposed, but deployed handler missing | UNVERIFIED release parity / concrete failure scenario | [keemakr/packages/agent-sdk/src/capabilities.ts:126-194](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/packages/agent-sdk/src/capabilities.ts#L126-L194); [clinicos/app/capabilities/[key]/invoke/route.ts:40-55](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/app/capabilities/[key]/invoke/route.ts#L40-L55). Unknown handler is a supported failure; no current live mismatch was claimed. |
| Exact parent/key scoping | ALIGNED | [keemakr/src/lib/marketplace/capability-schema.ts:1-45](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L1-L45); [clinicos/capabilities/book/capability.ts:29-44](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/capabilities/book/capability.ts#L29-L44). Use verified slash form clinicos/clinic.book, not an invented serialization. |
| Published / installed / enabled / found / ready / permitted / approved / completed | TEACHING OMITTED | [keemakr/src/lib/marketplace/index.ts:1249-1278](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/index.ts#L1249-L1278); [keemakr/src/lib/marketplace/capability-invoke.ts:608-709](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-invoke.ts#L608-L709). Show independent states and recheck live authority on invoke. |
| Required dependency versus clinic business setup | TEACHING OMITTED | [keemakr/src/lib/marketplace/capabilities.ts:84-136](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capabilities.ts#L84-L136); [Find open times exact contract](/Users/sobingt/projects/covalify/clinicos/capabilities/find-times/capability.ts:11–26). Separate missing connection from connected-but-unmapped Schedule/consultant and legitimate no availability. |
| Capabilities get only their listed direct requirements | TEACHING OMITTED / needs closure nuance | [keemakr/src/lib/marketplace/capability-schema.ts:536-565](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L536-L565); [keemakr/src/lib/marketplace/capability-schema.ts:536-565](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L536-L565). Agent/team targets add declared agent/tool requirements. It is a metadata union, not arbitrary call-graph analysis. |
| No timer for the same staff chat capability card | DOCS DRIFT | [core-docs/content/docs/core-platform/kee.mdx:6-53](https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/core-platform/kee.mdx#L6-L53); [keemakr/src/lib/operator/card-deadline.ts:1-34](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/card-deadline.ts#L1-L34). Current capability ask explicitly uses cardDeadline: default one day, maximum seven days, potentially shortened. |
| This deadline is borrowed from ask_user or another interaction | Not adopted | [keemakr/src/workflows/capability-steps.ts:128-156](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/workflows/capability-steps.ts#L128-L156); [keemakr/src/lib/operator/card-deadline.ts:1-34](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/card-deadline.ts#L1-L34). Checked kind:capability path and ordinary held-call expiry; scope remains bounded. |
| Nothing between Kee and capability | TEACHING OMITTED / conversational shorthand | [core-docs/content/docs/core-platform/kee.mdx:6-53](https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/core-platform/kee.mdx#L6-L53); [keemakr/src/lib/marketplace/capability-invoke.ts:608-709](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-invoke.ts#L608-L709). No additional conversational router does not erase validation, workflow, grant, broker or RPC layers. |
| Connector read/write defaults govern all business capability approvals | Not adopted; separate policy layers | [keemakr/src/lib/hitl/policy.ts:249-280](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/hitl/policy.ts#L249-L280); [keemakr/src/lib/hitl/policy.ts:334-408](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/hitl/policy.ts#L334-L408). Capability approval binding and configured/named approver rules are distinct. |
| Tool/skill/action synonyms mean Eve defineTool equals installed capability | TEACHING OMITTED / vocabulary ambiguity | [Docs terminology: tool/skill/action shorthand](https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/reference/glossary.mdx#L50-L64); [keemakr/agent/agent.ts:4-31](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/agent.ts#L4-L31). Use exact separate labels and the two-catalogue bridge after containment. |
| Sales checkout conversion is routed and persisted | IMPLEMENTATION GAP | [Sales event declaration without handler binding](/Users/sobingt/projects/sales/kee.project.ts:96–109); [Conversion responder does not write](/Users/sobingt/projects/sales/handlers/events/checkout-paid.ts:36–43). Event declared, handler unbound, responder stub has no conversion write. |
| Sales campaign approval is enforced in actual tenant | UNVERIFIED configuration | [Campaign enrollment precedes local touch write](/Users/sobingt/projects/sales/capabilities/campaign-place/implementation.ts:15–61); [keemakr/src/lib/hitl/policy.ts:334-408](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/hitl/policy.ts#L334-L408). Description expects Gate1; verify live approval_required binding and approver. No automatic-write assumption. |
| ClinicOS local helper accepts only TypeScript; generator forwards a subset | Verify extension parity, not automatic defect | [clinicos/tooling/contract.ts:79-96](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/tooling/contract.ts#L79-L96); [clinicos/tooling/sync-entry.mjs:66-77](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/tooling/sync-entry.mjs#L66-L77). When adding supported fields, check generated output. Deliberate narrower local surface alone proves no bug. |
| All installs/latest production rollout and immutable serving version | UNVERIFIED operational breadth | [keemakr/src/lib/marketplace/index.ts:1466-1545](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/index.ts#L1466-L1545); [core-docs/content/docs/ship/publish-and-install.mdx:60-74](https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/ship/publish-and-install.mdx#L60-L74). Current metadata joins and consent behavior do not certify deployment topology/live parity. |
| 32/34 Table-column discrepancy or broad eval/chronology claims | UNVERIFIED / omitted from strong verdicts | [core-docs/content/docs/fundamentals/core-and-packs.mdx:8-34](https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/fundamentals/core-and-packs.mdx#L8-L34); [core-docs/content/docs/ship/publish-and-install.mdx:60-74](https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/ship/publish-and-install.mdx#L60-L74). Do not turn provisional docs-map questions into verified global limits or runtime defects. |

## Verification and artifact boundaries

The new scenes keep existing scene IDs, deterministic capture API and hash aliases. Source-level checks validate captions, summary lengths, internal anchors, unique static/no-script/print IDs and SVG node/edge references. The parent performs real-browser scenario/selection and media verification. No docs or product repository files were changed. Proposed repairs, experiments, role ownership and acceptance gates remain proposed. No live latency distribution, HIPAA verdict or universal exactly-once guarantee follows from these sources.

## Full research notes and provenance

The first two following notebooks own the checked code facts. The third is the supporting documentation inventory and provisional claim map. Where its tentative serialization, policy or scope questions differ from later checked facts, the owning-code audit takes precedence. Provisional questions are retained as research provenance, not promoted into findings.

## Owning Core chain and checked documentation claims

# Pack parent and capability children: code and docs audit

## What relationship was missing from the guide?

### Takeaway
A **business module (Pack)** is the parent product bundle, with its own identity, release and runtime. It contains many **named business actions (capabilities)**. Agents, Tables, screens, events/handlers and schedules are other parts of that same parent. One action is not one agent. Most deterministic actions need no Pack agent, although Kee—the shared staff-facing agent—may discover and call them. Code is authoritative; docs at SHA 678902df0accca44133c4b5a3a855839fbe50d67 are claims checked against Core v2 SHA b5f3402e71a983cecb12061511eb88714cdd1ba4 and local ClinicOS SHA eb6043f2669d671ca701581478c2d6872ded4d0a. Source-only inspection does not prove deployment state.

### Cited Findings
- Core accepts action contracts under manifest.capabilities[] and stamps exact ID `<pack slug>/<contract key>`. The same short key in two Packs is two separate actions. Implementation is a separate field, not what defines the action's identity. [1]
- Current implementation union is agent, team, typescript, work, plus reserved core. Uploaded Packs cannot declare kind core. Team lead is the answering runtime; members are internal topology. Typescript uses the Pack-level runtime; work bridges to a declared long-run ability. The stale comment “THREE IMPLEMENTATION KINDS” is not the union's truth. [2] [3] [4]
- Actual ClinicOS project imports implementations and agents separately, then places them in sibling project fields. Its implementations list contains find-times, book, move, cancel, no-show and many other actions; these do not each require their own Eve agent. [5] [6] [7]
- ClinicOS capability authoring uses defineCapability (typed contract data) and bindCapability (contract + target + run function). In this Pack's local helper, target is TypeScript; the broader Core runtime supports more kinds. Do not present this Pack helper's narrow type as the platform's complete union. [8]
- The same ClinicOS implementations list supplies BOTH generated manifest entries and route handler dispatch. That is the real bridge between “description registered” and “code answering,” not a folder name. [9] [10]
- Root Kee separately compiles authored model tools such as capability-search and capability-invoke. The verifier checks 24 static tools, dynamic modules and zero subagents, while defaultTools/root delegation are disabled. Adding another Pack action does not create another root model tool file. [11] [12]

### Inferences
**Required first visual: parent with sibling shelves, then open one shelf**
- Keemakr Core: shared staff agent Kee + identity, business records, approvals, broker services.
- Installed business module ClinicOS (Pack): capabilities shelf (find times/book/move/cancel), agents shelf (Concierge/Intake...), Tables shelf, events, schedules and screens.
- Open capability clinic.book: contract (input/output/rules) → binding/target → implementation function → Core broker operations → result.
- Open capability clinic.find_times next to it: different contract, same Pack, same deployed runtime, different permission/dependency set.
- Show that both may share a booking helper and Medplum integration. Shared helper ≠ additional public capability. Concierge can also use shared domain helper code in its inbound path; it is not equivalent to the staff contract or approval flow.

**Terminology comparison for a side-by-side diagram**
| Thing | Meaning | Who discovers/calls it | What it is not |
|---|---|---|---|
| Pack | Parent released business module | Owner installs it into company | One model, one function, one permission |
| Capability | Named business outcome contract | Kee searches exact company contracts; screens/Core may invoke | Every exported helper |
| Eve model tool | Function schema offered to one agent's model | Model chooses tool request; runtime executes | Marketplace capability enablement |
| Integration operation | Credential-backed provider primitive | Governed broker executes named operation | Whole business workflow |
| Work ability | Runtime's named operation/flexible/fixed long-work interface | Core Work bridge starts/follows it | A capability unless wrapped by contract |
| Workflow/step | Durable orchestration and side-effect execution boundary | Tool/channel imports/calls it | Automatically discoverable business action |
| Agent | Model + instructions + offered tools, managed by runtime | Staff root Kee or Pack-specific inbound/target loop | A capability namespace |

### Gaps
- A file under capabilities/ can be an unregistered helper or incomplete contract; neither a folder nor export makes it discoverable. To prove exposure, trace list inclusion, generated entry, published contract row, install binding and serving handler.
- “A TypeScript implementation has no model” is too strong: a TypeScript handler can call a model through the broker. The implementation kind describes dispatch, not whether its body ever uses AI. Core-docs explicitly explains this nuance. [13]

## What is the complete declaration-to-result chain?

### Takeaway
There are three different snapshots to keep separate: authored Pack files, Core's published version, and the code actually deployed at runtime. Tenant availability and permission add another layer. A merge, a registered contract, a ready dependency, an approval and a confirmed business effect are different events.

### Cited Findings
1. **Authored project → generated entry.** ClinicOS's generator imports kee.project.ts and maps contract + target to manifest.capabilities with implementation:target; requirements become entry.dependencies with exact descriptor IDs. Core reads entry metadata, not arbitrary TypeScript helpers from the repository. [14] [15]
2. **Upload validation.** Action declarations validate keys, descriptions, schemas, dependency references, implementation target and presentation. For TypeScript, uploaded bundle must include the named entry path; this validates file presence, not proof the live deployment serves the matching route. [16] [17]
3. **Published version.** Core records immutable versioned contract snapshots and computed dependency closure, carries old unchanged embeddings, then updates latest_version. Additional access is checked in the same transaction and can hold existing installs pending_approval. [18]
4. **Installation binding.** Active installation creates company capability_bindings enabled=true at declared approval/default allow; existing enabled and approval choices survive resync. Removing a contract removes its binding. Pending installs do not receive new live action bindings before consent/setup. [19]
5. **Version/consent.** Current queries join latest published version, not a per-company pinned contract. The consent comparison includes scopes, Pack-screen Tables, policies, owner columns, writers and Odoo access; model/files scopes and narrower already-covered scopes have explicit exceptions. “Every change pauses every company” is therefore wrong; actual broadened approved access controls it. [20] [21]
6. **Availability switch.** Owner/admin on management surface may enable/disable/change policy through PATCH. Company binding availability grants nobody authority by itself. Named approver declarations remain enforced even if a stored binding says allow. [22] [23]
7. **Readiness.** A required dependency must resolve for company/current member and install must be installed. Optional missing dependencies do not block ready. A personal account's identity matters independently of company-wide enablement. [24]
8. **Discovery.** Kee's model calls capability-search with need/department. Default semantic and lexical SQL filter enabled bindings and exclude linked-workspace-only actions; hydrated registry excludes disabled marketplace entry. Rank selection is not permission: output can include ready=false and missing dependencies plus access/approver guidance. [25] [26] [27]
9. **Live execution gates.** Exact ID resolves company contract; enabled, installed, Pack access, role, current policy and closure dependencies are checked again. Discovery advice is not a durable authorization decision. [28]
10. **Approval and grant.** Required approval holds exact operation/input; actual execution mints runtime-audienced grant with scoped dependencies, member identity, operation ID, verified approver and current Pack roles. Preview gets reduced read-only scopes and cannot claim an approver. [29]
11. **Target dispatch.** Core POSTs /capabilities/<key>/invoke at chosen runtime with envelope. SDK verifies signed grant and tenant, looks up exact handler, returns unknown_capability for absent handler and typed output/failure envelope. ClinicOS builds handler map from the same implementations array used in manifest generation. [30] [31]
12. **Core callbacks to real systems.** Handler can call Core broker for Tables, Brain, connections or model; Core validates grant scopes and keeps provider credentials server-side. Connector operation is a lower-level primitive with its own argument schema/read-write class, not the Pack's contract. [32] [33]
13. **Business result.** Core checks returned output schema, saves succeeded outcome only while durable row is running, records duration/bytes and content-free audit. A late response cannot overwrite a reclaimed uncertain outcome. This confirms implementation-reported result; external effect correctness still depends on domain/provider verification. [34]
14. **Long-work branch.** kind work starts/follows a Work ability, with persisted progress/result reports routed to Eve owner and hook resume. It does not hold a synchronous capability request open indefinitely; callback identity and service ownership matter. [35] [36] [37]

### Inferences
**Concrete two-action mini example (real keys, reduced for teaching):**
```
ClinicOS Pack (slug clinicos)
 ├─ clinic.find_times → clinicos/clinic.find_times
 │   contract for returning suitable open slots; own requirements/schema
 └─ clinic.book → clinicos/clinic.book
     contract for booking one selected slot; approval_required; own schema
Both → same implementations list → same generated entry version → same Pack runtime
A helper findOpenSlots() shared by both remains a helper unless separately declared/exposed.
```
The staff booking contract expects exact starts_at/ends_at/practitioner_ref etc from find_times. This is a data dependency between business actions, not evidence that book automatically invokes find_times itself. User request may require Kee to call discovery/read first, then choose and request booking. [38]

**Dependency closure mini example (illustrative, algorithm-grounded):**
Action A directly declares table:leads. It targets agent qualifier; qualifier declares brain and tool enrich; enrich declares app:apollo. Closure = table:leads ∪ brain ∪ app:apollo. Another action B implemented by plain TypeScript only inherits its own listed requirements. If its helper calls an undeclared provider, Core does not inspect the call graph and silently expand access; broker can refuse scope_missing. The correct fix is declaration/consent, not asking the clinic member to somehow widen a one-off grant. [39] [40]

**Required state labels:** Published; installed/consented; enabled; found for this query; ready for member; permitted to request; approved if needed; executed; outcome confirmed/uncertain. Show all separately. Approval is an additional path, not the meaning of “write.”

### Gaps
- A runtime redeploy under same origin can differ from Core contract version; source does not prove immutable runtime code routing per contract revision. Deploy/metadata compatibility windows are real and require backward-compatible release sequencing.
- No live install/version/handler was exercised. No claim that contracts are discoverable for an actual customer follows from source presence.

## Which docs claims match, drift, or need more explanation?

### Takeaway
Core-docs is valuable for teaching intent and vocabulary. It is not a source of truth for runtime state or timeless limits. The most consequential drift found concerns approval deadlines, while several broad simplifications omit key relationship edges.

### Cited Findings
| ID/category | Docs claim | Owning code result | Guide treatment |
|---|---|---|---|
| MATCH-01 | Pack has agents/capabilities/Tables/events/jobs/screens/requirements | ClinicOS project has sibling declarations, capabilities imported from separate list | Parent-with-sibling-shelves visual |
| MATCH-02 | kee.project.ts generates entry.json | Current ClinicOS generator maps project/contract/target into entry | Show both authored and generated levels |
| MATCH-03 | Exact contract key scoped by Pack | Core capabilityIdFor namespace behavior documented in owning module | Show clinicos/clinic.book |
| MATCH-04 | Agent/team/TypeScript/work implementation choice | Current union validates these; Core-only kind reserved | Keep contract stable while opening interchangeable implementation drawer |
| DRIFT-01 | Chat approval has no timer | Core cardDeadline defaults 1 day, hard cap 7 days, shortens for named/action time | Explain expiry; do not promise indefinite wait |
| MISSING-01 | Kee→capability “nothing between” | No separate reasoning router, but Core workflow/gates/grant/broker/target/callback layers exist | Distinguish logical conversation simplicity from execution topology |
| MISSING-02 | requirements gives those things and nothing else | Agent/team closure also includes registered agent/tool requirements | Show actual computed closure edges |
| MISSING-03 | Fill fields and Core does rest | Handler/runtime still must exist, deploy, match schema and dependencies; manifest alone does not implement outcome | Include handler parity and deployment window |
| MISSING-04 | A connector read list auto/ write asks first | Connector policy default depends on read/write; capability binding defaults differ; configured strictest policies/named approvers matter | Separate data-access class from action governance |
| RUNTIME-GAP-01 | Everything comes from one authored file | ClinicOS generator passes a concrete subset of contract fields; current local helper is TypeScript-only | Check generator output for any new generic Core field instead of assuming it is forwarded |
| UNVERIFIED-01 | One production environment/no slow rollout and all installs updated | Code uses current latest metadata and consent holds, but actual tier/deployment rollout is external | Mark operational statement unverified |

Docs pointers for table: [41] [42] [43] [44] [45] [46] [47].
Code pointers: earlier chain sources plus deadline [48], actual per-card wiring [49], closure [50], connector default [51], capability policy [52], generator [53].

### Inferences
READ versus WRITE must be its own visual axis. Connector operation access omitted defaults write. That class controls scope/consent and the attended connection-policy default. A business capability separately declares approval allow or approval_required, role requirements and exact approvers, then configured policies can tighten it. A read can still require approval by policy; a write capability is not automatically held merely because its name sounds destructive. Named approvers force holding regardless of stale allow binding. Conditional policy now has a deterministic closed grammar evaluator with server-assembled facts; older route comments saying evaluator not built are stale. [54] [55] [56]

Suggested interactive teaching order: (1) open Pack to see children; (2) choose one capability and inspect its contract; (3) switch implementation without changing contract identity; (4) expand dependency closure; (5) follow generated entry into published/installed state; (6) toggle availability/setup/member/approval independently; (7) animate actual call and callback/result; (8) compare code versus docs evidence. Each screen should answer one question before showing senior detail.

### Gaps
- No docs/product source changed. No deployment, approval, provider call or synthetic integration test was run in this audit.
- Other docs pages may contain further drift. Categories above are limited to claims actually checked; absence here is not validation.

### Pinned source index
1. [keemakr/src/lib/marketplace/capability-schema.ts:1-45](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L1-L45)
2. [keemakr/src/lib/marketplace/capability-schema.ts:84-97](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L84-L97)
3. [keemakr/src/lib/marketplace/capability-schema.ts:419-461](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L419-L461)
4. [keemakr/src/lib/marketplace/capability-schema.ts:500-533](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L500-L533)
5. [clinicos/kee.project.ts:1-13](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/kee.project.ts#L1-L13)
6. [clinicos/kee.project.ts:55-78](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/kee.project.ts#L55-L78)
7. [clinicos/capabilities/implementations.ts:1-40](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/capabilities/implementations.ts#L1-L40)
8. [clinicos/tooling/contract.ts:79-96](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/tooling/contract.ts#L79-L96)
9. [clinicos/tooling/sync-entry.mjs:60-82](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/tooling/sync-entry.mjs#L60-L82)
10. [clinicos/app/capabilities/[key]/invoke/route.ts:40-55](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/app/capabilities/[key]/invoke/route.ts#L40-L55)
11. [keemakr/agent/agent.ts:4-31](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/agent.ts#L4-L31)
12. [keemakr/scripts/verify-agent-build.mjs:36-119](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/scripts/verify-agent-build.mjs#L36-L119)
13. [core-docs/content/docs/fundamentals/think-in-capabilities.mdx:23-35](https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/fundamentals/think-in-capabilities.mdx#L23-L35)
14. [clinicos/tooling/sync-entry.mjs:10-15](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/tooling/sync-entry.mjs#L10-L15)
15. [clinicos/tooling/sync-entry.mjs:29-82](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/tooling/sync-entry.mjs#L29-L82)
16. [keemakr/src/lib/marketplace/capability-schema.ts:349-470](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L349-L470)
17. [keemakr/src/lib/marketplace/capability-schema.ts:479-497](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L479-L497)
18. [keemakr/src/lib/marketplace/index.ts:250-318](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/index.ts#L250-L318)
19. [keemakr/src/lib/marketplace/index.ts:1249-1278](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/index.ts#L1249-L1278)
20. [keemakr/src/lib/marketplace/index.ts:1466-1545](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/index.ts#L1466-L1545)
21. [keemakr/src/lib/marketplace/capabilities.ts:155-170](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capabilities.ts#L155-L170)
22. [keemakr/src/app/api/capabilities/[slug]/[key]/route.ts:1-99](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/app/api/capabilities/[slug]/[key]/route.ts#L1-L99)
23. [keemakr/src/lib/marketplace/capability-invoke.ts:668-680](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-invoke.ts#L668-L680)
24. [keemakr/src/lib/marketplace/capabilities.ts:84-136](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capabilities.ts#L84-L136)
25. [keemakr/src/lib/marketplace/capability-search.ts:157-245](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-search.ts#L157-L245)
26. [keemakr/src/lib/marketplace/capability-search.ts:302-332](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-search.ts#L302-L332)
27. [keemakr/src/lib/marketplace/capability-matches.ts:226-251](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-matches.ts#L226-L251)
28. [keemakr/src/lib/marketplace/capability-invoke.ts:608-709](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-invoke.ts#L608-L709)
29. [keemakr/src/lib/marketplace/capability-invoke.ts:1920-1998](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-invoke.ts#L1920-L1998)
30. [keemakr/packages/agent-sdk/src/capabilities.ts:126-194](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/packages/agent-sdk/src/capabilities.ts#L126-L194)
31. [clinicos/app/capabilities/[key]/invoke/route.ts:40-55](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/app/capabilities/[key]/invoke/route.ts#L40-L55)
32. [keemakr/src/lib/capability/server.ts:1-55](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/capability/server.ts#L1-L55)
33. [keemakr/packages/operator-sdk/src/index.ts:282-312](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/packages/operator-sdk/src/index.ts#L282-L312)
34. [keemakr/src/lib/marketplace/capability-invoke.ts:2383-2454](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-invoke.ts#L2383-L2454)
35. [keemakr/src/workflows/pack-execution.ts:143-204](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/workflows/pack-execution.ts#L143-L204)
36. [keemakr/src/lib/work/pack-report.ts:11-32](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/work/pack-report.ts#L11-L32)
37. [keemakr/vercel.ts:63-96](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/vercel.ts#L63-L96)
38. [clinicos/capabilities/book/capability.ts:29-44](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/capabilities/book/capability.ts#L29-L44)
39. [keemakr/src/lib/marketplace/capability-schema.ts:536-565](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L536-L565)
40. [clinicos/app/capabilities/[key]/invoke/route.ts:23-37](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/app/capabilities/[key]/invoke/route.ts#L23-L37)
41. [core-docs/content/docs/fundamentals/core-and-packs.mdx:8-34](https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/fundamentals/core-and-packs.mdx#L8-L34)
42. [core-docs/content/docs/build-a-pack/capabilities.mdx:44-98](https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/build-a-pack/capabilities.mdx#L44-L98)
43. [core-docs/content/docs/reference/pack-manifest.mdx:8-23](https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/reference/pack-manifest.mdx#L8-L23)
44. [core-docs/content/docs/core-platform/kee.mdx:6-53](https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/core-platform/kee.mdx#L6-L53)
45. [core-docs/content/docs/core-platform/connectors.mdx:60-66](https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/core-platform/connectors.mdx#L60-L66)
46. [core-docs/content/docs/ship/publish-and-install.mdx:6-37](https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/ship/publish-and-install.mdx#L6-L37)
47. [core-docs/content/docs/ship/publish-and-install.mdx:60-74](https://github.com/fsztpartners/core-docs/blob/678902df0accca44133c4b5a3a855839fbe50d67/content/docs/ship/publish-and-install.mdx#L60-L74)
48. [keemakr/src/lib/operator/card-deadline.ts:1-34](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/card-deadline.ts#L1-L34)
49. [keemakr/src/workflows/capability-steps.ts:128-156](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/workflows/capability-steps.ts#L128-L156)
50. [keemakr/src/lib/marketplace/capability-schema.ts:536-565](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L536-L565)
51. [keemakr/src/lib/hitl/policy.ts:249-280](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/hitl/policy.ts#L249-L280)
52. [keemakr/src/lib/hitl/policy.ts:334-408](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/hitl/policy.ts#L334-L408)
53. [clinicos/tooling/sync-entry.mjs:66-77](https://github.com/fsztpartners/clinicos/blob/eb6043f2669d671ca701581478c2d6872ded4d0a/tooling/sync-entry.mjs#L66-L77)
54. [keemakr/packages/operator-sdk/src/index.ts:296-312](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/packages/operator-sdk/src/index.ts#L296-L312)
55. [keemakr/src/lib/hitl/policy.ts:1-24](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/hitl/policy.ts#L1-L24)
56. [keemakr/src/lib/hitl/policy.ts:136-147](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/hitl/policy.ts#L136-L147)


### Scope check: approval deadline drift is the same feature
DRIFT-01 is confirmed for **a Pack capability called from Kee's staff chat**, the exact scope of core-docs/core-platform/kee.mdx:24-37. It is not borrowed from ask_user, session-limit or scheduled-job approval. In Core, capability-invoke.ts callFlow invokes openCapabilityAskStep for its held operation; capability-steps.ts:131-140 calls openAsk with kind:'capability' and expiresAt:cardDeadline(...). For an ordinary non-work capability, capability-invoke.ts:266-276 immediately returns approval_requested WITH expires_at. For a tracked work capability, its waiting path uses the same expiresAt as a workflow sleep deadline and closeExpiredCardStep. The answer admission also rejects an expired card in agent/channels/asks.ts:334-338; lapsed ordinary capability cards are selected by kind:'capability' in held-cards.ts:82-107. Thus the document's universal “no timer” wording is stale for current chat capability approval cards. No claim is made that every other interaction/standalone approval has this deadline.

Additional code links: [capability ask kind/deadline](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/workflows/capability-steps.ts#L130-L156), [ordinary held call returns expiry](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/tools/capability-invoke.ts#L266-L276), [lapsed capability card closure](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/held-cards.ts#L75-L107).

MISSING-04 is deliberately **not a docs contradiction**: connectors.mdx:64 explains connector-operation access defaults in its connector context. The failure would be the guide generalizing that to every business capability. Keep it as a missing distinction: connector read/write classification and connector policy default versus separate capability approval binding/configured policy. The source does not provide a general read/write classification field on capability contracts, so the guide must not invent a single automatic policy from capability names.


## Actual ClinicOS and Sales contract-to-effect examples

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


## Supporting documentation corpus and provisional crosswalk

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


