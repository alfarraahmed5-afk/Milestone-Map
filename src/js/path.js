/**
 * Catmull-Rom spline through checkpoint centers with sinusoidal x-offset.
 * The sinusoidal offset gives each inter-checkpoint segment an organic left-right
 * weave: x(t) = 540 + 80 * sin(t * PI), keeping the path through anchor centers
 * while avoiding a perfectly straight line.
 */

const SINE_AMPLITUDE = 80; // max horizontal deviation from center (px)
const STEPS = 20;          // curve smoothness per segment

/**
 * Generate intermediate points between two checkpoints with sinusoidal x-offset.
 * The curve passes through both endpoints exactly (t=0 and t=1 give exact anchor x).
 */
function segmentPoints(p0, p1, steps = STEPS) {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = p0.x + (p1.x - p0.x) * t + SINE_AMPLITUDE * Math.sin(t * Math.PI);
    const y = p0.y + (p1.y - p0.y) * t;
    points.push({ x, y });
  }
  return points;
}

/**
 * Build full path points array through all checkpoints.
 * @param {Array<{x: number, y: number}>} anchors - checkpoint centers ordered bottom→top
 * @returns {Array<{x: number, y: number}>}
 */
export function buildPathPoints(anchors) {
  if (anchors.length < 2) return anchors;
  const all = [];
  for (let i = 0; i < anchors.length - 1; i++) {
    const seg = segmentPoints(anchors[i], anchors[i + 1]);
    if (i > 0) seg.shift(); // avoid duplicating shared endpoints
    all.push(...seg);
  }
  return all;
}

/**
 * Convert array of points to SVG path `d` attribute string.
 */
export function pointsToPathD(points) {
  if (!points.length) return '';
  const [first, ...rest] = points;
  return `M ${first.x.toFixed(1)} ${first.y.toFixed(1)} ` +
    rest.map(p => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
}

/**
 * Calculate the total arc length of the path (approximate, segment by segment).
 * Used to compute stroke-dasharray for progress animation.
 */
export function pathLength(points) {
  let len = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    len += Math.sqrt(dx * dx + dy * dy);
  }
  return len;
}

/**
 * Given a progress value (0–1), return the SVG dashoffset value so the
 * dashed progress line is drawn from the start up to that fraction of the path.
 * @param {number} totalLength - full path length in px
 * @param {number} progress - 0.0 to 1.0
 */
export function progressDashOffset(totalLength, progress) {
  return totalLength * (1 - Math.max(0, Math.min(1, progress)));
}
