/** @format */

import { Notify, Loading } from 'notiflix';
import sprite from '../img/icon/icon.svg';


import { handleLikeBtn } from './add_favorites';
import { createCard } from './recipe-card';
import { onOpenWindow } from './recipe';
import { fetchRecipeCards } from './fetch-api';
import { handleScroll } from './loading';

const pagination = document.querySelector('.pagination-btns');
const recipeCards = document.querySelector('.recipe-cards');
export const recipesApi = 'https://tasty-treats-backend.p.goit.global/api/recipes';
const cadrsContainer = document.querySelector('.recipe-cards');
cadrsContainer.addEventListener('click', onOpenModalWindow);

function renderCards(results, div, cardStyle) {
	let htmlCards = '';
	let likeIconUrl = `${sprite}#icon-like`;
	const favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];

	results.forEach(elm => {
		if (favorites.indexOf(elm._id) === -1) {
			likeIconUrl = `${sprite}#icon-like`;
		} else {
			likeIconUrl = `${sprite}#icon-like-full`;
		}
		htmlCards += createCard(elm, cardStyle, likeIconUrl);
	});
	div.innerHTML = htmlCards;
	handleScroll();
}

const selectors = {
	list: document.querySelector('.recipe-cards'),
};

selectors.list.addEventListener('click', handleLikeBtn);

function setPaginationButtons(div, page, total, option) {
		if (total === 1) {
		div.innerHTML = "";
		return
	}
	const iconRightPath = `${sprite}#icon-small-right`;
	const iconLeftPath = `${sprite}#icon-small-left`;
	let arrowButtons = ` <div class="back-btns">
      <button class="pagination-btn arrow-btn back-arrow-btn-js">
         <div class="left-arrow-icon double-arrow">
           <svg class="icon-double-arrow-one" width="24" height="24">
          <use href="${iconLeftPath}"></use>
        </svg>
        <svg class="icon-double-arrow-two" width="24" height="24">
          <use href="${iconLeftPath}"></use>
        </svg>
         </div>
        </svg></button
      ><button class="pagination-btn arrow-btn back-arrow-btn-js">
        <svg class="left-arrow-icon" width="24" height="24">
          <use href="${iconLeftPath}"></use>
        </svg>
      </button>
    </div>
    <div class="range-btns"></div>
    <div class="forward-btns">
      <button class="pagination-btn arrow-btn forward-arrow-btn-js">
       <svg class="right-arrow-icon" width="24" height="24">
          <use href="${iconRightPath}"></use>
        </svg>
       </button
      ><button class="pagination-btn arrow-btn forward-arrow-btn-js">
        <div class="right-arrow-icon double-arrow">
          <svg class="icon-double-arrow-one" width="24" height="24">
            <use href="${iconRightPath}"></use></svg
          ><svg class="icon-double-arrow-two" width="24" height="24">
            <use href="${iconRightPath}"></use>
          </svg>
        </div>
      </button>
    </div>`;
	div.innerHTML = arrowButtons;
	let rangeButtons = '';
	const forwardButtons = document.querySelectorAll('.forward-arrow-btn-js');
	const backButtons = document.querySelectorAll('.back-arrow-btn-js');
	const rangeButtonsElm = document.querySelector('.range-btns');
	if (page === 1) {
		backButtons.forEach(elm => (elm.disabled = true));
		rangeButtons += `<button class="pagination-btn current-number-btn">1</button>`;
	} else if (page === 2) {
		if (window.screen.width < 768) {
			rangeButtons += `<button class="pagination-btn current-number-btn">2</button>`;
		} else {
			rangeButtons += `<button class="pagination-btn number-btn">1</button><button class="pagination-btn current-number-btn">2</button>`;
		}
	} else if (page >= 3) {
		if (window.screen.width < 768) {
			rangeButtons += `<button class="pagination-btn dot-btn number-btn" disabled>...</button><button class="pagination-btn current-number-btn">${page}</button>`;
		} else {
			rangeButtons += `<button class="pagination-btn dot-btn number-btn" disabled>...</button><button class="pagination-btn number-btn">${
				page - 1
			}</button><button class="pagination-btn current-number-btn">${page}</button>`;
		}
	}
	if (total - page === 0) {
		forwardButtons.forEach(elm => (elm.disabled = true));
	} else if (total - page === 1) {
		if (window.screen.width < 768) {
		} else {
			rangeButtons += `<button class="pagination-btn number-btn">${page + 1}</button>`;
		}
	} else if (total - page >= 2) {
		if (window.screen.width < 768) {
			rangeButtons += `<button class="pagination-btn dot-btn number-btn" disabled>...</button>`;
		} else {
			rangeButtons += `<button class="pagination-btn number-btn">${
				page + 1
			}</button><button class="pagination-btn dot-btn number-btn" disabled>...</button>`;
		}
	}

	rangeButtonsElm.innerHTML = rangeButtons;
	const pagButtons = document.querySelectorAll('.pagination-btn');
	pagButtons.forEach(elm => {
		elm.addEventListener('click', evn => {
			if (
				elm.classList.contains('number-btn') ||
				elm.classList.contains('current-number-btn')
			) {
				option.params.page = Number(elm.textContent);
			} else if (
				elm.firstElementChild.classList.contains('left-arrow-icon') &&
				elm.firstElementChild.classList.contains('double-arrow')
			) {
				option.params.page = 1;
			} else if (elm.firstElementChild.classList.contains('left-arrow-icon')) {
				option.params.page -= 1;
			} else if (
				elm.firstElementChild.classList.contains('right-arrow-icon') &&
				elm.firstElementChild.classList.contains('double-arrow')
			) {
				option.params.page = total;
			} else if (elm.firstElementChild.classList.contains('right-arrow-icon')) {
				option.params.page += 1;
			} else {
			}
			renderMain(renderCardsOptions);
		});
	});
}

export async function renderMain(options) {
	Loading.dots();
	let responseData;
	await fetchRecipeCards(recipesApi, options)
	.then(data => {
	responseData = data;
	})
	.catch(error => Notify.failure('Oops! Something went wrong! Try reloading the page!'))
	.finally(Loading.remove(1000));
	renderCards(responseData.results, recipeCards, 'mainblock');
	setPaginationButtons(
		pagination,
		Number(responseData.currentPage),
		Number(responseData.totalPages),
		options
	);
}

export let renderCardsOptions = {
	params: {
		page: 1,
		limit: 9,
	},
};

function onOpenModalWindow({ target }) {
	if (!target.classList.contains('recipe-item-see')) {
		return;
	}
	onOpenWindow(target.dataset.id);
}

window.addEventListener('resize', () => {
	if (window.screen.width < 768) {
		renderCardsOptions.params.limit = 6;
	} else if (window.screen.width < 1280) {
		renderCardsOptions.params.limit = 8;
	} else {
		renderCardsOptions.params.limit = 9;
	}
	renderMain(renderCardsOptions);
});
