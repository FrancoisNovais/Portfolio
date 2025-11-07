/**
 * Initialise l'animation de bulles interactives sur un canvas en arrière-plan.
 * Chaque bulle peut être cliquée pour changer la couleur principale et générer des fragments d'explosion.
 */
export default function initBubbles() {
  const canvas = document.getElementById('bubbles-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let animationId = null;
  let isAnimating = true;

  /** Palette de couleurs disponibles pour les bulles */
  const bubbleColors = [
    '#e7554e', // rouge principal
    '#1aa182', // vert soutenu
    '#2080ff', // bleu vif
    '#9b30ff', // violet saturé
    '#f5b800' // jaune chaud
  ];

  /**
   * Représente une bulle animée.
   */
  class Bubble {
    constructor() {
      this.reset();
      this.hovered = false;
      this.hoverScale = 1;
    }

    /**
     * Réinitialise la bulle avec des valeurs aléatoires.
     */
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.r = Math.random() * 50 + 20;
      this.color =
        bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = (Math.random() - 0.5) * 1.2;
    }

    /** Dessine la bulle sur le canvas */
    draw() {
      // Animation smooth du scale
      const targetScale = this.hovered ? 1.1 : 1;
      this.hoverScale += (targetScale - this.hoverScale) * 0.15;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * this.hoverScale, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    /** Met à jour la position de la bulle et rebondit sur les bords */
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x - this.r < 0 || this.x + this.r > width) this.vx *= -1;
      if (this.y - this.r < 0 || this.y + this.r > height) this.vy *= -1;
      this.draw();
    }
  }

  /**
   * Représente un fragment d'explosion créé lors du clic sur une bulle.
   */
  class Particle {
    /**
     * @param {number} x - Position x initiale
     * @param {number} y - Position y initiale
     * @param {string} color - Couleur du fragment
     */
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

    /** Dessine le fragment avec transparence */
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }

    /** Met à jour la position et l'opacité du fragment */
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
      this.draw();
    }
  }

  const bubbles = Array.from({ length: 8 }, () => new Bubble());
  const particles = [];

  /** Boucle principale d'animation */
  function animate() {
    if (!isAnimating) return;

    ctx.clearRect(0, 0, width, height);

    bubbles.forEach((b) => b.update());

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      if (p.alpha <= 0) particles.splice(i, 1);
    }

    animationId = requestAnimationFrame(animate);
  }

  /**
   * Applique une nouvelle couleur principale à la page.
   * @param {string} newColor - Couleur au format HEX
   */
  function applyColor(newColor) {
    document.documentElement.style.setProperty('--main-color', newColor);

    const hex = newColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    document.documentElement.style.setProperty(
      '--main-color-rgb',
      `${r},${g},${b}`
    );
  }

  /** Effet de survol : change le curseur quand on est sur une bulle */
  document.body.addEventListener('mousemove', (e) => {
    if (!isAnimating) {
      document.body.style.cursor = 'default';
      return;
    }

    const target = e.target;
    if (
      target.closest('.hero__cta, .modal, .projects__card, .about__container')
    ) {
      return;
    }

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    let isOverBubble = false;
    bubbles.forEach((b) => {
      const d = Math.hypot(b.x - mouseX, b.y - mouseY);
      b.hovered = d < b.r; // Met à jour l'état hover de chaque bulle
      if (b.hovered) {
        isOverBubble = true;
      }
    });

    document.body.style.cursor = isOverBubble ? 'pointer' : 'default';
  });

  /** Gestion du clic sur le canvas pour exploser les bulles */
  document.body.addEventListener('click', (e) => {
    if (!isAnimating) return;

    const target = e.target;
    if (
      target.closest('.hero__cta, .modal, .projects__card, .about__container')
    ) {
      return;
    }

    const clickX = e.clientX;
    const clickY = e.clientY;

    bubbles.forEach((b) => {
      const d = Math.hypot(b.x - clickX, b.y - clickY);
      if (d < b.r) {
        applyColor(b.color);

        for (let j = 0; j < 15; j++) {
          particles.push(new Particle(b.x, b.y, b.color));
        }

        b.reset();
      }
    });
  });

  /** Ajuste le canvas au redimensionnement de la fenêtre */
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  animate();

  // Retourne des fonctions de contrôle
  return {
    stop: () => {
      isAnimating = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      document.body.style.cursor = 'default';
    },
    start: () => {
      if (!isAnimating) {
        isAnimating = true;
        animate();
      }
    }
  };
}
