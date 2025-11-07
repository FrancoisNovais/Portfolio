import initProjectModal from './modal.js';
import initBubbles from './bubbles.js';
import initConsoleWelcome from './console-welcome.js';
import initScroll from './scroll.js';

// -------------------- Lancer la console de bienvenue --------------------
initConsoleWelcome();

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
    animIcon.className = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    //                   ↑ Si animation joue → Pause ✅ (pour pouvoir mettre en pause)
    //                                          ↑ Si arrêtée → Play ✅ (pour pouvoir lancer)

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
  const html = document.documentElement;
  const themeIcon = themeSwitch.querySelector('i');

  // Récupère depuis localStorage OU garde 'dark' si déjà dans le HTML
  let theme = localStorage.getItem('theme');

  if (theme && theme !== 'dark') {
    // Si un autre thème est sauvegardé, l'applique
    html.classList.remove('dark-mode');
    html.classList.add(theme + '-mode');
  } else if (!theme) {
    // Première visite : sauvegarde 'dark' (déjà dans le HTML)
    localStorage.setItem('theme', 'dark');
    theme = 'dark';
  } else {
    theme = 'dark';
  }

  // Applique l'icône correspondante
  themeIcon.className =
    theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';

  // Toggle au clic
  themeSwitch.addEventListener('click', () => {
    theme = theme === 'light' ? 'dark' : 'light';
    html.classList.toggle('light-mode');
    html.classList.toggle('dark-mode');
    localStorage.setItem('theme', theme);
    themeIcon.className =
      theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  });
}
