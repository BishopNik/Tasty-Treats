/** @format */

import { markupRecipe } from './markup-recipe';

const id = '6462a8f74c3d0ddd28897fb8';

const ref = {
	buttonRecipe: document.querySelector('.recipe-item-see'),
	modalWindowRecipe: document.querySelector('.backdrop'),
	closeModalWindowRecipe: document.querySelector('.recipe-close'),
};

ref.buttonRecipe.addEventListener('click', onOpenWindow);

async function onOpenWindow() {
	ref.modalWindowRecipe.innerHTML = await markupRecipe(id);
	ref.modalWindowRecipe.classList.remove('is-hidden');
	ref.closeModalWindowRecipe.addEventListener('click', onCloseWindow);
	document.addEventListener('keydown', onCloseModal);
	document.addEventListener('click', onCloseModal);
}

function onCloseWindow() {
	ref.modalWindowRecipe.classList.add('is-hidden');
	ref.closeModalWindowRecipe.removeEventListener('click', onCloseWindow);
	document.removeEventListener('keydown', onCloseModal);
	document.removeEventListener('click', onCloseModal);
}

function onCloseModal({ target, key }) {
	if (ref.modalWindowRecipe === target || key === 'Escape') {
		onCloseWindow();
	}
}
