# Eve inside Keemakr: activation, discovery and execution

## Which files become part of the agent, and what is Eve?

### Takeaway
Eve is the session, agent-loop, workflow and tool framework used to run Kee. The language model generates the next answer or tool request; Eve executes the loop; Keemakr supplies business permissions, records, approvals and the public conversation interface. A file is not a model tool merely because it lives in the repository. This investigation reads current v2 SHA b5f3402e71a983cecb12061511eb88714cdd1ba4, without installing packages, building, running tests, or inspecting a production deployment.

### Cited Findings
- Current package.json pins `eve` 0.80.1. The existing main workspace node_modules has 0.58.1, so it was deliberately NOT used to infer 0.80.1 framework internals. Current source plus authored build verification are the evidence. [1]
- `agent/agent.ts` is the root agent definition: it selects getKeeModel(), reasoning/provider routing, compaction threshold 0.1, session input-token ceiling 100 million, defaultTools:false and tool:false. These last two do not disable authored tools; the build verifier checks those authored tools exist while forbidding framework default tools/root delegation. [2]
- `scripts/verify-agent-build.mjs` examines the actual compiled manifest (shape 54), expects 24 named static tools, at least Knowledge/files/Tables dynamic modules, no subagents, only asks/turn-hops hooks, and no authored sandbox. It checks required implementation markers in compiled JS. This is a declared build gate; it was not executed here. [3]
- `agent/instructions.md` supplies standing behavioral instructions; `agent/instructions/discovery.ts` is a dynamic turn-start resolver. It loads current membership, the business instruction index and installed departments; it emits a user-role context message rather than changing the system prefix, preserving cacheability. Brain and departments load concurrently and independently with Promise.allSettled. [4]
- Once-per-turn helpers share membership/setup reads across resolvers; these are context caches only, not permission caches. Every tool still rechecks live authority. [5]
- Static tools such as capability-search use defineTool and inputSchema. Long-lived orchestration such as capability-invoke uses defineWorkflowTool and a `'use workflow'` body. Its implementation imports `src/workflows/capability-steps.ts`; that module uses `'use step'` and calls normal Core helpers. A file outside agent/ is therefore used through imports and calls, not magically exposed as a tool. [6] [7]
- Dynamic file tools return named tool definitions at turn.started only when private file storage is configured. Their execute implementations live in `agent/lib/file-tools.ts` to avoid build-time closure-lifting problems. Source explicitly says session-start tool loss used to leave files missing for the session. [8]
- Knowledge and Tables dynamic tools currently remain session.started resolvers. Knowledge returns no tool on initial identity/read failure, but rechecks actor on every execution. Tables checks current write policy at execution. This difference deserves explicit testing rather than assuming all dynamic tools refresh each turn. [9] [10]
- Ordinary src/lib helpers activate only when imported/called. src/app/api/**/route.ts defines Next HTTP endpoints; it does not make a function visible to the model. Eve-facing HTTP endpoints instead use defineChannel/POST under agent/channels, such as progress/result callbacks. [11]

### Inferences
Use the following file activation visual: **Authored files → respective loader/compiler → runtime surface**. Do NOT draw one arrow from every file into “AI understands everything.”

