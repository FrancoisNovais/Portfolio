import typeText from './typed.js';
import initProjectModal from './modal.js';
import initBubbles from './bubbles.js';
import initConsoleWelcome from './console-welcome.js';
import initScroll from './scroll.js';

// -------------------- Lancer la console de bienvenue --------------------
initConsoleWelcome();

// -------------------- Typed effect --------------------
typeText('#typed-text', '"Dév Fullstack"', 100);

// -------------------- Modal projets --------------------
initProjectModal();

/**
 * --------------------
 * Bubbles (animation)
 * --------------------
 * @type {Object} bubblesControl - Contrôle les bulles animées.
 * @property {Function} start - Démarre l'animation des bulles.
 * @property {Function} stop - Arrête l'animation des bulles.
 */
const bubblesControl = initBubbles();

// -------------------- Scroll smooth + bouton retour en haut --------------------
initScroll();

// -------------------- Switch animation --------------------
const animSwitch = document.getElementById('animation-switch');
if (animSwitch) {
  /** @type {HTMLElement} animIcon - L'icône à l'intérieur du switch animation. */
  const animIcon = animSwitch.querySelector('i');
  /** @type {boolean} isPlaying - État de l'animation (true = en cours, false = pause). */
  let isPlaying = true;

  /**
   * Toggle l'animation des bulles et change l'icône.
   */
  animSwitch.addEventListener('click', () => {
    isPlaying = !isPlaying;
    animSwitch.classList.toggle('paused');
    animIcon.className = isPlaying ? 'fa-solid fa-play' : 'fa-solid fa-pause';

    if (isPlaying) {
      bubblesControl.start();
    } else {
      bubblesControl.stop();
    }
  });
}

/**
 * --------------------
 * Switch thème
 * --------------------
 * @type {HTMLElement|null} themeSwitch - Le switch pour changer le thème (clair / sombre).
 */
const themeSwitch = document.getElementById('theme-switch');
if (themeSwitch) {
  /** @type {HTMLElement} html - L'élément racine <html> pour appliquer les classes de thème. */
  const html = document.documentElement;
  /** @type {HTMLElement} themeIcon - L'icône à l'intérieur du switch thème. */
  const themeIcon = themeSwitch.querySelector('i');

  /** @type {string} theme - Thème actuel ('light' ou 'dark'). */
  let theme = localStorage.getItem('theme') || 'dark';

  // Applique le thème au chargement
  html.classList.add(theme + '-mode');
  themeIcon.className =
    theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';

  /**
   * Toggle le thème clair/sombre et met à jour l'icône et le localStorage.
   */
  themeSwitch.addEventListener('click', () => {
    theme = theme === 'light' ? 'dark' : 'light';
    html.classList.toggle('light-mode');
    html.classList.toggle('dark-mode');
    localStorage.setItem('theme', theme);
    themeIcon.className =
      theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  });
}
