const elements = {
  timeInput: document.querySelector('.time-text-box'),
  countryInput: document.querySelector('.country-text-box'),
  ingrInput: document.querySelector('.ingr-text-box'),
  timeOptions: document.querySelector('.filter-time-list'),
  countryOptions: document.querySelector('.filter-country-list'),
  ingrOptions: document.querySelector('.filter-ingr-list'),
  timeDropdown: document.querySelector('.time-dropdown'),
  countryDropdown: document.querySelector('.country-dropdown'),
  ingrDropdown: document.querySelector('.ingr-dropdown'),
};

elements.timeOptions.addEventListener('click', onTimeOptionsClick);
elements.countryOptions.addEventListener('click', onCountryOptionsClick);
elements.ingrOptions.addEventListener('click', onIngrOptionsClick);

function onTimeOptionsClick(evt) {
  const currentOpt = evt.target.textContent;
  elements.timeInput.value = currentOpt;
}
function onCountryOptionsClick(evt) {
  const currentOpt = evt.target.textContent;
  elements.countryInput.value = currentOpt;
}
function onIngrOptionsClick(evt) {
  const currentOpt = evt.target.textContent;
  elements.ingrInput.value = currentOpt;
}

elements.timeDropdown.onclick = function () {
  elements.timeDropdown.classList.toggle('active');
};

elements.countryDropdown.onclick = function () {
  elements.countryDropdown.classList.toggle('active');
};

elements.ingrDropdown.onclick = function () {
  elements.ingrDropdown.classList.toggle('active');
};
