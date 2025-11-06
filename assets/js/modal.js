export default function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalBody = modal.querySelector('.modal-body');
  const closeBtn = modal.querySelector('.modal-close');

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
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modalBody.innerHTML = '';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      modalBody.innerHTML = '';
    }
  });
}
