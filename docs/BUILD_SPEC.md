# Build Specification Sheet
## Overworld Journey Map — Copenhagen to Lisbon

---

### 1. Canvas Specifications

| Property | Full Map | MVP Strip (3 checkpoints) |
|---|---|---|
| Width | 1080px | 1080px |
| Height | 19,440px | 3,240px |
| Orientation | Portrait, vertical scroll | Portrait |
| Primary format | SVG (layered) | SVG (layered) |
| Fallback format | PNG @ 1080px width | PNG @ 1080px width |
| Colour space | sRGB | sRGB |
| Background base colour | #F5E6C8 (warm parchment) | #F5E6C8 |

> Full map height = 18 segments × 1080px per segment. The app renders this as a scrollable vertical canvas; Copenhagen is visible at the bottom on first load, Lisbon at the top.

---

### 2. Checkpoint Layout

#### Rules
- **N = 18** checkpoints; index 0 = Copenhagen (bottom), index 17 = Lisbon (top)
- All checkpoint centers are **horizontally centered**: `x = 540px`
- All checkpoint centers are **equally spaced** on the vertical axis
- No hand-drawn or irregular spacing — coordinates are computed, not estimated

#### Formula

```
segment_height  = canvas_height / (N - 1)
                = 19440 / 17
                ≈ 1143.5px

checkpoint_y[i] = canvas_height - (i × segment_height) - (segment_height / 2)
```

#### Full Map Anchor Coordinates (1080 × 19,440px canvas)

| # | City | x | y |
|---|---|---|---|
| 1 | Copenhagen | 540 | 18868 |
| 2 | Odense | 540 | 17725 |
| 3 | Hamburg | 540 | 16581 |
| 4 | Hannover | 540 | 15437 |
| 5 | Cologne | 540 | 14294 |
| 6 | Brussels | 540 | 13150 |
| 7 | Paris | 540 | 12006 |
| 8 | Orléans | 540 | 10863 |
| 9 | Bordeaux | 540 | 9719 |
| 10 | San Sebastián | 540 | 8575 |
| 11 | Burgos | 540 | 7431 |
| 12 | Valladolid | 540 | 6288 |
| 13 | Madrid | 540 | 5144 |
| 14 | Ávila | 540 | 4000 |
| 15 | Salamanca | 540 | 2857 |
| 16 | Vilar Formoso | 540 | 1713 |
| 17 | Coimbra | 540 | 569 |
| 18 | Lisbon | 540 | — (top, clipped to top edge) |

> Each anchor must be exported as a named SVG element: `id="cp-01"` through `id="cp-18"`. The app uses these IDs to position checkpoint markers and compute scroll position.

---

### 3. Path Rendering

**The progress path is app-rendered — the illustrator does not draw it.**

The illustrator delivers the background illustration layer. The app overlays the path on top programmatically.

#### Recommended Path Algorithm (for app dev reference)

- **Algorithm**: Catmull-Rom spline through all checkpoint center points
- **Organic x-offset**: Apply a sinusoidal horizontal deviation between each pair of checkpoints to avoid a perfectly straight line:

  ```
  x(t) = 540 + 80 × sin(t × π)
  ```

  where `t` goes from 0 to 1 between each consecutive pair of checkpoints.

- **Progress indicator**: SVG `<path>` with `stroke-dasharray` and `stroke-dashoffset` animated by the app to reveal the path up to the group's current position
- **Style suggestion**: Dashed line, warm brown (`#8B6F47`), 4px stroke, 12px dash / 8px gap

#### What the illustrator should provide in the path zone
- A decorative road/trail texture or faint worn-path illustration between checkpoint zones (purely decorative background)
- No arrow, dotted line, or progress indicator — these are app layer

---

### 4. Checkpoint States

The illustrator delivers two reusable marker SVG components. The app swaps between them based on group progress.

| State | File | Visual Description |
|---|---|---|
| **Unlocked** | `checkpoint-marker-unlocked.svg` | Ornate vintage frame (matching trading card border style); card artwork fills the frame; tappable — enlarges on first tap, flips to story on second tap |
| **Locked** | `checkpoint-marker-locked.svg` | Same ornate frame; "?" glyph centered inside; semi-transparent (approx. 60% opacity); indicates checkpoint ahead |
| **Current position** | App layer | "YOU ARE HERE" label or animated pin — not illustrated |

#### Marker sizing
- Marker footprint on full map: ~200 × 280px (portrait card ratio)
- Marker footprint on MVP strip: same absolute size
- Frame should accommodate trading card artwork at ~180 × 260px interior

---

### 5. Geographic Elements per Checkpoint Zone

Each checkpoint zone spans one segment (~1143px tall on full map). The illustrator populates each zone with geographically accurate decorative elements in the surrounding area — not necessarily directly on the path.

