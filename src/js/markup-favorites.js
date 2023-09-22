/** @format */

import { onOpenWindow } from './recipe';
import { allCard, changeCurrentPage, cardInHtml, perPage, changeCountPage } from './favorites';
import { handleScroll } from './loading';
import sprite from '../img/icon/icon.svg';

let activeCatigories = new Set();

const ref = {
	cardsFavorites: document.querySelector('.list_cards_favorites'),
	categoriesFavorites: document.querySelector('.favorites_categories'),
	allCategories: null,
};

ref.cardsFavorites.addEventListener('click', onOpenModalWindow);

export function markupButtons(cards) {
	if (cards.length === 0) {
		ref.categoriesFavorites.innerHTML = '';
		return;
	}
	const buttons = cards.map(
		card =>
			`<li><button class="main-button recipe-item-see category-btn" type="button">${card}</button></li>`
	);
	const activeClass = activeCatigories.size === 0 ? 'green-button' : null;
	buttons.unshift(
		`<li><button id="allcat" class="main-button recipe-item-see category-btn ${activeClass}" type="button">All categories</button></li>`
	);
	ref.categoriesFavorites.innerHTML = buttons.join('');
	ref.categoriesFavorites.addEventListener('click', addFilter);
	ref.allCategories = document.querySelector('#allcat');
}

export function markupCards(cards, page, perPage) {
	const start = (page - 1) * perPage;
	const end = page * perPage;
	const markupCardsArray = cardInHtml(cards);
	const pageCardArray = markupCardsArray.slice(start, end);
	pageCardArray.length
		? (ref.cardsFavorites.innerHTML = pageCardArray.join(''))
		: (ref.cardsFavorites.innerHTML = `<div class="not_favorites">
						<svg class="favorites_elem_svg" width="68" height="58">
							<use href="${sprite}#icon-elements"></use>
						</svg>
						<p class="favorites_text">
							It appears that you haven't added any recipes to your favorites yet. To
							get started, you can add recipes that you like to your favorites for
							easier access in the future.
						</p>
					</div>`);
	handleScroll();
}

function addFilter({ target }) {
	if (!target.classList.contains('main-button')) {
		return;
	}
	changeCurrentPage(1);
	if (target === ref.allCategories) {
		const cards = ref.cardsFavorites.children;
		const buttons = ref.categoriesFavorites.children;
		for (let i = 1; i < buttons.length; i++) {
			buttons[i].children[0].classList.remove('green-button');
		}
		for (let i = 0; i < cards.length; i++) {}
		target.classList.add('green-button');
		activeCatigories.clear();
		cardFilterCategories(1);
		return;
	}
	if (!activeCatigories.has(target.textContent)) {
		activeCatigories.add(target.textContent);
		target.classList.add('green-button');
		ref.allCategories.classList.remove('green-button');
	} else {
		activeCatigories.delete(target.textContent);
		target.classList.remove('green-button');
	}
	if (!activeCatigories.size) {
		ref.allCategories.classList.add('green-button');
	}
	cardFilterCategories(1);
	cardFavoritsFilter();
}

function cardFavoritsFilter() {
	const allButtonsActive = ref.categoriesFavorites.querySelectorAll('.green-button');
	const allButton = ref.categoriesFavorites.children;
	if (allButton.length - 1 === allButtonsActive.length) {
		ref.allCategories.classList.add('green-button');
		activeCatigories.clear();
		for (const card of allButtonsActive) {
			card.classList.remove('green-button');
		}
	}
}

export function cardFilterCategories(page) {
	const filteredCard = activeCatigories.size
		? allCard.filter(({ category }) => activeCatigories.has(category))
		: allCard;
	markupCards(filteredCard, page, perPage);
	changeCountPage(filteredCard.length);
}

function onOpenModalWindow({ target }) {
	if (!target.classList.contains('recipe-item-see')) {
		return;
	}
	onOpenWindow(target.dataset.id);
}
