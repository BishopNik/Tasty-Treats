/** @format */

import { Notify } from 'notiflix';
import { fetchGetId } from './fetch-api';
import { markupButtons, markupCards } from './markup-favorites';
import { handleLikeBtn } from './add_favorites';
import { createCard } from './recipe-card';

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
	let markupCardsArray = [];
	let markupButtonsArray = new Set();
	createCardArray()
		.then(cards => {
			cards
				? cards.forEach(card => {
						markupCardsArray.push(createCard(card));
						markupButtonsArray.add(card.category);
				  })
				: null;
			markupButtons(Array.from(markupButtonsArray));
			markupCards(markupCardsArray);

			// handle like buttons
			const allRecipes = document.querySelectorAll('.js-recipe');
			allRecipes.forEach(elm => {
				elm.addEventListener('click', delFromFavorites);
			});
		})
		.catch(error => Notify.failure('Unable to load favorites. ' + error.message));
}

const delFromFavorites = e => {
	handleLikeBtn(e);
	markupCardArray();
};

markupCardArray();
