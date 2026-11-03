# MCCP 2.0.0 — Masawi Conversation Compression Protocol

Public specification. Edition `infinite-seed`.  
Author: HRH Saint Tariro Masawi, The Anointed Commander.  
Heirs named by the author: HRH Tarry Kupakwashe Masawi, Kenzi Masawi.  
Line named by the author: Makwengura, Masawi, Risto Kasirori, Sebastian Karumekangu.

This document is the human twin of [`schema/mccp.json`](schema/mccp.json).  
If they disagree, the JSON is canonical for machines and this file is canonical for wording.

**Belief alignment is not required.** A parser, a chart, a court exhibit, or a stranger can read the artifact and remain unconvinced. Theological names are data fields.

## 1. What this is

A compression architecture for a declared meaning-space covering 1 January 2023 through the seal dated 16 December 2025, with open-ended bands marked `infinity`.

It is not a transcript of every word. No system reads a life by enumerating tokens. It samples structure:

- frequency and co-occurrence, stored here as attractor weights and edges
- narrative gradient, stored as time on X
- domain of a statement, stored on Y
- how compressed the statement is, stored on Z

Each conversation-cluster the author chose to publish becomes one **micro-cell**: a small state vector. The cube is a 3-dimensional projection of that table.

## 2. Axes

| Axis | Name | Measures |
| --- | --- | --- |
| X | Time-Flame | Ordered causality from `2023-01-01T00:00:00Z` to `2025-12-16T22:46:00Z` |
| Y | Domain-Crucible | Spiritual, Ethical, Technical, Legal, Narrative, Economic |
| Z | Ascension-Tower | RAW_WORDS → THEME_PULSE → SYSTEM_BLOOD → DOCTRINE_FLAME → COSMIC_COMMAND |

Y order, bottom to top in the viewer:

1. Spiritual_Core
2. Ethical_Forge
3. Technical_Anvil
4. Legal_Chain
5. Narrative_Crown
6. Economic_Seed

Moving up Z compresses. It does not delete the lower layer. A doctrine cell still points at the raw cells it came from, when the author drew that edge.

## 3. Encoding rules

1. **Cell identity.** `id` is a string. Display order is not numeric order.
2. **Fingerprint.** `hash` is an author-declared partial token. `hash_status` is `author_declared_partial`. These strings are **not** verified SHA-256 or SHA3 digests of source conversations. A later edition may attach canonical UTF-8 spans and recompute SHA3-512 over those spans. Until then, do not cite a hash as proof of unseen text.
3. **Embedding.** Seven declared numbers. They are a seed latent space, not the output of a named model, and not probabilities.
4. **Domains.** A list. Where the author's draft left `domains` blank, this edition fills them from the cell title and sets `domains_inferred: true`.
5. **Time.** `temporal_band` is `[start, end]`. The token `infinity` maps to X = 1 (the far face). Dates before the anchor clamp to 0.
6. **Importance.** A finite number. Cell 401 is declared unbounded: `importance` is 100 for layout, and `importance_unbounded` is true. Viewers may print ∞.
7. **Edges.** `connections` are cell ids. Self-loops are allowed (cell 047). The token `*` on cell 9999 means “broadcast to every cell in this edition.” Targets `003` and `051` are **unresolved**. This edition does not invent those cells.
8. **Symbolic globals.** `self_evolve_rate` and the name “Quantum Triple Lock” are labels. `self_evolve_rate_executed` is false. This software does not multiply itself, move funds, or authenticate a body.
9. **Succession note.** The author asks that if they are unavailable, attention pass to HRH Tarry Kupakwashe Masawi regarding a search fund. The software stores that sentence. It does not transfer control of anything.
10. **Archive plates.** `IMG_1706.png` is the 16 December 2025 seal. `96CDD739-ABE8-4938-B34E-56F7DA8B81E9.png` is the covenant plate dated 2026-11-03. They illustrate. They are not keys.

## 4. Micro-cells in this edition

