// main.js

import typeText from './typed.js';
import initProjectModal from './modal.js';
import initBubbles from './bubbles.js';
import initConsoleWelcome from './console-welcome.js';
import initScroll from './scroll.js'; // ← nouveau fichier scroll.js

// -------------------- Lancer la console de bienvenue --------------------
initConsoleWelcome();

// -------------------- Typed effect --------------------
typeText('#typed-text', '"Dév Fullstack"', 100);

// -------------------- Modal projets --------------------
initProjectModal();

// -------------------- Bubbles (animation) --------------------
initBubbles();

// -------------------- Scroll smooth + bouton retour en haut --------------------
initScroll();
