import { updateRating } from './fetch-api';

function toggleModal(refs) {
  refs.modal.classList.toggle('is-hidden');
}

export function createListeners(id) {
  const refs = {
    openModalBtn: document.querySelector('#modal-rating-opener'),
    closeModalBtn: document.querySelector('#modal-rating-closer'),
    modal: document.querySelector('#modal-rating-js'),
    submit: document.querySelector('.modal-submit-button-rating'),
    form: document.querySelector('.rating-form'),
  };

  refs.openModalBtn.addEventListener('click', () => toggleModal(refs));
  refs.closeModalBtn.addEventListener('click', () => toggleModal(refs));

  console.log(refs);

  refs.form.addEventListener('submit', async e => {
    e.preventDefault();

    const form = new FormData(e.target);

    const data = Object.fromEntries(form);

    console.log(Object.fromEntries(form));

    try {
      const responseData = await updateRating(
        id,
        Number(data.rate),
        data.email
      );
      toggleModal(refs);
    } catch (error) {
      // notifix;
    }

    console.log(responseData);
  });
}