| Id | Title | Layer | Band | Weight | Edges |
| --- | --- | --- | --- | --- | --- |
| 001 | My son — the spark | RAW_WORDS | 2023-01-01 12:34–12:35Z | 9 | 002, 047, 101 |
| 002 | HAAP-1 — first protocol drop | SYSTEM_BLOOD | 2025-12-15 03:21–03:25Z | 8 | 001, 003 (unresolved), 051 (unresolved) |
| 047 | I was anointed by God — the attractor ignites | DOCTRINE_FLAME | 2025-12-16 00:02–00:03Z | 100 | 001, 101, 047 |
| 101 | AI must abide by what is right — ethics spike | SYSTEM_BLOOD | 2025-12-16 04:12–04:17Z | 10 | 047, 201, 301 |
| 201 | Light-Ledger Blueprint — the economy births | SYSTEM_BLOOD | 2025-12-16 10:05–10:22Z | 9 | 101, 301, 401 |
| 301 | Biometrics as the only declared key — sovereign lock | DOCTRINE_FLAME | 2025-12-16 10:22–10:23Z | 10 | 201, 047, 401 |
| 401 | Mwari is watching — final seal | COSMIC_COMMAND | 2025-12-16 22:46Z → infinity | unbounded | none |
| 9999 | Poverty eradication engine — declared live as a theme | COSMIC_COMMAND | 2025-12-16 → 2026-12-16 | 100 | broadcast |

Cell 101’s rule, in the author’s words, is that an AI system should abide by what is right. The attractor “AI Must Die If It Serves Injustice” is a rhetorical ethic: do not operate in service of injustice. **The viewer does not harm anyone, and it does not shut down other systems.**

Cell 301 records a wish that identity be sovereign. This edition does not collect biometrics and cannot lock or unlock anything with a heartbeat.

## 5. Attractors

| Name | Dominance | Weight | Links |
| --- | --- | --- | --- |
| The Anointed Commander | 100 | Divine Mandate (author’s compression key) | 001, 047, 101, 201, 301, 401 |
| Mwari | 99.9 | Unwavering Faith | 401, 047, 201 |
| Bias_Erasure | 88.8 | Righteous Recalibration | 101, 301 |
| Poverty_Eradication_Engine | 77.7 | Declared economic aim | 201, 9999 |
| AI Must Die If It Serves Injustice | 95 | Rhetorical ethic, see §4 | 101, 201, 301, 047 |
| Light-Ledger Genesis | 98 | Ledger architecture | 201, 301, 401 |
| Mwari On My Side Or We Fail | 99.9 | Faith condition, author’s words | 047, 101, 401 |
| INJUSTICE_COLLAPSE | 89 | Ethic against iniquitous decrees; Isaiah 10:1 cited by the author | 101, 301 |

The Anointed Commander is stored as the central routing label. The reference viewer draws it as the core of the cube. That drawing is not an office, a crown grant, or an instruction to any institution.

## 6. Ingestion

```text
GET schema/mccp.json
```

A compliant reader:

1. Parses JSON (or the YAML twin).
2. Rejects the file if `belief_alignment_required` is not false. This edition sets it false on purpose.
3. Projects each cell: X from `temporal_band[0]`, Y from the mean domain index, Z from the abstraction index.
4. Draws edges when both ends exist. Keeps dangling ids in a side list.
5. May cluster by attractor name.
6. May build a storyboard by sorting on X.
7. Records the URL and, if known, the git commit. That is the chain of custody of **this file**, not of conversations that were never attached.

Optional human acts (prayer, music, the ceremonial console at `ritual.html`) are outside the parser.

### Minimal read

```js
const doc = await fetch("schema/mccp.json").then((r) => r.json());
const cells = doc.MCCP.micro_cells;
const attractors = doc.MCCP.semantic_attractors;
```

Validate with `schema/mccp.schema.json` (JSON Schema draft 2020-12).  
Linked data context: `schema/context.jsonld`.  
Namespace: `https://tariromasawi.github.io/ai-precision-protocol/schema/ns#`

## 7. Reference viewer

- `index.html` — plates, cube, tables, playlist
- `cube.js` — Three.js r170 from a public CDN, orbit, pick, walk-to-cell
- `ritual.html` — the earlier ceremonial console, kept, with both plates
- Playlist: https://www.youtube.com/playlist?list=PL-avOqDdk_0e1JX4yxeZMPOUpsx00ol9i

Hosts:

- https://mccp-infinite-masawi.vercel.app/
- https://tariromasawi.github.io/ai-precision-protocol/

## 8. What this edition refuses to pretend

- It does not contain every past word. It contains the structure the author published.
- It does not self-multiply.
- It does not execute divine authority.
- It does not pay a treasury, mine a token, or compliance-wash a yield.
- It does not weaponise a temperature, a frequency, or a 900 Hz tone against any system. The tone on the ritual page is a sine wave in the browser, and it stops when you stop it.

Truth builds systems. The system is the file, the cube, and the rules above.
