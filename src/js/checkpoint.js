import { CHECKPOINTS, journeyState } from './config.js';

/**
 * Set the state of a checkpoint and re-render its marker.
 * @param {number} index - 1-based checkpoint index (1 = Copenhagen)
 * @param {'locked'|'unlocked'|'current'} state
 */
export function setCheckpointState(index, state) {
  const cp = CHECKPOINTS[index - 1];
  if (!cp) return;
  cp.state = state;
  renderMarker(cp);
}

/**
 * Initialize all checkpoint markers based on config state.
 * @param {boolean} isMvp - if true, only render first 3 checkpoints
 */
export function initCheckpoints(isMvp = true) {
  const list = isMvp ? CHECKPOINTS.slice(0, 3) : CHECKPOINTS;
  list.forEach(cp => renderMarker(cp));
}

/**
 * Render (or re-render) a single checkpoint marker into its SVG anchor group.
 */
export function renderMarker(cp) {
  const anchor = document.getElementById(cp.id);
  if (!anchor) return;

  // Clear previous marker
  while (anchor.firstChild) anchor.removeChild(anchor.firstChild);

  const coords = anchor.dataset.mode === 'full' ? cp.full : cp.mvp || cp.full;
  const cx = coords?.x ?? cp.full.x;
  const cy = coords?.y ?? cp.full.y;

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('class', `checkpoint-marker state-${cp.state}`);
  g.setAttribute('data-cp-id', cp.id);
  g.setAttribute('data-cp-index', cp.index);
  g.setAttribute('role', 'button');
  g.setAttribute('aria-label', `${cp.name} checkpoint — ${cp.state}`);
  g.setAttribute('tabindex', '0');

  if (cp.state === 'unlocked' || cp.state === 'current') {
    g.appendChild(buildUnlockedMarker(cp, cx, cy));
  } else {
    g.appendChild(buildLockedMarker(cp, cx, cy));
  }

  // "YOU ARE HERE" banner for current checkpoint
  if (cp.state === 'current') {
    g.appendChild(buildCurrentBanner(cx, cy));
  }

  anchor.appendChild(g);

  // Click / keyboard handler
  g.addEventListener('click', () => onMarkerClick(cp));
  g.addEventListener('keydown', e => { if (e.key === 'Enter') onMarkerClick(cp); });
}

function buildUnlockedMarker(cp, cx, cy) {
  const ns = 'http://www.w3.org/2000/svg';
  const cardW = 200, cardH = 280;
  const x = cx - cardW / 2;
  const y = cy - cardH / 2;

  const g = document.createElementNS(ns, 'g');
  g.setAttribute('transform', `translate(${x}, ${y})`);

  // Card background
  const bg = document.createElementNS(ns, 'rect');
  bg.setAttribute('width', cardW); bg.setAttribute('height', cardH);
  bg.setAttribute('rx', '8'); bg.setAttribute('ry', '8');
  bg.setAttribute('fill', '#FAF3E6');
  bg.setAttribute('stroke', '#3D2B1F'); bg.setAttribute('stroke-width', '2.5');
  g.appendChild(bg);

  // Ornate frame corners
  appendCornerFlourishes(g, cardW, cardH);

  // Inner border
  const inner = document.createElementNS(ns, 'rect');
  inner.setAttribute('x', '10'); inner.setAttribute('y', '10');
  inner.setAttribute('width', cardW - 20); inner.setAttribute('height', cardH - 20);
  inner.setAttribute('fill', 'none');
  inner.setAttribute('stroke', '#8B6F47'); inner.setAttribute('stroke-width', '1');
  inner.setAttribute('stroke-dasharray', '4 3');
  g.appendChild(inner);

  // Card artwork area (placeholder for client-supplied art)
  const artArea = document.createElementNS(ns, 'rect');
  artArea.setAttribute('x', '20'); artArea.setAttribute('y', '20');
  artArea.setAttribute('width', '160'); artArea.setAttribute('height', '200');
  artArea.setAttribute('fill', '#F5E6C8');
  artArea.setAttribute('stroke', '#8B6F47'); artArea.setAttribute('stroke-width', '1');
  g.appendChild(artArea);

  // Placeholder cross-hatch if no image
  if (!cp.card.front.image) {
    const ph = document.createElementNS(ns, 'g');
    ph.setAttribute('opacity', '0.3');
    for (let i = 0; i < 8; i++) {
      const line = document.createElementNS(ns, 'line');
      line.setAttribute('x1', 20 + i * 22); line.setAttribute('y1', 20);
      line.setAttribute('x2', 20); line.setAttribute('y2', 20 + i * 27);
      line.setAttribute('stroke', '#8B6F47'); line.setAttribute('stroke-width', '0.8');
      ph.appendChild(line);
    }
    g.appendChild(ph);
  }

  // City name label
  const label = document.createElementNS(ns, 'text');
  label.setAttribute('x', cardW / 2); label.setAttribute('y', cardH - 28);
  label.setAttribute('text-anchor', 'middle');
  label.setAttribute('font-family', 'Cormorant Garamond, Georgia, serif');
  label.setAttribute('font-size', '18');
  label.setAttribute('font-variant', 'small-caps');
  label.setAttribute('fill', '#3D2B1F');
  label.setAttribute('letter-spacing', '2');
  label.textContent = cp.name;
  g.appendChild(label);

  // Km label
  const km = document.createElementNS(ns, 'text');
  km.setAttribute('x', cardW / 2); km.setAttribute('y', cardH - 14);
  km.setAttribute('text-anchor', 'middle');
  km.setAttribute('font-family', 'Cormorant Garamond, Georgia, serif');
  km.setAttribute('font-size', '11');
  km.setAttribute('fill', '#8B6F47');
  km.textContent = `${cp.km} km`;
  g.appendChild(km);

  return g;
}

