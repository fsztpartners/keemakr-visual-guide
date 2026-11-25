# Visual rebuild verification

The original HTML now opens a scene-based explainer. The earlier long-form guide is preserved in `Keemakr technical reference.html` with a correction banner.

Real Chrome checks passed for all 16 scenes and 68 default steps, plus all 46 scenario choices and their 190 steps. Scrubbing changes the diagrams in every scene. Keyboard node inspection, Back/Next, finite Play/Pause, Replay, reduced motion, mobile page width, the old `#clinic-day` link, all three rendered Mermaid views and printing all 16 scenes were checked.

Six PNG stills and four GIF loops are embedded in the standalone file. GIF capture checked that frames actually differ. Media starts as still images; starting a GIF stops the previous GIF, and closing the gallery restores stills. Assets are loaded lazily in the gallery and were also decoded independently in Chrome.

No JavaScript errors, background network requests, duplicate IDs, broken internal anchors or unnamed form controls were found. The no-JavaScript edition retains all drawings and step narratives. At small widths the diagram pans internally to keep its labels readable.

Results: `visual-guide-browser-checks.json`, `visual-guide-variant-checks.json`, and `visual-guide-own-checks.json`. These checks validate the documentation artifact, not deployed business workflows or production latency.
