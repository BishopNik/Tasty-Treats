/** @format */

import { Notify } from 'notiflix';
import { fetchGetId } from './fetch-api';
import { markupButtons, markupCards, createCard } from './markup-favorites';
// <<<<<<< header

function readFavoritesCard() {
	let favoritesCard = [];
	try {
		favoritesCard = JSON.parse(localStorage.getItem('favorites'));
	} catch (error) {
		Notify.failure('Unable to load favorites. ' + error);
	}
	return favoritesCard;
// =======
import { handleLikeBtn } from './add_favorites';

import { ratingRecipe } from './rating-markup';

// const favoritesImg = document.querySelector('.favorites_img');
// const notFavorites = document.querySelector('.not_favorites');
// let listCardsFavorites = document.querySelector('.list_cards_favorites');
// let btnFavorites = document.querySelector('.favorites_btn');

// document.addEventListener('DOMContentLoaded', () => {
// 	if (localStorage.length === 0) {
// 		favoritesImg.classList.add('hide_in_mobile');
// 		notFavorites.classList.remove('hide');
// 	} else {
// 		favoritesImg.classList.remove('hide_in_mobile');
// 		notFavorites.classList.add('hide');
// 	}
// });

// const ref = {
//   cardsFavorites: document.querySelector('.list_cards_favorites'),
//   categoriesFavorites: document.querySelector('.favorites_categories'),
// };
// // import { markupButtons, markupCards, createCard } from './markup-favorites';

// function FavoritesCard() {
//   let favoritesCard = [];
//   try {
//     favoritesCard = JSON.parse(localStorage.getItem('favorites'));
//   } catch (error) {
//     Notify.failure('Unable to load favorites. ' + error);
//   }
//   return favoritesCard;
// >>>>>>> main
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
		})
		.catch(error => Notify.failure('Unable to load favorites. ' + error.message));

  
}

markupCardArray();

// export { markupCardArray };
	
	
	


