# Visual guide verification

The rewritten guide uses one active SVG scene, not the original scrolling essay. It preserves the earlier HTML/Markdown as a corrected long-form technical reference. No product source, package configuration, deployed services or live tenant data was changed.

## Structural checks

The final builder emits 16 source-based scenes, 68 default steps and 46 scenario choices. Every scene has at least four default steps. The longest summary is 18 words; the longest default step caption is 15 words. Variant captions also pass the 24-word limit. All SVG state references point to existing edges and nodes.

There are three actual Mermaid diagrams rendered with a local Mermaid library into embedded SVGs. The source is available behind a toggle. The HTML requires no runtime Mermaid library or external assets.

Final media manifest supplies six PNG stills and four GIF companions captured from the guide's actual scenes. Static images are the default. One GIF plays only after explicit request; starting another or closing the gallery restores stills. All media are embedded in the standalone HTML.

HTML parsing, including no-script and print markup, found no duplicate IDs, broken internal anchors or external resource loads. Print and no-script drawings have separate ID prefixes. All sixteen drawings and step narratives remain available without JavaScript. Node syntax checking passed for the extracted interaction script.

Machine-readable own checks: `visual-guide-own-checks.json`.

## Browser checks

The parent reported that the first real-browser loop passed all sixteen scenes, default step transitions, deterministic seeking, initial structural/no-JavaScript-error checks and mobile internal panning. Screenshots showed the visual stage above the fold on desktop and readable internal pan on mobile. The parent performs the final scenario/media loop after the final embedded-media rebuild; its results remain the authority for that final pass.

## Source precision

The guide distinguishes authored build expectations from an executed compiled audit. It separates the Eve tool catalog from installed business action bindings, and published/installed/enabled/discoverable/ready/permitted/approved/completed states. A model sees instructions, selected context, tool schemas and results; ordinary helpers execute through imports and calls without automatic source ingestion.

Corrections include Sales inbound default-tool exclusion/handoff uncertainty, ClinicOS custom LiveKit voice/Copilot workers, Intake's staff-task handoff without automatic ownership transfer, and distinct Core service versus Eve workflow-owner callbacks. Health-data copies beyond Medplum are shown in the Permission + PHI variant, with US/HIPAA evidence still unverified. Latency mechanisms and proposals are source-grounded; no measured distribution, live deployment or universal exactly-once verdict is claimed.

## Pack-to-capability connection amendment

The final opening is now the persistent parent/child drawing: ClinicOS [clinicos] contains Find open times [clinic.find_times] and Book an appointment [clinic.book], explicitly two examples from 35 bound contracts. Six additional scenes connect contract, bound implementation, the registry's two consumers, generated metadata versus deployed code, install/discovery/governance and two-action composition. A selected child persists across the generic chain and registry; ClinicOS/Sales-specific scenes label their own context.

Supporting documentation was audited at core-docs SHA 678902df0accca44133c4b5a3a855839fbe50d67. Owning code remains authoritative. The full comparison at `Pack capability code and docs.md` distinguishes aligned relationships, teaching omissions, verified same-scope deadline drift, concrete implementation gaps and unverified deployment/configuration claims. Missing provider connection, connected-but-incomplete clinic Schedule/consultant mapping and legitimate empty availability are separate cases.

Final own checks: 22 scenes, 98 default steps, 82 scenario choices, five pre-rendered actual Mermaid SVG diagrams, nine PNG stills and seven GIF replays embedded offline. Captions across all variants are at most 16 words. JavaScript syntax, duplicate IDs including no-script/print content, broken internal anchors, external resource loads, source references and SVG state edges/nodes passed. Machine-readable result: `pack-capability-own-checks.json`.

The parent reported all 22 scenes/default steps passing in its draft browser loop and completed three additional PNG/GIF captures for containment, wiring and two-action composition. Final scenario/selection/media verification and hosted deployment remain the parent's next stage.
