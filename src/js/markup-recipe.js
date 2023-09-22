/** @format */
import sprite from '../img/icon/icon.svg';
import { fetchGetId } from './fetch-api';
import { ratingRecipe } from './rating-markup';

export async function markupRecipe(id) {
	const recipeData = await fetchGetId(id);
	const { _id, title, instructions, thumb, youtube, time, tags, ingredients, rating } =
		recipeData;
	let index = 0;
	if (youtube) {
		index = youtube.indexOf('?v=');
	}

	let youtubeLink = '';
	let idVideo = '';
	let cursor = 'auto';

	// added by IRyb //
	// Додаю отримання масиву id з локалсториджа, щоб змінювати назву кнопки: якщо вже є у улюблених, то кнопка буде називатися Remove
	const favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];
	let btnFavName = 'Add to favorite';

	if (favorites.indexOf(_id) === -1) {
		btnFavName = 'Add to favorite';
	} else {
		btnFavName = 'Remove favorite';
	}
	// --- //

	if (index > 0) {
		cursor = 'pointer';
		idVideo = youtube.substring(index + 3);
		youtubeLink = `<svg class="recipe-youtube">
			<use href="${sprite}#icon-youtube" style="width: 38px; height: 38px;"></use>
		</svg>`;
	}
	const tagsRecipe = tags
		? tags.map(item => `<li class="recipe-tag">#${item}</li>`).join('')
		: null;
	const ingredientsRecipe = ingredients
		? ingredients
				.map(
					item => `<ul class="recipe-ingradient">
                        <li class="recipe-ingradient-text">${item.name}</li>
				        <li class="recipe-ingradient-text">${item.measure}</li>
                      </ul>`
				)
				.join('')
		: null;
	const ratingBlock = ratingRecipe(rating);
	const modWindow = `
    <div class="recipe-adv">
		<svg class="recipe-close">
			<use href="${sprite}#icon-close"></use>
		</svg>
		<h2 class="recipe-adv-name">${title}</h2>
		<div
			class="recipe-adv-img" style="background: linear-gradient(0deg, rgba(5, 5, 5, 0.4) 0%, rgba(5, 5, 5, 0.4) 100%),
		lightgray -34.64px -20px / 109.993% 120% no-repeat url(${thumb}); background-size: cover; background-position: center; cursor: ${cursor}"
		data-youtubeid="${idVideo}"	
		>
		${youtubeLink}
		</div>
		<div class="recipe-block">
			<ul class="recipe-tags">
				${tagsRecipe}
			</ul>
			<div class="recipe-adv-item-rating">
				<span class="recipe-adv-item-rating-num">${rating.toFixed(2)}</span>
				<ul class="recipe-item-rating-stars">
					${ratingBlock}
				</ul>
				<span class="recipe-adv-item-time">${time} min</span>
			</div>
		</div>
		<div class="recipe-ingradient-block">
			${ingredientsRecipe}
		</div>
		<p class="recipe-text">
			${instructions}
		</p>
		<div class="recipe-button">
			<button class="main-button recipe-button-el green-button js-add-fav-btn" data-id="${_id}" type="{button}">
				${btnFavName}
			</button>
			<button class="main-button recipe-button-el" type="{button}" id="modal-rating-opener">
				Give a rating
			</button>
		</div>
	</div>
    `;
	return modWindow;
}
