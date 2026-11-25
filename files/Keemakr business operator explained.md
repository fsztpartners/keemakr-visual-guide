> Earlier long-form reference: see corrections in the revised visual guide. Sales inbound hard tool exclusion and handoff are unproved; ClinicOS voice/Copilot are custom LiveKit workers, not Eve; Intake handoff does not automatically transfer chat ownership. Next and Eve are peer services with distinct callback ownership.

# Understand how Keemakr runs business work


This guide synthesizes read-only source research across Keemakr origin/v2 and the local ClinicOS/Sales checkouts, using Barney's progressive teaching interface as a presentation reference. It does not copy Barney architecture findings, research outcomes or old staffing schedules into Keemakr claims. The research date is 25 November 2026.
Evidence is separated into implemented source, test present, test run, live unverified and proposed work. No production traces, live tenant configuration, real patient records or provider writes were used. Local pack tests were attempted and partly blocked by missing dependencies. No Core whole-suite run or measured latency distribution is claimed.
The HTML contains all essential prose, diagrams, data and interaction code in one file using system fonts. It makes no background network requests. External web citations open only when selected. Source code and web pages are not archived inside this file; the bibliography preserves paths, versions and line metadata. With JavaScript disabled, all chapter text, engineering details and the default static diagrams remain readable; calculators and filters require JavaScript.
US clinics/HIPAA are the primary privacy context requested by the user. Other jurisdictions remain open. HHS material supplies limited factual context; the field-level engineering investigation and proposed acceptance gates are this report's analysis. Vendor agreements, operating policies and actual deployment settings remain unverified.


## 01. Keemakr helps people complete business work

Start with the job a clinic or small business needs done. Learn the machinery after the outcome.

Keemakr is a shared business operator: people ask for work, the system interprets the request, finds an installed business action, checks authority, performs the permitted steps and reports the outcome. A clinic can use that model for enquiries, scheduling, intake preparation and staff follow-up. A small business can use it for prospect research, qualification and approved outreach. Those examples explain the product better than opening with a list of agents or tools.

The important unit is **completed business work**. “Alex has a confirmed consultation at the agreed time” is an outcome. “A model called a tool” is an implementation event. “A request was accepted” is a receipt. Each is useful, but they answer different questions. The guide repeatedly separates them because confusing them creates false success messages, repeated sends and hard-to-explain waiting.

The source contains reusable business departments called `packs`. ClinicOS contains clinic-specific code, records, actions, screens, conversation instructions and recurring jobs. Sales contains an outbound prospecting pipeline and a restricted inbound responder. Keemakr Core provides shared identity, organization boundaries, permission checks, action orchestration, service access and conversation infrastructure. A department depends on these shared services; it does not become a complete independent business merely because its folder builds.

A clinic operator also needs a clear boundary around clinical judgment. The examined flows prepare information and preliminary notes, handle administrative actions and surface staff work. Clinicians remain responsible for review and clinical decisions. Marketing permission, appointment confirmation and agreement to complete intake forms are separate decisions. A single “yes” must not silently stand for all three.

This edition follows the user's priorities: reliable outcomes and permissions first, faster chat and tool execution second. Everyday names appear first, with the exact engineering term beside them. Examples use invented people and practices. Nothing in this guide establishes a live tenant's deployment, permission configuration or HIPAA compliance.

### Engineering detail

A useful product contract names the actor, object, permitted effect, success evidence and recovery path. For booking, that becomes identified person, exact appointment choice, authorized booking, verified provider outcome and reconciliation after ambiguity. For campaign enrollment, it becomes eligible prospect, reviewed campaign selection, current suppression check, provider enrollment receipt and a local touch record. These contracts are more durable than a particular model or framework.

The five-layer architecture drawing is a teaching synthesis from source, not a verified deployment topology. The amount of network traffic and number of model calls change with the selected action. Avoid promises that every request has a fixed number of hops or that every department can run every business process.

### Visual guide in the HTML edition

Five layers of business work 01 People and channels 02 Kee conversation 03 Core authority 04 Business department 05 Records and providers Staff ask for work; patients enquire; channel identity and purpose differ. Click a layer. Logical architecture inferred from source, not a verified deployment map.

