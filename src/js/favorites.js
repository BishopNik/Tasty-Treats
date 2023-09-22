/** @format */

import { Notify, Loading } from 'notiflix';
import { fetchGetId } from './fetch-api';
import { markupButtons, markupCards, cardFilterCategories } from './markup-favorites';
import { handleLikeBtn } from './add_favorites';
import { createCard } from './recipe-card';
import sprite from '../img/icon/icon.svg';

window.addEventListener('resize', reloadPageOnResize);
function reloadPageOnResize() {
	if (window.innerWidth < 768) {
		location.reload();
	}
}

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

function createButtonPagination(cards) {
	if (cards < perPage) {
		buttonPagination.innerHTML = '';
		return;
	}
	countPage = Math.ceil(cards / perPage);
	const perPageBtn = perPage === 9 ? 3 : 4;
	const countBtns = countPage >= perPageBtn ? perPageBtn : countPage;
	let rangeBtns = '';
	for (let i = 1; i <= countBtns; i++) {
		i !== perPageBtn
			? (rangeBtns += `<button class="pagination-btn btn-js btn-pg" data-id="${i}" data-value="${i}">${i}</button>`)
			: (rangeBtns += `<button class="pagination-btn btn-js btn-pg" data-id="${i}" data-value="${i}">...</button>`);
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

	const rangeButtons = buttonPagination.querySelector('.range-btns');
	rangeButtons.innerHTML = rangeBtns;

	const buttons = buttonPagination.querySelectorAll('.btn-js');
	buttons.forEach(button => button.addEventListener('click', onClickBtn));
	if (currentPage === 1) {
		changeTextBtn(currentPage);
	}
}

function onClickBtn({ currentTarget }) {
	const idBtn = currentTarget.dataset.id;
	const valueBtn = currentTarget.dataset.value;

	switch (idBtn) {
		case '1':
			cardFilterCategories(valueBtn);
			currentPage = valueBtn;
			break;
		case '2':
			cardFilterCategories(valueBtn);
			changeTextBtn(valueBtn);
			break;
		case '3':
			cardFilterCategories(valueBtn);
			changeTextBtn(valueBtn);
			break;
		case '4':
			cardFilterCategories(valueBtn);
			changeTextBtn(valueBtn);
			break;
		case '5':
			currentPage = 1;
			cardFilterCategories(1);
			break;
		case '6':
			if (currentPage > 1) {
				currentPage = currentPage -= 1;
				cardFilterCategories(currentPage);
				changeTextBtn(currentPage);
			}
			break;
		case '7':
			if (currentPage < countPage) {
				currentPage = currentPage += 1;
				cardFilterCategories(currentPage);
				changeTextBtn(currentPage);
			}
			break;
		case '8':
			cardFilterCategories(countPage);
			changeTextBtn(countPage);
			break;
		default:
			break;
	}
}

export function changeCountPage(cards) {
	countPage = Math.ceil(cards / perPage);
	createButtonPagination(cards);
}

export function changeCurrentPage(page) {
	currentPage = page;
}

function changeValueBtn(currentPage) {
	const btnPg = buttonPagination.querySelectorAll('.btn-pg');
	btnPg.forEach(btn => {
		if (btn.dataset.value == currentPage) {
			btn.classList.add('active');
		} else btn.classList.remove('active');
	});
}

function changeTextBtn(page) {
	const btnPg = buttonPagination.querySelectorAll('.btn-pg');
	const pgBtn = window.innerWidth > 767 ? 4 : 3;
	currentPage = Number(page);

	console.log(currentPage);

	btnPg[0].textContent = btnPg[1].dataset.value > 2 ? '...' : '1';
	btnPg[1].textContent = btnPg[1].dataset.value;
	if (btnPg[2]) {
		btnPg[2].textContent =
			pgBtn === 4
				? btnPg[2].dataset.value
				: currentPage !== countPage && countPage > 3
				? '...'
				: `${countPage}`;
	}
	if (btnPg[3]) {
		btnPg[3].textContent = currentPage !== countPage && countPage > 4 ? '...' : `${countPage}`;
	}

	changeValueBtn(currentPage);
}

// function changeValue(num) {
// 	const btnPg = buttonPagination.querySelectorAll('.btn-pg');
// 	btnPg.forEach(btn => {
// 		btnPg.forEach(btn => {
// 			btn.dataset.value = Number(btn.dataset.value) + num;
// 		});
// 	});
// }
