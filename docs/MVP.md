# MVP Definition
## Phase 1 — First 3 Checkpoints

---

### MVP Scope

The MVP is a production-quality vertical strip of the first three checkpoints on the journey: **Copenhagen → Odense → Hamburg**. These form the bottom section of the full map (Copenhagen sits at the very bottom of the complete 18-checkpoint image).

The purpose of the MVP is to validate the visual direction — paper/vintage style, geographic illustration quality, checkpoint marker design — before investing in the full 18-checkpoint map. The MVP is not a wireframe or sketch; it must be final-quality and directly usable in the app.

---

### Deliverables Checklist

#### Background Strip
- [ ] `map-background-mvp.svg` — 1080px wide, ~3,240px tall (3 segments at 1080px each)
- [ ] `map-background-mvp.png` — PNG export at 1080px width

#### Checkpoint Markers (reusable components, used across full map)
- [ ] `checkpoint-marker-unlocked.svg` — Vintage ornate frame; trading card thumbnail fits inside (client provides card art); card is tappable in app
- [ ] `checkpoint-marker-locked.svg` — Same frame, "?" glyph, semi-transparent overlay; indicates checkpoint not yet reached

#### Geographic Zone Elements (integrated in background SVG + exportable layers)
- [ ] `zone-01-copenhagen.svg`
  - Water channels and harbour (Nyhavn-style colourful facades)
  - Island shoreline — Copenhagen sits on Sjælland, surrounded by water
  - The Little Mermaid silhouette
  - Boats/small vessels in harbour
- [ ] `zone-02-odense.svg`
  - Flat green Danish farmland
  - Half-timbered houses (characteristic Funen architecture)
  - Windmill
  - H.C. Andersen visual reference (paper swans, storybook motif)
- [ ] `zone-03-hamburg.svg`
  - Elbe river delta / wide waterway
  - Port cranes on the horizon
  - Speicherstadt red-brick warehouse district silhouette
  - Ships/barges on the river

#### Path Zone
- [ ] Decorative road/trail illustration between marker positions (background texture only — no progress line)
- [ ] The app overlays the programmatically computed dotted-line progress path on top

---

### User Stories

> As a user, I see Copenhagen at the bottom of the map with my trade card displayed — the journey has begun.

> As a user, I see Odense and Hamburg above Copenhagen with locked "?" cards — I know they are upcoming checkpoints I haven't reached yet.

> As a user, the illustrations around the path make me feel I'm travelling through real places: harbour water, farmland, a port city.

> As a user tapping an unlocked card, it enlarges; tapping again it flips to reveal a story — the map layer supports this by providing the card anchor position.

---

### Out of Scope for MVP

| Item | Reason |
|---|---|
| Checkpoints 4–18 | Phase 2 |
| Progress path / dotted line rendering | App-rendered on top of background layer |
| Animation and interaction | App layer responsibility |
| Trading card artwork | Client-supplied per checkpoint |
| "You are here" indicator | App layer responsibility |
| Style guide document | Delivered at end of Phase 2 |

---

### Success Metrics

| Metric | Target |
|---|---|
| Aesthetic match | Client approves paper/vintage feel; no need for full visual redesign before Phase 2 |
| Layout compliance | Copenhagen at x=540, y=bottom; Odense and Hamburg equally spaced above; verified against `BUILD_SPEC.md` coordinates |
| Layer cleanliness | SVG opens in Figma/Illustrator with named, separable layers |
| Marker reusability | Both marker components drop into any checkpoint slot across the full map without modification |
| File integrity | SVG renders correctly at 1080px width in a mobile browser/WebView with no artefacts |

---

### Checkpoint Anchor Coordinates (MVP Strip)

For a 3-checkpoint MVP strip at 1080×3240px:

| Checkpoint | Index | x (center) | y (center) |
|---|---|---|---|
| Copenhagen | 0 | 540px | 2970px (bottom zone) |
| Odense | 1 | 540px | 1890px (middle zone) |
| Hamburg | 2 | 540px | 810px (top zone) |

Segment height = 3240 / (3-1) = 1080px per segment.
Anchor y = canvas_height - (i × segment_height) - (segment_height / 2).

> These coordinates apply to the MVP strip only. For the full 18-checkpoint map, see `BUILD_SPEC.md`.