Sources: [P01](#source-p01), [P03](#source-p03), [C01](#source-c01), [S01](#source-s01).

## 02. Follow one clinic enquiry to a real visit

Alex wants a consultation. The business result depends on identity, exact choice, provider truth and staff decisions.

Alex sends an enquiry through a clinic channel. The Concierge receives the conversation under a channel-specific permission ticket, reads relevant clinic reference material and processes the message through safety logic. At this stage, “identified” does not mean every request has strong verified identity. Public information and person-free availability need a different access level from patient chart information or a booking change.

The conversation can record interest, find actual appointment options and read back an exact choice. The patient-facing booking tool checks current safety holds, contact access, the latest staff interference and evidence that the choice actually reached Alex. It waits for clear agreement. Booking for someone else is handled differently and can require staff. These are business rules implemented around the model's suggestions.

The shared booking package then checks hours, chart and name constraints, policy and minor-related constraints, derives a deterministic booking key, coordinates the calendar hold, confirms with Medplum and checks the returned outcome. The operational consultation record and published booking fact follow the provider result. An answer saying “booked” should be tied to that evidence, rather than to the model's intention or a network request leaving the process.

After a booking, separate event responders handle confirmation, intake drafting and brief preparation. **Forms are drafted on booking and sent by staff.** Drafting, staff approval, sending and the patient completing forms are four separate milestones. A failed confirmation message does not prove that the appointment disappeared; a successful form draft does not prove that anyone received it.

During and after the consultation, private Copilot suggestions and preliminary notes support the clinician. The clinician reviews the material. A safety or clinical question creates owned staff work; it should not dissolve into an unowned chat notification. In a good incident view, the team can tell whether Alex's booking exists, whether the confirmation arrived, whether intake was sent and who owns the remaining task.

### Engineering detail

There are at least two important booking entry paths. A staff named action presents a preview and rechecks relevant values during execution. A patient conversation invokes a constrained direct tool that checks conversation evidence. They share domain booking code but do not share identical authority. Staff can make a named override through a safety hold in permitted circumstances; autonomous patient booking cannot inherit that override.

The booking key and read-back mechanism reduce duplicate risk in the examined implementation. They do not prove exactly-once behavior for every provider or every clinic action. Test connection loss after provider confirmation, local record failure, a moved appointment and duplicate inbound delivery as distinct cases. Maintain independent state for appointment outcome and downstream communication outcome.

### Visual guide in the HTML edition

Alex’s enquiry: outcome and ownership Enquiry Concierge + safety screen Identity Access appropriate to the request Exact choice Actual times, readback and clear yes Verified booking Shared code + Medplum outcome Preparation Events draft; staff send forms Clinical review Clinician reviews draft material Source-based teaching model; arrows show logical dependency, not measured time.

Sources: [C11](#source-c11), [C13](#source-c13), [C14](#source-c14), [C15](#source-c15), [C01](#source-c01), [C06](#source-c06), [C16](#source-c16).

## 03. Follow research through approved outreach

The current Sales department targets aesthetic practices. Its real integrations coexist with unfinished attribution.

A staff member asks for a qualified group of practices in a region. The internal sales worker can start a tracked task that sources practices, enriches people and evidence, removes duplicates, applies qualification rules, lists results and prepares campaign placement. The target is a qualified outcome, not merely the number returned by a search provider. Capped rounds and invocation limits bound the plan.

Sourcing calls Apollo and stores normalized company records. Enrichment uses Apollo people data, Hunter discovery or verification and optional Firecrawl website research, depending on available permissions. Evidence includes a quote, a source URL and when it was read. Qualification rebuilds its facts from stored records. The current implementation is therefore more than a fixture demonstration, even though older teardown notes describe an earlier state.

Before placement, Gate 1 is meant to put the reviewed action in front of a person. Its enforcement depends on a **Core tenant policy binding** requiring approval and choosing an approver. A sentence in a task plan is not that binding. Sales implementation checks eligibility, tier, email and suppression, but does not establish the entire human approval guarantee by checking a local “approved” label.

Placement calls Smartlead and records the touch locally. If the provider succeeds and the local record write fails, the systems disagree. Retrying the whole list blindly can repeat effects or cost. The proper response is to reconcile the individual outcome and preserve partial progress. That boundary is one of the highest-value reliability investigations in this guide.

Replies use a separate inbound worker that can respond from tenant reference material or hand over. Its instructions prohibit tools, task starts and provider calls. Do not teach this path as an autonomous sales closer. Engagement recording exists as a named action; a live provider subscription into it remains unverified. The checkout-paid responder is a stub and is not wired through manifest event handlers, so conversion attribution is unfinished.

### Engineering detail

The Sales schemas and qualification vocabulary are aesthetic-practice specific. Making the department reusable for a broad small-business market requires more than changing the visible name: segment definitions, role enums, decision-maker titles, rubrics, provider mappings and outreach policies need clear extension points. Reuse the engine only after separating those domain assumptions.

Source data, factual evidence, inferred score and marketing permission should remain distinct. An available business email is not a blanket permission claim. ClinicOS and Sales also have different person identity models. Cross-department reuse needs an explicit identity mapping and purpose decision; matching a name or email string is insufficient evidence that all permissions transfer.

### Visual guide in the HTML edition

A qualified pipeline: the unfinished tail stays visible Find practices Apollo → companies Gather evidence Apollo / Hunter / Firecrawl Qualify Rules + stored facts Human gate Core tenant approval binding Enroll Smartlead + local touch Attribute Checkout conversion path incomplete Source-based teaching model; arrows show logical dependency, not measured time.

Sources: [S06](#source-s06), [S07](#source-s07), [S08](#source-s08), [S09](#source-s09), [S10](#source-s10), [S11](#source-s11), [S12](#source-s12), [S14](#source-s14), [S21](#source-s21).

## 04. Use ordinary words without losing precision

The product can speak about departments and actions while developers keep exact contracts and names.

A **business department** (`pack`) is a reusable bundle for a job area. It can contain conversation workers, named actions, record shapes, screens, event responses, reference paths and recurring work. The company installs and configures that bundle. Think “clinic front desk and operations setup,” rather than a compressed folder or an unrestricted agent with every tool.

A **named business action** (`capability`) has a key, accepted inputs, expected outputs and permission dependencies. “Find times” and “book this consultation” are different actions because reading availability and changing an appointment have different effects. A **conversation worker** (`agent`) decides how to respond and which declared tools to request; it does not replace the server's permission system.

A **temporary permission ticket** (`grant`) is signed authority bound to a company, audience, scope, purpose and time. It carries permission, not all business records. A **connected service** (`connector` or integration) lets authorized code reach a provider through the approved broker. A **runtime** is where department code executes; it can be a separately deployed service.

An **operational register** (`Table`) stores structured rows such as enquiries or campaign touches. A **company reference library** (`Company Brain`) holds versioned policies, services, SOPs and related material. Neither is the model's private memory, and neither should be assumed to contain the authoritative clinical chart. A **business event** records that something happened; an **event responder** (`handler`) reacts through a declared binding.

A **receipt** confirms acceptance. **Prepared** means an action has been assembled. **Waiting for review** means a person still needs to decide. **Completed** means the relevant business outcome has been established. **Uncertain** means the system cannot yet prove whether an external effect happened. These words should appear consistently in chat, screens and incident handling.

### Engineering detail

The platform also retains an older Work vocabulary: `ability`, operation, flexible and fixed execution. Its discovery and preparation relationships differ from the named capability lane. The operator tool describes it as a fallback when suitable capabilities are absent. Documentation and debugging should record which lane actually ran; a generic “tool failed” loses the permission and retry context.

The word handler has two everyday uses in code: a function implementing an action and a function responding to an event. This guide says “action implementation” for the former and “event responder” for the latter. A dependency closure means the exact subset of services and records an action needs, not every permission the whole department could ever use.

### Visual guide in the HTML edition

Say first Exact term Where the analogy stops Business department pack Reusable code bundle; not an independent company Named business action capability Discovery does not authorize execution Conversation worker agent Model choice is not server permission Temporary permission ticket grant Scoped authority; not the data itself Operational register Table Can still contain sensitive content Company reference library Brain Not a clinical chart or private model memory Event responder event handler General handler can also implement an action Outcome needs reconciliation uncertain Not proof of success or failure

Sources: [P01](#source-p01), [P05](#source-p05), [P06](#source-p06), [P07](#source-p07), [P12](#source-p12), [P20](#source-p20).

## 05. Separate the shared platform from business code

Shared identity and authority belong to Core. Domain decisions and provider work live in installed departments.

Keemakr Core is the shared control point for a company's authenticated members, installed departments and permitted actions. An action search resolves candidate contracts against what is installed and ready for that person. A later invocation resolves the exact contract, checks prerequisites, validates input, creates operation identity, handles approval and dispatches a scoped request. Discovery helps find work; it never grants permission to perform it.

ClinicOS and Sales supply domain behavior. ClinicOS understands appointments, enquiries and clinician preparation. Sales understands practices, evidence, qualification and outreach placement. Each can call back through Core's authorized interfaces for Tables, company reference and connected services. That means an apparently simple tool can contain several callback and provider round trips. Code boundaries explain the latency opportunity more accurately than a single “LLM time” box.

Current typed chat uses Eve session log replay. Core registers the session before sending; reads replay the log into the view the client needs. Older documentation describes durable Core turns as the main chat record. That prose should not be copied into a current architecture diagram without qualification. Durable action and task records still matter, but they are not proof that current chat is stored in the historical form.

Company reference storage has a common revisioned interface with selectable backends. Source includes Mesa, HTTP Knowledge Store and explicit Postgres options. This review did not inspect which option a live deployment uses. Likewise, a source directory or a runtime URL does not establish that an organization has installed a particular version or connected the required provider accounts.

For developers, the practical boundary is clear: shared authority should be enforced on the server, and department code should receive only the authority needed for that action. For operators, the useful question is whether a particular business workflow is ready for this company and person today. Those two views should lead to the same readiness explanation.

### Engineering detail

The scaffold schema describes tables, actions, instruction paths, department and external-app requirements. Its authoring constraints are not universal runtime limits. For example, a scaffold's action-count bound should not be presented as a maximum for every hand-authored department, especially when ClinicOS binds more actions.

Core owner database connections intentionally differ from tenant-restricted transactions. Tenant flows require explicit tenant predicates and the passed transaction client. Calling a module-level owner query inside a tenant callback can bypass the intended restriction and consume another pooled connection. Architecture teaching should include this implementation boundary because it affects isolation and latency together.

### Visual guide in the HTML edition

Separate control from domain work Shared control Identity / contracts / permissions / orchestration Clinic department Enquiries / bookings / forms / staff work Sales department Prospects / evidence / qualification / outreach External truth Appointments / clinical chart / campaign enrollment Source-based teaching model; arrows show logical dependency, not measured time.

Sources: [P01](#source-p01), [P02](#source-p02), [P03](#source-p03), [P08](#source-p08), [P10](#source-p10), [P11](#source-p11), [P13](#source-p13).

## 06. Read the inventory as scope, not a readiness score

Counts show what is declared or bound. They do not measure quality, coverage or production availability.

The ClinicOS source binds **35 action implementations**, declares **14 operational Tables**, registers **30 screen IDs**, declares **two inbound conversation agents**, binds **14 event responders** and lists **six recurring jobs**. Screen IDs include detail pages and nested surfaces; they are not thirty navigation tabs. Voice and live-call Copilot are additional entry paths rather than extra members of the two-agent manifest array.

Its actions cover today's work, availability, lead and patient lookup, booking and changes, reminders and forms, visit preparation, notes, clinic hours and staff tasks. Some actions read, some write, some produce drafts and some send communication. A name alone does not tell us whether fresh approval, identity proof or provider verification is required. The action contract and implementation establish those details.

The Sales source binds **eight actions**, declares **four Tables** and declares **two agents**. The actions are practices.source, practice.enrich, leads.dedupe, leads.qualify, leads.list, campaign.place, engagement.record and brief.next_round. Its internal worker starts work; its inbound worker responds or hands over without tools. There are real integrations, but a smaller inventory does not by itself mean less reliable behavior.

Use the inventory as a map into the source. Start with the authored `kee.project.ts`, then the generated `entry.json`, action registry, contracts and implementations. A declaration proves intended interface; a bound implementation proves executable code exists; a passing synthetic test proves only the behavior exercised in that environment. Current tenant readiness needs another layer of evidence.

The filter below switches between the two business departments and shows a grounded inventory. Exact folder labels are useful search terms, but the ClinicOS list here follows implementation imports and should not be treated as a promise that every folder label is the public machine key. Check each contract before writing an API call.

### Engineering detail

ClinicOS actions by source import label: today, find_times, lead_lookup, patient_lookup, book, move, cancel, mark_no_show, availability_change, regular_hours, offer_times, send_link, send_forms, send_form, forms, send_reminder, build_brief, read_brief, draft_note, practitioners, check_in, keep_visit, close_task, calendar_blocks, open_work, hours, counts, notes, notes_to_review, patient_health, add_note, add_lead, follow_up, record_marketing_consent and booking_link.

ClinicOS Tables are people, enquiries, enquiry_score_facts, consultations, work_items, staff_idle_holds, clinic_settings, calendar_lock, house_rules, copilot_calls, copilot_cards, form_sends, booking_links and services. Sales Tables are companies, people, evidence and touches. A Table name is a schema boundary, not proof that every field is safe to expose to every staff member.

### Visual guide in the HTML edition

Business department inventory Both departments ClinicOS Sales ClinicOS: bound implementation labels today find_times lead_lookup patient_lookup book move cancel mark_no_show availability_change regular_hours offer_times send_link send_forms send_form forms send_reminder build_brief read_brief draft_note practitioners check_in keep_visit close_task calendar_blocks open_work hours counts notes notes_to_review patient_health add_note add_lead follow_up record_marketing_consent booking_link Source area Inventory Conversation agents Concierge and Intake (2 declared inbound agents) Operational records 14 Tables Screen registry 30 IDs, including nested/detail surfaces Events and schedules 14 responders; 6 jobs Sales: exact named actions practices.source practice.enrich leads.dedupe leads.qualify leads.list campaign.place engagement.record brief.next_round Source area Inventory Agents Internal task starter; inbound responder without tools Operational records Companies, people, evidence, touches Providers Apollo, Hunter, Firecrawl, Smartlead Known unfinished path Checkout conversion responder and event wiring Counts reflect the inspected source snapshots, not live installs. All labels remain available in full print view.

Sources: [C02](#source-c02), [C03](#source-c03), [C04](#source-c04), [C05](#source-c05), [C06](#source-c06), [C07](#source-c07), [S01](#source-s01), [S02](#source-s02), [S03](#source-s03).

## 07. ClinicOS joins conversations, operations and clinical services

The same business rules need to hold across chat, staff actions, screens and recurring work.

ClinicOS has several front doors. Concierge handles new enquiries and relevant channel events. Intake handles patient-link and intake-related conversation events. Staff work through screens and named actions. Patient booking pages and voice add other entry paths. These routes must converge on consistent domain rules rather than each inventing its own booking behavior.

The shared booking package is a good example of that convergence. The patient conversation tool, staff booking implementation and booking page use shared domain code. The surrounding authority differs: a patient must provide the required identity and current choice evidence, while staff see an exact preview and can make a permitted named override. A staff override should remain visible in audit and outcome communication.

Medplum supplies patient and clinical resource operations and appointment outcomes. ClinicOS Tables maintain operational mirrors, work queues, configuration and progress. Core holds contact handles and channel services. The company reference library supplies clinic policies, service education and prices. No single store should be taught as an atomic transaction spanning every other one.

The screens make the workflow inspectable: leads and person views, availability and hours, consultations and lobby, forms and briefs, private Copilot, patient visits, settings and support. A useful screen exposes what happened and what remains. For example, a consultation can exist while its confirmation is still pending. A work item can require a clinician even when the conversation agent has stopped.

Recurring work handles reminders, temporary holds, no-shows, follow-ups, clinical reconciliation and idle staff hand-back. The declarations say how often a job is scheduled. They do not guarantee that every reminder finishes at that cadence. Missing provider access, backlog, policy holds and retries can delay work. The guide treats those as operational states to explain, not as invisible background details.

### Engineering detail

The declared cadences are reminders every 15 minutes, temporary hold sweep every 10 minutes, no-shows every 15 minutes, enquiry follow-ups hourly, Medplum reconciliation every 15 minutes and idle staff hand-back every two minutes. These are inspected source configuration, not measured scheduler lateness.

Forms are drafted after booking and sent by staff; deterministic form save avoids placing a model in the actual save path. Preliminary notes need clinician review. Copilot suggestions stay clinician-private, suitability marks gate price help and sensitive-talk state suspends sales help. Test each of these boundaries when changing prompts, screen behavior or timing. A change that produces faster text while skipping the intended staff decision changes the business contract.

### Visual guide in the HTML edition

ClinicOS department cutaway Conversation surface Concierge / Intake / voice / private Copilot Actions and views 35 bindings / 30 screen IDs Domain code Shared booking / forms / notes / safety Operational state 14 Tables + Core contact references External clinical service Medplum chart and appointment truth Reactions 14 event responders + 6 recurring jobs Source-based teaching model; arrows show logical dependency, not measured time.

Sources: [C01](#source-c01), [C03](#source-c03), [C05](#source-c05), [C06](#source-c06), [C07](#source-c07), [C08](#source-c08), [C14](#source-c14), [C15](#source-c15), [C16](#source-c16).

## 08. Sales is an evidence pipeline with a human placement gate

The code can research and enrich. Reliable outreach still depends on policy, partial progress and provider truth.

The Sales department keeps separate company, person, evidence and touch records. Company records hold identity and segmentation. Person records include role, email kind, score, tier and status. Evidence records preserve the supporting quote and source. Touches record placement, engagement and outcomes. Keeping facts and touches separate helps explain why a person was selected and what actually happened afterward.

The rules book lives at tenant Brain paths under `departments/sales/sops/`, including segment-rules.md, rubric.md and campaigns.md. Workflow and inbound material use additional paths. JSON fenced blocks provide configuration the code reads. A developer editing prose around those blocks should understand which content is executable policy input and how changes are validated.

Provider access is explicit: Apollo finds companies and people, Hunter supports discovery and verification, Firecrawl researches web content and Smartlead receives campaign placement. Credentials belong to the approved connection mechanism. The department should not copy provider secrets into prompts or Tables to make tool calls easier. Missing scopes or disconnected accounts are readiness failures with specific remedies.

The current source allows some input-supplied rules or campaign books to take precedence over Brain material. That is a declared contract, not a hidden schema bypass. It still creates a governance question: who is allowed to override tenant-owned reference, what version did the reviewer approve and can execution prove that it used the reviewed version? The answer belongs in policy and evidence, not only in instructions.

Two important limits remain visible. The implementation is tailored to aesthetic-practice segments and decision-maker roles, and some queries read only the first 200 rows. A broad product promise needs a generalization plan and correct pagination. The incomplete conversion responder also means the final outreach-to-revenue story cannot be treated as finished just because the earlier sourcing stages work.

### Engineering detail

The enrichment guard reserves estimated cost, records degradation and opens a circuit after relevant provider failures. It does not keep a billed-call replay ledger in the examined version. Stable Table write keys therefore do not imply that repeated paid provider lookups are free. Cost and business-effect idempotency need separate analysis.

Enrichment loops sequentially through practices and then through dependent provider stages. Qualification reads company, evidence and people and writes per person. Independent practices offer a candidate bounded-concurrency opportunity. Within one practice, dependent stages must preserve ordering. Campaign placement also rereads suppression immediately before enrollment; that fresh decision should not be replaced by an old cached eligibility result.

### Visual guide in the HTML edition

Pipeline stage Business evidence Boundary to inspect Source Normalized company rows Provider partial shortfall Enrich People + dated website facts Cost and repeated billed calls Qualify Rubric and score facts First-200 reads Review Exact campaign placement decision Live Core policy binding Place Provider receipt + local touch Remote/local crash window Engage / convert Reply or outcome touch Subscription unverified; conversion stub

Sources: [S03](#source-s03), [S04](#source-s04), [S05](#source-s05), [S08](#source-s08), [S09](#source-s09), [S10](#source-s10), [S11](#source-s11), [S14](#source-s14), [S15](#source-s15), [S16](#source-s16), [S17](#source-s17), [S18](#source-s18), [S19](#source-s19), [S20](#source-s20).

## 09. Installation is a sequence of readiness decisions

A valid manifest, a running service and a usable company workflow are different milestones.

A reusable department begins as an authored definition and generated contract material. The runtime must bind each declared action to code and expose the expected invocation interface. Core then needs to know which version a company installed, which runtime serves it and which dependencies it requires. This is the difference between “we have the files” and “this person can safely use this action.”

Readiness should be explained in business terms. A staff member trying to book needs permission for the action and the relevant patient record, a working clinic installation, valid Medplum access, current clinic policy and any required approval. A sales operator trying to enroll prospects also needs the campaign setup and tenant approval policy. One green runtime health check cannot establish all these conditions.

The source has meaningful gates: installed contract resolution, dependency readiness, input validation and scoped authority before runtime dispatch. The signed-in invoke route uses the session organization and member. The department route verifies the incoming authority through its SDK integration. A browser-supplied organization identifier or a model's “I am the owner” claim should not choose a different company's authority.

Configuration compatibility needs an actual test. The examined ClinicOS package pins named v2 snapshots; Sales uses older prerelease dependency ranges. Similar field names do not prove that today's Core and both runtimes agree on grants, schemas, responses and event wiring. The local pack test runs were blocked in part by missing dependencies, so no clean whole-suite compatibility verdict follows from this review.

A useful readiness screen would show each prerequisite separately, with an owner and remedy: connect provider, install compatible runtime, bind approval, configure service, grant member access or complete identity proof. That screen is a proposed improvement where current evidence is insufficient; this guide does not claim it already exists in that complete form.

### Engineering detail

A safe activation exercise uses a synthetic company and synthetic records. Record Core, SDK and pack versions; generate contracts; compare expected and actual runtime schema; invoke one denied read, one permitted read and one reversible controlled write; inspect output validation and status. Add a revoked-member case and a disabled-installation case. The acceptance condition is an explainable refusal as well as an authorized success.

Do not send a real campaign or create a real patient booking merely to demonstrate readiness. A reviewable activation plan names the target environment, safe provider fixture or sandbox, operation keys and cleanup. Current live installation bindings and deployed versions remain unknown in this report.

### Visual guide in the HTML edition

Readiness has several independent gates Definition Contract and implementation agree Installation Correct version for this company Services Required connections and scopes Authority Member/machine + role + resource Policy Review and clinic rules bound Evidence Synthetic invocation + outcome proof Source-based teaching model; arrows show logical dependency, not measured time.

Sources: [P03](#source-p03), [P04](#source-p04), [P12](#source-p12), [C09](#source-c09), [C29](#source-c29), [S01](#source-s01), [S04](#source-s04).

## 10. Follow a message until the business result is known

The chat turn, an action and a long-running task have different clocks and completion points.

For an existing typed conversation, the client submits a message and its available sequence context. Core verifies authentication, conversation ownership and rate limits, gathers relevant screen or spoken context and calls the conversation send path. Attachment preparation and approval-note retrieval can overlap. A new conversation also needs Eve session creation and Core registration before the first send.

Eve accepts the message and runs the conversation worker. On the business-action path, the model uses capability search to find installed, visible contracts. It then calls the durable capability-invoke tool. That workflow uses a stable native call identifier as caller request identity, loads the selected contract and any attachment handoff and invokes the governed action path.

The result can be immediate, waiting on a person or continuing through tracked work. Core's governed path can call a separate department runtime. That code can execute deterministic logic, request model decisions, read Core records or call external providers. The number of calls depends on the action. A “single tool call” in the model view can hide a long chain of network operations.

The conversation view follows Eve's log replay. A receipt means the message entered that process. First useful text means a reader has learned something relevant. A confirmed effect means the provider or relevant authority established the business result. Final completion can include later work, such as communicating a booking or settling a background task. These points must remain distinguishable in both the user interface and telemetry.

Use the step controls to walk the clinic or sales example. Failure scenarios stop at the boundary where the evidence changes. Approval pending is a legitimate waiting state. A provider timeout after dispatch is an unknown outcome until reconciled. The animation is a teaching aid based on source; it is not a recording of live traffic.

### Engineering detail

The capability-invoke workflow can open an approval card, return that waiting state to the model and post the later outcome back to the conversation. A finished model turn therefore does not imply a finished action. Likewise, an HTTP 202 indicates accepted or pending work in the relevant route, not verified completion.

Current source reads the runtime response before settlement in the examined helper. Do not assume every remote tool streams partial business results. For a latency experiment, log the branch, selected contract, stable operation identity and number of model/provider steps; a fixed diagram hop count would conceal the very variation the team needs to measure.

### Visual guide in the HTML edition

Step through a request and change the outcome Journey Clinic consultation Sales pipeline Scenario Successful path Waiting for human review Provider timeout after dispatch Authority denied A person asks for a consultation Conversation authority allows relevant public or person-specific reads; safety logic runs before a substantive answer. The worker finds an exact option Actual provider times and allowed clinic context support the choice. No booking exists yet. The person confirms the readback Identity, fresh holds and staff interference are checked; another-person requests need a suitable handover. The action crosses the authority boundary The appropriate governed staff lane or constrained patient tool uses scoped permission and validated data. The provider outcome is checked Shared booking code confirms and verifies Medplum state using a deterministic key. The system separates the remaining work The visit can be booked while confirmation, intake draft/send and clinician preparation have separate states. Step 1 of 6. Conversation authority allows relevant public or person-specific reads; safety logic runs before a substantive answer. Previous step Next step Logical source-based walkthrough. Scenario branches teach status semantics; no live request is performed.

Sources: [P24](#source-p24), [P10](#source-p10), [P27](#source-p27), [P28](#source-p28), [P29](#source-p29), [P30](#source-p30), [P08](#source-p08).

## 11. Recognize conversation, named action and tracked work

The same business can use all three lanes. Each has its own authority and recovery rules.

The **conversation lane** handles a customer or staff message. A worker reads allowed context and can use only its permitted tools. ClinicOS patient booking is a constrained tool inside this lane. Sales inbound has no business-action tools, so its appropriate outcomes are an answer or handover. Different conversations should not inherit the same power merely because both use a model.

The **named-action lane** handles an explicit business contract. It validates input, checks installation and policy, persists operation identity, handles review when required, mints scoped authority, invokes code, validates output and settles the result. Staff booking and campaign placement are examples. A preview can prepare the exact action without performing it.

The **tracked-work lane** handles a multi-step objective that outlives a single chat response. Sales sourcing toward a qualified target is an example: several rounds can discover, enrich and qualify before the reviewed placement boundary. A durable task needs a visible status, bounded cost and work limits, checkpoints and a way to reconcile external effects. It is not a license to skip the named-action gates for its steps.

Events and schedules connect these lanes without making them identical. A booking fact can wake confirmation or intake drafting. A recurring reconciliation job can compare Medplum outcome with the local operational view. Each event delivery has its own identity and authority. The responder must tolerate repeat delivery according to its effect contract.

The older Work operation fallback remains another compatibility surface within the platform. It should be taught after the main three-lane model, with exact source vocabulary available to engineers. During an incident, record which lane ran, what it was allowed to do and which record proves the outcome. “The agent did it” is too broad to support recovery.

### Engineering detail

A workflow tool is durable orchestration, while a runtime action implementation performs the domain work. Those are different durability boundaries. Stable orchestration replay identity can prevent a repeated invocation in its scope, but a provider request followed by local failure still needs provider-aware reconciliation.

Cancellation should also be defined per lane. Stopping a model's text generation is not guaranteed to stop an already-dispatched write. Revoking conversation ownership should prevent future channel actions, but a completed appointment may require a separate authorized cancellation action. Tests should prove these distinctions instead of treating a closed browser tab as a rollback.

### Visual guide in the HTML edition

Lane Who starts it What may happen Completion evidence Conversation Patient or staff message Only declared lane-specific tools Useful reply + actual action outcome Named action Explicit contract invocation Input/policy/grant/runtime/settlement Validated result or honest pending/uncertain state Tracked work Multi-step objective Bounded rounds and checkpoints Per-item effects + terminal work state Event reaction Recorded business fact Bound event responder with delivery identity Responder settlement; effect contract still applies

Sources: [P03](#source-p03), [P05](#source-p05), [P07](#source-p07), [P14](#source-p14), [P16](#source-p16), [P28](#source-p28), [P29](#source-p29), [C13](#source-c13), [S06](#source-s06), [S12](#source-s12).

## 12. The model proposes; server checks permit the action

Authority must remain valid when work actually runs, not only when a preview was created.

A safe action starts by resolving the exact installed contract. The server knows the active organization and the member or machine acting. It checks installation and dependency readiness, validates the accepted input and creates stable operation identity. If tenant policy requires review, the operation waits for the appropriate person. Permission is a sequence of code decisions, not a sentence in a prompt.

The temporary permission ticket narrows access to the action's declared dependencies. The runtime audience is tied to the installed service resolved server-side. The ticket's scopes and limits define what callbacks are available. A human identity recorded for audit does not expand those scopes. This matters when a worker acts for a powerful staff member but should still perform only one specific operation.

An exact-action review should let a person see the recipient, object, time and content that will change. Preparation and requesting review are different steps. In the older Work lane, source checks the declared preparation relationship and action digest. A changed action needs an appropriate new decision; a broad “yes” should not authorize a different patient, appointment or message.

Fresh checks remain necessary at execution. A member can lose access, an installation can be disabled, a patient can opt out or staff can take over the conversation between preview and run. ClinicOS follow-up checks current safety and outreach holds, identity and final approved content; the send can still be refused. The truthful result then says refused or pending, rather than sent.

Sales Gate 1 illustrates why documentation must cross the source/configuration boundary. The contract expects Core's tenant policy to require approval and select an approver. The placement implementation cannot prove that live policy is bound. This is an explicit verification task before using the flow for real outreach.

### Engineering detail

Synthetic negative cases should include forged organization input, a foreign record identifier, revoked membership, insufficient scope, wrong runtime audience, stale approval, changed recipient and a replayed request. The desired result is denial before effect, with a useful audit reason that does not expose the foreign record's contents.

Cache static contract descriptions when safe; keep live authority checks live. The current ability discovery cache follows this separation. An optimization that reuses yesterday's member role or suppression state can remove a network read while creating an unauthorized action. Performance acceptance therefore needs permission regression cases, not only elapsed-time comparisons.

### Visual guide in the HTML edition

Authority narrows before a write Resolve Exact installed contract Validate Actor / tenant / readiness / input Persist Stable operation identity Review Exact action when policy requires Grant Only declared dependencies Execute Recheck fresh domain conditions Settle Validate output and effect evidence Source-based teaching model; arrows show logical dependency, not measured time.

Sources: [P03](#source-p03), [P04](#source-p04), [P07](#source-p07), [P12](#source-p12), [P06](#source-p06), [C27](#source-c27), [S10](#source-s10), [S11](#source-s11).

## 13. Know which system owns each fact

References and operational mirrors help work move. They do not replace authoritative provider outcomes.

Core owns shared identity, organization authority, grant issuance and relevant channel services. ClinicOS people records reference Core contact handles and can link to a Medplum patient. Medplum owns the clinical resources and appointment outcome used by the examined clinic flow. ClinicOS Tables hold operational state, tasks, settings and progress. The company reference library supplies versioned clinic policy and education.

Sales owns its prospect, evidence and touch state in separate Tables. Smartlead owns actual campaign enrollment and delivery state. These are linked business facts, not one database transaction. A local touch says what the local system recorded; a provider receipt says what the external service accepted. Recovery compares both when they diverge.

Identity deserves its own design. Two people can share a phone or address; the same person can change an email; a prospect record and a patient contact can describe related but differently governed purposes. The current sources do not prove a shared cross-pack identity model. An explicit mapping contract should record provenance, confidence, permitted use and a correction path.

Freshness is also fact-specific. Clinic policy text can be reused against a version stamp. Current available appointments need a fresh provider decision before booking. Suppression and safety holds can change between preview and execution. A model's earlier answer or a cached person summary is not a substitute for the required current check.

The source-of-truth map below labels both ownership and copies. A copied symptom in an enquiry, a quote in a Copilot card and a transcript in Core remain potentially sensitive even when the chart itself is in Medplum. Classification follows content and use, not the friendly name of the database table.

### Engineering detail

A proposed reconciliation record should identify the operation, external resource, last confirmed provider status, local projection version and unresolved discrepancy. That permits a worker to repair an operational mirror without claiming it can roll back a remote effect by deleting a local row. Keep the original receipt or outcome evidence when updating a projection.

Acceptance examples include a same-name family case, a shared phone case, a changed contact handle and a direct provider-side appointment change. A safe system denies unproven chart attachment and eventually reconciles legitimate external changes. These tests were not run in this review and remain requirements for further validation.

### Visual guide in the HTML edition

System Owns / stores What must not be assumed Core Auth, grants, contact handles, channels, transcript services That one company role can see every record ClinicOS Tables Operational mirrors, enquiries, tasks, Copilot copies That operational means nonsensitive Medplum Clinical resources and appointment outcomes That all sensitive copies remain here Company Brain Versioned policies and reference That patient facts belong in a policy corpus Sales Tables Prospects, evidence and touches That its person ID is Core contact identity Smartlead Campaign enrollment/delivery state That local touch and remote enrollment are atomic

Sources: [P11](#source-p11), [C08](#source-c08), [C14](#source-c14), [C17](#source-c17), [C18](#source-c18), [C19](#source-c19), [C20](#source-c20), [S03](#source-s03), [S11](#source-s11).

## 14. Give people a visible place in the workflow

Human handover needs an owner, reason and next action. A notification alone is not ownership.

A clinic enquiry can move from an automated worker to staff because identity is unclear, a clinical question needs judgment, a safety hold exists or the person asks for help. Core channel ownership and an owner epoch are checked before the worker is awakened and again when it replies. That prevents an old automated turn from speaking over a newer human takeover when the checks are correctly exercised.

The staff experience should distinguish a review request from an ordinary message. A review asks an authorized person to decide on an exact action. A handover asks a person to own the conversation or task. A clinician-review item asks for clinical judgment on draft material. Combining them into one generic “approval” inbox obscures what decision is needed.

ClinicOS has screens for leads, consultations, lobby, forms, briefs, private Copilot, notes and support. Those surfaces form a working map for staff. A clear status should say what is known, what is blocked and who owns the next step. For a booked visit with an unsent form draft, the next action is staff review/send, not booking again.

Idle hand-back is a separate operational mechanism. A recurring job can return eligible inactive conversations, but inactivity must not be interpreted as permission to release a safety concern or clinical decision automatically. The current ownership and manual-hold rules need dedicated scenario testing. The existence of an idle job is not proof that every hand-back case is safe.

A faster chat response is useful only if it respects these decisions. Honest progress can say that a review request is ready or that an outcome is being reconciled. It must not imply that the person approved, the provider completed the action or the clinician signed a note when none of those things happened.

### Engineering detail

Proposed handover evidence includes reason category, conversation/operation identity, assigned role or member, ownership version, created time, due policy, last activity and a minimal safe context summary. Sensitive detail should remain behind the appropriate role rather than being copied into a broad email or notification body.

Test staff takeover while an automated response is computing, a late reply from an old epoch, a declined approval, a staff member losing a role and a patient sending more messages while staff own the conversation. The outcome should preserve ordering and ownership without making the patient repeat everything. These are validation cases rather than claims that a live installation has passed them.

### Visual guide in the HTML edition

A handover is an owned transition Reason Identity / safety / clinical judgment / request Ownership Assign person or appropriate role Context Minimal safe explanation Pause automation Epoch prevents late competing reply Human action Review, answer or repair Return safely Policy decides eligibility; inactivity alone is insufficient Source-based teaching model; arrows show logical dependency, not measured time.

Sources: [P14](#source-p14), [P07](#source-p07), [C05](#source-c05), [C06](#source-c06), [C07](#source-c07), [C16](#source-c16), [C19](#source-c19), [C20](#source-c20).

## 15. Recurring work needs fairness and recovery

A scheduled time is an intention. A recorded, verified outcome is the result.

A scheduled job becomes due, receives a claim and permission, reaches the runtime, performs work and settles its result. Core's scheduler has separate reconciliation, machine-claim, follower-recovery and due-check lanes. The source describes a one-minute cron and bounded slices, with admission stopping at 45 seconds and fairness position preserved. These are implementation controls rather than a promise of one-minute completion.

Business events are durable deliveries with identity. Event grants bind the event, delivery attempt, responder, content digest, subscription and deployment. The worker allows a bounded number of in-flight attempts per runtime within one sweep. That bound is not a universal service-wide concurrency quota; the distinction matters when estimating a deployment's total load.

The event path can wake after publication instead of waiting solely for the next sweep. A periodic sweep recovers missed wakeups. Retry and lease rules are explicit: transient event attempts have deadlines, leases and backoff; lease expiry recovers abandoned work. None of those mechanisms provides exactly-once external effects by itself.

ClinicOS reminders and reconciliation show why this matters to users. A reminder can be due but held by policy, delayed by a disconnected provider or waiting behind older work. A Medplum change can be true while the operational mirror is not yet updated. An incident view should separate scheduler lateness, queue age, runtime delay and provider failure.

A proposed long-work experience keeps the chat responsive by returning a durable receipt and letting the user follow progress. It also needs per-item outcomes, cost bounds and recovery. Moving a slow loop to a job without checkpoints merely moves the waiting out of sight. The work must remain inspectable and resumable.

### Engineering detail

The inspected event source uses ten transient attempts, 30-second attempt deadlines and 60-second leases, with backoff beginning around a minute, deterministic spreading and an hour cap. Customer channel delivery is a different lane: one turn per conversation, 20-second attempt timeout, 60-second lease and eight attempts with different backoff. Never combine these constants into one generic retry policy.

A source comment identifies serialization of unrelated subjects within one binding as a possible head-of-line boundary. Before increasing concurrency, establish the ordering the domain needs. A throughput fix that reorders cancellation and confirmation or overlaps writes to one appointment can make outcomes less reliable. Measure queue age and contention alongside raw task duration.

### Visual guide in the HTML edition

Due time and effect time are different Due / publish Schedule or event Wake / sweep Fast wake with periodic recovery Claim Lease + durable attempt identity Run Scoped runtime and provider work Settle Outcome / retry / uncertainty Recover Expired lease or reconciliation Source-based teaching model; arrows show logical dependency, not measured time.

Sources: [P14](#source-p14), [P15](#source-p15), [P16](#source-p16), [P17](#source-p17), [P18](#source-p18), [P19](#source-p19), [C07](#source-c07).

## 16. Protect each business and each person's purpose

A valid company membership is the start of access control, not the whole decision.

Business isolation means a request for one organization cannot read or change another organization's data. Core derives the organization from the authenticated session or verified scoped authority for the lane. Tenant database transactions use a restricted role and a transaction-local tenant identifier. Explicit tenant predicates remain part of the required design.

Role and resource checks then narrow access within the organization. A front-desk worker, clinician, sales operator, patient and unattended job have different purposes. A person ID or chart reference found in a model response is not evidence that the caller may read it. A shared company should not make every conversation, note or marketing record visible to every worker.

The department receives a permission ticket with an audience and scopes. It calls back only through those permitted services. The code distinguishes the human acted for from the actual authority. A machine job needs machine authority and an audit identity; it should not borrow a departed employee's session to keep running.

Isolation affects performance too. Tenant transactions must use only their passed client and keep provider network calls outside the transaction. A second owner connection can bypass the intended role and exhaust the pool; holding a transaction across slow provider traffic can create lock waits and starvation. Correct transaction boundaries are both a safety property and a latency requirement.

This review inspected controls and test source evidence. It did not prove effective access control in deployed tenants. A practical next step is a synthetic negative-case suite covering foreign records, revoked roles, disabled installations, wrong audience, stale approval and cross-contact chart access before any speed optimization reaches real clinic work.

### Engineering detail

Rate-limit subject design also affects isolation between users. The source has lane-specific subjects such as member, customer conversation, patient link and event delivery. A single tenant-wide bucket can let one active screen consume the business's entire allowance. Preserve fair limits while testing tenant and user bursts.

Do not treat prompt instructions as authorization. “Never invent an ID” and “do not act as admin” guide the model, while schema validation, live membership, resource access and scoped grants enforce the boundary. A good test makes the model attempt the forbidden operation and proves the server refuses before any provider effect.

### Visual guide in the HTML edition

Boundary Server evidence Negative case to test Company Session/grant tenant + predicates + restricted role Foreign tenant ID Member Live membership and relevant role Revoked access after preview Resource Person/contact/chart access Same-name patient or foreign record Action Contract, scope and audience Wrong runtime or undeclared service Conversation Owner + epoch + current proof Late bot reply after staff takeover Purpose Clinical/operations/marketing policy Reusing clinical context for outreach

Sources: [P04](#source-p04), [P12](#source-p12), [P13](#source-p13), [P14](#source-p14), [P07](#source-p07), [C13](#source-c13).

## 17. Map health information across the whole journey

A chart in Medplum does not mean all health-related information stays in Medplum.

The intended boundary in ClinicOS guidance separates clinical resources from operational records. The actual schemas still contain personal and potentially health-related information: names, treatment interest, enquiry reason, work-item detail and Copilot quotes. Core conversation and call transcript services hold words people said. Model prompts can process those words, and configurable tracing can capture model inputs or outputs.

The privacy map therefore includes the channel, Core, Eve/model processing, operational Tables, Medplum, Copilot copies and telemetry. A contact identifier does not make an attached symptom or treatment interest anonymous. The correct classification depends on the content, identifiers, purpose and legal context. Avoid describing an operational Table as automatically nonclinical or nonsensitive.

For a US clinic, HHS cloud guidance explains that appropriate business-associate arrangements and risk analysis matter, including when a cloud provider stores encrypted information without holding the decryption key. That is context for the review, not evidence that any particular Keemakr vendor contract exists. The actual agreements, approved services and deployment settings were not inspected.

HHS describes administrative, physical and technical safeguards under the Security Rule. A source review can inspect parts of technical behavior but cannot establish workforce procedures, contingency operations or actual access practice. HHS minimum-necessary guidance also distinguishes purposes and exceptions, including certain treatment disclosures. An engineering rule should not flatten that into a universal prohibition or a universal permission.

The proposed verification work is concrete: inventory sensitive fields and copies, map each processing service and fallback, verify role-specific reads, document retention and deletion, test redaction with synthetic markers and establish who responds to an incident. These are source-specific engineering questions. They are not a compliance verdict, and they do not replace a clinic's applicable legal and operational review.

### Engineering detail

Trace content is a particular boundary. `contentCaptureAllowed()` controls whether agent tracing records model input/output. Its presence does not prove that capture is off in production, that every exporter honors policy or that fallback providers are approved. A useful synthetic test plants a unique fake marker, exercises allowed paths and searches the permitted telemetry outputs for that marker under both settings.

Core enquiry reason and work-item detail should have explicitly approved reader roles. Copilot pause/off should prevent further eligible transcript use according to its contract. A deletion or retention process must account for copied quotes, generated drafts, provider logs and backups, not only the original chart row. The acceptance evidence should name exact configuration and version rather than saying “HIPAA ready” based on architecture alone.

### Visual guide in the HTML edition

Potentially sensitive copies cross multiple boundaries Person’s words Channel / call audio or text Conversation processing Core transcript + Eve/model context Operational copies Enquiry reason / task detail / Copilot quote Clinical resources Medplum chart / form / draft note Observability Capture depends on actual setting Retention and access Verify every copy and processing service Logical content flow from examined fields and call paths; classification and live settings require verification.

Sources: [C18](#source-c18), [C19](#source-c19), [C20](#source-c20), [C28](#source-c28), [C29](#source-c29), [W01](#source-w01), [W02](#source-w02), [W03](#source-w03).

## 18. Treat an unknown external outcome as its own state

A timeout says the caller stopped waiting. It does not say the provider did nothing.

A read can fail without changing the world. A write can fail before dispatch, be rejected by the provider, complete successfully or complete while the caller loses the response. These are different outcomes. If Smartlead accepted enrollment or Medplum confirmed a booking and the connection then broke, an automatic replay can repeat work the user already paid for or received.

Core deliberately does not classify `runtime_timeout` as a transient failure to retry blindly. The remote runtime might still execute. Work state includes `uncertain` as a separate terminal state in the examined vocabulary. This is useful honesty: the system needs reconciliation, not an invented success or an unqualified “nothing happened.”

ClinicOS booking derives a deterministic key and can look up the outcome on retry. Its deadline wrapper also distinguishes read-only work from writing work. Read-only allowlisted actions can abort before the contract deadline with an answer margin; writes deliberately run through rather than stopping between provider and local changes. That can leave Core no longer listening while a write continues, so the user-facing status still needs a recovery path.

Sales placement has a specific crash window: the remote enrollment call happens before local touch and person-status writes. Stable touch IDs help avoid repeating a recorded placement, but they do not eliminate a success that was never recorded locally. Partial batches also matter. Earlier people can already be enrolled when a later provider rejection fails the invocation.

The safe incident response asks which operation, which provider resource, which effect evidence and which local state exist. A human or reconciliation worker should repair the discrepancy before restarting the action. “Try again” is appropriate only after the action's retry contract establishes that repeating is safe.

### Engineering detail

Design a synthetic fault test at each boundary: before provider call, after provider acceptance, before local record, after local record and before reply delivery. Record the provider's count of effects independently from the application's returned status. Expected behavior is one intended effect or a visible unresolved outcome, never a duplicate hidden behind a green final answer.

Separate effect idempotency from cost idempotency. Sales can use stable Table keys while paying again for repeated enrichment lookups because its billed-call replay ledger is absent. A recovery plan should preserve completed provider stages or explicitly report the extra cost risk. A longer timeout might prevent premature abandonment, but it cannot repair a missing reconciliation contract.

### Visual guide in the HTML edition

After-write uncertainty: choose reconciliation before replay A provider may complete a write before the caller loses the response. Reconcile by operation identity before retrying. Send write operation key Provider accepts effect exists Response lost local state unclear Mark uncertain keep evidence Reconcile by key repair local view A new request is safe only after the action’s retry contract permits it.

Sources: [P20](#source-p20), [P25](#source-p25), [P26](#source-p26), [C14](#source-c14), [C21](#source-c21), [S11](#source-s11), [S20](#source-s20).

## 19. Read test evidence without turning limitations into defects

The local suites were partly blocked by missing dependencies. Their output is neither a green release nor hundreds of proven product bugs.

Research attempted `npm test` in both pack checkouts on Node 24.21.0. Sales reported 60 tests: **58 passed and two failed during test-file module loading**, with unavailable `chat` and `@keemakr/agent-sdk` dependencies. ClinicOS reported 450 tests: **69 passed and 381 reported failures**, with widespread missing-module errors including SDK dependencies. Those failures prevent a whole-suite verdict; they do not establish 381 application regressions.

Test-file counts are a different measure again. The research inventory found 389 ClinicOS test files and 61 `.case.ts` evaluation files, and 12 Sales test files. A file can contain several tests, fail before registering tests or describe cases not executed by this command. None of these counts measures a live tenant's readiness.

The platform researcher inspected relevant test source, including timeout and lease behavior, but did not run the Core suite for this report. Source presence is labeled test present. A locally executed result is labeled test run, with command, environment and limitation. Live verified would require separately observed deployment behavior; this review has no such evidence.

The next proposed validation layer uses synthetic journeys across Core, the selected SDK and each pack. Start with denial and failure cases, not only successful lookup. Include identity confusion, wrong-tenant records, revoked access, stale approvals, opt-out during placement, duplicate delivery, provider timeout after success and interrupted local bookkeeping.

A performance comparison should run only after those outcome and authority gates are sound. Record workload version, environment, sample count, input sizes, failure categories and total effect counts. Changing the model or concurrency can alter correctness even if the mean response gets shorter. A defensible result says which scenario improved and which guarantees remained tested.

### Engineering detail

A proposed evaluation matrix has four layers: pure deterministic business logic, contract/permission boundaries, provider sandbox fault injection and complete synthetic user journeys. Use real ephemeral databases for SQL properties such as uniqueness, row isolation and conflict behavior. Use provider-controlled fixtures or sandboxes for effects; a mock's return value cannot prove a provider's retry semantics.

Record failure categories separately: infrastructure setup failure, dependency load failure, assertion failure, provider fixture failure, behavioral regression and inconclusive result. Restore a reproducible dependency install before treating current suite output as a product baseline. The existing failed commands remain evidence of an environment limitation, not a reason to silently discard the test attempt.

### Visual guide in the HTML edition

Evidence state This review What it proves Implemented in source Current paths and bindings inspected Code mechanism exists in the snapshot Test present Core timeout/lease and other files inspected A test definition exists; not a passed run Test run: Sales 58 pass / 2 module-load failures Partial local result; whole suite blocked Test run: ClinicOS 69 pass / 381 reported failures, widespread imports Environment-blocked verification Live verified None in this review No deployment or tenant readiness verdict Proposed Scenarios, fixes, gates and SLO work Recommendation awaiting implementation/validation

Sources: [P26](#source-p26), [P33](#source-p33), [C29](#source-c29), [C14](#source-c14), [S11](#source-s11).

## 20. Measure what the person waits for

Server timing logs are useful. They do not establish browser-visible latency or a populated p95 dashboard.

A person starts waiting when they submit a request. Useful milestones are receipt, first meaningful visible answer, confirmed business effect and final completion. Human review wait is another clock. Measuring only the first model token misses queueing, preparation, action calls, provider work, verification and the browser's actual render.

Core hop logs split prechecks and queueing, pre-send work, Eve acceptance and replay. Eve logs split first step, first model output, first nonblank text and stop. Stable session and turn identity help join those observations, but steering an already-running turn needs care because its clock began earlier. A join that attaches the wrong turn can create a convincing but false waterfall.

The operator metrics module explicitly says its counters and histograms are discarded by a NoopMeter; the host registration has no metric readers or views, and a test pins this design. Therefore histogram declarations are not evidence of exported production distributions. The research also found stale references to an hourly rollup without an active writer in the inspected source paths. An external job remains possible but unverified.

Add browser submit, receipt, first useful content and render marks, correlated with server operation identities. Do not copy patient text into generic telemetry to achieve that correlation. Trace metadata can include lane, action key, version, status, durations, token counts and provider category using an approved sensitive-data policy.

For a real baseline, run cold and warm chat, short and long context, one read, a verified write, an approval wait, a ten-item research batch and a slow or failing provider. Compute p50, p95 and p99 from complete eligible request samples. **Never add stage p95 values to claim an end-to-end p95.** Stages overlap, and their tails do not necessarily occur on the same requests.

### Engineering detail

Proposed span boundaries are client→Core, authentication/ownership, context preparation, Eve queue/acceptance, each model step, action discovery, policy/approval, runtime round trip, provider stage, output validation, final message emission and browser paint. Parent/child context should preserve causality without storing raw sensitive content. OpenTelemetry's trace model provides the general pattern; deployment-specific export and retention still need verification.

Track failures and censored requests explicitly. A timeout is not a fast completed request; excluding it can make a broken system appear faster. Separate human wait from machine time and distinguish operation completion from the first reassuring sentence. The dashboard design and SLO thresholds in this guide are proposals until a measured baseline and product decision establish them.

### Visual guide in the HTML edition

Use four user-visible clocks Submit → receipt Was my request accepted? Submit → useful text Have I learned something relevant? Submit → effect Is the appointment/enrollment confirmed? Submit → completion Is the tracked work settled? Separate human wait How long was a decision waiting on a person? Recommended measurement semantics; no measured distributions were available.

Sources: [P09](#source-p09), [P21](#source-p21), [P22](#source-p22), [P31](#source-p31), [P32](#source-p32), [P33](#source-p33), [P34](#source-p34), [W05](#source-w05).

## 21. Use a critical-path model to understand delay

The editable numbers are hypothetical teaching inputs. They are not measurements or forecasts.

A request often mixes serial and parallel work. If settings and person lookup are independent, their shared elapsed time is approximately the slower branch plus scheduling overhead. If a provider lookup requires a person ID from an earlier step, those stages remain serial. Making every box parallel is as misleading as adding every box when some already overlap.

The simulator below separates intake, two context branches, model action selection, tool/provider work, verification and final delivery. It compares a fully serial context assumption with overlapping the two independent context branches. Every starting value is invented for teaching. Changing an input updates the arithmetic; it does not predict what Keemakr production would save.

A human approval wait is displayed separately in minutes. Machine completion time includes the configured computation and network work; wall time adds the illustrative human wait. This distinction prevents the team from blaming the model for an approval that sat in a person's inbox. It also shows why an instant receipt is not the same as a finished booking.

For real chat, a single tool/provider box should be expanded into the actual dependency chain. Core can call the department runtime; the runtime can call back for Tables, Brain or a brokered service; a provider can trigger additional model or verification work. There is no source basis for a universal two-hop or two-model formula.

Use the model to choose an experiment. If context dominates, inspect repeated reads and safe versioned caching. If tool work dominates, inspect provider duration, sequential callbacks and per-item loops. If first text dominates but completion is unchanged, examine the useful-answer policy and progress presentation. The next chapter connects these ideas to source-specific scenarios.

### Engineering detail

For two independent branches A and B, serial time is A+B and ideal overlap time is max(A,B). Actual overlap also includes dispatch, contention and joining costs, so the calculator is intentionally a simplified model. Bounded concurrency across many items is limited by quotas, shared resources and dependent stages. It is not equivalent to dividing total time by the number of workers.

Percentiles need joint request observations. For example, a database tail and provider tail can occur in different samples, so summing their p95 values invents a request that might not exist. Keep complete per-request traces, report sample count and failures and compare the same scenario under the same environment before drawing a conclusion.

### Visual guide in the HTML edition

Hypothetical latency calculator, milliseconds Teaching assumptions only. No value below is a production observation, target or predicted saving. Intake and prechecks (ms) Context branch A (ms) Context branch B (ms) Model action selection (ms) Tool and provider work (ms) Outcome verification (ms) Final useful answer and delivery (ms) Human review wait (minutes) Reset assumptions Serial context: 4,750 ms. Overlapped context: 4,350 ms. Hypothetical arithmetic difference: 400 ms. Human wait: 0 minutes. Serial = intake + A + B + model + tool + verification + output. Overlap replaces A+B with max(A,B). Wall time adds human minutes × 60,000. These are simplified single-request values, not percentiles.

Sources: [P10](#source-p10), [P30](#source-p30), [C12](#source-c12), [S08](#source-s08), [S18](#source-s18), [W04](#source-w04), [W05](#source-w05).

## 22. Investigate chat and tool scenarios separately

The same visible pause can come from context, discovery, provider work, safety or a deliberate answer policy.

**A simple staff question** can involve authentication, screen context, Eve queueing and model generation even without a provider write. Measure cold versus warm execution and retained context before choosing a remedy. The chat route's 300-second maximum is a hosting budget and function-grouping choice, not the expected response duration.

**A long ongoing conversation** can repeatedly carry substantial history and tool output. Current agent configuration enables compaction around a fraction of the large context window, removes old direct tool output and summarizes older turns. Smaller context is a candidate latency and cost improvement, but it can lose exact names, previous choices or commitments. Evaluate recall before changing the threshold.

**A named-action lookup** includes discovery and readiness. The older ability descriptor cache already shares a promise for one minute by tenant, installation, version and runtime, while live access checks stay outside it. Repeated model search/read loops can still add delay. The discovery tool instructions explicitly discourage that behavior. Measure actual loop count and selected-contract stability rather than assuming the cache fixes the whole path.

**A clinic patient turn** includes safety screening and clinic context. Existing code overlaps some settings, Brain version and person reads and reuses content when the version is unchanged. Fresh safety holds remain required before booking. Hedged decisions can race schema-valid model results under fixed deadlines, at extra cost and concurrency. Those mechanisms are implemented, but their current tail benefit has not been benchmarked here.

**A sales enrichment batch** contains sequential practice processing, provider stages and row callbacks. Independent practices are candidates for bounded concurrency and checkpointing. Provider rate limits, paid-call replay and partial outcomes constrain the design. Large batches should expose tracked progress instead of keeping a chat turn silently blocked until every item finishes.

**A delayed first useful answer** can be an intentional product behavior. Main operator instructions prohibit filler and ask for tools before confirmed answers. Honest progress should be a separate status event, such as “review request ready,” not a fabricated business result. Measure first useful content and verified outcome together so a cosmetic typing improvement does not masquerade as faster work.

### Engineering detail

Capability timeout defaults are 60 seconds, with fixed or per-item policies and a default 280-second clamp beneath the 300-second route. Older Work operations use another budget, and channel delivery has its own attempt deadline. Increasing these values can reduce premature abandonment but cannot reduce the work itself. A child service's 55-second forwarding deadline also does not override Core's 20-second channel attempt boundary.

A proposed experiment sheet records hypothesis, source mechanism, scenario, fixed versions, trace fields, correctness gate, latency metric, cost metric and rollback trigger. Run one change at a time: independent-read overlap, bounded practice concurrency, deterministic lookup path, context compaction adjustment or progress status. Keep failed and uncertain outcomes in the denominator and report them separately.

### Visual guide in the HTML edition

Observed mechanism Investigate Candidate change, not measured saving Long retained context Input tokens / cache / recall quality Bounded context with recall evaluation Repeated action search Model/tool step count Resolve once and reuse the exact contract Sequential Sales practice loop Per-item/provider spans Bounded independent-item concurrency Clinic safety and person reads Critical path / freshness Overlap independent reads; fresh booking check Runtime timeout Remote effect and reconciliation Tracked uncertain state; no blind retry No early filler First useful content vs completion Explicit truthful status events

Sources: [P06](#source-p06), [P08](#source-p08), [P23](#source-p23), [P24](#source-p24), [P25](#source-p25), [P27](#source-p27), [P34](#source-p34), [C10](#source-c10), [C12](#source-c12), [C13](#source-c13), [C21](#source-c21), [C23](#source-c23), [C24](#source-c24), [C25](#source-c25), [S08](#source-s08), [S18](#source-s18).

## 23. Optimize the measured bottleneck while preserving trust

Reliability is the gate. Speed changes should keep identity, permission and outcome evidence intact.

The first proposed improvement is an end-to-end baseline, not a model swap. Correlate client-visible milestones with Core, Eve, department and provider spans. Confirm the actual deployment regions and versions, selected model route and reference-store backend. Without those facts, a slow tool might be a database pool wait, cross-region callback, provider queue or repeated orchestration loop.

Then remove unnecessary serial work. Overlap independent reads, use batch interfaces where available, reuse versioned reference content and reduce redundant discovery. Keep current consent, membership, safety and exact-action checks fresh. Optimize a deterministic operation directly when no model judgment is needed; do not ask a model to mediate a form save merely for architectural uniformity.

For Sales, add correct pagination and aggregates before trusting pipeline counts. Checkpoint provider stages and per-item outcomes so a later failure does not repeat successful paid research. Introduce bounded concurrency across independent practices with rate and cost controls. Campaign placement needs reconciliation of remote enrollment versus local touches before higher throughput makes its crash window more frequent.

For ClinicOS, preserve the shared booking core, verify its duplicate and ambiguous-outcome behavior and make unfinished downstream work visible. Cache stable policy by version; retain fresh booking, identity and safety checks. Review the hardcoded read-only deadline allowlist as a maintainability issue, while preserving the difference between abortable reads and writes that must settle safely.

Presentation also matters. A clear accepted receipt, pending-review state and tracked progress reduce confusion without claiming faster provider completion. The guide proposes this as product work where needed. The current operator's no-filler instruction should be changed only with an explicit useful-status contract and validation, not by encouraging the model to improvise reassurance.

Every optimization needs a reversal condition. Roll back if unauthorized attempts succeed, duplicates appear, sensitive telemetry grows, stale decisions are used or task quality drops beyond the agreed bound. Faster median text alone is not enough to pass a reliability-first release gate.

### Engineering detail

General performance guidance from OpenAI supports reducing model work and sequential requests and streaming useful output. OpenTelemetry explains correlated traces, and PostgreSQL documents locking behavior. These are engineering principles, not proof of a particular saving in this codebase. Source-specific experiments should state which principle applies and which observed span it targets.

Voice is secondary to the requested chat/tool focus but illustrates another boundary. New member live voice uses direct browser WebRTC with an expiring secret and asks the workspace Operator for substantive work; business voice uses a distinct LiveKit lane. Quick-answer helper support is not carried into the new mint route. Do not combine their latency or privacy claims into one path, and do not assume the default-off member feature is enabled for every organization.

### Visual guide in the HTML edition

A latency experiment passes through reliability gates Baseline Trace one scenario end to end Hypothesis Name dominant observed span Change One bounded modification Trust gate No permission, quality or duplicate regression Compare Same workload + cost + failures Release / reverse Owner, threshold and recovery plan Recommended experiment design; no speedup is claimed.

Sources: [P22](#source-p22), [P26](#source-p26), [P31](#source-p31), [P35](#source-p35), [P36](#source-p36), [P37](#source-p37), [P38](#source-p38), [P39](#source-p39), [C14](#source-c14), [C21](#source-c21), [S11](#source-s11), [S15](#source-s15), [S16](#source-s16), [S20](#source-s20), [W04](#source-w04), [W05](#source-w05), [W06](#source-w06).

## 24. Turn gaps into gated work with evidence

This is a proposed dependency plan, not a committed schedule or a set of already-created tickets.

The first gate is a trustworthy baseline of the actual system. Record deployed Core, SDK and department versions, installation policy, provider bindings and data processing routes. Restore reproducible dependency installation and rerun the blocked suites. Confirm the intended human approval binding for campaign placement and the clinical role boundaries for sensitive reads. A versioned topology and permission inventory should be reviewable by someone who did not build it.

The next gate is truthful business outcomes. Exercise booking and enrollment across rejection, timeout, provider success followed by local failure, duplicate delivery and interruption. Add reconciliation evidence and per-item progress where needed. Close the conversion responder and routing gap before promising attribution. Correct the first-page count and list behavior before using pipeline totals for business decisions.

The privacy gate runs alongside reliability. Inventory every sensitive field and copy, processing vendor, fallback, trace content setting and retention path. Verify applicable agreements and operational responsibilities outside source. Review ClinicOS's six-month enquiry-email consent rule, which carries Canadian assumptions, against the chosen US operating policy. Do not equate marketing permission with clinical intake consent or HIPAA authorization.

Only after those gates are clear should the team tune measured chat and tool latency. Establish browser-to-outcome traces, pick the dominant scenario and test one change at a time. Candidate work includes bounded parallel practice processing, batch reads, versioned context reuse, deterministic actions and recoverable long-work presentation. Acceptance combines latency, correctness, isolation, duplicate-effect counts and cost.

Generalization comes after an honest account of current scope. Separate aesthetic-specific rules from the reusable Sales engine, define cross-department identity mapping and document how a new business department declares work. Owners in the register are suggested roles, not assigned people. Dependencies matter more than invented dates: a concurrency change depends on safe retries and usable telemetry, not on an arbitrary week number.

The filterable register names each issue type and consequence. Confirmed source defects, design risks, missing verification and proposed features are deliberately separate. A missing deployment observation is not an application bug; an unimplemented conversion write is not merely an unknown performance risk.

### Engineering detail

For a new developer, follow this source-reading recipe before adding behavior. Open authored `kee.project.ts`; inspect generated `entry.json`; find a nearby capability contract and its implementation; follow `capabilities/implementations.ts`; inspect relevant schemas, agent instructions, app requirements, UI registry, event registry and tests. ClinicOS guidance keeps contracts free from implementation/runtime imports. Use synthetic fixtures.

A safe learning exercise is a synthetic read action that returns a small allowed operational count. First write its business sentence, input/output shape, reader role and tenant boundary. Put the contract beside peer capabilities, keep the deterministic implementation separate, bind it in the implementation registry and expose it through the authored manifest/generation path. Add a permitted synthetic case and a foreign-tenant/insufficient-role denial case. Inspect generated output and SDK compatibility before a controlled invocation. This is a conceptual onboarding recipe, not a claim that code, builds or deployment were completed by this report.

For senior review, ask where the effect becomes irreversible, which record proves it, who can override policy, how authority is refreshed, how partial work resumes and how traces avoid sensitive content. Require a rollback or forward-repair plan for each change. A source-only rollback cannot undo an already-sent campaign or patient communication.

### Visual guide in the HTML edition

Proposed dependency roadmap: no committed dates 1. Establish the baseline Versions, compatible contracts, actual policy bindings and full data flow. 2. Prove authorized outcomes Fault-test writes, exact review, identity and staff ownership. Repair attribution and pagination. 3. Measure chat and tools Client-visible milestones joined with safe server, pack and provider traces. 4. Improve the dominant wait One experiment at a time; checkpoints and bounded concurrency under trust gates. 5. Generalize what is sound Explicit domain policy, onboarding contracts and cross-department identity rules. 1. Establish the baseline: Versions, compatible contracts, actual policy bindings and full data flow. Related gaps: R02, R03, R04, R07, R15. These gates can overlap where independent. Reliability/privacy gates precede performance release decisions. Suggested role ownership needs explicit assignment.

Sources: [P03](#source-p03), [P12](#source-p12), [P26](#source-p26), [P31](#source-p31), [C29](#source-c29), [C14](#source-c14), [C26](#source-c26), [C28](#source-c28), [S10](#source-s10), [S11](#source-s11), [S14](#source-s14), [S15](#source-s15), [S16](#source-s16), [S17](#source-s17).

## Proposed gap register

### R01. Unknown external effect

Priority: High. Type: Design risk. Area: ClinicOS / Sales.

Trigger: A write succeeds remotely and response/local bookkeeping fails.

Proposed remedy: Reconcile by stable operation/provider identity; preserve per-item progress.

Acceptance: Fault injection after provider acceptance yields one intended effect or a visible unresolved state.

Suggested owner: Platform + pack engineers. Dependency: Baseline versions.

Recovery: Disable automatic write replay; repair from receipts.

Sources: P26 C14 S11.

### R02. Placement approval binding

Priority: High. Type: Missing verification. Area: Sales.

Trigger: A plan says Gate 1, but effective Core tenant policy was not inspected.

Proposed remedy: Verify approval_required and approver binding for the installed action.

Acceptance: Synthetic denied, pending, approved and stale-review cases enforce the exact action server-side.

Suggested owner: Platform operator. Dependency: Compatible install.

Recovery: Disable placement until binding is proved.

Sources: S10 S11.

### R03. Sensitive-data boundary

Priority: High. Type: Missing verification. Area: ClinicOS.

Trigger: Enquiry reason, tasks, transcript and Copilot copies can contain health information.

Proposed remedy: Inventory copies, reader roles, processing routes, capture and retention.

Acceptance: Synthetic marker and foreign-role tests show only policy-approved copies and access.

Suggested owner: Security + clinic operator. Dependency: Data flow inventory.

Recovery: Disable unapproved capture/routes; restrict affected reads.

Sources: C18 C19 C20 C28.

### R04. US operating consent policy

Priority: High. Type: Missing verification. Area: ClinicOS.

Trigger: Six-month enquiry email rule carries Canadian assumptions.

Proposed remedy: Review policy for US use; distinguish marketing permission, intake and HIPAA decisions.

Acceptance: Documented policy version drives tests for opt-out, channel and fresh-send refusal.

Suggested owner: Product + qualified policy owner. Dependency: Jurisdiction decision.

Recovery: Disable affected automated follow-up pending review.

Sources: C26 C27.

### R05. Conversion attribution stub

Priority: Medium. Type: Confirmed source defect. Area: Sales.

Trigger: checkout-paid returns a boolean without a conversion write; responder not wired.

Proposed remedy: Implement idempotent conversion touch and verified event binding.

Acceptance: Synthetic payment event writes one touch; duplicate delivery does not repeat it.

Suggested owner: Sales engineer. Dependency: Provider event contract.

Recovery: Disable binding; retain event receipts for replay after repair.

Sources: S14 S01.

### R06. First-page counts and lists

Priority: Medium. Type: Confirmed source defect. Area: Sales.

Trigger: 200-row caps can create partial breakdowns or incomplete totals.

Proposed remedy: Use correct pagination or server aggregates with explicit continuation semantics.

Acceptance: More-than-200 synthetic rows preserve total, filters and complete continuation.

Suggested owner: Sales engineer. Dependency: Queryable schema.

Recovery: Return clearly labeled partial results until fixed.

Sources: S15 S16 S09.

### R07. Compatible reproducible suites

Priority: High. Type: Missing verification. Area: Both packs.

Trigger: Missing dependencies prevented whole-suite validation.

Proposed remedy: Install pinned compatible dependencies and run contracts with Core.

Acceptance: Clean environment reproduces generation, relevant tests and synthetic deny/success paths.

Suggested owner: Pack maintainers. Dependency: Package access.

Recovery: Retain prior known compatible version; stop rollout.

Sources: C29 S01.

### R08. Browser-to-outcome visibility

Priority: Medium. Type: Missing verification. Area: Core.

Trigger: Hop logs stop short of browser paint; metric definitions are no-op.

Proposed remedy: Add content-safe correlated client/server/pack/provider evidence.

Acceptance: Another developer follows one synthetic request through receipt, useful render and effect.

Suggested owner: Platform observability. Dependency: Stable IDs.

Recovery: Remove faulty exporter/marks while retaining safe logs.

Sources: P09 P21 P31 P32.

### R09. Repeated paid enrichment

Priority: Medium. Type: Design risk. Area: Sales.

Trigger: Stable writes do not preserve billed provider-call replay state.

Proposed remedy: Checkpoint successful provider stages and define paid-call replay policy.

Acceptance: Interrupted run resumes without repeating completed paid stages where provider contract permits.

Suggested owner: Sales engineer. Dependency: R01 + provider receipts.

Recovery: Reduce batch size; require explicit restart decision.

Sources: S20 S08.

### R10. Rules override provenance

Priority: Medium. Type: Design risk. Area: Sales.

Trigger: Action-supplied book can override tenant Brain reference.

Proposed remedy: Restrict override authority and pin reviewed rules version.

Acceptance: Execution shows the same allowed rules digest reviewed by the approver.

Suggested owner: Platform + Sales. Dependency: Policy design.

Recovery: Reject overrides; use approved tenant reference.

Sources: S19 S10.

### R11. Bounded batch concurrency

Priority: Medium. Type: Proposed improvement. Area: Sales.

Trigger: Sequential practices and callbacks can extend tool waiting.

Proposed remedy: Overlap independent work with rate, cost and checkpoint limits.

Acceptance: Same synthetic workload improves measured duration while R01/R02 and cost gates pass.

Suggested owner: Sales engineer. Dependency: R01 + R08 + R09.

Recovery: Return to one worker per loop.

Sources: S18 S08 S09.

### R12. Deadline metadata drift

Priority: Medium. Type: Design risk. Area: ClinicOS.

Trigger: Read-only actions are hardcoded; writes may outlive listener.

Proposed remedy: Review effect metadata and outcome-following contract.

Acceptance: Each action is classified; read abort and write-settlement scenarios remain truthful.

Suggested owner: ClinicOS + platform. Dependency: R01.

Recovery: Keep conservative write behavior; surface uncertainty.

Sources: C21 P25 P26.

### R13. Documentation and rollup drift

Priority: Medium. Type: Missing verification. Area: Core.

Trigger: Current Eve replay differs from old Core-turn prose; rollup writer unverified.

Proposed remedy: Update owning docs and verify actual deployed telemetry writers.

Acceptance: Every current architecture arrow and dashboard claim has an owning source and live evidence status.

Suggested owner: Platform maintainer. Dependency: Deployment inventory.

Recovery: Remove unsupported operational claims.

Sources: P08 P09 P31.

### R14. General-purpose Sales engine

Priority: Medium. Type: Proposed improvement. Area: Sales.

Trigger: Segments, titles and schemas remain aesthetic-specific.

Proposed remedy: Separate domain policy/config from reusable pipeline mechanics.

Acceptance: Two synthetic business domains use explicit schemas/rules without hidden aesthetic defaults.

Suggested owner: Product + Sales. Dependency: R06 + stable contracts.

Recovery: Keep clearly labeled aesthetic department.

Sources: S17 S18 S03.

### R15. Cross-department identity

Priority: High. Type: Missing verification. Area: Both packs.

Trigger: Sales person IDs and ClinicOS Core-contact references are not one proven identity model.

Proposed remedy: Define mapping, purpose, provenance and correction rules before reuse.

Acceptance: Shared-name/handle cases do not attach chart or marketing permission without explicit evidence.

Suggested owner: Platform + domain owners. Dependency: R03 + policy decisions.

Recovery: Keep data purposes and identities separate.

Sources: S03 C17.

### R16. Safe staff takeover and return

Priority: Medium. Type: Missing verification. Area: ClinicOS.

Trigger: Idle return and late automated replies interact with clinical/safety ownership.

Proposed remedy: Fault-test ownership epochs, holds and hand-back policy.

Acceptance: Late bot response is refused; unresolved clinical/safety hold stays owned.

Suggested owner: ClinicOS + operations. Dependency: Stable synthetic channel setup.

Recovery: Manual ownership; disable automatic return for affected cases.

Sources: P14 C07 C24.

## Source library

<a id="source-p01"></a>

### P01. Reusable business department specification

[Reusable business department specification](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/packs/spec.ts#L1-L121)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/packs/spec.ts:1-121`

<a id="source-p02"></a>

### P02. Installed action search and readiness

[Installed action search and readiness](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-search.ts#L1-L57)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/marketplace/capability-search.ts:1-57`

<a id="source-p03"></a>

### P03. Governed action execution sequence

[Governed action execution sequence](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-invoke.ts#L1-L36)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/marketplace/capability-invoke.ts:1-36`

<a id="source-p04"></a>

### P04. Session organization and pending approval response

[Session organization and pending approval response](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/app/api/capabilities/[slug]/[key]/invoke/route.ts#L1-L89)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/app/api/capabilities/[slug]/[key]/invoke/route.ts:1-89`

<a id="source-p05"></a>

### P05. Older operation fallback

[Older operation fallback](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/tools/pack-operation.ts#L5-L30)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`agent/tools/pack-operation.ts:5-30`

<a id="source-p06"></a>

### P06. Cached ability descriptions

[Cached ability descriptions](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/work/abilities.ts#L17-L120)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/work/abilities.ts:17-120`

<a id="source-p07"></a>

### P07. Operation preparation and live checks

[Operation preparation and live checks](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/work/operations.ts#L20-L143)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/work/operations.ts:20-143`

<a id="source-p08"></a>

### P08. Current Eve replay and context compaction

[Current Eve replay and context compaction](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/agent.ts#L4-L28)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`agent/agent.ts:4-28`

<a id="source-p09"></a>

### P09. Core chat hop logs

[Core chat hop logs](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/turn-hops.ts#L1-L49)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/operator/turn-hops.ts:1-49`

<a id="source-p10"></a>

### P10. Session registration, receipt and replay

[Session registration, receipt and replay](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/eve-conversation.ts#L240-L301)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/operator/eve-conversation.ts:240-301`

<a id="source-p11"></a>

### P11. Revisioned Brain store selection

[Revisioned Brain store selection](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/brain/store.ts#L467-L511)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/brain/store.ts:467-511`

<a id="source-p12"></a>

### P12. Grant identity, audience and scopes

[Grant identity, audience and scopes](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/capability/server.ts#L1-L55)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/capability/server.ts:1-55`

<a id="source-p13"></a>

### P13. Tenant-scoped restricted transaction

[Tenant-scoped restricted transaction](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/db.ts#L329-L359)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/db.ts:329-359`

<a id="source-p14"></a>

### P14. Customer channel ownership, lease and retries

[Customer channel ownership, lease and retries](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/channels/dispatch.ts#L1-L84)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/channels/dispatch.ts:1-84`

<a id="source-p15"></a>

### P15. Event worker per-sweep bound

[Event worker per-sweep bound](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/events/worker.ts#L20-L25)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/events/worker.ts:20-25`

<a id="source-p16"></a>

### P16. Event retry lease is not exactly once

[Event retry lease is not exactly once](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/events/delivery.ts#L6-L15)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/events/delivery.ts:6-15`

<a id="source-p17"></a>

### P17. Event retry constants

[Event retry constants](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/events/delivery.ts#L292-L296)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/events/delivery.ts:292-296`

<a id="source-p18"></a>

### P18. After-response event wake and sweep

[After-response event wake and sweep](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/events/wake.ts#L1-L26)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/events/wake.ts:1-26`

<a id="source-p19"></a>

### P19. Scheduler fair bounded lanes

[Scheduler fair bounded lanes](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/scheduler/tick.ts#L1-L50)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/scheduler/tick.ts:1-50`

<a id="source-p20"></a>

### P20. Explicit uncertain work state

[Explicit uncertain work state](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/work/state.ts#L1-L5)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/work/state.ts:1-5`

<a id="source-p21"></a>

### P21. Eve first output and text logs

[Eve first output and text logs](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/hooks/turn-hops.ts#L36-L83)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`agent/hooks/turn-hops.ts:36-83`

<a id="source-p22"></a>

### P22. Database checkout and event-loop observation

[Database checkout and event-loop observation](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/db.ts#L9-L47)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/db.ts:9-47`

<a id="source-p23"></a>

### P23. Central model routing

[Central model routing](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/model.ts#L75-L135)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/model.ts:75-135`

<a id="source-p24"></a>

### P24. Typed chat prechecks and function budget

[Typed chat prechecks and function budget](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/app/api/operator/conversations/[id]/turns/route.ts#L14-L65)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/app/api/operator/conversations/[id]/turns/route.ts:14-65`

<a id="source-p25"></a>

### P25. Action timeout budget

[Action timeout budget](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-timeout.ts#L1-L45)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/marketplace/capability-timeout.ts:1-45`

<a id="source-p26"></a>

### P26. Ambiguous timeout deliberately not retried

[Ambiguous timeout deliberately not retried](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-invoke.ts#L2517-L2524)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/marketplace/capability-invoke.ts:2517-2524`

<a id="source-p27"></a>

### P27. Capability discovery tool

[Capability discovery tool](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/tools/capability-search.ts#L23-L81)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`agent/tools/capability-search.ts:23-81`

<a id="source-p28"></a>

### P28. Durable invoke tool stable call ID

[Durable invoke tool stable call ID](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/tools/capability-invoke.ts#L209-L229)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`agent/tools/capability-invoke.ts:209-229`

<a id="source-p29"></a>

### P29. Workflow invocation result branches

[Workflow invocation result branches](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/workflows/capability-steps.ts#L4-L61)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/workflows/capability-steps.ts:4-61`

<a id="source-p30"></a>

### P30. Remote runtime response and settlement

[Remote runtime response and settlement](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/marketplace/capability-invoke.ts#L2330-L2352)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/marketplace/capability-invoke.ts:2330-2352`

<a id="source-p31"></a>

### P31. Operator meters are discarded

[Operator meters are discarded](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/operator/telemetry.ts#L1-L32)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/operator/telemetry.ts:1-32`

<a id="source-p32"></a>

### P32. Host telemetry has no metric readers

[Host telemetry has no metric readers](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/packages/observability/src/host.ts#L120-L135)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`packages/observability/src/host.ts:120-135`

<a id="source-p33"></a>

### P33. No-op metric wiring test

[No-op metric wiring test](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/tests/observability/metrics-wiring.test.ts#L1-L37)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`tests/observability/metrics-wiring.test.ts:1-37`

<a id="source-p34"></a>

### P34. Answer confirmed outcomes, no filler

[Answer confirmed outcomes, no filler](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/agent/instructions.md#L1-L15)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`agent/instructions.md:1-15`

<a id="source-p35"></a>

### P35. Member voice mint route and missing quick answers

[Member voice mint route and missing quick answers](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/app/api/voice/realtime-session/route.ts#L1-L9)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/app/api/voice/realtime-session/route.ts:1-9`

<a id="source-p36"></a>

### P36. Member voice configuration and secret lifetime

[Member voice configuration and secret lifetime](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/voice/realtime.ts#L73-L123)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/voice/realtime.ts:73-123`

<a id="source-p37"></a>

### P37. External business voice call lane

[External business voice call lane](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/voice/calls.ts#L1-L54)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/voice/calls.ts:1-54`

<a id="source-p38"></a>

### P38. Voice proof and ownership

[Voice proof and ownership](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/voice/call-chat.ts#L92-L122)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/voice/call-chat.ts:92-122`

<a id="source-p39"></a>

### P39. Organization voice flag

[Organization voice flag](https://github.com/fsztpartners/keemakr/blob/b5f3402e71a983cecb12061511eb88714cdd1ba4/src/lib/voice/enabled.ts#L1-L25)

Keemakr v2 snapshot `b5f3402e71a983cecb12061511eb88714cdd1ba4`.

`src/lib/voice/enabled.ts:1-25`

<a id="source-c01"></a>

### C01. ClinicOS authored department manifest

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/kee.project.ts:1-79`

<a id="source-c02"></a>

### C02. 35 action implementation bindings

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/capabilities/implementations.ts:3-40`

<a id="source-c03"></a>

### C03. Two inbound agent declarations

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/agents/index.ts:22-106`

<a id="source-c04"></a>

### C04. Operational table registry

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/packages/schemas/tables.ts:497`

<a id="source-c05"></a>

### C05. 30 registered screen IDs

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/ui/screen-registry.ts:2-64`

<a id="source-c06"></a>

### C06. 14 event handler bindings

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/handlers/events/index.ts:3-18`

<a id="source-c07"></a>

### C07. Recurring work registry

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/jobs/index.ts:1-14`

<a id="source-c08"></a>

### C08. Medplum connection requirements

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/apps/requirements.ts:1-31`

<a id="source-c09"></a>

### C09. Scoped staff action invoke route

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/app/capabilities/[key]/invoke/route.ts:1-55`

<a id="source-c10"></a>

### C10. Inbound channel forwarding deadline

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/app/channels/v1/deliver/route.ts:1-38`

<a id="source-c11"></a>

### C11. Early conversation dispatch and safety

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/channels/inbound.ts:1-90`

<a id="source-c12"></a>

### C12. Parallel clinic settings and versioned cache

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/lib/clinic.ts:76-117`

<a id="source-c13"></a>

### C13. Patient booking evidence and fresh holds

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/tools/book.ts:29-80`

<a id="source-c14"></a>

### C14. Shared deterministic verified booking

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/packages/booking/book.ts:1-166`

<a id="source-c15"></a>

### C15. Staff booking preview and override

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/capabilities/book/implementation.ts:19-81`

<a id="source-c16"></a>

### C16. Copilot pause, private suggestions and controls

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/packages/copilot/controls.ts:1-56`

<a id="source-c17"></a>

### C17. Contact directory references

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/packages/records/people.ts:1-75`

<a id="source-c18"></a>

### C18. Enquiry sensitive free text

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/packages/schemas/tables.ts:85-124`

<a id="source-c19"></a>

### C19. Work item detail fields

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/packages/schemas/tables.ts:243-272`

<a id="source-c20"></a>

### C20. Copilot quote detail and transcript references

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/packages/schemas/tables.ts:429-495`

<a id="source-c21"></a>

### C21. Read deadline versus write completion

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/packages/runtime/deadline.ts:1-39`

<a id="source-c22"></a>

### C22. Bounded 429 wait and retries

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/packages/runtime/kee.ts:116-157`

<a id="source-c23"></a>

### C23. Hedged model decisions

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/packages/runtime/decide.ts:8-99`

<a id="source-c24"></a>

### C24. Safety screen dependencies and fallback

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/lib/safety-screen.ts:26-96`

<a id="source-c25"></a>

### C25. Conservative safety-hold cache

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/agents/concierge/agent/lib/safety-hold.ts:452-453`

<a id="source-c26"></a>

### C26. Marketing permission rule and evidence

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/packages/records/marketing-consent.ts:1-58`

<a id="source-c27"></a>

### C27. Follow-up exact action and fresh send checks

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/capabilities/follow-up/implementation.ts:18-112`

<a id="source-c28"></a>

### C28. Configurable trace content capture

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/packages/runtime/agent-otel.ts:1-14`

<a id="source-c29"></a>

### C29. Clinic source boundaries and synthetic fixtures

ClinicOS snapshot `eb6043f2669d671ca701581478c2d6872ded4d0a`.

`/Users/sobingt/projects/covalify/clinicos/AGENTS.md:1-19`

<a id="source-s01"></a>

### S01. Sales authored manifest and missing event handlers

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/kee.project.ts:35-109`

<a id="source-s02"></a>

### S02. Eight bound actions

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/capabilities/implementations.ts:3-12`

<a id="source-s03"></a>

### S03. Four prospect evidence and touch tables

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/packages/schemas/tables.ts:1-87`

<a id="source-s04"></a>

### S04. Provider dependency requirements

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/apps/requirements.ts:1-44`

<a id="source-s05"></a>

### S05. Tenant rules book paths and parser

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/packages/sales-rules/book.ts:1-27`

<a id="source-s06"></a>

### S06. Tracked qualified target starter

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/agents/sales/agent/tools/start_brief.ts:6-47`

<a id="source-s07"></a>

### S07. Real Apollo source implementation

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/capabilities/practices-source/implementation.ts:1-66`

<a id="source-s08"></a>

### S08. Apollo Hunter Firecrawl enrichment waterfall

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/packages/enrich/waterfall.ts:71-137`

<a id="source-s09"></a>

### S09. Qualification capped reads and writes

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/capabilities/leads-qualify/implementation.ts:18-62`

<a id="source-s10"></a>

### S10. Gate 1 requires tenant policy binding

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/capabilities/campaign-place/capability.ts:7-15`

<a id="source-s11"></a>

### S11. Campaign placement suppression and crash window

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/capabilities/campaign-place/implementation.ts:15-61`

<a id="source-s12"></a>

### S12. Inbound no-tool instructions

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/agents/sales-inbound/agent/instructions.md:1-5`

<a id="source-s13"></a>

### S13. Inbound queue nonstreaming adapter

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/agents/sales-inbound/agent/channels/core.ts:1-32`

<a id="source-s14"></a>

### S14. Conversion event handler stub

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/handlers/events/checkout-paid.ts:36-43`

<a id="source-s15"></a>

### S15. First-page pipeline status counts

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/agents/sales/agent/tools/pipeline_status.ts:11-17`

<a id="source-s16"></a>

### S16. List first-page filtering and incomplete total

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/capabilities/leads-list/implementation.ts:15-23`

<a id="source-s17"></a>

### S17. Aesthetic segmentation

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/packages/sales-rules/segment.ts:64-96`

<a id="source-s18"></a>

### S18. Enrichment budget, titles and sequential loop

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/capabilities/practice-enrich/implementation.ts:20-65`

<a id="source-s19"></a>

### S19. Input rules book overrides Brain

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/packages/runtime/book.ts:25-40`

<a id="source-s20"></a>

### S20. Billed lookup replay ledger absent

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/packages/enrich/run.ts:1-55`

<a id="source-s21"></a>

### S21. Real engagement action

Sales snapshot `147eff267d6fe236ad84879ffcd354a31afcb9a6`.

`/Users/sobingt/projects/sales/capabilities/engagement-record/implementation.ts:13-41`

<a id="source-w01"></a>

### W01. HHS cloud computing guidance

[HHS cloud computing guidance](https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html)

Primary web source.

<a id="source-w02"></a>

### W02. HHS Security Rule summary

[HHS Security Rule summary](https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html)

Primary web source.

<a id="source-w03"></a>

### W03. HHS minimum necessary guidance

[HHS minimum necessary guidance](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/minimum-necessary-requirement/index.html)

Primary web source.

<a id="source-w04"></a>

### W04. OpenAI latency optimization guidance

[OpenAI latency optimization guidance](https://developers.openai.com/api/docs/guides/latency-optimization)

Primary web source.

<a id="source-w05"></a>

### W05. OpenTelemetry distributed traces

[OpenTelemetry distributed traces](https://opentelemetry.io/docs/concepts/signals/traces/)

Primary web source.

<a id="source-w06"></a>

### W06. PostgreSQL explicit locking

[PostgreSQL explicit locking](https://www.postgresql.org/docs/current/explicit-locking.html)

Primary web source.

