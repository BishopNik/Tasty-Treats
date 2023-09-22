/** @format */

import { ratingRecipe } from './rating-markup';

export function createCard(card, className, status) {
	const { _id, thumb, title, instructions, rating, category } = card;
	return `<li 
		data-id="${_id}" data-category="${category}" data-url="${thumb}" data-action="changeUrl"
		class="recipe-item mainblock ${className} js-recipe"
	
	    style="
		background: linear-gradient(1deg, rgba(5, 5, 5, 0.6) 4.82%, rgba(5, 5, 5, 0) 108.72%),
			lightgray 50%; background-size: cover;"
        >
			<svg class="like js-like" width="22" height="22">
				<use class="js-like" href="${status}"></use> 
			</svg>
	    <h3 class="recipe-item-name">${title}</h3>
	    <p class="recipe-item-about">${instructions}</p>
	    <div class="recipe-item-option">
		<div class="recipe-item-rating">
			<span class="recipe-item-rating-num">${rating.toFixed(2)}</span>
			<ul class="recipe-item-rating-stars">
				${ratingRecipe(rating)}
			</ul>
		</div>
		    <button class="main-button green-button recipe-item-see" type="button" data-id="${_id}">See recipe</button>
	    </div>
        </li>`;
}
