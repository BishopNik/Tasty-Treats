/** @format */

import { ratingRecipe } from './rating-markup';

let activeCatigories = new Set();

const ref = {
	cardsFavorites: document.querySelector('.list_cards_favorites'),
	categoriesFavorites: document.querySelector('.favorites_categories'),
	allCategories: null,
};

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

export function markupCards(cards) {
	cards.length
		? (ref.cardsFavorites.innerHTML = cards.join(''))
		: (ref.cardsFavorites.innerHTML = `<div class="not_favorites">
						<svg class="favorites_elem_svg" width="68" height="58">
							<use href="./img/icon/icon.svg#icon-elements"></use>
						</svg>
						<p class="favorites_text">
							It appears that you haven't added any recipes to your favorites yet. To
							get started, you can add recipes that you like to your favorites for
							easier access in the future.
						</p>
					</div>`);
}

export function createCard(card) {
	const { _id, thumb, title, instructions, rating, category } = card;
	return `<li 
		data-id="${_id}" data-category="${category}"
		class="recipe-item mainblock js-recipe"
	
	    style="
		background: linear-gradient(1deg, rgba(5, 5, 5, 0.6) 4.82%, rgba(5, 5, 5, 0) 108.72%),
			url(${thumb}), lightgray 50%; background-size: cover;"
        >
			<svg class="like js-like" width="22" height="22">
				<use class="js-like" href="../img/icon/icon.svg#icon-like-full"></use> 
			</svg>
	    <h3 class="recipe-item-name">${title}</h3>
	    <p class="recipe-item-about">${instructions}</p>
	    <div class="recipe-item-option">
		<div class="recipe-item-rating">
			<span class="recipe-item-rating-num">${rating}</span>
			<ul class="recipe-item-rating-stars">
				${ratingRecipe(rating)}
			</ul>
		</div>
		    <button class="main-button green-button recipe-item-see" type="button" data-id="${_id}">See recipe</button>
	    </div>
        </li>`;
}

function addFilter({ target }) {
	if (!target.classList.contains('main-button')) {
		return;
	}
	if (target === ref.allCategories) {
		const cards = ref.cardsFavorites.children;
		const buttons = ref.categoriesFavorites.children;
		for (let i = 1; i < buttons.length; i++) {
			buttons[i].children[0].classList.remove('green-button');
		}
		for (let i = 0; i < cards.length; i++) {
			cards[i].classList.remove('is-hidden');
			target.classList.add('green-button');
			activeCatigories.clear();
			cardFavoritsFilter();
			return;
		}
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
	cardFavoritsFilter();
}

function cardFavoritsFilter() {
	const cards = ref.cardsFavorites.children;
	for (let i = 0; i < cards.length; i++) {
		if (!activeCatigories.has(cards[i].dataset.category) && activeCatigories.size) {
			cards[i].classList.add('is-hidden');
		} else cards[i].classList.remove('is-hidden');
	}
}
