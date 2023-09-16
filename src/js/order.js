(() => {
    const refs = {
      openModalBtn: document.querySelector("#modal-order-opener"),
      closeModalBtn: document.querySelector("#modal-order-closer"),
      modal: document.querySelector("#modal-order-js"),
    };
  
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
  
    function toggleModal() {
      refs.modal.classList.toggle("is-hidden");
    }
  })();