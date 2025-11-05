document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('project-modal');
  const modalBody = modal.querySelector('.modal-body');
  const closeBtn = modal.querySelector('.modal-close');

  document.querySelectorAll('.projects__card').forEach((card) => {
    card.addEventListener('click', async () => {
      const url = card.dataset.url;
      const res = await fetch(url);
      const html = await res.text();

      modalBody.innerHTML = html;
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
});
