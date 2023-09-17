function toggleModal(refs) {
    refs.modal.classList.toggle('is-hidden');
  }

export function createListeners() {

  const refs = {
    openModalBtn: document.querySelector('#modal-rating-opener'),
    closeModalBtn: document.querySelector('#modal-rating-closer'),
    modal: document.querySelector('#modal-rating-js'),
  };
    
    
    console.log(refs)
    

  refs.openModalBtn.addEventListener('click', () => toggleModal(refs));
  refs.closeModalBtn.addEventListener('click', () => toggleModal(refs));
}
