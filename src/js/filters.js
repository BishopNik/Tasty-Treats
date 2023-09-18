import { renderMain } from './recipe-list';
import { renderCardsOptions } from './recipe-list';
import { fetchRecipeCards, recipesApi } from './recipe-list';

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
  form: document.querySelector('#search-form'),
  input: document.querySelector('#input-search-field'),
};

elements.timeDropdown.addEventListener('click', onTimeOptionsClick);
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
  document.addEventListener('click', onCloseTimeFilter);
};

elements.countryDropdown.onclick = function () {
  elements.countryDropdown.classList.toggle('active');
  document.addEventListener('click', onCloseCountryFilter);
};

elements.ingrDropdown.onclick = function () {
  elements.ingrDropdown.classList.toggle('active');
  document.addEventListener('click', onCloseIngrFilter);
};

// close list
const toggleTimeMenu = () => {
  elements.timeDropdown.classList.toggle('active');
  document.removeEventListener('click', onCloseTimeFilter);
};
const toggleCountryMenu = () => {
  elements.countryDropdown.classList.toggle('active');
  document.removeEventListener('click', onCloseCountryFilter);
};
const toggleIngrMenu = () => {
  elements.ingrDropdown.classList.toggle('active');
  document.removeEventListener('click', onCloseIngrFilter);
};

function onCloseTimeFilter(evt) {
  const menu = elements.timeDropdown;
  let target = evt.target;
  let its_menu = target === menu || menu.contains(target);
  let menu_is_active = menu.classList.contains('active');

  if (!its_menu && menu_is_active) {
    toggleTimeMenu();
  }
}

function onCloseCountryFilter(evt) {
  const menu = elements.countryDropdown;
  let target = evt.target;
  let its_menu = target === menu || menu.contains(target);
  let menu_is_active = menu.classList.contains('active');

  if (!its_menu && menu_is_active) {
    toggleCountryMenu();
  }
}

function onCloseIngrFilter(evt) {
  const menu = elements.ingrDropdown;
  let target = evt.target;
  let its_menu = target === menu || menu.contains(target);
  let menu_is_active = menu.classList.contains('active');

  if (!its_menu && menu_is_active) {
    toggleIngrMenu();
  }
}

// Filters API

// elements.form.addEventListener('submit', onSearchBtnClick);
// renderCardsOptions.params.limit = 300;
// const array = fetchRecipeCards(recipesApi, renderCardsOptions).then(data =>
//   // console.log(data.results)
// );

// elements.input.addEventListener('input', onHendlerPress);

// function onHendlerPress(evt) {
//   let searchValue = evt.currentTarget.value.trim().toLowerCase();
//   // console.log(searchValue);

//   renderCardsOptions.params.page = 1;
//   renderCardsOptions.params.category = '';
//   renderCardsOptions.params.time = '';
//   renderCardsOptions.params.area = '';
//   renderCardsOptions.params.ingredient = '';
//   renderMain(renderCardsOptions);
// }
