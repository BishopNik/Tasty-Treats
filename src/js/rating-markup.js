/** @format */

export function ratingRecipe(rating) {
	let markupRating = ``;
	for (let index = 1; index <= 5; index++) {
		if (index <= rating) {
			markupRating += `<li class="recipe-item-rating-star">
						<svg class="stars-full">
							<use href="../img/icon/icon.svg#icon-star"></use>
						</svg>
					</li>`;
		} else {
			markupRating += `<li class="recipe-item-rating-star">
						<svg class="stars">
							<use href="../img/icon/icon.svg#icon-star"></use>
						</svg>
					</li>`;
		}
	}
	return markupRating;
}
