const path = require('node:path');
const { launchOptions } = require('./browser-options.cjs');
const fs=require('fs');
const {chromium}=require('playwright');
const defs={
files:`flowchart LR
 A["Authored file"] --> B{"What activates it?"}
 B -->|"ordinary import and call"| C["Shared TypeScript helper"]
 B -->|"contract + implementation registry"| D["Named business action"]
 B -->|"event handler index + subscription"| E["Event responder"]
 B -->|"jobs index + enabled schedule"| F["Code job and work runner"]
 B -->|"screen registry + load route"| G["UI renderer"]
 B -->|"Eve build + tool declaration"| H["Model-visible tool schema"]
 X["checkout-paid.ts exists"] -.->|"missing handler binding"| Y["No conversion write wired"]`,
registries:`flowchart LR
 subgraph E["Catalog 1: Eve model tools"]
 M["Model"] --> S["capability-search tool"]
 I["capability-invoke workflow tool"]
 end
 subgraph K["Catalog 2: installed business actions"]
 P["Published versioned contract"] --> A["Active consented installation"] --> B["Enabled tenant binding"] --> R["Rank candidates for query"]
 end
 S --> R
 R --> F["Found result: ready may be false"]
 F -->|"exact action ID and schema"| M
 M --> I
 I --> G{"Live permission + policy + approval"}
 G -->|"scoped grant"| H["Exact runtime handler"]`,
sequence:`sequenceDiagram
 actor U as Person / client
 participant W as Next web peer
 participant E as Eve peer / workflow owner
 participant M as Model provider
 participant P as Business pack runtime
 participant B as Core broker
 U->>W: Send message and session context
 W->>E: Authenticated session message
 E->>M: Instructions, context, offered tools
 M->>E: Search / invoke request
 E->>E: Resolve contract, gate, persist, grant
 E->>P: Scoped action invocation
 P->>B: Authorized Tables / app callback
 B-->>P: Permitted service result
 alt immediate result
 P-->>E: Typed action outcome
 else tracked work completion
 P->>E: Owner callback, persist and resume hook
 end
 E->>M: Settled tool output
 M-->>E: Grounded answer
 E-->>W: Session log replay / stream
 W-->>U: Render visible answer`,

pack:`flowchart TB
 subgraph P["Clinic business setup [clinicos]"]
 subgraph C["Named business actions [capabilities]"]
 F["Find open times [clinic.find_times]"]
 B["Book an appointment [clinic.book]"]
 end
 A["Patient workers [agents]"]
 T["Operational registers [Tables]"]
 S["Visual surfaces [screens]"]
 E["Reactions [events]"]
 J["Recurring work [jobs]"]
 R["Connected services [apps]"]
 end
 F -->|"structured slot fields; operator composes"| B
 B --> H["Shared helper [bookTime]"]
 H --> K["Core broker and Medplum"]
 A -.->|"different authority; shared rules"| H`,
wiring:`sequenceDiagram
 participant C as Contract [capability.ts]
 participant I as Binding [implementation.ts]
 participant L as Registry [implementations.ts]
 participant G as Generator [sync-entry.mjs]
 participant E as Data [entry.json]
 participant R as Runtime [invoke route]
 participant H as Handlers map
 C->>I: defineCapability data + bindCapability target/run
 I->>L: import and include binding
 par Build/catalog branch
 L->>G: project.capabilities
 G->>E: contract + target metadata only
 Note over E: run function is not serialized
 and Executable dispatch branch
 L->>R: import same implementations
 R->>H: handlers[contract.key] = binding.run
 end
 Note over E,H: Published contract and deployed handler must match
 R->>H: verified exact-key request
 H-->>R: implementation-reported typed outcome`,

};
(async()=>{const b=await chromium.launch(launchOptions);const p=await b.newPage({viewport:{width:1500,height:1000}});await p.setContent('<html><body></body></html>');await p.addScriptTag({path:path.join(path.dirname(require.resolve('mermaid')),'mermaid.min.js')});const out=await p.evaluate(async defs=>{mermaid.initialize({startOnLoad:false,securityLevel:'strict',theme:'base',themeVariables:{fontFamily:'system-ui',fontSize:'15px',primaryColor:'#e5f0e9',primaryTextColor:'#193b34',primaryBorderColor:'#46806c',lineColor:'#46806c',secondaryColor:'#f6f3e9',tertiaryColor:'#ffffff'}});const o={};for(const [key,src]of Object.entries(defs)){const r=await mermaid.render('mermaid_'+key,src);o[key]={source:src,svg:r.svg};}return o;},defs);fs.writeFileSync(path.join(__dirname,'guide-mermaid-rendered.json'),JSON.stringify(out));await b.close();console.log('Rendered '+Object.keys(out).length+' Mermaid SVG diagrams.');})().catch(e=>{console.error(e);process.exit(1)});
