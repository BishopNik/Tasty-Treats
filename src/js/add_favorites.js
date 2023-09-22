/** @format */
import sprite from '../img/icon/icon.svg';


function handleLikeBtn(evt) {
	const favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];

	if (!evt.target.classList.contains('js-like')) {
		return;
	}
	const recipeId = evt.target.closest('.js-recipe').dataset.id;

	const idx = favorites.indexOf(recipeId);

	const svg = evt.target.closest('svg');

	if (idx === -1) {
		favorites.push(recipeId);
		svg.innerHTML = `<use class="js-like" href="${sprite}#icon-like-full"></use>`;
	} else {
		favorites.splice(idx, 1);
		svg.innerHTML = `<use class="js-like" href="${sprite}#icon-like"></use>`;
	}

	localStorage.setItem('favorites', JSON.stringify(favorites));
}

function handleAddFavouriteBtn(evt) {
	const favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];

	if (!evt.target.classList.contains('js-add-fav-btn')) {
		return;
	}

	const recipeId = evt.target.closest('.js-add-fav-btn').dataset.id;
	const idx = favorites.indexOf(recipeId);
	const btn = evt.target.closest('button');

	// get svg from the required element by id  //
	const selectors = {
		list: document.querySelector('.js-all-recipe-cards'),
	};

	let svg = null;
	
	if (selectors.list) {
		const allElements = selectors.list.querySelectorAll('.js-recipe');
		allElements.forEach(elm => {
			if (elm.dataset.id == recipeId && !svg) {
				svg = elm.querySelector('svg');
			}
		});
	}
	// **************************** //

	if (recipeId) {
		if (idx === -1) {
			favorites.push(recipeId);
			btn.innerHTML = `Remove favorite`;
			if (svg) {
				svg.innerHTML = `<use class="js-like" href="${sprite}#icon-like-full"></use>`;
			}
		} else {
			favorites.splice(idx, 1);
			btn.innerHTML = `Add to favorite`;
			if (svg) {
				svg.innerHTML = `<use class="js-like" href="${sprite}#icon-like"></use>`;
			}

			 const el = selectors.list.querySelector(`[data-id="${recipeId}"]`);
      el.remove();

		}
	}

	localStorage.setItem('favorites', JSON.stringify(favorites));

}

export { handleLikeBtn };
export { handleAddFavouriteBtn };
