/** @format */

import { markupRecipe } from './markup-recipe';
import { createListeners } from './rating';
import { handleAddFavouriteBtn } from './add_favorites';

const ref = {
	modalWindowRecipe: document.querySelector('.backdrop'),
	iconPlay: null,
	closeModalWindowRecipe: null,
	recipeImg: null,
	youtubeFrame: null,
	favoriteBtn: null,
};

export async function onOpenWindow(id) {
	ref.modalWindowRecipe.innerHTML = await markupRecipe(id);
	ref.modalWindowRecipe.classList.remove('is-hidden');

	createListeners(id);

	ref.closeModalWindowRecipe = document.querySelector('.recipe-close');
	ref.closeModalWindowRecipe.addEventListener('click', onCloseWindow);
	ref.recipeImg = document.querySelector('.recipe-adv-img');
	ref.youtubeFrame = document.querySelector('.recipe-adv-youtube');
	ref.iconPlay = document.querySelector('.recipe-youtube');
	ref.recipeImg.addEventListener('click', viewYoutube);

	ref.favoriteBtn = document.querySelector('.js-add-fav-btn');
	ref.favoriteBtn.addEventListener('click', handleAddFavouriteBtn);

	document.addEventListener('keydown', onCloseModal);
	document.addEventListener('click', onCloseModal);
}

function onCloseWindow() {
	ref.modalWindowRecipe.classList.add('is-hidden');
	ref.recipeImg.innerHTML = '';
	ref.closeModalWindowRecipe.removeEventListener('click', onCloseWindow);
	document.removeEventListener('keydown', onCloseModal);
	document.removeEventListener('click', onCloseModal);
	ref.recipeImg.removeEventListener('click', viewYoutube);
	ref.favoriteBtn.removeEventListener('click', handleAddFavouriteBtn);
}

function onCloseModal({ target, key }) {
	if (ref.modalWindowRecipe === target || key === 'Escape') {
		onCloseWindow();
	}
}

function viewYoutube({ currentTarget }) {
	const idVideo = currentTarget.dataset.youtubeid;
	ref.recipeImg.innerHTML = `<iframe
			class='recipe-adv-youtube'
			src='https://www.youtube.com/embed/${idVideo}?autoplay=1'
			frameborder='0'
			allow="autoplay; gyroscope; picture-in-picture; clipboard-write"
			allowfullscreen
		></iframe>`;
	ref.iconPlay.style.display = 'none';
}
