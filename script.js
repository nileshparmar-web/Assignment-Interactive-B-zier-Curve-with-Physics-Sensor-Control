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

