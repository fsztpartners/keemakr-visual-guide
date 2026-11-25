# Visual rebuild storyboard

The user rejected the first edition's long prose and card lists. Rebuild the interaction model, not the styling around those lists. This is a scene direction document; source claims must be reconciled with the new runtime/discovery research before publication.

## Teaching contract

One scene on screen. One animated mechanism. One sentence describing the current step. Back, Next, Replay always visible. No autoplay by default. No paragraph wall above the stage. Keep the default caption under about 24 words and the scene's plain summary under about 45 words. Reveal exact source names, evidence and engineering reasoning on demand below or in an accessible drawer. Mobile gets the same staged story with pannable drawings and readable labels. Reduced motion shows the same state transitions without traveling animation.

The old first edition put 24 chapters into one long scrolling document with repeated body paragraphs, engineering details and evidence footers. Its sidebar was useful navigation, but it did not create visual explanations. Do not repeat that composition. Barney's `reports/Agent builder explainer.html` is the positive reference: per-chapter SVG scene and scripted step states at lines 399 onward; rendering controls at 1192–1215; animation API at 1265–1284; calm pace, manual steps, source drawers and reduced-motion support.

Default visual vocabulary: moving dot = message/result; labeled ticket = authority; solid line = executed source path; dashed line = declaration/import relationship; gap in line = missing binding; locked gate = explicit permission check; amber question mark = unknown outcome; dotted outline = proposed change. Each mark needs words as well as color. No decorative mascots or stock AI pictures.

## 16 scenes

### 01 — One business request, many kinds of work
**Visible sentence:** “A person asks. Keemakr finds permitted work and reports what happened.”
**Stage:** A clinic desk and sales desk share a central operator. Drag a synthetic request pill onto the center: “Book a consultation” or “Find qualified practices.” The packet branches toward conversation, named action or tracked task according to the selected source-grounded example.
**Steps:** request arrives → business context appears → chosen work lane lights → result returns. Before revealing technical names, show actual business outcome.
**Evidence:** platform.md first section, packs.md three-lane inference and concrete journey source pointers. This is a teaching synthesis, not one fixed topology for every request.

### 02 — What is inside this business setup?
**Visible sentence:** “The setup contains instructions, actions, screens, data shapes and wiring.”
**Stage:** Exploded file assembly diagram. Center `kee.project.ts`; surrounding real files slide into their roles: agent instructions, capability binding, schema, screen registry, jobs, event handlers. Clicking a file shows an exact path and one small excerpt. Clinic/Sales switch changes actual anatomy.
**Mechanism:** declaration card attaches via dotted import edges to registry cards; executable handlers have solid output sockets. Clearly distinguish a file existing on disk from being reachable.
**Evidence:** ClinicOS `kee.project.ts`, `agents/index.ts`, `handlers/events/index.ts`, `jobs/index.ts`, `ui/screen-registry.ts`; Sales `kee.project.ts`.

### 03 — A file does nothing until something reaches it
**Visible sentence:** “An import, registry entry or route must connect a file to running work.”
**Stage:** Left file tree; center build/import graph; right request execution. A packet can follow only connected edges. User selects a known registered handler, then Sales `checkout-paid.ts`; first lights a real path, second stops at a broken manifest binding.
**Mechanism:** trace import → exported registry → generated/registered route → request dispatch → function. Labels say “imported at build,” “looked up at runtime,” “called now.” Non-Eve files visibly participate as ordinary TypeScript functions through those edges.
**Evidence:** packs.md handler registry and Sales manifest missing `eventHandlers`, checkout-paid stub. New deep source researcher must verify exact generated route/import chain. Never imply Eve scans every arbitrary `.ts` file.

### 04 — Two menus, two kinds of discovery
**Visible sentence:** “Eve sees agent tools. Keemakr also searches installed business actions.”
**Stage:** Two side-by-side registries with different shapes, no overlapping title. LEFT `Eve agent tools` feeds model-visible tool names. RIGHT `Installed business capability bindings` feeds Core search/resolve/governed invoke. Highlight wrapper/search tool on left, installed business result on right, then authorized invocation back through Core.
**Mechanism:** a magnifying pulse scans registry rows on right; a returned action key becomes an argument to a tool on left. Explicitly animate: discover is not execute, and find is not authorize. Show enabled/ready/allowed as independent gates.
**Evidence:** Core `agent/agent.ts`; `agent/tools/capability-search.ts`; `src/lib/marketplace/capability-search.ts`; `capability-invoke.ts`. Exact Eve loader/enable behavior MUST use current deep researcher notes, not analogy. Do not call registry row count the number of model tools.

