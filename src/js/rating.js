import { updateRating } from './fetch-api';
import Notiflix from 'notiflix';

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
    inputs: document.querySelectorAll('.star-input'),
    span: document.querySelector('.count-rating'),
  };

  refs.openModalBtn.addEventListener('click', () => toggleModal(refs));
  refs.closeModalBtn.addEventListener('click', () => toggleModal(refs));

  console.log(refs);

  const handler = e => {
    const value = Number(e.target.value);

    refs.span.innerHTML = value.toFixed(1);

    refs.inputs.forEach((el, index) => {
      console.log(el.classList);

      if (index <= value - 1) {
        el.children[0].classList.add('active');
      } else {
        el.children[0].classList.remove('active');
      }
    });

    console.log(value);
  };

  refs.inputs.forEach(el => {
    el.children[1].addEventListener('change', handler);
  });

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
      Notiflix.Notify.failure(error.response.data.message);
    }

    console.log(responseData);
  });
}
