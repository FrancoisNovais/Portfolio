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

  if (!modal || !modalBody || !closeBtn) {
    console.warn('Modal elements not found');
    return;
  }

  /**
   * Ferme le modal et réinitialise son contenu et le scroll de la page.
   */
  const closeModal = () => {
    modal.style.display = 'none';
    modalBody.innerHTML = '';
    document.body.style.overflow = '';
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

      // Afficher le modal et bloquer le scroll de la page
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      // Réinitialiser le scroll de .modal-content
      if (modalContent) {
        modalContent.scrollTop = 0;
      }
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
