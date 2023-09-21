/** @format */
import { renderMain } from './recipe-list';
import { renderCardsOptions } from './recipe-list';
import { fetchCategories } from './fetch-api.js';
import { resetFilters } from './filters';

// Подключаю axios, notiflix
import Notiflix from 'notiflix';

const list = document.querySelector('.categories-list');
const allCategoriesBtn = document.querySelector('.all-categories-btn');
allCategoriesBtn.classList.add('all-categories-btn-aktiv');
let itemArr;

renderMain(renderCardsOptions);

// Обработка данных, создание списка категорий в HTML
fetchCategories()
  .then(data => {
    let arrCategories = [...data];
    list.insertAdjacentHTML('beforeend', createCategoriesList(arrCategories));
    itemArr = [...list.children];
    return itemArr;
  })

  .catch(() => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

// Функция для создания списка

function createCategoriesList(arr) {
  return arr
    .map(
      ({ name, _id }) =>
        `<li><button type="button" class="categories-btn "id="${_id}">${name}</button></li>`
    )
    .join('');
}

// Ставлю прослушиватели на кнопку и список
allCategoriesBtn.addEventListener('click', onAllCategoriesBtnClick);
list.addEventListener('click', onListClick);

// Функция для отображения всех категорий

function onAllCategoriesBtnClick() {
  clearCurrentCategory(itemArr);
  allCategoriesBtn.classList.add('all-categories-btn-aktiv');
  resetFilters();

  renderCardsOptions.params.page = 1;
  renderCardsOptions.params.title = '';
  renderCardsOptions.params.category = '';
  renderCardsOptions.params.time = '';
  renderCardsOptions.params.area = '';
  renderCardsOptions.params.ingredient = '';
  renderMain(renderCardsOptions);
}

// Функция для отображения одной категории

function onListClick(evt) {
  if (evt.target === evt.currentTarget) {
    return;
  }
  allCategoriesBtn.classList.remove('all-categories-btn-aktiv');
  clearCurrentCategory(itemArr);
  resetFilters();

  evt.target.classList.add('curent-category');
  let currentCategory = { id: evt.target.id, name: evt.target.textContent };

  renderCardsOptions.params.page = 1;
  renderCardsOptions.params.category = evt.target.textContent;
  renderCardsOptions.params.title = '';
  renderCardsOptions.params.time = '';
  renderCardsOptions.params.area = '';
  renderCardsOptions.params.ingredient = '';
  renderMain(renderCardsOptions);

  return currentCategory;
}

// Функция для снятия выделения текущей категории
function clearCurrentCategory(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].children[0].classList.contains('curent-category')) {
      arr[i].children[0].classList.remove('curent-category');
    }
  }
}
