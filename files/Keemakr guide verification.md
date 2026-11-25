# Prose and artifact verification

Scope: static documentation artifact only; no product/runtime source changed.

## AI vocabulary

- Markdown line 224: `Readiness should be explained in business terms. A staff member trying to book needs permission for the action and the relevant patient record, a working clinic installation, valid`

## Copula avoidance

- Markdown line 546: `For two independent branches A and B, serial time is A+B and ideal overlap time is max(A,B). Actual overlap also includes dispatch, contention and joining costs, so the calculator `
- Markdown line 626: `The filterable register names each issue type and consequence. Confirmed source defects, design risks, missing verification and proposed features are deliberately separate. A missi`

## Significance inflation

No matches.

## Promo language

No matches.

## Vague attribution

No matches.

## Outline conclusions

No matches.

## Chatbot leakage

No matches.

## Filler hedging

No matches.

## Structural review

24 chapters use sentence-case headings. No emoji section markers, promotional conclusion or repetitive bold-lead bullet walls. Paragraph length varies; narrative business examples precede source terms. Tables compare genuinely parallel items. No unsupported measured speedups, live deployment or HIPAA verdict is asserted.

HTML parser checks found no duplicate IDs, broken internal anchors or external resource loads. All 24 engineering sections are open in no-script source; JavaScript closes them for simple mode. JavaScript syntax checked with Node. Browser interaction/layout verification is handled separately by the parent.

## Sweep corrections and recheck

Markdown line 224: replaced “additionally needs” with “also needs”. Markdown line 546: replaced “represents a simplified model” with “is intentionally a simplified model”. Rebuilt HTML and matching Markdown, then rechecked the changed expressions: both are absent. The remaining copula-pattern match on line 626 is “proposed features are”, a substring false positive for the regex “features a”; it was retained because it names a factual classification. No significance inflation, promotional language, vague attribution, outline conclusion, chatbot leakage or filler-hedging matches were found.

## Browser QA completed

The parent ran real-browser verification and reported all nine check groups passing: eight journey/scenario variants, calculator arithmetic/invalid input/reset, keyboard access, search and gap/inventory filters, print expansion and state restoration, mobile layout and reduced-motion behavior. Screenshots were visually reviewed. Machine-readable results: `guide-browser-checks.json` and `guide-interaction-checks.json` (in this reports directory).

Precision correction after review: changed each common chapter footer from the blanket “Implemented in source” tag to neutral “Evidence and analysis”. This prevents proposed calculators, roadmap work and recommendations from inheriting an implemented classification. Existing source/proposed/live-unverified distinctions and all interaction code remain unchanged. Rebuilt HTML and matching Markdown; Node JavaScript syntax check passed.
