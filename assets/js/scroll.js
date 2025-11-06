/**
 * Initialise le comportement de scroll fluide pour le site.
 * - Affiche un bouton "Retour en haut" lorsque l'utilisateur scroll.
 * - Gère le scroll fluide pour tous les liens d’ancrage internes.
 * - Ferme automatiquement un menu mobile si ouvert lors du clic sur un lien.
 *
 * @export
 * @default
 */
export default function initScroll() {
  /** @type {HTMLButtonElement | null} */
  const backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    backToTop.style.transition = 'opacity 0.3s';
    backToTop.style.opacity = '0';
    backToTop.style.display = 'block';

    // Affiche ou cache le bouton en fonction du scroll
    window.addEventListener('scroll', () => {
      backToTop.style.opacity = window.scrollY > 300 ? '1' : '0';
    });

    // Scroll fluide vers le haut
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll fluide pour tous les liens internes
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      // Décalage pour un menu fixe éventuel
      const yOffset = -80;
      const y =
        targetElement.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });

      // Ferme un menu mobile si ouvert
      const menu = document.querySelector('.menu--open');
      if (menu) menu.classList.remove('menu--open');
    });
  });
}
