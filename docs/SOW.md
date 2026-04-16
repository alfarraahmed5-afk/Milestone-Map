# Statement of Work
## Overworld Journey Map — Copenhagen to Lisbon

---

### 1. Project Overview

This project involves the creation of an illustrated overworld map for a mobile application. The map depicts a virtual group journey of 18 checkpoints from Copenhagen (start, bottom of image) to Lisbon (end, top of image). The visual style is paper/vintage — minimalistic, hand-crafted feel — consistent with the app's existing design language.

The map is not a static image: it is integrated into the app as a layered SVG. The app renders the progress path and handles checkpoint state logic. The illustrator is responsible for the background illustration layer only.

---

### 2. Objectives

- Deliver a layered SVG overworld map at 1080px base width usable in a mobile app
- Establish a visual style (paper/vintage) that matches the prototype app aesthetic
- Provide reusable checkpoint marker components (locked and unlocked states)
- Surround the journey path with geographically accurate decorative elements per checkpoint zone

---

### 3. Scope

#### Phase 1 — MVP (3 Checkpoints)

Deliver a standalone vertical strip covering the first three checkpoints of the journey:

- Checkpoint 1: Copenhagen (start)
- Checkpoint 2: Odense
- Checkpoint 3: Hamburg

This phase validates the visual direction before committing to the full map. It is a production-quality deliverable, not a rough concept.

#### Phase 2 — Full Map (18 Checkpoints)

Extend the MVP strip to cover all 18 checkpoints:

Copenhagen → Odense → Hamburg → Hannover → Cologne → Brussels → Paris → Orléans → Bordeaux → San Sebastián → Burgos → Valladolid → Madrid → Ávila → Salamanca → Vilar Formoso → Coimbra → Lisbon

Phase 2 begins only after client sign-off on Phase 1.

---

### 4. Deliverables

#### Phase 1
- [ ] `map-background-mvp.svg` — Illustrated background strip, 1080px wide, covering 3 checkpoint zones
- [ ] `checkpoint-marker-unlocked.svg` — Unlocked state: decorative vintage frame (trading card fits inside)
- [ ] `checkpoint-marker-locked.svg` — Locked state: same frame with "?" glyph, semi-transparent
- [ ] Geographic decorative elements for CPH, Odense, and Hamburg zones (integrated in background SVG, also exportable as separate layers)
- [ ] `map-background-mvp.png` — PNG export at 1080px width

#### Phase 2
- [ ] `map-background-full.svg` — Complete 18-checkpoint background map
- [ ] `map-background-full.png` — PNG export at 1080px width
- [ ] Zone illustration layers for all 18 checkpoints (`zone-01-copenhagen.svg` … `zone-18-lisbon.svg`)
- [ ] Style guide document (color palette, typography specs, icon reference sheet)

---

### 5. Pricing

| Phase | Scope | Price |
|---|---|---|
| Phase 1 — MVP | 3-checkpoint strip + marker components | €700–€950 |
| Phase 2 — Full Map | Remaining 15 checkpoints + style guide | €2,800–€3,800 |
| **Combined (same illustrator)** | Phase 1 credited toward Phase 2 | **€3,200–€4,400** |

Payment terms: 50% upfront per phase, 50% on delivery. Revisions (see Section 7) included in quoted price.

---

### 6. Timeline

| Milestone | Duration |
|---|---|
| Phase 1 kickoff → first draft | 5 business days |
| Revision rounds (up to 2) | 3 business days each |
| Phase 1 final delivery | **~10 business days (2 weeks)** |
| Phase 2 kickoff (after sign-off) → first draft | 15 business days |
| Revision rounds (up to 2) | 3 business days each |
| Phase 2 final delivery | **~25–30 business days (5–6 weeks)** |

Total project duration (sequential): approximately **8–9 calendar weeks** from Phase 1 kickoff.

---

### 7. Assumptions & Constraints

- **Trading card artwork is client-supplied.** The illustrator frames and positions the card on the map; card artwork design is out of scope.
- **Path rendering is app-side.** The illustrator does not draw the progress path or dotted line — the app overlays this programmatically on the background layer.
- **Checkpoint layout is fixed.** Checkpoint centers are horizontally centered and equally spaced on the vertical axis. The illustrator must respect these positions; exact pixel coordinates are provided in `BUILD_SPEC.md`.
- **Revisions:** 2 rounds of revisions included per phase. Additional rounds billed at hourly rate.
- **Format:** SVG is the primary deliverable. PNG is a required fallback.
- **Style consistency:** Phase 2 must visually match Phase 1 exactly in palette, line weight, and texture.

---

### 8. Acceptance Criteria

- All 18 checkpoint centers (Phase 2) or 3 checkpoint centers (Phase 1) are horizontally centered at x=540px and equally spaced on the y-axis
- SVG file has clearly labeled layers: `background`, `geographic-elements`, `path-zone`, `checkpoint-anchors`, `checkpoint-markers`
- Checkpoint anchor positions are named SVG elements (e.g. `id="cp-01"`)
- Both locked and unlocked marker states are delivered as standalone SVG components
- Geographic elements are recognizable and geographically accurate per zone
- Visual style matches the paper/vintage reference (warm parchment palette, woodcut-style line art, paper texture)
- All files deliver cleanly at 1080px width with no clipping or overflow
