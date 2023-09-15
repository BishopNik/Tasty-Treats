/** @format */

const ref = {
	buttonRecipe: document.querySelector('.recipe-item-see'),
	modalWindowRecipe: document.querySelector('.backdrop'),
	closeModalWindowRecipe: document.querySelector('.recipe-close'),
};

ref.buttonRecipe.addEventListener('click', onOpenWindow);
ref.closeModalWindowRecipe.addEventListener('click', onCloseWindow);

function onOpenWindow() {
	ref.modalWindowRecipe.classList.remove('is-hidden');
	document.addEventListener('keydown', onCloseModal);
	document.addEventListener('click', onCloseModal);
}

function onCloseWindow() {
	ref.modalWindowRecipe.classList.add('is-hidden');
	document.removeEventListener('keydown', onCloseModal);
	document.removeEventListener('click', onCloseModal);
}

function onCloseModal({ target, key }) {
	if (ref.modalWindowRecipe === target || key === 'Escape') {
		onCloseWindow();
	}
}
