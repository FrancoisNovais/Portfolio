export default function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalBody = modal.querySelector('.modal-body');
  const closeBtn = modal.querySelector('.modal-close');

  document.querySelectorAll('.projects__card').forEach((card) => {
    card.addEventListener('click', () => {
      const template = document.getElementById(`project-${card.dataset.projectId}`);
      modalBody.innerHTML = template.innerHTML;
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
