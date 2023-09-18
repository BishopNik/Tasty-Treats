(() => {
  const refs = {
    openModalBtn: document.querySelector('#modal-order-opener'),
    openModalBtnCart: document.querySelector('#modal-order-opener-cart'),
    closeModalBtn: document.querySelector('#modal-order-closer'),
    modal: document.querySelector('#modal-order-js'),
  };

  refs.openModalBtnCart.addEventListener('click', toggleModal);
  console.log(refs.openModalBtn);
  refs.openModalBtn.addEventListener('click', toggleModal);

  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }
})();