| # | City | Geographic & Cultural Elements |
|---|---|---|
| 1 | **Copenhagen** | Water channels, Nyhavn harbour coloured facades, The Little Mermaid silhouette, island coastline, sailing vessels |
| 2 | **Odense** | Flat green Funen farmland, half-timbered houses, windmill, paper swans (H.C. Andersen ref.) |
| 3 | **Hamburg** | Elbe river, port cranes, Speicherstadt red-brick warehouses, cargo ships |
| 4 | **Hannover** | Baroque Herrenhausen gardens, city spires, rolling north German plains |
| 5 | **Cologne** | Rhine river (wide), Cologne Cathedral twin spires, barges on river |
| 6 | **Brussels** | Grand Place gothic architecture, rolling Belgian countryside, hops fields |
| 7 | **Paris** | Eiffel Tower silhouette, Seine river bend, Haussmann rooftops |
| 8 | **Orléans** | Loire Valley river, riverside château, early vineyard terraces |
| 9 | **Bordeaux** | Garonne river, vineyard rows, wine barrel, Bordeaux neoclassical facades |
| 10 | **San Sebastián** | Bay of Biscay coastline, Basque mountain peaks, fishing boats, pintxos bar silhouette |
| 11 | **Burgos** | Castilian high plateau, Burgos Cathedral spires, wheat fields, pilgrimage route marker |
| 12 | **Valladolid** | Dry Castilian meseta, sparse trees, medieval city walls |
| 13 | **Madrid** | City skyline, Retiro Park pines, bear & strawberry tree (city symbol), royal palace |
| 14 | **Ávila** | Complete medieval city walls (UNESCO), granite plateau, Sierra de Gredos mountains |
| 15 | **Salamanca** | Plateresque university facade, golden sandstone buildings, Tormes river |
| 16 | **Vilar Formoso** | Portugal border marker/gate, eucalyptus forest, rolling Serra da Malcata hills |
| 17 | **Coimbra** | University of Coimbra hilltop, Mondego river, terracotta rooftops, fado reference |
| 18 | **Lisbon** | Tagus river mouth opening to Atlantic, 25 de Abril suspension bridge, azulejo tile motif, tram silhouette, São Jorge Castle on hill |

---

### 6. Visual Style

#### Colour Palette

| Name | Hex | Usage |
|---|---|---|
| Warm Parchment | `#F5E6C8` | Canvas base, paper background |
| Aged Sepia | `#8B6F47` | Path line, outlines, text labels |
| Ink Brown | `#3D2B1F` | Heavy outlines, shadows |
| Muted Sage Green | `#7A9E7E` | Farmland, forests, vegetation |
| Soft Coastal Blue | `#6B9BB8` | Rivers, sea, water bodies |
| Terracotta | `#C4714F` | Rooftops, highlights, accent |
| Stone Grey | `#A89880` | Mountains, walls, roads |
| Cream White | `#FAF3E6` | Card frame highlights, snow |

#### Texture
- Paper grain overlay on entire canvas (subtle, not overpowering)
- Slightly aged/foxed edges on map border
- Vignette darkening toward canvas edges

#### Typography
- Checkpoint city names: small caps, serif (Cormorant Garamond or equivalent open-source serif)
- Distance labels (if included): handwritten-style, small, aged ink colour
- All text must be outlined/converted to paths in final SVG deliverable

#### Icon & Illustration Style
- Vintage woodcut / copper engraving line-art style for all geographic elements
- Line weights: 1–3px for details, 4–6px for landmark outlines
- No flat digital fills — use hatching, cross-hatching, or stippling for volume
- Consistent with the visual reference image provided by client (AI-generated paper map)

#### Card Frame Style
- Ornate vintage border with corner flourishes
- Consistent with trading card border style (client reference: Copenhagen card with mermaid illustration)
- Frame should not overshadow the card artwork inside

---

### 7. Layer Structure (SVG)

All deliverables must use this layer naming convention, from bottom to top:

```
1. background          — parchment base colour + paper grain texture
2. geographic-elements — terrain, landmarks, vegetation per zone
3. path-zone           — decorative road/trail background (no progress line)
4. checkpoint-anchors  — invisible named anchor elements (id="cp-01" … id="cp-18")
5. checkpoint-markers  — placeholder layer; app populates with marker components
6. [progress-overlay]  — APP-RENDERED, not in illustrator deliverable
```

---

### 8. Asset Naming Convention

```
map-background-full.svg
map-background-full.png
map-background-mvp.svg
map-background-mvp.png

checkpoint-marker-unlocked.svg
checkpoint-marker-locked.svg

zone-01-copenhagen.svg
zone-02-odense.svg
zone-03-hamburg.svg
zone-04-hannover.svg
zone-05-cologne.svg
zone-06-brussels.svg
zone-07-paris.svg
zone-08-orleans.svg
zone-09-bordeaux.svg
zone-10-san-sebastian.svg
zone-11-burgos.svg
zone-12-valladolid.svg
zone-13-madrid.svg
zone-14-avila.svg
zone-15-salamanca.svg
zone-16-vilar-formoso.svg
zone-17-coimbra.svg
zone-18-lisbon.svg

style-guide.pdf           (Phase 2 only)
```

---

### 9. Technical Requirements

| Requirement | Detail |
|---|---|
| SVG version | SVG 1.1 |
| Text | All text converted to outlines/paths |
| Fonts | Embed or convert — no external font references |
| Images embedded | Any raster textures embedded as base64 `<image>` elements |
| Viewbox | `viewBox="0 0 1080 [height]"` |
| No scripts | No `<script>` elements in SVG |
| Layer IDs | All layers use the naming convention in Section 7 |
| Anchor IDs | Checkpoint anchors use `id="cp-01"` through `id="cp-18"` |
| Compatibility | Must render correctly in WebKit/Blink WebView (iOS & Android) |
