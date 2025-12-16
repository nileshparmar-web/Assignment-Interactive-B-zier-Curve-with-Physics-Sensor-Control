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

const k = 0.08; 
const damping = 0.85; 

function updatePhysics() {
  [P1, P2].forEach((p) => {
    const ax = -k * (p.x - p.target.x) - damping * p.vx;
    const ay = -k * (p.y - p.target.y) - damping * p.vy;

    p.vx += ax;
    p.vy += ay;

    p.x += p.vx;
    p.y += p.vy;
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(P0.x, P0.y, P3.x, P3.y);
  gradient.addColorStop(0, '#60a5fa');
  gradient.addColorStop(1, '#c084fc');
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 4;

  ctx.beginPath();
  for (let t = 0; t <= 1; t += 0.01) {
    const p = getBezierPoint(P0, P1, P2, P3, t);
    if (t === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  [0.25, 0.5, 0.75].forEach((t) => {
    const p = getBezierPoint(P0, P1, P2, P3, t);
    const tan = normalize(getBezierTangent(P0, P1, P2, P3, t));
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + tan.x * 30, p.y + tan.y * 30);
    ctx.stroke();
  });

  [P0, P1, P2, P3].forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = i === 0 || i === 3 ? '#22c55e' : '#facc15';
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

function animate() {
  updatePhysics();
  draw();
  requestAnimationFrame(animate);
}
animate();
