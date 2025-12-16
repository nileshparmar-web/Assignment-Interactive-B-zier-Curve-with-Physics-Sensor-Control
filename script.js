const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);

resizeCanvas();

let P0 = { x: 80, y: canvas.height / 2 };
let P3 = { x: canvas.width - 80, y: canvas.height / 2 };

let P1 = {
  x: 250,
  y: canvas.height / 2 - 120,
  vx: 0,
  vy: 0,
  target: { x: 250, y: canvas.height / 2 - 120 }
};

let P2 = {
  x: canvas.width - 250,
  y: canvas.height / 2 - 120,
  vx: 0,
  vy: 0,
  target: { x: canvas.width - 250, y: canvas.height / 2 - 120 }
};

let dragPoint = null;

canvas.addEventListener('mousedown', (e) => {
  const mx = e.clientX;
  const my = e.clientY;

  if (Math.hypot(mx - P1.x, my - P1.y) < 10) dragPoint = P1;
  else if (Math.hypot(mx - P2.x, my - P2.y) < 10) dragPoint = P2;
});

canvas.addEventListener('mouseup', () => (dragPoint = null));

canvas.addEventListener('mousemove', (e) => {
  if (dragPoint) {
    dragPoint.target.x = e.clientX;
    dragPoint.target.y = e.clientY;
  }
});

function getBezierPoint(P0, P1, P2, P3, t) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  return {
    x: uuu * P0.x + 3 * uu * t * P1.x + 3 * u * tt * P2.x + ttt * P3.x,
    y: uuu * P0.y + 3 * uu * t * P1.y + 3 * u * tt * P2.y + ttt * P3.y,
  };
}

function getBezierTangent(P0, P1, P2, P3, t) {
  const u = 1 - t;
  return {
    x: 3 * u * u * (P1.x - P0.x) + 6 * u * t * (P2.x - P1.x) + 3 * t * t * (P3.x - P2.x),
    y: 3 * u * u * (P1.y - P0.y) + 6 * u * t * (P2.y - P1.y) + 3 * t * t * (P3.y - P2.y),
  };
}

function normalize(v) {
  const len = Math.hypot(v.x, v.y) || 1;
  return { x: v.x / len, y: v.y / len };
}
