export default function initBubbles() {
  const canvas = document.getElementById('bubbles-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Palette harmonieuse
  const bubbleColors = [
    '#e7554e', // rouge principal
    '#ff3f2e', // rouge vif
    '#1aa182', // vert soutenu
    '#2080ff', // bleu vif
    '#9b30ff', // violet saturé
    '#f5b800' // jaune chaud
  ];

  class Bubble {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.r = Math.random() * 50 + 20; // 20 à 70px
      this.color =
        bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = (Math.random() - 0.5) * 1.2;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x - this.r < 0 || this.x + this.r > width) this.vx *= -1;
      if (this.y - this.r < 0 || this.y + this.r > height) this.vy *= -1;
      this.draw();
    }
  }

  // Fragments d’explosion
  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 6;
      this.vy = (Math.random() - 0.5) * 6;
      this.r = Math.random() * 6 + 2;
      this.color = color;
      this.alpha = 1;
      this.decay = Math.random() * 0.03 + 0.02;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
      this.draw();
    }
  }

  const bubbles = Array.from({ length: 8 }, () => new Bubble());
  const particles = [];

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Mise à jour des bulles
    bubbles.forEach(b => b.update());

    // Mise à jour des fragments d’explosion
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      if (p.alpha <= 0) particles.splice(i, 1);
    }

    requestAnimationFrame(animate);
  }

  // --- éléments à recolorer ---
  function applyColor(newColor) {
    document.documentElement.style.setProperty('--main-color', newColor);
  }

  // Clic → changer couleur + exploser la bulle
  document.body.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    bubbles.forEach((b, i) => {
      const d = Math.hypot(b.x - clickX, b.y - clickY);
      if (d < b.r) {
        // 1️⃣ appliquer la couleur
        applyColor(b.color);

        // 2️⃣ créer des fragments
        for (let j = 0; j < 15; j++) {
          particles.push(new Particle(b.x, b.y, b.color));
        }

        // 3️⃣ réinitialiser la bulle
        b.reset();
      }
    });
  });

  // Resize
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Canvas en arrière-plan
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';

  animate();
}
