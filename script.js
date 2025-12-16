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
