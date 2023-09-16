(() => {
    const refs = {
      openModalBtn: document.querySelector("#modal-rating-opener"),
      closeModalBtn: document.querySelector("#modal-rating-closer"),
      modal: document.querySelector("#modal-rating-js"),
    };
  
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
  
    function toggleModal() {
      refs.modal.classList.toggle("is-hidden");
    }
  })();