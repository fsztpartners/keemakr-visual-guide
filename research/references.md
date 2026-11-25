# Reference structure and teaching curriculum

## What should be reused from Barney?

### Takeaway
Reuse Barney's progressive teaching interface and evidence library, not Barney's architecture conclusions, numerical benchmarks, or old schedules. The reference already contains an excellent model for a long technical guide that remains approachable: one visual story at a time, step controls, plain-language terms, deeper engineering detail and nearby evidence.

### Cited Findings
- Barney's research README identifies the animated explainer as 16 step-by-step chapters with a read-aloud option, plus a separate live-weight scorecard and offline library. [Source](/Users/sobingt/projects/barney-research/README.md:7) (lines 7–16).
- The reference explicitly promises offline operation with bundled fonts and local copies of evidence; online originals have a separate arrow. [Source](/Users/sobingt/projects/barney-research/README.md:5) (lines 5 and 18–31). These are repository statements, not newly rerun checks.
- Each explainer chapter defines its own headline, plain lede, SVG scene, sequence of steps, remember list and sources. Its content model begins at `CH` and chapters at line 399; render function at 1192 creates the common teaching layout. [Source](/Users/sobingt/projects/barney-research/reports/Agent%20builder%20explainer.html:399) (399–451, 1192–1215).
- SVG nodes are interactive and expose explanatory drawers via `data-info`, `tabindex=0` and button roles; technical terms are clickable. [Source](/Users/sobingt/projects/barney-research/reports/Agent%20builder%20explainer.html:387) (387–393).
- Playback supports calm/normal speed, optional auto-advance, read aloud, local preferences, prior/next chapter navigation, numbered step controls and source references below the currently explained step. [Source](/Users/sobingt/projects/barney-research/reports/Agent%20builder%20explainer.html:1175) (1175–1284).
- The reference detects reduced motion and immediately resolves animations for that preference. [Source](/Users/sobingt/projects/barney-research/reports/Agent%20builder%20explainer.html:184) (184 and 1269–1284).
- Its chapter subjects span big picture, V1 path, versioned agent document, templates, turn ownership, action pipeline, extension trust, channels/voice, money, repeatability, security, market, comparative scoring, plan and decisions, followed by a worked business journey. [Source](/Users/sobingt/projects/barney-research/reports/Agent%20builder%20explainer.html:399) (399–1037).
- The core plan separates components, build stages, experiments and papers. Stage order has no product deadlines; experiments start when prerequisites exist. [Source](/Users/sobingt/projects/barney-core-plan/PLAN.md:38) (38–97).
- The reference plan folder has a source-of-truth slice table with dependencies, done conditions, review status, PR and notes, plus separate decisions, open questions and external dependencies. [Source](/Users/sobingt/projects/barney-core-plan/README.md:96) (96–125).
- The later plan explicitly says Barney and KeeMakr are separate and that cross-system observations cannot establish causality. [Source](/Users/sobingt/projects/barney-research/reports/Plan%20to%20plan.md:39) (39–50).
- The research layer specifies event-level model, tool, effect, policy, staff action and outcome measurements and separates raw local logs from aggregate exports. [Source](/Users/sobingt/projects/barney-research/reports/Research%20layer%20spec.md:15) (15–60).

### Inferences
- For the requested Keemakr guide, use plain business language as the default, and show exact engineering names beside it or inside expandable detail. Readers should not have to learn pack/capability/grant before understanding clinic intake or sales follow-up.
- A huge document should have multiple reading routes through one corpus: beginner tour, developer walkthrough, senior architecture review, and operator incident guide. This is preferable to duplicating the same explanation in several long documents.
- Use visual controls to explain causality: step a request through each boundary; switch between success, approval pending, provider timeout, ambiguous completion and recovery; show which data and permissions cross each boundary.
- Reuse the evidence pattern, but make evidence state more precise: `implemented in source`, `covered by a test`, `executed in this review`, `observed in live traffic`, `proposed`, `unknown`. A source file proves implementation intent, not deployment or correctness.
- Prefer a self-contained HTML artifact with inline CSS/JS/SVG, system fonts, all essential content present without network access, static full-text/print view, and optional local preferences. External citations can open separately; do not claim an offline archive was supplied if only URLs are present.

