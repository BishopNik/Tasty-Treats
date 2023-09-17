/** @format */

import { markupRecipe } from './markup-recipe';

const id = '6462a8f74c3d0ddd28897fb8';

const ref = {
	buttonRecipe: document.querySelector('.recipe-item-see'),
	modalWindowRecipe: document.querySelector('.backdrop'),
	iconPlay: null,
	closeModalWindowRecipe: null,
	recipeImg: null,
	youtubeFrame: null,
};

ref.buttonRecipe.addEventListener('click', open);

function open() {
	onOpenWindow(id);
}

export async function onOpenWindow(id) {
	ref.modalWindowRecipe.innerHTML = await markupRecipe(id);
	ref.modalWindowRecipe.classList.remove('is-hidden');

	ref.closeModalWindowRecipe = document.querySelector('.recipe-close');
	ref.closeModalWindowRecipe.addEventListener('click', onCloseWindow);
	ref.recipeImg = document.querySelector('.recipe-adv-img');
	ref.youtubeFrame = document.querySelector('.recipe-adv-youtube');
	ref.iconPlay = document.querySelector('.recipe-youtube');
	ref.recipeImg.addEventListener('click', viewYoutube);

	document.addEventListener('keydown', onCloseModal);
	document.addEventListener('click', onCloseModal);
}

function onCloseWindow() {
	ref.modalWindowRecipe.classList.add('is-hidden');
	ref.closeModalWindowRecipe.removeEventListener('click', onCloseWindow);
	document.removeEventListener('keydown', onCloseModal);
	document.removeEventListener('click', onCloseModal);
	ref.recipeImg.removeEventListener('click', viewYoutube);
}

function onCloseModal({ target, key }) {
	if (ref.modalWindowRecipe === target || key === 'Escape') {
		onCloseWindow();
	}
}

function viewYoutube() {
	ref.youtubeFrame.style.display = 'block';
	ref.iconPlay.style.display = 'none';
	ref.youtubeFrame.contentWindow.postMessage(
		'{"event":"command","func":"playVideo","args":""}',
		'*'
	);
}
