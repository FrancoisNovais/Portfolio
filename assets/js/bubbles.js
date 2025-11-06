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
      // Taille plus variée et plus grande
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

  // Moins de bulles : 8 au lieu de 12
  const bubbles = Array.from({ length: 8 }, () => new Bubble());

  function animate() {
    ctx.clearRect(0, 0, width, height);
    bubbles.forEach((b) => b.update());
    requestAnimationFrame(animate);
  }

  // --- éléments à recolorer ---
  const colorElements = [];
  document.querySelectorAll('*').forEach((el) => {
    const style = getComputedStyle(el);
    ['color', 'borderColor', 'backgroundColor', 'boxShadow'].forEach((prop) => {
      if (
        style[prop]?.includes('rgb(231, 85, 78)') ||
        style[prop]?.includes('#e7554e')
      ) {
        colorElements.push({ el, prop, original: style[prop] });
      }
    });
  });

  function applyColor(newColor) {
    document.documentElement.style.setProperty('--main-color', newColor);
  }

  // Clic → change la couleur
  document.body.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    bubbles.forEach((b) => {
      const d = Math.hypot(b.x - clickX, b.y - clickY);
      if (d < b.r) {
        // 1️⃣ appliquer la couleur aux éléments
        applyColor(b.color);

        // 2️⃣ mettre à jour la variable CSS globale
        document.documentElement.style.setProperty('--main-color', b.color);
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