### 05 — How Eve tools become available
**Visible sentence:** “An agent gets the tools its configuration and runtime make available.”
**Stage:** Agent configuration on left; module discovery/loader in center; model tool tray on right. Enable/config toggle removes or admits one tool; absent export becomes an unplugged socket. Tool schemas become the model-visible menu; implementation stays server-side.
**Mechanism:** actual enable hook, discovery naming convention or loader entry must be drawn from verified source; show what runs at startup, session or turn only when evidenced. If the exact underlying Eve internals are unavailable, display the inspected boundary and label inner loader unknown rather than inventing auto-discovery.
**Evidence:** new Eve deep-research findings; Clinic Concierge `defaultTools:false` and declared tools from packs.md. Contrast with Sales inbound `tools: []` and instructions forbidding actions. Avoid universal inference from one agent config.

### 06 — The chat session opens
**Visible sentence:** “Core creates or attaches to an Eve session before sending the message.”
**Stage:** Four vertical lanes: browser, Core, Eve session, model. New-session packet creates session, Core association is stamped, message sent, receipt returns, events flow to browser. Switch to existing session; creation disappears and sequence cursor appears.
**Mechanism:** numbered handshake with pause after each line; accepted receipt uses a small hollow check, completed task a separate solid check later. Closing browser does not visually erase backend work without source evidence.
**Evidence:** `src/lib/operator/eve-conversation.ts:240–301`, `agent/agent.ts:4–28`, platform.md. Current chat replays Eve log; do not animate historical Core conversation-turn storage as current truth.

### 07 — Callbacks are the return road
**Visible sentence:** “The runtime calls Core back for authorized business services.”
**Stage:** Core → runtime action arrow, then a separate curved runtime → Core callback for Tables/connection access, then provider and return. Authority ticket stays attached to the request; secret stays behind the provider boundary.
**Mechanism:** click callback arrow to expand request/response schema and grant scope. Show runtime is not a free-standing database copy; use exact callback services verified by source. Add a revoked ticket scenario with closed Core gate.
**Evidence:** ClinicOS `/capabilities/[key]/invoke` route and SDK guard; platform capability/server.ts; packs.md staff action lane. New research should distinguish business-service callbacks from Eve session event callbacks so they never share one unlabeled arrow.

### 08 — Clinic conversation: help the patient safely
**Visible sentence:** “The Concierge reads, asks and uses only the patient actions it is allowed.”
**Stage:** Patient speech bubble → Concierge → identity/read gate → availability slots. Select public availability versus patient chart; the latter routes to stronger identity or refusal/handoff path based on real source. Tool drawer visibly shows limited tools.
**Mechanism:** patient identity badge and allowed action ticket are separate objects. Plain description first; precise grant/scope/tool names on click.
**Evidence:** Concierge agent config, identity/booking safety paths in packs.md and new research.

### 09 — Clinic staff: a booking and its follow-up are separate
**Visible sentence:** “The visit can exist while confirmation or intake work still needs attention.”
**Stage:** Booking committed marker in Medplum; split into confirmation, draft intake and brief event lines. Staff-owned send-forms gate blocks actual delivery until the correct action. A failed follow-up leaves booking intact and a visible work exception.
**Mechanism:** two independent progress strips: appointment truth and downstream work. Replay duplicate request to explain booking key/read-back without promising universal exactly-once.
**Evidence:** packs.md booking read-back, event handler registry, explicit forms drafted not automatically sent distinction.

### 10 — Sales: from research to reviewed placement
**Visible sentence:** “Research prepares candidates. Review controls the consequential next action.”
**Stage:** Funnel of synthetic practices → qualification evidence → list → placement preview → approval gate → provider. Count/evidence chips advance only when underlying state advances.
**Mechanism:** change a candidate after preview; digest mismatch closes the exact-action gate. Opt-out marker removes candidate where source supports it. Prepared, enrolled and sent are three different labels.
**Evidence:** Sales task starter, preparation/action implementations and platform exact-action checks. Current inbound worker with empty tools appears as separate read/reply lane, never a hidden task runner.

### 11 — The event that cannot find a handler
**Visible sentence:** “Declaring an event does not connect its downstream work.”
**Stage:** Sales checkout-paid fact packet reaches an event socket with no bound wire. Clicking actual file reveals current stub return rather than conversion touch creation. Side-by-side implemented engagement action lights when directly called, while generic event subscription remains unproven.
**Mechanism:** choose `current source` / `proposed repair`; current packet stops; proposed dashed wire connects only after handler registration, authenticated public delivery and conversion persistence/verification criteria appear. No fake live animation implying deployed hookup.
**Evidence:** `sales/handlers/events/checkout-paid.ts:36–43`, `sales/kee.project.ts:96–109`, `sales/capabilities/engagement-record/implementation.ts:13–41` from packs.md.

### 12 — Follow a permission ticket
**Visible sentence:** “Knowing an action exists does not give permission to run it.”
**Stage:** One packet travels tenant → installation → role → input → approval → scoped runtime grant → handler → callback. User selects wrong organization, disabled setup, missing connection or stale approval. It stops at the actual corresponding gate.
**Mechanism:** reveal only the next gate, not an eight-card list. The model's proposal is a dotted path; executable authority is a stamped ticket produced by code. Expanding shows exact guard sources.
**Evidence:** platform capability-invoke.ts:1–36, capability/server.ts, work/operations.ts. Keep capability lane and legacy Work lane distinct.