function buildLockedMarker(cp, cx, cy) {
  const ns = 'http://www.w3.org/2000/svg';
  const cardW = 200, cardH = 280;
  const x = cx - cardW / 2;
  const y = cy - cardH / 2;

  const g = document.createElementNS(ns, 'g');
  g.setAttribute('transform', `translate(${x}, ${y})`);
  g.setAttribute('opacity', '0.62');

  // Card background
  const bg = document.createElementNS(ns, 'rect');
  bg.setAttribute('width', cardW); bg.setAttribute('height', cardH);
  bg.setAttribute('rx', '8'); bg.setAttribute('ry', '8');
  bg.setAttribute('fill', '#FAF3E6');
  bg.setAttribute('stroke', '#8B6F47'); bg.setAttribute('stroke-width', '2');
  g.appendChild(bg);

  appendCornerFlourishes(g, cardW, cardH);

  const inner = document.createElementNS(ns, 'rect');
  inner.setAttribute('x', '10'); inner.setAttribute('y', '10');
  inner.setAttribute('width', cardW - 20); inner.setAttribute('height', cardH - 20);
  inner.setAttribute('fill', 'none');
  inner.setAttribute('stroke', '#A89880'); inner.setAttribute('stroke-width', '1');
  inner.setAttribute('stroke-dasharray', '4 3');
  g.appendChild(inner);

  // "?" glyph
  const q = document.createElementNS(ns, 'text');
  q.setAttribute('x', cardW / 2); q.setAttribute('y', cardH / 2 + 30);
  q.setAttribute('text-anchor', 'middle');
  q.setAttribute('font-family', 'Cormorant Garamond, Georgia, serif');
  q.setAttribute('font-size', '96');
  q.setAttribute('fill', '#8B6F47');
  q.setAttribute('opacity', '0.7');
  q.textContent = '?';
  g.appendChild(q);

  // City name
  const label = document.createElementNS(ns, 'text');
  label.setAttribute('x', cardW / 2); label.setAttribute('y', cardH - 28);
  label.setAttribute('text-anchor', 'middle');
  label.setAttribute('font-family', 'Cormorant Garamond, Georgia, serif');
  label.setAttribute('font-size', '18');
  label.setAttribute('font-variant', 'small-caps');
  label.setAttribute('fill', '#8B6F47');
  label.setAttribute('letter-spacing', '2');
  label.textContent = cp.name;
  g.appendChild(label);

  const km = document.createElementNS(ns, 'text');
  km.setAttribute('x', cardW / 2); km.setAttribute('y', cardH - 14);
  km.setAttribute('text-anchor', 'middle');
  km.setAttribute('font-family', 'Cormorant Garamond, Georgia, serif');
  km.setAttribute('font-size', '11');
  km.setAttribute('fill', '#A89880');
  km.textContent = `${cp.km} km`;
  g.appendChild(km);

  return g;
}

function buildCurrentBanner(cx, cy) {
  const ns = 'http://www.w3.org/2000/svg';
  const g = document.createElementNS(ns, 'g');
  g.setAttribute('transform', `translate(${cx - 75}, ${cy + 150})`);

  const bg = document.createElementNS(ns, 'rect');
  bg.setAttribute('width', '150'); bg.setAttribute('height', '28');
  bg.setAttribute('rx', '4'); bg.setAttribute('fill', '#C4714F');
  g.appendChild(bg);

  const t = document.createElementNS(ns, 'text');
  t.setAttribute('x', '75'); t.setAttribute('y', '19');
  t.setAttribute('text-anchor', 'middle');
  t.setAttribute('font-family', 'Cormorant Garamond, Georgia, serif');
  t.setAttribute('font-size', '12');
  t.setAttribute('font-variant', 'small-caps');
  t.setAttribute('fill', '#FAF3E6');
  t.setAttribute('letter-spacing', '2');
  t.textContent = 'You Are Here';
  g.appendChild(t);

  return g;
}

/**
 * Append four corner flourish decorations to a card group.
 */
function appendCornerFlourishes(g, w, h) {
  const ns = 'http://www.w3.org/2000/svg';
  const size = 18;
  const corners = [
    { x: 5, y: 5 },
    { x: w - 5 - size, y: 5 },
    { x: 5, y: h - 5 - size },
    { x: w - 5 - size, y: h - 5 - size },
  ];
  corners.forEach(({ x, y }) => {
    const f = document.createElementNS(ns, 'path');
    // Simple diamond + cross flourish
    const cx = x + size / 2, cy = y + size / 2, r = size / 2 - 1;
    f.setAttribute('d',
      `M ${cx} ${cy - r} L ${cx + r} ${cy} L ${cx} ${cy + r} L ${cx - r} ${cy} Z ` +
      `M ${cx - r} ${cy} L ${cx + r} ${cy} M ${cx} ${cy - r} L ${cx} ${cy + r}`
    );
    f.setAttribute('fill', 'none');
    f.setAttribute('stroke', '#8B6F47');
    f.setAttribute('stroke-width', '1');
    g.appendChild(f);
  });
}

function onMarkerClick(cp) {
  if (cp.state === 'locked') return;
  import('./card.js').then(m => m.openCard(cp));
}
