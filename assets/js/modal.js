export default function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalBody = modal?.querySelector('.modal-body');
  const modalContent = modal?.querySelector('.modal-content');
  const closeBtn = modal?.querySelector('.modal-close');

  if (!modal || !modalBody || !closeBtn) {
    console.warn('Modal elements not found');
    return;
  }

  const closeModal = () => {
    modal.style.display = 'none';
    modalBody.innerHTML = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.projects__card').forEach((card) => {
    card.addEventListener('click', () => {
      const projectId = card.dataset.projectId;
      const template = card.querySelector(`#project-${projectId}`);

      // Nettoyage modal
      modalBody.innerHTML = '';

      // Clonage du template et wrapper pour CSS
      const clone = template.content.cloneNode(true);
      const wrapper = document.createElement('div');
      wrapper.classList.add('project-content');
      wrapper.appendChild(clone);

      modalBody.appendChild(wrapper);

      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      // SOLUTION : Réinitialiser le scroll de .modal-content
      if (modalContent) {
        modalContent.scrollTop = 0;
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
}
