/** @format */

import { Notify, Loading } from 'notiflix';
import { fetchGetId } from './fetch-api';
import { markupButtons, markupCards, cardFilterCategories } from './markup-favorites';
import { handleLikeBtn } from './add_favorites';
import { createCard } from './recipe-card';
import sprite from '../img/icon/icon.svg';

window.addEventListener('resize', reloadPageOnResize);
function reloadPageOnResize() {
	if (screenWidth > window.innerWidth) {
		screenWidth = window.innerWidth - 30;
		location.reload();
	}
}

let screenWidth = window.innerWidth;
let favoritesCard = [];
export let countPage = 0;
export let currentPage = 0;
export let allCard = [];
export const perPage = window.innerWidth > 767 ? 12 : 9;

const cardsFavorites = document.querySelector('.list_cards_favorites');
const buttonPagination = document.querySelector('.pagination-buttons');
cardsFavorites ? cardsFavorites.addEventListener('click', delFromFavorites) : null;

markupCardArray();

export function readFavoritesCard() {
	try {
		const recipe = localStorage.getItem('favorites');
		if (recipe) {
			favoritesCard = JSON.parse(recipe);
		}
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
	if (!cardsFavorites) {
		return;
	}
	Loading.dots();
	createCardArray()
		.then(cards => {
			allCard = cards;
			currentPage = 1;
			const markupButtonsArray = buttonInHtml(cards);
			markupButtons(Array.from(markupButtonsArray));
			createButtonPagination(cards.length);
			markupCards(allCard, 1, perPage);
		})
		.catch(error => Notify.failure('Unable to load favorites. ' + error.message))
		.finally(Loading.remove(1000));
}

export function cardInHtml(cards) {
	let markupCardsArray = [];
	cards
		? cards.forEach(card => {
				markupCardsArray.push(createCard(card, `in-favorites`, `${sprite}#icon-like-full`));
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

export function changeCurrentPage(page) {
	currentPage = page;
}

function changeValueBtn() {
	const btnPg = buttonPagination.querySelectorAll('.btn-pg');
	btnPg.forEach(btn => {
		if (btn.textContent == currentPage) {
			btn.classList.add('active');
		} else btn.classList.remove('active');
	});
}

function createButtonPagination(cards) {
	countPage = Math.ceil(cards / perPage);
	if (countPage <= 1) {
		const buttons = buttonPagination.querySelectorAll('.btn-js');
		if (buttons.length) {
			buttons.forEach(button => button.removeEventListener('click', onClickBtn));
		}
		buttonPagination.innerHTML = '';
		return;
	}
	const iconRightPath = `${sprite}#icon-small-right`;
	const iconLeftPath = `${sprite}#icon-small-left`;
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
	const buttons = buttonPagination.querySelectorAll('.btn-js');
	buttons.forEach(button => button.addEventListener('click', onClickBtn));
	changeTextBtn(cards);
	changeValueBtn();
}

function onClickBtn({ currentTarget }) {
	const idBtn = currentTarget.dataset.id;
	const pgBtn = window.innerWidth > 767 ? 4 : 3;

	switch (idBtn) {
		case '1':
			currentPage =
				currentTarget.textContent !== '...'
					? Number(currentTarget.textContent)
					: currentPage - 2;
			break;
		case '2':
			currentPage = Number(currentTarget.textContent);
			break;
		case '3':
			currentPage =
				currentPage < countPage && pgBtn === 3
					? currentPage + 1
					: Number(currentTarget.textContent);
			break;
		case '4':
			console.log(currentPage);
			currentPage =
				currentTarget.textContent !== '...'
					? Number(currentTarget.textContent)
					: currentPage + 2;
			console.log(currentPage);
			break;
		case '5':
			currentPage = 1;
			break;
		case '6':
			if (currentPage > 1) {
				currentPage -= 1;
			}
			break;
		case '7':
			if (currentPage < countPage) {
				currentPage += 1;
			}
			break;
		case '8':
			currentPage = countPage;
			break;
		default:
			break;
	}
	cardFilterCategories(currentPage);
}

export function changeTextBtn(cards) {
	cards ? (countPage = Math.ceil(cards / perPage)) : null;
	const pgBtn = window.innerWidth > 767 ? 4 : 3;
	const rangeButtons = buttonPagination.querySelector('.range-btns');
	const buttons = buttonPagination.querySelectorAll('.btn-pg');
	if (buttons.length) {
		buttons.forEach(button => button.removeEventListener('click', onClickBtn));
	}
	if (countPage <= 1) {
		buttonPagination.style.display = 'none';
		return;
	} else buttonPagination.style.display = 'flex';
	const countBtns = countPage >= pgBtn ? pgBtn : countPage;
	let rangeBtns = '';

	if (currentPage <= 2) {
		for (let i = 1; i <= countBtns; i++) {
			i !== pgBtn
				? (rangeBtns += `<button class="pagination-btn btn-js btn-pg number-btn" data-id="${i}" >${i}</button>`)
				: (rangeBtns += `<button class="pagination-btn btn-js btn-pg number-btn" data-id="${i}" >...</button>`);
		}
	} else if (currentPage > 2 && currentPage < countPage - 1) {
		for (let i = currentPage - 1; i < countBtns + currentPage - 1; i++) {
			i !== currentPage - 1 && i !== pgBtn + currentPage - 2
				? (rangeBtns += `<button class="pagination-btn btn-js btn-pg number-btn" data-id="${
						i - currentPage + 2
				  }" >${i}</button>`)
				: (rangeBtns += `<button class="pagination-btn btn-js btn-pg number-btn" data-id="${
						i - currentPage + 2
				  }" >...</button>`);
		}
	} else {
		for (let i = countPage - pgBtn + 1; i <= countPage; i++) {
			i === countPage - pgBtn + 1
				? i > 0
					? (rangeBtns += `<button class="pagination-btn btn-js btn-pg number-btn" data-id="${
							i - countPage + pgBtn
					  }" >...</button>`)
					: null
				: (rangeBtns += `<button class="pagination-btn btn-js btn-pg number-btn" data-id="${
						i - countPage + pgBtn
				  }" >${i}</button>`);
		}
	}
	rangeButtons.innerHTML = rangeBtns;
	const newButtons = buttonPagination.querySelectorAll('.btn-pg');
	newButtons.forEach(button => button.addEventListener('click', onClickBtn));
	changeValueBtn();
}
