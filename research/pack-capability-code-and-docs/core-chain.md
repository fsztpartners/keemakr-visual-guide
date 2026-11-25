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