### 13 — Where chat time goes
**Visible sentence:** “The first useful answer and completed business work have different clocks.”
**Stage:** Animated temporal swimlane: browser submit; Core preparation; Eve accept; first model output; action discovery; governed invoke; provider; final useful answer. Move a scrubber along the timeline. Add tracks for server emission and browser paint to reveal missing client measurements.
**Mechanism:** scenario switch: simple answer / read action / write + approval / slow provider / long history. Show history pages replayed into repeated model calls, then source-supported compaction reducing earlier context. Show discovery cache hit bypassing a descriptor fetch while authority checks still run.
**Evidence:** platform.md turn-hop logs, Eve logs, compaction, discovery Promise cache. Any timing values must be labeled illustrative. No numeric latency target claimed achieved; no adding stage p95 to claim end-to-end p95.

### 14 — Timeout: the work may already have happened
**Visible sentence:** “No response is different from proof that nothing happened.”
**Stage:** Provider commits a synthetic booking, response packet is lost, Core clock expires. Two branches: blindly retry (red duplicate risk) versus reconcile/read-back (truth established or remains unknown). Hold result state as unknown until evidence arrives.
**Mechanism:** toggle drop before commit / after commit / delayed visibility. The exercise must not claim every current handler already reconciles all three. Different implementation coverage gets a source badge.
**Evidence:** governed invocation state handling, provider/booking implementation and event lease recovery caveat. Teach effect outcome and message outcome separately.

### 15 — Make it faster without removing the checks
**Visible sentence:** “Shorten the measured wait while preserving permission and truthful outcomes.”
**Stage:** Same timeline as scene 13; apply one proposed change at a time. Independent safe reads merge into parallel lanes; repeated metadata fetch becomes cache hit; long task moves off chat path with visible progress. Auth and verification gates remain anchored.
**Mechanism:** draggable bottleneck lens highlights scenario-specific dominant span. Show tradeoff tokens: stale cache risk, recall quality, queued completion, concurrency/provider limits. Comparison labels are `illustrative model` until backed by measured source traces.
**Evidence:** platform.md recommendation phases; latency priority chat/tool. Existing implemented optimizations distinguished from proposed next work. Every proposal reveals experiment and acceptance test.

### 16 — What to fix first
**Visible sentence:** “First prove correct outcomes and permissions. Then improve the measured slow path.”
**Stage:** Dependency railway, not cards: outcome truth + authority foundation unlocks event wiring/reconciliation, correlated observation, then measured latency experiments. Gap hotspots from prior scenes sit at their exact mechanism and click back to it.
**Mechanism:** selecting a gap lights affected upstream/downstream edges. Findings use four visually distinct but text-labeled states: confirmed source gap, risk/hypothesis, missing verification, proposed feature. A plan node unlocks only when its done conditions are checked in the local teaching model; no claim of live project progress.
**Evidence:** concrete gap source pointers from platform/packs notes, new deep source review and user priority. No invented owners or deadlines.

## How to meet the GIF/image/Mermaid request meaningfully

The interactive SVG stage is the primary image: it is a real explanatory drawing, not boxes decorating prose. Supply 2–3 short looping GIF companions only if export tooling is available: (A) two registries with action discovery, (B) file activation chain with unbound event, (C) provider timeout after commit. Each loop should pause at key states and have a static annotated first frame, short text alternative and reduced-motion still. GIFs cannot replace the step controls or evidence.

Include source-grounded Mermaid flow/sequence views as optional “Engineer view” under scenes 03, 04, 06, 07 and 12. Render them offline using an installed/pinned Mermaid renderer or SVG export; do not depend on CDN imports. If generated from a static SVG rather than Mermaid, label it honestly as an SVG diagram. Potential exact diagrams: file import/registration flow; two registries; new/existing Eve session sequence; runtime-to-Core service callback sequence; capability invoke authorization flow. A diagram containing unverified Eve loader steps must mark those nodes unknown until source research resolves them.

## Implementation quality bar

- At least 12 different source-grounded scene drawings; no repeated generic card-grid filler.
- Every scene has a visibly different state after Next; Replay returns all positions/labels/gates to their starting state.
- Keyboard buttons and node inspector, focus handling, screen-reader text narrative, reduced motion, mobile frame, and accessible no-JS/static full guide.
- Main visible page has only current scene, sentence, controls and optional detail; evidence library and long text stay secondary.
- Loading file metadata or presenting an enabled toggle is explanatory simulation, not a connection to production.
- Verify full chapter navigation, every step, source links and scenario switches in the browser; record no console errors. Check scene labels are not clipped on small viewports.
