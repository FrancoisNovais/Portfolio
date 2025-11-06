/**
 * Opens project modal using the <template> inside each card
 */
export default function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalBody = modal.querySelector('.modal-body');
  const closeBtn = modal.querySelector('.modal-close');

  document.querySelectorAll('.projects__card').forEach((card) => {
    card.addEventListener('click', () => {
      const projectId = card.dataset.projectId;
      const template = card.querySelector(`#project-${projectId}`);
      if (!template) return;

      modalBody.innerHTML = ''; // reset previous content
      modalBody.appendChild(template.content.cloneNode(true));
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