### Gaps
- No new checks of Barney's archived-link counts were run. Do not reuse the README's 1,028/1,136 source counts or zero-broken-link claim as current validation.
- The older animated explainer has a six-month/12-engineer plan (lines 929–946), while the later 19 November core plan says product stages have no dates and Sobin plus AI agents own the core. This illustrates why the new guide must date every plan and distinguish old references from current decisions.
- Exact-once language in the old explainer headline (624–625) is too strong to transplant without examining provider idempotency, unknown outcomes, retries and verification. Explain operational guarantees and failure boundaries instead.

## What should the interactive Keemakr curriculum contain?

### Takeaway
Start from the business promise, walk through real clinic and sales work, then progressively reveal the platform, data/security boundaries, latency and execution plan. A recommended first edition is 24 substantive chapters in six parts with about 15 distinct visual explanations; depth belongs in the page, not in jargon.

### Cited Findings
- The user explicitly requests a huge interactive HTML guide, rich visuals, both novice and senior developer audiences, clinic and small-business marketing/sales operations, reality versus plan, gaps and latency solutions. This is the current task brief.
- The Barney interface is a direct local precedent for stepwise diagrams with per-step detail and evidence. [Source](/Users/sobingt/projects/barney-research/reports/Agent%20builder%20explainer.html:1192).
- The Barney core plan links components to slices, stages, prerequisites and done conditions, supporting a similar traceable plan structure rather than a broad wish list. [Source](/Users/sobingt/projects/barney-core-plan/PLAN.md:8) and [Source](/Users/sobingt/projects/barney-core-plan/README.md:107).

### Inferences
The following is a proposed teaching structure, not a claim about current Keemakr implementation.

**Part I — Understand the business**
1. What Keemakr is: a business operator helping people complete work. Show people, business systems and Keemakr in a single illustrated map. Define administrative clinic assistance separately from clinical judgment.
2. A clinic day: enquiry → identity/contact permission → intake → slot lookup → booking → confirmation → preparation → staff follow-up. Click stages to reveal evidence, blockers and which system owns the record.
3. A small-business day: prospect discovery → qualification → approval → outreach → reply → meeting → handover. Include opt-outs, consent and provider uncertainty.
4. The words we use: business setup (`pack`), allowed action (`capability`), connected service (`connector`), permission ticket (`grant`), work record (`run`), approval, organization (`tenant`), record, knowledge and agent. Show where these analogies stop being exact.

**Part II — What exists today**
5. The platform and business setups: platform owns shared rails; a clinic/sales setup declares domain work. Interactive layered system map.
6. Inventory explorer: searchable agents/actions/screens/jobs/data/connections with implementation and test evidence. Filter by clinic/sales/shared, read/write, human/customer, local/remote, status.
7. Clinic setup deep dive: agents, procedures, action handlers, records, screens, connections, schedules, dependencies. Show one actual declaration-to-handler-to-record chain.
8. Sales setup deep dive: same structure and evidence rules, with approval and suppression behaviors.
9. Install and activate: declaration → validation → installation → permissions → connected services → readiness. Disabled/missing prerequisites must remain visible.

**Part III — Follow one request**
10. From a message to completed work: numbered swimlane across browser/channel, platform, model, registry, policy, handler, provider and result. Separate receipt, first visible reply, confirmed effect and final completion.
11. How an agent chooses an action: instructions/context/model output/schema/authorization; distinguish model decision from code enforcement.
12. How an action runs: identity → tenant → role → schema → policy → approval → execution → verification → audit. Highlight the actual code path; mark proposed missing stages explicitly.
13. Data and knowledge: records versus documents versus recalled context versus provider-owned truth; freshness and source-of-truth map.
14. Screens and people: which human sees conversations, pending approvals, failed jobs, work completed and safe handoff.
15. Background work: schedules, triggers, queue/claim/retry/recovery, machine permission, human-owned exceptions. A background task is not complete merely because it was accepted.

