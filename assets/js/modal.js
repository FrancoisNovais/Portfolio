/**
 * Initialise le modal de projet.
 * Permet d'ouvrir un modal lorsqu'une carte de projet est cliquée,
 * de cloner son template HTML, et de gérer la fermeture du modal.
 */
export default function initProjectModal() {
  /** @type {HTMLElement | null} */
  const modal = document.getElementById('project-modal');
  /** @type {HTMLElement | null} */
  const modalBody = modal?.querySelector('.modal-body');
  /** @type {HTMLElement | null} */
  const modalContent = modal?.querySelector('.modal-content');
  /** @type {HTMLElement | null} */
  const closeBtn = modal?.querySelector('.modal-close');
  if (!modal || !modalBody || !closeBtn || !modalContent) return;

  const ANIM_MS = 420;

  /**
   * Calcule la largeur de la scrollbar pour éviter le décalage du body.
   * @returns {number} largeur de la scrollbar
   */
  const getScrollbarWidth = () =>
    window.innerWidth - document.documentElement.clientWidth;

  /**
   * Ferme le modal et réinitialise son contenu et le scroll de la page.
   */
  const closeModal = () => {
    modal.classList.remove('modal--open');

    // Réactive le scroll et enlève la compensation
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    setTimeout(() => {
      modal.style.display = 'none';
      modalBody.innerHTML = '';
      modal.style.removeProperty('--dx');
      modal.style.removeProperty('--dy');
    }, ANIM_MS + 20);
  };

  // Ajouter l'événement click sur chaque carte de projet
  document.querySelectorAll('.projects__card').forEach((card) => {
    card.addEventListener('click', () => {
      /** @type {string} */
      const projectId = card.dataset.projectId;
      /** @type {HTMLTemplateElement | null} */
      const template = card.querySelector(`#project-${projectId}`);

      if (!template) return;

      // Nettoyer le modal
      modalBody.innerHTML = '';

      // Cloner le template et créer un wrapper pour le CSS
      const clone = template.content.cloneNode(true);
      const wrapper = document.createElement('div');
      wrapper.classList.add('project-content');
      wrapper.appendChild(clone);
      modalBody.appendChild(wrapper);

      // --- Compensation de la scrollbar pour éviter le décalage latéral ---
      const scrollBarWidth = getScrollbarWidth();
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      document.body.style.overflow = 'hidden';

      // --- Calcul du décalage entre la carte et le centre du modal ---
      modal.style.display = 'flex';

      const cardRect = card.getBoundingClientRect();
      const modalRect = modalContent.getBoundingClientRect();

      const dx =
        cardRect.left +
        cardRect.width / 2 -
        (modalRect.left + modalRect.width / 2);
      const dy =
        cardRect.top +
        cardRect.height / 2 -
        (modalRect.top + modalRect.height / 2);

      modal.style.setProperty('--dx', `${dx}px`);
      modal.style.setProperty('--dy', `${dy}px`);

      // Forcer un repaint avant de déclencher l'animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => modal.classList.add('modal--open'));
      });

      // Réinitialiser le scroll de .modal-content
      modalContent.scrollTop = 0;
    });
  });

  // Événement de fermeture via le bouton
  closeBtn.addEventListener('click', closeModal);

  // Événement de fermeture en cliquant en dehors du modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Événement de fermeture via la touche Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
}
