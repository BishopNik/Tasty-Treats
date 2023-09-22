/** @format */

import sprite from '../img/icon/icon.svg';

export function ratingRecipe(rating) {
	let markupRating = ``;
	for (let index = 1; index <= 5; index++) {
		if (index <= Math.round(rating)) {
			markupRating += `<li class="recipe-item-rating-star">
						<svg class="stars-full">
							<use href="${sprite}#icon-star"></use>
						</svg>
					</li>`;
		} else {
			markupRating += `<li class="recipe-item-rating-star">
						<svg class="stars">
							<use href="${sprite}#icon-star"></use>
						</svg>
					</li>`;
		}
	}
	return markupRating;
}