**Part IV — Trust and failure**
16. Permissions and business isolation: locked compartments illustration and request-scoped principal/resource checks. Include staff versus patient versus machine differences.
17. Clinic privacy and HIPAA readiness: data flow, vendor/BAA boundaries, minimum necessary access, retention, access logs, incident response; classify requirements and available evidence without a compliance verdict.
18. Failures and truthful answers: provider rejects, provider times out before/after write, duplicated delivery, stale data, disconnected service, approval expiry, human takeover. Interactive branching incident tree.
19. Reliability evaluation: synthetic journey cases, negative-path tests, repeated runs, provider fault injection and version comparison. Every production bug should gain a regression case, but this guide does not claim unrun tests passed.

**Part V — Latency and improvement**
20. Where the wait goes: editable waterfall with network, database/context, routing/model, action, provider, verification and output. All seeded values clearly illustrative; no p95 made by adding stage p95 values.
21. Chat scenarios: simple answer, single read, multi-action request, approval required, slow provider, cold start. Distinguish first token, useful answer, verified effect and total time.
22. Voice and long work: voice end-of-speech → processing → first audio; interruption/cancellation; short acknowledgment versus verified completion; jobs finish after the conversation and need status/progress.
23. Solutions and tradeoffs: instrument first; remove unnecessary serial work; parallelize independent reads; reduce context; cache safe stable metadata; stream; move slow work to recoverable jobs; place compute/data appropriately; do not bypass policy or verification for speed. Mark each fix as recommendation and attach validation experiment.

**Part VI — Plan and learning routes**
24. Gap register and dependency roadmap: each finding shows evidence, user consequence, severity, uncertainty, owner role, proposed fix, dependency and done condition. Show `known defect`, `design risk`, `missing verification`, `planned feature` distinctly. End with beginner exercise, senior review checklist, glossary and source index.

Recommended interactions: audience/detail toggle; chapter navigation and search; current-versus-proposed view; click-to-explain architecture nodes; request playback; clinic/sales journey switch; approval pending/denied scenario; provider timeout uncertainty scenario; editable latency waterfall with reset; gap filters; roadmap dependency highlights; print/export full guide; source drawer; keyboard navigation and reduced-motion support. Avoid autoplay and avoid visual motion that advances before a reader finishes.

Recommended evidence record per claim: stable ID, plain claim, classification, source repository and SHA, exact file/line, checked date, test evidence, live evidence, caveat. For diagrams, show a compact legend distinguishing observed source path from proposed improvements. Keep sensitive source data out; use synthetic business examples.

Recommended gap record: problem in plain language, who experiences it, concrete trigger, actual behavior/evidence, desired behavior, root cause or hypothesis, verification still needed, fix options and tradeoffs, first safe step, acceptance criteria, rollback, dependency, status. This structure is an explanatory guide, not a claim that tickets exist or owners accepted work.

### Gaps
- The platform/packs research agents own current-code facts, concrete counts, actual paths, handler coverage and real latency instrumentation. Their findings must override this proposed outline wherever reality differs.
- The parent relayed the user preference for U.S./HIPAA first, with other markets still open. Keep HIPAA material scoped to covered-entity/business-associate conditions and distinguish it from general health-data privacy; deployment evidence still comes from owning sources.

## What reference scope and latency priority did the user confirm?

### Takeaway
The parent relayed the user's clarification: use `/Users/sobingt/projects/barney-core-plan` and `/Users/sobingt/projects/barney-research` as the intended references. The audience is a mixed team using simple explanations with expandable engineering details; latency priority is chat response and tool execution.

### Cited Findings
- Current user clarification relayed by the parent on 25 November 2026 identifies the two Barney directories as the requested references. Do not keep Dhanyal as a missing dependency or continue searching for it.
- User selected mixed-team teaching and chat/tool latency as the primary investigation scope. Further clarification: everyday business language first with code terms beside it; U.S./HIPAA first, other markets open; roadmap priority is reliable outcomes and permissions, then chat/tool speed.

### Inferences
- Chapters 20–21 should get the deepest latency treatment. Voice and background work can provide secondary context where the source contains them, but should not displace the requested chat/tool investigation.
- The guide should keep a single plain-language surface with expandable source-level detail instead of separate novice and senior documents.
- Order the proposed roadmap as outcome reliability and permission boundaries first, then chat/tool latency. Speed recommendations must preserve truthful completion and authorization.

### Gaps
- None for the requested reference paths or primary teaching/latency scope after this clarification.
