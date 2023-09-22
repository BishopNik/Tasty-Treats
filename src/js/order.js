/** @format */

import { makeOrder } from './fetch-api';
import Inputmask from 'inputmask';
import Notiflix from 'notiflix';

(() => {
  const refs = {
    openModalBtn: document.querySelector('#modal-order-opener'),
    openModalBtnCart: document.querySelector('#modal-order-opener-cart'),
    closeModalBtn: document.querySelector('#modal-order-closer'),
    modal: document.querySelector('#modal-order-js'),
    submit: document.querySelector('.modal-submit-button-order'),
    form: document.querySelector('.modal-order-form'),
    phone: document.querySelector('#modal-order-tel'),
  };

  new Inputmask('+380(99) 999-99-99').mask(refs.phone);

  refs.openModalBtnCart.addEventListener('click', toggleModal);
  if (refs.openModalBtn) {
    refs.openModalBtn.addEventListener('click', toggleModal);
  }

  refs.closeModalBtn.addEventListener('click', toggleModal);
  document.addEventListener('keydown', onCloseModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }

  function onCloseModal({ target, key }) {
    if (refs.modal === target || key === 'Escape') {
      refs.modal.classList.add('is-hidden');
    }
  }

  refs.form.addEventListener('submit', async e => {
    e.preventDefault();

    const form = new FormData(e.target);

    const data = Object.fromEntries(form);

    const phone = `+380${Inputmask.unmask(data.phone, {
      mask: '+380(99) 999-99-99',
    })}`;

    try {
      const responseData = await makeOrder(
        data.name,
        phone,
        data.email,
        data.comment
      );
      toggleModal(refs);
    } catch (error) {
      Notiflix.Notify.failure(error.response.data.message);
    }
  });
})();
