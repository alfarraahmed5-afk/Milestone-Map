import { CANVAS, CHECKPOINTS, journeyState } from './config.js';
import { buildPathPoints, pointsToPathD, pathLength, progressDashOffset } from './path.js';
import { initCheckpoints } from './checkpoint.js';

const NS = 'http://www.w3.org/2000/svg';
const IS_MVP = true; // toggle to false for full 18-checkpoint map

export async function initMap(container) {
  const mode = IS_MVP ? 'mvp' : 'full';
  const checkpoints = IS_MVP ? CHECKPOINTS.slice(0, 3) : CHECKPOINTS;
  const canvasH = IS_MVP ? CANVAS.mvpHeight : CANVAS.fullHeight;

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${CANVAS.width} ${canvasH}`);
  svg.setAttribute('width', '100%');
  svg.setAttribute('preserveAspectRatio', 'xMidYMin meet');
  svg.setAttribute('id', 'journey-map');
  svg.setAttribute('aria-label', 'Copenhagen to Lisbon journey map');
  svg.setAttribute('role', 'img');

  // ── Layer 1: Background ─────────────────────────────────────────────────────
  const bgLayer = makeSVGGroup(svg, 'background');
  appendBackground(bgLayer, canvasH);

  // ── Layer 2: Geographic Elements ────────────────────────────────────────────
  const geoLayer = makeSVGGroup(svg, 'geographic-elements');
  await injectZones(geoLayer, checkpoints, mode, canvasH);

  // ── Layer 3: Path Zone ──────────────────────────────────────────────────────
  const pathLayer = makeSVGGroup(svg, 'path-zone');

  // ── Layer 4: Checkpoint Anchors ─────────────────────────────────────────────
  const anchorLayer = makeSVGGroup(svg, 'checkpoint-anchors');

  // ── Layer 5: Checkpoint Markers ─────────────────────────────────────────────
  makeSVGGroup(svg, 'checkpoint-markers');

  // ── Layer 6: Progress Overlay (app-rendered) ────────────────────────────────
  const progressLayer = makeSVGGroup(svg, 'progress-overlay');

  container.appendChild(svg);

  // Build anchors
  const anchors = checkpoints.map(cp => {
    const coords = mode === 'mvp' ? (cp.mvp || cp.full) : cp.full;
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('id', cp.id);
    g.dataset.mode = mode;
    anchorLayer.appendChild(g);

    // Debug dot (removed in production — kept as 0-radius circle for anchor ref)
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('cx', coords.x);
    dot.setAttribute('cy', coords.y);
    dot.setAttribute('r', '4');
    dot.setAttribute('fill', '#C4714F');
    dot.setAttribute('opacity', '0'); // hidden; set to '1' for debug
    dot.setAttribute('class', 'anchor-debug-dot');
    g.appendChild(dot);

    return { x: coords.x, y: coords.y };
  });

  // Decorative worn-road path (background)
  const pathPoints = buildPathPoints(anchors);
  const pathD = pointsToPathD(pathPoints);

  const roadPath = document.createElementNS(NS, 'path');
  roadPath.setAttribute('d', pathD);
  roadPath.setAttribute('fill', 'none');
  roadPath.setAttribute('stroke', '#A89880');
  roadPath.setAttribute('stroke-width', '10');
  roadPath.setAttribute('stroke-linecap', 'round');
  roadPath.setAttribute('opacity', '0.35');
  pathLayer.appendChild(roadPath);

  // Edge definition lines of the road
  const roadEdge = document.createElementNS(NS, 'path');
  roadEdge.setAttribute('d', pathD);
  roadEdge.setAttribute('fill', 'none');
  roadEdge.setAttribute('stroke', '#8B6F47');
  roadEdge.setAttribute('stroke-width', '2');
  roadEdge.setAttribute('stroke-linecap', 'round');
  roadEdge.setAttribute('opacity', '0.5');
  pathLayer.appendChild(roadEdge);

  // Progress dashed overlay
  const totalLen = pathLength(pathPoints);
  const dashOffset = progressDashOffset(totalLen, journeyState.progress);

  const progressPath = document.createElementNS(NS, 'path');
  progressPath.setAttribute('id', 'progress-path');
  progressPath.setAttribute('d', pathD);
  progressPath.setAttribute('fill', 'none');
  progressPath.setAttribute('stroke', '#8B6F47');
  progressPath.setAttribute('stroke-width', '4');
  progressPath.setAttribute('stroke-linecap', 'round');
  progressPath.setAttribute('stroke-dasharray', `12 8`);
  progressPath.setAttribute('stroke-dashoffset', totalLen); // start hidden
  progressLayer.appendChild(progressPath);

  // Animate in the progress line
  requestAnimationFrame(() => {
    progressPath.style.transition = `stroke-dashoffset 1.8s ease-in-out`;
    progressPath.setAttribute('stroke-dashoffset', dashOffset);
  });

  // Render checkpoint markers
  initCheckpoints(IS_MVP);

  // Expose a live progress update function
  window.setProgress = (value) => {
    const newOffset = progressDashOffset(totalLen, value);
    progressPath.style.transition = 'stroke-dashoffset 0.8s ease-in-out';
    progressPath.setAttribute('stroke-dashoffset', newOffset);
    journeyState.progress = value;
  };
}

// ── Zone injection ────────────────────────────────────────────────────────────

async function injectZones(geoLayer, checkpoints, mode, canvasH) {
  const segH = mode === 'mvp' ? CANVAS.segmentHeight : canvasH / (CHECKPOINTS.length - 1);

  for (const cp of checkpoints) {
    const zoneFile = `assets/zones/zone-${String(cp.index + 1).padStart(2, '0')}-${cp.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.svg`;

    try {
      const resp = await fetch(zoneFile);
      if (!resp.ok) continue;
      const svgText = await resp.text();
      const parser = new DOMParser();
      const zoneSVG = parser.parseFromString(svgText, 'image/svg+xml').documentElement;

      // Position each zone so its centre aligns with the checkpoint anchor y
      const coords = mode === 'mvp' ? (cp.mvp || cp.full) : cp.full;
      const zoneY = coords.y - segH / 2;

      const g = document.createElementNS(NS, 'g');
      g.setAttribute('id', `zone-${cp.id}`);
      g.setAttribute('transform', `translate(0, ${zoneY})`);

      // Copy children from parsed zone SVG, respecting defs
      for (const child of Array.from(zoneSVG.children)) {
        // Re-namespace the child nodes and append
        const imported = document.importNode(child, true);
        g.appendChild(imported);
      }

      geoLayer.appendChild(g);
    } catch (_) {
      // Zone file not yet created — skip silently
    }
  }
}

// ── SVG helpers ───────────────────────────────────────────────────────────────

function makeSVGGroup(parent, id) {
  const g = document.createElementNS(NS, 'g');
  g.setAttribute('id', id);
  parent.appendChild(g);
  return g;
}

function appendBackground(layer, canvasH) {
  // Base parchment fill
  const bg = document.createElementNS(NS, 'rect');
  bg.setAttribute('width', CANVAS.width);
  bg.setAttribute('height', canvasH);
  bg.setAttribute('fill', '#F5E6C8');
  bg.setAttribute('filter', 'url(#paper-grain)');
  layer.appendChild(bg);

  // Vignette overlay
  const vignette = document.createElementNS(NS, 'rect');
  vignette.setAttribute('width', CANVAS.width);
  vignette.setAttribute('height', canvasH);
  vignette.setAttribute('fill', 'url(#vignette-grad)');
  vignette.setAttribute('pointer-events', 'none');
  layer.appendChild(vignette);

  // SVG filter defs (injected into the root SVG)
  appendDefs(layer.ownerSVGElement, canvasH);
}

function appendDefs(svg, canvasH) {
  const defs = document.createElementNS(NS, 'defs');

  // Paper grain filter
  defs.innerHTML = `
    <filter id="paper-grain" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3"
        stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
      <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended"/>
      <feComponentTransfer in="blended">
        <feFuncR type="linear" slope="0.95" intercept="0.05"/>
        <feFuncG type="linear" slope="0.93" intercept="0.04"/>
        <feFuncB type="linear" slope="0.88" intercept="0.03"/>
      </feComponentTransfer>
    </filter>

    <radialGradient id="vignette-grad" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="100%" stop-color="rgba(61,43,31,0.22)"/>
    </radialGradient>

    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
    </style>
  `;

  svg.insertBefore(defs, svg.firstChild);
}
