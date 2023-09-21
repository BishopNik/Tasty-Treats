import axios from 'axios';
import { debounce } from 'debounce';

import { renderMain } from './recipe-list';
import { renderCardsOptions } from './recipe-list';
import { fetchAreas, fetchIngred } from './fetch-api';

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
  resetBtn: document.querySelector('.filter-reset-btn'),
  searchBtn: document.querySelector('#filter-icon-s'),
  searchResetBtn: document.querySelector('.filter-search-close-btn'),
};

elements.input.addEventListener('input', debounce(onHendlerPress, 300));

elements.timeOptions.addEventListener('click', onTimeOptionsClick);
elements.countryOptions.addEventListener('click', onCountryOptionsClick);
elements.ingrOptions.addEventListener('click', onIngrOptionsClick);

// <<<render gallery by search value>>>
function onHendlerPress(evt) {
  let searchValue = evt.target.value.trim().toLowerCase();

  if (searchValue.length > 0) {
    elements.searchBtn.classList.add('active-icon-serach');
    elements.searchResetBtn.classList.remove('is-hidden');
    elements.searchResetBtn.addEventListener('click', onSearchResetClick);
  } else {
    elements.searchBtn.classList.remove('active-icon-serach');
    elements.searchResetBtn.classList.add('is-hidden');
  }

  renderCardsOptions.params.page = 1;
  renderCardsOptions.params.title = `${searchValue}`;
  renderMain(renderCardsOptions);
}

function onSearchResetClick() {
  elements.input.value = '';
  elements.searchBtn.classList.remove('active-icon-serach');
  elements.searchResetBtn.classList.add('is-hidden');
}

// <<<<render gallery by time>>>>
function onTimeOptionsClick(evt) {
  const currentOpt = evt.target.textContent;
  elements.timeInput.value = currentOpt;
  const currentValue = Number.parseInt(elements.timeInput.value);

  console.log(evt.target);
  // if (evt.target.textContent === elements.timeInput.value) {
  //   return;
  // }
  renderCardsOptions.params.page = 1;
  renderCardsOptions.params.time = `${currentValue}`;
  renderMain(renderCardsOptions);
}

// render gallery by country
function onCountryOptionsClick(evt) {
  const currentOpt = evt.target.textContent;
  elements.countryInput.value = currentOpt;

  renderCardsOptions.params.page = 1;
  renderCardsOptions.params.area = `${currentOpt}`;
  renderMain(renderCardsOptions);
}

// render gallery by ingr
function onIngrOptionsClick(evt) {
  const currentOpt = evt.target.textContent;
  elements.ingrInput.value = currentOpt;
  const currentIngreed = evt.target.id;

  renderCardsOptions.params.page = 1;
  renderCardsOptions.params.ingredient = `${currentIngreed}`;
  renderMain(renderCardsOptions);
}

// <close list settings
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
// close list settings/>

// FILTERS API

// Country api and create markup=====>>>>>

fetchAreas()
  .then(data => {
    let arrCountry = [...data];

    elements.countryOptions.insertAdjacentHTML(
      'beforeend',
      createAreasList(arrCountry)
    );
  })
  .catch(error => console.log(error));

function createAreasList(arr) {
  return arr
    .sort((firstCountry, secondCountry) =>
      firstCountry.name.localeCompare(secondCountry.name)
    )
    .map(
      ({ name, _id }) =>
        `<li class="list-item js-item" id="${_id}">${name}</li>`
    )

    .join('');
}
// Country api and create markup<<<<<=====

// Ingredients api and create markup=====>>>>>

fetchIngred()
  .then(data => {
    let arrIngred = [...data];

    elements.ingrOptions.insertAdjacentHTML(
      'beforeend',
      createIngreedList(arrIngred)
    );
  })
  .catch(error => console.log(error));

function createIngreedList(arr) {
  return arr
    .sort((firstIngr, secondIngr) =>
      firstIngr.name.localeCompare(secondIngr.name)
    )
    .map(
      ({ name, _id }) =>
        `<li class="list-item js-item" id="${_id}">${name}</li>`
    )
    .join('');
}
// Ingredients api and create markup<<<<<=====

// Button reset
elements.resetBtn.addEventListener('click', onResetBtnClick);

export function resetFilters() {
  elements.timeInput.value = '';
  elements.countryInput.value = '';
  elements.ingrInput.value = '';
  elements.input.value = '';
}

function onResetBtnClick(evt) {
  resetFilters();

  elements.searchBtn.classList.remove('active-icon-serach');

  renderCardsOptions.params.page = 1;
  renderCardsOptions.params.category = '';
  renderCardsOptions.params.title = '';
  renderCardsOptions.params.time = '';
  renderCardsOptions.params.area = '';
  renderCardsOptions.params.ingredient = '';

  renderMain(renderCardsOptions);
}
