
const page = document.querySelector('.page');
const totalPages = document.querySelector('.totalPages');
const rangeButtons = document.querySelector('.range-btns')
const btn = document.querySelector('.check');
const forwardButtons = document.querySelectorAll('.forward-arrow-btn-js');
const backButtons = document.querySelectorAll('.back-arrow-btn-js');

btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    forwardButtons.forEach((elm) => elm.disabled = false)
    backButtons.forEach((elm) => elm.disabled = false)
    const pageValue = Number(page.value);
    const totalValue = Number(totalPages.value);
    let rangeButtonsArray = '';
    if (pageValue === 1) {
        backButtons.forEach((elm) => elm.disabled = true)
        rangeButtonsArray = `<button class="pagination-btn current-number-btn">1</button>`;
    } else if (pageValue === 2) {
        rangeButtonsArray = `<button class="pagination-btn number-btn">1</button><button class="pagination-btn current-number-btn">2</button>`;
    } else if (pageValue >= 3) {
        rangeButtonsArray = `<button class="pagination-btn number-btn">...</button><button class="pagination-btn number-btn">${pageValue - 1}</button><button class="pagination-btn current-number-btn">${pageValue}</button>`;
    } if ((totalValue - pageValue) === 0) {
        forwardButtons.forEach((elm) => elm.disabled = true)
    } else if ((totalValue - pageValue) === 1) {
        rangeButtonsArray += `<button class="pagination-btn number-btn">${pageValue + 1}</button>`
    } else if ((totalValue - pageValue) >= 2) {
        rangeButtonsArray += `<button class="pagination-btn number-btn">${pageValue + 1}</button><button class="pagination-btn number-btn">...</button>`
    }
    rangeButtons.innerHTML = rangeButtonsArray;
})


