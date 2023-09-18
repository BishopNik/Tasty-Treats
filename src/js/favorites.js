/** @format */

import { Notify } from 'notiflix';
import { fetchGetId } from './fetch-api';
import { markupButtons, markupCards, createCard } from './markup-favorites';
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

const ref = {
  cardsFavorites: document.querySelector('.list_cards_favorites'),
  categoriesFavorites: document.querySelector('.favorites_categories'),
};
// import { markupButtons, markupCards, createCard } from './markup-favorites';

function FavoritesCard() {
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
				elm.addEventListener('click', handleLikeBtn);				
			});
    })
    .catch(error =>
      Notify.failure('Unable to load favorites. ' + error.message)
    );
}

function createCard(card) {
  const { _id, thumb, title, instructions, rating } = card;
  return `<li 
		data-id="${_id}"
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

function markupButtons(cards) {
  if (cards.length === 0) {
    return;
  }
  const buttons = cards.map(
    card =>
      `<li><button class="main-button recipe-item-see category-btn" type="button">${card}</button></li>`
  );
  buttons.unshift(
    `<li><button class="main-button recipe-item-see category-btn" type="button">All categories</button></li>`
  );
  ref.categoriesFavorites.innerHTML = buttons.join('');
}

function markupCards(cards) {
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

markupCardArray();

// export { markupCardArray };
	
	
	