| File family | Activation | What the model receives | What actually executes |
|---|---|---|---|
| agent/agent.ts | Eve compile/runtime config | Selected model/context policy | Eve session/loop configuration |
| agent/instructions.md | Eve instructions loading | Standing text | No business side effect |
| agent/instructions/*.ts | Declared lifecycle event | Resolved context messages | Database/Brain context reads |
| agent/tools/*.ts static | Compiled tool registration | Tool name, description, input schema | Tool execute/workflow handler |
| agent/tools/*.ts dynamic | Declared session/turn event | Only returned tool definitions | Resolver, then handler on invocation |
| src/workflows/*.ts | Imported by workflow tool/channel | No automatic exposure | Durable orchestration/steps |
| src/lib/*.ts | Normal TypeScript imports/calls | No automatic exposure | Server helper implementation |
| src/app/api/**/route.ts | Next route discovery | Nothing unless a tool calls it | Authenticated HTTP handler |
| agent/channels/*.ts | Eve channel registration | Nothing automatically | HTTP ingress/callback route |
| entry.json capability declaration | Publish/install marketplace sync | Search result contract summary | Points to chosen implementation |
| packages/agent-sdk | Imported client/handler library | Nothing automatically | Grant verification and broker HTTP calls |

### Gaps
- The generated compiled artifact was not built or read in this isolated checkout. The exact static/dynamic names above come from current authored build verification plus actual definitions.
- A helper comment describes why closures are separated, but this is not evidence every possible production closure-lifter bug is caught. Unit tests alone cannot validate transformed agent output; build verification and production-bundle smoke checks are relevant.

## How does a business action become enabled, discovered and executed?

### Takeaway
There are two separate catalogs: **model tools** (how Kee can search/act) and **business actions** (what an installed business department offers). Installing 100 actions does not inherently produce 100 tools in Kee's model prompt. The root model uses its authored search/invoke tools to discover the right action. Enabling, readiness, member permission and approval are separate gates.

### Cited Findings
1. **Author a contract.** The manifest declaration names an action, human description, input/output schemas, explicit requirements and an implementation. Current validated implementation kinds include agent, team, typescript and work, plus reserved Core handlers. The opening comment saying three kinds is older than the actual switch; do not repeat that stale count. [12]
2. **Compute least-needed dependencies.** Closure is the union of contract requirements, implementing agent requirements, and requirements of tools those agents declare; teams include lead and members. TypeScript/work/Core do not contribute agent edges. This closure is metadata, not arbitrary runtime traversal. [13]
3. **Publish versioned contract rows.** Publishing inserts marketplace_entry_versions and immutable marketplace_capability_contracts with closure, schemas and implementation. Unchanged description embeddings carry forward. Changed descriptions embed outside the transaction, best effort; embedding failure leaves lexical discovery. A release expanding access holds affected installs for consent in the same publish transaction. [14]
4. **Install/consent.** Install sync removes bindings for actions absent from the new version; active installs create bindings enabled=true at declared approval mode or legacy allow default. Existing binding choices survive ON CONFLICT DO NOTHING. Pending approval/connection installs do not gain new bindings until active. [15]
5. **Configure availability.** Owner/admin on marketplace-management surface may PATCH enabled/approval/approvers. The route cannot invent a binding for an uninstalled action. Its comments explicitly say tenant availability grants nobody invocation authority. [16]
6. **Calculate readiness.** Enabled contracts join current published version, enabled marketplace entry and tenant install. Readiness is live installed status plus all required dependencies in this action's closure; personal-account readiness resolves for the acting member. Optional missing dependencies do not make ready false. [17]
7. **Give Kee the department directory.** The turn-start context index lists current company methods and departments, so the model can choose an owning department before searching. Static instructions tell it to read a relevant playbook for work, search a business action, invoke that action, and use Work abilities only when search finds none. [18]
8. **Search by need.** Authenticated capability-search receives only a query, optional owning department and limit. It resolves department slugs, requests at least two candidates for comparison, returns exact IDs, and gives bounded fallback guidance rather than endless searching. [19]
9. **Rank then hydrate.** Semantic query embedding and lexical retrieval supply candidates. Current enabled registry data hydrates them with readiness for this member. Search may hide connected-app actions until connection and suppress direct purchase-order alternatives when a purchasing Pack owns that task. Search is not simply “a vector database returns tool names.” [20] [21]
10. **Explain access and approvers.** matchesForMember enriches candidates with owning department, department permission, eligible grant holders, approvers, missing named approvers and default-calendar advice. Per-Pack lookups share a Promise within a search. Missing advice is omitted rather than fabricated; invocation checks again. These extra dependency/permission reads can be a substantial part of discovery latency. [22]
11. **Invoke under stable operation identity.** capability-invoke calls a durable step using callerRequestId `eve:<native call id>` and authority from the authenticated Eve session. The step handles file handoff, passes approval:'ask', and branches into immediate result, held card or tracked work. [23] [24]
12. **Call the actual target.** Agent implementation selects that agent's runtime; team selects its lead; TypeScript selects entry runtime. This chooses a network endpoint, not automatically another chat session. The SDK example mounts /capabilities/:key/invoke in an Eve channel. It verifies signed grant/audience, finds exact handler, checks tenant mismatch, and returns typed success/business failure. [25] [26] [27]

### Inferences
**Visual A: four lights above one action button**
- Light 1 Published: contract exists in this release.
- Light 2 Available: installed and company enabled it.
- Light 3 Ready: required apps/data dependencies are connected for this member.
- Light 4 Allowed now: member/role/grant/policy/approval checks pass at execution.
Show missing lights as specific reasons, never a single misleading “agent enabled” switch.

**Visual B: two catalogs with one bridge**
Left column “What Kee can call” has capability-search and capability-invoke among authored tools. Right column “What this business installed” has named booking, outreach and scheduling contracts. Search arrow crosses left→right, exact-ID contract returns right→left, invoke crosses back under server checks. A separate narrow arrow from the chosen contract goes to its target handler. No arrow from manifest description straight into unrestricted model execution.

**Visual C: answer “I added this file—how is it used?”**
Pick the file's role first. A new helper needs an import/call. A model tool needs a tool definition and registration/compile inclusion. A marketplace action needs manifest declaration, handler route, published contract, live install/binding and ready dependencies. An event handler needs event declaration/binding and dispatcher, not model tool registration. A screen needs its screen declaration/render entry. A prompt file is instructions, not executable authority.

### Gaps
- Contract registration and handler registration are separate. A published action can exist while its deployed runtime lacks its handler; SDK then returns unknown_capability. Validate manifest→handler parity in a deployed build.
- Existence of a tool file and a passing Next build alone do not prove inclusion in Eve output. The build verifier explicitly notes Next does not compile agent/.
- Search thresholds are stated uncalibrated in prior notes. Correct ownership and description examples need retrieval evaluation against confusing actions; a high semantic similarity is not permission or clinical correctness.

## What runs where, and where can a reply stall?

### Takeaway
The deployed source topology is two Core peer services plus separately installed business runtimes and model providers. Source files imported into Eve tools can execute inside the Eve service even if their folder is src/lib. Workflow ownership matters more than folder name: a callback reaching the wrong service can save data yet fail to wake the waiting workflow.

### Cited Findings
- vercel.ts uses withEve to declare Next web and generated Eve peer services from the same repository. Web binds KEE_WORK_OWNER_URL to Eve; Eve tools dispatch to their local owner and self-binding is explicitly forbidden. Public approval, Pack report, outcome, screen reply and scheduler paths route to Eve. Ordinary catchall routes to web. [28] [29] [30]
- Next config applies withWorkflow to compile native steps for web, while Eve builds separately. Source external dependencies/native binaries require explicit shipping and can work locally while failing in the deployed bundle. [31] [32]
- Core's Eve Client forwards the initiating member credential to the app origin, refuses redirects, and attaches session by ID. Eve channel independently verifies the user and checks private session owner; turnPolicy is steer. A caller-supplied session ID alone confers no access. [33] [34]
- A steering message receipt can wait until the active turn's next step boundary, so a slow tool can delay receipt up to the 60-second deadline; accepting the user's new message is distinct from finishing the old action. [35]
- Core reads/reconnects replay Eve log into WireProjection; followEvents starts at index zero because no stored projection exists. WireProjection explicitly documents O(n²) re-derivation per replay, a known optimization candidate for long sessions. Normal already-following sends can return stream receipts without full acceptance snapshot. [36] [37] [38]
- The root Kee model is `main` from centralized model.ts; current source main route is DeepSeek Flash with medium reasoning. This is a configured route, not “Eve is the LLM.” Pack calls instead send permitted labels to Core's model forwarding API; Core sets actual provider/model/effort and meters usage, so a Pack's model need not be the root Kee model. [39] [40] [41]
- Pack forwarding API requires MODEL_CALL_SCOPE and gives model calls a distinct rate bucket; maxDuration=800 is a stream function ceiling, not normal latency or the capability's total business deadline. [42]
- A tracked work follower establishes one owner hook and completion/progress hooks before starting Pack work; it waits on hooks, not polling. Pack reports authenticate and save before resume. The report helper explicitly says a resume from Next can be recorded but never wake the run because Eve's workflow queue namespace owns it. [43] [44]
- asks hook persists sidebar turn state/questions and closes abandoned approvals. Hooks are at least once; handlers are idempotent and retry a transient state write once. Framework hook exceptions are logged rather than automatically replayed indefinitely. [45] [46]
- Eve instrumentation records native model/tool/run structure. Runtime-context marker kee.model.context-ready marks context readiness, explicitly not provider first output or visible text. Content-capture policy applies before Agent Runs exporter, because a later processor cannot redact what an earlier exporter already sent. [47] [48]

### Inferences
**Diagram D: a typed staff request, animate each arrow**
1 Person/client → Next web: POST conversation turn.
2 Next → database: authenticate/own/rate/context reads.
3 Next → Eve public channel: user bearer + session/message.
4 Eve → Core DB/Brain from imported resolver code: member and company index.
5 Eve → model provider: instructions + context + offered tools.
6 Model → Eve: tool request capability-search.
7 Eve tool → DB + embedding provider + dependency services: rank/hydrate; return candidates.
8 Eve → model: tool result; model selects exact action/input.
9 Eve workflow tool → governed Core helper executing as workflow step: record/gate/grant.
10 Governed helper → Pack runtime: scoped invocation.
11 Pack handler → Core broker → permitted data/app provider; optionally Pack → Core model proxy → another model provider.
12 Pack → waiting caller: typed result OR Pack → Eve callback endpoint: saved progress/result and hook resume for tracked Work.
13 Eve → model: settled tool output; model generates grounded reply.
14 Eve log → Next projection/stream → client paint.
There may be multiple model/tool iterations or no Pack/model call for a deterministic helper. Number these as instructional sequence steps, never a guaranteed count of HTTP hops.

**Diagram E: a paused approval is a bookmark, not a burning loop**
Tool workflow creates operation → approval card is persisted → workflow waits on hook → user can continue conversation → authorized reviewer answer routes to Eve owner → same workflow resumes → gates rechecked → external action executes → outcome posted to requester conversation. Fade the model lane while waiting; keep the persisted record and hook visibly present.

**Precise latency/failure overlays**
- Before model: membership/setup/Brain/departments and dynamic tool resolution; graph their parallel portions instead of adding every duration as serial.
- Before discovery result: embedding, DB retrieval, readiness, current members/roles, approver rules and possibly remote ability discovery; optimizing only vector lookup misses this work.
- Between model steps: search→invoke is at least conceptually sequential because invocation needs discovered identity/schema; do not parallelize dependent calls or remove permission checks.
- During effect: provider latency, throttling and remote runtime startup; timeout can leave effect uncertain. Use stable receipts and reconcile.
- During resumed work: callback delivered to web instead of Eve owner can make “saved but forever waiting.” Verify service routing and hook identity before blaming the LLM.
- During long chat reconnect: zero-index replay and O(n²) projection may dominate before any new model response. Benchmark synthetic transcript sizes, reconnect rate and client paint, then consider incremental projection/checkpointing while preserving exact event sequences.
- During live steering: receipt waits for next step boundary; a long tool call can delay cancellation/redirection feedback. Inspect framework supported interruption semantics and distinguish requested cancel from confirmed cancellation; never promise remote side effects were undone.

**Priority remediation for the guide**
1 Prove authorization and effect identity for one appointment/send workflow end to end, including revoked access, wrong tenant, duplicate callback and ambiguous timeout.
2 Add a synthetic diagnostic “trace this request” story with session, turn, native tool-call and operation/work IDs linked and content excluded.
3 Verify compiled tool set and deployment-handler parity; show specific failure badges for absent tool, disabled action, unready dependency, forbidden member, missing handler and callback-owner mismatch.
4 Measure cold/warm startup, discovery hydration, model steps, Pack execution and replay separately; current telemetry names are not proof of exported metrics (prior notes explain NoopMeter).
5 Optimize measured bottleneck with bounded independent reads, stable prompt prefixes, sensible batch sizes, fewer repeated searches, checkpointed long work and replay improvements. Re-run correctness gates before calling it an improvement.

### Gaps
- Actual deployed service URLs, regions, tool manifest, environment flags, model overrides and active install versions remain unverified.
- Older ADRs about fleet pins at Eve 0.27.8/0.40 describe historical remote-agent migration and must not substitute for current 0.80.1 source topology.
- Framework semantics not proved by current source/build checks (exact default loader behavior, internal queues, compiler captures and retry scheduling) need the pinned framework's own docs/artifact or controlled build inspection. The main workspace's installed 0.58.1 is the wrong reference.

### Source index
1. [package.json:42-88](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/package.json#L42-L88)
2. [agent/agent.ts:1-31](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/agent.ts#L1-L31)
3. [scripts/verify-agent-build.mjs:1-135](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/scripts/verify-agent-build.mjs#L1-L135)
4. [agent/instructions/discovery.ts:1-105](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/instructions/discovery.ts#L1-L105)
5. [agent/lib/turn-member.ts:1-65](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/lib/turn-member.ts#L1-L65)
6. [agent/tools/capability-invoke.ts:1-32](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/tools/capability-invoke.ts#L1-L32)
7. [src/workflows/capability-steps.ts:1-61](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/workflows/capability-steps.ts#L1-L61)
8. [agent/tools/my-files.ts:10-102](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/tools/my-files.ts#L10-L102)
9. [agent/tools/knowledge-search.ts:41-85](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/tools/knowledge-search.ts#L41-L85)
10. [agent/tools/tables.ts:367-395](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/tools/tables.ts#L367-L395)
11. [agent/channels/pack-report.ts:1-10](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/channels/pack-report.ts#L1-L10)
12. [src/lib/marketplace/capability-schema.ts:349-470](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L349-L470)
13. [src/lib/marketplace/capability-schema.ts:500-565](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L500-L565)
14. [src/lib/marketplace/index.ts:250-318](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/index.ts#L250-L318)
15. [src/lib/marketplace/index.ts:1249-1278](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/index.ts#L1249-L1278)
16. [src/app/api/capabilities/[slug]/[key]/route.ts:1-99](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/app/api/capabilities/[slug]/[key]/route.ts#L1-L99)
17. [src/lib/marketplace/capabilities.ts:84-174](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capabilities.ts#L84-L174)
18. [agent/instructions.md:1-15](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/instructions.md#L1-L15)
19. [agent/tools/capability-search.ts:23-81](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/tools/capability-search.ts#L23-L81)
20. [src/lib/marketplace/capability-search.ts:157-245](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-search.ts#L157-L245)
21. [src/lib/marketplace/capability-search.ts:302-332](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-search.ts#L302-L332)
22. [src/lib/marketplace/capability-matches.ts:62-175](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-matches.ts#L62-L175)
23. [agent/tools/capability-invoke.ts:209-240](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/tools/capability-invoke.ts#L209-L240)
24. [src/workflows/capability-steps.ts:4-61](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/workflows/capability-steps.ts#L4-L61)
25. [src/lib/marketplace/capability-schema.ts:519-533](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-schema.ts#L519-L533)
26. [packages/agent-sdk/src/capabilities.ts:1-26](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/packages/agent-sdk/src/capabilities.ts#L1-L26)
27. [packages/agent-sdk/src/capabilities.ts:126-194](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/packages/agent-sdk/src/capabilities.ts#L126-L194)
28. [vercel.ts:1-12](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/vercel.ts#L1-L12)
29. [vercel.ts:63-110](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/vercel.ts#L63-L110)
30. [vercel.ts:200-223](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/vercel.ts#L200-L223)
31. [next.config.ts:15-41](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/next.config.ts#L15-L41)
32. [next.config.ts:129-145](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/next.config.ts#L129-L145)
33. [src/lib/operator/eve-conversation.ts:68-88](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/eve-conversation.ts#L68-L88)
34. [agent/channels/eve.ts:12-55](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/channels/eve.ts#L12-L55)
35. [src/lib/operator/eve-conversation.ts:52-57](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/eve-conversation.ts#L52-L57)
36. [src/lib/operator/eve-conversation.ts:113-169](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/eve-conversation.ts#L113-L169)
37. [src/lib/operator/eve-conversation.ts:171-201](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/eve-conversation.ts#L171-L201)
38. [src/lib/operator/eve-projection.ts:86-94](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/eve-projection.ts#L86-L94)
39. [src/lib/model.ts:75-110](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/model.ts#L75-L110)
40. [src/lib/model.ts:355-395](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/model.ts#L355-L395)
41. [src/lib/model-forward.ts:1-21](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/model-forward.ts#L1-L21)
42. [src/app/api/capability/model/v1/chat/completions/route.ts:1-20](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/app/api/capability/model/v1/chat/completions/route.ts#L1-L20)
43. [src/workflows/pack-execution.ts:143-204](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/workflows/pack-execution.ts#L143-L204)
44. [src/lib/work/pack-report.ts:11-32](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/work/pack-report.ts#L11-L32)
45. [agent/hooks/asks.ts:1-21](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/hooks/asks.ts#L1-L21)
46. [agent/hooks/asks.ts:28-103](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/hooks/asks.ts#L28-L103)
47. [agent/instrumentation/keemakr.ts:5-21](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/instrumentation/keemakr.ts#L5-L21)
48. [agent/instrumentation/otel.ts:5-19](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/instrumentation/otel.ts#L5-L19)


### Search semantics correction and diagram constraints
Default capability search filters `b.enabled` in both semantic and lexical SQL and excludes `linked_workspaces:true` declarations from this workspace's member search. The hydration query joins enabled marketplace entries and the current version. It does NOT filter the result list down to ready=true or already-approved actions: matchFacts explicitly returns `ready` and `missing` fields, and gatesFor adds permission/approver advice. A candidate with ready=false can therefore be found and explained; discovery is not a promise it can run. Ordinary policy-disabled or permission-unavailable candidate advice is not equivalent to absent published contract. Sources: capability-search.ts:182-243,302-325; capabilities.ts:155-170; capability-matches.ts:125-175,226-251.

Use this state model, with independent labels rather than a single green light:
- **Published**: immutable contract in current entry version. Does not mean installed anywhere.
- **Installed/consented**: organization's installation accepted current declared access; a widened release can move the install back to held consent.
- **Enabled**: tenant binding availability. Owner/admin can toggle; disabling ordinarily removes it from default discovery.
- **Discoverable for this query**: enabled/current/hydratable and selected by ranking/department/visibility filters; wording/embedding availability/limits can affect whether a query finds it.
- **Ready for this member**: installation live and every required declared dependency satisfied, including personal-account resolution. A discoverable result can say ready=false.
- **Permitted to request**: live membership, department/role/action gates pass; discovery may instead say unavailable or request_required.
- **Approved to execute**: if required, an authorized reviewer has accepted the exact held action; prepared/draft/requested approval are earlier states.
- **Completed**: confirmed business result, not a dispatch or acceptance receipt.

The enable route has two distinct controls: assertMarketplaceManagement is a product-surface gate based on client information (header omission is not a security boundary); assertManagementRole enforces owner/admin from verified session authority. Do not depict a client header as the source of permission. The route applies both. Source: src/lib/marketplace/management-guard.ts:1-42 and src/app/api/capabilities/[slug]/[key]/route.ts:47-71.

**Dynamic tool freshness risk, carefully scoped:** Knowledge and Tables currently resolve at session.started, while files resolves at turn.started. Source comments on files document an earlier lost session-start dispatch failure mode. This suggests a concrete regression test: create session while a dynamic resolver cannot read identity/dependency; restore it; start a later turn; check whether the tool appears without a new session. It is a test hypothesis for the remaining modules, not a reproduced current bug. Execute-time authorization rechecks remain necessary even when visibility is stale.

Diagram variant: show a discovery result card with three badges **Found**, **Missing calendar**, **Approval required**. The enabled binding can be on while ready=false and approved=false. Then connecting calendar changes Ready; submitting invokes the approval flow; reviewer acceptance changes Approved; only confirmed result changes Completed. Show Disabled as a branch that removes the default result, and an admin's onlyEnabled:false view as a separate route.
