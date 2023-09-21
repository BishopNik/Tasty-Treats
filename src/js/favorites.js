/** @format */

import { Notify, Loading } from 'notiflix';
import { fetchGetId } from './fetch-api';
import { markupButtons, markupCards, cardFilterCategories } from './markup-favorites';
import { handleLikeBtn } from './add_favorites';
import { createCard } from './recipe-card';

export let countPage = 0;
export let currentPage = 0;
export let allCard = [];
export const perPage = window.innerWidth > 767 ? 12 : 9;

const cardsFavorites = document.querySelector('.list_cards_favorites');
const buttonPagination = document.querySelector('.pagination-buttons');
cardsFavorites.addEventListener('click', delFromFavorites);

markupCardArray();

function readFavoritesCard() {
	let favoritesCard = [];
	try {
		favoritesCard = JSON.parse(localStorage.getItem('favorites'));
	} catch (error) {
		Notify.failure('Unable to load favorites. ' + error);
	}
	return favoritesCard;
}

async function createCardArray() {
	const favoritesIdArray = readFavoritesCard();
	let favoritesArray = [];

	if (favoritesIdArray.length) {
		const promiseArray = favoritesIdArray.map(async card => {
			const cardData = await fetchGetId(card);
			return cardData;
		});

		favoritesArray = await Promise.all(promiseArray);
	}

	return favoritesArray;
}

function markupCardArray() {
	Loading.dots();
	createCardArray()
		.then(cards => {
			const markupButtonsArray = buttonInHtml(cards);
			markupButtons(Array.from(markupButtonsArray));
			createButtonPagination(cards.length);
			allCard = cards;
			currentPage = 1;
			markupCards(allCard, 1, perPage);
		})
		.catch(error => Notify.failure('Unable to load favorites. ' + error.message))
		.finally(Loading.remove(1000));
}

export function cardInHtml(cards) {
	let markupCardsArray = [];
	cards
		? cards.forEach(card => {
				markupCardsArray.push(
					createCard(card, `in-favorites`, '../img/icon/icon.svg#icon-like-full')
				);
		  })
		: null;
	return markupCardsArray;
}

function buttonInHtml(cards) {
	const markupButtonsArray = new Set();
	cards
		? cards.forEach(card => {
				markupButtonsArray.add(card.category);
		  })
		: null;
	return markupButtonsArray;
}

function delFromFavorites(e) {
	if (!e.target.classList.contains('js-like')) {
		return;
	}
	handleLikeBtn(e);
	markupCardArray();
}

function createButtonPagination(cards) {
	if (cards < perPage) {
		return;
	}
	countPage = Math.ceil(cards / perPage);
	const perPageBtn = perPage === 9 ? 3 : 4;
	const countBtns = countPage >= perPageBtn ? perPageBtn : countPage;
	let rangeBtns = '';
	for (let i = 1; i <= countBtns; i++) {
		i !== perPageBtn
			? (rangeBtns += `<button class="pagination-btn btn-js" data-id="${i}">${i}</button>`)
			: (rangeBtns += `<button class="pagination-btn btn-js" data-id="${i}">...</button>`);
	}
	const iconRightPath = './img/icon/icon.svg#icon-small-right';
	const iconLeftPath = './img/icon/icon.svg#icon-small-left';
	const arrowButtons = ` <div class="back-buttons additional">
      <button class="pagination-btn arrow-btn btn-js" data-id="5">
         <div class="left-arrow-icon double-arrow">
           <svg class="icon-double-arrow-one" width="24" height="24">
          <use href="${iconLeftPath}"></use>
        </svg>
        <svg class="icon-double-arrow-two" width="24" height="24">
          <use href="${iconLeftPath}"></use>
        </svg>
         </div>
        </svg></button
      ><button class="pagination-btn arrow-btn btn-js" data-id="6">
        <svg class="left-arrow-icon" width="24" height="24">
          <use href="${iconLeftPath}"></use>
        </svg>
      </button>
    </div>
    <div class="range-btns cont"></div>
    <div class="forward-buttons">
      <button class="pagination-btn arrow-btn btn-js" data-id="7">
       <svg class="right-arrow-icon" width="24" height="24">
          <use href="${iconRightPath}"></use>
        </svg>
       </button
      ><button class="pagination-btn arrow-btn btn-js" data-id="8">
        <div class="right-arrow-icon double-arrow">
          <svg class="icon-double-arrow-one" width="24" height="24">
            <use href="${iconRightPath}"></use></svg
          ><svg class="icon-double-arrow-two" width="24" height="24">
            <use href="${iconRightPath}"></use>
          </svg>
        </div>
      </button>
    </div>`;
	buttonPagination.innerHTML = arrowButtons;

	const rangeButtons = buttonPagination.querySelector('.range-btns');
	rangeButtons.innerHTML = rangeBtns;

	const buttons = buttonPagination.querySelectorAll('.btn-js');
	buttons.forEach(button => button.addEventListener('click', onClickBtn));
}

function onClickBtn({ currentTarget }) {
	const idBtn = currentTarget.dataset.id;

	switch (idBtn) {
		case '1':
			break;
		case '2':
			break;
		case '3':
			break;
		case '4':
			break;
		case '5':
			currentPage = 1;
			cardFilterCategories(allCard, 1, perPage);
			break;
		case '6':
			if (currentPage > 1) {
				currentPage = currentPage -= 1;
				cardFilterCategories(allCard, currentPage, perPage);
			}
			break;
		case '7':
			if (currentPage < countPage) {
				currentPage = currentPage += 1;
				cardFilterCategories(allCard, currentPage, perPage);
			}
			break;
		case '8':
			currentPage = countPage;
			cardFilterCategories(allCard, currentPage, perPage);
			break;
		default:
			break;
	}
}

// ref = {
// 	backButtons: buttonPagination.querySelectorAll('.back-buttons'),
// 	forwardButtons: buttonPagination.querySelectorAll('.forward-buttons'),
// }
